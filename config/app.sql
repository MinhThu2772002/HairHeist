-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2023 at 02:20 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int(11) NOT NULL,
  `hairId` varchar(255) NOT NULL,
  `ownerId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `hairId`, `ownerId`, `createdAt`, `updatedAt`) VALUES
(3, '2d9eecd3-bba1-428d-8a9d-5aa8a2e8d543', '24712fdb-c186-4cf7-92b9-1983fe070ac0', '2023-01-07 13:15:14', '2023-01-07 13:15:14'),
(4, '5c3880b0-3e1d-4686-9388-bba7296ad23e', '24712fdb-c186-4cf7-92b9-1983fe070ac0', '2023-01-07 13:15:33', '2023-01-07 13:15:33');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `hairId` varchar(255) NOT NULL,
  `ownerId` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `hairId`, `ownerId`, `message`, `createdAt`, `updatedAt`) VALUES
(10, '5c3880b0-3e1d-4686-9388-bba7296ad23e', '24712fdb-c186-4cf7-92b9-1983fe070ac0', 'testing', '2023-01-07 13:16:00', '2023-01-07 13:16:00'),
(11, '5c3880b0-3e1d-4686-9388-bba7296ad23e', '24712fdb-c186-4cf7-92b9-1983fe070ac0', 'testing', '2023-01-07 13:16:02', '2023-01-07 13:16:02'),
(12, '2d9eecd3-bba1-428d-8a9d-5aa8a2e8d543', '24712fdb-c186-4cf7-92b9-1983fe070ac0', 'testingdasdasdsa', '2023-01-07 13:16:21', '2023-01-07 13:16:21'),
(13, '2d9eecd3-bba1-428d-8a9d-5aa8a2e8d543', '24712fdb-c186-4cf7-92b9-1983fe070ac0', 'testingdasdasdsa', '2023-01-07 13:16:22', '2023-01-07 13:16:22');

-- --------------------------------------------------------

--
-- Table structure for table `hairstyle`
--

CREATE TABLE `hairstyle` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url1` varchar(255) NOT NULL,
  `url2` varchar(255) DEFAULT NULL,
  `url3` varchar(255) DEFAULT NULL,
  `url4` varchar(255) DEFAULT NULL,
  `designerId` varchar(255) NOT NULL,
  `modelId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `hairId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hairstyle`
--

INSERT INTO `hairstyle` (`id`, `uuid`, `name`, `url1`, `url2`, `url3`, `url4`, `designerId`, `modelId`, `createdAt`, `updatedAt`, `hairId`) VALUES
(4, '2d9eecd3-bba1-428d-8a9d-5aa8a2e8d543', 'img1', 'abc', '234', NULL, NULL, '24712fdb-c186-4cf7-92b9-1983fe070ac0', NULL, '2023-01-07 13:04:54', '2023-01-07 13:04:54', NULL),
(5, '5c3880b0-3e1d-4686-9388-bba7296ad23e', 'img1', 'abc', '234', NULL, NULL, '24712fdb-c186-4cf7-92b9-1983fe070ac0', NULL, '2023-01-07 13:15:20', '2023-01-07 13:15:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `keywords`
--

CREATE TABLE `keywords` (
  `id` int(11) NOT NULL,
  `hairId` varchar(255) NOT NULL,
  `word` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `keywords`
--

INSERT INTO `keywords` (`id`, `hairId`, `word`, `createdAt`, `updatedAt`) VALUES
(4, '2d9eecd3-bba1-428d-8a9d-5aa8a2e8d543', 'bruh bruh lmeo', '2023-01-07 13:16:59', '2023-01-07 13:16:59'),
(5, '5c3880b0-3e1d-4686-9388-bba7296ad23e', 'bruh bruh lmeosadasd', '2023-01-07 13:17:15', '2023-01-07 13:17:15');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('ApC1Ym3-Ugpfi863uqrGBWQ0SySvf1fi', '2023-01-08 12:23:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"24712fdb-c186-4cf7-92b9-1983fe070ac0\"}', '2023-01-07 12:05:03', '2023-01-07 12:23:47'),
('YN_c6uw3s_s9rLNXOm86xpt68Hext8PG', '2023-01-08 13:17:15', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"24712fdb-c186-4cf7-92b9-1983fe070ac0\"}', '2023-01-07 12:28:29', '2023-01-07 13:17:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `profileImgUrl` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT 0,
  `licenseImgUrl` varchar(255) DEFAULT NULL,
  `Introduce` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `profileImgUrl`, `isVerified`, `licenseImgUrl`, `Introduce`, `createdAt`, `updatedAt`) VALUES
(1, 'c1a479cb-454a-4762-a9f1-565ed80cb21e', 'Lisa', 'lisanguyen@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$vXj2uMaPvEPU8P/4EhfY2A$4npZ5fMNh1HiUGIsGVPIGwxO5XspNwilNegdw+UX6nc', 'designer', NULL, 0, NULL, NULL, '2023-01-07 12:06:01', '2023-01-07 12:06:01'),
(2, '24712fdb-c186-4cf7-92b9-1983fe070ac0', 'Mr B', 'mrb@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$heIQBv4GPrbKyUS7ONgOJg$qsPJ19ivUrvBgw68z+6NZsF7TBgEP6AZXthTUQ67qOA', 'designer', NULL, 0, NULL, NULL, '2023-01-07 12:06:18', '2023-01-07 12:06:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hairstyle`
--
ALTER TABLE `hairstyle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keywords`
--
ALTER TABLE `keywords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hairstyle`
--
ALTER TABLE `hairstyle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `keywords`
--
ALTER TABLE `keywords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
