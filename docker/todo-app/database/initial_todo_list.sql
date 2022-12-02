USE `todo_list_db`;

SET character_set_client = utf8;

SET character_set_connection = utf8;

SET character_set_results = utf8;

SET collation_connection = utf8_general_ci;

INSERT INTO
    `todo_list` (
        `description`,
        `check`,
        `user_id`
    )
VALUES (
        'Estudar os conteúdos de Docker',
        TRUE,
        1
    ), (
        'Criar um Banco de Dados para a aplicação "todo-list"',
        FALSE,
        1
    );