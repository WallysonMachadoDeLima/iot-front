'use client';

import { LazyMotion, m } from 'framer-motion';
import dynamic from 'next/dynamic';



// eslint-disable-next-line import/extensions
const loadFeatures = () => import('./features.js').then((res) => res.default);

type Props = {
  children: React.ReactNode;
};

function MotionLazy({ children }: Props) {
  return (
    <LazyMotion strict features={loadFeatures}>
      <m.div style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
}

export default dynamic(() => Promise.resolve(MotionLazy), { ssr: false });
