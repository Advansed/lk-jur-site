import { useEffect } from 'react';
import { getData } from '../Store';
import { useLoginStore } from '../Login/loginStore';
import { useServicesStore } from './servicesStore';

export function getLoginToken(): string | undefined {
  return useLoginStore.getState().login?.token;
}

export async function loadServices(loginOverride?: any): Promise<void> {
  const login = loginOverride ?? useLoginStore.getState().login;
  const { setServices } = useServicesStore.getState();

  if (!login?.token) {
    setServices([]);
    return;
  }

  const res = await getData('jur_services', {
    token: login.token,
  });

  if (!res.error) {
    setServices(res.data ?? []);
  } else {
    setServices([]);
  }
}

export async function submitService(order: any): Promise<any> {
  const payload = {
    ...order,
    token: getLoginToken(),
  };
  return getData('jur_service', payload);
}

export const useServices = () => {
  const services = useServicesStore((state) => state.services);
  const login = useLoginStore((state) => state.login);

  useEffect(() => {
    if (login?.token) {
      loadServices(login);
    }
  }, [login]);

  return {
    services,
    loadServices,
    submitService,
    getLoginToken,
  };
};
