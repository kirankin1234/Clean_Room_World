import React from 'react'

const Cart = () => {
  return (
    <div className='cart'>
    <h1>Your cart (items)</h1>
        <div className='cart_format'>
            <p>Item</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
        </div>
        <hr/>

    </div>
  )
}

export default Cart