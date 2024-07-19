
class Product {
    constructor(name, category, price, description) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
    }
}

class ProductManager {
    constructor() {
        this.products = JSON.parse(localStorage.getItem("products")) || [];
        this.currentEditIndex = null;
    }

    addProduct(product) {
        if (this.currentEditIndex !== null) {
            this.products[this.currentEditIndex] = product;
            this.currentEditIndex = null;
        } else {
            this.products.push(product);
        }
        this.saveProducts();
    }

    deleteProduct(index) {
        this.products.splice(index, 1);
        this.saveProducts();
    }

    editProduct(index) {
        this.currentEditIndex = index;
        return this.products[index];
    }

    searchProducts(query) {
        return this.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    }

    saveProducts() {
        localStorage.setItem("products", JSON.stringify(this.products));
    }
}

class UI {
    constructor(productManager) {
        this.productManager = productManager;
        this.productContainer = document.getElementById("product-table-container");
        this.tableBody = document.getElementById("table-body");
        this.warningMsg = document.getElementById('warning-msg');
        this.productName = document.getElementById('product_name');
        this.productCategory = document.getElementById('product_category');
        this.productPrice = document.getElementById('product_price');
        this.productDesc = document.getElementById('product_desc');
        this.createBtn = document.getElementById("create-btn");
        this.clearBtn = document.getElementById("clear-btn");
        this.searchInput = document.getElementById("query");

        this.createBtn.onclick = this.createOrUpdateProduct.bind(this);
        this.clearBtn.onclick = this.clearForm.bind(this);
        this.searchInput.onkeyup = this.searchProducts.bind(this);

        this.renderProductTable();
    }

    createOrUpdateProduct(event) {
        event.preventDefault();

        if (!this.productName.value || !this.productCategory.value || !this.productPrice.value || !this.productDesc.value) {
            alert('All fields must be filled out.');
            return;
        }

        const product = new Product(
            this.productName.value,
            this.productCategory.value,
            this.productPrice.value,
            this.productDesc.value
        );

        this.productManager.addProduct(product);
        this.renderProductTable();
        this.clearForm();
    }

    renderProductTable() {
        if (this.productManager.products.length > 0) {
            this.productContainer.classList.remove('d-none');
            this.productContainer.classList.add('d-block');
            this.warningMsg.classList.add("d-none");
            this.warningMsg.classList.remove("d-block");

            this.tableBody.innerHTML = '';

            this.productManager.products.forEach((product, index) => {
                const row = document.createElement('tr');

                const cellIndex = document.createElement('th');
                cellIndex.textContent = index + 1;
                row.appendChild(cellIndex);

                const cellName = document.createElement('td');
                cellName.textContent = product.name;
                row.appendChild(cellName);

                const cellCategory = document.createElement('td');
                cellCategory.textContent = product.category;
                row.appendChild(cellCategory);

                const cellPrice = document.createElement('td');
                cellPrice.textContent = product.price;
                row.appendChild(cellPrice);

                const cellDesc = document.createElement('td');
                cellDesc.textContent = product.description;
                row.appendChild(cellDesc);

                const cellEdit = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.className = 'btn btn-outline-success';
                editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                editButton.onclick = () => {
                    const productToEdit = this.productManager.editProduct(index);
                    this.fillForm(productToEdit);
                    this.createBtn.textContent = 'Update Product';
                };
                cellEdit.appendChild(editButton);
                row.appendChild(cellEdit);

                const cellDelete = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-outline-danger';
                deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                deleteButton.onclick = () => {
                    this.productManager.deleteProduct(index);
                    this.renderProductTable();
                };
                cellDelete.appendChild(deleteButton);
                row.appendChild(cellDelete);

                this.tableBody.appendChild(row);
            });
        } else {
            this.warningMsg.classList.remove("d-none");
            this.warningMsg.classList.add("d-block");
            this.productContainer.classList.add("d-none");
            this.productContainer.classList.remove("d-block");
        }
    }

    fillForm(product) {
        this.productName.value = product.name;
        this.productCategory.value = product.category;
        this.productPrice.value = product.price;
        this.productDesc.value = product.description;
    }

    clearForm() {
        this.productName.value = '';
        this.productCategory.value = '';
        this.productPrice.value = '';
        this.productDesc.value = '';
        this.createBtn.textContent = 'Add Product';
    }

    searchProducts() {
        const query = this.searchInput.value.toLowerCase();
        const filteredProducts = this.productManager.searchProducts(query);
        this.tableBody.innerHTML = '';

        if (filteredProducts.length > 0) {
            filteredProducts.forEach((product, index) => {
                const row = document.createElement('tr');

                const cellIndex = document.createElement('th');
                cellIndex.textContent = index + 1;
                row.appendChild(cellIndex);

                const cellName = document.createElement('td');
                cellName.textContent = product.name;
                row.appendChild(cellName);

                const cellCategory = document.createElement('td');
                cellCategory.textContent = product.category;
                row.appendChild(cellCategory);

                const cellPrice = document.createElement('td');
                cellPrice.textContent = product.price;
                row.appendChild(cellPrice);

                const cellDesc = document.createElement('td');
                cellDesc.textContent = product.description;
                row.appendChild(cellDesc);

                const cellEdit = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.className = 'btn btn-outline-success';
                editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                editButton.onclick = () => {
                    const productToEdit = this.productManager.editProduct(index);
                    this.fillForm(productToEdit);
                    this.createBtn.textContent = 'Update Product';
                };
                cellEdit.appendChild(editButton);
                row.appendChild(cellEdit);

                const cellDelete = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-outline-danger';
                deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                deleteButton.onclick = () => {
                    this.productManager.deleteProduct(index);
                    this.renderProductTable();
                };
                cellDelete.appendChild(deleteButton);
                row.appendChild(cellDelete);

                this.tableBody.appendChild(row);
            });
        } else {
            alert("No Results");
            this.renderProductTable();
            this.searchInput.value = "";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const productManager = new ProductManager();
    new UI(productManager);
});
