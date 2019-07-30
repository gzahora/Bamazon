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

function managerPortal() {

    inquirer.prompt([

        {
            type: "list",
            name: "userInput",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"],
            message: "How would you like to proceed?"
        }

        // After the prompt, store the user's response in a variable called location.
    ]).then(function (action) {
        switch (action.userInput) {
            case "View Products for Sale":
                displayCatalog();
                break;
            case "View Low Inventory":
                lowInv();
                break;
            case "Add to Inventory":
                addInv();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "EXIT":
                exit();
                break;
            default:
                console.log("An error occurred! Unrecognized input.");
        }
    });
};

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

function addProduct() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer.prompt([
            {
                type: "input",
                name: "addProduct",
                message: "Name the product you want to add"
            },
            {
                type: "input",
                name: "addCat",
                message: "Name the category of the product you're adding"
            },
            {
                type: "input",
                name: "addPrice",
                message: "How much does this item cost"
            },
            {
                type: "number",
                name: "addQuantity",
                message: "How many of this product are you adding (quantity)."
            },
        ]).then(function (action) {
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: action.addProduct,
                    department_name: action.addCat,
                    price: parseInt(action.addPrice),
                    stock_quantity: action.addQuantity,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " item inserted!\n");
                    displayCatalog();
                })
        })
    });

};

function addInv() {
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
                    message: "What product would you like to re-stock?"
                },
                {
                    type: "number",
                    name: "quantity",
                    message: "How many items are you re-stocking?"
                }
            ])
            .then(function (input) {
                // get the information of the chosen item
                var updateInv;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === input.choice) {
                        updateInv = results[i];
                    }
                };
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: updateInv.stock_quantity + input.quantity
                        },
                        {
                            item_id: updateInv.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Your inventory update for the " + input.choice + " product was successful! You added " + input.quantity + " units. There are now " + (updateInv.stock_quantity + input.quantity) + " " + input.choice + "'s.");
                        displayCatalog();
                    }
                );
            });
    });
};

function displayCatalog() {
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
        managerPortal();
    });
};

function lowInv() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, res) {
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
        managerPortal();
    });
};


function exit() {
    connection.end();
    return console.log("You have exited the Bamazon Manager Portal. Goodbye.")
};

module.exports = managerPortal();
