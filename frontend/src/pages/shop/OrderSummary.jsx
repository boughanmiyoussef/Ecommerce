import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
    const products = useSelector((store) => store.cart.products);
    const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector((store) => store.cart);

    // Calculate subtotal dynamically (in case it's not available directly from the store)
    const subtotal = products.reduce((total, product) => total + product.price, 0);

    return (
        <div className='bg-white shadow-md rounded-lg p-6 mt-5'>
            <h2 className='text-2xl font-bold text-gray-800'>Order Summary</h2>
            {/* Check if there are products in the cart */}
            {products.length > 0 ? (
                <div className='mt-6'>
                    {/* List Products */}
                    <ul className='space-y-4'>
                        {products.map((product, index) => (
                            <li key={index} className='flex justify-between items-center'>
                                <div className='flex flex-col'>
                                    <span className='text-lg font-semibold text-gray-700'>{product.name}</span>
                                    <span className='text-sm text-gray-500'>Qty: {product.quantity}</span>

                                </div>
                                <span className='text-lg font-semibold text-gray-800'>${totalPrice.toFixed(2)}</span>
                                </li>
                        ))}
                    </ul>

                    {/* Order Summary Details */}
                    <div className='mt-6 border-t border-gray-300 pt-4'>
                        {/* Subtotal */}
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-600'>Subtotal</span>
                            <span className='text-lg font-semibold text-gray-800'>${totalPrice.toFixed(2)}</span>
                        </div>

                        {/* Tax */}
                        {taxRate > 0 && (
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-600'>Tax ({taxRate * 100}%)</span>
                                <span className='text-lg font-semibold text-gray-800'>${tax.toFixed(2)}</span>
                            </div>
                        )}

                        {/* Total Price */}
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-600'>Total Price</span>
                            <span className='text-lg font-semibold text-gray-800'>${totalPrice.toFixed(2)}</span>
                        </div>

                        {/* Grand Total */}
                        <div className='flex justify-between items-center mt-4'>
                            <span className='text-xl font-bold text-gray-900'>Grand Total</span>
                            <span className='text-xl font-bold text-green-600'>${grandTotal.toFixed(2)}</span>
                        </div>

                        {/* Selected Items */}
                        <div className='mt-4 text-sm text-gray-600'>
                            <span>Selected Items: </span>
                            <span className='font-semibold'>{selectedItems}</span>
                        </div>
                        <div className='px-4 mb-6'>
                            <button>Clear Cart</button>
                            <button>Checkout</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className='text-gray-600 mt-4'>Your cart is empty.</p>
            )}
        </div>
    );
};

export default OrderSummary;
