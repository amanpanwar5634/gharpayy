const Listing = require('../models/Listing');

// Controller for adding a listing
const addListing = async (req, res) => {
  try {
    const {
      name,
      location,
      gender,
      propType,
      status,
      openDate,
      amenities,
      photos,
      description
    } = req.body;

    const newListing = new Listing({
      name,
      location,
      gender,
      propType,
      status,
      openDate: status === 'not_open' ? openDate : 'NA',
      amenities,
      photos,
      description
    });

    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({
      message: 'Error creating listing',
      error: error.message || 'Unknown error',
    });
  }
};

// Controller for fetching all listings
const getAllListings = async (req, res) => {
  try {
    
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({
      message: 'Error fetching listings',
      error: error.message || 'Unknown error',
    });
  }
};

module.exports = {
  addListing,
  getAllListings,
};
