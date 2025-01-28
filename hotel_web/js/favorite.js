document.addEventListener('DOMContentLoaded', () => {
    const navbarBookNowButton = document.querySelector('.btn.nav-btn');
    const bookNowPopup = document.getElementById('book-now-popup');
    const roomDetailsContainer = document.getElementById('room-details');
    const closeBookNowButton = document.getElementById('close-book-now'); // Close button for the book-now popup
    let selectedRoom = null; // Variable to store the selected room details

    // Book Now button triggers the book-now popup
    document.querySelectorAll('.btn.nav-btn').forEach(button => {
        button.addEventListener('click', function () {
            const popup = document.getElementById('book-now-popup');
            const roomDetails = document.getElementById('room-details');

            roomDetails.innerHTML = ''; // Clear previous content

            // Retrieve selected room from sessionStorage
            const selectedBooking = JSON.parse(sessionStorage.getItem('selectedBooking'));
            console.log('Selected booking from sessionStorage:', selectedBooking); // Debugging line

            if (selectedBooking) {
                selectedRoom = selectedBooking; // Store the selected room globally
                roomDetails.innerHTML = `
                    <div class="room-item">
                        <h3>${selectedBooking.roomName}</h3>
                        <img src="${selectedBooking.roomImage}" alt="${selectedBooking.roomName}" style="width:100%; max-height: 200px;">
                        <p><strong>Price:</strong> ${selectedBooking.roomPrice}</p>
                        <p><strong>Description:</strong> ${selectedBooking.roomDescription}</p>
                        <p><strong>Check-In:</strong> ${selectedBooking.checkIn}</p>
                        <p><strong>Check-Out:</strong> ${selectedBooking.checkOut}</p>
                        <p><strong>Guest Count:</strong> ${selectedBooking.guests}</p>
                        <button id="delete-room-btn" class="delete-room-btn">Delete Room</button>
                    </div>
                `;
                // Add event listener to the delete button
                document.getElementById('delete-room-btn').addEventListener('click', deleteRoom);
            } else {
                roomDetails.innerHTML = '<p>No room selected yet. Please select a room first.</p>';
            }

            popup.style.display = 'flex'; // Show the pop-up
        });
    });

    // Delete the selected room from sessionStorage and the popup
    function deleteRoom() {
        // Remove the selected room from sessionStorage
        sessionStorage.removeItem('selectedBooking');

        // Update the global selectedRoom variable
        selectedRoom = null;

        // Clear the room details in the popup
        roomDetailsContainer.innerHTML = '<p>The selected room has been removed.</p>';

        console.log('Room has been deleted from the booking selection.');
    }

    // Close the Book Now popup when clicked outside or on close button
    window.addEventListener('click', (event) => {
        if (event.target === bookNowPopup || event.target === closeBookNowButton) {
            bookNowPopup.style.display = 'none';
        }
    });

    // Add CSS to make the popup scrollable
    const style = document.createElement('style');
    style.innerHTML = `
        #book-now-popup .popup-content {
            max-height: 80vh; /* Set a max height for the content */
            overflow-y: auto; /* Enable vertical scrolling */
        }
    `;
    document.head.appendChild(style);

    // Handle "Paint" button clicks to select rooms
    document.querySelectorAll('.paint-btn').forEach(button => {
        button.addEventListener('click', () => {
            const roomId = button.getAttribute('data-room-id') || "Unknown ID";
            const roomName = button.getAttribute('data-room-name') || "Unnamed Room";
            const roomDescription = button.getAttribute('data-room-description') || "No description available.";
            const roomPrice = button.getAttribute('data-room-price') || "Price not listed.";
            const roomImage = button.getAttribute('data-room-image') || "placeholder.jpg";
            const checkIn = '2025-01-07'; // Example check-in date, replace as needed
            const checkOut = '2025-01-09'; // Example check-out date, replace as needed
            const guests = '2'; // Example guest count, replace as needed

            // Save the selected room details to sessionStorage
            sessionStorage.setItem('selectedBooking', JSON.stringify({
                roomName: roomName,
                roomPrice: roomPrice,
                roomDescription: roomDescription,
                roomImage: roomImage,
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guests
            }));

            console.log('Selected room saved to sessionStorage:', {
                roomName: roomName,
                roomPrice: roomPrice,
                roomDescription: roomDescription,
                roomImage: roomImage,
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guests
            }); // Debugging line
        });
    });

    // Show the favorite rooms popup when the "Favorites" button is clicked
    document.querySelector('.btn1.nav-btn-favorite').addEventListener('click', function () {
        const favoriteRooms = getFavoriteRooms();

        const favoriteRoomsContainer = document.getElementById('favorite-rooms');
        favoriteRoomsContainer.innerHTML = ''; // Clear previous favorites

        if (favoriteRooms.length > 0) {
            favoriteRooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.classList.add('favorite-room-item');

                // Ensure room data is valid and use fallbacks for missing values
                const name = room.name || 'Unnamed Room';
                const description = room.description || 'No description available.';
                const price = room.price || 'Price not listed.';
                const id = room.id || 'Unknown ID';

                roomElement.innerHTML = `
                    <h4>${name}</h4>
                    <p>${description}</p>
                    <p>Price: ${price}</p>
                    <button class="delete-favorite-btn" data-room-id="${id}">Delete</button>
                `;
                favoriteRoomsContainer.appendChild(roomElement);
            });
        } else {
            favoriteRoomsContainer.innerHTML = '<p>No favorite rooms yet!</p>';
        }

        // Display the favorite popup
        document.getElementById('favorite-popup').style.display = 'flex';
    });

    // Close button for the favorite-popup
    document.getElementById('close-favorite').addEventListener('click', function () {
        document.getElementById('favorite-popup').style.display = 'none';
    });

    // Handle the favorite button click to add/remove a room from favorites
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function () {
            const roomId = this.getAttribute('data-room-id') || 'Unknown ID';
            const roomName = this.getAttribute('data-room-name') || 'Unnamed Room';
            const roomDescription = this.getAttribute('data-room-description') || 'No description available.'; 
            const roomPrice = this.getAttribute('data-room-price') || 'Price not listed.';

            const room = {
                id: roomId,
                name: roomName,
                description: roomDescription,
                price: roomPrice,
            };

            // Check if this room is already favorited
            if (this.classList.contains('favorited')) {
                // Remove from favorites
                removeFavorite(room);
                this.classList.remove('favorited');
                this.textContent = '❤️'; // Change heart to empty
            } else {
                // Add to favorites
                addFavorite(room);
                this.classList.add('favorited');
                this.textContent = '❤️'; // Change heart to filled
            }
        });
    });

    // Handle the delete favorite button click inside the popup
    document.getElementById('favorite-rooms').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('delete-favorite-btn')) {
            const roomId = event.target.getAttribute('data-room-id');

            // Delete the room from favorites
            removeFavoriteById(roomId);
            event.target.closest('.favorite-room-item').remove();
        }
    });

    // Function to get the user's favorite rooms from localStorage
    function getFavoriteRooms() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites;
    }

    // Function to add a room to favorites
    function addFavorite(room) {
        const favorites = getFavoriteRooms();
        if (!favorites.some(fav => fav.id === room.id)) {
            favorites.push(room);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    // Function to remove a room from favorites by ID
    function removeFavorite(room) {
        let favorites = getFavoriteRooms();
        favorites = favorites.filter(fav => fav.id !== room.id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Function to remove a room from favorites by ID in the popup
    function removeFavoriteById(roomId) {
        let favorites = getFavoriteRooms();
        favorites = favorites.filter(fav => fav.id !== roomId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
});
