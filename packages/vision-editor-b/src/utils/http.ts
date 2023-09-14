// import { login } from '@/components/Login'
import {tryCatchWrapper} from '@vision/core/utils/tryCatchWrapper';
import {request} from '@vision/core/utils/http';
import store from '../store';

const goLogin = () => {
  // store.setState({ isLogin: false })
  // login().then(() => {
  //   window.location.reload()
  // })
};

export const get = async (...args: any[]) => {
  const [err, res]: any = await tryCatchWrapper(request.get)(...args);
  if (err && err?.code === 1003) {
    goLogin();
  }
  return [err, res];
};

export const post = async (...args: any[]) => {
  const [err, res]: any = await tryCatchWrapper(request.post)(...args);
  if (err && err?.code === 1003) {
    goLogin();
  }
  return [err, res];
};

export const patch = async (...args: any[]) => {
  const [err, res]: any = await tryCatchWrapper(request.patch)(...args);
  if (err && err?.code === 1003) {
    goLogin();
  }
  return [err, res];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const getUrl = (path: string) => {
  return API_BASE_URL + path;
};
