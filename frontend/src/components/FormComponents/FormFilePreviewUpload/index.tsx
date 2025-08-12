import { formatFileSize, getFileIcon } from "../../../utils/fileMethods";
import type { FormFilePreviewUploadProps } from "./types";

const FormFilePreviewUpload = (props: FormFilePreviewUploadProps) => {
  const { field, filePreview, handleFileChange, name } = props;

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

      {!filePreview ? (
        // Upload area when no file is selected
        <div style={{
          position: "relative",
          border: "2px dashed #d1d5db",
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "center",
          transition: "all 0.15s ease",
          backgroundColor: "#f9fafb",
          cursor: "pointer"
        }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = "#3b82f6";
            e.currentTarget.style.backgroundColor = "#eff6ff";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onDragLeave={(e) => {
            e.currentTarget.style.borderColor = "#d1d5db";
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = "#d1d5db";
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.transform = "scale(1)";

            const files = e.dataTransfer.files;
            if (files && files[0]) {
              handleFileChange(name, files[0]);
            }
          }}
          onClick={() => document.getElementById(`file-${name}`)?.click()}
        >
          <input
            id={`file-${name}`}
            type="file"
            name={name}
            required={field.required}
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(name, e.target.files?.[0] || null)}
          />
          <div style={{ color: "#6b7280" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>📁</div>
            <p style={{ margin: "0 0 0.25rem", fontWeight: "600", fontSize: "1.1rem" }}>
              Drop your file here, or click to browse
            </p>
            <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.7 }}>
              Any file type accepted
            </p>
          </div>
        </div>
      ) : (
        // Preview area when file is selected
        <div style={{
          border: "2px solid #e5e7eb",
          borderRadius: "12px",
          padding: "1.5rem",
          backgroundColor: "#ffffff"
        }}>
          {filePreview.type === 'image' && filePreview.preview ? (
            // Image preview
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <img
                src={filePreview.preview}
                alt="Preview"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb"
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "0.9rem", fontWeight: "600" }}>
                  {filePreview.file.name}
                </h4>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", color: "#6b7280" }}>
                  {formatFileSize(filePreview.file.size)} • Image
                </p>
                <button
                  type="button"
                  onClick={() => handleFileChange(name, null)}
                  style={{
                    background: "none",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    color: "#6b7280",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            // File info preview
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem"
              }}>
                {getFileIcon(filePreview.file.name)}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "0.9rem", fontWeight: "600" }}>
                  {filePreview.file.name}
                </h4>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", color: "#6b7280" }}>
                  {formatFileSize(filePreview.file.size)} • {filePreview.file.type || 'Unknown type'}
                </p>
                <button
                  type="button"
                  onClick={() => handleFileChange(name, null)}
                  style={{
                    background: "none",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    color: "#6b7280",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FormFilePreviewUpload;