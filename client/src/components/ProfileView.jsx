import React from 'react';
import { Edit } from 'lucide-react';

const ProfileView = ({ user, onEdit }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">YOUR PROFILE HAS BEEN CREATED!</h1>
      <div className="bg-[#D1CCB6] rounded-3xl p-8 w-full shadow-lg">
        <ProfileField label="Name" value={user.name} />
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Selected Block" value={user.Block.label} />
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#1E1E1E] font-semibold">Interested In:</label>
            <button
              onClick={onEdit}
              className="bg-[#8F33BA] text-white px-3 py-1 rounded-md text-sm flex items-center"
            >
              <Edit size={16} className="mr-1" />
              Edit
            </button>
          </div>
          <div className="bg-white rounded-xl p-3">
            <ul className="list-disc list-inside">
              {user.interested_in.map((interest, index) => (
                <li key={index} className="text-[#4D4D4D]">{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="mb-4">
    <label className="block text-[#1E1E1E] font-semibold mb-1">{label}</label>
    <div className="bg-white rounded-xl p-3 text-[#4D4D4D]">{value}</div>
  </div>
);

export default ProfileView;