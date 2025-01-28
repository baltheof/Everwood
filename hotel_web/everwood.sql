-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 28 Ιαν 2025 στις 17:31:32
-- Έκδοση διακομιστή: 10.4.32-MariaDB
-- Έκδοση PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `everwood`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `rooms`
--

INSERT INTO `rooms` (`room_id`, `name`, `description`, `price`, `created_at`) VALUES
(1, 'A-Shaped Treehouse', 'A cozy, triangular A-frame design.', 200.00, '2025-01-25 12:21:20'),
(2, 'Beachfront Villa', 'Stay by the beach with amazing views.', 300.00, '2025-01-25 12:21:20'),
(3, 'Mountain Retreat', 'A secluded retreat in the mountains.', 250.00, '2025-01-25 12:21:20');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`id`, `surname`, `email`, `password`) VALUES
(1, 'theo', 'Baltheof1503@gmail.com', '$2y$10$l/ylOeYzXBdwc7JGdvWqwO1tiJSw5eBcPDl2LKtEafmHYMaVs4bMi'),
(2, 'dsfgvsdf', 'Baltheof503@gmail.com', '$2y$10$0GI.mC.eKtyyQdc308PAoOrRngWo4kDFkJKBnAO6dWC62wNQmyR0u'),
(3, 'theo', 'Baltheof@gmail.com', '$2y$10$n08Vo0sAb4CEJnpAG0Q3KueDreU4S1/W1VmgPuRx.nYiU2SLEE99y'),
(4, '1', 'Baltheof15@gmail.com', '$2y$10$MVRFodi459vLN6awkSy2UefyGAaqibmx3euFDwj5UnGRKsSi7IaCi'),
(5, '2', 'bal@gmail.com', '$2y$10$3486oG/qmNCwakISMM3/Du4xWCgX3.YRgnW9nysyy7aPUsziJlwzG'),
(6, '2', 'b@gmail.com', '$2y$10$E/F97.KQT7PrwP1klGjFj.aE1DmyN.Mhbsff7J.mP85vaYFio2AOS');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT για πίνακα `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
