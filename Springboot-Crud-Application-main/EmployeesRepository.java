package com.springboot.crudoperations.employees.repository;

import org.springframework.data.repository.CrudRepository;

import com.springboot.crudoperations.employees.entity.Employees;

public interface EmployeesRepository extends CrudRepository<Employees, Integer> {

}

