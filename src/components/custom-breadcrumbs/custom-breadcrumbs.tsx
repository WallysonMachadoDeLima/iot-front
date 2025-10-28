import { RouterLink } from '@/routes';
import { Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material';
import { RiFileList2Line } from 'react-icons/ri';

import Iconify from '../iconify';
import LinkItem from './link-item';
import { CustomBreadcrumbsProps } from './types';



export default function CustomBreadcrumbs({
  links,
  action,
  actionRouter,
  heading,
  moreLink,
  activeLast,
  sx,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links?.[links.length - 1].name;

  const ButtonActionRouter = () => {
    return (
      <Button
        component={RouterLink}
        href={actionRouter?.route || '#'}
        onClick={actionRouter?.onClick}
        variant="contained"
        startIcon={
          actionRouter?.type === 'list' ? <RiFileList2Line /> : <Iconify icon="mingcute:add-line" />
        }
        disabled={actionRouter?.disabled || false}
      >
        {actionRouter?.label}
      </Button>
    );
  };

  return (
    <Box sx={{ ...sx, mb: { xs: 3, md: 3 } }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING */}
          {heading && (
            <Typography variant="h3" gutterBottom>
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS */}
          {!!links?.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action || actionRouter ? (
          <Box sx={{ flexShrink: 0 }}>
            {' '}
            {action} {actionRouter && <ButtonActionRouter />}{' '}
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}



function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: 'text.disabled',
      }}
    />
  );
}
