const apiUrl = 'http://localhost:3000/api/products'; 

// Function to add a new product
async function addProduct() {
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const quantity = document.getElementById('product-quantity').value;

    const product = {
        name,
        description,
        price,
        quantity
    }
    try {
      const response = await axios.post(apiUrl, product);
      console.log('Product added successfully:', response.data);
      displayProducts(); // Update the displayed products after adding
    } catch (error) {
      console.error('Error adding product:', error);
    }
}

// Function to display products on the screen
async function displayProducts() {
  try {
    const response = await axios.get(apiUrl);
    const products = response.data.products;
    
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear existing list

    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `Name: ${product.name}, Description: ${product.description}, Price: $${product.price}, Quantity: ${product.quantity}`;
      inventoryList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}



// Function to sell a product
async function sellProduct() {
  const sellProductName = document.getElementById('sell-product-name').value;
  const sellQuantity = document.getElementById('sell-quantity').value;

  try {
    // Fetch the product data from the server to get its current quantity
    const response = await axios.get(apiUrl);
    const products = response.data.products;
    const product = products.find(product => product.name === sellProductName);

    if (!product) {
      console.error('Product not found');
      return;
    }

    // Update the quantity and send the updated data to the server
    product.quantity -= sellQuantity;

    const putResponse = await axios.put(`${apiUrl}/${product.id}`, product);
    console.log('Product sold successfully:', putResponse.data);
    displayProducts(); // Update the displayed products after selling
  } catch (error) {
    console.error('Error selling product:', error);
  }
}

// Event listener to display products when the page loads
window.addEventListener('DOMContentLoaded', displayProducts);






// const url = "https://crudcrud.com/api/6a9cc489f8af4c68a6a5f8a6350094e0/saveItem";

// async function addProduct(){
//     try{
//         const name = document.getElementById("product-name").value;
//         const price = document.getElementById("product-price").value;
//         const quantity = document.getElementById("product-quantity").value;
//         const description = document.getElementById("product-description").value;
//         // console.log(name, price, quantity);

//         const product = {
//             name,
//             description,
//             price,
//             quantity
//         }
//         console.log(product);

//         let postRes = await axios.post(url, product)
//         console.log(postRes);
//         displayInventory(postRes.data);
           
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// async function sellProduct(){

//     try{       
//         const sellProductName = document.getElementById("sell-product-name").value;
//         const sellQuantity = document.getElementById("sell-quantity").value;

//         // Fetch the product data from the server to get its current quantity
//         let res = await axios.get(url)
//         const products = res.data;
//         const productIndex = products.findIndex(product => product.name === sellProductName);
//         // console.log(products);
//         console.log(productIndex);

//         const product = products[productIndex];
//         product.quantity -= sellQuantity;

//         console.log(product);
//         console.log(product._id);
//         let productId = product._id;
//         delete product._id;

//         // Update the product on CRUD CRUD
//         let putRes = await axios.put(`${url}/${productId}`,product)
//         console.log(putRes);
        
//         let getRes = await axios.get(`${url}/${productId}`)
//         console.log(getRes);
//         displayInventory(getRes.data);

//     }
//     catch(err){
//         console.log(err);
//     }  

// }

// // read data from crudcrud when screen is refresh/reloaded
// window.addEventListener("DOMContentLoaded", () => {
//     axios.get("https://crudcrud.com/api/846a70e9ca014578961105127a153daf/saveItem")
//         .then((response)=>{
//             // console.log(response);    //response.data is an array of object
//             for(var i=0; i<response.data.length; i++){
//                 displayInventory(response.data[i]);
//             }
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })


// function displayInventory(data){

   
//     console.log(data.name);
//     // data = {
//     //     _id,
//     //     name,
//     //     price,
//     //     quantity
//     // }

//     const inventoryList = document.getElementById("inventory-list");
//     const existingListItem = inventoryList.querySelector(`[data-id="${data._id}"]`);

//     if (existingListItem) {
//         existingListItem.textContent = `Name: ${data.name}, Price: $${data.price}, Quantity: ${data.quantity}`;
//     } else {
//         const listItem = document.createElement("li");
//         listItem.textContent = `Name: ${data.name}, Price: $${data.price}, Quantity: ${data.quantity}`;
//         listItem.setAttribute("data-id", data._id);
//         inventoryList.appendChild(listItem);
//     }
 

//     // const inventoryList = document.getElementById("inventory-list");
//     // const listItem = document.createElement("li");
//     // listItem.textContent = `Name: ${data.name}, Price: $${data.price}, Quantity: ${data.quantity}`;
//     // inventoryList.appendChild(listItem);

//     // const inventoryList = document.getElementById("inventory-list");
//     // // inventoryList.innerHTML = "";
//     // childHTML = `<li id=${data._id}>Name: ${data.name}, Price: ${data.price}rs, Quantity: ${data.quantity} </li>`
//     // inventoryList.innerHTML = inventoryList.innerHTML + childHTML;  

// }