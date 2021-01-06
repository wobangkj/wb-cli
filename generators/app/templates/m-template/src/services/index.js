const dpr = window.devicePixelRatio || 1;

// eslint-disable-next-line no-nested-ternary
export const DPR = dpr >= 3 ? 3 : dpr >= 2 ? 2 : 1;

let PRO_API = './'; // 生产地址

if (process.env.NODE_ENV === 'development') {
    PRO_API = 'http://47.100.88.253/<%= title %>/'; // 开发地址
}

export const ROOT_PRO_API = PRO_API;

export const ASSET_PREFIX = `${ROOT_PRO_API}images/${DPR}x/`; // 图片资源

export const GENERAL_PREFIX = `${ROOT_PRO_API}general/`; // general图片资源
