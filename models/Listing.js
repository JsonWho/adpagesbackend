const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({

  listing_cat: {
    id: { 
    type: Number,
    required: true },

    name: {
      type: String,
      required: true
    }
  },

  listing_type: {
    type: String,
    required: true
  },

  selected_profile_id: {
    type: Number,
    required: true
  },

  profile_details: { 

        id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      suburb: {
        type: String
      },
      background: {
        type: Object
      },
      
      description: mongoose.Mixed

       },
//end profile details


        updated_date: {
        type: Date,
        default: Date.now
      }





});

module.exports = Listing = mongoose.model('listing', ListingSchema);
