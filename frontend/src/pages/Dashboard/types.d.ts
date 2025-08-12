export interface Form {
  title: string;
  description: string;
  _id: string;
  createdAt: string;
}

export interface DashboardProps {
  error: string | null;
  loading: boolean;
  forms: Form[];
}