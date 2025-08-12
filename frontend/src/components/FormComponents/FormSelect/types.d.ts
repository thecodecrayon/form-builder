import { Field } from "../../../pages/FillForm/types";

export interface FormSelectProps {
  field: Form;
  name: string;
  handleChange: (name: string, value: any) => void;
}