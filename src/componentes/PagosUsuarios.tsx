import React, { useState } from "react";

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

interface PagosUsuario {
  id_usuario: number;
  id_metodo: number;
}

interface PropsPagosUsuarios {
  pagosUsuarios: PagosUsuario[];
  setPagosUsuarios: React.Dispatch<React.SetStateAction<PagosUsuario[]>>;
  usuarios: Usuario[];
  metodosPago: MetodoPago[];
}

const PagosUsuarios: React.FC<PropsPagosUsuarios> = ({
  pagosUsuarios,
  setPagosUsuarios,
  usuarios,
  metodosPago,
}) => {
  const [idUsuario, setIdUsuario] = useState<number>(0);
  const [idMetodo, setIdMetodo] = useState<number>(0);

  const agregarPagoUsuario = () => {
    if (idUsuario === 0 || idMetodo === 0) {
      alert("Debe seleccionar un usuario y un método de pago.");
      return;
    }

    const nuevoPago: PagosUsuario = {
      id_usuario: idUsuario,
      id_metodo: idMetodo,
    };

    setPagosUsuarios([...pagosUsuarios, nuevoPago]);
    setIdUsuario(0);
    setIdMetodo(0);
  };

  const eliminarPagoUsuario = (id_usuario: number, id_metodo: number) => {
    const nuevosPagos = pagosUsuarios.filter(
      (pago) => pago.id_usuario !== id_usuario || pago.id_metodo !== id_metodo
    );
    setPagosUsuarios(nuevosPagos);
  };

  return (
    <div>
      <h1>Pagos de Usuarios</h1>
      <div>
        <select value={idUsuario} onChange={(e) => setIdUsuario(Number(e.target.value))}>
          <option value={0}>Seleccione un Usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </option>
          ))}
        </select>

        <select value={idMetodo} onChange={(e) => setIdMetodo(Number(e.target.value))}>
          <option value={0}>Seleccione un Método de Pago</option>
          {metodosPago.map((metodo) => (
            <option key={metodo.id} value={metodo.id}>
              {metodo.tipo} - {metodo.entidad}
            </option>
          ))}
        </select>

        <button onClick={agregarPagoUsuario}>Asociar Pago</button>
      </div>

      <h2>Lista de Pagos de Usuarios</h2>
      <table border={1} style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Método de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagosUsuarios.map((pago, index) => (
            <tr key={index}>
              <td>{usuarios.find((u) => u.id === pago.id_usuario)?.nombre}</td>
              <td>
                {metodosPago.find((m) => m.id === pago.id_metodo)?.tipo} -{" "}
                {metodosPago.find((m) => m.id === pago.id_metodo)?.entidad}
              </td>
              <td>
                <button onClick={() => eliminarPagoUsuario(pago.id_usuario, pago.id_metodo)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagosUsuarios;