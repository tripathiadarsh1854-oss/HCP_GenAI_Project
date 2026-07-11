import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  isLoading: false,
  currentThreadId: 'session_' + Date.now(),
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ role: 'user', content: action.payload });
      state.isLoading = true;
    },
    appendAiStream: (state, action) => {
      const { chunk, isNewMessage } = action.payload;
      if (isNewMessage) {
        state.messages.push({ role: 'ai', content: chunk });
      } else {
        const lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage && lastMessage.role === 'ai') {
          lastMessage.content += chunk;
        }
      }
    },
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.currentThreadId = 'session_' + Date.now();
    }
  },
});

export const { addUserMessage, appendAiStream, setLoadingState, clearChat } = chatSlice.actions;


export default chatSlice.reducer;