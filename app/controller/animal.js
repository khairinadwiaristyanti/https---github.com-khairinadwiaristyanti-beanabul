const Animal = require('../model/animal');

exports.createAnimal = async (req, res) => {
    try {
        const { nama_kucing, nama_pemilik, ras, usia, jenis_kelamin, lokasi, description } = req.body;
        const foto = req.file ? req.file.filename : null;
        const newAnimal = { nama_kucing, nama_pemilik, ras, usia, jenis_kelamin, lokasi, description, foto };

        const animal = await Animal.createAnimal(newAnimal);
        res.status(201).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.getAnimalById(req.params.id);
        if (!animal) {
            return res.status(404).json({ error: 'Animal not found' });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.getAllAnimals();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAnimalById = async (req, res) => {
    try {
        const { nama_kucing, nama_pemilik, ras, usia, jenis_kelamin, lokasi, description } = req.body;
        const foto = req.file ? req.file.filename : null;
        const updatedAnimal = { nama_kucing, nama_pemilik, ras, usia, jenis_kelamin, lokasi, description, foto };

        const animal = await Animal.updateAnimalById(req.params.id, updatedAnimal);
        if (!animal) {
            return res.status(404).json({ error: 'Animal not found' });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAnimalById = async (req, res) => {
    try {
        await Animal.deleteAnimalById(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
