import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Popconfirm, message } from 'antd';
import Header from "./header"


const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        message.error('Failed to fetch users');
      });
  }, []);

  const deleteUser = (userId) => {
    axios.delete(`https://api.escuelajs.co/api/v1/users/${userId}`)
      .then(() => {
        message.success('User deleted successfully');
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        message.error('Failed to delete user');
      });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => deleteUser(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  if (localStorage.getItem('token') == null) {
    window.location.href = '/adminlog';
}
const Logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh')
  
};


  return (
    <>
      <header>
        <Header />
      </header>
    <div>
      <h1>Admin - Manage Users</h1>
      <Table dataSource={users} columns={columns} rowKey="id" />
   
     <div><a href="/adminlog" onClick={Logout}>Logout</a></div>
     </div>
     </>
  );
};

export default AdminUsers;
