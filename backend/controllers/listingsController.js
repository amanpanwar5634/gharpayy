const Listing = require('../models/Listing');

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

const editListing = async (req, res) => {
  console.log("id recieved in backend", req.params.id);
  const listing = Listing.find((l) => l.id === req.params.id);
  if (listing) {
    res.json(listing);
  } else {
    res.status(404).json({ message: "Listing not found" });
  }
};

const updateListing = async (req, res) => {
  console.log("id recieved in backend", req.params.id);
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

    const updatedFields = {
      name,
      location,
      gender,
      propType,
      status,
      openDate: status === 'not_open' ? openDate : 'NA',
      amenities,
      photos,
      description
    };

   
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,             
      updatedFields,            
      { new: true, runValidators: true } // Options: return updated document and validate
    );

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({ message: 'Listing updated successfully', listing: updatedListing });
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({
      message: 'Error updating listing',
      error: error.message || 'Unknown error',
    });
  }
};


module.exports = {
  addListing,
  getAllListings,
  editListing,
  updateListing,
};
