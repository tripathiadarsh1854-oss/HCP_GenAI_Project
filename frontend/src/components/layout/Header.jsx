import { Database } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">CRM Intelligence</h1>
          <p className="text-xs text-gray-500 font-medium">HCP Interaction Platform</p>
        </div>
      </div>
    </header>
  );
}