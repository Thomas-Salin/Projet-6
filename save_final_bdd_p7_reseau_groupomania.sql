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
  KEY `fk_gif_id` (`gif_id`),
  KEY `fk_cutilisateur_id` (`utilisateur_id`),
  CONSTRAINT `fk_cutilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_gif_id` FOREIGN KEY (`gif_id`) REFERENCES `gif` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
INSERT INTO `commentaire` VALUES (78,'Joyeux anniversaire !!!! ',182,116,'2021-07-30 15:07:06'),(79,'Bienvenue à toi Thomas ',176,116,'2021-07-30 15:39:57'),(80,'Coucou Omer',176,120,'2021-07-30 17:12:39');
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
  CONSTRAINT `fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gif`
--

LOCK TABLES `gif` WRITE;
/*!40000 ALTER TABLE `gif` DISABLE KEYS */;
INSERT INTO `gif` VALUES (116,'http://localhost:3000/gifs/Zelda-Top10-35ans.jpg1627571921427.jpg',181,'2021-07-29 17:18:41','Les 35 ans de Zelda '),(119,'http://localhost:3000/gifs/tenor.gif1627650326777.gif',182,'2021-07-30 15:05:26','Coucou !!!'),(120,'http://localhost:3000/gifs/omer.png1627652927224.png',176,'2021-07-30 15:48:47','Oh punaise !!!!!');
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
  `date_inscription` datetime NOT NULL,
  `photo_profil` text,
  `admin` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (00176,'admin','groupomania','admin@groupomania.fr','$2b$10$tC9KUgxVWGmihmpS.GNOB.BmU74XtklC8xkfPRzWTQXKICRCfL3N2','2021-07-29 13:20:39','http://localhost:3000/photos/admin-settings-male.png1627652797911.png','1'),(00181,'Minnie','Mouse','minnie@gmail.com','$2b$10$CY/jf0VFVF5zhkQAPOKXbe9OnPkBwZX1gFnnPMnekFhW2ml4FwDRi','2021-07-29 17:18:10','http://localhost:3000/photos/Minnie_Mouse_Infobox.jpg1627571968400.jpeg','0'),(00182,'Thomas','Salin','toto@gmail.com','$2b$10$kvammrLfpRSHReDwRjnCfOFDVKA5koSLV34Vo43auEAbCGLw2zwX6','2021-07-30 14:50:30','http://localhost:3000/photos/SnakeSubArt.png1627649648319.png','0');
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

-- Dump completed on 2021-07-30 17:31:08
