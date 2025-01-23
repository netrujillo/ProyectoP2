import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onLogin: (isAuthenticated: boolean) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const usuariosValidos = [
    { usuario: "admin", contraseña: "1234" },
    { usuario: "user", contraseña: "1234" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioValido = usuariosValidos.find(
      (user) => user.usuario === userName && user.contraseña === password
    );

    if (usuarioValido) {
      localStorage.setItem("isAuthenticated", "true");
      onLogin(true);
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;