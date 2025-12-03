import React from "react";
import "./AdminModal.css";

function AdminModal({ isOpen, onClose, children }) {
    if(!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>닫기</button>
                {children}
            </div>
        </div>
    );
}

export default AdminModal;