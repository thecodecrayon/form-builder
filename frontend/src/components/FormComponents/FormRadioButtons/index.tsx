import type { FormRadioButtonsProps } from "./types";

const FormRadioButtons = (props: FormRadioButtonsProps) => {
  const { field, name, handleChange } = props;
  return (
    <div key={field._id}>
      <label style={{
        display: "block",
        fontWeight: "500",
        marginBottom: "1rem",
        color: "#374151",
        fontSize: "0.9rem"
      }}>
        {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {field.options.map((opt: string, i: string) => (
          <label key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "6px",
            transition: "background-color 0.15s ease"
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              required={field.required}
              style={{
                width: "16px",
                height: "16px",
                accentColor: "#3b82f6"
              }}
              onChange={(e) => handleChange(name, e.target.value)}
            />
            <span style={{ fontSize: "0.9rem", color: "#374151" }}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default FormRadioButtons;