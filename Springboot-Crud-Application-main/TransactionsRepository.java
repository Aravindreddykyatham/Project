package com.springboot.crudoperations.employees.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.crudoperations.employees.entity.Transactions;

public interface TransactionsRepository extends JpaRepository <Transactions, Integer>{

	@Query(value="select * from Transactions order by salary ASC", nativeQuery=true)
	List<Transactions> findByEmpid(int empid);
	
}
