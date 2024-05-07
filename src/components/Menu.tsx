import React, { useState } from 'react';
import './Menu.css';
import { CalendarOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import TaskForm from './TaskForm';


interface MenuProps {
  onExecutorsClick: () => void;
  onCalendarClick: () => void;
}

const Menu: React.FC<MenuProps> = ({ onExecutorsClick, onCalendarClick }) => {
  
  return (
    <nav className="Menu">
      <ul>
       
        <li>
          <a onClick={onExecutorsClick}>
            <UserOutlined style={{ marginRight: '5px'}} />Исполнители
          </a>
        </li>
        
        <li>
          <a onClick={onCalendarClick}>
            <CalendarOutlined style={{ marginRight: '5px'}} />Каледарь
          </a>
        </li>
      </ul>
    </nav>
   
  );
}

export default Menu;