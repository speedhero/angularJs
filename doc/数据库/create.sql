##建表
/*
SQLyog Professional v10.42 
MySQL - 5.6.21-log : Database - customermanager
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`customermanager` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `customermanager`;

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(128) COLLATE utf8_bin NOT NULL DEFAULT '',
  `last_name` varchar(128) COLLATE utf8_bin NOT NULL DEFAULT '',
  `email` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `address` varchar(256) COLLATE utf8_bin NOT NULL DEFAULT '',
  `city` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `state_id` int(11) NOT NULL DEFAULT '0',
  `zip` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '',
  `gender` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `customer` */

insert  into `customer`(`id`,`first_name`,`last_name`,`email`,`address`,`city`,`state_id`,`zip`,`gender`) values (1,'Marcus','HighTower','Marcus.HighTower@acmecorp.com','1234 Anywhere St.','Phoenix',12,'85229','Male'),(2,'Jesse','Smith','Jesse.Smith@gmail.com','435 Main St.','Encinitas',13,'85230','Female'),(3,'Albert','Einstein','Albert.Einstein@outlook.com','1 Atomic St.','Seattle',15,'85231','Male'),(4,'Dan','Wahlin','Dan.Wahlin@yahoo.com','85 Cedar Dr.','Chandler',18,'85232','Male'),(5,'Ward','Bell','Ward.Bell@gmail.com','12 Ocean View St.','Dallas',36,'85233','Male'),(6,'Brad','Green','Brad.Green@gmail.com','1600 Amphitheatre Parkway','Orlando',22,'85234','Male'),(7,'Igor','Minar','Igor.Minar@gmail.com','1604 Amphitheatre Parkway','Carey',24,'85235','Male'),(8,'Miško','Hevery','Miško.Hevery@gmail.com','1607 Amphitheatre Parkway','Anaheim',21,'85236','Male'),(9,'Michelle','Avery','Michelle.Avery@acmecorp.com','346 Cedar Ave.','Dallas',35,'85237','Female'),(10,'Heedy','Wahlin','Heedy.Wahlin@hotmail.com','4576 Main St.','New York',14,'85238','Female'),(11,'Thomas','Martin','Thomas.Martin@outlook.com','964 Point St.','White Plains',49,'85239','Male'),(12,'Jean','Martin','Jean.Martin@outlook.com','98756 Center St.','Las Vegas',10,'85240','Female'),(13,'Robin','Cleark','Robin.Cleark@acmecorp.com','35632 Richmond Circle Apt B','Los Angeles',7,'85241','Female'),(14,'Juan','Paulo','Juan.Paulo@yahoo.com','2352 Angular Way','Portland',3,'85242','Male'),(15,'Gene','Thomas','Gene.Thomas@gmail.com','23566 Directive Pl.','Seattle',21,'85243','Male'),(16,'Pinal','Dave','Pinal.Dave@gmail.com','235235 Yaz Blvd.','Houston',17,'85244','Male'),(17,'Fred','Roberts','Fred.Roberts@outlook.com','7656 Crescent St.','Chicago',50,'85245','Male'),(18,'Tina','Roberts','Tina.Roberts@outlook.com','76543 Moon Ave.','Atlanta',22,'85246','Female'),(19,'Cindy','Jamison','Cindy.Jamison@gmail.com','84533 Hardrock St.','Chandler',17,'85247','Female'),(20,'Robyn','Flores','Robyn.Flores@yahoo.com','5687534 Jefferson Way','Buffalo',19,'85248','Female'),(21,'Jeff','Wahlin','Jeff.Wahlin@gmail.com','346346 Blue Pl.','Albuquerque',38,'85249','Male'),(22,'Danny','Wahlin','Danny.Wahlin@gmail.com','23423 Adams St.','Boise',29,'85250','Male'),(23,'Elaine','Jones','Elaine.Jones@yahoo.com','633 Main St.','Salt Lake City',45,'85251','Female');

/*Table structure for table `customer_order` */

DROP TABLE IF EXISTS `customer_order`;

CREATE TABLE `customer_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL DEFAULT '0',
  `order_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `customer_order` */

insert  into `customer_order`(`id`,`customer_id`,`order_id`) values (1,1,5),(2,1,3),(3,1,6),(4,1,11),(5,1,14),(6,1,12),(7,1,6),(8,1,5),(9,1,4),(10,1,14),(11,1,3),(12,2,7),(13,2,5),(14,2,5),(15,2,5),(16,2,12),(17,2,8),(18,3,3),(19,3,12),(20,3,12),(21,4,10),(22,4,9),(23,4,2),(24,4,4),(25,4,4),(26,4,7),(27,4,4),(28,4,10),(29,4,13),(30,4,10),(31,4,2),(32,5,11),(33,5,8),(34,5,3),(35,5,3),(36,5,1),(37,5,10),(38,5,3),(39,5,14),(40,6,1),(41,6,12),(42,6,1),(43,6,14),(44,6,9),(45,6,6),(46,6,9),(47,6,2),(48,6,1),(49,6,9),(50,7,2),(51,7,10),(52,8,10),(53,8,9),(54,8,2),(55,8,8),(56,8,8),(57,8,4),(58,8,3),(59,8,3),(60,8,10),(61,8,1),(62,8,6),(63,9,4),(64,9,8),(65,9,9),(66,9,5),(67,9,1),(68,9,1),(69,9,2),(70,9,11),(71,9,10),(72,10,14),(73,10,1),(74,10,11),(75,10,14),(76,10,14),(77,10,13),(78,10,8),(79,10,14),(80,10,2),(81,10,4),(82,11,1),(83,11,11),(84,12,4),(85,12,7),(86,12,6),(87,12,4),(88,12,12),(89,12,14),(90,12,14),(91,12,14),(92,12,8),(93,12,4),(94,13,14),(95,13,10),(96,14,3),(97,14,11),(98,14,8),(99,14,8),(100,14,5),(101,14,13),(102,14,10),(103,15,12),(104,15,6),(105,16,5),(106,16,7),(107,16,6),(108,16,5),(109,17,9),(110,17,11),(111,17,5),(112,17,14),(113,17,7),(114,17,7),(115,17,3),(116,17,6),(117,18,10),(118,18,8),(119,18,4),(120,18,9),(121,18,10),(122,18,2),(123,18,4),(124,18,5),(125,18,1),(126,19,3),(127,19,5),(128,19,6),(129,19,14),(130,20,1),(131,20,14),(132,20,5),(133,20,3),(134,20,8),(135,20,12),(136,20,6),(137,20,1),(138,21,12),(139,21,8),(140,21,7),(141,22,7),(142,22,5),(143,22,5),(144,23,12),(145,23,14),(146,23,4),(147,23,14);

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product` varchar(256) COLLATE utf8_bin NOT NULL DEFAULT '',
  `price` decimal(8,2) NOT NULL DEFAULT '0.00',
  `quantity` int(11) NOT NULL DEFAULT '0',
  `order_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `order` */

insert  into `order`(`id`,`product`,`price`,`quantity`,`order_date`) values (1,'Basket',29.99,1,'2015-06-20 13:16:55'),(2,'Yarn',9.99,1,'2015-06-20 13:16:55'),(3,'Needes',5.99,1,'2015-06-20 13:16:55'),(4,'Speakers',499.99,1,'2015-06-15 13:16:55'),(5,'iPod',399.99,1,'2015-06-20 13:16:55'),(6,'Table',329.99,1,'2015-06-12 13:16:55'),(7,'Chair',129.99,4,'2015-06-17 13:16:55'),(8,'Lamp',89.99,5,'2015-06-18 13:16:55'),(9,'Call of Duty',59.99,1,'2015-06-19 13:16:55'),(10,'Controller',49.99,1,'2015-06-12 13:16:55'),(11,'Gears of War',49.99,1,'2015-06-17 13:16:55'),(12,'Lego City',49.99,1,'2015-06-17 13:16:55'),(13,'Baseball',9.99,5,'2015-06-21 13:16:55'),(14,'Bat',19.99,1,'2015-06-19 13:16:55');

/*Table structure for table `state` */

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `abbreviation` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '',
  `name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `state` */

insert  into `state`(`id`,`abbreviation`,`name`) values (1,'AL','Alabama'),(2,'MT','Montana'),(3,'AK','Alaska'),(4,'NE','Nebraska'),(5,'AZ','Arizona'),(6,'NV','Nevada'),(7,'AR','Arkansas'),(8,'NH','New Hampshire'),(9,'CA','California'),(10,'NJ','New Jersey'),(11,'CO','Colorado'),(12,'NM','New Mexico'),(13,'CT','Connecticut'),(14,'NY','New York'),(15,'DE','Delaware'),(16,'NC','North Carolina'),(17,'FL','Florida'),(18,'ND','North Dakota'),(19,'GA','Georgia'),(20,'OH','Ohio'),(21,'HI','Hawaii'),(22,'OK','Oklahoma'),(23,'ID','Idaho'),(24,'OR','Oregon'),(25,'IL','Illinois'),(26,'PA','Pennsylvania'),(27,'IN','Indiana'),(28,'RI','Rhode Island'),(29,'IA','Iowa'),(30,'SC','South Carolina'),(31,'KS','Kansas'),(32,'SD','South Dakota'),(33,'KY','Kentucky'),(34,'TN','Tennessee'),(35,'LA','Louisiana'),(36,'TX','Texas'),(37,'ME','Maine'),(38,'UT','Utah'),(39,'MD','Maryland'),(40,'VT','Vermont'),(41,'MA','Massachusetts'),(42,'VA','Virginia'),(43,'MI','Michigan'),(44,'WA','Washington'),(45,'MN','Minnesota'),(46,'WV','West Virginia'),(47,'MS','Mississippi'),(48,'WI','Wisconsin'),(49,'MO','Missouri'),(50,'WY','Wyoming');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
