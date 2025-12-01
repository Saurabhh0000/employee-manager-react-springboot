package com.ems.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ems.dto.EmployeeDto;
import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;
import com.ems.mapper.EmployeeMapper;
import com.ems.repository.EmployeeRepository;
import com.ems.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService{

	private EmployeeRepository employeeRepository;
	
	
	
	public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
		super();
		this.employeeRepository = employeeRepository;
	}



	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee save = employeeRepository.save(employee);
		
		return EmployeeMapper.mapToEmployeeDto(save);
	}



	@Override
	public EmployeeDto getEmployeeById(Long id) {
		Employee byId = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with Given Id : "+id));
		return EmployeeMapper.mapToEmployeeDto(byId);
	}



	@Override
	public List<EmployeeDto> getAllEmployee() {
		
		List<Employee> all = employeeRepository.findAll();
		return all.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
	}



	@Override
	public EmployeeDto updateEmployee(Long id, EmployeeDto update) {
		
		Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee is not exist with Given id : "+id));
		employee.setFirstName(update.getFirstName());
		employee.setLastName(update.getLastName());
		employee.setEmail(update.getEmail());
		employee.setPhoneNumber(update.getPhoneNumber());
		
		Employee save = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(save);
	}



	@Override
	public void deleteEmployeeById(Long id) {
		
		Employee employee = employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Employee is not exist with Given id : "+id));
		employeeRepository.deleteById(id);
	}

	


	
	
	
	

	
}
