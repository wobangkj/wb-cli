/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  prefix: '/api/v1/',
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// 适配倔强后端不改分页中间件
request.use(async (ctx, next) => {
  const { req } = ctx;
  const {
    options: { method, params, headers },
  } = req;

  headers.token = sessionStorage.getItem('_TOKEN');

  if (method.toLocaleLowerCase() === 'get') {
    if (params.current !== undefined) {
      params.clientPage = params.current;
      delete params.current;
    }
    if (params.pageSize !== undefined) {
      params.everyPage = params.pageSize;
      delete params.pageSize;
    }
  }
  await next();

  if (method.toLocaleLowerCase() === 'get') {
    const { res } = ctx;
    // 又返回数据且有分页入参才处理数据格式
    if (res.data && res.pager) {
      // 根据返回结果适配protable格式 { data:[],current:1,pageSize:10,total:100}
      const {
        data,
        // eslint-disable-next-line camelcase
        pager: { client_page, every_page, total_num },
      } = res;

      // eslint-disable-next-line camelcase
      res.current = client_page;
      // eslint-disable-next-line camelcase
      res.pageSize = every_page;
      res.total = window.parseInt(total_num, 10);
      res.data = data;
    }
  }
});

export default request;
