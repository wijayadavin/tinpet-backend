-- IMPORTANT NOTICE FOR BACK-END TEAM
-- 
-- 1. Export to mysql, create a new database named tinpet_api with this query:
-- CREATE DATABASE tinpet_api;
-- 
-- 2. Use tinpet_api database with this query:
-- USE tinpet_api;

-- 3. Uncomment & run the query below to set the time zone:
 SET time_zone = "+07:00";
-- 
-- 4. Add the property below  for updated_at:
-- ON UPDATE NOW()
		updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
-- 
-- 5. Add the property below for all foreign keys:
-- ON DELETE CASCADE
--    CONSTRAINT `child_ibfk_1` FOREIGN KEY (`parent_id`)
--    REFERENCES `parent` (`id`) ON DELETE CASCADE
-- 
-- IMPORTANT NOTICE FOR FRONT-END TEAM:
-- You can use camel case instead of snake case as object keys
--    e.g. instead of first_name, you can write firstName :)


CREATE TABLE `users` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `username` VARCHAR(32) UNIQUE,
  `password` VARCHAR(255),
  `mobile_number` VARCHAR(16),
  `role` VARCHAR(8) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `user_images` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `user_id` VARCHAR(50) UNIQUE NOT NULL,
  `image_url` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `pets` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `type` VARCHAR(25) NOT NULL,
  `birth_date` DATE,
  `gender` VARCHAR(7) NOT NULL DEFAULT "male",
  `location` TEXT,
  `breed` VARCHAR(100),
  `matched` BOOLEAN NOT NULL DEFAULT 0,
  `user_id` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `petMatches` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `pet_id1` VARCHAR(100) NOT NULL,
  `pet_id2` VARCHAR(100) NOT NULL
);

CREATE TABLE `pet_likes` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  `pet_id` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW() 
);

CREATE TABLE `pet_comments` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  `pet_id` VARCHAR(100) NOT NULL,
  `text` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE `pet_images` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `pet_id` VARCHAR(100) UNIQUE NOT NULL,
  `image_url` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `pet_meetings` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `time` TIMESTAMP NOT NULL,
  `location` TEXT NOT NULL,
  `text` TEXT,
  `sender_pet_id` VARCHAR(100) NOT NULL,
  `recipient_pet_id` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `chats` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `user_id1` VARCHAR(100) NOT NULL,
  `user_id2` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE `chatLines` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `chat_id` VARCHAR(100) NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  `text` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE `user_notifications` (
  `id` VARCHAR(100) PRIMARY KEY NOT NULL,
  `user_id` VARCHAR(100) NOT NULL,
  `text` TEXT NOT NULL,
  `url` TEXT NOT NULL,
  `read` BOOLEAN NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

ALTER TABLE `user_images` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)  


ALTER TABLE `pet_images` ADD FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) 

ALTER TABLE `user_notifications` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) 

ALTER TABLE `pet_meetings` ADD FOREIGN KEY (`sender_pet_id`) REFERENCES `pets` (`id`) 

ALTER TABLE `pet_meetings` ADD FOREIGN KEY (`recipient_pet_id`) REFERENCES `pets` (`id`) 

ALTER TABLE `chats` ADD FOREIGN KEY (`user_id1`) REFERENCES `users` (`id`) 

ALTER TABLE `chats` ADD FOREIGN KEY (`user_id2`) REFERENCES `users` (`id`) 

ALTER TABLE `chatLines` ADD FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) 

ALTER TABLE `pets` ADD FOREIGN KEY (`user_id`) REFERENCES `user_images` (`id`)

ALTER TABLE `pet_likes` ADD FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) 

ALTER TABLE `pet_comments` ADD FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) 

ALTER TABLE `pet_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

ALTER TABLE `pet_comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

ALTER TABLE `chatLines` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) 

ALTER TABLE `petMatches` ADD FOREIGN KEY (`pet_id1`) REFERENCES `pets` (`id`) 

ALTER TABLE `petMatches` ADD FOREIGN KEY (`pet_id2`) REFERENCES `pets` (`id`) 
