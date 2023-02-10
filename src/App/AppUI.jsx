import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Framewokrs from "../components/Frameworks";
import ModalInsertar from "../components/ModalInsertar";
import CrudContext from "../context";
import ModalEditar from "../components/ModalEditar";
import ModalEliminar from "../components/ModalEliminar";

function AppUI() {
  const baseUrl = "http://localhost/misproyectos/ApiFrameworks/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    lanzamiento: "",
    desarrollador: "",
  });

  //Metodo que permite capturar los datos de los inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    //console.log(form);
  };

  //Otra manera de hacer lo anterior

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(form);
  }; */

  const handleAbrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const handleAbrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const handleAbrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const peticionGet = async () => {
    //Aplicando Axios
    await axios
      .get(baseUrl)
      .then((response) => {
        //console.log(response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //Aplicando Fetch
    /* await fetch(baseUrl)
      .then((response) => response.json())
      .then((response) => console.log(response)); */
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const peticionPost = async () => {
    const f = new FormData();
    f.append("nombre", form.nombre);
    f.append("lanzamiento", form.lanzamiento);
    f.append("desarrollador", form.desarrollador);
    f.append("METHOD", "POST");
    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data));
        handleAbrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Metodo para Seleccionar un framework

  const seleccionarFramework = (framework, caso) => {
    setForm(framework);
    caso === "Editar"
      ? handleAbrirCerrarModalEditar()
      : handleAbrirCerrarModalEliminar();
  };

  //Petición PUT (update)
  const peticionPut = async () => {
    const f = new FormData();
    f.append("nombre", form.nombre);
    f.append("lanzamiento", form.lanzamiento);
    f.append("desarrollador", form.desarrollador);
    f.append("METHOD", "PUT");
    await axios
      .post(baseUrl, f, { params: { id: form.id } })
      .then((response) => {
        let dataNueva = data;
        dataNueva.map((framework) => {
          if (framework.id === form.id) {
            framework.nombre = form.nombre;
            framework.lanzamiento = form.lanzamiento;
            framework.desarrollador = form.desarrollador;
          }
        });
        setData(dataNueva);
        handleAbrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Petición DELETE
  const peticionDelete = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(baseUrl, f, { params: { id: form.id } })
      .then((response) => {
        setData(data.filter((framework) => framework.id !== form.id));
        handleAbrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CrudContext.Provider
        value={{
          modalInsertar,
          handleAbrirCerrarModalInsertar,
          handleAbrirCerrarModalEditar,
          handleAbrirCerrarModalEliminar,
          handleChange,
          peticionPost,
          form,
          modalEditar,
          seleccionarFramework,
          peticionPut,
          modalEliminar,
          peticionDelete,
        }}
      >
        <br />
        <button
          className="btn btn-success me-2"
          onClick={() => handleAbrirCerrarModalInsertar()}
        >
          Insertar Framework
        </button>
        <br />
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Lanzamiento</th>
              <th>Desarrollador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((framework) => {
              return (
                <Framewokrs
                  key={framework.id}
                  framework={framework}
                  handleAbrirCerrarModalEditar={handleAbrirCerrarModalEditar}
                />
              );
            })}
          </tbody>
        </table>

        <ModalInsertar
        //handleAbrirCerrarModalInsertar={handleAbrirCerrarModalInsertar}
        //modalInsertar={modalInsertar}
        //handleChange={handleChange}
        //form={form}
        //peticionPost={peticionPost}
        />
        <ModalEditar />
        <ModalEliminar />
      </CrudContext.Provider>
    </>
  );
}

export default AppUI;
