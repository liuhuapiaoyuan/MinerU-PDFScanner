import Database from '@tauri-apps/plugin-sql';
 
let db: Database;

export async function createDatabase() {
    db  = await Database.load('sqlite:database.db')
    return db
}

export { db};