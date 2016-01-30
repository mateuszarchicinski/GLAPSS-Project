-- phpMyAdmin SQL Dump
-- version home.pl
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 30 Sty 2016, 22:22
-- Wersja serwera: 5.5.44-37.3-log
-- Wersja PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `18659907_sm_i_kb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name_lastName` varchar(150) NOT NULL,
  `e_mail` varchar(150) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `content_message` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Zrzut danych tabeli `messages`
--

INSERT INTO `messages` (`id`, `name_lastName`, `e_mail`, `subject`, `content_message`) VALUES
(1, 'Mateusz Archiciński', 'mateusz.archicinski@gmail.com', 'Brak', 'Witam!');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
