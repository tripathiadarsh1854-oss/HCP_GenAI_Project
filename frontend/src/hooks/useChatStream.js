import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, appendAiStream, setLoadingState } from '../store/chatSlice';

// Pass an optional 'onToolExecute' function into the hook
export const useChatStream = (onToolExecute) => {
  const dispatch = useDispatch();
  const { currentThreadId, isLoading } = useSelector((state) => state.chat);
  const [error, setError] = useState(null);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    dispatch(addUserMessage(messageText));
    setError(null);

    try {
      const response = await fetch('/api/agent/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          thread_id: currentThreadId,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let isFirstChunk = true;
      let buffer = ''; 

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop();

        for (const line of parts) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            
            if (dataStr === '{"status": "[DONE]"}') {
               break;
            }

            try {
              const parsed = JSON.parse(dataStr);
              console.log("FROM PYTHON ->", parsed);
              
              // Intercept the Tool Execution

              if (parsed.tool_calls && parsed.tool_calls.length > 0) {
                 const toolCall = parsed.tool_calls[0];
                 console.log("AI is using tool:", toolCall.name);

                 // If the AI decides to log an interaction, grab the data!
                if ((toolCall.name === "log_interaction_tool" || toolCall.name === "edit_interaction_tool") && onToolExecute) {
                    try {
                       
                        let toolArgs;
                        if (typeof toolCall.args === 'string') {
                            toolArgs = JSON.parse(toolCall.args);
                        } else {
                            toolArgs = toolCall.args; // It's already an object!
                        }
                        
                        // Fire the walkie-talkie! Send data up to SplitScreen.jsx
                        onToolExecute(toolArgs);
                    } catch (parseErr) {
                        console.error("Could not parse tool args:", parseErr);
                    }
                }
              }

              // Append AI text to the screen
              if (parsed.type === 'ai' && parsed.content) {
                dispatch(appendAiStream({ 
                  chunk: parsed.content, 
                  isNewMessage: isFirstChunk 
                }));
                isFirstChunk = false; 
              }
            } catch (err) {
              console.error("JSON parse error on string:", dataStr);
            }
          }
        }
      }
    } catch (err) {
      console.error('Stream error:', err);
      setError(err.message);
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  return { sendMessage, error };
};