import React, { useState, useEffect } from 'react'
import './Orders.css'
import { db } from './firebase'
import { useStateValue } from './StateProvider'
import Order from './Order'

function Orders() {
  const [orders, setOrders] = useState([]);

  // get info from Context API
  const [{ basket, user }, dispatch] = useStateValue();

  // after they place an order
  // retrieve from db
  useEffect(() => {
    if(user) {
      try {
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
      }
      catch {
        console.log("SOMETHING WENT WRONG")
      }

    } else {
      setOrders([])
    }
  }, [user])

  return (
    <div className="orders">
      <h1>Your orders</h1>

      <div className="orders__order">
        {orders?.map(order => (
          <Order order={order}/>
        ))}

      </div>
    </div>
  )
}

export default Orders
