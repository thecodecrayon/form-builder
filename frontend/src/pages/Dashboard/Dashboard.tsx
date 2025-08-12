import { useNavigate } from "react-router-dom";
import type { DashboardProps } from "./types";

const Dashboard = (props: DashboardProps) => {
  const { error, loading, forms } = props;
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Loading state
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
          <span>Loading forms...</span>
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

  // Empty state
  if (!forms.length) {
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
          <div style={{
            fontSize: "3rem",
            marginBottom: "1rem"
          }}>📋</div>
          <h3 style={{
            margin: "0 0 0.5rem",
            fontSize: "1.125rem",
            fontWeight: "600"
          }}>
            No forms found
          </h3>
          <p style={{
            margin: 0,
            fontSize: "0.9rem"
          }}>
            Create your first form to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fafafa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1.5rem"
      }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{
            margin: "0 0 0.5rem",
            fontSize: "2rem",
            fontWeight: "700",
            color: "#1a1a1a"
          }}>
            Dashboard
          </h1>
          <p style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "1rem"
          }}>
            {forms.length} form{forms.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Forms Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {forms.map((form) => (
            <div
              key={form._id}
              onClick={() => {
                navigate(`/fillform/${form._id}`)
              }}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #f0f0f0",
                borderRadius: "12px",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#f0f0f0";
              }}
            >
              {/* Subtle gradient accent */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #3b82f6, #10b981)",
              }} />

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem"
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  lineHeight: "1.4",
                  flex: 1
                }}>
                  {form.title}
                </h3>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                  marginLeft: "0.75rem",
                  marginTop: "0.5rem",
                  flexShrink: 0
                }} />
              </div>

              <p style={{
                margin: "0 0 1.25rem",
                color: "#6b7280",
                fontSize: "0.9rem",
                lineHeight: "1.5",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}>
                {form.description}
              </p>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "1rem",
                borderTop: "1px solid #f3f4f6"
              }}>
                <small style={{
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                  fontWeight: "500"
                }}>
                  Created {formatDate(form.createdAt)}
                </small>
                <div style={{
                  color: "#3b82f6",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem"
                }}>
                  Open →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;