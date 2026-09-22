import { useEffect } from 'react';
import { getData } from '../Store';
import { useLoginStore } from '../Login/loginStore';
import { useProfileStore } from './profileStore';

export function getLoginToken(): string | undefined {
  return useLoginStore.getState().login?.token;
}

export async function loadProfile(loginOverride?: any): Promise<void> {
  const login = loginOverride ?? useLoginStore.getState().login;
  const { setProfile } = useProfileStore.getState();

  if (!login) {
    setProfile(null);
    return;
  }

  const res = await getData('jur_profile1', login);
  if (!res.error) {
    setProfile(res.data ?? null);
  } else {
    setProfile(null);
  }
}

export const useProfile = () => {
  const profile = useProfileStore((state) => state.profile);
  const login = useLoginStore((state) => state.login);

  useEffect(() => {
    if (login) {
      loadProfile(login);
    }
  }, [login]);

  return {
    profile,
    loadProfile,
    getLoginToken,
  };
};
