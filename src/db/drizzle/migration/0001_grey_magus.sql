CREATE TABLE `example_metadata` (
	`id` varchar(36) NOT NULL,
	`example_id` varchar(36) NOT NULL,
	`value` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `example_metadata_id` PRIMARY KEY(`id`)
);
