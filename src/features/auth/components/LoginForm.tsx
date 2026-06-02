'use client';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { startNavigationProgress } from '@/shared/lib/navigation-progress';
import { useForm } from '@tanstack/react-form';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../api/auth.query';
import { loginSchema } from '../schemas/auth.schema';
import { useAuthStore } from '../stores/auth.store';

function fieldError(errors: unknown[]) {
  return errors
    .map((error) =>
      typeof error === 'object' && error && 'message' in error
        ? String(error.message)
        : String(error),
    )
    .join(', ');
}

export function LoginForm() {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);
  const setSession = useAuthStore((state) => state.setSession);
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const toggleRememberMe = useAuthStore((state) => state.toggleRememberMe);
  const mutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      deviceInfo: 'Node Mind web',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await mutation.mutateAsync(value);
      setEmail(response.data.user.email);
      setSession(response.data);
      startNavigationProgress();
      router.replace('/workspace');
    },
  });

  return (
    <Card className="max-w-md p-6 sm:p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Welcome back
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Login to your workspace
          </h2>
          <p className="text-sm leading-6 text-slate-500">
            Your ideas are waiting in Node Mind.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
          className="space-y-5"
        >
          <div className="space-y-4">
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="you@nodemind.app"
                      className="pl-11"
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

            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Enter your password"
                      className="pl-11"
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
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={toggleRememberMe}
            />
            <Link
              href="/login"
              className="text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              Forgot password?
            </Link>
          </div>

          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ canSubmit, isSubmitting }) => (
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={!canSubmit || isSubmitting || mutation.isPending}
              >
                {isSubmitting || mutation.isPending ? (
                  'Signing in...'
                ) : (
                  <>
                    Login
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>

        {mutation.isError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {(mutation.error as Error).message}
          </div>
        ) : null}

        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="h-px flex-1 bg-slate-200" />
          <span>or continue with</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <Button
          variant="secondary"
          className="w-full text-slate-900 cursor-pointer"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-sm font-bold text-slate-700 shadow-sm">
            G
          </span>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-slate-600">
          New to Node Mind?{' '}
          <Link
            href="/register"
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Create an account
          </Link>
        </p>
      </div>
    </Card>
  );
}
