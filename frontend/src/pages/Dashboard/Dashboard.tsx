import { useNavigate } from "react-router-dom";

interface Form {
  title: string;
  description: string;
  _id: string;
  createdAt: string;
}

interface DashboardProps {
  error: string | null;
  loading: boolean;
  forms: Form[];
}

const Dashboard = ({ error, loading, forms }: DashboardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <p>Loading forms...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!forms.length) return <p>No forms found.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {forms.map((form) => (
          <div
            key={form._id}
            onClick={() => navigate(`/fillform/${form._id}`)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              cursor: "pointer",
              transition: "box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <h3 style={{ margin: "0 0 0.5rem" }}>{form.title}</h3>
            <p style={{ margin: "0 0 0.5rem", color: "#555" }}>
              {form.description}
            </p>
            <small style={{ color: "#888" }}>
              Created: {formatDate(form.createdAt)}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
