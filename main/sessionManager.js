// Define an object to hold session-related variables
export const sessionVariables = {
    step: null,                  // Tracks the current step in the session
    isVerified: false,           // Tracks if the user is verified or authenticated
    nameOfProduct: '',           // Stores the name of the product being processed
    kindOfAnimal: '',            // Stores the kind of animal related to the product
    priceOfProduct: '',          // Stores the price of the product
    descriptionOfProduct: '',    // Stores the description of the product
    quantityOfProduct: '',       // Stores the quantity of the product
    sessionCounter: 0            // Counts the number of sessions or interactions
};

// Function to reset the session variables
export function resetSession() {
    // Reset session variables to their initial state
    sessionVariables.step = 'verify';               // Reset the current step to 'verify'
    sessionVariables.isVerified = false;           // Reset authentication status
    sessionVariables.nameOfProduct = '';           // Reset product name
    sessionVariables.priceOfProduct = '';          // Reset product price
    sessionVariables.descriptionOfProduct = '';    // Reset product description
    sessionVariables.quantityOfProduct = '';       // Reset product quantity
}
