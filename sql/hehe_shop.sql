/*
 Navicat MySQL Data Transfer

 Source Server         : forstudy
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : hehe_shop

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 16/09/2021 08:56:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ds_goods
-- ----------------------------
DROP TABLE IF EXISTS `ds_goods`;
CREATE TABLE `ds_goods`  (
  `goodsId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parentType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodsName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodsModel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `blongType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `material` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `process` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `coverImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sale` int(11) NULL DEFAULT NULL,
  `isNew` int(1) NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `historyPrice` decimal(10, 2) NULL DEFAULT NULL,
  `store` int(11) NULL DEFAULT NULL,
  `freight` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`goodsId`) USING BTREE,
  INDEX `parentType`(`parentType`) USING BTREE,
  CONSTRAINT `ds_goods_ibfk_1` FOREIGN KEY (`parentType`) REFERENCES `ds_sub_main_type` (`subMainTypeId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_goods
-- ----------------------------
INSERT INTO `ds_goods` VALUES ('0b35893007ac11ec806c1fa591f5811e', 'ee38e91007a811ec806c1fa591f5811e', '折叠门推拉门', 'ZDM01-541', '五金系统', '锌、铝合金', '静电粉末喷涂+环保电镀锌', 'http://192.168.40.83:3000/images/ZDM01-541.jpg', 223, 0, 88.68, 128.98, 999, NULL);
INSERT INTO `ds_goods` VALUES ('147e41e007b011ec806c1fa591f5811e', '3cd0b12007a911ec806c1fa591f5811e', '地弹簧', 'B-780', '地弹簧系列', '暂无数据', '暂无数据', 'http://192.168.40.83:3000/images/B-780.jpg', 32, 1, 55.88, NULL, 999, NULL);
INSERT INTO `ds_goods` VALUES ('1c8d5b6007af11ec806c1fa591f5811e', '253831f007a911ec806c1fa591f5811e', '锁盒', 'CH10', '传动锁闭器系列', '锌铝合金', '静电粉末喷涂', 'http://192.168.40.83:3000/images/CH10.jpg', 312, 0, NULL, NULL, 999, NULL);
INSERT INTO `ds_goods` VALUES ('3a9ae89007ad11ec806c1fa591f5811e', '2da7023007a911ec806c1fa591f5811e', '方轴执手', 'CZ32', '传动机构用执手', '锌铝合金', '静电粉末喷涂', 'http://192.168.40.83:3000/images/CZ32.jpg', 21, 0, 99.00, 128.00, 999, NULL);
INSERT INTO `ds_goods` VALUES ('4688f7b007b111ec806c1fa591f5811e', '433e332007a911ec806c1fa591f5811e', '传动锁闭器', 'BPM4001A', '传动锁闭器', '动杆Q195+定杆ML08AL', '电镀环保锌', 'http://192.168.40.83:3000/images/BPM4001A.webp', 231, 1, NULL, NULL, 999, NULL);
INSERT INTO `ds_goods` VALUES ('60d1187007af11ec806c1fa591f5811e', '368ab45007a911ec806c1fa591f5811e', '隐藏式闭门器', 'ITS96V', '闭门器系列', '铸铁', '氧化银色', 'http://192.168.40.83:3000/images/ITS96V.jpg', 23, 0, 66.00, 99.00, 999, NULL);
INSERT INTO `ds_goods` VALUES ('77b441b0096d11ec8bbacf26760c992a', 'd48f1eb0096c11ec8bbacf26760c992a', '(EPDM)复合密封条', 'EP002A-MF', '内平开窗用胶条', 'EPDM', '硬度30±5A/70±5A', 'http://192.168.40.83:3000/images/201608160527193632.webp', 33, 0, NULL, NULL, 999, NULL);
INSERT INTO `ds_goods` VALUES ('786b28d007b011ec806c1fa591f5811e', '3cd0b12007a911ec806c1fa591f5811e', '地弹簧', 'B-840', '地弹簧系列', '不锈钢', '暂无数据', 'http://192.168.40.83:3000/images/B-840.jpg', 43, 0, NULL, NULL, 999, NULL);
INSERT INTO `ds_goods` VALUES ('7fc4c31007b111ec806c1fa591f5811e', '4a3d6dd007a911ec806c1fa591f5811e', '执手', 'JCZ01L', '暂无', '暂无', '氧化', 'http://192.168.40.83:3000/images/jcz01l.jpg', 45, 0, 79.00, 110.00, 999, NULL);
INSERT INTO `ds_goods` VALUES ('96bc2f0007ab11ec806c1fa591f5811e', 'ee38e91007a811ec806c1fa591f5811e', '折叠推拉门', 'ZDM02-431', '五金系统', '锌、铝合金', '静电粉末喷涂+环保电镀锌', 'http://192.168.40.83:3000/images/ZDM02-431.jpg', 71, 1, NULL, NULL, 999, NULL);
INSERT INTO `ds_goods` VALUES ('b942d98007af11ec806c1fa591f5811e', '368ab45007a911ec806c1fa591f5811e', '隐藏式闭门器', 'ITS380', '闭门器系列', '铝合金', '氧化银色', 'http://192.168.40.83:3000/images/ITS380.jpg', 23, 1, 55.00, 60.00, 999, NULL);
INSERT INTO `ds_goods` VALUES ('cb60d75007b111ec806c1fa591f5811e', '4a3d6dd007a911ec806c1fa591f5811e', '执手', 'JCZ01R', '暂无', '暂无', '氧化', 'http://192.168.40.83:3000/images/jcz01r.jpg', 23, 1, NULL, NULL, 999, NULL);
INSERT INTO `ds_goods` VALUES ('cedf1ae007ac11ec806c1fa591f5811e', '2da7023007a911ec806c1fa591f5811e', '方轴执手', 'CZ47', '传动机构用执手', '锌铝合金', '静电粉末喷涂', 'http://192.168.40.83:3000/images/CZ47.jpg', 45, 0, 448.00, 550.00, 999, NULL);
INSERT INTO `ds_goods` VALUES ('dc953fd007b011ec806c1fa591f5811e', '433e332007a911ec806c1fa591f5811e', '传动锁闭器', 'BPM4001B', '传动锁闭器', '动杆Q195+定杆ML08AL', '电镀环保锌', 'http://192.168.40.83:3000/images/BPM4001B.webp', 42, 0, 55.78, 70.00, 999, NULL);
INSERT INTO `ds_goods` VALUES ('e05c615007ad11ec806c1fa591f5811e', '253831f007a911ec806c1fa591f5811e', '锁盒', 'CH23', '传动锁闭器', '锌铝合金', '静电粉末喷涂', 'http://192.168.40.83:3000/images/CH23.jpg', 11, 0, 49.00, 80.00, 999, NULL);

-- ----------------------------
-- Table structure for ds_goods_carousel
-- ----------------------------
DROP TABLE IF EXISTS `ds_goods_carousel`;
CREATE TABLE `ds_goods_carousel`  (
  `imageIndex` int(11) NOT NULL AUTO_INCREMENT,
  `blongGoods` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `carouselImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`imageIndex`) USING BTREE,
  INDEX `blongGoods`(`blongGoods`) USING BTREE,
  CONSTRAINT `ds_goods_carousel_ibfk_1` FOREIGN KEY (`blongGoods`) REFERENCES `ds_goods` (`goodsId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_goods_carousel
-- ----------------------------
INSERT INTO `ds_goods_carousel` VALUES (1, '96bc2f0007ab11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ZDM02-431.jpg');
INSERT INTO `ds_goods_carousel` VALUES (2, '0b35893007ac11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ZDM01-541.jpg');
INSERT INTO `ds_goods_carousel` VALUES (3, 'cedf1ae007ac11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/CZ47.jpg');
INSERT INTO `ds_goods_carousel` VALUES (4, '3a9ae89007ad11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/CZ32.jpg');
INSERT INTO `ds_goods_carousel` VALUES (5, 'e05c615007ad11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/CH23.jpg');
INSERT INTO `ds_goods_carousel` VALUES (6, '1c8d5b6007af11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/CH10.jpg');
INSERT INTO `ds_goods_carousel` VALUES (7, '60d1187007af11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ITS96V.jpg');
INSERT INTO `ds_goods_carousel` VALUES (8, 'b942d98007af11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ITS380.jpg');
INSERT INTO `ds_goods_carousel` VALUES (9, '147e41e007b011ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/B-780.jpg');
INSERT INTO `ds_goods_carousel` VALUES (10, '786b28d007b011ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/B-840.jpg');
INSERT INTO `ds_goods_carousel` VALUES (11, 'dc953fd007b011ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/BPM4001B.webp');
INSERT INTO `ds_goods_carousel` VALUES (12, '4688f7b007b111ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/BPM4001A.webp');
INSERT INTO `ds_goods_carousel` VALUES (13, '7fc4c31007b111ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/JCZ01L.jpg');
INSERT INTO `ds_goods_carousel` VALUES (14, 'cb60d75007b111ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/JCZ01R.jpg');
INSERT INTO `ds_goods_carousel` VALUES (15, '77b441b0096d11ec8bbacf26760c992a', 'http://192.168.40.83:8090/images/201608160527193632.webp');

-- ----------------------------
-- Table structure for ds_goods_comment
-- ----------------------------
DROP TABLE IF EXISTS `ds_goods_comment`;
CREATE TABLE `ds_goods_comment`  (
  `orderIndex` int(255) NOT NULL AUTO_INCREMENT,
  `goodsId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `crateUserNameCn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`orderIndex`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ds_goods_detail
-- ----------------------------
DROP TABLE IF EXISTS `ds_goods_detail`;
CREATE TABLE `ds_goods_detail`  (
  `imgIndex` int(11) NOT NULL AUTO_INCREMENT,
  `blongGoods` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`imgIndex`) USING BTREE,
  INDEX `blongGoods`(`blongGoods`) USING BTREE,
  CONSTRAINT `ds_goods_detail_ibfk_1` FOREIGN KEY (`blongGoods`) REFERENCES `ds_goods` (`goodsId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_goods_detail
-- ----------------------------
INSERT INTO `ds_goods_detail` VALUES (1, '96bc2f0007ab11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ZDM02-431-detail01.jpg');
INSERT INTO `ds_goods_detail` VALUES (2, '96bc2f0007ab11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ZDM02-431-detail02.jpg');
INSERT INTO `ds_goods_detail` VALUES (3, '0b35893007ac11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ZDM01-541-detail01.jpg');
INSERT INTO `ds_goods_detail` VALUES (4, '0b35893007ac11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ZDM01-541-detail02.jpg');
INSERT INTO `ds_goods_detail` VALUES (5, 'cedf1ae007ac11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/CZ47-detail.jpg');
INSERT INTO `ds_goods_detail` VALUES (6, '3a9ae89007ad11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/CZ32-detail.jpg');
INSERT INTO `ds_goods_detail` VALUES (7, 'e05c615007ad11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/CH23-detail.jpg');
INSERT INTO `ds_goods_detail` VALUES (8, '1c8d5b6007af11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/CH10-detail.jpg');
INSERT INTO `ds_goods_detail` VALUES (9, '60d1187007af11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ITS96V-detail01.jpg');
INSERT INTO `ds_goods_detail` VALUES (10, '60d1187007af11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ITS96V-detail02.jpg');
INSERT INTO `ds_goods_detail` VALUES (11, 'b942d98007af11ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/ITS380-detail.jpg');
INSERT INTO `ds_goods_detail` VALUES (12, '147e41e007b011ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/B-780-detail01.jpg');
INSERT INTO `ds_goods_detail` VALUES (13, '147e41e007b011ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/B-780-detail02.jpg');
INSERT INTO `ds_goods_detail` VALUES (14, '786b28d007b011ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/B-840-detail01.jpg');
INSERT INTO `ds_goods_detail` VALUES (15, '786b28d007b011ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/B-840-detail02.jpg');
INSERT INTO `ds_goods_detail` VALUES (16, 'dc953fd007b011ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/BPM4001Bdetail.webp');
INSERT INTO `ds_goods_detail` VALUES (17, '4688f7b007b111ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/BPM4001Adetail.webp');
INSERT INTO `ds_goods_detail` VALUES (18, '7fc4c31007b111ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/JCZ01Ldetail.jpg');
INSERT INTO `ds_goods_detail` VALUES (19, 'cb60d75007b111ec806c1fa591f5811e', 'http://192.168.40.83:3000/images/JCZ01Rdetail.jpg');
INSERT INTO `ds_goods_detail` VALUES (20, '77b441b0096d11ec8bbacf26760c992a', 'http://192.168.40.83:8090/images/201608160527193632.webp');

-- ----------------------------
-- Table structure for ds_hot_search
-- ----------------------------
DROP TABLE IF EXISTS `ds_hot_search`;
CREATE TABLE `ds_hot_search`  (
  `wordIndex` int(11) NOT NULL AUTO_INCREMENT,
  `searchWord` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `times` int(11) NULL DEFAULT NULL COMMENT '搜索次数',
  PRIMARY KEY (`wordIndex`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_hot_search
-- ----------------------------
INSERT INTO `ds_hot_search` VALUES (1, '执手', 355);
INSERT INTO `ds_hot_search` VALUES (2, '门窗', 322);
INSERT INTO `ds_hot_search` VALUES (3, '锁', 533);
INSERT INTO `ds_hot_search` VALUES (4, '门', 233);
INSERT INTO `ds_hot_search` VALUES (5, '传动', 244);
INSERT INTO `ds_hot_search` VALUES (6, '窗', 321);
INSERT INTO `ds_hot_search` VALUES (7, '弹簧', 111);

-- ----------------------------
-- Table structure for ds_main_type
-- ----------------------------
DROP TABLE IF EXISTS `ds_main_type`;
CREATE TABLE `ds_main_type`  (
  `mainTypeId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mainTypeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mainTypeImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mainTypeIcon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  `createUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createUserCn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`mainTypeId`) USING BTREE,
  INDEX `createUser`(`createUser`) USING BTREE,
  INDEX `createUserCn`(`createUserCn`) USING BTREE,
  CONSTRAINT `ds_main_type_ibfk_1` FOREIGN KEY (`createUser`) REFERENCES `ds_user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ds_main_type_ibfk_2` FOREIGN KEY (`createUserCn`) REFERENCES `ds_user` (`usernameCn`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_main_type
-- ----------------------------
INSERT INTO `ds_main_type` VALUES ('68a90ea007a911ec806c1fa591f5811e', '铝合金门窗', 'http://192.168.40.83:3000/images/20210714084335524456.jpg', 'http://192.168.40.83:3000/images/20210714084335524456.jpg', '2021-08-28 09:58:43', 'admin', '系统管理员');
INSERT INTO `ds_main_type` VALUES ('6e5d52c007a911ec806c1fa591f5811e', '门控五金', 'http://192.168.40.83:3000/images/20210714084432831726.jpg', 'http://192.168.40.83:3000/images/20210714084432831726.jpg', '2021-08-28 09:59:30', 'admin', '系统管理员');
INSERT INTO `ds_main_type` VALUES ('75285e1007a911ec806c1fa591f5811e', '塑料门窗五金', 'http://192.168.40.83:3000/images/20210830_141932.jpg', 'http://192.168.40.83:3000/images/20210830_141932.jpg', '2021-08-28 10:01:14', 'admin', '系统管理员');
INSERT INTO `ds_main_type` VALUES ('7a9befb007a911ec806c1fa591f5811e', '家居门窗五金', 'http://192.168.40.83:3000/images/20210830142432.jpg', 'http://192.168.40.83:3000/images/20210830142432.jpg', '2021-08-28 10:02:27', 'admin', '系统管理员');
INSERT INTO `ds_main_type` VALUES ('a695b5f0096c11ec8bbacf26760c992a', '门窗密封胶条', 'http://192.168.40.83:3000/images/20210714084737124525.jpg', 'http://192.168.40.83:3000/images/20210714084737124525.jpg', '2021-08-30 16:30:30', 'admin', '系统管理员');

-- ----------------------------
-- Table structure for ds_menu
-- ----------------------------
DROP TABLE IF EXISTS `ds_menu`;
CREATE TABLE `ds_menu`  (
  `menuId` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `menuName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `menuParentId` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `menuOrder` int(4) NULL DEFAULT NULL,
  `menuStatus` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isLeaf` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `menuPath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`menuId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_menu
-- ----------------------------
INSERT INTO `ds_menu` VALUES ('M0001', '用户', '0', 2, '0', '0', '用户', '2021-08-12 16:33:06', 'el-icon-user-solid', '/system', 'USER', 'admin');
INSERT INTO `ds_menu` VALUES ('M00011', '用户管理', 'M0001', 2, '0', '1', '用户管理', '2021-08-12 16:34:26', 'el-icon-user', '/user', 'USER', 'admin');
INSERT INTO `ds_menu` VALUES ('M00012', '角色管理', 'M0001', 2, '0', '1', '角色管理', '2021-08-12 16:35:03', 'el-icon-s-custom', '/role', 'USER', 'admin');
INSERT INTO `ds_menu` VALUES ('M0002', '主页', '0', 1, '0', '0', '主页', '2021-08-12 16:34:26', 'el-icon-s-home', '/home', 'HOME', 'admin');
INSERT INTO `ds_menu` VALUES ('M0003', '商品', '0', 3, '0', '0', '商品', '2021-08-25 09:58:32', 'el-icon-s-goods', '/product', 'PRODUCT', 'admin');
INSERT INTO `ds_menu` VALUES ('M00031', '商品管理', 'M0003', 3, '0', '1', '商品管理', '2021-08-25 10:01:03', 'el-icon-shopping-bag-1', '/productList', 'PRODUCTLIST', 'admin');
INSERT INTO `ds_menu` VALUES ('M00032', '商品分类', 'M0003', 3, '0', '1', '商品分类', '2021-08-25 10:02:50', 'el-icon-s-grid', '/productClassify', 'PRODUCTCLASSIFY', 'admin');
INSERT INTO `ds_menu` VALUES ('M00033', '商品评论', 'M0003', 3, '0', '1', '商品评论', '2021-08-25 10:11:24', 'el-icon-chat-line-round', '/productComment', 'PRODUCTCOMMENT', 'admin');
INSERT INTO `ds_menu` VALUES ('M0004', '订单', '0', 4, '0', '0', '订单', '2021-08-25 11:10:46', 'el-icon-shopping-cart-full', '/order', 'ORDER', 'admin');
INSERT INTO `ds_menu` VALUES ('M00041', '订单管理', 'M0004', 4, '0', '1', '订单管理', '2021-08-25 11:14:11', 'el-icon-s-order', '/orderList', 'ORDERLIST', 'admin');
INSERT INTO `ds_menu` VALUES ('M0005', '营销', '0', 5, '0', '0', '营销', '2021-08-25 11:37:23', 'el-icon-s-marketing', '/market', 'MARKET', 'admin');
INSERT INTO `ds_menu` VALUES ('M00051', '优惠卷', 'M0005', 5, '0', '1', '优惠卷', '2021-08-25 11:38:35', 'el-icon-s-ticket', '/coupons', 'COUPONS', 'admin');
INSERT INTO `ds_menu` VALUES ('M00052', '用户领取记录', 'M0005', 5, '0', '1', '用户领取记录', '2021-08-25 11:40:17', 'el-icon-thumb', '/couponsUserReceive', 'COUPONSUSERRECEIVE', 'admin');
INSERT INTO `ds_menu` VALUES ('M0006', '财务', '0', 6, '0', '0', '发票', '2021-08-25 13:57:44', 'el-icon-s-finance', '/financial', 'FINANCIAL', 'admin');
INSERT INTO `ds_menu` VALUES ('M00061', '发票管理', 'M0006', 6, '0', '1', '发票管理', '2021-08-25 13:59:18', 'el-icon-document', '/invoice', 'INVOICE', 'admin');
INSERT INTO `ds_menu` VALUES ('M0007', '内容', '0', 7, '0', '0', '内容', '2021-08-25 14:08:13', 'el-icon-reading', '/content', 'CONTENT', 'admin');
INSERT INTO `ds_menu` VALUES ('M00071', '文章管理', 'M0007', 7, '0', '1', '文章管理', '2021-08-25 14:09:18', 'el-icon-news', '/article', 'ARTICLE', 'admin');
INSERT INTO `ds_menu` VALUES ('M00072', '消息管理', 'M0007', 7, '0', '1', '消息管理', '2021-08-25 14:10:57', 'el-icon-chat-dot-round', '/message', 'MESSAGE', 'admin');
INSERT INTO `ds_menu` VALUES ('M0008', '设置', '0', 8, '0', '0', '设置', '2021-08-25 15:35:37', 'el-icon-s-tools', '/setting', 'SETTING', 'admin');
INSERT INTO `ds_menu` VALUES ('M00081', '图标管理', 'M0008', 8, '0', '1', '图标管理', '2021-08-25 15:36:50', 'el-icon-picture-outline', '/icons', 'ICONS', 'admin');
INSERT INTO `ds_menu` VALUES ('M00082', '轮播设置', 'M0008', 8, '0', '1', '轮播设置', '2021-08-25 15:38:16', 'el-icon-data-board', '/carousel', 'CAROUSEL', 'admin');
INSERT INTO `ds_menu` VALUES ('string', '1', 'M0001', 1, '1', '1', '1', '2021-08-13 10:16:57', '1', '1', '1', 'admin');

-- ----------------------------
-- Table structure for ds_role
-- ----------------------------
DROP TABLE IF EXISTS `ds_role`;
CREATE TABLE `ds_role`  (
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleStatus` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  `createUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createUsername` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`roleId`) USING BTREE,
  INDEX `createUser`(`createUser`) USING BTREE,
  INDEX `createUsername`(`createUsername`) USING BTREE,
  CONSTRAINT `ds_role_ibfk_1` FOREIGN KEY (`createUser`) REFERENCES `ds_user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ds_role_ibfk_2` FOREIGN KEY (`createUsername`) REFERENCES `ds_user` (`usernameCn`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_role
-- ----------------------------
INSERT INTO `ds_role` VALUES ('R0001', '管理员', '0', '2021-08-12 15:37:38', 'admin', '系统管理员');
INSERT INTO `ds_role` VALUES ('R0002', '用户', '0', '2021-08-12 15:37:56', 'admin', '系统管理员');

-- ----------------------------
-- Table structure for ds_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `ds_role_menu`;
CREATE TABLE `ds_role_menu`  (
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `menuId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`roleId`, `menuId`) USING BTREE,
  INDEX `menuId`(`menuId`) USING BTREE,
  CONSTRAINT `ds_role_menu_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `ds_role` (`roleId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ds_role_menu_ibfk_2` FOREIGN KEY (`menuId`) REFERENCES `ds_menu` (`menuId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_role_menu
-- ----------------------------
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M0001');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00011');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00012');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M0002');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M0003');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00031');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00032');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00033');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M0004');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00041');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M0005');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00051');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00052');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M0006');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00061');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M0007');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00071');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00072');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M0008');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00081');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'M00082');
INSERT INTO `ds_role_menu` VALUES ('R0001', 'string');

-- ----------------------------
-- Table structure for ds_role_user
-- ----------------------------
DROP TABLE IF EXISTS `ds_role_user`;
CREATE TABLE `ds_role_user`  (
  `roleId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDefault` smallint(2) NOT NULL,
  `isManager` smallint(2) NOT NULL,
  PRIMARY KEY (`roleId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `ds_role_user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `ds_role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ds_role_user_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `ds_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ds_sale_info
-- ----------------------------
DROP TABLE IF EXISTS `ds_sale_info`;
CREATE TABLE `ds_sale_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bannerUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_sale_info
-- ----------------------------
INSERT INTO `ds_sale_info` VALUES ('7c3ccc200b9311eca4335bb3f59d5237', '新品首发', 'http://192.168.40.83:3000/images/新品首发.jpg');

-- ----------------------------
-- Table structure for ds_sale_type
-- ----------------------------
DROP TABLE IF EXISTS `ds_sale_type`;
CREATE TABLE `ds_sale_type`  (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `coverUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `bannerUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`index`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_sale_type
-- ----------------------------
INSERT INTO `ds_sale_type` VALUES (1, '7c73aae0093311ec8bf05dc8dfa90f0c', '爆款专区', '大家都在买', 'http://192.168.40.83:3000/images/banner.jpg', 'http://192.168.40.83:3000/images/banner.jpg');
INSERT INTO `ds_sale_type` VALUES (2, '3d369760093411ec8bf05dc8dfa90f0c', '酒店产品', '好物一站购买', 'http://192.168.40.83:3000/images/sink.png', 'http://192.168.40.83:3000/images/hotel.jpg');
INSERT INTO `ds_sale_type` VALUES (3, '465a11a0093411ec8bf05dc8dfa90f0c', '生活器具', '畅享舒适生活', 'http://192.168.40.83:3000/images/juice.png', 'http://192.168.40.83:3000/images/hotel.jpg');
INSERT INTO `ds_sale_type` VALUES (4, 'b0942150093411ec8bf05dc8dfa90f0c', '精选工具', '合和精选工具', 'http://192.168.40.83:3000/images/tools.png', 'http://192.168.40.83:3000/images/20210830_095141.jpg');
INSERT INTO `ds_sale_type` VALUES (5, '01c5a710093511ec8bf05dc8dfa90f0c', '电工电气', '品质有保障', 'http://192.168.40.83:3000/images/blow.png', 'http://192.168.40.83:3000/images/20210830_095231.jpg');

-- ----------------------------
-- Table structure for ds_sale_type_info
-- ----------------------------
DROP TABLE IF EXISTS `ds_sale_type_info`;
CREATE TABLE `ds_sale_type_info`  (
  `blongType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`blongType`, `id`) USING BTREE,
  CONSTRAINT `ds_sale_type_info_ibfk_1` FOREIGN KEY (`blongType`) REFERENCES `ds_sale_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_sale_type_info
-- ----------------------------
INSERT INTO `ds_sale_type_info` VALUES ('01c5a710093511ec8bf05dc8dfa90f0c', '12fcbcc0093611ec8bf05dc8dfa90f0c', '强电材料');
INSERT INTO `ds_sale_type_info` VALUES ('01c5a710093511ec8bf05dc8dfa90f0c', '22d1edf0093611ec8bf05dc8dfa90f0c', '配电系列');
INSERT INTO `ds_sale_type_info` VALUES ('3d369760093411ec8bf05dc8dfa90f0c', '686e52a0093511ec8bf05dc8dfa90f0c', '硬装软装');
INSERT INTO `ds_sale_type_info` VALUES ('3d369760093411ec8bf05dc8dfa90f0c', '7bed7900093511ec8bf05dc8dfa90f0c', '灯具/安防');
INSERT INTO `ds_sale_type_info` VALUES ('3d369760093411ec8bf05dc8dfa90f0c', '897b0420093511ec8bf05dc8dfa90f0c', '清洁工具');
INSERT INTO `ds_sale_type_info` VALUES ('3d369760093411ec8bf05dc8dfa90f0c', '9c780230093511ec8bf05dc8dfa90f0c', '酒店日用');
INSERT INTO `ds_sale_type_info` VALUES ('465a11a0093411ec8bf05dc8dfa90f0c', 'a9574bf0093511ec8bf05dc8dfa90f0c', '家用电器');
INSERT INTO `ds_sale_type_info` VALUES ('465a11a0093411ec8bf05dc8dfa90f0c', 'bbb48790093511ec8bf05dc8dfa90f0c', '生活百货');
INSERT INTO `ds_sale_type_info` VALUES ('465a11a0093411ec8bf05dc8dfa90f0c', 'caa8f5b0093511ec8bf05dc8dfa90f0c', '数码家居');
INSERT INTO `ds_sale_type_info` VALUES ('465a11a0093411ec8bf05dc8dfa90f0c', 'd4d358a0093511ec8bf05dc8dfa90f0c', '户外运动');
INSERT INTO `ds_sale_type_info` VALUES ('b0942150093411ec8bf05dc8dfa90f0c', '000d7a50093611ec8bf05dc8dfa90f0c', '办公用品');
INSERT INTO `ds_sale_type_info` VALUES ('b0942150093411ec8bf05dc8dfa90f0c', 'e4719b50093511ec8bf05dc8dfa90f0c', '防护产品');
INSERT INTO `ds_sale_type_info` VALUES ('b0942150093411ec8bf05dc8dfa90f0c', 'f1164d10093511ec8bf05dc8dfa90f0c', '五金工具');

-- ----------------------------
-- Table structure for ds_sub_main_type
-- ----------------------------
DROP TABLE IF EXISTS `ds_sub_main_type`;
CREATE TABLE `ds_sub_main_type`  (
  `subMainTypeId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parentType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `subMainTypeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `subMainTypeImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  `createUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createUserNameCn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`subMainTypeId`) USING BTREE,
  INDEX `createUser`(`createUser`) USING BTREE,
  INDEX `createUserNameCn`(`createUserNameCn`) USING BTREE,
  INDEX `ds_sub_main_type_ibfk_4`(`parentType`) USING BTREE,
  CONSTRAINT `ds_sub_main_type_ibfk_2` FOREIGN KEY (`createUser`) REFERENCES `ds_user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ds_sub_main_type_ibfk_3` FOREIGN KEY (`createUserNameCn`) REFERENCES `ds_user` (`usernameCn`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ds_sub_main_type_ibfk_4` FOREIGN KEY (`parentType`) REFERENCES `ds_main_type` (`mainTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_sub_main_type
-- ----------------------------
INSERT INTO `ds_sub_main_type` VALUES ('253831f007a911ec806c1fa591f5811e', '68a90ea007a911ec806c1fa591f5811e', '传动锁闭器', 'http://192.168.40.83:3000/images/20210222142747344249.jpg', '2021-08-28 10:22:16', 'admin', '系统管理员');
INSERT INTO `ds_sub_main_type` VALUES ('2da7023007a911ec806c1fa591f5811e', '68a90ea007a911ec806c1fa591f5811e', '多点锁执手', 'http://192.168.40.83:3000/images/20210222142832154193.jpg', '2021-08-28 10:23:30', 'admin', '系统管理员');
INSERT INTO `ds_sub_main_type` VALUES ('368ab45007a911ec806c1fa591f5811e', '6e5d52c007a911ec806c1fa591f5811e', '闭门器', 'http://192.168.40.83:3000/images/20210222114547393805.webp', '2021-08-28 10:25:54', 'admin', '系统管理员');
INSERT INTO `ds_sub_main_type` VALUES ('3cd0b12007a911ec806c1fa591f5811e', '6e5d52c007a911ec806c1fa591f5811e', '地弹簧', 'http://192.168.40.83:3000/images/20210222114517248936.webp', '2021-08-28 10:27:19', 'admin', '系统管理员');
INSERT INTO `ds_sub_main_type` VALUES ('433e332007a911ec806c1fa591f5811e', '75285e1007a911ec806c1fa591f5811e', '传动器系列', 'http://192.168.40.83:3000/images/20210830_142201.jpg', '2021-08-28 10:30:34', 'admin', '系统管理员');
INSERT INTO `ds_sub_main_type` VALUES ('4a3d6dd007a911ec806c1fa591f5811e', '7a9befb007a911ec806c1fa591f5811e', '平开门窗配件', 'http://192.168.40.83:3000/images/20210830_121423.jpg', '2021-08-28 10:31:32', 'admin', '系统管理员');
INSERT INTO `ds_sub_main_type` VALUES ('d48f1eb0096c11ec8bbacf26760c992a', 'a695b5f0096c11ec8bbacf26760c992a', '三元乙丙-复合密封条', 'http://192.168.40.83:3000/images/20210220164445696535.jpg', '2021-08-30 16:34:55', 'admin', '系统管理员');
INSERT INTO `ds_sub_main_type` VALUES ('ee38e91007a811ec806c1fa591f5811e', '68a90ea007a911ec806c1fa591f5811e', '系统类产品', 'http://192.168.40.83:3000/images/20210222142859542858.jpg', '2021-08-28 10:18:19', 'admin', '系统管理员');

-- ----------------------------
-- Table structure for ds_user
-- ----------------------------
DROP TABLE IF EXISTS `ds_user`;
CREATE TABLE `ds_user`  (
  `userId` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `usernameCn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imgPath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isDelete` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createUserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  `version` int(4) NULL DEFAULT NULL,
  `updateUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE,
  INDEX `username`(`username`) USING BTREE,
  INDEX `usernameCn`(`usernameCn`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ds_user
-- ----------------------------
INSERT INTO `ds_user` VALUES ('bd34e43006ff11ecb98405f3801aacd2', 'admin', '系统管理员', '66f622f6b15e554787570b98741d3beb', NULL, '13800138000', '0', NULL, NULL, NULL, 0, NULL, NULL);
INSERT INTO `ds_user` VALUES ('c48bb4c006ff11ecb98405f3801aacd2', 'wangjian', '隔壁小王', '66f622f6b15e554787570b98741d3beb', NULL, '13800138000', '0', 'admin', '系统管理员', '2021-08-27 14:32:49', 0, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
