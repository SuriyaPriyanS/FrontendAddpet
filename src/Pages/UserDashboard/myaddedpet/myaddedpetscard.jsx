import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyAddPetCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from API or local storage
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    // Example: Fetch cart items from an API endpoint
    axios.get('http://localhost:5000/api/cartItems')
      .then(response => {
        console.log('Fetched cart items:', response.data);
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
        // Handle error display or fallback
      });
  };

  const removeFromCart = (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove this item from cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/cartItems/${itemId}`)
          .then(response => {
            console.log('Item removed from cart:', response.data);
            fetchCartItems(); // Refresh cart items after deletion
          })
          .catch(error => {
            console.error('Error removing item from cart:', error);
            // Handle error display or fallback
          });
      }
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Pet Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item._id} className="border p-4 rounded-md shadow-md">
              <img src={item.image} alt={item.name} className="rounded-lg mb-3" />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600"
                >
                  Remove
                </button>
                <Link to={`/updateCartItem/${item._id}`} className="text-blue-500 underline">Update</Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default MyAddPetCart;
