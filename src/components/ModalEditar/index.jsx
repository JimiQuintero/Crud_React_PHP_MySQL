import React, { useContext } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import CrudContext from "../../context";

function ModalEditar() {
  const {
    modalEditar,
    handleAbrirCerrarModalEditar,
    handleChange,
    form,
    peticionPut,
  } = useContext(CrudContext);
  return (
    <div>
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={form && form.nombre}
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
            onClick={() => peticionPut()}
          >
            Editar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleAbrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalEditar;
