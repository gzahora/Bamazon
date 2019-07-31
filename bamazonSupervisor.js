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

var Supervisor = {

    supervisorPortal: function () {

        inquirer.prompt([

            {
                type: "list",
                name: "userInput",
                choices: ["View Product Sales by Department", "Create New Department", "EXIT"],
                message: "How would you like to proceed?"
            }

            // After the prompt, store the user's response in a variable called location.
        ]).then(function (action) {
            switch (action.userInput) {
                case "View Product Sales by Department":
                    Supervisor.productSales();
                    break;
                case "Create New Department":
                    Supervisor.newDept();
                    break;
                case "EXIT":
                    Supervisor.exit();
                    break;
                default:
                    console.log("An error occurred! Unrecognized input.");
            }
        })
    },

    //---------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------

    newDept: function () {
        // query the database for all items being auctioned
        connection.query("SELECT * FROM departments", function (err, results) {
            if (err) throw err;
            // once you have the items, prompt the user for which they'd like to bid on
            inquirer.prompt([
                {
                    type: "input",
                    name: "addDept",
                    message: "Name the department you want to add"
                },
                {
                    type: "number",
                    name: "addCosts",
                    message: "What is the dollar value of overhead costs?"
                },
            ]).then(function (action) {
                connection.query("INSERT INTO departments SET ?",
                    {
                        department_name: action.addDept,
                        over_head_costs: action.addCosts,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " item inserted!\n");
                        Supervisor.productSales();
                    })
            })
        });

    },

    productSales: function () {
        console.log("Selecting all products...\n");
        connection.query("SELECT * FROM departments", function (err, res) {
          if (err) throw err;
          var displayTable = new Table({
            head: ["Department ID", "Department Name", "Over Head Costs", "Total Sales", "Total Profit"],
            colWidths: [10, 25, 20, 20, 14]
          });
          for (var i = 0; i < res.length; i++) {
            displayTable.push(
              [res[i].department_id, res[i].department_name, "$" + res[i].over_head_costs, "$" + res[i].product_sales, "$" +res[i].total_profit]
            );
          }
          console.log(displayTable.toString());
          Supervisor.supervisorPortal();
        });
      },

    exit: function () {
        connection.end();
        return console.log("You have exited the Bamazon supervisor portal. Goodbye.")
    }

};
module.exports = Supervisor;