import React, { useState, useMemo } from 'react';
import type { CartItem, Medicine, DeliveryDetails } from '../types';

interface CheckoutModalProps {
    cartItems: CartItem[];
    medicines: Medicine[];
    onClose: () => void;
    onPlaceOrder: (details: DeliveryDetails, paymentMethod: 'Online Payment' | 'Cash on Delivery') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ cartItems, medicines, onClose, onPlaceOrder }) => {
    const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({ name: '', address: '', contact: '' });
    const [paymentMethod, setPaymentMethod] = useState<'Online Payment' | 'Cash on Delivery'>('Online Payment');
    const [errors, setErrors] = useState<Partial<DeliveryDetails>>({});

    const subtotal = useMemo(() => cartItems.reduce((total, item) => {
        const medicine = medicines.find(m => m.id === item.medicineId);
        return total + (medicine ? medicine.price * item.quantity : 0);
    }, 0), [cartItems, medicines]);

    const deliveryFee = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;

    const validate = (): boolean => {
        const newErrors: Partial<DeliveryDetails> = {};
        if (!deliveryDetails.name.trim()) newErrors.name = 'Full name is required.';
        if (!deliveryDetails.address.trim()) newErrors.address = 'Delivery address is required.';
        if (!/^\+?[1-9]\d{9,14}$/.test(deliveryDetails.contact)) newErrors.contact = 'A valid contact number is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onPlaceOrder(deliveryDetails, paymentMethod);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDeliveryDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 z-10" aria-label="Close">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row flex-grow overflow-hidden">
                    {/* Left Panel: Form */}
                    <div className="w-full md:w-3/5 p-6 overflow-y-auto">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" name="name" value={deliveryDetails.name} onChange={handleChange} className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="address" className="text-sm font-medium text-gray-700">Delivery Address</label>
                                <textarea id="address" name="address" value={deliveryDetails.address} onChange={handleChange} rows={3} className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                            </div>
                            <div>
                                <label htmlFor="contact" className="text-sm font-medium text-gray-700">Contact Number</label>
                                <input type="tel" id="contact" name="contact" value={deliveryDetails.contact} onChange={handleChange} className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.contact ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">Payment Method</h3>
                        <div className="space-y-3">
                            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Online Payment' ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
                                <input type="radio" name="paymentMethod" value="Online Payment" checked={paymentMethod === 'Online Payment'} onChange={() => setPaymentMethod('Online Payment')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="ml-3 text-sm font-medium text-gray-800">Online Payment (UPI, Cards, etc.)</span>
                            </label>
                            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Cash on Delivery' ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
                                <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={() => setPaymentMethod('Cash on Delivery')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="ml-3 text-sm font-medium text-gray-800">Cash on Delivery</span>
                            </label>
                        </div>
                    </div>
                    
                    {/* Right Panel: Summary */}
                    <div className="w-full md:w-2/5 p-6 bg-gray-50 border-t md:border-t-0 md:border-l overflow-y-auto">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                        <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-2">
                            {cartItems.map(item => {
                                const medicine = medicines.find(m => m.id === item.medicineId);
                                if (!medicine) return null;
                                return (
                                    <div key={item.medicineId} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">{medicine.name} x {item.quantity}</span>
                                        <span className="font-medium text-gray-800">₹{(medicine.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="border-t pt-4 space-y-2">
                             <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Delivery Fee</span>
                                <span className="font-medium text-gray-800">₹{deliveryFee.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t mt-2">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button type="submit" className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};