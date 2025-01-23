import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./componentes/Navbar";
import Inicio from "./componentes/Inicio";
import Login from "./componentes/Login";
import Usuarios from "./componentes/Usuarios";
import MetodosPago from "./componentes/MetodosPago";
import PagosUsuarios from "./componentes/PagosUsuarios";
import AcercaDe from "./componentes/AcercaDe";
import "./componentes/Estilo.css"

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

interface MetodoPago {
  id: number;
  tipo: string;
  entidad: string;
}

interface PagoUsuario {
  id_usuario: number;
  id_metodo: number;
}

const App: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([]);
  const [pagosUsuarios, setPagosUsuarios] = useState<PagoUsuario[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUsuarios = localStorage.getItem("usuarios");
    const storedMetodosPago = localStorage.getItem("metodosPago");
    const storedPagosUsuarios = localStorage.getItem("pagosUsuarios");
    const loggedIn = localStorage.getItem("isAuthenticated");

    if (storedUsuarios) setUsuarios(JSON.parse(storedUsuarios));
    if (storedMetodosPago) setMetodosPago(JSON.parse(storedMetodosPago));
    if (storedPagosUsuarios) setPagosUsuarios(JSON.parse(storedPagosUsuarios));
    if (loggedIn === "true") setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem("metodosPago", JSON.stringify(metodosPago));
  }, [metodosPago]);

  useEffect(() => {
    localStorage.setItem("pagosUsuarios", JSON.stringify(pagosUsuarios));
  }, [pagosUsuarios]);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", JSON.stringify(status));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    alert("Goodbye");
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Inicio /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={isAuthenticated ? <Usuarios usuarios={usuarios} setUsuarios={setUsuarios} pagosUsuarios={pagosUsuarios}/> : <Navigate to="/login" />} />
          <Route path="/metodos-pago" element={isAuthenticated ? <MetodosPago metodosPago={metodosPago} setMetodosPago={setMetodosPago} pagosUsuarios={pagosUsuarios} /> : <Navigate to="/login" />} />
          <Route path="/pagos-usuarios" element={isAuthenticated ? <PagosUsuarios usuarios={usuarios} metodosPago={metodosPago} pagosUsuarios={pagosUsuarios} setPagosUsuarios={setPagosUsuarios} /> : <Navigate to="/login" />} />
          <Route path="/acerca-de" element={isAuthenticated ? <AcercaDe /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;