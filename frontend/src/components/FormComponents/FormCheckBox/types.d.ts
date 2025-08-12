import type { Field } from "../../../pages/FillForm/types";

export interface FormCheckBoxProps {
  field: Field;
  name: string;
  formData: Record<string, any>;
  handleChange: (name: string, value: any) => void;
}