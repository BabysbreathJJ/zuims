-- MySQL Script generated by MySQL Workbench
-- 12/25/15 11:20:17
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
  `photo` VARCHAR(45) NULL,
  `memo` TEXT NULL,
  `password` VARCHAR(45) NOT NULL,
  `marrige` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `birth` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `education` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `graduate` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `qq` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `wechat` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `tel` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `company` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `position` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `industry` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `income` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `prefer_cooking` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `prefer_price` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `prefer_restaurant` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `prefer_city` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `prefer_district` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `dinning_purpose` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `other_interests` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `city` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `loyalty_points` VARCHAR(45) CHARACTER SET 'utf8' NULL,
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
  `expired_date` VARCHAR(45) NOT NULL,
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
  `start_date` VARCHAR(45) NOT NULL,
  `end_date` VARCHAR(45) NOT NULL,
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
  `hotelid` INT NOT NULL AUTO_INCREMENT,
  `hotel_name` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `hotel_tele` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `hotel_addr` VARCHAR(512) CHARACTER SET 'utf8' NULL,
  `city` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `location` POINT NOT NULL,
  `contract_state` INT NOT NULL DEFAULT 0,
  `memo` TEXT CHARACTER SET 'utf8' NULL,
  PRIMARY KEY (`hotelid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Restaurant` (
  `restaurantid` INT NOT NULL AUTO_INCREMENT,
  `restaurant_name` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `restaurant_tele` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `restaurant_address` VARCHAR(512) CHARACTER SET 'utf8' NULL,
  `restaurant_open_time` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `introduction` TEXT CHARACTER SET 'utf8' NULL,
  `average_price` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `park` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `smoke` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `city` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `location` POINT NULL,
  `memo` TEXT CHARACTER SET 'utf8' NULL,
  `persist_table` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`restaurantid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Picture` (
  `pictureid` INT NOT NULL AUTO_INCREMENT,
  `file_name` VARCHAR(128) CHARACTER SET 'utf8' NULL,
  `picture_intro` VARCHAR(512) CHARACTER SET 'utf8' NULL,
  PRIMARY KEY (`pictureid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Hotel2Restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Hotel2Restaurant` (
  `hotelid` INT NOT NULL,
  `restaurantid` INT NOT NULL,
  PRIMARY KEY (`hotelid`, `restaurantid`),
  INDEX `RestaurantID_fk_idx` (`restaurantid` ASC),
  INDEX `HotelID_fk_idx` (`hotelid` ASC),
  CONSTRAINT `HRHotelID_fk`
    FOREIGN KEY (`hotelid`)
    REFERENCES `mydb`.`Hotel` (`hotelid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `HRRestaurantID_fk`
    FOREIGN KEY (`restaurantid`)
    REFERENCES `mydb`.`Restaurant` (`restaurantid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Hotel2Picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Hotel2Picture` (
  `hotelid` INT NOT NULL,
  `pictureid` INT NOT NULL,
  PRIMARY KEY (`hotelid`, `pictureid`),
  INDEX `PictureID_fk_idx` (`pictureid` ASC),
  INDEX `HotelID_fk_idx` (`hotelid` ASC),
  CONSTRAINT `HPHotelID_fk`
    FOREIGN KEY (`hotelid`)
    REFERENCES `mydb`.`Hotel` (`hotelid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `HPPictureID_fk`
    FOREIGN KEY (`pictureid`)
    REFERENCES `mydb`.`Picture` (`pictureid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Restaurant2Picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Restaurant2Picture` (
  `restaurantid` INT NOT NULL,
  `pictureid` INT NOT NULL,
  `picture_type` INT NULL,
  `vaild` INT NOT NULL,
  PRIMARY KEY (`restaurantid`, `pictureid`),
  INDEX `PictureID_fk_idx` (`pictureid` ASC),
  INDEX `RestaurantID_fk_idx` (`restaurantid` ASC),
  CONSTRAINT `RPRestaurantID_fk`
    FOREIGN KEY (`restaurantid`)
    REFERENCES `mydb`.`Restaurant` (`restaurantid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `RPPictureID_fk`
    FOREIGN KEY (`pictureid`)
    REFERENCES `mydb`.`Picture` (`pictureid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`DOrder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`DOrder` (
  `dorderid` INT NOT NULL AUTO_INCREMENT,
  `phoneid` VARCHAR(45) NOT NULL,
  `restaurantid` INT NOT NULL,
  `order_time` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `create_time` VARCHAR(45) NULL,
  `diner_num` INT NOT NULL,
  `more` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `handle_type` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `dorder_sum` DOUBLE NULL,
  PRIMARY KEY (`dorderid`),
  INDEX `phoneid_idx` (`phoneid` ASC),
  INDEX `restaurantid_idx` (`restaurantid` ASC),
  CONSTRAINT `phoneid`
    FOREIGN KEY (`phoneid`)
    REFERENCES `mydb`.`User` (`phoneid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `restaurantid_do`
    FOREIGN KEY (`restaurantid`)
    REFERENCES `mydb`.`Restaurant` (`restaurantid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Restaurant_Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Restaurant_Account` (
  `restaurant_account` VARCHAR(45) NOT NULL,
  `restaurantid` INT NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`restaurant_account`),
  INDEX `restaurantid_idx` (`restaurantid` ASC),
  CONSTRAINT `restaurantid_ra`
    FOREIGN KEY (`restaurantid`)
    REFERENCES `mydb`.`Restaurant` (`restaurantid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Restaurant_Linkman`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Restaurant_Linkman` (
  `linkmanid` INT NOT NULL AUTO_INCREMENT,
  `linkman_name` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `phone` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `email` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `position` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `restaurantid` INT NOT NULL,
  PRIMARY KEY (`linkmanid`),
  INDEX `restaurantid_idx` (`restaurantid` ASC),
  CONSTRAINT `restaurantid_lm`
    FOREIGN KEY (`restaurantid`)
    REFERENCES `mydb`.`Restaurant` (`restaurantid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`DOrder_Sum`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`DOrder_Sum` (
  `dorder_sumid` INT NOT NULL AUTO_INCREMENT,
  `restaurantid` INT NOT NULL,
  `dorder_period` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `dorder_date` VARCHAR(45) NULL,
  `dorder_createdate` VARCHAR(45) NULL,
  `dorder_num` INT NOT NULL,
  PRIMARY KEY (`dorder_sumid`),
  INDEX `restaurantid_idx` (`restaurantid` ASC),
  CONSTRAINT `restaurantid_dorder`
    FOREIGN KEY (`restaurantid`)
    REFERENCES `mydb`.`Restaurant` (`restaurantid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


DELIMITER //
create Procedure insert_hotel(	_City					varchar(128),
								_HotelName				varchar(128),
								_HotelTele				varchar(128),
							    _HotelAddress			varchar(512),
							    _Location				varchar(128),
                                _Memo					text,
                                out _hotelID int)
Begin
    start transaction;
    INSERT INTO `mydb`.`Hotel`	
	(`city`, `hotel_name`, `hotel_tele`, `hotel_addr`, `location`, `memo`)
	VALUES
   	(_City, _HotelName, _HotelTele, _HotelAddress, ST_GeomFromText(_Location), _Memo);  
    select LAST_INSERT_ID() into _hotelID;
	commit;
End //

DELIMITER //
create Procedure insert_rest(	_City					varchar(128),
								_RestaurantName			varchar(128),
								_RestaurantTele			varchar(128),
							    _RestaurantAddress		varchar(512),
                                _RestaurantOpenTime		varchar(128),
                                _Introduction			text,
                                _AveragePrice			varchar(128),
                                _Park					varchar(128),
                                _Smoke					varchar(128),
							    _Location				varchar(128),
                                _Memo					text,
                                out _restID 			int)
Begin
    start transaction;
    INSERT INTO `mydb`.`Restaurant`	
	(`city`, `restaurant_name`, `restaurant_tele`, `restaurant_address`, `restaurant_open_time`, `introduction`, `average_price`, `park`, `smoke`, `location`, `memo`)
	VALUES
   	(_City, _RestaurantName, _RestaurantTele, _RestaurantAddress, _RestaurantOpenTime, _Introduction, _AveragePrice, _Park, _Smoke, ST_GeomFromText(_Location), _Memo);  
    select LAST_INSERT_ID() into _restID;
	commit;
End //