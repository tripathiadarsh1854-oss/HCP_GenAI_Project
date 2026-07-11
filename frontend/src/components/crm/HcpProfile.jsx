import { Activity, Building2, HeartPulse, Phone, Save, User } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

export default function HcpProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    specialty: 'Cardiology',
    hospital: 'Mercy General Hospital',
    email: 'jsmith@example.com',
    phone: '(555) 123-4567',
    region: 'Northeast Region',
    sentiment: 'Positive',
    status: 'Active'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Saving CRM Data:", formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Profile Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-500 border-2 border-slate-800 flex items-center justify-center text-white shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Dr. {formData.firstName} {formData.lastName}
            </h2>
            <span className="text-sm font-medium text-blue-300 flex items-center gap-1 mt-0.5">
              <HeartPulse className="w-4 h-4" /> {formData.specialty}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            formData.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            Status: {formData.status}
          </span>
          <Button 
            variant={isEditing ? "primary" : "outline"} 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className={!isEditing ? "bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-700 hover:text-white" : ""}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSave} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* Section: Personal Details */}
          <div className="col-span-1 md:col-span-2 border-b border-gray-100 pb-2 mb-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Professional Details</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700 disabled:border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700 disabled:border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Primary Hospital
            </label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700 disabled:border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Provider Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700 disabled:border-gray-200 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Do Not Contact">Do Not Contact</option>
            </select>
          </div>

          {/* Section: Contact & Sentiment */}
          <div className="col-span-1 md:col-span-2 border-b border-gray-100 pb-2 mb-2 mt-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contact & Intelligence</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700 disabled:border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> Direct Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700 disabled:border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Territory / Region</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-700 disabled:border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Relationship Sentiment</label>
            <select
              name="sentiment"
              value={formData.sentiment}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-2.5 text-sm border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:border-gray-200 focus:ring-2 focus:ring-blue-500 font-medium ${
                !isEditing && formData.sentiment === 'Positive' ? 'text-green-600' :
                !isEditing && formData.sentiment === 'Negative' ? 'text-red-600' :
                !isEditing ? 'text-amber-600' : 'text-gray-900'
              }`}
            >
              <option value="Positive">Positive - Strong Advocate</option>
              <option value="Neutral">Neutral - Needs Nurturing</option>
              <option value="Negative">Negative - At Risk</option>
            </select>
          </div>
        </div>

        {/* Save Button triggers when editing */}
        {isEditing && (
          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
            <Button type="submit" variant="primary" className="flex items-center gap-2 px-8">
              <Save className="w-4 h-4" /> Save Profile
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}