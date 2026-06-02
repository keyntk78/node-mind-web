'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, UserRound } from 'lucide-react';
import { useRegisterMutation } from '../api/auth.query';
import { useAuthStore } from '../stores/auth.store';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export function RegisterForm() {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);

  const [fullName, setFullName] = useState('');
  const [email, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const mutation = useRegisterMutation();

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
            mutation.mutate(
              { fullName, email, password, confirmPassword },
              {
                onSuccess: (data) => {
                  setEmail(data.email);
                  router.push('/otp');
                },
              },
            );
          }}
          className="space-y-5"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Jordan Lee"
                  className="pl-11"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setLocalEmail(event.target.value)}
                  placeholder="you@nodemind.app"
                  className="pl-11"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  className="pl-11"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat your password"
                  className="pl-11"
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              'Registering...'
            ) : (
              <>
                Register
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
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
