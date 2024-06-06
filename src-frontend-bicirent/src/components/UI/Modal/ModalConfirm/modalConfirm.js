import React from 'react';
import FormButton from '../../Button/FormButton/formButton';
import './modalConfirm.css'; // Import the CSS file

const ModalConfirm = ({ show, onConfirm, title, body }) => {
  return (
    <>
      {show && (
        <>
          {/* Full-screen white background */}
          <div className="modal-fullscreen-background"></div>
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', zIndex: 1050 }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                </div>
                <div className="modal-body">
                  {body}
                </div>
                <div className="modal-footer">
                  <FormButton to={onConfirm} textColor="#141414" color="#F5F5F5">Aceptar</FormButton>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalConfirm;
