DROP DATABASE IF EXISTS `todo_list_db` ;

CREATE DATABASE
    IF NOT EXISTS `todo_list_db` DEFAULT CHARACTER SET = 'utf8';

USE `todo_list_db`;

CREATE TABLE
    `todo_list` (
        `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `description` VARCHAR(200) NOT NULL,
        `check` BOOLEAN NOT NULL
    );