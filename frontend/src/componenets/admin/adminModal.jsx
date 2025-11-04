import React from "react";
import "./adminModal.css";

function AdminModal({ isOpen, onClose, children }) {
    if(!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>&items;</button>
                {children}
            </div>
        </div>
    );
}

export default AdminModal;