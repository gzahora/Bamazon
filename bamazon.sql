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
VALUES ("Men's Analog Watch", "Fashion", 135, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("5-Pack of White V-Neck Ts", "Fashion", 17, 31);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beef Jerkey", "Food & Beverage", 6, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ibuprofen (600 count)", "Health & Beauty", 12, 63);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("2-in-1 Shampoo", "Health & Beauty", 9, 1);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs INT NOT NULL,
  product_sales INT DEFAULT 0,
  total_profit INT AS (product_sales - over_head_costs),
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home & Garden", 200);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Food & Beverage", 180);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 340);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Fashion", 270);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Health & Beauty", 140);

SELECT * FROM products;
SELECT * FROM departments;
