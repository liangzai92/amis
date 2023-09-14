import {StateCreator} from 'zustand/vanilla';
import {SYSTEM_LID} from '@/constants';

const initialState: any = {
  singlePlayingMeida: null, // 全局单例 音频播放器
  singleMeidaPlayer: null, // 全局单例 单个音频播放器
  staticConfig: {},
  // app
  appInited: false,
  isLogin: false,
  userInfo: {
    work_code: '',
    name: ''
  },
  isBlackUser: false,
  popupInfo: {
    show: false
  },
  projectConfig: {
    systemLid: SYSTEM_LID, // 权限平台id
    title: '内容管理平台',
    logo: 'https://static0.saasz.vdyoo.com/bcc-mall/quality-app/xiwang-logo.png'
  },
  businessData: {},
  authTree: [],
  authMap: {},
  authList: []
};

export const createCommonSlice: StateCreator<any> = (set, get) => ({
  ...initialState,
  initAction: async () => {
    console.log('appInited');
    set({appInited: true});
  }
});

export default createCommonSlice;
