const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Shipwreck = require('./models/shipwreck');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://<afiji.x04>:<CerealCerebral>@cluster0.j69rn.mongodb.net/<sample_geospatial>?retryWrites=true&w=majority', {
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
     const shipwrecks = await Shipwreck.find();
     res.json(shipwrecks);
 } catch (err) {
     res.status(500).json({ error: err.message });
 }
});

app.get('/shipwrecks/:id', async (req, res) => {
 try {
     const shipwreck = await Shipwreck.findById(req.params.id);
     if (!shipwreck) return res.status(404).json({ error: 'Shipwreck not found' });
     res.json(shipwreck);
 } catch (err) {
     res.status(500).json({ error: err.message });
 }
});

app.put('/shipwrecks/:id', async (req, res) => {
 try {
     const updatedShipwreck = await Shipwreck.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
     if (!updatedShipwreck) return res.status(404).json({ error: 'Shipwreck not found' });
     res.json(updatedShipwreck);
 } catch (err) {
     res.status(400).json({ error: err.message });
 }
});

app.delete('/shipwrecks/:id', async (req, res) => {
 try {
     const deletedShipwreck = await Shipwreck.findByIdAndDelete(req.params.id);
     if (!deletedShipwreck) return res.status(404).json({ error: 'Shipwreck not found' });
     res.json({ message: 'Shipwreck deleted' });
 } catch (err) {
     res.status(500).json({ error: err.message });
 }
});

app.listen(3000, () => {
 console.log('Server is running on port 3000');
});
