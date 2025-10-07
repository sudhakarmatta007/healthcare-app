import React, { useState, ChangeEvent, FormEvent } from 'react';

interface RegisterHospitalModalProps {
    onClose: () => void;
}

export const RegisterHospitalModal: React.FC<RegisterHospitalModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: '',
        email: '',
        specialties: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState<Partial<typeof formData> & { image?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<typeof formData> & { image?: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Hospital Name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!/^\+?[1-9]\d{1,14}$/.test(formData.contact)) newErrors.contact = 'A valid contact number is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'A valid email address is required';
        if (!formData.specialties.trim()) newErrors.specialties = 'At least one specialty is required';
        if (!imageFile) newErrors.image = 'Hospital image is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setIsSubmitting(true);
        // Simulate API call for submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden p-8 text-center">
                     <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">Registration Submitted!</h2>
                    <p className="text-sm text-text-secondary mt-2 mb-6">
                        Thank you for registering. Your hospital profile has been sent to our administrators for approval. You will be notified via email once it's reviewed.
                    </p>
                    <button 
                        onClick={onClose}
                        className="w-full bg-gold-400 text-accent-text font-bold py-3 px-4 rounded-lg hover:bg-gold-500 transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        )
    }

    const inputClasses = "mt-1 w-full px-4 py-2 border rounded-lg focus:ring-gold-500 focus:border-gold-500 bg-background text-text-primary";
    const errorBorder = "border-red-500";
    const normalBorder = "border-card-border";

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden max-h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                 <div className="p-8">
                     <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Register Hospital</h2>
                     <p className="text-center text-sm text-text-secondary mb-8">Add your hospital to our growing network.</p>
                     <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
                        <div>
                            <label className="text-sm font-medium text-text-secondary" htmlFor="name">Hospital Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`${inputClasses} ${errors.name ? errorBorder : normalBorder}`}/>
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text-secondary" htmlFor="address">Address / Location</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={`${inputClasses} ${errors.address ? errorBorder : normalBorder}`}/>
                             {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-text-secondary" htmlFor="contact">Contact Number</label>
                                <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} className={`${inputClasses} ${errors.contact ? errorBorder : normalBorder}`}/>
                                {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-text-secondary" htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${errors.email ? errorBorder : normalBorder}`}/>
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text-secondary" htmlFor="specialties">Available Specialties</label>
                            <textarea id="specialties" name="specialties" rows={3} value={formData.specialties} onChange={handleChange} placeholder="e.g., Cardiology, Dermatology, Pediatrics" className={`${inputClasses} ${errors.specialties ? errorBorder : normalBorder}`}></textarea>
                            <p className="text-xs text-gray-500 mt-1">Please enter as a comma-separated list.</p>
                            {errors.specialties && <p className="text-xs text-red-500 mt-1">{errors.specialties}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Upload Hospital Image</label>
                            <label htmlFor="hospital-image-upload" className={`mt-1 flex justify-center w-full px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-gold-500 ${errors.image ? errorBorder : normalBorder}`}>
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <div className="flex text-sm text-text-secondary">
                                        <span className="relative bg-card-bg rounded-md font-medium text-gold-600 dark:text-gold-400 hover:text-gold-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gold-500">
                                            <span>Upload a file</span>
                                            <input id="hospital-image-upload" name="image" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
                                        </span>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{fileName || 'PNG, JPG, GIF up to 10MB'}</p>
                                </div>
                            </label>
                            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
                        </div>
                         <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-gold-400 text-accent-text font-bold py-3 px-4 rounded-lg hover:bg-gold-500 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
                            </button>
                        </div>
                     </form>
                 </div>
            </div>
        </div>
    );
};
