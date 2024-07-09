var products=null;
var productContainer=document.getElementById("product-table-container");
var tableBody=document.getElementById("table-body");
var warningMsg = document.getElementById('warning-msg');

var currentEditIndex = null;

function emptyornot(){
    if(products && products.length!==0){
        console.log("products are available");
        productContainer.classList.remove('d-none');
        productContainer.classList.add('d-block');
        warningMsg.classList.add("d-none");
        warningMsg.classList.remove("d-block");

        var row_elements="";

        for (var i = 0; i < products.length; i++) {
            row_elements += `
                   <tr>
                  <th>${i + 1}</th>
                  <td>${products[i].name}</td>
                  <td>${products[i].cat}</td>
                  <td>${products[i].price}</td>
                  <td>
                  ${products[i].dec}
                  </td>
                  <td>
                    <button onclick="editProduct(${i})" class="btn btn-outline-success">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
                
              `;
          }
          tableBody.innerHTML = row_elements;

    }

    else{
        warningMsg.classList.remove("d-none");
        warningMsg.classList.add("d-block");
        productContainer.classList.add("d-none");
        productContainer.classList.remove("d-block");


    }
}

emptyornot();


var productName = document.getElementById('product_name');
var productCategory = document.getElementById('product_category');
var productPrice = document.getElementById('product_price');
var productDesc = document.getElementById('product_desc');
var createBtn = document.getElementById("create-btn");
var clearBtn = document.getElementById("clear-btn");
var deleteBtn=document.getElementById("delete-btn")
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
    emptyornot();
    clearForm();

}

function clearForm(){
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productDesc.value = '';
}

clearBtn.onclick = function(event) {
  event.preventDefault();
  if (productName.value== '' && !productCategory.value== '' && !productPrice.value== '' && !productDesc.value== '') {
    return 0;
  } 
  else
    clearForm();

}

function deleteProduct(index) {
  products.splice(index, 1);
  emptyornot();
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

var arr = [];
console.log(typeof arr);