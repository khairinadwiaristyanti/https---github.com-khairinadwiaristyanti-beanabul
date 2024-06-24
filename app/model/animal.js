const pool = require('../../db/db');

const createAnimal = async (newAnimal) => {
    const query = "INSERT INTO animals SET ?";
    const [result] = await pool.query(query, newAnimal);
    return { id: result.insertId, ...newAnimal };
};

const getAnimalById = async (id) => {
    const query = `SELECT * FROM animals WHERE id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
};

const getAllAnimals = async () => {
    const query = "SELECT * FROM animals";
    const [rows] = await pool.query(query);
    return rows;
};

const updateAnimalById = async (id, animal) => {
    const query = "UPDATE animals SET ? WHERE id = ?";
    await pool.query(query, [animal, id]);
    return { id, ...animal };
};

const deleteAnimalById = async (id) => {
    const query = "DELETE FROM animals WHERE id = ?";
    await pool.query(query, [id]);
};

module.exports = {
    createAnimal,
    getAnimalById,
    getAllAnimals,
    updateAnimalById,
    deleteAnimalById
};
