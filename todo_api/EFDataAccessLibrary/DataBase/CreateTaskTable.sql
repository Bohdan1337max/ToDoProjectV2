CREATE TABLE IF NOT EXISTS task
(
    id        serial       NOT NULL primary key,
    name      varchar(500) NOT NULL,
    completed boolean      NOT NULL
)