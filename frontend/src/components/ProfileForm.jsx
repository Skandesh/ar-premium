import React, { useState } from 'react';
import axios from 'axios';

const loadProfiles = () => {
  axios
    .get('http://localhost:5000/profiles')
    .then((response) => {
      console.log('Profiles:', response.data);
    })
    .catch((error) => console.error('Error fetching profiles:', error));
};

const ProfileForm = ({ loadProfiles }) => {
  const [formData, setFormData] = useState({
    name: '',
    skills: [],
    currentActivity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      ...formData,
      skills: formData.skills.split(',').map((skill) => skill.trim()),
      currentActivity: formData.currentActivity
        .split(',')
        .map((activity) => activity.trim()),
    };
    axios
      .post('http://localhost:5000/profiles', profileData)
      .then((response) => {
        console.log('Profile created:', response.data);
        // Reset the form after successful submission
        setFormData({
          name: '',
          skills: [],
          currentActivity: '',
        });
        loadProfiles();
      })
      .catch((error) => console.error('Error creating profile:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Skills:
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />
      </label>
      <label>
        Current Activity:
        <input
          type="text"
          name="currentActivity"
          value={formData.currentActivity}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
