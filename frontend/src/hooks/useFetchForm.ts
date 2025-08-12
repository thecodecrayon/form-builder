import { useEffect, useState } from "react";

interface Form {
  title: string,
  description: string,
  _id: string,
  createdAt: string
}

const useFetchForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [forms, setForms] = useState<Form[]>([]);

  const fetchFormList = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/v1/forms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setForms(data.forms)
      } else {
        setError(data.msg || "Form creation failed!");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFormList();
  }, []);

  return {
    error,
    loading,
    forms
  };
}

export default useFetchForm;