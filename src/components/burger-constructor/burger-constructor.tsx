import { FC, useMemo, useEffect } from 'react';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  getApiBurgerOrder,
  getOrderModalDataNewOrder,
  getOrderRequestNewOrder
} from '../../services/slices/newOrderSlices';
import { getIsAuthCheckedUser } from '../../services/slices/userSlices';
import { useNavigate } from 'react-router-dom';
import { clearBurger } from '../../services/slices/burgerSlices';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((state) => state.burger);
  const orderRequest = useSelector(getOrderRequestNewOrder);
  const orderModalData = useSelector(getOrderModalDataNewOrder);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let dataNewOrder: string[] = [];
  const userIsAuth = useSelector(getIsAuthCheckedUser);

  const onOrderClick = () => {
    if (!userIsAuth) {
      navigate('/login');
    } else if (constructorItems.bun && constructorItems.ingredients) {
      dispatch(getApiBurgerOrder(dataNewOrder));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
    dispatch(clearBurger());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  useEffect(() => {
    if (constructorItems.bun && constructorItems.ingredients) {
      dataNewOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
    }
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      //key={constructorItems.ingredients.length}
    />
  );
};
