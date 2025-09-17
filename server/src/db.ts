import sqlite3 from "sqlite3";
import { open } from "sqlite";

sqlite3.verbose();

export async function openDB() {
    return open({
        filename: "./messages.db",  // файл базы данных
        driver: sqlite3.Database
    });
}
