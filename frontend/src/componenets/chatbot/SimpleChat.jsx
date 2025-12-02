import React, { useState, useRef, useEffect } from 'react';
import './SimpleChat.css';
import ChatMessage from './ChatMessage';
import { sendMessage } from '../../api/chatbot';

const SimpleChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: '안녕하세요! 팝업스토어 검색을 도와드릴게요. 😊\n\n• 지역으로 검색: "강남 팝업", "홍대 팝업스토어"\n• 카테고리로 검색: "패션 팝업", "뷰티 팝업"\n• 추천 받기: "추천해줘", "인기 팝업"\n\n무엇을 도와드릴까요?',
            isBot: true,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputValue,
            isBot: false,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await sendMessage(inputValue);

            const botMessage = {
                id: Date.now() + 1,
                text: response.message,
                isBot: true,
                timestamp: new Date(),
                popupStores: response.popupStores || [],
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                text: '죄송합니다. 일시적인 오류가 발생했어요. 😢\n잠시 후 다시 시도해주세요.',
                isBot: true,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    
    const handleQuickAction = (action) => {
        setInputValue(action);
        // Optionally send the message directly
        // handleSendMessage(action); 
    };

    const floatingButtonStyle = {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #eba9cf 0%, #f4002d 100%)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        zIndex: 9999,
    };

    return (
        <>
            <button style={floatingButtonStyle} onClick={toggleChat}>
                🤖
            </button>

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="header-content">
                            <div className="bot-avatar">🤖</div>
                            <div className="header-text">
                                <h3>POPPOP 챗봇</h3>
                                <p>팝업스토어 검색 도우미</p>
                            </div>
                        </div>
                        <button className="close-button" onClick={toggleChat}>
                            ✕
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} isBot={message.isBot} />
                        ))}
                        {isLoading && (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="quick-actions">
                        <button onClick={() => handleQuickAction('추천해줘')}>⭐ 추천</button>
                        <button onClick={() => handleQuickAction('강남 팝업')}>📍 강남</button>
                        <button onClick={() => handleQuickAction('패션 팝업')}>👗 패션</button>
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="메시지를 입력하세요..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            className="send-button"
                        >
                            {isLoading ? '⏳' : '📤'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SimpleChat;
