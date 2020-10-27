class Product{

    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI{
    addProduct(newProduct){
        const productList = document.querySelector('#product-list');
        const element = document.createElement('div')
        element.setAttribute('class', 'product-container');
        element.innerHTML = `
            <div class="product-body text-center">
                <strong>Name: ${newProduct.name}</strong>
                <strong>Price: ${newProduct.price}</strong>
                <strong>Year: ${newProduct.year}</strong>
                <button class="btn_custom btn_danger btn_delete" name="delete">Delete</button>
            </div>
        `;
        productList.append(element);
    }
    resetForm(formId){
        document.querySelector(formId).reset();
    }
    removeProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.remove();
        }
        
    }
    displayMessage(mssg, alertClass){
        const alert = document.createElement('div');
        alert.setAttribute('class', `alert alert_${alertClass}`);
        alert.appendChild(document.createTextNode(mssg));
        const wrapper = document.querySelector('.main-wrapper');
        const container = document.querySelector('.flex-container');
        wrapper.insertBefore(alert, container); 
        setTimeout(() => {
            alert.remove();
        }, 3000)
    }
}

//DOM Events
const btnSubmit = document.querySelector('#product-form');
const productName = document.querySelector('#name');
const productPrice = document.querySelector('#price');
const productYear = document.querySelector('#year');
const ui = new UI();

btnSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!productName.value || !productPrice.value || !productYear.value){
        ui.displayMessage('Please fill all the inputs!!!', 'warning')
        
    }else{
        const newProduct = new Product(productName.value, productPrice.value, productYear.value);
        ui.addProduct(newProduct);
        ui.resetForm('#product-form');
        ui.displayMessage('You add a product successfully!!!', 'success');
    }
    
});
const btnDelete = document.querySelector('#product-list');

btnDelete.addEventListener('click', (e) => {
    ui.removeProduct(e.target);
    ui.displayMessage('You deleted a product...', 'danger');
})