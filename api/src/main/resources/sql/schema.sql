DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    id          bigserial PRIMARY KEY,
    name        varchar(255) not null unique,
    description varchar(255) not null,
    price       integer      not null
);