import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./Reducer";
import axios from './axios';
import { db } from './firebase';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        // We're using dollars, so pass in the total in cents, thus * 100
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    }

    getClientSecret();

  }, [basket])

  console.log('THE SECRET IS ....', clientSecret);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff here

    // prevent it from refreshing
    event.preventDefault();

    // this sets the button to disabled, so they don't accidentally click Buy 5 times
    setProcessing(true);

    // use client secret and confirm card payment
    // client secret tells stripe how much we're charging
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      // Destructure response to get paymentIntent,
      // which is the Stripe term for payment confirmation

      // Push into NoSQL db
      db
        .collection('users')    // Target users collection
        .doc(user?.uid)         // Target specific user
        .collection('orders')   // Target user's orders collection
        .doc(paymentIntent.id)  // Use paymentIntent.id as order id
        .set({ // Set data
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created // timestamp
        })

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: 'EMPTY_BASKET'
      })

      navigate('/orders');
    }).catch(console.log("error...."))

  }

  const handleChange = event => {
    // Listen for changes in CardElement
    // display any errors as the customer types their card details

    // if event is empty, disable button
    setDisabled(event.empty);

    // show any errors
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items </Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>

          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Road</p>
            <p>Chicago, IL</p>
            <p></p>
          </div>
        </div>

        {/* Payment section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {/* All products */}
            { basket?.map(item => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))
            }
          </div>
        </div>

        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
            <div className="payment__details">
              {/* STRIPE MAGICCCC*/}

              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>

                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => (
                      <h3>Order Total: {value}</h3>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />

                  <button
                    disabled={processing || disabled || succeeded}
                  >
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>

                {/* Errors */}
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Payment
