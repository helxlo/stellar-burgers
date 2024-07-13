import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getApiFeeds, getOrdersFeeds } from '../../services/slices/feedsSlices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersFeeds);

  useEffect(() => {
    dispatch(getApiFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getApiFeeds())} />
  );
};
