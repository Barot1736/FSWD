import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'active' : ''}
              end
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/depstar" 
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              DEPSTAR
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/charusat" 
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              CHARUSAT
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cse" 
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              CSE
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;