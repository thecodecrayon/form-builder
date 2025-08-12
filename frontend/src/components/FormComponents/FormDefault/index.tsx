import { baseInputStyle, focusStyle } from "../../../pages/FillForm/style";
import type { FormDefaultProps } from "./types";

const FormDefault = (props: FormDefaultProps) => {

  const { field, name, handleChange } = props;

  return (
    <div key={field._id}>
      <label style={{
        display: "block",
        fontWeight: "500",
        marginBottom: "0.75rem",
        color: "#374151",
        fontSize: "0.9rem"
      }}>
        {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input
        type={field.type}
        name={name}
        required={field.required}
        placeholder={`Enter your ${field.label.toLowerCase()}...`}
        onChange={(e) => handleChange(name, e.target.value)}
        style={baseInputStyle}
        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
        onBlur={(e) => {
          e.target.style.borderColor = "#e5e7eb";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  )
}

export default FormDefault;