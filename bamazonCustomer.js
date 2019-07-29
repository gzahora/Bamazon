require("dotenv").config();

var keys = require("./keys.js");

var password = keys.mysql.password;

var inquirer = require("inquirer");

var mysql = require("mysql");

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

// function mainInq() {

//     inquirer.prompt([

//         {
//             type: "list",
//             name: "userInput",
//             choices: ["POST", "BID", "EXIT"],
//             message: "How would you like to proceed?"
//         }

//         // After the prompt, store the user's response in a variable called location.
//     ]).then(function (action) {
//         switch (action.userInput) {
//             case "POST":
//                 postThis();
//                 break;
//             case "BID":
//                 bidThis();
//                 break;
//             case "EXIT":
//                 exit();
//                 break;
//             default:
//                 console.log("An error occurred! Unrecognized input.");
//         }
//     });
// }

// function postThis() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "postItem",
//             message: "Name the item you want to post"
//         },
//         {
//             type: "input",
//             name: "postCat",
//             message: "Name the category of the item you're posting"
//         },
//         {
//             type: "input",
//             name: "startingBid",
//             message: "What is the lowest amount of money you'd accept for this item?"
//         },


//     ]).then(function (action) {
//         connection.query("INSERT INTO auctions SET ?",
//             {
//                 item: action.postItem,
//                 category: action.postCat,
//                 highest_bid: action.startingBid,
//             },
//             function (err, res) {
//                 if (err) throw err;
//                 console.log(res.affectedRows + " item inserted!\n");
//                 connection.end();
//                 mainInq();
//             })
//         })   
//     };

// function exit() {
//     return console.log("You have exited the auction. Goodbye.")
// };

// mainInq();

function bidAuction() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var productsStocked = [];
              for (var i = 0; i < results.length; i++) {
                productsStocked.push(results[i].product_name);
              }
              return productsStocked;
            },
            message: "What product would you like to buy?"
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
          }
        ])
        .then(function(input) {
          // get the information of the chosen item
          var shoppingCart;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === input.choice) {
              shoppingCart = results[i];
            }
          }
  
          // determine if there is enough of the porduct in stock
          if (shoppingCart.stock_quantity > parseInt(input.quantity)) {
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
              function(error) {
                if (error) throw err;
                console.log("Purchase Successful!");
                bidAuction();
              }
            );
          }
          else {
            // Bamazon is out of stock, so apologize and start over
            console.log("There is an insufficient amount of stock left for your item. Please purchase fewer of that item");
            bidAuction();
          }
        });
    });
  }

  bidAuction ();