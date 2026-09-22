import { useLoginStore } from './loginStore';
import { getData } from '../Store';
import { version } from '../Store';
import { loadDogs } from '../Agreements/useAgreements';
import { useAgreementsStore } from '../Agreements/agreementsStore';
import { loadApps } from '../Apps/useApps';
import { useAppsStore } from '../Apps/appsStore';
import { loadServices } from '../Services/useServices';
import { useServicesStore } from '../Services/servicesStore';
import { loadProfile } from '../Profile/useProfile';
import { useProfileStore } from '../Profile/profileStore';
import { loadInvoicesAndDocs } from '../ActSverki/useActSverki';
import { useActSverkiStore } from '../ActSverki/actSverkiStore';
import { loadContacts } from '../Contacts/useContacts';
import { useContactsStore } from '../Contacts/contactsStore';
import { useInfoStore } from '../Info/infoStore';

export const useLogin = () => {
  const { 
    auth, 
    reg, 
    login, 
    token, 
    setAuth, 
    setReg, 
    setLogin, 
    setToken, 
    logout: resetLogin,
  } = useLoginStore();

  const authenticate = async (loginData: { login: string; password: string }) => {
    try {
      const res = await getData("jur_login", {
        ...loginData,
        version,
        mode: "android"
      });

      if (!res.error) {
        localStorage.setItem("stngjur.phone", loginData.login);
        localStorage.setItem("stngjur.pass", loginData.password);
        
        setLogin(res.data);
        setToken(res.data?.token || null);
        setAuth(true);
        await Promise.all([
          loadDogs(res.data),
          loadApps(res.data),
          loadServices(res.data),
          loadProfile(res.data),
          loadInvoicesAndDocs(res.data),
          loadContacts(),
        ]);
        
        return { success: true, data: res.data };
      } else {
        return { success: false, error: res.message };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка при авторизации' };
    }
  };

  const logout = () => {
    resetLogin();
    useAgreementsStore.getState().reset();
    useAppsStore.getState().reset();
    useServicesStore.getState().reset();
    useProfileStore.getState().reset();
    useActSverkiStore.getState().reset();
    useContactsStore.getState().reset();
    useInfoStore.getState().reset();
  };

  const showRegistration = () => {
    setReg(true);
  };

  const showAuthorization = () => {
    setReg(false);
  };

  return {
    auth,
    reg,
    login,
    token,
    setAuth,
    setReg,
    setLogin,
    setToken,
    authenticate,
    logout,
    showRegistration,
    showAuthorization,
  };
};
