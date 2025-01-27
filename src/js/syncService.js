import { getDatabase } from './db.js';

const BASE_URL = 'https://agro.seriousdesign.net';
// const BASE_URL = 'http://agro.test';

export async function syncRecordsToServer() {
    const db = await getDatabase();
    const results = db.exec(`SELECT * FROM weight_records`);
    if (!results[0]) {
        console.log('No records to sync.');
        return;
    }

    const records = results[0].values;

    for (const record of records) {
        const [id, animal_id, weight, date] = record;
        try {
            const response = await fetch(`${BASE_URL}/api/animals/${animal_id}/weight-records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ weight, date })
            });

            if (response.ok) {
                // Remove synced record from the local database
                db.run('DELETE FROM weight_records WHERE id = ?', [id]);
                console.log(`Record ID ${id} synced and removed from local storage.`);
            } else {
                console.warn(`Failed to sync record ID ${id}`);
            }

        } catch (error) {
            console.error('Error syncing record:', error);
        }
    }

    // Save updated database after syncing
    const data = db.export();
    localStorage.setItem('farmmanager-db', JSON.stringify(Array.from(data)));
}
