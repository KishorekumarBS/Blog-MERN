import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Are you sure you want to delete this post?</h2>
                <p>You cannot undo this Action</p>
                <div className="modal-actions">
                    <button className="btn-confirm" onClick={onConfirm}>Yes</button>
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
