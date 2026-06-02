import { AuthShell, RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Create your account"
      title="Build a digital brain that keeps ideas connected."
      description="Start with block-based notes, then let your thinking expand into a visual knowledge graph."
    >
      <RegisterForm />
    </AuthShell>
  );
}
