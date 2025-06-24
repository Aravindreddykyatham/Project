package com.springboot.crudoperations.employees.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.crudoperations.employees.entity.Employees;
import com.springboot.crudoperations.employees.repository.EmployeesRepository;

@Service
public class EmployeesService {

	@Autowired
	private EmployeesRepository employeeRepo;
	private static List<Employees> list = new ArrayList<>();

	public List<Employees> getAllEmployees() {
		List<Employees> employees = new ArrayList<>();
		return (List<Employees>) employeeRepo.findAll();

	}

	public Optional<Employees> getEmployee(int id) {
		return employeeRepo.findById(id);
	}

	public void updateEmployee(Employees employee) {
		employeeRepo.save(employee);
	}

	public void deleteEmployee(int id) {
		employeeRepo.deleteById(id);
	}

	public void saveOrUpdate(Employees employee) {
		employeeRepo.save(employee);
	}
}
