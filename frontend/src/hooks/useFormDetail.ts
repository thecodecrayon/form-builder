import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from "../utils/commonMethods";
import type { Form } from '../pages/FillForm/types';

const useFormDetail = () => {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreviews, setFilePreviews] = useState<Record<string, { file: File; preview?: string; type: string }>>({});
  const { formId } = useParams();

  const fetchForms = async () => {
    setError(null);
    setLoading(true);

    const authToken = await getToken();
    try {
      const res = await fetch(`http://localhost:3000/api/v1/forms/${formId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.status) {
        setForm(data.form || null);
      } else {
        setError(data.msg || 'Failed to load forms');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    if (!file) {
      setFilePreviews(prev => {
        const newPreviews = { ...prev };
        delete newPreviews[name];
        return newPreviews;
      });
      handleChange(name, null);
      return;
    }

    handleChange(name, file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreviews(prev => ({
          ...prev,
          [name]: {
            file,
            preview: e.target?.result as string,
            type: 'image'
          }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files, just store file info
      setFilePreviews(prev => ({
        ...prev,
        [name]: {
          file,
          type: 'file'
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => setIsSubmitting(false), 1000);
    console.log("Form submitted:", formData);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return { 
    form, 
    loading, 
    error, 
    formData, 
    isSubmitting, 
    filePreviews,
    handleSubmit, 
    handleFileChange,
    handleChange
  };
};

export default useFormDetail;
