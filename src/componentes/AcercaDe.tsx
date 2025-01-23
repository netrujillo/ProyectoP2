import React from "react";

const AcercaDe: React.FC = () => {
  return (
    <div className="acerca-de">
      <h1>Acerca de Mí</h1>
      <img src="https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg" alt="Foto de perfil" className="perfil-imagen" />
      <p><strong>Nombre:</strong> Nicole Trujillo</p>
      <p><strong>Correo:</strong> netrujillo@espe.edu.ec</p>
      <p>
        Siempre estoy aprendiendo nuevas tecnologías y mejorando mis habilidades para ofrecer las mejores soluciones.
      </p>
    </div>
  );
};

export default AcercaDe;

