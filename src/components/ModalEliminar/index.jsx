import React, { useContext } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import CrudContext from "../../context";

function ModalEliminar() {
  const {
    modalEliminar,
    handleAbrirCerrarModalEliminar,
    form,
    peticionDelete,
  } = useContext(CrudContext);
  return (
    <div>
      <Modal isOpen={modalEliminar}>
        <ModalHeader>Eliminar Framework</ModalHeader>
        <ModalBody>
          <h6>
            ¿Estás seguro de que deseas eliminar el framework{" "}
            {form && form.nombre}
          </h6>
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            className="btn btn-primary me-2"
            onClick={() => peticionDelete()}
          >
            Si
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleAbrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalEliminar;
