import { Field } from "../../../pages/FillForm/types";

export interface FormTextAreaProps {
  field: Field;
  name: string; 
  handleChange: (name: string, value: any) => void; 
}