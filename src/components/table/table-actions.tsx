import React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { LoadingButton } from '@mui/lab';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useFormContext } from 'react-hook-form';

import { ConfirmDialog } from '../custom-dialog';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

interface ICommomActions {
  tooltip?: string;
  icon?: any;
  color?: string;
  onClick?: () => void;
  render?: boolean;
  disabled?: boolean;
}

interface OtherActions extends ICommomActions {
  disableTouchRipple?: boolean;
}

interface PropsDelete extends ICommomActions {
  dialog?: {
    title?: string;
    content?: string | React.ReactNode;
    nameItem: string;
    nameModel: string;
    textConfirm?: string;
    onClick: () => void;
  };
}

interface PropsViewer extends ICommomActions {}

interface PropsEdit extends ICommomActions {}

interface Props {
  row: any;
  viewer?: PropsViewer;
  edit?: PropsEdit;
  deleter?: PropsDelete;
  startOtherActions?: OtherActions[];
  endOtherActions?: OtherActions[];
  disabledAll?: boolean;
}
export function TableActions({
  row,
  viewer,
  edit,
  deleter,
  startOtherActions,
  endOtherActions,
  disabledAll,
}: Props) {
  const { watch, setValue } = useFormContext();
  const { confirm, currentRow, loading } = watch();

  return (
    <>
      {startOtherActions?.map((item) => {
        if (item?.render ?? true) {
          return (
            <Tooltip key={item?.tooltip} title={item?.tooltip}>
              <IconButton
                disabled={disabledAll || item?.disabled || false}
                sx={{
                  color: item?.color || 'default',
                  opacity: disabledAll || item?.disabled || false ? 0.5 : 1,
                  mr: -1,
                }}
                onClick={item?.onClick}
                disableTouchRipple={item?.disableTouchRipple || false}
              >
                {item?.icon}
              </IconButton>
            </Tooltip>
          );
        }
      })}

      {(viewer?.render ?? true) && viewer && Object.keys(viewer).length > 0 ? (
        <Tooltip title={viewer?.tooltip || 'Visualizar'}>
          <IconButton
            color="default"
            onClick={viewer?.onClick}
            disabled={viewer?.disabled || disabledAll}
            sx={{
              opacity: viewer?.disabled || disabledAll ? 0.5 : 1,
              mr: -1,
            }}
          >
            {viewer?.icon || <RemoveRedEyeIcon color="secondary" sx={{ fontSize: '1.3rem' }} />}
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}

      {(edit?.render ?? true) && edit && Object.keys(edit).length > 0 ? (
        <Tooltip title={edit?.tooltip || 'Editar'}>
          <IconButton
            color="default"
            onClick={edit?.onClick}
            disabled={edit?.disabled || disabledAll}
            sx={{
              opacity: edit?.disabled || disabledAll ? 0.5 : 1,
              mr: -1,
            }}
          >
            {edit?.icon || <Iconify icon="solar:pen-bold" />}
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}

      {(deleter?.render ?? true) && deleter && Object.keys(deleter).length > 0 ? (
        <Tooltip title={deleter?.tooltip || 'Deletar'}>
          <IconButton
            color="default"
            onClick={
              deleter?.onClick
                ? deleter?.onClick
                : () => {
                    setValue('confirm', true);
                    setValue('currentRow', row);
                  }
            }
            disabled={deleter?.disabled || disabledAll}
            sx={{
              opacity: deleter?.disabled || disabledAll ? 0.5 : 1,
              mr: -1,
            }}
          >
            {deleter?.icon || <Iconify icon="solar:trash-bin-trash-bold" />}
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}

      {deleter?.dialog && (
        <ConfirmDialog
          open={confirm}
          onClose={() => setValue('confirm', false)}
          title={deleter?.dialog?.title || 'Deletar'}
          content={
            deleter?.dialog?.content ? (
              deleter?.dialog?.content
            ) : (
              <>
                Deseja {deleter?.dialog?.title?.toLocaleLowerCase() || 'deletar'} o item{' '}
                <strong>{currentRow?.[deleter.dialog.nameItem]}</strong> de{' '}
                {deleter?.dialog?.nameModel}?
              </>
            )
          }
          action={
            <LoadingButton
              variant="contained"
              color="error"
              onClick={deleter?.dialog?.onClick}
              loading={loading}
            >
              {deleter?.dialog?.textConfirm || 'Sim, deletar'}
            </LoadingButton>
          }
        />
      )}

      {endOtherActions?.map((item: any) => {
        if (item?.render ?? true) {
          return (
            <Tooltip key={item?.tooltip} title={item?.tooltip}>
              <IconButton
                disabled={disabledAll || item?.disabled || false}
                sx={{
                  color: item?.color || 'default',
                  opacity: disabledAll || item?.disabled || false ? 0.5 : 1,
                  mr: -1,
                }}
                onClick={item?.onClick}
                disableTouchRipple={item?.disableTouchRipple || false}
              >
                {item?.icon}
              </IconButton>
            </Tooltip>
          );
        }
      })}
    </>
  );
}
