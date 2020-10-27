"use strict";
var Product = /** @class */ (function () {
    function Product(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
    return Product;
}());
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.addProduct = function (newProduct) {
        var productList = document.querySelector('#product-list');
        var productContainer = document.createElement('div');
        productContainer.setAttribute('class', 'product-container');
        var productTemplate = "\n            <div class=\"product-body text-center\">\n                <strong>Name: " + newProduct.name + "</strong>\n                <strong>Price: " + newProduct.price + "</strong>\n                <strong>Year: " + newProduct.year + "</strong>\n                <button class=\"btn_custom btn_danger btn_delete\" name=\"delete\">Delete</button>\n            </div>\n        ";
        productContainer.innerHTML = productTemplate;
        productList.append(productContainer);
    };
    UI.prototype.removeProduct = function (btn) {
        var _a, _b;
        (_b = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
    };
    UI.prototype.resetForm = function (node) {
        node.reset();
    };
    UI.prototype.displayMssg = function (mssg, alertClass) {
        var alert = document.createElement('div');
        var alertContainer = document.querySelector('.alert-container');
        alert.setAttribute('class', "alert alert_" + alertClass);
        alert.innerHTML = mssg;
        alertContainer.append(alert);
        setTimeout(function () {
            alert.remove();
        }, 2000);
    };
    return UI;
}());
//DOM
var form = document.querySelector('#product-form');
var inptName = document.querySelector('#name');
var inptPrice = document.getElementById("price");
var inptYear = document.querySelector('#year');
var ui = new UI();
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!inptName.value || isNaN(inptPrice.valueAsNumber) || !Number(inptYear.value)) {
        ui.displayMssg('Please fill all the inputs', 'warning');
    }
    else {
        var newProduct = new Product(inptName.value, inptPrice.valueAsNumber, Number(inptYear.value));
        console.log(newProduct);
        ui.addProduct(newProduct);
        ui.resetForm(form);
        ui.displayMssg('Yo add a product successfully!!', 'success');
        var btnRemove = document.querySelectorAll('.btn_delete');
        console.log(btnRemove);
        btnRemove.forEach(function (btn) {
            btn.addEventListener('click', function () {
                ui.removeProduct(btn);
                ui.displayMssg('You deleted a product...', 'danger');
            });
        });
    }
});
