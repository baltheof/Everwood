const bookNowPopup = document.getElementById('book-now-popup');
const addRoomPopup = document.getElementById('add-room-popup');
const savedRoomsContainer = document.getElementById('saved-rooms');

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        const roomName = this.getAttribute('data-room-name') || "Unnamed Room";
        const roomPrice = this.getAttribute('data-price') || "Price not listed.";
        const roomDescription = this.getAttribute('data-description') || "No description available.";
        const roomImage = this.getAttribute('data-image') || "placeholder.jpg";

        const roomDetails = document.getElementById('room-details');
        roomDetails.innerHTML = `
            <h3>${roomName}</h3>
            <img src="${roomImage}" alt="${roomName}" style="width:100%; max-height: 300px; object-fit: cover;">
            <p><strong>Price:</strong> ${roomPrice}</p>
            <p><strong>Description:</strong> ${roomDescription}</p>
            <button class="btn" id="save-room">Save Room</button>
        `;

        bookNowPopup.style.display = 'flex';

        document.getElementById('save-room').addEventListener('click', function () {
            const roomItem = document.createElement('div');
            roomItem.className = 'room-item';
            roomItem.innerHTML = `
                <h4>${roomName}</h4>
                <p>${roomDescription}</p>
                <img src="${roomImage}" alt="${roomName}" style="width:100%; max-height: 150px; object-fit: cover;">
                <p><strong>Price:</strong> ${roomPrice}</p>
                <button class="delete-room-btn">Delete</button>
            `;

            roomItem.querySelector('.delete-room-btn').addEventListener('click', function () {
                roomItem.remove();
            });

            savedRoomsContainer.appendChild(roomItem);
        });
    });
});

document.getElementById('close-book-now').addEventListener('click', function () {
    bookNowPopup.style.display = 'none';
});

document.getElementById('add-room').addEventListener('click', function () {
    addRoomPopup.style.display = 'flex';
});

document.getElementById('close-add-room').addEventListener('click', function () {
    addRoomPopup.style.display = 'none';
});

document.getElementById('add-room-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const roomName = document.getElementById('room-name').value || "Unnamed Room";
    const roomPrice = document.getElementById('room-price').value || "Price not listed.";
    const roomDescription = document.getElementById('room-description').value || "No description available.";
    const roomImage = document.getElementById('room-image').value || "placeholder.jpg";

    const roomItem = document.createElement('div');
    roomItem.className = 'room-item';
    roomItem.innerHTML = `
        <h4>${roomName}</h4>
        <p>${roomDescription}</p>
        <img src="${roomImage}" alt="${roomName}" style="width:100%; max-height: 150px; object-fit: cover;">
        <p><strong>Price:</strong> ${roomPrice}</p>
        <button class="delete-room-btn">Delete</button>
    `;

    roomItem.querySelector('.delete-room-btn').addEventListener('click', function () {
        roomItem.remove();
    });

    savedRoomsContainer.insertBefore(roomItem, savedRoomsContainer.firstChild);
    addRoomPopup.style.display = 'none';
    document.getElementById('add-room-form').reset();
});
