DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT (10) NOT NULL,
  stock_quantity INT (10) Default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Plant", "Home & Garden", 25, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Water Bottle - 1L", "Food & Beverage", 20, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candle: Midnight Forest", "Home & Garden", 16, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candle: Peppermint Rain", "Home & Garden", 16, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smart TV - 50 Inches", "Electronics", 350, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Portable Speakers", "Electronics", 115, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Wristwatch with Brown Leather Band", "Fashion", 135, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("5-Pack of White V-Neck Ts (Size: M)", "Fashion", 17, 31);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beef Jerkey", "Food & Beverage", 6, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ibuprofen (600 count)", "Health & Beauty", 12, 63);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("2-in-1 Shampoo and Conditioner", "Health & Beauty", 9, 1);

SELECT * FROM products