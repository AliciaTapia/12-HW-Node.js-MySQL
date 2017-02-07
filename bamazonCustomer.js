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
var key = require("./keys.js")

//console.log(key.csl.console);

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: key.pass.prueba_uno,
    database: "bamazonDB"
});


// Creates the conection to mysql database ....
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId); // connectes as id  and then in your terminal youll see a number
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
}

//first display all of the items available for sale. 
var showItems = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        selectItem();
    });

}
      

var selectItem = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        //console.log(res);
        inquirer.prompt([{
            name: "choice",
            type: "input",
            message: "What is the item you would like to buy, please use the product's id number?",
            // validates data entry/checks that input is a valid entry
            validate: function(input) {
                // declare function as asynchronous, and save the done callback
                var done = this.async();
                // Do async stuff
                setTimeout(function() {
                    // checking if user input for item_id is found in availableItems item_id array
                    if (availableItems.indexOf(parseInt(input)) == -1) {
                        // pass the return value in the done callback
                        done('Please provide a valid product id');
                        return;
                    }
                    done(null, true);
                }, 200);
            }
        }, {
            name: "units",
            type: "input",
            message: "how many units of the product they would like to buy?",
            // validates data entry/checks that input is a valid entry
            validate: function(input) {
                // declare function as asynchronous, and save the done callback
                var done = this.async();
                // Do async stuff
                setTimeout(function() {
                    // checking if user input for item_id is found in availableItems item_id array
                    if (availableItems.indexOf(parseInt(input)) == -1) {
                        // pass the return value in the done callback
                        done('Please provide a valid product id');
                        return;
                    }
                    done(null, true);
                }, 200);
            }
            
        }]).then(function(answer) {
            availability(answer.choice, answer.units);
        });
    })
}


var availability = function(choice, units) {
    var query = "SELECT id, product_name, price, stock_quantity FROM products WHERE ?";
    connection.query(query, { id : choice }, function(err, res) {
        // checking if number of items ordered is in stock
        if (res[0].stock_quantity < parseInt(units)) {
            console.log("There are only " + res[0].stock_quantity + " left in stock");
            connection.end();
        } else {
            var total = units * res[0].price;
            var stockLeft = res[0].stock_quantity - units;
            console.log("There are " + stockLeft + "left")
            newInventory(choice, stockLeft);

        }
    });
}

var newInventory = function(choice, stockLeft) {
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{ stock_quantity: stockLeft }, { id: choice }],
        function(err, res) {
            if (err) throw err;
        });
    connection.end();
}
