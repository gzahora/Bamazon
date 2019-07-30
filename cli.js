var inquirer = require("inquirer");

var Manager = require("./bamazonManager");
var Customer = require("./bamazonCustomer");


// Prompt for term

function bamazonWelcome(){
    inquirer.prompt([
        {
            type: "list",
            name: "userInput",
            choices: ["Customer Portal", "Manager Portal", "EXIT"],
            message: "Welcome to Bamazon! How would you like to proceed?"
        }
        // After the prompt, store the user's response in a variable called location.
    ]).then(function (action) {
        switch (action.userInput) {
            case "Customer Portal":
                Customer.customerPortal();
                break;
            case "Manager Portal":
                Manager.managerPortal();
                break;
            case "EXIT":
                exitHere();
                break;
            default:
                console.log("An error occurred! Unrecognized input.");
        }
    });
}

function exitHere() {
    return console.log("You have exited the Bamazon Welcome Page. Goodbye.")
};

bamazonWelcome();
