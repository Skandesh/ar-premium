import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import SearchBar from './SearchBar';
import ProfileForm from './ProfileForm';

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const fetchProfiles = () => {
    axios
      .get('http://localhost:5000/profiles')
      .then((res) => {
        setProfiles(res.data);
        setFilteredProfiles(res.data);
      })
      .catch((err) => console.error('Error fetching profiles', err));
  };
  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSearch = (searchTerm) => {
    const results = profiles.filter((profile) => {
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    setFilteredProfiles(results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Community Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      <ProfileForm />
      <div className="flex flex-wrap">
        {filteredProfiles &&
          filteredProfiles.map((profile) => (
            <ProfileCard key={profile._id} profile={profile} />
          ))}
        ;
      </div>
    </div>
  );
};

export default Dashboard;
