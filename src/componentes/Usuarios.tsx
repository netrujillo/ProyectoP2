import { useState } from "react";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

interface PagoUsuario {
  id_usuario: number;
  id_metodo: number;
}

interface Props {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  pagosUsuarios: PagoUsuario[];
}

const Usuarios: React.FC<Props> = ({ usuarios, setUsuarios, pagosUsuarios }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const validarNombre = (nombre: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
  const validarCorreo = (correo: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const agregarUsuario = () => {
    if (!validarNombre(nombre)) {
      setError("El nombre solo puede contener letras y espacios.");
      return;
    }
    if (!validarCorreo(correo)) {
      setError("Por favor, introduce un correo válido.");
      return;
    }

    setUsuarios([...usuarios, { id: Date.now(), nombre, correo }]);
    setNombre("");
    setCorreo("");
    setError("");
  };

  const editarUsuario = (id: number) => {
    const usuario = usuarios.find((u) => u.id === id);
    if (usuario) {
      setNombre(usuario.nombre);
      setCorreo(usuario.correo);
      setEditandoId(id);
      setError("");
    }
  };

  const actualizarUsuario = () => {
    if (!validarNombre(nombre)) {
      setError("El nombre solo puede contener letras y espacios.");
      return;
    }
    if (!validarCorreo(correo)) {
      setError("Por favor, introduce un correo válido.");
      return;
    }

    if (editandoId !== null) {
      setUsuarios(
        usuarios.map((u) =>
          u.id === editandoId ? { ...u, nombre, correo } : u
        )
      );
      setNombre("");
      setCorreo("");
      setEditandoId(null);
      setError("");
    }
  };

  const eliminarUsuario = (id: number) => {
    const usuarioAsociado = pagosUsuarios.find((pago) => pago.id_usuario === id);

    if (usuarioAsociado) {
      alert("No se puede eliminar este usuario porque tiene métodos de pago asociados.");
      return;
    }

    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  return (
    <div className="container">
      <h1>Gestión de Usuarios</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {editandoId ? (
        <button onClick={actualizarUsuario}>Actualizar</button>
      ) : (
        <button onClick={agregarUsuario}>Agregar</button>
      )}

      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>
                <button onClick={() => editarUsuario(u.id)}>Editar</button>
                <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;