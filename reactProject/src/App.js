import React, { Component } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-blue.css";
import AddModal from './components/AddModal/AddModal';
import sampleData from './data.json'
import "./index.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      columnDefs: [
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "Age", field: "age", sortable: true },
        { headerName: "Year", field: "year", sortable: true }
      ],
      rowData: [],
      addModal: false
    };
  }

  onGridReady = (params) => {
    if (params && params.api) {
      params.api.sizeColumnsToFit();
      this.gridApi = params.api;
    }
  }

  componentDidMount() {
    
    //call api on load
    //axios.get('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json')
    axios.get('https://localhost:8080/person/get')
      .then(response => {
        let result = response.data.filter(function (data, idx) {
          return idx < 100;
        }).map(function (data) {
          return { name: data.athlete, age: data.age, year: data.year };
        })
        this.setState({ rowData: result })
      })
      .catch(error => {
        let result = sampleData.data.map(function (data) {
          return { name: data.athlete, age: data.age, year: data.year };
        })
        this.setState({ rowData: result })
      });
  }

  addNewItem = (newItem) => {
    const {rowData} = this.state;
    rowData.push(newItem);
    this.gridApi.setRowData(rowData);
    this.gridApi.refreshCells({rowNodes:rowData})
    this.setState({addModal: false})
  }

  openAddModal = () => {
    this.setState({addModal: true})
  }
  modalClose = () => {
    this.setState({addModal: false})
  }

  render() {
    return (
      <div className="App">
        <button type="button" onClick={this.openAddModal}>Add New Row</button>
        <div style={{ height: 500, width: "100%" }} className="ag-theme-blue">
          <AgGridReact
            onGridReady={this.onGridReady}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
          />
        </div>
        { this.state.addModal && <AddModal 
          show={this.state.addModal} 
          handleClose={e => this.modalClose(e)}
          add = {this.addNewItem}
        /> 
        }
      </div>
    );
  }
}

export default App;
