import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/commonMethods";
import type { FormField } from "../pages/FillForm/types";

const useCreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<FormField[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newOption, setNewOption] = useState<Record<number, string>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const navigate = useNavigate();

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { label: "", type: "text", required: false, options: [] },
    ]);
  };

  const addOption = (index: number, option: string) => {
    const updatedFields = [...fields];
    updatedFields[index].options = [...(updatedFields[index].options || []), option];
    setFields(updatedFields);
  };
  
  const updateField = (index: number, key: keyof FormField, value: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setFields(updatedFields);
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options = updatedFields[fieldIndex].options?.filter(
      (_, i) => i !== optionIndex
    );
    setFields(updatedFields);
  };

  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }

  const handlePreviewClick = (val: boolean) => {
    setIsPreviewOpen(val);
  };

  const createDynamicFrom = async () => {
    setLoading(true);
    setError(null);

    const authToken = await getToken();

    try {
      const response = await fetch("http://localhost:3000/api/v1/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ title, description, fields })
      });

      const data = await response.json();

      if (response.ok && data.status) {
        navigate("/dashboard/home");
      } else {
        setError(data.msg || "Form creation failed!");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true);
    createDynamicFrom();
    setIsSubmitting(false);
  };


  return {
    error,
    loading,
    title,
    description,
    handleTitle,
    handleDescription,
    fields,
    addField,
    updateField,
    addOption,
    removeField,
    removeOption,
    handleSubmit,
    isSubmitting,
    isPreviewOpen,
    handlePreviewClick
  }
}

export default useCreateForm;