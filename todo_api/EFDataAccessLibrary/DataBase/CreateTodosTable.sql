CREATE TABLE IF NOT EXISTS todo
(
    todo_id       serial       NOT NULL,
    todo_group_id int          NULL,
    name          varchar(500) NOT NULL,
    completed     boolean      NOT NULL,
    primary key (todo_id),
    constraint fk_todo_group
        foreign key (todo_group_id)
            references todo_group (todo_group_id)
            ON DELETE CASCADE
)

