import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../src/context/authContext';
import Loader from '../../src/components/UI/Loader';
import OrderContainer from '../../src/components/order/OrderContainer';

const OrdersPage = () => {
  const { loading, authUser } = useAuth();
  const [orders, setOrders] = useState();
  const uid = authUser ? authUser.uid : '';

  const URL = `${process.env.NEXT_PUBLIC_URL}/order/${uid}`;
  const { data } = useSWR(uid ? URL : null, url =>
    fetch(url).then(res => res.json())
  );

  useEffect(() => {
    if (data && data.orders) setOrders(data.orders);
  }, [data]);

  return !loading && orders ? <OrderContainer orders={orders} /> : <Loader />;
};

export default OrdersPage;
