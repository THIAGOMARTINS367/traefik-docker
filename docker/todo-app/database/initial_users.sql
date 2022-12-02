USE `todo_list_db`;

SET character_set_client = utf8;

SET character_set_connection = utf8;

SET character_set_results = utf8;

SET collation_connection = utf8_general_ci;

INSERT INTO
    `user` (
        `fullname`,
        `email`,
        `password`
    )
VALUES (
        'Thiago Martins',
        'thiago@gmail.com',
        '$2b$07$VWRhRCP17l9EXL2RfYBN4ekgwcSKYBzqr48pOdo/VPhSvOCn/CGPS' # Senha: 123456
    );