'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, MailCheck, RotateCcw } from 'lucide-react';
import { useResendOtpMutation, useVerifyOtpMutation } from '../api/auth.query';
import { useAuthStore } from '../stores/auth.store';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export function OtpForm() {
  const router = useRouter();
  const email = useAuthStore((state) => state.email);
  const [code, setCode] = useState('');
  const verifyMutation = useVerifyOtpMutation();
  const resendMutation = useResendOtpMutation();

  const maskedEmail = useMemo(() => {
    if (!email) {
      return 'your email address';
    }

    const [name, domain] = email.split('@');
    if (!domain) {
      return email;
    }

    return `${name.slice(0, 2)}${'*'.repeat(Math.max(name.length - 2, 2))}@${domain}`;
  }, [email]);

  return (
    <Card className="max-w-md p-6 sm:p-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-600">
            <MailCheck className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              Verify your email
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Enter your 6-digit code
            </h2>
            <p className="text-sm leading-6 text-slate-500">
              We sent a verification code to {maskedEmail}.
            </p>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            verifyMutation.mutate(code, {
              onSuccess: () => {
                router.push('/login');
              },
            });
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="otp">Verification code</Label>
            <Input
              id="otp"
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, '').slice(0, 6))
              }
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              className="h-16 text-center text-2xl font-semibold tracking-[0.5em] sm:text-3xl"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? (
              'Verifying...'
            ) : (
              <>
                Verify
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 font-semibold text-sky-600 transition hover:text-sky-700 disabled:opacity-60"
            disabled={resendMutation.isPending || !email}
            onClick={() => resendMutation.mutate(email)}
          >
            <RotateCcw className="h-4 w-4" />
            {resendMutation.isPending ? 'Sending...' : 'Resend OTP'}
          </button>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 font-semibold text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>

        {resendMutation.isSuccess ? (
          <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
            A fresh verification code was sent.
          </div>
        ) : null}

        {verifyMutation.isError || resendMutation.isError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {((verifyMutation.error || resendMutation.error) as Error).message}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
