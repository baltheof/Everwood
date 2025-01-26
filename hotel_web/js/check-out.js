document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("booking-form");
    const checkoutPopup = document.getElementById("checkout-popup");
    const roomSelectionPopup = document.getElementById("room-selection-popup");
    const closeRoomSelection = document.getElementById("close-room-selection");
    const closeCheckoutPopup = document.getElementById("close-popup2");
    const bookNowPopup = document.getElementById("book-now-popup");
    const roomSelectionContainer = document.getElementById("room-selection-container");
    const bookNowDetails = document.getElementById("room-details");
    const bookNowBtn = document.getElementById("book-now-btn"); // Assume this is the navbar button
    const errorMessage = document.getElementById("error-message");

    let selectedBooking = null; // Store the booking details here

    // Listen for form submission to open room selection popup
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        const checkIn = document.getElementById("check-in").value;
        const checkOut = document.getElementById("check-out").value;
        const guests = document.getElementById("guest").value;

        // Validate form fields (make sure they aren't empty)
        if (checkIn === "" || checkOut === "" || guests === "") {
            errorMessage.style.display = "block"; // Show error message if validation fails
        } else {
            errorMessage.style.display = "none"; // Hide error message if validation passes

            // Store the form data in session storage (or global variables) to pass to the Book Now button
            sessionStorage.setItem("checkIn", checkIn);
            sessionStorage.setItem("checkOut", checkOut);
            sessionStorage.setItem("guests", guests);

            // Trigger the room selection popup
            roomSelectionPopup.style.display = "flex";
            displayRandomRooms();
        }
    });

    // Close the Room Selection popup
    closeRoomSelection.addEventListener("click", function () {
        roomSelectionPopup.style.display = "none";
    });

    // Close the Checkout popup
    closeCheckoutPopup.addEventListener("click", function () {
        checkoutPopup.style.display = "none";
    });

    // Close the popup when the user clicks outside the popup
    window.addEventListener("click", function (event) {
        if (event.target === checkoutPopup) {
            checkoutPopup.style.display = "none";
        }
        if (event.target === roomSelectionPopup) {
            roomSelectionPopup.style.display = "none";
        }
    });

    function displayRandomRooms() {
        // This function will select 3 random rooms from the available rooms and display them
        const rooms = [
            {
                name: "A-Shaped Treehouse",
                price: "$200 - $400 per night",
                description: "Stay in style with a cozy, triangular A-frame design.",
                image: "img/2/room2.jpg"
            },
            {
                name: "Luxury Treehouse",
                price: "$400 - $600 per night",
                description: "A luxurious stay with breathtaking views.",
                image: "img/2/room3.jpg"
            },
            {
                name: "Mountain View Cabin",
                price: "$300 - $500 per night",
                description: "A cozy cabin with spectacular mountain views.",
                image: "img/2/room4.jpg"
            },
            {
                name: "Forest Retreat",
                price: "$250 - $450 per night",
                description: "Nestled in the forest for a peaceful retreat.",
                image: "img/2/room5.jpg"
            },
            {
                name: "Seaside Suite",
                price: "$500 - $800 per night",
                description: "Wake up to the sound of the ocean waves.",
                image: "img/2/room6.jpg"
            }
        ];

        // Shuffle and pick 3 random rooms
        const randomRooms = shuffleArray(rooms).slice(0, 3);
        roomSelectionContainer.innerHTML = ""; // Clear existing rooms

        randomRooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.classList.add('room-card');
            roomCard.innerHTML = `
                <img src="${room.image}" alt="${room.name}" style="width: 100%; height: auto;">
                <h3>${room.name}</h3>
                <p>${room.description}</p>
                <h5>Starting from <span>${room.price}</span></h5>
                <button class="btn" data-room-name="${room.name}" data-price="${room.price}" data-description="${room.description}" data-image="${room.image}">Choose This Room</button>
            `;
            roomSelectionContainer.appendChild(roomCard);
        });

        // Add event listeners for each room selection
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function () {
                const roomName = this.getAttribute('data-room-name');
                const roomPrice = this.getAttribute('data-price');
                const roomDescription = this.getAttribute('data-description');
                const roomImage = this.getAttribute('data-image');

                // Save the selected room details and form details to session storage
                selectedBooking = {
                    roomName,
                    roomPrice,
                    roomDescription,
                    roomImage,
                    checkIn: sessionStorage.getItem("checkIn"),
                    checkOut: sessionStorage.getItem("checkOut"),
                    guests: sessionStorage.getItem("guests")
                };

                // Close the Room Selection popup
                roomSelectionPopup.style.display = "none";

                // Show the Book Now popup with the selected details
                bookNowDetails.innerHTML = `
                    <h3>${roomName}</h3>
                    <img src="${roomImage}" alt="${roomName}" style="width:100%; max-height: 300px; object-fit: cover;">
                    <p><strong>Price:</strong> ${roomPrice}</p>
                    <p><strong>Description:</strong> ${roomDescription}</p>
                    <p><strong>Check-In:</strong> ${selectedBooking.checkIn}</p>
                    <p><strong>Check-Out:</strong> ${selectedBooking.checkOut}</p>
                    <p><strong>Guest Count:</strong> ${selectedBooking.guests}</p>
                    <button class="btn" id="confirm-booking">Confirm Booking</button>
                `;
                bookNowPopup.style.display = "flex";

                // Add event listener for Confirm Booking button
                document.getElementById("confirm-booking").addEventListener("click", function () {
                    // Save the booking details
                    sessionStorage.setItem("selectedBooking", JSON.stringify(selectedBooking));
                    alert("Booking Confirmed! Your details have been saved.");

                    // Update the Book Now navbar button with summary
                    bookNowBtn.innerText = `Book Now - ${selectedBooking.roomName}, ${selectedBooking.guests} Guests`;
                    bookNowPopup.style.display = "none"; // Close the popup
                });
            });
        });
    }

    // Helper function to shuffle array (for random room selection)
    function shuffleArray(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }
});
