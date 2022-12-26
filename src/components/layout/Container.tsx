import React from 'react';
import { Sheet } from '@mui/joy';

interface ISheetProps {
  children: React.ReactNode;
  width: number;
}
const Container: React.FC<ISheetProps> = ({ children, width }: ISheetProps) => {
  return (
    <Sheet
      sx={{
        width,
        textAlign: 'left',
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      variant="outlined"
    >
      {children}
    </Sheet>
  );
};
export default Container;
