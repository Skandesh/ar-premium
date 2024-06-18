const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
    console.log(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    skills: req.body.skills,
    currentActivity: req.body.currentActivity,
  });

  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getProfile(req, res, next) {
  let profile;
  try {
    profile = await Profile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Cannot find profile' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.profile = profile;
  next();
}

router.get('/:id', getProfile, (req, res) => {
  res.json(res.profile);
});

router.patch('/:id', getProfile, async (req, res) => {
  if (req.body.name != null) {
    res.profile.name = req.body.name;
  }
  if (req.body.skills != null) {
    res.profile.skills = req.body.skills;
  }
  if (req.body.currentActivity != null) {
    res.profile.currentActivity = req.body.currentActivity;
  }
  try {
    const updatedProfile = await res.profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getProfile, async (req, res) => {
  try {
    await res.profile.remove();
    res.json({ message: 'Deleted profile' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
