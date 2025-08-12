import type { FormCheckBoxProps } from "./types";

const FormCheckBox = (props: FormCheckBoxProps) => {
  const { field, name, formData, handleChange } = props;

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
        {field.options.length > 0 ? (
          field.options.map((opt, i) => (
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
                type="checkbox"
                name={name}
                value={opt}
                style={{
                  width: "16px",
                  height: "16px",
                  accentColor: "#3b82f6"
                }}
                onChange={(e) => {
                  const selected = formData[name] || [];
                  if (e.target.checked) {
                    handleChange(name, [...selected, opt]);
                  } else {
                    handleChange(
                      name,
                      selected.filter((v: string) => v !== opt)
                    );
                  }
                }}
              />
              <span style={{ fontSize: "0.9rem", color: "#374151" }}>{opt}</span>
            </label>
          ))
        ) : (
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer"
          }}>
            <input
              type="checkbox"
              name={name}
              required={field.required}
              style={{
                width: "16px",
                height: "16px",
                accentColor: "#3b82f6"
              }}
              onChange={(e) => handleChange(name, e.target.checked)}
            />
            <span style={{ fontSize: "0.9rem", color: "#374151" }}>Check this box</span>
          </label>
        )}
      </div>
    </div>
  )
}

export default FormCheckBox;