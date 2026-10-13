-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2026 at 07:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tarabar_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cargo_owners`
--

CREATE TABLE `cargo_owners` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `national_id` varchar(20) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cargo_owners`
--

INSERT INTO `cargo_owners` (`id`, `first_name`, `last_name`, `company_name`, `national_id`, `avatar_url`, `createdAt`, `updatedAt`, `user_id`) VALUES
(1, 'امیرعلی ', 'هادوی', NULL, '0927526263', NULL, '2026-10-13 15:40:34', '2026-10-13 15:40:34', 1),
(2, 'dawda', 'dawwda', NULL, '0927526263', NULL, '2026-10-13 17:24:16', '2026-10-13 17:24:16', 2);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `province`) VALUES
(2147483647, 'آب بر', 'زنجان');

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `shipment_id` int(11) DEFAULT NULL,
  `type` enum('driver','dispatcher','cargo','delay','other') NOT NULL,
  `description` text NOT NULL,
  `evidence_url` varchar(255) DEFAULT NULL,
  `status` enum('pending','reviewed','resolved','rejected') DEFAULT 'pending',
  `admin_response` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shipment_id` int(11) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `message` varchar(500) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `shipment_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `driver_score` int(11) DEFAULT NULL,
  `dispatcher_score` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipments`
--

CREATE TABLE `shipments` (
  `id` int(11) NOT NULL,
  `tracking_code` varchar(20) NOT NULL,
  `origin_city_id` int(11) NOT NULL,
  `origin_zone_id` int(11) DEFAULT NULL,
  `origin_address` text NOT NULL,
  `origin_lat` decimal(10,8) NOT NULL,
  `origin_lng` decimal(11,8) NOT NULL,
  `dest_city_id` int(11) NOT NULL,
  `dest_zone_id` int(11) DEFAULT NULL,
  `dest_address` text DEFAULT NULL,
  `dest_lat` decimal(10,8) DEFAULT NULL,
  `dest_lng` decimal(11,8) DEFAULT NULL,
  `cargo_type` varchar(50) NOT NULL,
  `cargo_type_other` varchar(100) DEFAULT NULL,
  `packaging_type` varchar(50) DEFAULT NULL,
  `weight_kg` decimal(10,2) NOT NULL,
  `length_cm` int(11) DEFAULT NULL,
  `width_cm` int(11) DEFAULT NULL,
  `height_cm` int(11) DEFAULT NULL,
  `cargo_value` bigint(20) NOT NULL,
  `photo_urls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`photo_urls`)),
  `notes` text DEFAULT NULL,
  `loading_date` date NOT NULL,
  `loading_time_from` varchar(5) NOT NULL,
  `loading_time_to` varchar(5) NOT NULL,
  `loading_time_ranges` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`loading_time_ranges`)),
  `urgency` enum('urgent','today','tomorrow','scheduled') NOT NULL DEFAULT 'scheduled',
  `vehicle_type_id` int(11) NOT NULL,
  `vehicle_variant` varchar(50) DEFAULT NULL,
  `vehicle_variants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`vehicle_variants`)),
  `loading_method` enum('forklift','crane','manual','ramp','other') NOT NULL,
  `unloading_method` enum('forklift','crane','manual','ramp','other') DEFAULT NULL,
  `receiver_name` varchar(100) NOT NULL,
  `receiver_phone` varchar(15) NOT NULL,
  `receiver_national_id` varchar(10) DEFAULT NULL,
  `receiver_postal_code` varchar(10) DEFAULT NULL,
  `proposed_price` bigint(20) NOT NULL,
  `operator_price` bigint(20) DEFAULT NULL,
  `price_status` enum('pending','proposed','accepted','rejected') DEFAULT 'pending',
  `status` enum('pending_review','rejected','price_proposed','searching_driver','driver_assigned','at_pickup','in_transit','delivered','completed','cancelled') DEFAULT 'pending_review',
  `rejection_reason` text DEFAULT NULL,
  `cancel_reason` text DEFAULT NULL,
  `cancelled_by` enum('owner','operator') DEFAULT NULL,
  `reminder_sent_at` datetime DEFAULT NULL,
  `owner_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `role` enum('cargo_owner','driver','dispatcher','operator','security','admin') NOT NULL DEFAULT 'cargo_owner',
  `otp_code` varchar(6) DEFAULT NULL,
  `otp_expires_at` datetime DEFAULT NULL,
  `otp_last_sent_at` datetime DEFAULT NULL,
  `otp_attempts` int(11) DEFAULT 0,
  `is_phone_verified` tinyint(1) DEFAULT 0,
  `rating_avg` decimal(2,1) DEFAULT 0.0,
  `is_active` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone_number`, `role`, `otp_code`, `otp_expires_at`, `otp_last_sent_at`, `otp_attempts`, `is_phone_verified`, `rating_avg`, `is_active`, `createdAt`, `updatedAt`) VALUES
(1, '09153909859', 'cargo_owner', NULL, NULL, '2026-10-13 15:40:43', 0, 1, 0.0, 1, '2026-10-13 15:39:52', '2026-10-13 15:40:44'),
(2, '09915051383', 'cargo_owner', NULL, NULL, '2026-10-13 17:23:34', 0, 1, 0.0, 1, '2026-10-13 17:23:34', '2026-10-13 17:24:16');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_types`
--

CREATE TABLE `vehicle_types` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `max_weight_kg` int(11) NOT NULL,
  `max_length_cm` int(11) DEFAULT NULL,
  `max_width_cm` int(11) DEFAULT NULL,
  `max_height_cm` int(11) DEFAULT NULL,
  `base_price` bigint(20) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_types`
--

INSERT INTO `vehicle_types` (`id`, `title`, `max_weight_kg`, `max_length_cm`, `max_width_cm`, `max_height_cm`, `base_price`, `is_active`) VALUES
(1, 'خاور/۹۱۱', 5000, 430, 200, 210, 4500000, 1),
(2, 'کامیون تک (۱۰ تن)', 10000, 600, 230, 230, 7000000, 1),
(3, 'کامیون جفت (۱۵ تن)', 15000, 750, 240, 240, 9500000, 1),
(4, 'تریلی', 27000, 1200, 245, 270, 14000000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE `zones` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `city_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cargo_owners`
--
ALTER TABLE `cargo_owners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cities_name_province` (`name`,`province`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `shipment_id` (`shipment_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `shipment_id` (`shipment_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shipment_id` (`shipment_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tracking_code` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_2` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_3` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_4` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_5` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_6` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_7` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_8` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_9` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_10` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_11` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_12` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_13` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_14` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_15` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_16` (`tracking_code`),
  ADD UNIQUE KEY `tracking_code_17` (`tracking_code`),
  ADD KEY `origin_city_id` (`origin_city_id`),
  ADD KEY `origin_zone_id` (`origin_zone_id`),
  ADD KEY `dest_city_id` (`dest_city_id`),
  ADD KEY `dest_zone_id` (`dest_zone_id`),
  ADD KEY `vehicle_type_id` (`vehicle_type_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD UNIQUE KEY `phone_number_2` (`phone_number`),
  ADD UNIQUE KEY `phone_number_3` (`phone_number`),
  ADD UNIQUE KEY `phone_number_4` (`phone_number`),
  ADD UNIQUE KEY `phone_number_5` (`phone_number`),
  ADD UNIQUE KEY `phone_number_6` (`phone_number`),
  ADD UNIQUE KEY `phone_number_7` (`phone_number`),
  ADD UNIQUE KEY `phone_number_8` (`phone_number`),
  ADD UNIQUE KEY `phone_number_9` (`phone_number`),
  ADD UNIQUE KEY `phone_number_10` (`phone_number`),
  ADD UNIQUE KEY `phone_number_11` (`phone_number`),
  ADD UNIQUE KEY `phone_number_12` (`phone_number`),
  ADD UNIQUE KEY `phone_number_13` (`phone_number`),
  ADD UNIQUE KEY `phone_number_14` (`phone_number`),
  ADD UNIQUE KEY `phone_number_15` (`phone_number`),
  ADD UNIQUE KEY `phone_number_16` (`phone_number`),
  ADD UNIQUE KEY `phone_number_17` (`phone_number`),
  ADD UNIQUE KEY `phone_number_18` (`phone_number`);

--
-- Indexes for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_id` (`city_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cargo_owners`
--
ALTER TABLE `cargo_owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `zones`
--
ALTER TABLE `zones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cargo_owners`
--
ALTER TABLE `cargo_owners`
  ADD CONSTRAINT `cargo_owners_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_ibfk_33` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `complaints_ibfk_34` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_33` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_34` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_33` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_34` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_100` FOREIGN KEY (`dest_zone_id`) REFERENCES `zones` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `shipments_ibfk_101` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shipments_ibfk_102` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shipments_ibfk_97` FOREIGN KEY (`origin_city_id`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `shipments_ibfk_98` FOREIGN KEY (`origin_zone_id`) REFERENCES `zones` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `shipments_ibfk_99` FOREIGN KEY (`dest_city_id`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `zones`
--
ALTER TABLE `zones`
  ADD CONSTRAINT `zones_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
