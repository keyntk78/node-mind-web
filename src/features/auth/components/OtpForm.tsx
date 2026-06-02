'use client';

import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MailCheck,
  RotateCcw,
} from 'lucide-react';
import { useResendOtpMutation, useVerifyOtpMutation } from '../api/auth.query';
import { otpSchema } from '../schemas/auth.schema';
import { useAuthStore } from '../stores/auth.store';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

function fieldError(errors: unknown[]) {
  return errors
    .map((error) =>
      typeof error === 'object' && error && 'message' in error
        ? String(error.message)
        : String(error),
    )
    .join(', ');
}

export function OtpForm() {
  const email = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setSession = useAuthStore((state) => state.setSession);
  const verifyMutation = useVerifyOtpMutation();
  const resendMutation = useResendOtpMutation();

  const form = useForm({
    defaultValues: {
      email,
      otp: '',
    },
    validators: {
      onSubmit: otpSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await verifyMutation.mutateAsync(value);
      setEmail(response.data.user.email);
      setSession(response.data);
    },
  });

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
              We sent a verification code to your email address.
            </p>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                      setEmail(event.target.value);
                    }}
                    placeholder="you@nodemind.app"
                    className="pl-11"
                    required
                  />
                </div>
                {field.state.meta.errors.length ? (
                  <p className="text-sm text-rose-600">
                    {fieldError(field.state.meta.errors)}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="otp">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Verification code</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(
                      event.target.value.replace(/\D/g, '').slice(0, 6),
                    )
                  }
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  className="h-16 text-center text-2xl font-semibold tracking-[0.5em] sm:text-3xl"
                  required
                />
                {field.state.meta.errors.length ? (
                  <p className="text-sm text-rose-600">
                    {fieldError(field.state.meta.errors)}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => ({
              currentEmail: state.values.email,
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ currentEmail, canSubmit, isSubmitting }) => (
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    !canSubmit || isSubmitting || verifyMutation.isPending
                  }
                >
                  {isSubmitting || verifyMutation.isPending ? (
                    'Verifying...'
                  ) : (
                    <>
                      Verify
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-sky-600 transition hover:bg-white/60 hover:text-sky-700 disabled:opacity-60"
                  disabled={resendMutation.isPending || !currentEmail}
                  onClick={() => {
                    resendMutation.mutate({ email: String(currentEmail) });
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  {resendMutation.isPending ? 'Sending...' : 'Resend OTP'}
                </button>
              </div>
            )}
          </form.Subscribe>
        </form>

        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        {verifyMutation.isSuccess ? (
          <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
            Email verified successfully. Session tokens are stored in the auth
            store.
          </div>
        ) : null}

        {resendMutation.isSuccess ? (
          <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
            Verification OTP resent. It expires in{' '}
            {resendMutation.data.data.expiresIn} seconds.
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
