

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

    const inputClasses = "mt-1 w-full px-4 py-2 border rounded-lg focus:ring-gold-500 focus:border-gold-500 bg-background text-text-primary";
    const errorBorder = "border-red-500";
    const normalBorder = "border-card-border";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-card-border flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-text-primary">Checkout</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 z-10" aria-label="Close">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row flex-grow overflow-hidden">
                    {/* Left Panel: Form */}
                    <div className="w-full md:w-3/5 p-6 overflow-y-auto">
                        <h3 className="text-lg font-bold text-text-primary mb-4">Delivery Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-text-secondary">Full Name</label>
                                <input type="text" id="name" name="name" value={deliveryDetails.name} onChange={handleChange} className={`${inputClasses} ${errors.name ? errorBorder : normalBorder}`} />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="address" className="text-sm font-medium text-text-secondary">Delivery Address</label>
                                <textarea id="address" name="address" value={deliveryDetails.address} onChange={handleChange} rows={3} className={`${inputClasses} ${errors.address ? errorBorder : normalBorder}`}></textarea>
                                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                            </div>
                            <div>
                                <label htmlFor="contact" className="text-sm font-medium text-text-secondary">Contact Number</label>
                                <input type="tel" id="contact" name="contact" value={deliveryDetails.contact} onChange={handleChange} className={`${inputClasses} ${errors.contact ? errorBorder : normalBorder}`} />
                                {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-text-primary mt-8 mb-4">Payment Method</h3>
                        <div className="space-y-3">
                            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Online Payment' ? 'bg-gold-500/10 border-gold-500' : 'border-card-border hover:border-gold-400'}`}>
                                <input type="radio" name="paymentMethod" value="Online Payment" checked={paymentMethod === 'Online Payment'} onChange={() => setPaymentMethod('Online Payment')} className="h-4 w-4 text-gold-600 border-gray-300 focus:ring-gold-500" />
                                <span className="ml-3 font-semibold text-text-primary">Online Payment</span>
                            </label>
                            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Cash on Delivery' ? 'bg-gold-500/10 border-gold-500' : 'border-card-border hover:border-gold-400'}`}>
                                <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={() => setPaymentMethod('Cash on Delivery')} className="h-4 w-4 text-gold-600 border-gray-300 focus:ring-gold-500" />
                                <span className="ml-3 font-semibold text-text-primary">Cash on Delivery</span>
                            </label>
                        </div>
                    </div>

                    {/* Right Panel: Summary */}
                    <div className="w-full md:w-2/5 bg-gray-50 dark:bg-charcoal-dark p-6 border-l border-card-border flex flex-col">
                        <h3 className="text-lg font-bold text-text-primary mb-4">Order Summary</h3>
                        <div className="flex-grow space-y-3 overflow-y-auto pr-2">
                             {cartItems.map(item => {
                                const medicine = medicines.find(m => m.id === item.medicineId);
                                if (!medicine) return null;
                                return (
                                    <div key={item.medicineId} className="flex justify-between items-start">
                                        <div className="flex items-start">
                                            <img src={medicine.imageUrl} alt={medicine.name} className="w-12 h-12 rounded-md object-cover mr-3" />
                                            <div>
                                                <p className="text-sm font-semibold text-text-primary leading-tight">{medicine.name}</p>
                                                <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-text-primary">₹{(medicine.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-6 pt-6 border-t border-card-border flex-shrink-0">
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-text-secondary">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-text-primary">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>Delivery Fee</span>
                                    <span className="font-medium text-text-primary">₹{deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                                <div className="flex justify-between text-text-primary font-bold text-base">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="mt-6 w-full bg-gold-400 text-accent-text font-bold py-3 px-4 rounded-lg hover:bg-gold-500 transition-colors shadow-lg"
                            >
                                Place Order (₹{total.toFixed(2)})
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
