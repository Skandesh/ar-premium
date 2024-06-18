import React from 'react';

const ProfileCard = ({ profile }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{profile.name}</div>
        <p className="text-gray-700 text-base">
          Skills : {profile.skills.join(', ')}
        </p>
        <p className="text-gray-700 text-base">
          Current Activity : {profile.currentActivity}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
