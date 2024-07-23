const sqlite3 = require('sqlite3').verbose();

const DB_FILE = './MY_DB.db';

// Відкриття з'єднання з базою даних
let db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    return console.error('Помилка підключення до бази даних:', err.message);
  }
  console.log('Підключено до бази даних SQLite.');

  // Виконання SQL-запиту для отримання всіх таблиць
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      return console.error('Помилка отримання списку таблиць:', err.message);
    }
    console.log('Список таблиць у базі даних:');
    tables.forEach((table) => {
      console.log(table);
    });

    // Закриття з'єднання з базою даних після завершення роботи
    db.close((err) => {
      if (err) {
        return console.error('Помилка закриття бази даних:', err.message);
      }
      console.log('Закрито з\'єднання з базою даних SQLite.');
    });
  });
});
