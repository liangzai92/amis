import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import createCommonSlice from './commonSlice';

export const store = createStore<any>((...a) => ({
  ...createCommonSlice(...a)
}));

export default store;
export function useAppStore<T>(
  selector?: (state: any) => T,
  equals?: (a: T, b: T) => boolean
) {
  return useStore(store, selector!, equals);
}
