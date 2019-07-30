require("dotenv").config();

var keys = require("./keys.js");

var password = keys.mysql.password;

var inquirer = require("inquirer");

var mysql = require("mysql");

var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: password,
  database: "bamazon_db"
});

var Customer = {

  customerPortal: function () {

    inquirer.prompt([

      {
        type: "list",
        name: "userInput",
        choices: ["Display Catalog", "Shop", "EXIT"],
        message: "How would you like to proceed?"
      }

      // After the prompt, store the user's response in a variable called location.
    ]).then(function (action) {
      switch (action.userInput) {
        case "Display Catalog":
          Customer.displayCatalog();
          break;
        case "Shop":
          Customer.userShops();
          break;
        case "EXIT":
          Customer.exit();
          break;
        default:
          console.log("An error occurred! Unrecognized input.");
      }
    })
  },

  //---------------------------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------------

userShops: function () {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            type: "rawlist",
            name: "choice",
            choices: function () {
              var productsStocked = [];
              for (var i = 0; i < results.length; i++) {
                productsStocked.push(results[i].product_name);
              }
              return productsStocked;
            },
            message: "What product would you like to buy?"
          },
          {
            type: "number",
            name: "quantity",
            message: "How many would you like to buy?"
          }
        ])
        .then(function (input) {
          // get the information of the chosen item
          var shoppingCart;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === input.choice) {
              shoppingCart = results[i];
            }
          }

          // determine if there is enough of the porduct in stock
          if (shoppingCart.stock_quantity >= (input.quantity)) {
            // qauntity was low enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: (shoppingCart.stock_quantity - input.quantity)
                },
                {
                  item_id: shoppingCart.item_id
                }
              ],
              function (error) {
                if (error) throw err;
                console.log("Your purchase of " + input.quantity + " " + input.choice + "s at a price of $" + shoppingCart.price + " each was successful! Your total came to " + "$" + (input.quantity * shoppingCart.price) + ". Thank you for shopping at Bamazon");
                Customer.customerPortal();
              }
            );
          }
          else {
            // Bamazon is out of stock, so apologize and start over
            console.log("There are just " + shoppingCart.stock_quantity + " of " + input.choice + " left. Please purchase fewer of that item");
            Customer.customerPortal();
          }
        });
    });
  },


displayCatalog: function () {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      var displayTable = new Table({
        head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
        colWidths: [10, 30, 25, 10, 14]
      });
      for (var i = 0; i < res.length; i++) {
        displayTable.push(
          [res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
        );
      }
      console.log(displayTable.toString());
      Customer.customerPortal();
    });
  },


exit: function () {
    connection.end();
    return console.log("You have exited Bamazon. Goodbye.")
  }

};
module.exports = Customer;