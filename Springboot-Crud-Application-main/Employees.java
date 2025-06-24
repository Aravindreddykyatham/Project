package com.springboot.crudoperations.employees.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Employees {
	
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(name = "Name")
	private String name;
	@Column(name = "City")
	private String city;
	@Column(name = "Email")
	private String email;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Employees(int id, String name, String city, String email) {
		super();
		this.id = id;
		this.name = name;
		this.city = city;
		this.email = email;
	}
	
	public Employees() {
		
	}
	@Override
	public String toString() {
		return "Employees [id=" + id + ", name=" + name + ", city=" + city + ", email=" + email + "]";
	}
	
}


