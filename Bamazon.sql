CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT (11) AUTO_INCREMENT not null
  ,product_name VARCHAR(45) not NULL
  ,department_name VARCHAR(40) not NULL
  ,price DECIMAL(10,2) not NULL
  ,stock_quantity int(1productsproductsproducts00) not NULL
  ,PRIMARY KEY (id)
);

select * from products;

INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('Notebook','Office supplies', 4.5,100);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('Pencil','Office supplies', 4,100);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('Pen','Office supplies',  4,100);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('T-shirt','Clothing', 8 , 70);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('Shoes','Clothing',120,380);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('Jacket','Clothing', 5,100);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('television','Electronics',80,240);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('play station','Electronics',70,180);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('computer','Electronics',300,450);
INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES('headphones','Electronics',9,800); 
