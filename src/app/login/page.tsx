import { AuthShell, LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Secure access"
      title="Sign in to your connected workspace."
      description="Open your notes, linked blocks, and knowledge graph in a focused interface built for calm thinking."
    >
      <LoginForm />
    </AuthShell>
  );
}
