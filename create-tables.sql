-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2022 at 08:09 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `anrxdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `alt` varchar(250) DEFAULT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `src` varchar(250) NOT NULL,
  `admin_graphql_api_id` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `product_id`, `position`, `created_at`, `updated_at`, `alt`, `width`, `height`, `src`, `admin_graphql_api_id`) VALUES
(1, 632910391, 3, '2021-10-01 20:42:46', '2021-10-01 20:42:46', NULL, 123, 456, 'https://cdn.shopify.com/s/files/1/0006/9093/3842/products/ipod-nano.png?v=1633120966', 'gid://shopify/ProductImage/378407906');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `alt` varchar(250) DEFAULT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `src` varchar(250) NOT NULL,
  `admin_graphql_api_id` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `product_id`, `position`, `created_at`, `updated_at`, `alt`, `width`, `height`, `src`, `admin_graphql_api_id`) VALUES
(1, 632910391, 3, '2021-10-01 20:42:46', '2021-10-01 20:42:46', NULL, 123, 456, 'https://cdn.shopify.com/s/files/1/0006/9093/3842/products/ipod-nano.png?v=1633120966', 'gid://shopify/ProductImage/378407906');

-- --------------------------------------------------------

--
-- Table structure for table `image_variant_ids`
--

CREATE TABLE `image_variant_ids` (
  `id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `variant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image_variant_ids`
--

INSERT INTO `image_variant_ids` (`id`, `image_id`, `variant_id`) VALUES
(1, 1, 808950810),
(2, 1, 808950810);

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `product_id`, `name`, `position`) VALUES
(594680422, 632910391, 'Color', 1);

-- --------------------------------------------------------

--
-- Table structure for table `presentment_prices`
--

CREATE TABLE `presentment_prices` (
  `id` int(11) NOT NULL,
  `variant_id` int(11) NOT NULL,
  `compare_at_price` decimal(20,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `presentment_prices`
--

INSERT INTO `presentment_prices` (`id`, `variant_id`, `compare_at_price`) VALUES
(1, 808950810, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `price`
--

CREATE TABLE `price` (
  `id` int(11) NOT NULL,
  `presentment_price_id` int(11) NOT NULL,
  `amount` decimal(20,2) NOT NULL,
  `currency_code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `price`
--

INSERT INTO `price` (`id`, `presentment_price_id`, `amount`, `currency_code`) VALUES
(1, 1, '199.00', 'USD');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `body_html` varchar(250) NOT NULL,
  `vendor` varchar(50) NOT NULL,
  `product_type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `handle` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `published_at` timestamp NULL DEFAULT NULL,
  `template_suffix` varchar(50) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `published_scope` varchar(50) NOT NULL,
  `tags` varchar(250) NOT NULL,
  `admin_graphql_api_id` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `body_html`, `vendor`, `product_type`, `created_at`, `handle`, `updated_at`, `published_at`, `template_suffix`, `status`, `published_scope`, `tags`, `admin_graphql_api_id`) VALUES
(632910391, 'IPod Nano - 8GB', '<p>It\'s the small iPod with one very big idea: Video. Now the world\'s most popular music player, available in 4GB and 8GB models, lets you enjoy TV shows, movies, video podcasts, and more. The larger, brighter display means amazing picture quality. I', 'Apple', 'Cult Products', '2022-02-18 06:32:12', 'ipod-nano', '2022-02-18 06:32:12', '2008-01-01 00:00:00', NULL, 'active', 'web', 'Emotive, Flash Memory, MP3, Music', 'gid://shopify/Product/632910392'),
(632910392, 'IPod Nano - 8GB', '<p>It\'s the small iPod with one very big idea: Video. Now the world\'s most popular music player, available in 4GB and 8GB models, lets you enjoy TV shows, movies, video podcasts, and more. The larger, brighter display means amazing picture quality. I', 'Apple', 'Cult Products', '2022-02-18 06:32:28', 'ipod-nano', '2022-02-18 06:32:43', '2008-01-01 00:00:00', NULL, 'inactive', 'web', 'Emotive, Flash Memory, MP3, Music', 'gid://shopify/Product/632910392');

-- --------------------------------------------------------

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `position` int(11) NOT NULL,
  `inventory_policy` varchar(50) NOT NULL,
  `compare_at_price` decimal(20,2) DEFAULT NULL,
  `fulfillment_service` varchar(50) NOT NULL,
  `inventory_management` varchar(50) NOT NULL,
  `option1` varchar(50) DEFAULT NULL,
  `option2` varchar(50) DEFAULT NULL,
  `option3` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `taxable` tinyint(1) NOT NULL,
  `barcode` varchar(50) NOT NULL,
  `grams` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `weight` decimal(20,2) NOT NULL,
  `weight_unit` varchar(50) NOT NULL,
  `inventory_item_id` int(11) NOT NULL,
  `inventory_quantity` int(11) NOT NULL,
  `old_inventory_quantity` int(11) NOT NULL,
  `requires_shipping` tinyint(1) NOT NULL,
  `admin_graphql_api_id` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `variants`
--

INSERT INTO `variants` (`id`, `product_id`, `title`, `price`, `sku`, `position`, `inventory_policy`, `compare_at_price`, `fulfillment_service`, `inventory_management`, `option1`, `option2`, `option3`, `created_at`, `updated_at`, `taxable`, `barcode`, `grams`, `image_id`, `weight`, `weight_unit`, `inventory_item_id`, `inventory_quantity`, `old_inventory_quantity`, `requires_shipping`, `admin_graphql_api_id`) VALUES
(808950810, 632910391, 'Pink', '199.00', 'IPOD2008PINK', 1, 'continue', NULL, 'manual', 'shopify', 'Pink', NULL, NULL, '2021-10-01 20:42:46', '2021-10-01 20:42:46', 1, '1234_pink', 567, 562641783, '1.25', 'lb', 808950810, 10, 10, 1, 'gid://shopify/ProductVariant/808950810');

-- --------------------------------------------------------

--
-- Table structure for table `_values`
--

CREATE TABLE `_values` (
  `id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_values`
--

INSERT INTO `_values` (`id`, `option_id`, `name`) VALUES
(1, 594680422, 'Pink'),
(2, 594680422, 'Red'),
(3, 594680422, 'Green'),
(4, 594680422, 'Black');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_variant_ids`
--
ALTER TABLE `image_variant_ids`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `presentment_prices`
--
ALTER TABLE `presentment_prices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `variants`
--
ALTER TABLE `variants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_values`
--
ALTER TABLE `_values`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `image_variant_ids`
--
ALTER TABLE `image_variant_ids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=594680423;

--
-- AUTO_INCREMENT for table `presentment_prices`
--
ALTER TABLE `presentment_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `price`
--
ALTER TABLE `price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=632910393;

--
-- AUTO_INCREMENT for table `variants`
--
ALTER TABLE `variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=808950811;

--
-- AUTO_INCREMENT for table `_values`
--
ALTER TABLE `_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
