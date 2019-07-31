var inquirer = require("inquirer");

var manager = require("./bamazonManager");
var customer = require("./bamazonCustomer");
var supervisor = require("./bamazonSupervisor");


// Prompt for term

function bamazonWelcome(){
    inquirer.prompt([
        {
            type: "list",
            name: "userInput",
            choices: ["Customer Portal", "Manager Portal", "Supervisor Portal", "EXIT"],
            message: "Welcome to Bamazon! How would you like to proceed?"
        }
        // After the prompt, store the user's response in a variable called location.
    ]).then(function (action) {
        switch (action.userInput) {
            case "Customer Portal":
                customer.customerPortal();
                break;
            case "Manager Portal":
                manager.managerPortal();
                break;
            case "Supervisor Portal":
                supervisor.supervisorPortal();
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
