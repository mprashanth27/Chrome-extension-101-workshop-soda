let activeChat = null;

// Configure side panel behavior
chrome.runtime.onInstalled.addListener(() => {
  // Set up the side panel to open on action click
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error('Error setting panel behavior:', error));
});

// Listen for messages from the side panel if the request is from the side panel and the type is SEND_MESSAGE
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SEND_MESSAGE') {
    handleChatMessage(request.message);
  } else if (request.type === 'CLEAR_CHAT') {
    clearChat();
  }
});

// Clear the chat history from the local storage
async function clearChat() {
  activeChat = null;
  await chrome.storage.local.remove('chatHistory');
}

//function to handle the chat message
/*
* 1. Get the api key from the local storage
* 2. Get the chat history from the local storage
* 3. If the api key is not set, send an error message to the side panel
* 4. If the api key is set, send the message to the chat history
* 5. Send the response back to the side panel
* 6. Update the chat history
* 7. Keep only the last 50 messages to prevent the context from getting too large
* 8. Send the response back to the side panel
*/
