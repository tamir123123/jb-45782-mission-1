function addProduct(event){
    event.preventDefault();
    const data = collectDataFromForm();
    saveProductToLocalStorage(data);
    clearForm();
    loadProductsFromStorage();
}

function saveProductToLocalStorage(product) {
    const productsJSON = localStorage.getItem("products") || "[]";
    const products = JSON.parse(productsJSON);
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}

loadProductsFromStorage();

function loadProductsFromStorage() {
    const productsJSON = localStorage.getItem("products") || "[]";
    const products = JSON.parse(productsJSON);
    let AllTr = "";
    let index = 0;
    for (const product of products) {
        const newTR = generateTR(product, index);
        AllTr += newTR;
        index++;
    }
    document.getElementById("productsList").innerHTML = AllTr;
}
function collectDataFromForm() {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productCategory = document.getElementById("productCategory").value;
    const productImage = document.getElementById("productImage").value;
    return {
        productName: productName,
        productPrice: productPrice,
        productCategory: productCategory,
        productImage: productImage,
    };
}
function generateTR(data, index) {
    const newTR = `
    <tr>
        <td>${data.productName}</td>
        <td>₪${parseFloat(data.productPrice).toFixed(2)}</td>
        <td><span id="${data.productCategory}">${data.productCategory}</span></td>
        <td> <img id="productPreview"  style="width: 100px; height: 100px;" src="${data.productImage}"></td>
        <td><button onclick="deleteProduct('${index}')">Delete</button></td>
    </tr>`
    return newTR;
}
function injectTRToDOM(newTR) {
    document.getElementById("productsList").innerHTML += newTR;
}
function clearForm() {
    document.getElementById("productsForm").reset();
}
function deleteProduct(index) {
    const productsJSON = localStorage.getItem("products");
    const products = JSON.parse(productsJSON) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProductsFromStorage();
}
