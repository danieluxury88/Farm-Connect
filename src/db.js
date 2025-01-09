import initSqlJs from 'sql.js';

export async function getDatabase() {
    const SQL = await initSqlJs({
        locateFile: () => '/public/sql-wasm.wasm' // Ensure proper path
    });

    // Check if a previous database exists in localStorage
    const storedDb = localStorage.getItem('farmmanager-db');
    let db;

    if (storedDb) {
        // Load the existing database
        db = new SQL.Database(new Uint8Array(JSON.parse(storedDb)));
        console.log('Database loaded from local storage');
    } else {
        // Create a new database and initialize tables
        db = new SQL.Database();
        db.run(`
            CREATE TABLE IF NOT EXISTS weight_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                animal_id INTEGER NOT NULL,
                weight REAL NOT NULL,
                date TEXT NOT NULL
            )
        `);
        console.log('New database and table created');
    }

    // Return the database instance
    return db;
}
