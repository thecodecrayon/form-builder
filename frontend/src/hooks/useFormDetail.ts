import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from "../utils/commonMethods";

interface Field {
  _id: string;
  label: string;
  type: string;
  required: boolean;
  options: [string];
}

interface Form {
  title: string;
  description: string;
  fields: Field[];
}

const useFormDetail = () => {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchForms();
  }, []);

  return { form, loading, error };
};

export default useFormDetail;
