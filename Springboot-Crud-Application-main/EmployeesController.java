package com.springboot.crudoperations.employees.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.crudoperations.employees.entity.Employees;
import com.springboot.crudoperations.employees.service.EmployeesService;

@RestController
public class EmployeesController {
	
	@Autowired
	private EmployeesService employeeService;
	
	@RequestMapping("/employees")
	public List<Employees> getAllEmployees(){
		return employeeService.getAllEmployees();
	}
	
	@RequestMapping(method = RequestMethod.GET, value="/employees/{id}")
	public Optional<Employees> getEmployee(@PathVariable int id){
		return employeeService.getEmployee(id);
	}
	
	@PostMapping("/employees")  
	public Employees saveEmployee(@RequestBody Employees employee)   
	{  
	employeeService.saveOrUpdate(employee);  
	return employee;  
	}  
	
	@RequestMapping(method = RequestMethod.PUT, value = "/employees/{id}")
	public Employees updateEmployee(@RequestBody Employees employee) {
		employeeService.updateEmployee(employee);
		return employee; //returning game just to show on postman output - earlier return type was null
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/employees/{id}")
	public String deleteEmployee(@PathVariable int id) {
		employeeService.deleteEmployee(id);
		return ("Deleted Employee with ID:- " + id); //returning id just to show on postman output - earlier return type was null
	}

}	