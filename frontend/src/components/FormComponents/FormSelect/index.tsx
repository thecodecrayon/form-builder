import { baseInputStyle, focusStyle } from "../../../pages/FillForm/style";
import type { FormSelectProps } from "./types";

const FormSelect = (props: FormSelectProps) => {

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
      <select
        required={field.required}
        name={name}
        onChange={(e) => handleChange(name, e.target.value)}
        style={baseInputStyle}
        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
        onBlur={(e) => {
          e.target.style.borderColor = "#e5e7eb";
          e.target.style.boxShadow = "none";
        }}
      >
        <option value="">Select an option...</option>
        {field.options.map((opt: string, i: string) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormSelect;