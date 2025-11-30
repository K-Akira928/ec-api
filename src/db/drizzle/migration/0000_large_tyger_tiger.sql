CREATE TABLE `examples` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`nickname` varchar(100),
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `examples_id` PRIMARY KEY(`id`),
	CONSTRAINT `example_name_idx` UNIQUE(`name`)
);
