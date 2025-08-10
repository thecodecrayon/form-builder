import { useState, useEffect } from 'react';

const useFormData = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/forms');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (data.status === 'success') {
          setForms(data.forms || []);
        } else {
          setError(data.msg || 'Failed to load forms');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return { forms, loading, error };
};

export default useFormData;
