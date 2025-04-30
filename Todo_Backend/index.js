const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
console.log('DB:', db);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// GET all tasks
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST create task
app.post('/api/task', (req, res) => {
  const { assignedTo, status, due_date, priority, comments } = req.body;
  db.query(
    'INSERT INTO tasks (assignedTo, status, due_date, priority, comments) VALUES (?, ?, ?, ?, ?)',
    [assignedTo, status, due_date, priority, comments],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// PUT update task
app.put('/api/task/:id', (req, res) => {
  const { id } = req.params;
  const { assignedTo, status, due_date, priority, comments } = req.body;
  db.query(
    'UPDATE tasks SET assignedTo=?, status=?, due_date=?, priority=?, comments=? WHERE id=?',
    [assignedTo, status, due_date, priority, comments, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// DELETE task
app.delete('/api/task/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
