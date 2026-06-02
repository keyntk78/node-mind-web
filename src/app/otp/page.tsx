import { AuthShell, OtpForm } from '@/features/auth';

export default function OtpPage() {
  return (
    <AuthShell
      eyebrow="Email verification"
      title="Verify your email to unlock Node Mind."
      description="Confirm your identity before entering the workspace where notes, blocks, and graph connections stay protected."
    >
      <OtpForm />
    </AuthShell>
  );
}
