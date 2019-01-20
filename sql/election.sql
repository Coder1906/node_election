/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1_3306
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : election

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-01-20 13:54:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `password_salt` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '568856473c868036aabf9794ee98bdaa', 'anuas5wg');

-- ----------------------------
-- Table structure for candidate
-- ----------------------------
DROP TABLE IF EXISTS `candidate`;
CREATE TABLE `candidate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL COMMENT '候选人名称',
  `created` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of candidate
-- ----------------------------
INSERT INTO `candidate` VALUES ('1', '候选人3', '2019-01-19 14:45:08');
INSERT INTO `candidate` VALUES ('2', '候选人2', '2019-01-19 14:45:13');
INSERT INTO `candidate` VALUES ('3', '候选人4', '2019-01-19 16:40:22');

-- ----------------------------
-- Table structure for election
-- ----------------------------
DROP TABLE IF EXISTS `election`;
CREATE TABLE `election` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL COMMENT '选举名称',
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态（0=未开启，1=进行中）',
  `created` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of election
-- ----------------------------
INSERT INTO `election` VALUES ('1', '选举会1', '2018-10-20 20:02:10', '2019-01-20 20:11:10', '1', '2019-01-19 13:30:09');
INSERT INTO `election` VALUES ('2', '选举会2', '2018-10-20 20:02:10', '2018-10-20 20:11:10', '1', '2019-01-19 13:35:15');

-- ----------------------------
-- Table structure for election_candidate
-- ----------------------------
DROP TABLE IF EXISTS `election_candidate`;
CREATE TABLE `election_candidate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `election_id` int(11) NOT NULL COMMENT '选举会id',
  `candidate_id` int(11) NOT NULL COMMENT '候选人id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of election_candidate
-- ----------------------------
INSERT INTO `election_candidate` VALUES ('1', '1', '2');
INSERT INTO `election_candidate` VALUES ('2', '1', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL COMMENT '邮箱',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `password_salt` varchar(32) NOT NULL,
  `created` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', '531237023@qq.com', '6a97dd1891db251edeb28e068bad3472', 'f8bf8876', '2019-01-19 16:10:08');

-- ----------------------------
-- Table structure for vote_record
-- ----------------------------
DROP TABLE IF EXISTS `vote_record`;
CREATE TABLE `vote_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '投票人',
  `ec_id` int(11) NOT NULL DEFAULT '0' COMMENT '选举会候选人id',
  `created` datetime NOT NULL COMMENT '投票时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vote_record
-- ----------------------------
INSERT INTO `vote_record` VALUES ('4', '2', '1', '2019-01-20 00:05:22');
INSERT INTO `vote_record` VALUES ('5', '2', '2', '2019-01-20 00:05:22');
SET FOREIGN_KEY_CHECKS=1;
