import useFetchForm from "../../hooks/useFetchForm";
import Dashboard from "../../pages/Dashboard/Dashboard";

const DashboardView = () => {
  const {
    error,
    loading,
    forms
  } = useFetchForm();
  return (
    <Dashboard
      error={error}
      loading={loading}
      forms={forms} />
  )
}

export default DashboardView;