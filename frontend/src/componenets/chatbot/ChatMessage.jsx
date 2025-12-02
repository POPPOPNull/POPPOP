import React from 'react';
import './ChatMessage.css';
import { useNavigate } from 'react-router-dom';

const ChatMessage = ({ message, isBot }) => {
    const navigate = useNavigate();

    const handlePopupClick = (popupNo) => {
        navigate(`/user/${popupNo}`);
    };

    return (
        <div className={`chat-message ${isBot ? 'bot' : 'user'}`}>
            <div className="message-content">
                {message.text && <p className="message-text">{message.text}</p>}

                {message.popupStores && message.popupStores.length > 0 && (
                    <div className="popup-list">
                        {message.popupStores.map((popup) => (
                            <div
                                key={popup.no}
                                className="popup-card"
                                onClick={() => handlePopupClick(popup.no)}
                            >
                                <div className="popup-info">
                                    <h4 className="popup-name">{popup.name}</h4>
                                    <p className="popup-brand">{popup.brandName}</p>
                                    <div className="popup-details">
                                        <span className="popup-location">📍 {popup.location}</span>
                                        <span className="popup-category">🏷️ {popup.categoryName}</span>
                                    </div>
                                    <p className="popup-date">
                                        📅 {popup.startDate} ~ {popup.endDate}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="message-time">
                {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default ChatMessage;
