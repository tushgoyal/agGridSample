package com.aws.service1.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/person") 
@CrossOrigin(origins = "*")
public class MyController {

	Map<String,Person> mapData = new HashMap<>(); 
	
	// @PostMapping("/add") 
	//  public Person add(@RequestBody Person person) { 
	// 	 mapData.put(name,Person); 
	// 	 return person; 
	// }
	
	@GetMapping("/get") 
	public List<Person> get() {
		
		Person person = new Person(); 
		person.setName("Tushar"); 
		person.setAge(30); 
		person.setPincode("335511"); 
		
		List<Person> persons = Collections.nCopies(100, person); 
		List<Person> data = new ArrayList<>(mapData.getValues); 
		data.addAll(persons);
		return mapData;
	} 
}