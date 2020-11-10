DROP DATABASE IF EXISTS `nodejsimages`;/*i hope you, dont use it*/

create database `nodejsimages`;

use `nodejsimages`;

DROP TABLE IF EXISTS `admins`;
create table `admins`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `pass` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `deleteuser`;
create table `deleteuser`(
    `id` int(11) NOT NULL,
    `email` varchar(50) NOT NULL,
    `deltime` timestamp,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users`;
create table `users`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `pass` varchar(50) NOT NULL,
    `status_user` int(11),
    `point_user` int(11),
    `avatar_url` varchar(500),
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `photos`;
create table `photos`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(500),
    `id_user` int(11),
    `status_photo` int(11),
    `images_description` varchar(500),
    `images_url` varchar(500) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `status_photos`;
create table `status_photos`(
    `id` int(11)  NOT NULL AUTO_INCREMENT,
    `id_photo` int(11),
    `cmt` varchar(500),
    `likes` varchar(500),
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `photos_any`;
create table `photos_any`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(500),
    `status_photo_any` int(11),
    `images_url` varchar(500) NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `photos`
ADD FOREIGN KEY (`id_user`) REFERENCES users(`id`);

ALTER TABLE `status_photos`
ADD FOREIGN KEY (`id_photo`) REFERENCES photos(`id`);