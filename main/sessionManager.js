
export const sessionVariables = {
    step: null,
    isVerified: false,
    nameOfProduct: '',
    kindOfAnimal: '',
    priceOfProduct: '',
    descriptionOfProduct: '',
    quantityOfProduct: '',
    sessionCounter:0
};

export function resetSession() {
    sessionVariables.step = 'verify';
    sessionVariables.isVerified = false;
    sessionVariables.nameOfProduct = '';
    sessionVariables.priceOfProduct = '';
    sessionVariables.descriptionOfProduct = '';
    sessionVariables.quantityOfProduct = '';
}
