-- AlterTable
ALTER TABLE `user_sessions` MODIFY `token_hash` VARCHAR(512) NOT NULL,
    MODIFY `ip_address` VARCHAR(45) NULL;
