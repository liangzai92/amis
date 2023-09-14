import {message} from 'antd';

export const createAsyncAction = (fn: any) => {
  return async (...args: any[]) => {
    const [err, res] = await fn(...args);
    if (err) {
      return [err, res];
    }
    message.success('提交成功');
    return [err, res];
  };
};
