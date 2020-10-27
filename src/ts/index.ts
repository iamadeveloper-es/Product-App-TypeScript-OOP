class Product{
    name:string;
    price:number;
    year:number
    constructor(name:string, price:number, year:number){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI{

    addProduct(newProduct: Product){
        const productList = document.querySelector('#product-list') as HTMLDivElement;
        const productContainer = document.createElement('div') as HTMLDivElement;
        productContainer.setAttribute('class', 'product-container');
        let productTemplate = `
            <div class="product-body text-center">
                <strong>Name: ${newProduct.name}</strong>
                <strong>Price: ${newProduct.price}</strong>
                <strong>Year: ${newProduct.year}</strong>
                <button class="btn_custom btn_danger btn_delete" name="delete">Delete</button>
            </div>
        ` as string;
        productContainer.innerHTML = productTemplate;
        productList.append(productContainer);

    }
    removeProduct(btn: Node){
        btn.parentElement?.parentElement?.remove();
    }
    resetForm(node:HTMLFormElement){
        node.reset();
    }
    displayMssg(mssg: string, alertClass: string){
        const alert = document.createElement('div') as HTMLDivElement;
        const alertContainer = document.querySelector('.alert-container') as HTMLDivElement;
        alert.setAttribute('class', `alert alert_${alertClass}`);
        alert.innerHTML = mssg;
        alertContainer.append(alert);
        setTimeout(() => {
            alert.remove();
        }, 2000);
    }
}


//DOM
const form = document.querySelector('#product-form') as HTMLFormElement;
const inptName = document.querySelector('#name') as HTMLInputElement;
const inptPrice = document.getElementById("price") as HTMLInputElement;
const inptYear = document.querySelector('#year') as HTMLInputElement;

const ui = new UI();

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!inptName.value || isNaN(inptPrice.valueAsNumber)|| !Number(inptYear.value)){
        ui.displayMssg('Please fill all the inputs', 'warning'); 
    }else{
        const newProduct = new Product(inptName.value, inptPrice.valueAsNumber, Number(inptYear.value));
        console.log(newProduct);
        ui.addProduct(newProduct);
        ui.resetForm(form);
        ui.displayMssg('Yo add a product successfully!!', 'success'); 
        const btnRemove = document.querySelectorAll('.btn_delete') as NodeList;
        console.log(btnRemove)
        btnRemove.forEach(btn => {
            btn.addEventListener('click', () => {
                ui.removeProduct(btn);
                ui.displayMssg('You deleted a product...', 'danger')
            })
        });
    }
    
})

