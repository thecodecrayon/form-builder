export interface FormField {
  label: string;
  type: string;
  required: boolean;
  options?: string[]; 
}

export interface Form {
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormPreviewProps {
  form: Form;
}