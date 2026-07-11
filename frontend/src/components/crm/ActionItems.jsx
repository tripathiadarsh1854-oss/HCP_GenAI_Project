import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ActionItems() {
  // Use React state to make the items interactive
  const [items, setItems] = useState([
    { id: 1, text: "Send updated clinical trial data for CardioShield", status: "pending", date: "Today" },
    { id: 2, text: "Schedule follow-up lunch and learn with staff", status: "completed", date: "Yesterday" },
  ]);

  // Function to toggle the checkbox status when clicked
  const toggleStatus = (id) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' } 
        : item
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex-1">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-orange-500" />
        Pending Action Items
      </h3>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            onClick={() => toggleStatus(item.id)}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors cursor-pointer"
          >
            {item.status === 'completed' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className={`text-sm font-medium select-none ${item.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                {item.text}
              </p>
              <p className="text-xs text-gray-500 mt-1">Due: {item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}