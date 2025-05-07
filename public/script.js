async function loadRooms() {
  const res = await fetch('/api/rooms');
  const rooms = await res.json();
  renderGrid(rooms);
  renderOccupied(rooms);
}

function renderGrid(rooms) {
  const grid = document.getElementById('room-grid');
  grid.innerHTML = '';

  rooms.forEach(room => {
    const card = document.createElement('div');
    card.className = 'room-card' + (room.is_occupied ? ' occupied' : '');

    const inner = document.createElement('div');
    inner.className = 'room-inner';

    const front = document.createElement('div');
    front.className = 'room-front ' + (room.is_occupied ? 'occupied' : 'available');

    front.textContent = `Room ${room.room_number}`;

    const back = document.createElement('div');
    back.className = 'room-back';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter occupant name';

    const confirm = document.createElement('button');
    confirm.textContent = 'Confirm';
    confirm.onclick = async () => {
      const occupant_name = input.value.trim();
      if (!occupant_name) return;
      await fetch('/api/rooms/allot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_number: room.room_number, occupant_name })
      });
      loadRooms();
    };

    back.appendChild(input);
    back.appendChild(confirm);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    if (!room.is_occupied) {
      card.onclick = () => {
        document.querySelectorAll('.room-card').forEach(c => c.classList.remove('flipped'));
        card.classList.add('flipped');
      };
    }

    grid.appendChild(card);
  });
}

function renderOccupied(rooms) {
  const list = document.getElementById('occupied-list');
  list.innerHTML = '';
  rooms.filter(r => r.is_occupied).forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `
      Room ${r.room_number}: ${r.occupant_name}
      <button onclick="checkoutRoom(${r.room_number})">Checkout</button>
    `;
    list.appendChild(li);
  });
}

async function checkoutRoom(room_number) {
  await fetch('/api/rooms/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_number })
  });
  loadRooms();
}

loadRooms();
