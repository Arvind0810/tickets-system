// components/FormFields.js
import React from 'react';
import flatpickr from 'flatpickr';
import { useState, useEffect } from 'react';

// Generic Input Field
export const InputField = ({ label, name, type = 'text', placeholder, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mt-1 p-2 border rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Textarea Field
export const TextAreaField = ({ label, name, placeholder, value, onChange, error, rows = 3 }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`mt-1 p-2 border rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Select Field
export const SelectField = ({ label, name, options, value, onChange, error, className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 p-2 border rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Checkbox Field
export const CheckboxField = ({ label, name, checked, onChange }) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    </div>
  );
};

export const DateTimePicker = ({ label, name, value, onChange, error }) => {
    
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type="datetime-local" // Important: Use type="text" for flatpickr
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`mt-1 p-2 border rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

// Example usage in a component (e.g., pages/index.js or a custom form component):
export default function MyForm() {
  // ... (form state, handleChange, handleSubmit are the same as before)

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md"> {/* Added form styling */}
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2> {/* Added a heading */}
      <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <TextAreaField label="Message" name="message" value={formData.message} onChange={handleChange} />
      <SelectField label="Category" name="category" options={categories} value={formData.category} onChange={handleChange} />
      <CheckboxField label="Subscribe to Newsletter" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
        Submit
      </button>
    </form>
  );
}

