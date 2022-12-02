DROP DATABASE IF EXISTS `todo_list_db` ;

CREATE DATABASE
    IF NOT EXISTS `todo_list_db` DEFAULT CHARACTER SET = 'utf8';

USE `todo_list_db`;

CREATE TABLE
    `user` (
        `user_id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `fullname` VARCHAR(100) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `password` VARCHAR(255) NOT NULL
    );

CREATE TABLE
    `todo_list` (
        `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `description` VARCHAR(200) NOT NULL,
        `check` BOOLEAN NOT NULL,
        `user_id` INT UNSIGNED NOT NULL,
        FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );