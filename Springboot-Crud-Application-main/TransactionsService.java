package com.springboot.crudoperations.employees.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.springboot.crudoperations.employees.entity.Transactions;
import com.springboot.crudoperations.employees.repository.TransactionsRepository;

@Service
public class TransactionsService {

	@Autowired
	public TransactionsRepository transactionRepo;
	
	public List<Transactions> getAllTransactions() {
		List<Transactions> transactions = new ArrayList<>();
		return (List<Transactions>) transactionRepo.findAll(Sort.by(Sort.Direction.ASC,"salary" ));
	}
	
	public void saveTransaction(Transactions transaction) {
		transactionRepo.save(transaction);
	}
	
	public List<Transactions> getTransaction(int empid) {
		return transactionRepo.findByEmpid(empid);
	}
}
