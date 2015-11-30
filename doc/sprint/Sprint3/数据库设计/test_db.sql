-- MySQL Script generated by MySQL Workbench
-- 11/25/15 16:30:10
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `phoneid` VARCHAR(11) NOT NULL,
  `gender` TINYINT NOT NULL,
  `last_name` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `first_name` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `email` VARCHAR(45) NULL,
  `photo` BLOB NULL,
  `memo` TEXT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`phoneid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User_type` (
  `utid` INT NOT NULL,
  `ut_name` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`utid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Vip_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Vip_level` (
  `vlid` INT NOT NULL,
  `vl_name` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `buffet_discount` INT NULL,
  `lobby_discount` INT NULL,
  `lunch_discount` INT NULL,
  `bar_discount` INT NULL,
  `weekend_discount` INT NULL,
  PRIMARY KEY (`vlid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User2User_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User2User_type` (
  `user2user_type_phoneid` VARCHAR(11) NOT NULL,
  `user2user_type_utid` INT NOT NULL,
  PRIMARY KEY (`user2user_type_phoneid`, `user2user_type_utid`),
  INDEX `user2user_type_utid_idx` (`user2user_type_utid` ASC),
  INDEX `user2user_type_phoneid_idx` (`user2user_type_phoneid` ASC),
  CONSTRAINT `user2user_type_phoneid`
    FOREIGN KEY (`user2user_type_phoneid`)
    REFERENCES `mydb`.`User` (`phoneid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user2user_type_utid`
    FOREIGN KEY (`user2user_type_utid`)
    REFERENCES `mydb`.`User_type` (`utid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Invitation_code`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Invitation_code` (
  `code` VARCHAR(12) NOT NULL,
  `available` TINYINT NOT NULL,
  `expired_date` DATETIME NOT NULL,
  `invitation_code_utid` INT NOT NULL,
  PRIMARY KEY (`code`),
  INDEX `invitation_code_utid_idx` (`invitation_code_utid` ASC),
  CONSTRAINT `invitation_code_utid`
    FOREIGN KEY (`invitation_code_utid`)
    REFERENCES `mydb`.`User_type` (`utid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User_type2vip_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User_type2vip_level` (
  `days` INT NOT NULL,
  `user_type2vip_level_utid` INT NOT NULL,
  `user_type2vip_level_vlid` INT NOT NULL,
  PRIMARY KEY (`user_type2vip_level_utid`, `user_type2vip_level_vlid`),
  INDEX `user_type2vip_level_vlid_idx` (`user_type2vip_level_vlid` ASC),
  INDEX `user_type2vip_level_utid_idx` (`user_type2vip_level_utid` ASC),
  CONSTRAINT `user_type2vip_level_utid`
    FOREIGN KEY (`user_type2vip_level_utid`)
    REFERENCES `mydb`.`User_type` (`utid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_type2vip_level_vlid`
    FOREIGN KEY (`user_type2vip_level_vlid`)
    REFERENCES `mydb`.`Vip_level` (`vlid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User2Vip_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User2Vip_level` (
  `user2vip_level_phoneid` VARCHAR(11) NOT NULL,
  `user2vip_level_vlid` INT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  PRIMARY KEY (`user2vip_level_phoneid`, `user2vip_level_vlid`),
  INDEX `user2vip_level_vlid_idx` (`user2vip_level_vlid` ASC),
  INDEX `user2vip_level_phoneid_idx` (`user2vip_level_phoneid` ASC),
  CONSTRAINT `user2vip_level_phoneid`
    FOREIGN KEY (`user2vip_level_phoneid`)
    REFERENCES `mydb`.`User` (`phoneid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user2vip_level_vlid`
    FOREIGN KEY (`user2vip_level_vlid`)
    REFERENCES `mydb`.`Vip_level` (`vlid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Hotel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Hotel` (
  `HotelID` INT NOT NULL AUTO_INCREMENT,
  `City` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `HotelName` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `HotelTele` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `HotelAddress` VARCHAR(512) CHARACTER SET 'utf8' NULL,
  `Location` POINT NOT NULL,
  `ContractStat` INT NOT NULL,
  `Memo` TEXT CHARACTER SET 'utf8' NULL,
  PRIMARY KEY (`HotelID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Restaurant` (
  `RestaurantID` INT NOT NULL AUTO_INCREMENT,
  `RestaurantName` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `RestaurantTele` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `RestaurantAddress` VARCHAR(512) CHARACTER SET 'utf8' NULL,
  `RestaurantOpenTime` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `Introduction` TEXT CHARACTER SET 'utf8' NULL,
  `AveragePrice` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `Park` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `Smoke` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `Memo` TEXT CHARACTER SET 'utf8' NULL,
  PRIMARY KEY (`RestaurantID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Picture` (
  `PictureID` INT NOT NULL AUTO_INCREMENT,
  `FileName` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `PictureIntro` VARCHAR(512) CHARACTER SET 'utf8' NULL,
  PRIMARY KEY (`PictureID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Hotel2Restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Hotel2Restaurant` (
  `HotelID` INT NOT NULL,
  `RestaurantID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `RestaurantID`),
  INDEX `RestaurantID_fk_idx` (`RestaurantID` ASC),
  INDEX `HotelID_fk_idx` (`HotelID` ASC),
  CONSTRAINT `HRHotelID_fk`
    FOREIGN KEY (`HotelID`)
    REFERENCES `mydb`.`Hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `HRRestaurantID_fk`
    FOREIGN KEY (`RestaurantID`)
    REFERENCES `mydb`.`Restaurant` (`RestaurantID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Hotel2Picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Hotel2Picture` (
  `HotelID` INT NOT NULL,
  `PictureID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `PictureID`),
  INDEX `PictureID_fk_idx` (`PictureID` ASC),
  INDEX `HotelID_fk_idx` (`HotelID` ASC),
  CONSTRAINT `HPHotelID_fk`
    FOREIGN KEY (`HotelID`)
    REFERENCES `mydb`.`Hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `HPPictureID_fk`
    FOREIGN KEY (`PictureID`)
    REFERENCES `mydb`.`Picture` (`PictureID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Restaurant2Picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Restaurant2Picture` (
  `RestaurantID` INT NOT NULL,
  `PictureID` INT NOT NULL,
  PRIMARY KEY (`RestaurantID`, `PictureID`),
  INDEX `PictureID_fk_idx` (`PictureID` ASC),
  INDEX `RestaurantID_fk_idx` (`RestaurantID` ASC),
  CONSTRAINT `RPRestaurantID_fk`
    FOREIGN KEY (`RestaurantID`)
    REFERENCES `mydb`.`Restaurant` (`RestaurantID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `RPPictureID_fk`
    FOREIGN KEY (`PictureID`)
    REFERENCES `mydb`.`Picture` (`PictureID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `mydb`.`Hotel` ADD SPATIAL INDEX(`Location`);
USE `mydb` ;

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`view1` (`id` INT);

-- -----------------------------------------------------
-- View `mydb`.`view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`view1`;
USE `mydb`;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

DELIMITER //
create Procedure insert_rest(	_City					varchar(128),
								_HotelName				varchar(128),
								_HotelTele				varchar(128),
							    _HotelAddress			varchar(512),
							    _location				varchar(128),
                                out _restId int)
Begin
    start transaction;
    INSERT INTO `mydb`.`Hotel`	
	(City, HotelName, HotelTele, HotelAddress, Location)
	VALUES
   	(_City, _HotelName, _HotelTele, _HotelAddress, ST_GeomFromText(_location));  
    select LAST_INSERT_ID() into _restId;
	commit;
End //