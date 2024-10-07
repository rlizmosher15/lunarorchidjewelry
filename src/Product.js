import React from 'react'
import './Product.css'
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  // Destructure basket out of state
  const [{ basket }, dispatch] = useStateValue();

  // console.log('basketttt', basket);

  const addToBasket = () => {
    // Dispatch the item into the data layer
    // Shoot it into the data layer!!! Zoom
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>

        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product__rating">
          {rating}

        </div>
      </div>


      <img
        src={image}
        alt="Product Image"
      />


      <button
        onClick={addToBasket}>Add to Basket</button>

    </div>
  )
}

export default Product
