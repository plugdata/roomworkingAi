/**
 * Frontend JavaScript for roomworkingAi test interface
 */

let currentConversationId = null;

// Utility functions
const displayInfo = (elementId, data, isError = false) => {
  const element = document.getElementById(elementId);
  element.className = isError ? 'error' : 'success';
  element.textContent = JSON.stringify(data, null, 2);
};

const apiCall = async (url, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Status functions
const loadStatus = async () => {
  try {
    const [healthStatus, apiStatus, aiStatus] = await Promise.all([
      apiCall('/health'),
      apiCall('/api/status'),
      apiCall('/ai/status')
    ]);

    const statusData = {
      health: healthStatus,
      api: apiStatus,
      ai: aiStatus
    };

    displayInfo('status-info', statusData);
  } catch (error) {
    displayInfo('status-info', { error: error.message }, true);
  }
};

// Session functions
const createSession = async () => {
  const userId = document.getElementById('user-id').value;
  
  if (!userId) {
    displayInfo('session-info', { error: 'Please enter a User ID' }, true);
    return;
  }

  try {
    const result = await apiCall('/api/session/create', 'POST', { userId });
    displayInfo('session-info', result);
  } catch (error) {
    displayInfo('session-info', { error: error.message }, true);
  }
};

const getSessionInfo = async () => {
  try {
    const result = await apiCall('/api/session/info');
    displayInfo('session-info', result);
  } catch (error) {
    displayInfo('session-info', { error: error.message }, true);
  }
};

const destroySession = async () => {
  try {
    const result = await apiCall('/api/session/destroy', 'POST');
    displayInfo('session-info', result);
    currentConversationId = null;
  } catch (error) {
    displayInfo('session-info', { error: error.message }, true);
  }
};

// Cookie functions
const setCookie = async () => {
  const name = document.getElementById('cookie-name').value;
  const value = document.getElementById('cookie-value').value;
  
  if (!name || !value) {
    displayInfo('cookie-info', { error: 'Please enter both cookie name and value' }, true);
    return;
  }

  try {
    const result = await apiCall('/api/cookies/set', 'POST', { name, value });
    displayInfo('cookie-info', result);
  } catch (error) {
    displayInfo('cookie-info', { error: error.message }, true);
  }
};

const getCookie = async () => {
  const name = document.getElementById('cookie-name').value;
  
  if (!name) {
    displayInfo('cookie-info', { error: 'Please enter a cookie name' }, true);
    return;
  }

  try {
    const result = await apiCall(`/api/cookies/${name}`);
    displayInfo('cookie-info', result);
  } catch (error) {
    displayInfo('cookie-info', { error: error.message }, true);
  }
};

const clearCookie = async () => {
  const name = document.getElementById('cookie-name').value;
  
  if (!name) {
    displayInfo('cookie-info', { error: 'Please enter a cookie name' }, true);
    return;
  }

  try {
    const result = await apiCall(`/api/cookies/${name}`, 'DELETE');
    displayInfo('cookie-info', result);
  } catch (error) {
    displayInfo('cookie-info', { error: error.message }, true);
  }
};

// AI Conversation functions
const startConversation = async () => {
  const topic = document.getElementById('conversation-topic').value || 'General Chat';
  
  try {
    const result = await apiCall('/ai/conversation/start', 'POST', { topic });
    currentConversationId = result.conversationId;
    displayInfo('conversation-info', result);
  } catch (error) {
    displayInfo('conversation-info', { error: error.message }, true);
  }
};

const sendMessage = async () => {
  const message = document.getElementById('message-input').value;
  
  if (!message) {
    displayInfo('conversation-info', { error: 'Please enter a message' }, true);
    return;
  }

  if (!currentConversationId) {
    displayInfo('conversation-info', { error: 'Please start a conversation first' }, true);
    return;
  }

  try {
    const result = await apiCall(`/ai/conversation/${currentConversationId}/message`, 'POST', { message });
    displayInfo('conversation-info', result);
    
    // Clear the message input
    document.getElementById('message-input').value = '';
  } catch (error) {
    displayInfo('conversation-info', { error: error.message }, true);
  }
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load initial status
  loadStatus();

  // Add enter key support for inputs
  document.getElementById('user-id').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') createSession();
  });

  document.getElementById('cookie-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getCookie();
  });

  document.getElementById('cookie-value').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') setCookie();
  });

  document.getElementById('conversation-topic').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startConversation();
  });

  document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});

// Global functions for button onclick handlers
window.createSession = createSession;
window.getSessionInfo = getSessionInfo;
window.destroySession = destroySession;
window.setCookie = setCookie;
window.getCookie = getCookie;
window.clearCookie = clearCookie;
window.startConversation = startConversation;
window.sendMessage = sendMessage;