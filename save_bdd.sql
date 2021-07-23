-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: reseau_groupomania
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `reseau_groupomania`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `reseau_groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `reseau_groupomania`;

--
-- Table structure for table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaire` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `commentaire` text NOT NULL,
  `utilisateur_id` mediumint unsigned NOT NULL,
  `gif_id` mediumint unsigned NOT NULL,
  `date_heure_publication` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cutilisateur_id` (`utilisateur_id`),
  KEY `fk_gif_id` (`gif_id`),
  CONSTRAINT `fk_cutilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`),
  CONSTRAINT `fk_gif_id` FOREIGN KEY (`gif_id`) REFERENCES `gif` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
INSERT INTO `commentaire` VALUES (11,'http',3,65,'2021-07-14 16:09:27'),(20,'coucou',5,68,'2021-07-16 10:08:01');
/*!40000 ALTER TABLE `commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gif`
--

DROP TABLE IF EXISTS `gif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gif` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `gif_url` text NOT NULL,
  `utilisateur_id` mediumint unsigned NOT NULL,
  `date_heure_publi` datetime NOT NULL,
  `titre` varchar(254) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_utilisateur_id` (`utilisateur_id`),
  CONSTRAINT `fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gif`
--

LOCK TABLES `gif` WRITE;
/*!40000 ALTER TABLE `gif` DISABLE KEYS */;
INSERT INTO `gif` VALUES (56,'http://localhost',3,'2021-07-13 20:32:54','gif test'),(59,'http://localhost',2,'2021-07-13 20:34:26','gif test4'),(62,'http',2,'2021-07-14 11:08:59','00001'),(65,'http',4,'2021-07-14 16:07:23','bonjour'),(66,'00004',4,'2021-07-14 17:02:22','super'),(67,'00004',4,'2021-07-14 17:03:02','super'),(68,'http',3,'2021-07-15 11:48:32','titre');
/*!40000 ALTER TABLE `gif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` mediumint(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `prenom` varchar(60) NOT NULL,
  `nom` varchar(60) NOT NULL,
  `email` varchar(254) NOT NULL,
  `mot_de_passe` varchar(254) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (00002,'Jade','Poupette','jade@gmail.com','titpoupette'),(00003,'Thomas','Salin','toto@gmail.com','Jade'),(00004,'Caroline','Jeannot','caro@gmail.com','Jade'),(00005,'Minnie','Mousse','minnie@gmail.com','$2b$10$XR07MhkVBx0sdrtgUsqP8uBV6LcuXkAwCT8W0dH1s9fA/0iZVLf2C'),(00006,'Min','Mou','mine@gmail.com','$2b$10$XE.eSNLBpsAA5AvYs6SOWOKQNO6QXQ20oFBkwMCwnMDNkkYcyKLti'),(00024,'petite','sirene','sirene@gmail.com','$2b$10$pvM4oF4H9sTfPYxT5quf3ueB1KUXosIOnXDWWOw77QWOFyuOlRYZS'),(00025,'Blanche','Neige','nain@gmail.com','$2b$10$M3ayXj.Xyofnl5BOPNJ5p.wnbnBZGE4h29wgfvZIF6d0c9MyKKoxa');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-16 11:09:01
