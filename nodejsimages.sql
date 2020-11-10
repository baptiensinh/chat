-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2019 at 02:55 PM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejsimages`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `pass`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `deleteuser`
--

CREATE TABLE `deleteuser` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `deltime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deleteuser`
--

INSERT INTO `deleteuser` (`id`, `email`, `deltime`) VALUES
(1, 'admin@admin.com', '2019-06-14 06:47:04');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `status_photo` int(11) DEFAULT NULL,
  `images_description` varchar(500) DEFAULT NULL,
  `images_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `title`, `id_user`, `status_photo`, `images_description`, `images_url`) VALUES
(1, 'Title test 1 ', 4, 1, 'hhahahahahahah', '3raw-1559111194407.jpg'),
(2, 'Title test 2', 4, 0, 'mo ta ', '3raw-1559111854554.jpg'),
(3, 'Title 3', 4, 0, 'mo ta 3', '3raw-1559121210406.jpg'),
(4, 'tiue de 4', 4, 0, 'mo ta 4', '3raw-1559121548212.jpg'),
(5, 'Title 5', 4, 0, 'mo ta 5', '3raw-1559121580300.jpg'),
(6, '1', 4, 0, '1', '3raw-1559121902425.jpg'),
(7, '5', 4, 0, '5', '3raw-1559121919128.jpg'),
(8, 'Title 8', 4, 0, ' mo ta 8', '3raw-1559122030193.jpg'),
(9, 'tieu de 9', 4, 0, 'mo ta 9', '3raw-1559122057397.jpg'),
(10, ' Title 10', 4, 0, 'mo ta 10', '3raw-1559122447549.jpg'),
(11, 'tieu de 10', 4, 0, 'mo ta 10', '3raw-1559122702368.jpg'),
(12, 'tieu de 11', 4, 0, 'mo ta 11', '3raw-1559122721808.jpg'),
(13, 'admin tw', 1, 1, 'mo ta admin', '3raw-1559124960638.jpg'),
(14, 'tit 100', 4, 2, 'mo tatatat', '3raw-1559135441824.jpg'),
(15, 'dsfdsfsdf', 4, 1, 'sdfsdfds', '3raw-1559135695270.jpg'),
(16, 'show images', 4, 1, 'show true', '3raw-1559397788329.png'),
(17, 'title 17 thay doi', 4, 1, 'mota 17 thay doi', '3raw-1559405879581.jpg'),
(18, 'tieu de 18.1', 1, 1, 'mo ta 18.1', '3raw-1559446190657.jpg'),
(19, 'number 19', 1, 1, 'mo ta 19', '3raw-1559446301704.jpg'),
(20, 'tieu de thu 20', 1, 1, 'mo ta thu 20', '3raw-1559461100937.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `photos_any`
--

CREATE TABLE `photos_any` (
  `id` int(11) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `status_photo_any` int(11) DEFAULT NULL,
  `images_url` varchar(500) NOT NULL,
  `images_description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos_any`
--

INSERT INTO `photos_any` (`id`, `title`, `status_photo_any`, `images_url`, `images_description`) VALUES
(1, 'Title 4', 1, '3raw-1559121514611.jpg', 'mo ta 4'),
(2, 'Title 6', 1, '3raw-1559121605290.jpg', 'mo ta 6'),
(3, 'Title 6', 1, '3raw-1559121611322.jpg', 'mo ta 6'),
(4, 'Title 6', 1, '3raw-1559121704635.jpg', 'mo ta 6'),
(5, 'tieu de 8', 1, '3raw-1559121953922.jpg', 'mo ta 8'),
(6, 'frist image', 1, '3raw-1559126273837.jpg', 'ok mo ta'),
(7, 'erwerwewrewrewr', 2, '3raw-1559135669131.jpg', 'wererwerwerw'),
(8, 'test vi', 1, '3raw-1559621827219.png', 'test vi'),
(9, 'ok', 0, '3raw-1559621854205.jpg', 'ok'),
(10, '00', 0, '3raw-1560495207278.jpg', 'po'),
(11, 'o', 0, '3raw-1560496412796.jpeg', 'o');

-- --------------------------------------------------------

--
-- Table structure for table `status_photos`
--

CREATE TABLE `status_photos` (
  `id` int(11) NOT NULL,
  `id_photo` int(11) DEFAULT NULL,
  `cmt` varchar(500) DEFAULT NULL,
  `likes` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `status_user` int(11) DEFAULT NULL,
  `point_user` int(11) DEFAULT NULL,
  `avatar_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `pass`, `status_user`, `point_user`, `avatar_url`) VALUES
(1, 'hung', 'admin@admin.com', '1', 0, 0, '3raw-1561294258176.jpg'),
(2, 'admin2-11', 'admin2@admin.com', '1', 0, 0, NULL),
(3, 'admin3', 'admin3@admin.com', '1', 0, 0, NULL),
(4, '16520479', 'onepiece.hung@outlook.com', '1', 0, 0, '3raw-1559451050662.jpg'),
(5, 'ad_test', 'hungnguyenhuu@yandex.com', '1', 0, 0, NULL),
(6, 'admin4', 'admin4@admin.com', '1', 0, 0, NULL),
(7, 'hung', '111@gmail.com', '1111111', 0, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deleteuser`
--
ALTER TABLE `deleteuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `photos_any`
--
ALTER TABLE `photos_any`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_photos`
--
ALTER TABLE `status_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_photo` (`id_photo`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `deleteuser`
--
ALTER TABLE `deleteuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `photos_any`
--
ALTER TABLE `photos_any`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `status_photos`
--
ALTER TABLE `status_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `status_photos`
--
ALTER TABLE `status_photos`
  ADD CONSTRAINT `status_photos_ibfk_1` FOREIGN KEY (`id_photo`) REFERENCES `photos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
