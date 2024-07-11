var products = JSON.parse(localStorage.getItem("products")); //null

var productContainer = document.getElementById("product-table-container");
var tableBody = document.getElementById("table-body");
var warningMsg = document.getElementById('warning-msg');

var currentEditIndex = null;

function emptyOrNot() {
    if (products && products.length !== 0) {
        console.log("products are available");
        productContainer.classList.remove('d-none');
        productContainer.classList.add('d-block');
        warningMsg.classList.add("d-none");
        warningMsg.classList.remove("d-block");

        // Clear the existing table body
        tableBody.innerHTML = '';

        // Create and append new rows
        products.forEach((product, index) => {
            var row = document.createElement('tr');

            var cellIndex = document.createElement('th');
            cellIndex.textContent = index + 1;
            row.appendChild(cellIndex);

            var cellName = document.createElement('td');
            cellName.textContent = product.name;
            row.appendChild(cellName);

            var cellCategory = document.createElement('td');
            cellCategory.textContent = product.cat;
            row.appendChild(cellCategory);

            var cellPrice = document.createElement('td');
            cellPrice.textContent = product.price;
            row.appendChild(cellPrice);

            var cellDesc = document.createElement('td');
            cellDesc.textContent = product.dec;
            row.appendChild(cellDesc);

            var cellEdit = document.createElement('td');
            var editButton = document.createElement('button');
            editButton.className = 'btn btn-outline-success';
            editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            editButton.onclick = function () { editProduct(index); };
            cellEdit.appendChild(editButton);
            row.appendChild(cellEdit);

            var cellDelete = document.createElement('td');
            var deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-outline-danger';
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteButton.onclick = function () { deleteProduct(index); };
            cellDelete.appendChild(deleteButton);
            row.appendChild(cellDelete);

            tableBody.appendChild(row);
        });

    } else {
        warningMsg.classList.remove("d-none");
        warningMsg.classList.add("d-block");
        productContainer.classList.add("d-none");
        productContainer.classList.remove("d-block");
    }
}

emptyOrNot();

var productName = document.getElementById('product_name');
var productCategory = document.getElementById('product_category');
var productPrice = document.getElementById('product_price');
var productDesc = document.getElementById('product_desc');
var createBtn = document.getElementById("create-btn");
var clearBtn = document.getElementById("clear-btn");
var deleteBtn = document.getElementById("delete-btn");
var productForm = document.getElementById("product-form");

createBtn.onclick = function (event) {
    event.preventDefault();

    if (!productName.value || !productCategory.value || !productPrice.value || !productDesc.value) {
        alert('All fields must be filled out.');
        return;
    }
    if (!products) {
        products = [];
    }

    var product = {
        name: productName.value,
        cat: productCategory.value,
        price: productPrice.value,
        dec: productDesc.value,
    };

    if (currentEditIndex !== null) {
        products[currentEditIndex] = product;
        currentEditIndex = null;
        createBtn.textContent = 'Add Product';
    } else {
        products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    emptyOrNot();
    clearForm();
}

function clearForm() {
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productDesc.value = '';
}

clearBtn.onclick = function (event) {
    event.preventDefault();
    if (productName.value == '' && productCategory.value == '' && productPrice.value == '' && productDesc.value == '') {
        return;
    } else {
        clearForm();
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    emptyOrNot();
}

function editProduct(index) {
    var product = products[index];
    productName.value = product.name;
    productCategory.value = product.cat;
    productPrice.value = product.price;
    productDesc.value = product.dec;
    currentEditIndex = index;
    createBtn.textContent = 'Update Product';
}

var searchInput = document.getElementById("query");
// Listen to changes in search input
searchInput.onkeyup = function () {
    var value = searchInput.value.toLowerCase();
    var filteredProducts = products.filter(product => product.name.toLowerCase().includes(value));

    // Clear the existing table body
    tableBody.innerHTML = '';

    // Create and append new rows
    filteredProducts.forEach((product, index) => {
        var row = document.createElement('tr');

        var cellIndex = document.createElement('th');
        cellIndex.textContent = index + 1;
        row.appendChild(cellIndex);

        var cellName = document.createElement('td');
        cellName.textContent = product.name;
        row.appendChild(cellName);

        var cellCategory = document.createElement('td');
        cellCategory.textContent = product.cat;
        row.appendChild(cellCategory);

        var cellPrice = document.createElement('td');
        cellPrice.textContent = product.price;
        row.appendChild(cellPrice);

        var cellDesc = document.createElement('td');
        cellDesc.textContent = product.dec;
        row.appendChild(cellDesc);

        var cellEdit = document.createElement('td');
        var editButton = document.createElement('button');
        editButton.className = 'btn btn-outline-success';
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editButton.onclick = function () { editProduct(index); };
        cellEdit.appendChild(editButton);
        row.appendChild(cellEdit);

        var cellDelete = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-danger';
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.onclick = function () { deleteProduct(index); };
        cellDelete.appendChild(deleteButton);
        row.appendChild(cellDelete);

        tableBody.appendChild(row);
    });

    if (filteredProducts.length === 0) {
        alert("No Results");
        emptyOrNot();
        searchInput.value = "";
    }
};
