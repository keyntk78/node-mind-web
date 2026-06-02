'use client';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { ArrowRight, Lock, Mail, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '../api/auth.query';
import { registerSchema } from '../schemas/auth.schema';
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

export function RegisterForm() {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);
  const mutation = useRegisterMutation();

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await mutation.mutateAsync(value);
      setEmail(response.data.email);
      router.push('/otp');
    },
  });

  return (
    <Card className="max-w-md p-6 sm:p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Sign up
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Create your Node Mind account
          </h2>
          <p className="text-sm leading-6 text-slate-500">
            A clean space for notes, ideas, and next actions.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="firstName">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>First name</Label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Nguyen Van"
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

            <form.Field name="lastName">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Last name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="A"
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
          </div>

          <div className="space-y-4">
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
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
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

            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Create a password"
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
                className="w-full"
                disabled={!canSubmit || isSubmitting || mutation.isPending}
              >
                {isSubmitting || mutation.isPending ? (
                  'Registering...'
                ) : (
                  <>
                    Register
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>

        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="h-px flex-1 bg-slate-200" />
          <span>or sign up with</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <Button variant="secondary" className="w-full text-slate-900">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-sm font-bold text-slate-700 shadow-sm">
            G
          </span>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Log in
          </Link>
        </p>

        {mutation.isError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {(mutation.error as Error).message}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
