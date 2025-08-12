export interface FormField {
  label: string;
  type: string;
  required: boolean;
  options?: string[]; 
}

export interface CreateFormProps {
  error: string | null;
  loading: boolean;
  title: string;
  description: string;
  handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fields: FormField[]; 
  addField: () => void;
  updateField: (index: number, key: keyof FormField, value: any) => void;
  addOption: (index: number, option: string) => void;
  removeField: (index: number) => void;
  removeOption: (fieldIndex: number, optionIndex: number) => void;
  handleSubmit: () => void;
}