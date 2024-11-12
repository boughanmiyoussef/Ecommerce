import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart} from "../../../redux/features/cart/cartSlice";

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Handle increasing quantity
  const handleIncreaseQuantity = (productId) => {
    const product = products.find(product => product._id === productId);
    // Increase the quantity of the selected product by 1
    dispatch(addToCart({ ...product, quantity: product.quantity + 1 }));
  };


  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none '
      }`}
      style={{ transition: 'opacity 300ms' }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0 .94)',
        }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 ">
              <i className="ri-close-line bg-black p-1 text-white"></i>
            </button>
          </div>

          <div>
            {products.length === 0 ? (
              <div>Your Cart Is Empty</div>
            ) : (
              // Mapping through the cart products to display each item
              products.map((item) => (
                <div
                  key={item._id}
                  className="p-4 mb-4 border-b flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      {/* Product Details */}
                      <h5 className="text-lg font-medium">{item.name}</h5>
                      <p className="text-gray-600 text-sm">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item._id)}
                        className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-primary hover:text-white"
                      >
                        -
                      </button>
                      <span className="text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item._id)}
                        className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-primary hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveProduct(item._id)}
                      className="text-red-500 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
