import React from 'react';
import icon from "../../assets/img/chatbotIcon.png";
import './ChatbotComponent.css';

const ChatbotComponent = () => {
  return (
    <div>
        <button 
          className='iconChatbot'
          onClick={() => alert('Chatbot clicked!')}
          style={{ backgroundImage: `url(${icon})` }}
        >
        </button>
    </div>
  );
}

export default ChatbotComponent;
