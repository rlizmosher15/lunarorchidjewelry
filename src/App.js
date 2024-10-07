import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Checkout'
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51KbFo2FVAzDj8bVXSLOlv3p3kZTyYQlLdtEHmYuwEt3QlVjfJUe9xJR7NtcmzLD233ZOsv1S72F85GHqVJLisdqI00MHDHupno');

function App() {
  // React Context API
  const [{}, dispatch] = useStateValue();

  // only runs once, when the app component loads, bc of empty []
  useEffect(() => {
    // as soon as the app loads, attach this listener, which will always be listening
    auth.onAuthStateChanged(authUser => {
      console.log('The user is....', authUser);

      if(authUser) {
        // the user just logged in / was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/orders" element={<Orders />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/checkout" element={[<Checkout />]}/>
          <Route
            path="/payment"
            element=
            {
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/" element={[<Home />]}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
