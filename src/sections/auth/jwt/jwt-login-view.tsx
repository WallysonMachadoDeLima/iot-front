'use client';

import { useState } from 'react';
import { paths } from '@/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// auth
import { useAuthContext } from '@/auth/hooks';
import { RHFFormProvider, RHFTextField } from '@/components/hook-form';
import Iconify from '@/components/iconify';
import { useBoolean } from '@/hooks/';
import { useRouter, useSearchParams } from '@/routes/hooks';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Usuário é obrigatório'),
    password: Yup.string().required('Password é obrigatório'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data?.email as string, data?.password as string);
      router.push(returnTo || paths.dashboard.root);
    } catch (error) {
      console.error(error);
      console.log(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error?.response?.data?.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h3" textAlign="center">
        IOT
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Usuário" />

      <RHFTextField
        name="password"
        label="Senha"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        ENTRAR
      </LoadingButton>
    </Stack>
  );

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </RHFFormProvider>
  );
}
