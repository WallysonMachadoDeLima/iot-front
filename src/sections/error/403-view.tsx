'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';

import { ForbiddenIllustration } from '@/assets/illustrations';
import { MotionContainer, varBounce } from '@/components/animate';
// layouts
import CompactLayout from '@/layouts/compact';
import { RouterLink } from '@/routes/components';



export default function View403() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Sem permissão
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            A página que você está tentando acessar possui acesso restrito.
            <br />
            Consulte o administrador do sistema
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Tela Inicial
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
