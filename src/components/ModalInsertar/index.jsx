import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import CrudContext from "../../context";

function ModalInsertar({}) {
  const {
    modalInsertar,
    handleAbrirCerrarModalInsertar,
    handleChange,
    form,
    peticionPost,
  } = useContext(CrudContext);
  return (
    <div>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={form.nombre}
            />
            <br />
            <label>Lanzamiento</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="lanzamiento"
              onChange={handleChange}
              value={form.lanzamiento}
            />
            <br />
            <label>Desarrollador</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="desarrollador"
              onChange={handleChange}
              value={form.desarrollador}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            className="btn btn-primary me-2"
            onClick={() => peticionPost()}
          >
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleAbrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalInsertar;
