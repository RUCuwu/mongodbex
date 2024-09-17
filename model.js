const mongoose = require('mongoose');

const shipwreckSchema = new mongoose.Schema({
 name: {
     type: String,
     required: true,
     unique: true,
     index: true,
 },
 location: {
     type: String,
     required: true,
 },
 yearDiscovered: {
     type: Number,
     required: true,
 },
 depth: {
     type: Number,
     required: true,
     min: 0,
 },
 description: {
     type: String,
     required: true,
 },
}, {
 timestamps: true
});

shipwreckSchema.index({ location: 1, depth: 1 });

const Shipwreck = mongoose.model('Shipwreck', shipwreckSchema);

module.exports = Shipwreck;