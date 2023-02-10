import React, { useContext } from "react";
import CrudContext from "../../context";

function Framewokrs({ framework }) {
  const { seleccionarFramework } = useContext(CrudContext);

  //const handleEditar = () => console.log("Click");
  return (
    <tr key={framework.id}>
      <td>{framework.id}</td>
      <td>{framework.nombre}</td>
      <td>{framework.lanzamiento}</td>
      <td>{framework.desarrollador}</td>
      <td>
        <button
          className="btn btn-primary me-2"
          onClick={() => seleccionarFramework(framework, "Editar")}
        >
          Editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => seleccionarFramework(framework, "Eliminar")}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Framewokrs;
