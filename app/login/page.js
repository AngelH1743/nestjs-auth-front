"use client";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SimpleSnackbar from '../../components/SimpleSnackbar';
import { useRouter } from 'next/navigation';
import AuthService from '../../services/AuthService';
import './page.css';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState(true);

    const handleLogin = async () => {
        const login = await AuthService.handleLogin(email, password);
        setState(login);
        if (login) {
            router.push('/users');
        }
    }

    const handleRegister = () => {
        router.push('/register');
    }

    return (
        <div className="login-container">
            <SimpleSnackbar 
                message={"Usuario o contraseña incorrectos"} 
                openSnack={!state}
                closeSnack={() => setState(true)}
            />
            <div className="glass-card login-box">
                <h1>Inicia Sesión</h1>
                
                <div className="login-input-wrapper">
                    <TextField
                        fullWidth
                        id="email-input"
                        label="Email"
                        variant="outlined"
                        placeholder="alfa@beta.cl"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="login-input-wrapper">
                    <TextField
                        fullWidth
                        id="password-input"
                        label="Contraseña"
                        variant="outlined"
                        placeholder="*********"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="login-actions">
                    <Button fullWidth onClick={handleLogin} variant="contained">
                        Iniciar Sesión
                    </Button>
                    <Button fullWidth onClick={handleRegister} variant="outlined">
                        Crear una Cuenta
                    </Button>
                </div>
            </div>
        </div>
    );
}
