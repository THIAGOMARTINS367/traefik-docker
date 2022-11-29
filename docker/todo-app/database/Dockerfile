FROM mysql:8.0.21 AS todo_list_db

WORKDIR /usr/src/database

ADD /todo_list_db.sql /docker-entrypoint-initdb.d/0_todo_list_db.sql

ADD /initial_data.sql /docker-entrypoint-initdb.d/1_initial_data.sql

RUN chmod -R 775 /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD 123456
