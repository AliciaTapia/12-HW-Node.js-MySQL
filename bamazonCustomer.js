/**create a Node application called bamazonCustomer.js. 
Running this application will first display all of the items available for sale. 
Include the ids, names, and prices of products for sale.

The app should then prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

7.	Once the customer has placed the order, your application should check 
if your store has enough of the product to meet the customer's request.
	-If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

8. However, if your store does have enough of the product, you should fulfill the customer's order.

	-This means updating the SQL database to reflect the remaining quantity.
	-Once the update goes through, show the customer the total cost of their purchase.**/

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "mariposa1@",
  database: "bamazonDB"
});


// Creates the conection to mysql database ....
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);  // connectes as id  and then in your terminal youll see a number
start();
});



// First lets ask the user if he or she will like to buy a product and show the catalog
var start = function() {
    inquirer.prompt({
        name: "buyOrnot",
        type: "rawlist",
        message: "Would you like to [BUY] an item or [NOT] ?",
        choices: ["BUY", "NOT"]
    }).then(function(answer) {
        if (answer.buyOrnot.toUpperCase() === "BUY") {

           showItems();


        } else {
            //console.log("see you next time");
        }
    });
};

//first display all of the items available for sale. 
var showItems = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        productId();
    });

}
      

//The first should ask them the ID of the product they would like to buy.
var productId = function() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What is the item you would like to buy, please use the product's id?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }else{
            	return false;
            }           
    }
//The second message should ask how many units of the product they would like to buy.    
	},{
        name: "units",
        type: "input",
        message: "how many units of the product they would like to buy?",

    }]).then(function(answer) {
        connection.query("SELECT * FROM products WHERE id=?" ["item"], function(err, res) {
            if (err) throw err;
            console.log(res);
            productId();
        });
    });
};

//Once the customer has placed the order, your application should check 
//if your store has enough of the product to meet the customer's request.
//If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.




