DROP DATABASE IF EXISTS cereal_db;
CREATE DATABASE cereal_db;
USE cereal_db;

SOURCE tables/create_products_table.sql;
SOURCE tables/create_users_table.sql;
SOURCE tables/create_carts_table.sql;
SOURCE tables/create_cp_table.sql;

SOURCE seeds/product_seeds.sql;
