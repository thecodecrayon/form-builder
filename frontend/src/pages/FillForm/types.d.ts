
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
};

export interface SingleForm {
  title: string;
  description: string;
  _id: string;
  createdAt: string;
}