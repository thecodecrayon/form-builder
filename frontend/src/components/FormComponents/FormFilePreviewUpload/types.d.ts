import type { Field } from "../../../pages/FillForm/types";
File

export interface FormFilePreviewUploadProps {
  field: Field; 
  filePreview: { file: File; preview?: string; type: string }; 
  handleFileChange: (name: string, file: File | null) => void; 
  name: string;
}