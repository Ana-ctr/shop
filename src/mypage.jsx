import React from 'react';
import './App.css'; // You can create a separate CSS file for styling


const AdminHomePage = () => {
 

  const handleManageProducts = () => {
    // Redirect to manage products page or open a modal
    console.log("Manage Products clicked");
  };

  const handleViewOrders = () => {
    // Redirect to view orders page or open a modal
    console.log("View Orders clicked");
  };

  const handleManageUsers = () => {
    // Redirect to manage users page or open a modal
    console.log("Manage Users clicked");
  };
  if (localStorage.getItem('token') == null) {
    window.location.href = '/adminlog';
}
const Logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh')
  
};
  return (
    <div className="admin-home">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li><a href="/product" onClick={handleManageProducts}>Manage Products</a></li>
            <li><a href="/category" onClick={handleViewOrders}>View Categories</a>
            
            </li>
            <li><a href="/users" onClick={handleManageUsers}>Manage Users</a></li>
            
            <li><a href="#" onClick={Logout}>Logout</a></li>
          </ul>
        </nav>
      </header>

      <div className='container-fluid o'>
      <i className=" fa-brands fa-3x fa-mixcloud pt-5"></i><br></br>
      <i><big>S H O P</big></i>
     
      </div>

      <footer className="admin-footer ">
        <p>&copy; 2024 Shop Admin Dashboard. All rights reserved.</p>
        <div className='col-12 p '>
      <button><a href="/" onClick={handleManageUsers}>Back</a></button>
      </div>
       
      </footer>
    </div>
  );
};

export default AdminHomePage;
