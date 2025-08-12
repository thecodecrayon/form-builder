import { useState } from "react";
import type { CreateFormProps } from "./types";

const CreateForm = (props: CreateFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newOption, setNewOption] = useState<Record<number, string>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    error,
    loading,
    title,
    description,
    handleTitle,
    handleDescription,
    fields,
    addField,
    updateField,
    addOption,
    removeField,
    removeOption,
    handleSubmit
  } = props;

  const handleAddOption = (index: number) => {
    const option = newOption[index]?.trim();
    if (option) {
      addOption(index, option);
      setNewOption(prev => ({ ...prev, [index]: "" }));
    }
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    await handleSubmit();
    setIsSubmitting(false);
  };

  const handlePreviewClick = () => {
    setIsPreviewOpen(true);
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
          <span>Loading...</span>
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

  return (
    <>
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: "2rem 1rem"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "2.5rem",
            marginBottom: "2rem",
            border: "1px solid #f0f0f0",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)"
          }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h1 style={{
                margin: "0 0 0.5rem",
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1a1a1a"
              }}>
                Create New Form
              </h1>
              <p style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "1rem"
              }}>
                Build your custom form with various field types
              </p>
              <div style={{
                width: "60px",
                height: "3px",
                background: "linear-gradient(90deg, #3b82f6, #10b981)",
                borderRadius: "2px",
                margin: "1.5rem auto 0"
              }} />
            </div>

            {error && (
              <div style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                marginBottom: "1.5rem",
                color: "#dc2626",
                fontSize: "0.9rem"
              }}>
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Form Title */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "0.75rem",
                color: "#374151",
                fontSize: "0.9rem"
              }}>
                Form Title *
              </label>
              <input
                type="text"
                placeholder="Enter your form title..."
                value={title}
                onChange={handleTitle}
                style={baseInputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Form Description */}
            <div style={{ marginBottom: "2rem" }}>
              <label style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "0.75rem",
                color: "#374151",
                fontSize: "0.9rem"
              }}>
                Form Description
              </label>
              <textarea
                placeholder="Describe what this form is for..."
                value={description}
                onChange={handleDescription}
                rows={3}
                style={{
                  ...baseInputStyle,
                  resize: "vertical",
                  minHeight: "80px"
                }}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Fields Section */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "2.5rem",
            marginBottom: "2rem",
            border: "1px solid #f0f0f0",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem"
            }}>
              <div>
                <h2 style={{
                  margin: "0 0 0.25rem",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1a1a1a"
                }}>
                  Form Fields
                </h2>
                <p style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "0.9rem"
                }}>
                  {fields?.length || 0} field{fields?.length !== 1 ? 's' : ''} added
                </p>
              </div>
              <button
                type="button"
                onClick={addField}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.15s ease-in-out"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span>➕</span>
                Add Field
              </button>
            </div>

            {/* Field List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {fields?.map((field, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    backgroundColor: "#f9fafb",
                    position: "relative"
                  }}
                >
                  {/* Field Header */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1.5rem"
                  }}>
                    <div style={{
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: "600"
                    }}>
                      {index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        padding: "0.5rem",
                        borderRadius: "6px",
                        transition: "all 0.15s ease",
                        fontSize: "1.1rem"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#fef2f2";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Field Configuration */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: "1rem",
                    alignItems: "end",
                    marginBottom: "1rem"
                  }}>
                    {/* Field Label */}
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

                    {/* Field Type */}
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
                        {fieldTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Required Checkbox */}
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

                  {/* Options for select, checkbox, radio */}
                  {(field.type === "select" || field.type === "checkbox" || field.type === "radio") && (
                    <div style={{
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: "1.5rem",
                      marginTop: "1rem"
                    }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem"
                      }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          color: "#374151"
                        }}>
                          Options
                        </h4>
                        <div style={{
                          fontSize: "0.8rem",
                          color: "#6b7280",
                          backgroundColor: "#f3f4f6",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "12px"
                        }}>
                          {(field.options || []).length} options
                        </div>
                      </div>

                      {/* Option List */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
                        {(field.options || []).map((opt, optIndex) => (
                          <div key={optIndex} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.5rem",
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb"
                          }}>
                            <div style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: "#e5e7eb",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.7rem",
                              color: "#6b7280",
                              flexShrink: 0
                            }}>
                              {optIndex + 1}
                            </div>
                            <input
                              type="text"
                              value={opt}
                              placeholder={`Option ${optIndex + 1}`}
                              onChange={(e) => {
                                const updated = [...(field.options || [])];
                                updated[optIndex] = e.target.value;
                                updateField(index, "options", updated);
                              }}
                              style={{
                                flex: 1,
                                padding: "0.5rem",
                                border: "none",
                                outline: "none",
                                fontSize: "0.9rem"
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(index, optIndex)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                                padding: "0.25rem",
                                borderRadius: "4px",
                                fontSize: "0.9rem",
                                flexShrink: 0
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#fef2f2";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              ❌
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add New Option */}
                      <div style={{
                        display: "flex",
                        gap: "0.5rem"
                      }}>
                        <input
                          type="text"
                          placeholder="Enter new option..."
                          value={newOption[index] || ""}
                          onChange={(e) => setNewOption(prev => ({ ...prev, [index]: e.target.value }))}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleAddOption(index);
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: "0.6rem",
                            borderRadius: "6px",
                            border: "1px solid #e5e7eb",
                            fontSize: "0.85rem",
                            outline: "none"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddOption(index)}
                          style={{
                            backgroundColor: "#3b82f6",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "0.6rem 1rem",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            transition: "background-color 0.15s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#2563eb";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#3b82f6";
                          }}
                        >
                          ➕ Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Empty State */}
              {(!fields || fields.length === 0) && (
                <div style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "#6b7280"
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
                  <h3 style={{
                    margin: "0 0 0.5rem",
                    fontSize: "1.125rem",
                    fontWeight: "600"
                  }}>
                    No fields added yet
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: "0.9rem"
                  }}>
                    Click "Add Field" to start building your form
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "2rem",
            border: "1px solid #f0f0f0",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            textAlign: "center"
          }}>
            <button
              onClick={handlePreviewClick}
              disabled={!title.trim() || !fields?.length}
              style={{
                background: !title.trim() || !fields?.length 
                  ? "#e5e7eb" 
                  : "linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))",
                color: !title.trim() || !fields?.length 
                  ? "#9ca3af" 
                  : "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "1rem 3rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor:  !title.trim() || !fields?.length ? "not-allowed" : "pointer",
                transition: "all 0.15s ease-in-out",
                minWidth: "200px",
                position: "relative",
                overflow: "hidden",
                marginRight: "10px"
              }}
              onMouseEnter={(e) => {
                if (title.trim() && fields?.length) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(16, 185, 129, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              👁️ Preview Form
            </button>
            <button
              onClick={handleFormSubmit}
              disabled={isSubmitting || !title.trim() || !fields?.length}
              style={{
                background: isSubmitting || !title.trim() || !fields?.length 
                  ? "#e5e7eb" 
                  : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: isSubmitting || !title.trim() || !fields?.length 
                  ? "#9ca3af" 
                  : "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "1rem 3rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: isSubmitting || !title.trim() || !fields?.length ? "not-allowed" : "pointer",
                transition: "all 0.15s ease-in-out",
                minWidth: "200px",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && title.trim() && fields?.length) {
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
                  Creating Form...
                </div>
              ) : (
                "💾 Save Form"
              )}
            </button>

            {(!title.trim() || !fields?.length) && (
              <p style={{
                margin: "1rem 0 0",
                fontSize: "0.8rem",
                color: "#9ca3af"
              }}>
                {!title.trim() && "Form title is required. "}
                {!fields?.length && "At least one field is required."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
          onClick={() => setIsPreviewOpen(false)}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              animation: 'modalSlideIn 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              @keyframes modalSlideIn {
                from {
                  opacity: 0;
                  transform: scale(0.95) translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: scale(1) translateY(0px);
                }
              }
            `}</style>
            
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem 2rem',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                Form Preview
              </h2>
              <button
                onClick={() => setIsPreviewOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  color: '#6b7280',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              maxHeight: 'calc(90vh - 80px)',
              overflowY: 'auto',
              padding: '2rem',
              backgroundColor: '#fafafa'
            }}>
              <div style={{
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "2.5rem",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)"
              }}>
                {/* Form Preview Header */}
                <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
                  <h1 style={{
                    margin: "0 0 0.75rem",
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    lineHeight: "1.2"
                  }}>
                    {title}
                  </h1>
                  {description && (
                    <p style={{
                      margin: 0,
                      color: "#6b7280",
                      fontSize: "1rem",
                      lineHeight: "1.6"
                    }}>
                      {description}
                    </p>
                  )}
                  <div style={{
                    width: "50px",
                    height: "3px",
                    background: "linear-gradient(90deg, #3b82f6, #10b981)",
                    borderRadius: "2px",
                    margin: "1rem auto 0"
                  }} />
                </div>

                {/* Form Fields Preview */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  {fields.map((field, index) => {
                    const name = `field_${index}`;

                    switch (field.type) {
                      case "textarea":
                        return (
                          <div key={index}>
                            <label style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "0.5rem",
                              color: "#374151",
                              fontSize: "0.9rem"
                            }}>
                              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                            </label>
                            <textarea
                              rows={4}
                              placeholder={`Enter your ${field.label.toLowerCase()}...`}
                              style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1.5px solid #e5e7eb",
                                fontSize: "1rem",
                                outline: "none",
                                resize: "vertical",
                                minHeight: "100px",
                                boxSizing: "border-box",
                                fontFamily: "inherit"
                              }}
                              disabled
                            />
                          </div>
                        );

                      case "select":
                        return (
                          <div key={index}>
                            <label style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "0.5rem",
                              color: "#374151",
                              fontSize: "0.9rem"
                            }}>
                              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                            </label>
                            <select
                              style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1.5px solid #e5e7eb",
                                fontSize: "1rem",
                                outline: "none",
                                boxSizing: "border-box",
                                fontFamily: "inherit"
                              }}
                              disabled
                            >
                              <option value="">Select an option...</option>
                              {(field.options || []).map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        );

                      case "checkbox":
                        return (
                          <div key={index}>
                            <label style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "0.75rem",
                              color: "#374151",
                              fontSize: "0.9rem"
                            }}>
                              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {(field.options || []).length > 0 ? (
                                field.options?.map((opt, i) => (
                                  <label key={i} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    cursor: "pointer",
                                    padding: "0.5rem",
                                    borderRadius: "6px"
                                  }}>
                                    <input
                                      type="checkbox"
                                      value={opt}
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        accentColor: "#3b82f6"
                                      }}
                                      disabled
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
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      accentColor: "#3b82f6"
                                    }}
                                    disabled
                                  />
                                  <span style={{ fontSize: "0.9rem", color: "#374151" }}>Check this box</span>
                                </label>
                              )}
                            </div>
                          </div>
                        );

                      case "radio":
                        return (
                          <div key={index}>
                            <label style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "0.75rem",
                              color: "#374151",
                              fontSize: "0.9rem"
                            }}>
                              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {(field.options || []).map((opt, i) => (
                                <label key={i} style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  cursor: "pointer",
                                  padding: "0.5rem",
                                  borderRadius: "6px"
                                }}>
                                  <input
                                    type="radio"
                                    name={name}
                                    value={opt}
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      accentColor: "#3b82f6"
                                    }}
                                    disabled
                                  />
                                  <span style={{ fontSize: "0.9rem", color: "#374151" }}>{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );

                      case "file":
                        return (
                          <div key={index}>
                            <label style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "0.5rem",
                              color: "#374151",
                              fontSize: "0.9rem"
                            }}>
                              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                            </label>
                            <div style={{
                              border: "2px dashed #d1d5db",
                              borderRadius: "8px",
                              padding: "1.5rem",
                              textAlign: "center",
                              backgroundColor: "#f9fafb"
                            }}>
                              <div style={{ color: "#6b7280" }}>
                                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📁</div>
                                <p style={{ margin: "0 0 0.25rem", fontWeight: "500", fontSize: "0.9rem" }}>
                                  Drop your file here, or click to browse
                                </p>
                                <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.7 }}>
                                  Any file type accepted
                                </p>
                              </div>
                            </div>
                          </div>
                        );

                      default:
                        return (
                          <div key={index}>
                            <label style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "0.5rem",
                              color: "#374151",
                              fontSize: "0.9rem"
                            }}>
                              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                            </label>
                            <input
                              type={field.type}
                              placeholder={`Enter your ${field.label.toLowerCase()}...`}
                              style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1.5px solid #e5e7eb",
                                fontSize: "1rem",
                                outline: "none",
                                boxSizing: "border-box",
                                fontFamily: "inherit"
                              }}
                              disabled
                            />
                          </div>
                        );
                    }
                  })}

                  {/* Empty State */}
                  {fields.length === 0 && (
                    <div style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#6b7280"
                    }}>
                      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📝</div>
                      <p style={{ margin: 0, fontSize: "0.9rem" }}>
                        No fields added to this form yet
                      </p>
                    </div>
                  )}
                </div>

                {/* Preview Submit Button */}
                {fields.length > 0 && (
                  <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
                    <button
                      type="button"
                      disabled
                      style={{
                        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "0.875rem 2.5rem",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: "not-allowed",
                        opacity: 0.7,
                        minWidth: "180px"
                      }}
                    >
                      Submit Form
                    </button>
                    <p style={{
                      margin: "0.75rem 0 0",
                      fontSize: "0.8rem",
                      color: "#9ca3af",
                      fontStyle: "italic"
                    }}>
                      This is a preview - form submission is not functional
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </>
  );
}

export default CreateForm;