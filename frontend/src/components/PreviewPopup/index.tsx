const PreviewPopup = ({ handlePreviewClick, title, description, fields }: any) => {
  return (
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
      onClick={() => handlePreviewClick(false)}
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
            onClick={() => handlePreviewClick(false)}
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

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {fields.map((field: any, index: string) => {
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
                          {(field.options || []).map((opt: string, i: string) => (
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
                            field.options?.map((opt: string, i: string) => (
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
                          {(field.options || []).map((opt: string, i: string) => (
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
  )
}

export default PreviewPopup;