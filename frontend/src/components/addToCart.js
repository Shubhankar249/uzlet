import {baseUrl} from "./baseUrl";

const AddToCart = (productId) => {
  fetch(baseUrl + 'cart/addProduct', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          productId: productId,
          customerId: localStorage.getItem('userId')
      })
  })
      .then(()=>console.log('Successful'))
      .catch((e)=> console.error(e));
};

export default AddToCart;
