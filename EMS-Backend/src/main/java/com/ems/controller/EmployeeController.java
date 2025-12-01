package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.dto.EmployeeDto;
import com.ems.service.EmployeeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	//Build Add Employee REST API
	
	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto)
	{
		EmployeeDto employee = employeeService.createEmployee(employeeDto);
		
		return new ResponseEntity<EmployeeDto>(employee, HttpStatus.CREATED);
		
	}
	
	//Build Get Employee REST API
	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto> getEmployee(@PathVariable Long id)
	{
		EmployeeDto employeeById = employeeService.getEmployeeById(id);
		
		return ResponseEntity.ok(employeeById);
	}
	
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployees()
	{
		List<EmployeeDto> allEmployee = employeeService.getAllEmployee();
		return ResponseEntity.ok(allEmployee);
	}
	
	@PostMapping("{id}")
	public ResponseEntity<EmployeeDto> updateEmployees(@PathVariable Long id, @RequestBody EmployeeDto employeeDto)
	{
		EmployeeDto updateEmployee = employeeService.updateEmployee(id, employeeDto);
		
		return ResponseEntity.ok(updateEmployee);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployeeById(@PathVariable Long id)
	{
		employeeService.deleteEmployeeById(id);
		return ResponseEntity.ok("Employee Deleted Successfully !!");
	}
	

}
