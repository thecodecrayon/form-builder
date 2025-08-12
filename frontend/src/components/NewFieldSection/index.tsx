import { baseInputStyle, focusStyle } from "../../pages/CreateForm/style";

const fieldTypeOptions = [
  { value: "text", label: "Text", icon: "📝" },
  { value: "textarea", label: "Textarea", icon: "📄" },
  { value: "number", label: "Number", icon: "🔢" },
  { value: "date", label: "Date", icon: "📅" },
  { value: "email", label: "Email", icon: "✉️" },
  { value: "password", label: "Password", icon: "🔒" },
  { value: "select", label: "Dropdown", icon: "📋" },
  { value: "checkbox", label: "Checkbox", icon: "☑️" },
  { value: "radio", label: "Radio", icon: "🔘" },
  { value: "file", label: "File Upload", icon: "📎" }
];

const NewFieldSection = ({ field, updateField, index }: any) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto auto",
      gap: "1rem",
      alignItems: "end",
      marginBottom: "1rem"
    }}>
      <div>
        <label style={{
          display: "block",
          fontWeight: "500",
          marginBottom: "0.5rem",
          color: "#374151",
          fontSize: "0.85rem"
        }}>
          Field Label
        </label>
        <input
          type="text"
          placeholder="Enter field label..."
          value={field.label}
          onChange={(e) => updateField(index, "label", e.target.value)}
          style={{
            ...baseInputStyle,
            fontSize: "0.9rem",
            padding: "0.6rem"
          }}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>
      <div>
        <label style={{
          display: "block",
          fontWeight: "500",
          marginBottom: "0.5rem",
          color: "#374151",
          fontSize: "0.85rem"
        }}>
          Type
        </label>
        <select
          value={field.type}
          onChange={(e) => updateField(index, "type", e.target.value)}
          style={{
            ...baseInputStyle,
            fontSize: "0.9rem",
            padding: "0.6rem",
            minWidth: "140px"
          }}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.boxShadow = "none";
          }}
        >
          {fieldTypeOptions.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center", paddingTop: "1.8rem" }}>
        <label style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          fontSize: "0.85rem",
          color: "#374151",
          fontWeight: "500"
        }}>
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => updateField(index, "required", e.target.checked)}
            style={{
              width: "16px",
              height: "16px",
              accentColor: "#3b82f6"
            }}
          />
          Required
        </label>
      </div>
    </div>
  )
}

export default NewFieldSection;