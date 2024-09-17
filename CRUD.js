import { Schema, model, connect } from 'mongoose';

const shipwreckSchema = new Schema({
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

const Shipwreck = model('Shipwreck', shipwreckSchema);

export default Shipwreck;

import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import Shipwreck, { find, findById, findByIdAndUpdate, findByIdAndDelete } from './models/shipwreck';

const app = express();
app.use(json());

connect('mongodb://localhost:27017/shipwrecks', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.post('/shipwrecks', async (req, res) => {
 try {
     const newShipwreck = new Shipwreck(req.body);
     await newShipwreck.save();
     res.status(201).json(newShipwreck);
 } catch (err) {
     res.status(400).json({ error: err.message });
 }
});

app.get('/shipwrecks', async (req, res) => {
 try {
     const shipwrecks = await find();
     res.json(shipwrecks);
 } catch (err) {
     res.status(500).json({ error: err.message });
 }
});

app.get('/shipwrecks/:id', async (req, res) => {
 try {
     const shipwreck = await findById(req.params.id);
     if (!shipwreck) return res.status(404).json({ error: 'Shipwreck not found' });
     res.json(shipwreck);
 } catch (err) {
     res.status(500).json({ error: err.message });
 }
});

app.put('/shipwrecks/:id', async (req, res) => {
 try {
     const updatedShipwreck = await findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
     if (!updatedShipwreck) return res.status(404).json({ error: 'Shipwreck not found' });
     res.json(updatedShipwreck);
 } catch (err) {
     res.status(400).json({ error: err.message });
 }
});

app.delete('/shipwrecks/:id', async (req, res) => {
 try {
     const deletedShipwreck = await findByIdAndDelete(req.params.id);
     if (!deletedShipwreck) return res.status(404).json({ error: 'Shipwreck not found' });
     res.json({ message: 'Shipwreck deleted' });
 } catch (err) {
     res.status(500).json({ error: err.message });
 }
});

app.listen(3000, () => {
 console.log('Server is running on port 3000');
});