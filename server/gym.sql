-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:4200
-- Время создания: Янв 17 2024 г., 23:27
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
) ;

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
);

--
-- Дамп данных таблицы `game`
--

INSERT INTO `game` (`id`, `version`, `chat_hash`, `gamers_hash`, `items_hash`, `timestamp`, `timeout`) VALUES
    (1, 1, '7796ae789826691a9277552720194713', 'f880410bc441710de8ee669fc72443ad', 'ff1d0c2a272286dc58fab33626f56f11', 1704921710, 300);

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
                          `timeout` int NOT NULL
);

-- --------------------------------------------------------

--
-- Структура таблицы `gamer_status`
--

CREATE TABLE `gamer_status` (
                                `id` int NOT NULL,
                                `status` varchar(255) NOT NULL
);

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
);

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `name`, `length`, `width`, `x`, `y`, `isUsed`, `tiredness`) VALUES
                                                                                           (1, 'barbell', 2, 2, 1, 3, 0, 3),
                                                                                           (2, 'elliptical', 2, 2, 4, 4, 0, 4),
                                                                                           (3, 'treadmill', 2, 2, 7, 3, 1, 5),
                                                                                           (4, 'treadmill', 2, 2, 9, 3, 0, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
                            `id` int NOT NULL,
                            `user_id` int DEFAULT NULL,
                            `message` varchar(255) DEFAULT NULL,
                            `created` varchar(255) DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Структура таблицы `persons`
--

CREATE TABLE `persons` (
                           `id` int NOT NULL,
                           `type` varchar(255) DEFAULT NULL
);

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
);

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
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT для таблицы `game`
--
ALTER TABLE `game`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `gamers`
--
ALTER TABLE `gamers`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=458;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

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
