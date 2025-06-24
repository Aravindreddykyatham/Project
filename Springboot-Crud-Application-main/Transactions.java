package com.springboot.crudoperations.employees.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Transactions {

	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private int empid;
	private String empName;
	private double salary;
	private Date salaryDate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getEmpid() {
		return empid;
	}
	public void setEmpid(int empid) {
		this.empid = empid;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public double getSalary() {
		return salary;
	}
	public void setSalary(double salary) {
		this.salary = salary;
	}
	public Date getSalaryDate() {
		return salaryDate;
	}
	public void setSalaryDate(Date salaryDate) {
		this.salaryDate = salaryDate;
	}
	public Transactions(int id, int empid, String empName, double salary, Date salaryDate) {
		super();
		this.id = id;
		this.empid = empid;
		this.empName = empName;
		this.salary = salary;
		this.salaryDate = salaryDate;
	}
	
	public Transactions() {
		
	}
	
	@Override
	public String toString() {
		return "Transactions [id=" + id + ", empid=" + empid + ", empName=" + empName + ", salary=" + salary
				+ ", salaryDate=" + salaryDate + "]";
	}
	
	
}
