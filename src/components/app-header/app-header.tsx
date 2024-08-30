import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getNameUser } from '../../services/slices/userSlices';

export const AppHeader: FC = () => {
  const userName = useSelector(getNameUser);
  return <AppHeaderUI userName={userName} />;
};
