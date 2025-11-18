'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { dataTagErrorSymbol } from '@tanstack/react-query';

export default function RegisterPage() {
  const t = useTranslations('auth');

//   const schema = z
//     .object({
//       name: z.string().min(2, 'Name too short'),
//       email: z.string().email('Invalid email'),
//       password: z.string().min(6, 'Password too short'),
//       confirmPassword: z.string(),
//     })
//     .refine((data) => data.password === data.confirmPassword, {
//       message: "Passwords don't match",
//       path: ['confirmPassword'],
//     });

  const schema = z
    .object({
      name: z.string().min(3, 'Nmae too short'),
      email: z.string().email('Invalid email'),
      password: z
        .string()
        .min(7, 'Password must be at least 7 characters long'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords didnt match",
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log('Register:', data);
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{t('registerTitle')}</CardTitle>
        <CardDescription>{t('cardDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : t('signUp')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          {t('hasAccount')}{' '}
          <Link
            href="/login"
            className="font-medium underline-offset-4 hover:underline"
          >
            {t('signIn')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
