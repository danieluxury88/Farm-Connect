import { getDatabase } from './db.js';

const BASE_URL = 'https://agro.seriousdesign.net';
// const BASE_URL = 'http://agro.test';

export async function addWeightRecord(animal_id, weight, date) {
    const db = await getDatabase();
    const payload = {
        weight: weight,
        date: date
    };

    try {
        const response = await fetch(`${BASE_URL}/api/animals/${animal_id}/weight-records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to sync with server');
        }
        console.log('Data successfully synced with the server.');
    } catch (error) {
        console.warn('Network error or server down. Saving locally...', error);

        // Store locally if the request fails
        db.run(`
            INSERT INTO weight_records (animal_id, weight, date)
            VALUES (?, ?, ?)`, [animal_id, weight, date]);

        // Save the database to localStorage
        const data = db.export();
        localStorage.setItem('farmmanager-db', JSON.stringify(Array.from(data)));
        console.log('Record stored locally.');
    }
}

export async function getWeightRecords() {
    const db = await getDatabase();
    const results = db.exec(`SELECT * FROM weight_records`);
    return results[0] ? results[0].values : [];
}
