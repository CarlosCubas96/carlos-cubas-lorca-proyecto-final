import React from 'react';
import FormButton from '../../Button/FormButton/formButton';

const ModalDelete = ({ show, onHide, onConfirm, title }) => {
  return (
    <>
      {show && (
        <>
          <div className="modal-backdrop" style={{ display: 'block', opacity: 0.5 }}></div>
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{}Confirmar eliminación</h5>
                  <button type="button" className="btn-close" onClick={onHide}></button>
                </div>
                <div className="modal-body">
                  ¿Estás seguro de que quieres eliminar?. Esta acción no se puede deshacer.
                </div>
                <div className="modal-footer">
                  <FormButton textColor="#141414" color="#F5F5F5" onClick={onHide}>Cancelar</FormButton>
                  <FormButton textColor="#141414" color="#F5F5F5" onClick={onConfirm}>Eliminar</FormButton>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalDelete;
