import { Link, useNavigate } from "react-router-dom";

interface Props {
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/usuarios">Usuarios</Link>
      <Link to="/metodos-pago">Métodos de Pago</Link>
      <Link to="/pagos-usuarios">Pagos Usuarios</Link>
      <Link to="/acerca-de">Acerca de</Link>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
};

export default Navbar;
