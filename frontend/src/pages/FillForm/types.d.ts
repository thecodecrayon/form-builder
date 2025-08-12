
export interface Field {
  _id: string;
  label: string;
  type: string;
  required: boolean;
  options: string[];
};
export interface FormField {
  label: string;
  type: string;
  required: boolean;
  options: string[];
}

export interface Form {
  title: string;
  description: string;
  fields: Field[];
}

export interface FillFormProps {
  error: string | null;
  loading: boolean;
  form: Form | null;
  formData: Record<string, any>;
  isSubmitting: boolean;
  filePreviews: Record<string, { file: File; preview?: string; type: string }>;
  handleSubmit: (e: React.FormEvent) => void;
  handleFileChange: (name: string, file: File | null) => void;
  handleChange: (name: string, value: any) => void;
};

export interface SingleForm {
  title: string;
  description: string;
  _id: string;
  createdAt: string;
}