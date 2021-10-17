import React, { Component } from "react";
import Modal from 'react-modal';
import "./AddModal.css";
import cross from './cross.png';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      year: ""
    }
  }

  saveData() {
    const {name, age, year} = this.state;
    this.props.add({name:name, age:age, year:year});
  }

  handleOnChange(e, id) {
    const input = e.target.value;
    if (id === "name") {
      this.setState({name: input})
    } else if(id === "age") {
      this.setState({age: input})
    } else if(id === "year") {
      this.setState({year: input})
    }
  }

  render() {
    const { handleClose, show } = this.props;

    return (
        <Modal
          isOpen={show}
          onRequestClose={handleClose}
          style={customStyles}
          contentLabel="Add New Entry"
        >
          
          <div className="modalHeader">
            <span>Add New Entry</span>
            <img className="closeIcon" src={cross} alt="Logo" onClick={handleClose}/>
          </div>
          <hr/>
          <div className="modalContent">
            <div className="formData">
              <label>Name</label><input type="text" onChange={(e) => {this.handleOnChange(e, "name")}} value={this.state.name}/>
            </div>
            <div className="formData">
              <label>Age</label><input type="text" onChange={(e) => {this.handleOnChange(e, "age")}} value={this.state.age}/>
            </div>
            <div className="formData">
              <label>Year</label><input type="year" onChange={(e) => {this.handleOnChange(e, "year")}} value={this.state.year}/>
            </div>
            <div className="formData">
            <button onClick={()=>{this.saveData()}}>Save</button>
            </div>
            
          </div>
        </Modal>
    );
  }
};

export default AddModal;