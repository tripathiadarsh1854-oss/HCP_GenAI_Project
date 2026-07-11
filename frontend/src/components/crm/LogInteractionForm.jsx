
const LogInteractionForm = ({ formData, setFormData }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Log HCP Interaction</h2>

      {/* Row 1: HCP Name & Interaction Type */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Interaction Details</label>
          <label className="block text-xs text-gray-500 mb-1">HCP Name</label>
          <input
            type="text"
            name="hcpName"
            value={formData.hcpName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Dr. Smith"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-1">.</label>
          <label className="block text-xs text-gray-500 mb-1">Interaction Type</label>
          <select
            name="interactionType"
            value={formData.interactionType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Meeting">Meeting</option>
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
          </select>
        </div>
      </div>

      {/* Row 2: Date & Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Attendees */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Attendees</label>
        <input
          type="text"
          name="attendees"
          value={formData.attendees}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter names or search..."
        />
      </div>

      {/* NEW: Sentiment Radio Buttons */}
      <div className="mb-6 bg-gray-50 p-3 rounded-md border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Sentiment</label>
        <div className="flex gap-6">
          {['positive', 'neutral', 'negative'].map((sent) => (
            <label key={sent} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer capitalize">
              <input
                type="radio"
                name="sentiment"
                value={sent}
                // Check if the current formData.sentiment matches this radio button
                checked={formData.sentiment?.toLowerCase() === sent} 
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              {sent}
            </label>
          ))}
        </div>
      </div>

      {/* Topics Discussed */}
      <div className="mb-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Topics Discussed</label>
        <textarea
          name="topicsDiscussed"
          value={formData.topicsDiscussed}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Product X efficiency."
        />
      </div>
      <div className="mb-6">
        <button className="text-blue-500 text-xs flex items-center hover:underline">
          🎙️ Summarize from Voice Note (Requires Consent)
        </button>
      </div>

      {/* Materials Shared */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Materials Shared / Samples Distributed</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            name="materialsShared"
            value={formData.materialsShared}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brochures."
          />
          <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-200 whitespace-nowrap">
            🔍 Search/Add
          </button>
        </div>
      </div>
      
      {/* Optional Save Button if you want them to manually review before sending to DB */}
      <div className="flex justify-end">
         <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold text-sm shadow-sm">
            Save Record
         </button>
      </div>
    </div>
  );
};

export default LogInteractionForm;