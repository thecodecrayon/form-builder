import type { FillFormProps } from "./types";
import FormTextArea from "../../components/FormComponents/FormTextArea";
import FormSelect from "../../components/FormComponents/FormSelect";
import FormCheckBox from "../../components/FormComponents/FormCheckBox";
import FormRadioButtons from "../../components/FormComponents/FormRadioButtons";
import FormFilePreviewUpload from "../../components/FormComponents/FormFilePreviewUpload";
import FormDefault from "../../components/FormComponents/FormDefault";
import Button from "../../components/Button";

const FillForm = (props: FillFormProps) => {
  const {
    form,
    loading,
    error,
    formData,
    isSubmitting,
    filePreviews,
    handleSubmit,
    handleFileChange,
    handleChange
  } = props;

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
          <strong>Error:</strong> Unable to show form. Some error occured!
        </div>
      </div>
    );
  }

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
                    <FormTextArea
                      field={field}
                      name={name}
                      handleChange={handleChange} />
                  );

                case "select":
                  return (
                    <FormSelect
                      name={name}
                      field={field}
                      handleChange={handleChange} />
                  );

                case "checkbox":
                  return (
                    <FormCheckBox
                      field={field}
                      name={name}
                      formData={formData}
                      handleChange={handleChange} />
                  );

                case "radio":
                  return (
                    <FormRadioButtons
                      name={name}
                      field={field}
                      handleChange={handleChange} />
                  );

                case "file":
                  const filePreview = filePreviews[name];
                  return (
                    <FormFilePreviewUpload
                      field={field}
                      filePreview={filePreview}
                      handleFileChange={handleFileChange}
                      name={name} />
                  );

                default:
                  return (
                    <FormDefault
                      name={name}
                      field={field}
                      handleChange={handleChange} />
                  );
              }
            })}
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Button
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
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillForm;