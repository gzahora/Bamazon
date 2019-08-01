# Bamazon

## Author

**Greg Zahora** 

- - -

## Description
Bamazon is an online marketplace simulation which allows you to become the customer, manager, or supervisor of the store. Bamazon is a command line node app that takes in parameters and returns data from available databases. The user can navigate to the below portals to choose which path to take. 

The choices are:
   * `Customer Portal`
   * `Manager Portal`
   * `Supervisor Portal`
   * `EXIT`

- - -

### **Video Guide**

Watch the video here: https://drive.google.com/file/d/1cv_WfRzKW4aSivluJzITB6cSDcr-nQ81/view

### **Instructions**

1. Open your terminal.
2. Navigate to the folder that contains the `bamazon.js` file. 
3. Run one of the four commands using your arrow keys and the enter/return button.

    **Choice 1**: Run the `Customer portal` command
    
        > node bamazon.js

            > Customer Portal
                
                > Display Catalog
                    - this command will show the customer the inventory that they can shop from

                > Shop
                    -this command will allow the customer to "purchase" any product that Bamazon has stocked

                    > Choose your product from the list using the arrow keys
                        > Type the amount you would like to buy
                            - You will be unable to purchase more than the quantity available.
                            - After making your purchase, you will be given a message confirming the sale, including how much it cost. Then you will be returned to the beginning of the Customer Portal

                > Exit
                    - this command will exit the bamazon app


    **Choice 2**: Run the `Magnager Portal` command
    
        > node bamazon.js

            > Manager Portal

                > View Products for Sale
                    - this command will show the manager the inventory that they can sell
                
                > View Low Inventory
                    - this command will show the manager any product that is running low (those with a quantity <= 5)
                
                > Add to Inventory
                    - this command will allow the manager to add inventory to any product on the list

                    > Choose your product from the list using the arrow keys
                        > Type the amount you would like re-stock
                            - You will then receive a message confirming your inventory update, then be shown the inventory with the quantity of your product updated.

                > Add New Product
                    - this command will allow the manager to enter a new product into bamazon's inventory

                    > Type the name of the product you want to add
                        e.g. Perfume
                        > Type the name of the category/department you are adding it to.
                            e.g. Health & Beauty
                                > Type how much the item will cost.
                                    e.g. 23  --- (you do not need to add a "$")
                                    > Type the quantity of the first order of this product
                                        e.g. 15
                                        - You will then receive a confirmation message and be shown Bamazon's inventory with your product added.
                > Exit
                    - this command will exit the bamazon app
    

    **Choice 3**: Run the `Supervisor Portal` command

        > node bamazon.js

            > Supervisor Portal

                > View Product Sales by Department
                    - this command will show the supervisor overhead costs, product sales/revenue, and total profit by department

                > Create New Department
                    -this command will allow the supervisor to add a new department to the supervisor report

                    > Type the name of the department/category you want to add
                        e.g. Music
                        > Type the amount of overhead costs
                            e.g. 400  --- (you do not need to add a "$")
                            - You will then receive a confirmation message and be shown Bamazon's product sales by department report. Total profit will initially be a negative because overhead costs have been incurred, but revenue/sales have not yet been recognized.

                > Exit
                    - this command will exit the bamazon app


    **Choice 4**: Run the `EXIT` command
        
        > node bamazon.js

            > EXIT
                - This command will exit the Bamazon marketplace
        
- - -

## TECHNOLOGIES USED
* Javascript
* Nodejs
* Node packages:
    * Inquirer
    * MySQL
    * CLI-Table
    * DotEnv
* Git
* GitHub