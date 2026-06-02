'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useLoginMutation } from '../api/auth.query';
import { useAuthStore } from '../stores/auth.store';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export function LoginForm() {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const toggleRememberMe = useAuthStore((state) => state.toggleRememberMe);

  const [email, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useLoginMutation();

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
            mutation.mutate(
              { email, password },
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
                  placeholder="Enter your password"
                  className="pl-11"
                  required
                />
              </div>
            </div>
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

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              'Signing in...'
            ) : (
              <>
                Login
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="h-px flex-1 bg-slate-200" />
          <span>or continue with</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <Button variant="secondary" className="w-full text-slate-900">
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

        {mutation.isError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {(mutation.error as Error).message}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
