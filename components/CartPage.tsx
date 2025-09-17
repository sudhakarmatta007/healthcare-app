
import React from 'react';
import type { CartItem, Medicine } from '../types';

interface CartPageProps {
    cartItems: CartItem[];
    medicines: Medicine[];
    onUpdateQuantity: (medicineId: string, quantity: number) => void;
    onRemoveItem: (medicineId: string) => void;
    onProceedToCheckout: () => void;
    onContinueShopping: () => void;
}

const CartListItem: React.FC<{
    item: CartItem;
    medicine: Medicine;
    onUpdateQuantity: (medicineId: string, quantity: number) => void;
    onRemoveItem: (medicineId: string) => void;
}> = ({ item, medicine, onUpdateQuantity, onRemoveItem }) => (
    <div className="flex flex-col sm:flex-row items-center py-5 border-b">
        <img src={medicine.imageUrl} alt={medicine.name} className="w-24 h-24 rounded-md object-cover mr-0 sm:mr-6 mb-4 sm:mb-0" />
        <div className="flex-grow text-center sm:text-left">
            <h3 className="text-lg font-bold text-gray-800">{medicine.name}</h3>
            <p className="text-sm text-gray-500">Unit Price: ₹{medicine.price.toFixed(2)}</p>
            <button onClick={() => onRemoveItem(item.medicineId)} className="text-xs text-red-500 hover:text-red-700 font-medium mt-2 inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                Remove
            </button>
        </div>
        <div className="flex items-center my-4 sm:my-0 sm:mx-8">
            <button onClick={() => onUpdateQuantity(item.medicineId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-300 transition-colors">-</button>
            <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.medicineId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-300 transition-colors">+</button>
        </div>
        <div className="w-24 text-center sm:text-right">
            <p className="text-lg font-bold text-gray-800">₹{(medicine.price * item.quantity).toFixed(2)}</p>
        </div>
    </div>
);

export const CartPage: React.FC<CartPageProps> = ({ cartItems, medicines, onUpdateQuantity, onRemoveItem, onProceedToCheckout, onContinueShopping }) => {
    const subtotal = cartItems.reduce((total, item) => {
        const medicine = medicines.find(m => m.id === item.medicineId);
        return total + (medicine ? medicine.price * item.quantity : 0);
    }, 0);
    
    const deliveryFee = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;

    if (cartItems.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen pt-28">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <h1 className="mt-4 text-2xl font-bold text-gray-800">Your cart is empty</h1>
                    <p className="mt-2 text-gray-600">Looks like you haven't added any medicines yet.</p>
                    <button
                        onClick={onContinueShopping}
                        className="mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        Browse Medicines
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">Your Shopping Cart</h1>
                    <p className="mt-2 text-lg text-gray-600">Review your items and proceed to checkout.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
                        <div className="p-6">
                            {cartItems.map(item => {
                                const medicine = medicines.find(m => m.id === item.medicineId);
                                if (!medicine) return null;
                                return <CartListItem key={item.medicineId} item={item} medicine={medicine} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />;
                            })}
                        </div>
                        <div className="p-6 border-t">
                            <button onClick={onContinueShopping} className="text-blue-600 font-semibold hover:underline">
                                &larr; Continue Shopping
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 sticky top-28">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-semibold">₹{deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="border-t my-4"></div>
                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={onProceedToCheckout}
                            className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
