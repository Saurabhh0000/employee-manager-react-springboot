package com.ems.service;

import java.util.List;

import com.ems.dto.EmployeeDto;

public interface EmployeeService {
	
	EmployeeDto createEmployee(EmployeeDto employeeDto);
	EmployeeDto getEmployeeById(Long id);
	List<EmployeeDto> getAllEmployee();
	EmployeeDto updateEmployee(Long id, EmployeeDto update);
	void deleteEmployeeById(Long id);

}
