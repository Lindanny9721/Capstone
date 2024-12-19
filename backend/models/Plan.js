import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  geometry: {
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  vicinity: { type: String, required: true },
  types: { type: [String], required: true },
  photos: [{
    photo_reference: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
  }],
  rating: { type: Number },
});

const plannerSchema = new mongoose.Schema({
  name: { type: String, required: true},
  places: {
    type: [placeSchema],
    required: true,
  },
});

const Plan = mongoose.model('Plan', plannerSchema);

export default Plan;