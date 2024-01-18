import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';

const { Search } = Input;

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employees')) || []);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  // Update local storage whenever employees list changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Search function to filter employees
  const handleSearch = (value) => {
    const filteredData = employees.filter(employee =>
      Object.values(employee).some(
        (item) => item.toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredEmployees(filteredData);
  };

  // Table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name', 
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    }
  ];

  // Add dummy data (you would have functionalities to add real employee data)
  const addDummyData = () => {
    const newEmployee = {
      key: String(employees.length),
      name: `Employee ${employees.length}`,
      position: 'Position',
      department: 'Department'
    };
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee List</h2>
      <Search
        placeholder="Search for employees"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: '10px' }}
      />
      <Button onClick={addDummyData} type="primary" style={{ marginBottom: '10px' }}>
        Add Employee
      </Button>
      <Table columns={columns} dataSource={filteredEmployees} />
    </div>
  );
};

export default EmployeeListPage;
