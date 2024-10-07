# Amazon Clone
Tutorial by Qazi and Sonny Sangha from Clever Programmer
https://www.youtube.com/watch?v=RDV3Z1KCBvo&list=PLKtYlTJOyYZNdhJ708REZiNOeeXOWh8dm&index=6&t=70s&ab_channel=CleverProgrammer

`npm start`
Remember to remove/add secret key in `functions/index.js`

This is the set up needed to get the backend Express app running on a cloud function

Run this on our local machine by emulating it.
In `functions/`, `firebase emulators:start`
This spins up an Express Server and pops up a window -- we got to http://localhost:4000/functions
`./emulator.png`

This shows us our backend logs. Keep the backend running - don't close terminal.

also uses moment

## Getting Set Up
In a new dir, run `npx create-react-app amazon-clone`
This sets up a starter template

Head on over to firebase.com — this allows us to have a database & to host it online & to use the cloud functions which connect to Stripe to process payments.

Add a new firebase project named amazon-clone, say no to Google Analytics, click the Web </> icon, type amazon-clone, click "Also set up Firebase Hosting", click register app, skip Add Firebase SDK (just click next), then do `sudo npm install -g firebase-tools`, click next, click "continue to console"

Now in firebase, click the burger menu, click the project settings gear icon, click "project settings", scroll down to "SDK setup and configuration", Click "config", copy the contents, make `src/firebase.js` , paste that in there, save

`cd amazon-clone` and then `npm start`

## The Home Page
Go to all test files and logo and delete them (`App.test.js`, `setupTests.js`, `logo.svg`)

Go to `App.js` and delete everything inside of the `div` with className of App. Also delete the logo import. Change `className="app"` with the lowercase to follow BEM convention.

Go into `App.css` and delete everything in it

Go into `index.css` and add

    * {
      margin: 0;
    }

---------

### Create the Header Component

Add in  `{/* Component Comments */}` in `App.js`

      {/* Header */}
      {/* Home */}

Create the Header component — Create `src/Header.js`
They use ES7 Snippets for VSCode, but I'm using Atom

Add in component template into `Header.js`

    import React from 'react'

    function Header() {
      return (
        <div>

        </div>
      )
    }

    export default Header

(this comes automatically in VSCode with ES7 Snippets by typing `_rfce`) (They also use the Prettier extension)

Give the `div` a className of 'header'
Create `src/Header.css` and import it to the Header component with `import './Header.css`

---------

Inside `<div className='header'></div>`,
1. Add the Amazon logo image

2. Add a `div` with `className="header__search"` and in that add an `input` with `className="header__searchInput` and `type="text"`

3. Add a `div` with `className="header__nav"` and in that create 4 more `div`s

--------

Let's add this component!!
Go to `App.js` add `import Header from './Header';`
Add in `<Header />`

--------

Now let's style!!
Go to `Header.css` and add in preferences
We're going to be using **Material-UI** for all the icons
Go to material-ui.com
Run `npm install @mui/material @emotion/react @emotion/styled` and `npm install @mui/icons-material`

Go to `Header.js` to add `import SearchIcon from "@mui/icons-material/Search";` and `<SearchIcon className="header__searchIcon" />`

--------

### Create the Home Component
The body
Create `src/Home.js`

Add in component template into `Home.js`

    import React from 'react'

    function Home() {
      return (
        <div>

        </div>
      )
    }

    export default Home

Give the `div` a className of 'home'
Create `src/Home.css` and import it to the Header component with `import './Home.css`

In `App.js`, `import Home from './Home'` and then `<Home />`

-----------

Second div is home__container, which will have the banner that fades into the background

- Add in an image
- Add css (z-index css means that this piece is behind everything else)

Now we have different rows with different amounts of Products (Product components)

-----------

### Create the Product Component
To be added in `Home.js`
Create `src/Product.js`

Add in component template into `Product.js`

    import React from 'react'

    function Product() {
      return (
        <div>

        </div>
      )
    }

    export default Product

Give the `div` a className of 'product'
Create `src/Product.css` and import it to the Header component with `import './Product.css`

In `Home.js`, `import Product from './Product'` and then `<Product />`

-----------

Product consists of
1. Product Info (container) consists of product name, price, and rating
2. Product Image
3. Button to add to basket


-----------

Let's style this !!
`Product.css`

To target the image within the product container,

    .product > img {
      ...
    }

-----------

Go to `Home.css` and add `.home{}` and `.home__row{}` styles

-----------

Now let's render all our Products in `Home.js`!
It just figures out width spacing :-)

-----------

In `index.css` in `body {}` add `background-color: rgb(234, 237, 237);`

-----------

How do we pass in different info/values to all of these components? They should all be different
**We're going to use props**
Go to `Product.js` and accept props and destructure it by adding `{ title, image, price, rating }` in `Product()` params

Go back to `Home.js`

Change `<Product />` to

    <Product
      title="Book Tittle"
      price={19.99}
      image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
      rating={5}
    />

In `Product.js`,
use `{title}` instead of hard-coding it
repeat for price, image, and rating

`display: flex` drops it into a row

Okay, let's fill in this content

## The Checkout Page
In order to have 2 pages in our website, we're going to use **React Router**
`npm install react-router-dom`

Now in `App.js` we need to `import { BrowserRouter as Router, Switch, Route } from "react-router-dom";`

And then wrap our app div inside the Router

    <Router>
          <div className="app">
            <Header />
            <Home />
          </div>
    </Router>

Now let's render different pages based on the current route
'/' is the default/home route.

**The default route should be at the bottom**

--------------
To be added in `app.js`
Create `src/Checkout.js`

Add in component template into `Checkout.js`

    import React from 'react'

    function Checkout() {
      return (
        <div>

        </div>
      )
    }

    export default Checkout

Give the `div` a className of 'checkout'
Create `src/Checkout.css` and import it to the Header component with `import './Checkout.css`

In `App.js`, `import Checkout from './Checkout'` and then add `<Checkout />`

-----------

Header should be out of Routes so it's always rendered, not dependent on routes

There's 2 main sections of the checkout page - left and right

The left — add the Ad Banner, Checkout title

-----------

Make img clickable to route with React Router like this
`Header.js`
`import { Link } from "react-router-dom";`

    <Link to="/">
      <img
        className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
      />
    </Link>

The above edits the Amazon logo

Do the same for the basket button

    <Link to="/checkout">
      <div className="header__optionBasket">
        <ShoppingBasketIcon />
        <span className="header__optionLineTwo header__basketCount">
        0
        </span>
      </div>
    </Link>

There's no refresh with React Router!

---------

### Create a Subtotal component
To be added in `Subtotal.js`
Create `src/Subtotal.js`

Add in component template into `Subtotal.js`

    import React from 'react'

    function Subtotal() {
      return (
        <div>

        </div>
      )
    }

    export default Subtotal

Give the `div` a className of 'product'
Create `src/Subtotal.css` and import it to the Header component with `import './Subtotal.css`

In `Checkout.js`, `import Subtotal from './Subtotal'` and then `<Subtotal />`

-----------

`npm install react-currency-format`

(React Context API & Redux)

In `Subtotal.js`, `import CurrencyFormat from "react-currency-format"` Add in the given `CurrencyFormat />`
`decimalScale={2}` means go to 2 decimal places. `value` is the total amount. `thousandSeparator` adds comma when counting into the thousands

Go to `Checkout.js`, `import Subtotal from "./Subtotal"`

`value` is a passed in prop

Okay, now that it works let's make it look pretty in `Subtotal.css`

Include the "is this a gift" checkbox and "proceed to checkout" button

## React Context API
This allows us to add and remove items from our basket
We need a data layer

### Pre-reqs
Add `src/StateProvider.js` and add in data layer logic
Go to `index.js` and wrap our `<App />` in our `<StateProvider initialState={initialState} reducer={reducer}> <App /> </StateProvider>`

(insert whiteboard pics here)

Edit `Header.js` to use `useStateValue()`
Add in `basket?.length` to show basket item count in upper right

## Checkout Page

### Calculate subtotal price
`Subtotal.js`
`import { useStateValue } from "./StateProvider";`
`const [{ basket }, dispatch] = useStateValue();`

      <p>
        Subtotal ({basket.length}):
        <strong>{value}</strong>
      </p>

value is passed in as a "render prop"

Go to `Reducer.js`
We're going to build a Selector

    // Selector
    // .reduce() maps through the basket
    // Here we use reduce to add each item price to the total amount, with the total starting at 0
    export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

Go back to `Subtotal.js`
`import { getBasketTotal } from "./Reducer";`
`value={getBasketTotal(basket)}`


### Show items in basket
Go to `Checkout.js`
Build `CheckoutProduct` Component
Make `CheckoutProduct.js`

    import React from 'react'
    import './CheckoutProduct.css'

    function CheckoutProduct() {
      return (
        <div className="checkoutProduct">

        </div>
      )
    }

    default export CheckoutProduct

Create `CheckoutProduct.css`

Inside `CheckoutProduct.js`, Add component logic
Destructure props passed through to access id, image, title, price, rating

In, `Checkout.js`, add

    {basket.map(item => (

            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}


Now let's style in `CheckoutProduct.css`
`display: flex` changes vertical rating stars to be horizontal

```
.checkoutProduct__image {
  object-fit: contain;
  width: 180px;
  height: 180px;
}
```
To make the image a reasonable size

### Now we hook up the remove from basket button
In `CheckoutProduct.js`, `<button onClick={removeFromBasket}>Remove from Basket</button>`

Pull/change/manipulate the basket with dispatching an action into the reducer/store

```
import { useStateValue } from './StateProvider';

const [{ basket }, dispatch] = useStateValue();
```

and

```
const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    })
  }
```

Then, go into `Reducer.js` and in the switch statement add the following case
```
    case "REMOVE_FROM_BASKET":
      // findIndex returns the first element with the given id
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

      // make a copy of the basket
      let newBasket = [...state.basket];

      // if index >= 0, it found an item
      if(index >= 0) {
        // chop off that item!
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.id}) because it's not in the basket`)
      }

      return {
        ...state,
        basket: newBasket
      }
```
making sure to not remove every item with the same id, only one item at a time. find the index. findIndex finds the first one and returns it

## Full Log-In with Firebase auth

### We need a log-in page (front-end)
Go to `App.js`
Create `<Route path="/login" element={}/>`

Go to `Header.js`
Go to `<span className="header__optionLineTwo">Sign In</span>`
Surround it with a link
```
        <Link to='/login'>
          <div className="header__option">
            <span className="header__optionLineOne">Hello Guest</span>
            <span className="header__optionLineTwo">Sign In</span>
          </div>
        </Link>
```

Build `Login` Component `<Login />`
```
import React from 'react';

function Login() {
  return (
    <div className="login">
    </div>
  )
}

export default Login


```
Create `Login.css`
In `App.js`, `import Login from './Login'`

Add image
`object-fit: contain;` keeps the object ratio when resizing
Add styles

Go back to `Login.js`
**We're going to use state to track what's in the input fields**

```
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
```

Go to
```
          <h5>Email</h5>
          <input type='text'></input>
```
and change it to `<input type='text' value={email}></input>` to map the value email to the email state. this connects the 2 things. Every time the user types something in, it triggers an onChange, which gives us an event.
```
          <input type='text' value={email} onChange={event => setEmail(e.target.value)}></input>

```
Now as the user types in, we're setting the email
Don't use null --- use ''
Do the same for password

Now state and values are tied!!!!!!

Now we want to trigger functions when those buttons are clicked. Add onClick for Sign In button.
```
  <button
            className="login__signinButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
```
Create signIn func.
We don't want it to refresh!! therefore, `event.preventDefault()`
We don't like refreshing in react

now do the other button

### Firebase Reminder
Go to the firebase project, project settings, scroll down to config, put it in firebase.js

# User Auth
Go to Firebase
On the left, go to the Authentication tab
Go to Sign-In Method
Go to Email/Password
Click the 1st enable
Click save

`npm install firebase`
`sudo npm install -g firebase-tools`

Go to `firebase.js`
```
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
```
Initialize our app and set up everything
`const firebaseApp = firebase.initializeApp(firebaseConfig);`

Firestore is the real-time database from Firebase
Initialize the db with `const db = firebaseApp.firestore();`

Initialize auth `const auth = firebase.auth();`

`export { db, auth };`

----

Let's go back to `Login.js`
`import { auth } from './firebase';`

We're registering first
```
  const register = (event) => {
    event.preventDefault();

    // some fancy firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authObj) => {
        // successfully created a new user
        console.log(authObj);
      })
      .catch((error) => alert(error.message))
  }

```

Now let's try adding an account
`test123@gmail.com`
`testpass`

IT WORKEDDDD

To redirect them to the home page, we're going to pull in useHistory from ReactRouter in `Login.js`
`import { Link, useHistory } from "react-router-dom";`

`const history = useHistory();`
this allows us to programmatically change the url

After registering,
```
if(auth) {
          history.push('/')
        }
```
this forces a redirect

Now let's try adding another account
`test1234@gmail.com`
`testpass`

It redirects us!

----

Now let's implement logging in
Go to the `signIn` func in `Login.js`

```
  const signIn = (event) => {
    event.preventDefault();

    // some fancy firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        navigate('/')
      })
      .catch(error => alert(error.message))
  }

```

Let's try
`test123@gmail.com`
`testpass` sign in

IT WORKSSSSSSS

---
Now how do we keep track of who's signed-in..?
We're going back to `App.js`

We're creating a listener to keep track

In `App.js`,
`import { auth } from './firebase';`
`import React, { useEffect } from 'react';`

```

```

When we do this auth with Firebase, even if we refresh the page, it will log us back in if we were already logged in

We're going to store the user inside of the React Context API (our store)

Go to `Reducer.js`,
```
export const initialState = {
  basket: [],
  user: null,
};
```
Add user

Back to `App.js`
```
import { useStateValue } from './StateProvider';

  // React Context API
  const [{}, dispatch] = useStateValue();
```

This fires off an event and shoots it into the data layer.
Every log-in, it shoots the info to the data layer.
Log outs remove the user from the data layer

```
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
```

Our data layer is connected with firebase

Since we dispatched the 	`SET_USER` action...
In `Reducer.js`, add in the case that listens for this

```
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }
```
Twitch and InstaCart use Firebase

#### Now we need log-out functionality
Go to `Header.js`
`import { auth } from './firebase';`

`const [{ basket, user }, dispatch] = useStateValue();`

```
  const handleAuthentication = () => {
    if(user) {
      // this line is all we need to sign out with firebase
      auth.signOut();
    }
  }
```
and
```
        <Link to={!user && '/login'}>
          <div
            className="header__option"
            onClick={handleAuthentication}
          >
            <span className="header__optionLineOne">Hello Guest</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
```

Wo-hoo!

## Get Username on Checkout Page
### Now let's pull user from state
Go to `Checkout.js`
Login & go to basket
`const [{ basket, user }, dispatch] = useStateValue();`

`<h3>Hello, {user?.email}</h3>`

## Deployment
make sure you've done `sudo npm install -g firebase-tools`

`firebase login`
`firebase init`, click Hosting (Configure), click Use an existing project, click amazon-clone
What do you want to use as your public directory?  (public) `build`

?  Configure as a single-page app (rewrite all urls to /index.html)?  Yes (TYPE y)

Now we've prepped Firebase stuff!!!!

`npm run build`
This gets rid of unoptimized stuff like hot reloading or dev things

**When we make changes to the app, we need to run `npm run build` again**

(Now there's a build folder)

`firebase deploy`

It gives us our hosting URL!!!
https://clone-554ae.web.app


## React Flip Move Animation
Recommend



### Notes
We'll be deploying an Express API on a Firebase cloud function as a complete back-end solution

Serverless architecture

MERN Stack

Blaze Plan on Firebase

Firestore is a real-time database

## Add item to DB, Pull it into our app from the DB, & Render it
hmm

## Username/Email in Header
`npm start`
`<span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>`


## Payment Page
Inside of `Subtotal.js`

`import { useNavigate } from 'react-router-dom';`
`const navigate = useNavigate();`

This gives us the browser history. That gives us the power to redirect
`<button onClick={event => {navigate('/payment')}}>Proceed to checkout</button>`

Go to `App.js` and add
`<Route path="/payment" element={<h1>payyymeeee</h1>}/>`

---

Create **Payment** Component

Create `Payment.js`
```
import React from 'react';

function Payment() {
  return (
    <div className="payment">
    </div>
  )
}

export default Payment
```
Create Payment.css and `import './Payment.css';`
In `App.js`, `import Payment from './Payment';` `<Payment />`

Get user info from data layer with the following
`import { useStateValue } from './StateProvider';`
`const [{ basket, user }, dispatch] = useStateValue();`
`<p>{user?.email}</p>`

SHOW BASKET ITEMS
```
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
```

This also comes with remove from basket functionality. All 'remove from basket' buttons work still

You can even doing recurring subscription payments

`display: flex`
go into a row

wohoo

remember dev is `npm start`

# Payment Processing with Stripe

Installing dependencies
`npm install @stripe/stripe-js`
`npm install @stripe/react-stripe-js`

Create a Stripe account
https://stripe.com/
Sign In, Sign Up, Create Account
Developers, API Keys, copy Publishable Key

Go to `App.js`
```
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
```

Above the function, `const promise = loadStripe();`
Now inside those parens paste that key

This is a **public key** -- it doesn't matter about hiding -- no need to use .gitignore -- IT'S PUBLIC

Change the `payments` route
```
<Route
            path="/payment"
            element=
            {
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
```

In `Payment.js`, we're going to use 2 very powerful hooks
`import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";`

```
  const stripe = useStripe();
  const elements = useElements();
```

Go to payment section and create a form. Add in a CardElement.

Create handleSubmit function & handleChange function

Add new state
```
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
```

here's where we're at

```
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
                </div>
```

Now we add
```
                  <button
                    disabled={processing || disabled || succeeded}
                  >
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
```

That means we need 2 new pieces of state
```

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
```

Okay now let's finally address `handleSubmit`
it's async
```
    // prevent it from refreshing
    event.preventDefault();

    // this sets the button to disabled, so they don't accidentally click Buy 5 times
    setProcessing(true);

```

Now we need a **Client Secret**
In any payment processor/platform, "tell Stripe that I have a payment I want to send to you of like $50. Please give me a client secret that I can use to run by my card." - Sonny

Client Secret is NEEDED

Make a piece of state for it `const [clientSecret, setClientSecret] = useState(true);`

We're going to use a `useEffect`
This will run when the Payment component loads and when dependencies changes. In this case, basket. This will generate the special stripe secret which allows us to charge a customer. Whenever the basket changes, we need to get a new secret.

Call an async function inside of a useEffect by making the async function and then calling it afterwards

```
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios
    }

    getClientSecret();

  }, [basket])
```
Now we need axios. Axios is a way of making requests (GET, POST, etc).

Create `axios.js`
`npm install axios`
In `axios.js`,
```
import axios from "axios";

const instance = axios.create({
  // Put in URL of API (cloud function)
  baseURL: '...'
});

export default instance;

```

Go back to `Payment.js`
```
useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',

        // Stripe expects the total in a currencies subunits
        // We're using dollars, so pass in the total in cents, thus * 100        

        url: `/payments/create?total=${getBasketTotal(basket)}`
      })
    }

    getClientSecret();
```

?total for query param

        // Stripe expects the total in a currencies subunits
        // We're using dollars, so pass in the total in cents, thus * 100


Alright now we have
```
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
```
Meaning, whenever the basket changes, it will make the request & update the special stripe secret, which allows us to charge the customer the correct amount. THIS IS VERY IMPORTANT.

Go to `handleSubmit`

How Stripe knows how much to charge customer is from the client secret!!!!!

https://www.youtube.com/watch?v=RDV3Z 1KCBvo&list=PLKtYlTJOyYZNdhJ708REZiNOeeXOWh8dm&index=7&t=70s&ab_channel=CleverProgrammer

in payload, the .then(), what comes back is the payment intent (which is what stripe calls it). Destructure the response to get the paymentIntent. It's kind of like payment confirmation

### Now let's build the backend!!!!
#### Cloud functions

`firebase init`
Click functions, choose JS, y (use ESLint), y (Install dependencies now)

Everything inside of `src/` is the frontend
Now we have the `functions/` folder, which is a full-backend (cloud functions)

`cd functions` Functions has it's own node_modules, package-json, index.js. It's basically another project

Now, **when we do npm install, make sure we're in the functions folder** Otherwise it'll install into the frontend and not the backend

Open `functions/index.js`

We're going to build an Express App and host it on a cloud function

Make sure we're in the functions dir
`npm install express`

We're in node, so use this syntax in `functions/index.js`
`const express = require("express");`

In `functions/`,
`npm install cors`
`npm install stripe`

Go get the **secret key** from Stripe Dashboard

Set up Express App -- we're setting up an API right now

To set up an API, we need
1. App config
		a. Set up Express server with `const app = express();`
2. Middlewares
        a. `app.use(cors({ origin: true }));` cors is a kind of security
        b. `app.use(express.json());` allows us to send data and pass it with the json format
3. API Routes
        a.  Set up a dummy route to check it's working. It gives us a request and a response.
        `app.get('/', (request, response) => response.status(200).send('hello world'));`
4. Listen Command
       a. Get it up and running
       `exports.api = functions.https.onRequest(app);`
       functions references cloud functions

This is the set up needed to get the backend Express app running on a cloud function

Run this on our local machine by emulating it.
In `functions/`, `firebase emulators:start`
This spins up an Express Server and pops up a window -- we got to http://localhost:4000/functions
`./emulator.png`

This shows us our backend logs. Keep the backend running - don't close terminal.

It also says `✔  functions[us-central1-api]:  http function initialized (http://localhost:5001/clone-554ae/us-central1/api).` which is an **API endpoint**

`http://localhost:5001/clone-554ae/us-central1/api` is an example endpoint

After we emulate it & know it works, then we can deploy it.

If we want to call this endpoint

`'/'` is our default endpoint, so going to the given url `(http://localhost:5001/clone-554ae/us-central1/api)` should return "hello world" -- IT DOES!!!!

Let's make another route
`app.get('/kaitlin', (request, response) => response.status(200).send('what\'s up, Kaitlin?'));`
Now go to the url (http://localhost:5001/clone-554ae/us-central1/api) and add `/kaitlin` to the end -- it show's what's up, Kaitlin? !!!!! SO COOL

`http://localhost:5001/clone-554ae/us-central1/api` is the local API endpoint

Now we want to create an endpoint with a post request
(Remember referencing payments/create in `src/Payments.js`? We passed in a total as a query param)

```
app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  console.log('Payment Request Received BOOOOM -- total is... ', total);
})
```

Okay now this is where Stripe comes in
Add this in that post req
```
const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
```

HTTP Response 201 is Okay, Created Something
With the response also send client secret

Remember, frontend and backend run on different ports

----

Now go to `src/axios.js`
Change `baseURL` to our local API Endpoint
`baseURL: 'http://localhost:5001/clone-554ae/us-central1/api'`

It's `/api` because of in `functions/index.js`, we have `exports.api`, so it gets that name

Go to `src/Payment.js`
Remember `url: /payments/create?total=${getBasketTotal(basket) * 100}` That's where we make our nice request. After the `getClientSecret` function, `console.log('THE SECRET IS ....', clientSecret);`

Open up local frontend & it's console.
Add some products, go to Payment page. The client secret prints! Also our backend terminal prints "Payment Request Received BOOOOM -- total is...  3475` (in subunits). Heck yeah. This key powers the transaction. Our frontend and backend are communicating!

Go to `src/Payment.js`

Use 42424242 for test Stripe nums
Enter in the card info and click Buy now
It should redirect us to `/orders`

We need to build that page

Go to Stripe
Omg the transactions are there and the numbers match

In Stripe, go to Payments


To change it from a fake payment to a real payment,
switch from using the test keys to the real keys inside of the API section

All done!!

## The Orders History Page (Realtime DB)

An an order is placed, empty the basket
In `src/Payment.js`,
```
dispatch({
  type: 'EMPTY_BASKET'
})
```

Now go into `Reducer.js` (where we listen to the events) and add
```
case "EMPTY_BASKET":
  return {
     ...state,
     basket: []
  }
```
------

Redirect them to `/orders`
Build orders component
Go to `App.js`
Create a route for orders `<Route path="/orders" element={<Orders />}/>`
`import Orders from './Orders';`

Create `Orders.js`
```
import React from 'react'
import './Orders.css'

function Orders() {
  return (
    <div className="orders">
    </div>
  )
}

export default Orders
```
and create `Orders.css`

-----

**Now we need to push order into database**
Go to Firebase, go to Firestore tab, click "create firestore db", click "test mode", choose any location

Go to `Payment.js`
`import { db } from './firebase';`
After we complete the payment (in the .then)
```
// Push into NoSQL db
db
  .collection('users')   // Target users collection
  .doc(user?.id)         // Target specific user
  .collection('orders')  // Target user's orders collection
  .doc(paymentIntent.id) // Use paymentIntent.id as order id

  // Set data
  .set({
    basket: basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created // timestamp
  })
```

OMG IT WORKED
(after restarting backend)


**Now Firestore records all users who place orders and their orders with each item**

----

Okay now the info is in the db, but we need to display it on the screen

Create state to store the orders
Go to `Orders.js`

```
  const [orders, setOrders] = useState([]);

  // get info from Context API
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .orderBy('created', 'desc') // order by times in decending order
      .onSnapshot(snapshot => (
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      )) // snapshot of the db right now -- realtime response
  }, []);

```

Now let's create the UI, involving a new Order element
We're going to install Moment for timestamps
`npm install moment`

Reuse CheckoutProduct component in Order.js

Although, now it shouldn't have the remove from basket button, so inside of `CheckoutProduct` add prop hideButton to be passed in and
```
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
```
And pass in hideButton in `Orders.js`

#### Now connect orders page to returns and orders on header
Wrap it in a link in `Header.js`
```
        <Link to='/orders'>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">Orders</span>
          </div>
        </Link>
```

#### Style Payments
`Payment.css`

#### Deploy
Go to the server terminal (amazon-clone/functions) `firebase deploy --only functions` to deploy the backend

Yeah... that failed ....
Go to firebase and upgrade plan to Blaze
Go to firebase, on the bottom of the hamburger menu it says Spark and Upgrade, click Upgrade, upgrade to Blaze, even though it's free, now it should say Blaze

# IMPORTANT PAGES
http://localhost:3000/
https://clone-554ae.web.app/
https://console.firebase.google.com
https://dashboard.stripe.com/test/payments
http://localhost:4000
http://localhost:5001/clone-554ae/us-central1/api/
