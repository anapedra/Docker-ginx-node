const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'fullcycle',
  password: 'fullcycle',
  database: 'fullcycle'
});

// Conectar ao MySQL
connection.connect();

// Rota para adicionar um nome ao banco de dados
app.get('/', (req, res) => {
  const sql = `INSERT INTO people (name) VALUES ('Full Cycle Rocks')`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("1 registro inserido");
  });

  // Buscar lista de nomes
  connection.query('SELECT * FROM people', (err, rows) => {
    if (err) throw err;

    let namesList = '<ul>';
    rows.forEach(row => {
      namesList += `<li>${row.name}</li>`;
    });
    namesList += '</ul>';

    const html = `<h1>Full Cycle Rocks!</h1>\n${namesList}`;
    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
