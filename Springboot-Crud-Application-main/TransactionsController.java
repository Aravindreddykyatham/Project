package com.springboot.crudoperations.employees.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.crudoperations.employees.entity.Transactions;
import com.springboot.crudoperations.employees.service.TransactionsService;

@RestController
public class TransactionsController {

	@Autowired
	public TransactionsService transactionService;
	
	@GetMapping("/getAllTransaction")
	public List<Transactions> getAllTransactions(){
		return transactionService.getAllTransactions();
	}

	@PostMapping("/getAllTransaction")  
	public Transactions saveTransaction(@RequestBody Transactions transaction)   
	{  
		transactionService.saveTransaction(transaction);  
		return transaction;  
	}  
	
	@GetMapping("/getAllTransaction/{empid}")
	public List<Transactions> getTransaction(@PathVariable int empid){
		return transactionService.getTransaction(empid);
	}
	
}
