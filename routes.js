// routes.js
const express = require('express');
const router  = express.Router();
const db      = require('./db');

// GET  /api/rooms
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rooms ORDER BY room_number');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// POST /api/rooms/allot
router.post('/allot', async (req, res) => {
  const { room_number, occupant_name } = req.body;
  if (!room_number || !occupant_name) {
    return res.status(400).json({ error: 'Missing room_number or occupant_name' });
  }
  try {
    await db.query(
      `UPDATE rooms 
       SET occupant_name = ?, is_occupied = TRUE 
       WHERE room_number = ?`,
      [occupant_name, room_number]
    );
    res.json({ message: 'Room allotted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to allot room' });
  }
});

// POST /api/rooms/checkout
router.post('/checkout', async (req, res) => {
  const { room_number } = req.body;
  if (!room_number) {
    return res.status(400).json({ error: 'Missing room_number' });
  }
  try {
    await db.query(
      `UPDATE rooms 
       SET occupant_name = NULL, is_occupied = FALSE 
       WHERE room_number = ?`,
      [room_number]
    );
    res.json({ message: 'Room checked out' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to checkout' });
  }
});

module.exports = router;
