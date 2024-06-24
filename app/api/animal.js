const express = require('express');
const router = express.Router();
const { createAnimal, getAnimalById, getAllAnimals, updateAnimalById, deleteAnimalById } = require('../controller/animal');
const upload = require('../middleware/uploads');

router
    .post('/', upload.single('foto'), createAnimal)
    .get('/', getAllAnimals)
    .get('/:id', getAnimalById)
    .put('/:id', upload.single('foto'), updateAnimalById)
    .delete('/:id', deleteAnimalById);

module.exports = router;
