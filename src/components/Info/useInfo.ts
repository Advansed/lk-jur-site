import { getData } from '../Store';
import { useInfoStore } from './infoStore';

export async function loadTemplate1(): Promise<string | null> {
  const { template1, setTemplate1 } = useInfoStore.getState();
  if (template1) return template1;

  const res = await getData('jur_template1', {});
  if (!res.error) {
    setTemplate1(res.data);
    return res.data;
  }
  return null;
}

export const useInfo = () => {
  const page = useInfoStore((state) => state.page);
  const setPage = useInfoStore((state) => state.setPage);
  const template1 = useInfoStore((state) => state.template1);

  return {
    page,
    setPage,
    template1,
    loadTemplate1,
  };
};
