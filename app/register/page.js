"use client";

import React from "react";
import { Container, Button } from "@mui/material";
import SimpleSnackbar from "@/components/SimpleSnackbar";
import AuthService from "@/services/AuthService";
import Register from "@/components/registerform";
import Navbar from "@/components/RegisterNavbar"; 

import './page.css';
import RegisterNavbar from "@/components/RegisterNavbar";

const initialFormState = () => ({
  name: "",
  email: "",
  password: "",
  password_second: "",
  cellphone: ""
});

const Registers = () => {
  const [message, setMessage] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [registers, setRegisters] = React.useState([{ id: Date.now(), formData: initialFormState() }]);

  const addRegister = () => {
    setRegisters([...registers, { id: Date.now() + Math.random(), formData: initialFormState() }]);
  };

  const deleteRegister = (id) => {
    setRegisters(registers.filter(register => register.id !== id));
  };

  const updateFormData = (id, data) => {
    setRegisters(registers.map(register => register.id === id ? { ...register, formData: data } : register));
  };

  const handleRegisterAll = async () => {
    const emails = registers.map(register => register.formData.email);
    const uniqueEmails = new Set(emails);
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Verificar si hay emails duplicados en los formularios actuales
    if (emails.length !== uniqueEmails.size) {
      setMessage("Hay emails duplicados en los formularios.");
      setOpenSnack(true);
      return;
    }

    // Verificar si alguno de los emails ya está registrado
    for (const email of emails) {
      if (existingUsers.some(user => user.email === email)) {
        setMessage(`El email ${email} ya está registrado.`);
        setOpenSnack(true);
        return;
      }
    }

    for (let index = 0; index < registers.length; index++) {
      const register = registers[index];
      const { name, email, password, password_second, cellphone } = register.formData;
      if (password !== password_second) {
        setMessage(`Las contraseñas no coinciden para el registro ${index + 1}`);
        setOpenSnack(true);
        return;
      }
      const response = await AuthService.registerUser(name, email, password, password_second, cellphone);
      if (!response) {
        setMessage(`Error al registrar usuario ${index + 1}`);
        setOpenSnack(true);
        return;
      }
    }
    
    setMessage("Todos los usuarios registrados exitosamente!");
    setOpenSnack(true);
  };

  return (
    <div className="register-page-container">
      <RegisterNavbar />
      <Container maxWidth="lg">
        <SimpleSnackbar
          message={message}
          openSnack={openSnack}
          closeSnack={() => { setOpenSnack(!openSnack); }}
        />
        
        <div className="register-header-section">
          <h1>Registro de Múltiples Usuarios</h1>
          <p>Llena los datos para registrar varios usuarios en lote.</p>
        </div>

        <div className="register-actions-bar">
          <div style={{ color: 'var(--text-secondary)' }}>
            Total a registrar: <strong>{registers.length}</strong>
          </div>
          <div className="register-actions-bar-buttons">
            <Button onClick={addRegister} variant="outlined">
              + Añadir Formulario
            </Button>
            <Button onClick={handleRegisterAll} variant="contained" color="success" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)' }}>
              Registrar Todos
            </Button>
          </div>
        </div>

        <div className="register-forms-grid">
          {registers.map((register, index) => (
            <div key={register.id} className="glass-card register-form-card">
              <div className="register-form-card-header">
                <h2>Usuario #{index + 1}</h2>
                {registers.length > 1 && (
                  <Button 
                    onClick={() => deleteRegister(register.id)} 
                    variant="text" 
                    color="error"
                    style={{ minWidth: 'auto', padding: '4px 8px', color: 'var(--error)' }}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
              <div className="register-form-card-body">
                <Register
                  id={register.id}
                  updateFormData={updateFormData}
                  formData={register.formData}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Registers;
