import { useEffect } from 'react';
import { getData } from '../Store';
import { useLoginStore } from '../Login/loginStore';
import { useAppsStore } from './appsStore';

export function getLoginToken(): string | undefined {
  return useLoginStore.getState().login?.token;
}

export async function loadApps(loginOverride?: any): Promise<void> {
  const login = loginOverride ?? useLoginStore.getState().login;
  const { setApps } = useAppsStore.getState();

  if (!login) {
    setApps([]);
    return;
  }

  const res = await getData('jur_history', login);
  if (!res.error) {
    setApps(res.data || []);
  } else {
    setApps([]);
  }
}

export async function loadHistoryFiles(id: string): Promise<any> {
  const res = await getData('jur_history_files', {
    token: getLoginToken(),
    id,
  });
  return res;
}

export async function saveHistoryFile(params: {
  id: string;
  name: string;
  files: any[];
}): Promise<any> {
  return getData('jur_history_files', {
    token: getLoginToken(),
    ...params,
  });
}

export async function uploadAppFiles(params: {
  id: string;
  files: any;
}): Promise<any> {
  return getData('jur_sfiles', {
    token: getLoginToken(),
    ...params,
  });
}

export const useApps = () => {
  const apps = useAppsStore((state) => state.apps);
  const login = useLoginStore((state) => state.login);

  useEffect(() => {
    if (login) {
      loadApps(login);
    }
  }, [login]);

  return {
    apps,
    loadApps,
    loadHistoryFiles,
    saveHistoryFile,
    uploadAppFiles,
    getLoginToken,
  };
};
