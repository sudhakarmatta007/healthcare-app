import React, { useState, ChangeEvent, FormEvent } from 'react';

interface RegisterDoctorModalProps {
    onClose: () => void;
}

export const RegisterDoctorModal: React.FC<RegisterDoctorModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        specialization: '',
        experience: '',
        contact: '',
        email: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState<Partial<typeof formData> & { image?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
        if (!formData.experience.trim() || isNaN(Number(formData.experience)) || Number(formData.experience) < 0) {
            newErrors.experience = 'Valid years of experience is required';
        }
        if (!/^\+?[1-9]\d{1,14}$/.test(formData.contact)) {
            newErrors.contact = 'A valid contact number is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'A valid email address is required';
        }
        if (!imageFile) {
            newErrors.image = 'Profile picture is required';
        }

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
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden p-8 text-center">
                     <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">Registration Submitted!</h2>
                    <p className="text-sm text-text-secondary mt-2 mb-6">
                        Thank you for registering. Your profile has been sent to our administrators for approval. You will be notified via email once it's reviewed.
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden max-h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="p-8">
                     <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Register as a Doctor</h2>
                     <p className="text-center text-sm text-text-secondary mb-8">Join our network of healthcare professionals.</p>
                     <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
                        <div>
                            <label className="text-sm font-medium text-text-secondary" htmlFor="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={`${inputClasses} ${errors.fullName ? errorBorder : normalBorder}`}/>
                            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-text-secondary" htmlFor="gender">Gender</label>
                                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={`${inputClasses} ${errors.gender ? errorBorder : normalBorder}`}>
                                    <option value="">Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-text-secondary" htmlFor="experience">Years of Experience</label>
                                <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} className={`${inputClasses} ${errors.experience ? errorBorder : normalBorder}`}/>
                                {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
                            </div>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-text-secondary" htmlFor="specialization">Specialization</label>
                            <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g., Cardiologist" className={`${inputClasses} ${errors.specialization ? errorBorder : normalBorder}`}/>
                             {errors.specialization && <p className="text-xs text-red-500 mt-1">{errors.specialization}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-text-secondary" htmlFor="contact">Contact Number</label>
                                <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} className={`${inputClasses} ${errors.contact ? errorBorder : normalBorder}`}/>
                                {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-text-secondary" htmlFor="email">Email Address</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${errors.email ? errorBorder : normalBorder}`}/>
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Upload Doctor Profile Picture</label>
                            <label htmlFor="doctor-image-upload" className={`mt-1 flex justify-center w-full px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-gold-500 ${errors.image ? errorBorder : normalBorder}`}>
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <div className="flex text-sm text-text-secondary">
                                        <span className="relative bg-card-bg rounded-md font-medium text-gold-600 dark:text-gold-400 hover:text-gold-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gold-500">
                                            <span>Upload a file</span>
                                            <input id="doctor-image-upload" name="image" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
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
