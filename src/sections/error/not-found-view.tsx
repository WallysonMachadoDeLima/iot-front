'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';

import { PageNotFoundIllustration } from '@/assets/illustrations';
import { MotionContainer, varBounce } from '@/components/animate';
// layouts
import CompactLayout from '@/layouts/compact';
import { RouterLink } from '@/routes/components';



export default function NotFoundView() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Desculpe, página não encontrada!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Desculpe, não encontramos a página que você está procurando. Talvez você tenha digitado
            errado o URL?
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained" sx={{ mt: -5 }}>
          Tela Inicial
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
