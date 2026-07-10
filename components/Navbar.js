"use client";
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "" });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const result = await AuthService.logOut(token);
        if (result) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            router.push('/login');
        }
    }

    return (
        <div className="navbar">
            <div className="navbar-item">
                {user?.name ? <span className="navbar-user">Hola, {user.name}</span> : ''}
            </div>
            <div className="navbar-actions">
                <Button variant="text" onClick={() => router.push('/users')}>
                    Lista de Usuarios
                </Button>
                <Button variant="outlined" onClick={() => router.push('/register')}>
                    Crear Usuarios
                </Button>
                <Button variant="contained" color="error" style={{ background: '#f43f5e', boxShadow: '0 4px 14px 0 rgba(244, 63, 94, 0.4)' }} onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    );
}

export default Navbar;
