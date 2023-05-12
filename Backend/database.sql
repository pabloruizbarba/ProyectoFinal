
DROP TABLE IF EXISTS `Assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Assign` (
  `id_assign` int(11) NOT NULL AUTO_INCREMENT,
  `id_playlist` int(11) NOT NULL,
  `id_file` int(11) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_assign`),
  KEY `id_playlist` (`id_playlist`),
  KEY `id_file` (`id_file`),
  CONSTRAINT `Assign_ibfk_1` FOREIGN KEY (`id_playlist`) REFERENCES `Playlists` (`id_playlist`),
  CONSTRAINT `Assign_ibfk_2` FOREIGN KEY (`id_file`) REFERENCES `Files` (`id_file`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assign`
--

LOCK TABLES `Assign` WRITE;
/*!40000 ALTER TABLE `Assign` DISABLE KEYS */;
INSERT INTO `Assign` VALUES (1,2,4,4),(5,2,5,3),(6,3,5,3);
/*!40000 ALTER TABLE `Assign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Codes`
--

DROP TABLE IF EXISTS `Codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Codes` (
  `id_code` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(6) NOT NULL,
  PRIMARY KEY (`id_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Codes`
--

LOCK TABLES `Codes` WRITE;
/*!40000 ALTER TABLE `Codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Devices`
--

DROP TABLE IF EXISTS `Devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Devices` (
  `id_device` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `id_playlist` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_device`),
  KEY `id_playlist` (`id_playlist`),
  CONSTRAINT `Devices_ibfk_1` FOREIGN KEY (`id_playlist`) REFERENCES `Playlists` (`id_playlist`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devices`
--

LOCK TABLES `Devices` WRITE;
/*!40000 ALTER TABLE `Devices` DISABLE KEYS */;
INSERT INTO `Devices` VALUES (1,'prueba','ABC123',4,NULL),(4,'prueba2','ABC456',1,NULL),(5,'prueba3','FFF44',2,NULL),(6,'prueba4','FFT544',3,NULL),(8,'prueba5','FRR324',NULL,NULL),(9,'prueba6','GHT432',NULL,NULL),(10,'prueba7','AAA555',6,NULL);
/*!40000 ALTER TABLE `Devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Files`
--

DROP TABLE IF EXISTS `Files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Files` (
  `id_file` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `type` varchar(25) NOT NULL,
  `hash_file` varchar(64) NOT NULL,
  `path` varchar(100) NOT NULL,
  PRIMARY KEY (`id_file`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Files`
--

LOCK TABLES `Files` WRITE;
/*!40000 ALTER TABLE `Files` DISABLE KEYS */;
INSERT INTO `Files` VALUES (2,'street.mp4','video','48da8ea9b28d780cfb7ff5a34ac780f01c1b36828604819c1b05dade9a9a4261','../../media/street.mp4'),(3,'market.mp4','video','a9c76d0636a6acb0129814d56128a1601e6ba4701b77a9c937f1e8894efd6f66','../../media/market.mp4'),(4,'lava.jpg','image','eb50fe94ce6c23437d8cad735cf23a2f8f904d8506b7c91cf815150ddb5fe529','../../media/lava.jpg'),(5,'waterfall.jpg','image','589ec9563640737b7fa97c1308d3530b55451b3884a47b917b15c9c8c43629a7','../../media/waterfall.jpg'),(6,'capadoccia.jpg','image','5cd14a26bb6150eddb95269a7842c275c5ab896a1ceb282bf1950cf7ee65eae6','../../media/capadoccia.jpg'),(7,'soldier.mp4','video','07ef9e206e0e1fa14929c04dff0c3eadcb3c191c16f59ecf9ebabe7cd3fda558','../../media/soldier.mp4');
/*!40000 ALTER TABLE `Files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Playlists`
--

DROP TABLE IF EXISTS `Playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Playlists` (
  `id_playlist` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `hash_list` varchar(64) NOT NULL,
  PRIMARY KEY (`id_playlist`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Playlists`
--

LOCK TABLES `Playlists` WRITE;
/*!40000 ALTER TABLE `Playlists` DISABLE KEYS */;
INSERT INTO `Playlists` VALUES (1,'test_list','asdfghjklzxcvb'),(2,'test_list2','ee802894c1aea3c7442932ffe7248ef7390a05e2a7804b1f7c95cdaa8e8d9387'),(3,'test_list3','0bc8bac843719665d07b6275718ca4d27daab8820beea67540cc255bb91de9f9'),(4,'test_list4','93eea4eee513ef268a7764000dc77bc0d0c8d1f58c48f028a5d9cfb438ff0be2'),(6,'test_list5','d99f489d9ea9b10066d9341c33c454ae8085246b52d0fc1ca9fd10c7b9b20a71'),(10,'test_list6','ede379e802a9e7c78c8597edf315980c438c046088ea828eaec076c365120b7a'),(11,'test_list7','c9dac54847ba674a07a3049a1ff64caf6663971241ca3ea8a1994f65ad39b696'),(12,'test_list8','bd9a8c27f0c749b6f7eb7558d5d6e40895dae70af6dc12973c695ff900e5a5db'),(13,'test_list9','31c64041367fa5cfa8ce49ec3351667bfa0584df46cf2c5612c1fd940c01113f'),(14,'test_list10','3e17abf576e395cb25620ecbefe672e26d0112ebb5e63689342dc753d7ad1b5a');
/*!40000 ALTER TABLE `Playlists` ENABLE KEYS */;
UNLOCK TABLES;



--==============================================================================================================================
--==============================================================================================================================
--*********************************SOME SAMPLE INSERTIONS***********************************************************************
--==============================================================================================================================
--==============================================================================================================================


INSERT INTO `Codes` (code) VALUES ('AAA111');
INSERT INTO `Codes` (code) VALUES ('AAA222');
INSERT INTO `Codes` (code) VALUES ('AAA333');

INSERT INTO `Playlists` (title) VALUES ('test1');
INSERT INTO `Playlists` (title) VALUES ('test2');
INSERT INTO `Playlists` (title) VALUES ('test3');

INSERT INTO `Devices` (name,code,id_playlist,description) VALUES ('screen1','AAA111',1,'test screen 1');
INSERT INTO `Devices` (name,code,id_playlist,description) VALUES ('screen2','AAA222',2,'test screen 2');
INSERT INTO `Devices` (name,code,id_playlist,description) VALUES ('screen3','AAA333',3,'test screen 3');
