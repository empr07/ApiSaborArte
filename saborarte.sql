-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-10-2023 a las 07:53:03
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de datos: `sabor_arte`
--
-- --------------------------------------------------------
--

CREATE DATABASE sabor_arte;
USE sabor_arte;
-- Estructura de tabla para la tabla `categorias`
--
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `activo` bit(1) NOT NULL,
  `fecharegistro` datetime NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `sabores`
--
CREATE TABLE `sabores` (
  `id` int(11) NOT NULL,
  `sabor` varchar(50) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `marcas`
--
CREATE TABLE `ingredientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `compras`
--
CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `totalproducto` int(11) NOT NULL,
  `total` decimal(10, 2) NOT NULL,
  `fechacompra` datetime NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `detalle_compras`
--
CREATE TABLE `detalle_compras` (
  `id` int(11) NOT NULL,
  `idcompra` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fechaentrega` datetime NOT NULL,
  `horaentrega` time NOT NULL,
  `total` decimal(10, 2) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `productos`
--
CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `idingrediente` int(11) NOT NULL,
  `idcategoria` int(11) NOT NULL,
  `idtamaño` int(11) NOT NULL,
  `idsabor` int(11) NOT NULL,
  `precio` decimal(10, 2) NOT NULL,
  `stock` int(11) NOT NULL,
  `rutaimagen` varchar(2000) NOT NULL,
  `activo` bit(1) NOT NULL,
  `fecharegistro` datetime NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tallas`
--
CREATE TABLE `tamaños` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `usuarios`
--
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellido_p` varchar(100) NOT NULL,
  `apellido_m` varchar(100) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `esadministrador` bit(1) NOT NULL,
  `activo` bit(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `fecharegistro` datetime DEFAULT curdate()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `pagos`
--
CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `idcompra` int(11) NOT NULL,
  `metodo` varchar(50) NOT NULL,
  `totalpagado` decimal(10, 2) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `cp` varchar(20) NOT NULL,
  `calles` varchar(20) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

--
-- Indices de la tabla `categorias`
--
ALTER TABLE
  `categorias`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `colors`
--
ALTER TABLE
  `sabores`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_compras`
--
ALTER TABLE
  `detalle_compras`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `fk_idcompra` (`idcompra`),
ADD
  KEY `fk_idproducto` (`idproducto`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE
  `tamaños`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE
  `productos`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `fk_idtamaño` (`idtamaño`),
ADD
  KEY `fk_idsabor` (`idsabor`),

ADD
  KEY `fk_idcategoria` (`idcategoria`),

ADD
  KEY `fk_idingrediente` (`idingrediente`);

--
-- Indices de la tabla `tallas`
--
ALTER TABLE
  `ingredientes`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE
  `usuarios`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE
  `pagos`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `fk_idcompra` (`idcompra`);

--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE
  `categorias`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sabores`
--
ALTER TABLE
  `sabores`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE
  `compras`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_compras`
--
ALTER TABLE
  `detalle_compras`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tamaños`
--
ALTER TABLE
  `tamaños`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE
  `productos`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingredientes`
--
ALTER TABLE
  `ingredientes`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE
  `usuarios`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE
  `pagos`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--


--
-- Filtros para la tabla `detalle_compras`
--
ALTER TABLE
  `detalle_compras`
ADD
  CONSTRAINT `fk_idcompra` FOREIGN KEY (`idcompra`) REFERENCES `compras` (`id`),
ADD
  CONSTRAINT `fk_idproducto` FOREIGN KEY (`idproducto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE
  `pagos`
ADD
  CONSTRAINT `fk_idcomprapagos` FOREIGN KEY (`idcompra`) REFERENCES `compras` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE
  `productos`
ADD
  CONSTRAINT `fk_idtamaño` FOREIGN KEY (`idtamaño`) REFERENCES `tamaños` (`id`),
ADD
  CONSTRAINT `fk_idsabor` FOREIGN KEY (`idsabor`) REFERENCES `sabores` (`id`),
ADD
  CONSTRAINT `fk_idcategoria` FOREIGN KEY (`idcategoria`) REFERENCES `categorias` (`id`),
ADD
  CONSTRAINT `fk_idingrediente` FOREIGN KEY (`idingrediente`) REFERENCES `ingredientes` (`id`);



ALTER TABLE
  `compras`
ADD 
  KEY `fk_idusuario` (`idusuario`);
  
ALTER TABLE
  `compras`
ADD
  CONSTRAINT `fk_idusuario` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`);

  

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;