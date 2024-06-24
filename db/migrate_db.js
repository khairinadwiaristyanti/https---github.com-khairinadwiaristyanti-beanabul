const pool = require('../db/db');

const createTableUser = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    const [results,] = await pool.query(query);
    return results;
}

const createTableAnimal = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS animals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nama_kucing VARCHAR(255) NOT NULL,
            nama_pemilik VARCHAR(255) NOT NULL,
            ras VARCHAR(255) NOT NULL,
            usia INT NOT NULL,
            jenis_kelamin VARCHAR(255) NOT NULL,
            lokasi VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            foto VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    const [results,] = await pool.query(query);
    return results;
}

const migrateTables = async () => {
    try {
        createTableAnimal();
        createTableUser();
        console.log('Tables migrated successfully');
    } catch (error) {
        console.log('Error migrating tables: ', error);
    }
}

migrateTables();