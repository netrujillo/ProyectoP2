import React, { useState, useEffect } from "react";

interface MetodoPago {
  id: number;
  tipo: string;
  entidad: string;
}

interface PagoUsuario {
  id_usuario: number;
  id_metodo: number;
}

interface Props {
  metodosPago: MetodoPago[];
  setMetodosPago: React.Dispatch<React.SetStateAction<MetodoPago[]>>;
  pagosUsuarios: PagoUsuario[];
}

const MetodosPago: React.FC<Props> = ({ metodosPago, setMetodosPago, pagosUsuarios }) => {
  const [tipo, setTipo] = useState("");
  const [entidad, setEntidad] = useState("");
  const [editarId, setEditarId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("metodosPago", JSON.stringify(metodosPago));
  }, [metodosPago]);

  const agregarMetodoPago = () => {
    if (tipo.trim() === "" || entidad.trim() === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevoMetodo: MetodoPago = {
      id: Date.now(),
      tipo,
      entidad,
    };
    setMetodosPago([...metodosPago, nuevoMetodo]);
    setTipo("");
    setEntidad("");
  };

  const eliminarMetodoPago = (id: number) => {
    const metodoAsociado = pagosUsuarios.find((pago) => pago.id_metodo === id);
  
    if (metodoAsociado) {
      alert("No se puede eliminar este método de pago porque está asociado a un usuario.");
      return;
    }
  
    setMetodosPago(metodosPago.filter((metodo) => metodo.id !== id));
  };
  

  const actualizarMetodoPago = () => {
    if (tipo.trim() === "" || entidad.trim() === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    setMetodosPago(
      metodosPago.map((metodo) =>
        metodo.id === editarId ? { ...metodo, tipo, entidad } : metodo
      )
    );
    setEditarId(null);
    setTipo("");
    setEntidad("");
  };

  return (
    <div>
      <h1>Gestión de Métodos de Pago</h1>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Seleccione un tipo</option>
        <option value="PayPal">PayPal</option>
        <option value="Criptomonedas">Criptomonedas</option>
        <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
        <option value="Tarjeta de Débito">Tarjeta de Débito</option>
        <option value="Transferencia Bancaria">Transferencia Bancaria</option>
        <option value="Efectivo">Efectivo</option>
        <option value="Cheque">Cheque</option>
      </select>

      <select value={entidad} onChange={(e) => setEntidad(e.target.value)}>
        <option value="">Seleccione una entidad</option>
        <option value="Banco Pichincha">Banco Pichincha</option>
        <option value="Banco Guayaquil">Banco Guayaquil</option>
        <option value="Banco del Pacífico">Banco del Pacífico</option>
        <option value="Cooperativa JEP">Cooperativa JEP</option>
        <option value="Banco Internacional">Banco Internacional</option>
        <option value="Banco Produbanco">Banco Produbanco</option>
        <option value="Banco Bolivariano">Banco Bolivariano</option>
        <option value="Banco de Loja">Banco de Loja</option>
      </select>

      {editarId === null ? (
        <button onClick={agregarMetodoPago}>Agregar</button>
      ) : (
        <button onClick={actualizarMetodoPago}>Actualizar</button>
      )}

      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Entidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {metodosPago.map((metodo) => (
            <tr key={metodo.id}>
              <td>{metodo.id}</td>
              <td>{metodo.tipo}</td>
              <td>{metodo.entidad}</td>
              <td>
                <button onClick={() => eliminarMetodoPago(metodo.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditarId(metodo.id);
                    setTipo(metodo.tipo);
                    setEntidad(metodo.entidad);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetodosPago;