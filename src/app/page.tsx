'use client';

import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';



export default function HomePage() {
  const router = useRouter();

  return router.push(paths.dashboard.root);
}
