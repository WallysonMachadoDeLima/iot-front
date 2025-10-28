'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';

import { SeverErrorIllustration } from '@/assets/illustrations';
import { MotionContainer, varBounce } from '@/components/animate';
// layouts
import CompactLayout from '@/layouts/compact';
import { RouterLink } from '@/routes/components';



export default function Page500() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            500 Erro Interno do Servidor
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Houve um erro, por favor tente novamente mais tarde.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Tela Inicial
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
