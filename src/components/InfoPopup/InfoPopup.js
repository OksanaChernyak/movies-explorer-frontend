import React from "react";
import "./InfoPopup.css";

function InfoPopup({isOpen, onClose, notification}) {
    return (
        <div className={isOpen ? `popup popup_opened popup_type_tip` : `popup popup_type_tip`}>
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    onClick={onClose}
                    type="button"
                    aria-label="Закрыть попап"
                ></button>
                <p className="popup__notification-text">{notification.text}</p>
            </div>
        </div>
    );
}

export default InfoPopup;