import React, { useEffect, useState } from "react";
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar } from "antd";
import logo from './lohoNipi.png';
import './Header.css';

const {Header: AntHeader} = Layout;

const Header: React.FC = () => {
    const [userData, setUserData] = useState<string>('');

    let lastName: string = '';
    let firstNameInitial: string = '';
    let secondNameInitial: string = '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:16895/api/User/userinfo', {
                    credentials: "include",
                  });
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }
                const data = await response.json();
                setUserData(transformFullName(data.fullName));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const transformFullName = (fullName: string): string => {
        return fullName.replace(/(.*?)\s(.).*?\s+(.)(.*?)$/, '$1 $2. $3.');
    }

    return (
        <AntHeader className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            
            <div className="profile" style={{ display: 'flex', alignItems: 'center', fontSize: '1.3em' }}>
                {userData && (
                    <div style={{ marginRight: '8px' }}>
                        <p style={{ fontSize: '1.1em' }}> {userData} </p>
                        
                    </div>
                )}
                <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#A9A9A9' }} />
                                
            </div>
        </AntHeader>
    );
};

export default Header;