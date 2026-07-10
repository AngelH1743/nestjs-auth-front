import React from "react";
import { TextField } from "@mui/material";

const Register = ({ id, updateFormData, formData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(id, { ...formData, [name]: value });
  };

  return (
    <div className="register-inputs-container">
      <div className="input-form">
        <TextField
          id={`name-${id}`}
          label="Nombre"
          variant="outlined"
          required
          name="name"
          value={formData.name || ''}
          placeholder="Oleh Oleig"
          onChange={handleChange}
        />
      </div>
      <div className="input-form">
        <TextField
          id={`email-${id}`}
          label="Email"
          variant="outlined"
          required
          name="email"
          value={formData.email || ''}
          placeholder="alfa@beta.cl"
          onChange={handleChange}
        />
      </div>
      <div className="input-form">
        <TextField
          id={`password-${id}`}
          label="Contraseña"
          variant="outlined"
          required
          name="password"
          type="password"
          value={formData.password || ''}
          placeholder="****"
          onChange={handleChange}
        />
      </div>
      <div className="input-form">
        <TextField
          id={`password_second-${id}`}
          label="Confirmar Contraseña"
          variant="outlined"
          type="password"
          required
          name="password_second"
          value={formData.password_second || ''}
          placeholder="****"
          onChange={handleChange}
        />
      </div>
      <div className="input-form">
        <TextField
          id={`cellphone-${id}`}
          label="Teléfono"
          variant="outlined"
          required
          name="cellphone"
          value={formData.cellphone || ''}
          placeholder="+56987654321"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Register;
