'use client';

// auth
import { GuestGuard } from '@/auth/guard';
import AuthModernCompactLayout from '@/layouts/auth/modern-compact';



type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthModernCompactLayout>{children}</AuthModernCompactLayout>
    </GuestGuard>
  );
}
