import ChatInput from './ChatInput';
import MessageList from './MessageList';
// Import your updated hook (adjust the path if needed based on your structure)
import { useChatStream } from '../../hooks/useChatStream';

export default function ChatBox({ onToolExecute }) {
  // 1. Initialize the hook and pass it the walkie-talkie function
  const { sendMessage, error } = useChatStream(onToolExecute);

  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      
      {/* Header */}
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          AI Agent Assistant
        </h2>
      </div>

      {/* Optional: Show stream errors if the network drops */}
      {error && (
        <div className="bg-red-100 border-b border-red-200 text-red-600 px-4 py-2 text-xs text-center">
          Connection Error: {error}
        </div>
      )}

      {/* Message Area */}
      <MessageList />
      
      {/* 2. Pass the sendMessage function down to the input area */}
      <ChatInput onSendMessage={sendMessage} />
      
    </div>
  );
}