import { ReactNode } from 'react';

import { useSettingsContext } from '../settings';

interface IconBedgeProps {
  color?: string;
  backgroundColor?: string | null;
  children: ReactNode;
}

const IconBedge = ({ children }: IconBedgeProps) => {
  const settings = useSettingsContext();

  return (
    <div
      style={{
        marginRight: '0.5rem',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: settings.themeMode === 'dark' ? '#ffffff' : '#212b36',
      }}
    >
      <span
        style={{
          color: settings.themeMode === 'dark' ? '#212b36' : '#ffffff',
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default IconBedge;
