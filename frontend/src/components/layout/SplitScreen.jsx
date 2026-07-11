import { useState } from 'react';
import ChatBox from '../chat/ChatBox'; // Assuming this holds your chat UI
import LogInteractionForm from '../crm/LogInteractionForm';

const SplitScreen = () => {
  // 1. The Shared State for the Form
  const [formData, setFormData] = useState({
    hcpName: '',
    interactionType: 'Meeting',
    date: '',
    time: '',
    attendees: '',
    topicsDiscussed: '',
    materialsShared: '',
    sentiment: ''
  });

  // 2. The function to auto-fill the form when the AI uses a tool
  const handleAIToolCall = (toolArgs) => {
    console.log("DEBUG: Data received in SplitScreen:", toolArgs);

    const dataToMap = toolArgs.updates ? toolArgs.updates : toolArgs;

    setFormData((prev) => ({
        ...prev,
        hcpName: dataToMap.hcp_name || prev.hcpName,
        time: dataToMap.interaction_time || prev.time,
        topicsDiscussed: dataToMap.narrative_notes || prev.topicsDiscussed,
        date: dataToMap.interaction_date || prev.date,
        materialsShared: dataToMap.materials || prev.materialsShared || "",
        attendees: dataToMap.attendees || prev.attendees || "",
        sentiment: dataToMap.sentiment || prev.sentiment
    }));
    };

  return (
    <div className="flex h-full bg-gray-100 p-4 gap-4">
      {/* LEFT PANE: The Form */}
      <div className="w-2/3 h-full overflow-hidden rounded-lg">
        <LogInteractionForm formData={formData} setFormData={setFormData} />
      </div>

      {/* RIGHT PANE: The AI Chat */}
      <div className="w-1/3 h-full overflow-hidden rounded-lg bg-white border border-gray-200">
        <ChatBox onToolExecute={handleAIToolCall} />
      </div>
    </div>
  );
};

export default SplitScreen;