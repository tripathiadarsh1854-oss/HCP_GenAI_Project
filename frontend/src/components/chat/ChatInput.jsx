import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

//  Accept onSendMessage as a prop from ChatBox
export default function ChatInput({ onSendMessage }) {
  const [text, setText] = useState('');
  const { isLoading } = useSelector((state) => state.chat);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // Call the function passed down from the parent
      onSendMessage(text);
      setText(''); // Clear input after sending
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          placeholder="Log a meeting, update status, or query doctor history..."
          className="w-full py-3 pl-4 pr-12 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="absolute right-2 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </form>
  );
}