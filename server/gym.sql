-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:4200
-- Время создания: Фев 16 2024 г., 22:20
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `gym`
--

-- --------------------------------------------------------

--
-- Структура таблицы `best_gamers`
--

CREATE TABLE `best_gamers` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `score` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `best_gamers`
--

INSERT INTO `best_gamers` (`id`, `user_id`, `score`) VALUES
(47, 65, 15),
(48, 62, 19);

-- --------------------------------------------------------

--
-- Структура таблицы `game`
--

CREATE TABLE `game` (
  `id` int NOT NULL,
  `version` int NOT NULL,
  `chat_hash` varchar(255) NOT NULL,
  `gamers_hash` varchar(255) DEFAULT NULL,
  `items_hash` varchar(255) DEFAULT NULL,
  `timestamp` int NOT NULL,
  `timeout` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `game`
--

INSERT INTO `game` (`id`, `version`, `chat_hash`, `gamers_hash`, `items_hash`, `timestamp`, `timeout`) VALUES
(1, 1, '4e1500d8b80df3f99cdfcd44af016127', '26e3e87611339cb7a1d668bcd3848e2c', 'ecb4a377e71dc7f877cba63d1f824af6', 1704921710, 300);

-- --------------------------------------------------------

--
-- Структура таблицы `gamers`
--

CREATE TABLE `gamers` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  `tiredness` int DEFAULT NULL,
  `person_id` int DEFAULT NULL,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `timestamp` int NOT NULL,
  `timeout` int NOT NULL,
  `velocity` int NOT NULL DEFAULT '2',
  `freeze` int NOT NULL DEFAULT '0',
  `isTeleported` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `gamers`
--

INSERT INTO `gamers` (`id`, `user_id`, `score`, `tiredness`, `person_id`, `x`, `y`, `status`, `timestamp`, `timeout`, `velocity`, `freeze`, `isTeleported`) VALUES
(458, 61, 1, 1, NULL, 0, 0, 1, 0, 300, 2, 0, 0),
(459, 62, 7, 2145, 1, 306, 347, 1, 0, 300, 2, 0, 0),
(460, 63, 1, 1, 2, 100, 347, 1, 0, 300, 2, 0, 0),
(461, 64, 1, 1, NULL, 0, 0, 1, 0, 300, 2, 0, 0),
(462, 65, 1, 1, 3, 450, -33, 1, 0, 300, 2, 0, 0),
(463, 66, 1, 1, NULL, 0, 0, 1, 0, 300, 2, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `gamer_status`
--

CREATE TABLE `gamer_status` (
  `id` int NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `gamer_status`
--

INSERT INTO `gamer_status` (`id`, `status`) VALUES
(1, 'alive'),
(2, 'dead');

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `length` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  `isUsed` int DEFAULT NULL,
  `tiredness` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `name`, `length`, `width`, `x`, `y`, `isUsed`, `tiredness`) VALUES
(1, 'barbell', 40, 56, 4, 9, 0, 3),
(2, 'elliptical', 44, 55, 100, 250, 0, 4),
(3, 'treadmill', 34, 56, 480, 9, 0, 5),
(4, 'treadmill2', 42, 55, 438, 282, 0, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `message`, `created`) VALUES
(24, 63, 'sdsda', '2024-01-25 18:05:52'),
(25, 62, 'dsdsda', '2024-01-25 18:05:55');

-- --------------------------------------------------------

--
-- Структура таблицы `persons`
--

CREATE TABLE `persons` (
  `id` int NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `persons`
--

INSERT INTO `persons` (`id`, `type`) VALUES
(1, 'nerd'),
(2, 'sportyman'),
(3, 'woman');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `name`, `surname`, `token`) VALUES
(62, 'aaa', '0b4e7a0e5fe84ad35fb5f95b9ceeac79', 'aaa', 'aaa', '2f90a0ce38c366546f2651438556c8e5'),
(63, 'sss', 'af15d5fdacd5fdfea300e88a8e253e82', 'sss', 'sss', '8711057ed5f21bcfa28990ba0257d1d6'),
(64, 'ccc', 'c1f68ec06b490b3ecb4066b1b13a9ee9', 'ccc', 'ccc', NULL),
(65, 'zzz', 'f3abb86bd34cf4d52698f14c0da1dc60', 'zzz', 'zzz', '4b3f7a7224245a4ef4f630b739bc5508'),
(66, 'rrr', NULL, 'rrr', 'rrr', '6b0c20124c744dbce599a3bb7b59373f');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `best_gamers`
--
ALTER TABLE `best_gamers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `gamers`
--
ALTER TABLE `gamers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fr_gamer_subject` (`person_id`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `best_gamers`
--
ALTER TABLE `best_gamers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT для таблицы `game`
--
ALTER TABLE `game`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `gamers`
--
ALTER TABLE `gamers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=464;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `gamers`
--
ALTER TABLE `gamers`
  ADD CONSTRAINT `fr_gamer_subject` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
