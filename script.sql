create table posts (
    id int not null primary key auto_increment,
    title varchar(100) not null,
    content text,
    author varchar(100) not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime default null
);