--
-- База данных: `gym`
--

-- --------------------------------------------------------

--
-- Структура таблицы `gamers`
--

CREATE TABLE `gamers` (
                          `id` int NOT NULL,
                          `token` varchar(255) DEFAULT NULL,
                          `score` int DEFAULT NULL,
                          `person_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
                         `id` int NOT NULL,
                         `name` varchar(255) DEFAULT NULL,
                         `size_1` int DEFAULT NULL,
                         `size_2` int DEFAULT NULL,
                         `gridPosition_1` int DEFAULT NULL,
                         `gridPosition_2` int DEFAULT NULL,
                         `playground_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `name`, `size_1`, `size_2`, `gridPosition_1`, `gridPosition_2`, `playground_id`) VALUES
                                                                                                                (1, 'treadmill', 3, 2, 10, 9, 1),
                                                                                                                (2, 'paper', 2, 2, 9, 9, 1),
                                                                                                                (3, 'soda', 2, 2, 7, 7, 1),
                                                                                                                (4, 'bathtub', 2, 2, 1, 9, 1),
                                                                                                                (5, 'unicorn', 2, 2, 5, 10, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
                            `id` int NOT NULL,
                            `token` varchar(255) DEFAULT NULL,
                            `message` varchar(255) DEFAULT NULL,
                            `created` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
-- Структура таблицы `playground`
--

CREATE TABLE `playground` (
                              `id` int NOT NULL,
                              `size_1` int DEFAULT NULL,
                              `size_2` int DEFAULT NULL,
                              `gridDivision` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `playground`
--

INSERT INTO `playground` (`id`, `size_1`, `size_2`, `gridDivision`) VALUES
    (1, 7, 7, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
                         `id` int NOT NULL,
                         `login` varchar(255) DEFAULT NULL,
                         `password` varchar(255) DEFAULT NULL,
                         `user_name` varchar(255) DEFAULT NULL,
                         `user_surname` varchar(255) DEFAULT NULL,
                         `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `user_name`, `user_surname`, `token`) VALUES
                                                                                          (1, 'bobr', 'c4ca4238a0b923820dcc509a6f75849b', 'bobr', 'bobr', '7d7ed65a3b7eb86bf5f01e290f3df513'),
                                                                                          (3, 'surok', 'c4ca4238a0b923820dcc509a6f75849b', 'there', 'hey', '72845b7ac535f2add45f9f830ae64d75');

--
-- Индексы сохранённых таблиц
--

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
    ADD PRIMARY KEY (`id`),
  ADD KEY `fr_item_subject` (`playground_id`);

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
-- Индексы таблицы `playground`
--
ALTER TABLE `playground`
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
-- AUTO_INCREMENT для таблицы `gamers`
--
ALTER TABLE `gamers`
    MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `gamers`
--
ALTER TABLE `gamers`
    ADD CONSTRAINT `fr_gamer_subject` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`);

--
-- Ограничения внешнего ключа таблицы `items`
--
ALTER TABLE `items`
    ADD CONSTRAINT `fr_item_subject` FOREIGN KEY (`playground_id`) REFERENCES `playground` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
