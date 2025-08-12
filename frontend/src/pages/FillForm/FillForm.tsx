import { useState } from "react";
import type { FillFormProps } from "./types";

const FillForm = (props: FillFormProps) => {
  const { form, loading, error } = props;
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreviews, setFilePreviews] = useState<Record<string, { file: File; preview?: string; type: string }>>({});

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          color: "#6b7280"
        }}>
          <div style={{
            width: "20px",
            height: "20px",
            border: "2px solid #e5e7eb",
            borderTop: "2px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }}></div>
          <span>Loading form...</span>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "8px",
          padding: "1rem 1.5rem",
          color: "#dc2626",
          maxWidth: "400px",
          textAlign: "center"
        }}>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  // No form data
  if (!form) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          textAlign: "center",
          color: "#6b7280"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem", fontWeight: "600" }}>
            No form data available
          </h3>
        </div>
      </div>
    );
  }

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    if (!file) {
      setFilePreviews(prev => {
        const newPreviews = { ...prev };
        delete newPreviews[name];
        return newPreviews;
      });
      handleChange(name, null);
      return;
    }

    handleChange(name, file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreviews(prev => ({
          ...prev,
          [name]: {
            file,
            preview: e.target?.result as string,
            type: 'image'
          }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files, just store file info
      setFilePreviews(prev => ({
        ...prev,
        [name]: {
          file,
          type: 'file'
        }
      }));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, string> = {
      pdf: "📄",
      doc: "📝", docx: "📝",
      xls: "📊", xlsx: "📊",
      ppt: "📊", pptx: "📊",
      zip: "📦", rar: "📦",
      mp3: "🎵", wav: "🎵",
      mp4: "🎬", avi: "🎬",
      txt: "📄",
      csv: "📊"
    };
    return iconMap[ext || ''] || "📁";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => setIsSubmitting(false), 1000);
    console.log("Form submitted:", formData);
  };

  const baseInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1.5px solid #e5e7eb",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    boxSizing: "border-box",
    fontFamily: "inherit"
  };

  const focusStyle = {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fafafa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: "2rem 1rem"
    }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "3rem",
        border: "1px solid #f0f0f0",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)"
      }}>
        {/* Form Header */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1 style={{
            margin: "0 0 1rem",
            fontSize: "2rem",
            fontWeight: "700",
            color: "#1a1a1a",
            lineHeight: "1.2"
          }}>
            {form.title}
          </h1>
          {form.description && (
            <p style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "1.1rem",
              lineHeight: "1.6"
            }}>
              {form.description}
            </p>
          )}
          <div style={{
            width: "60px",
            height: "3px",
            background: "linear-gradient(90deg, #3b82f6, #10b981)",
            borderRadius: "2px",
            margin: "1.5rem auto 0"
          }} />
        </div>

        <div onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {form.fields.map((field) => {
              const name = field._id;

              switch (field.type) {
                case "textarea":
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
                      <textarea
                        required={field.required}
                        name={name}
                        rows={4}
                        placeholder={`Enter your ${field.label.toLowerCase()}...`}
                        onChange={(e) => handleChange(name, e.target.value)}
                        style={{
                          ...baseInputStyle,
                          resize: "vertical",
                          minHeight: "100px"
                        }}
                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  );

                case "select":
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
                        {field.options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  );

                case "checkbox":
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
                  );

                case "radio":
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
                        {field.options.map((opt, i) => (
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
                  );

                case "file":
                  const filePreview = filePreviews[name];
                  
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
                  );

                default:
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
                  );
              }
            })}
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "1rem 3rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.15s ease-in-out",
                opacity: isSubmitting ? 0.7 : 1,
                minWidth: "200px",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(59, 130, 246, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {isSubmitting ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid #ffffff30",
                    borderTop: "2px solid #ffffff",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }}></div>
                  Submitting...
                </div>
              ) : (
                "Submit Form"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillForm;