import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getApiOrders } from '../../services/slices/orderSlices';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
