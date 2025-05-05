// script.js

// Fetch & render rooms
async function loadRooms() {
    const res   = await fetch('/api/rooms');
    const rooms = await res.json();
    renderGrid(rooms);
    renderOccupied(rooms);
  }
  
  // Render room blocks
  function renderGrid(rooms) {
    const grid = document.getElementById('room-grid');
    grid.innerHTML = '';
    rooms.forEach(room => {
      const div = document.createElement('div');
      div.className = 'room' + (room.is_occupied ? ' occupied' : '');
      div.textContent = `Room ${room.room_number}`;
      if (!room.is_occupied) {
        div.onclick = () => assignRoom(room.room_number);
      }
      grid.appendChild(div);
    });
  }
  
  // Render occupied list
  function renderOccupied(rooms) {
    const list = document.getElementById('occupied-list');
    list.innerHTML = '';
    rooms.filter(r => r.is_occupied)
         .forEach(r => {
           const li = document.createElement('li');
           li.innerHTML = `
             ${r.room_number}: ${r.occupant_name}
             <button onclick="checkoutRoom(${r.room_number})">Checkout</button>
           `;
           list.appendChild(li);
         });
  }
  
  // Assign a room
  async function assignRoom(room_number) {
    const occupant_name = prompt('Enter occupant name:');
    if (!occupant_name) return;
    await fetch('/api/rooms/allot', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ room_number, occupant_name })
    });
    loadRooms();
  }
  
  // Checkout a room
  async function checkoutRoom(room_number) {
    await fetch('/api/rooms/checkout', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ room_number })
    });
    loadRooms();
  }
  
  // Initialize
  loadRooms();
  