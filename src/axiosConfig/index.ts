// import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

// 响应时间
axios.defaults.timeout = 30 * 1000;
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  (config: any) => {
    const _token = window.localStorage.getItem('cc_token') || null;
    if (_token) {
      config.headers.common['Authorization'] = _token;
    }

    //不需要loading
    const noLoading = ['/JsapiTicket'];
    if (!config.url.includes(noLoading.join(','))) {
      // store.commit("setLoading", true);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  (res: any) => {
    const { data } = res;
    const { gatewayStatus, detailedStatus } = data;
    // detailedStatus
    // 0:无意义的，防止某些序列化工具在序列化时报错;
    // 1:成功;
    // 2:失败;
    // 3:未知异常;
    // 4:参数异常;
    // 5:重复提交数据;
    // 6:配置错误;
    // 7:暂无数据;
    // 8:数据已存在;
    // 9:重复登录;
    // 10:验证码已过期或已使用;
    // 11:Token已过期;
    // 12:部分成功(操作数据时只有部分数据操作成功);
    // 13.用户不存在
    if (gatewayStatus != 1) {
      if (data.gatewayMessage && detailedStatus != 13) {
      }
    }

    //不需要loading
    const noLoading = ['/JsapiTicket'];
    if (!res.config.url.includes(noLoading.join(','))) {
      // store.commit("setLoading", false);
    }
    return res;
  },
  (error) => {
    const config = error.config;

    //不需要报错
    const noUrls = ['/JsapiTicket'];
    if (config.url.includes(noUrls.join(','))) {
      return false;
    }

    //是否重复请求
    let replayFlag = false;
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;

        case 401:
          removeToken();
          error.message = '权限丢失,重新获取中';
          break;

        case 403:
          error.message = '拒绝访问';
          break;

        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;

        case 408:
          error.message = '请求超时';
          break;

        case 500:
          error.message = '服务器内部错误';
          break;

        case 501:
          error.message = '服务未实现';
          break;

        case 502:
          error.message = '网关错误';
          break;

        case 503:
          error.message = '服务不可用';
          break;

        case 504:
          replayFlag = true;
          error.message = '网关超时';
          break;

        case 505:
          error.message = 'HTTP版本不受支持';
          break;

        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      error.message = '连接到服务器失败或超时';
    }

    return Promise.reject(error);
  },
);

function removeToken() {
  window.localStorage.removeItem('token');
  location.reload();
}
// 发送请求
export function post(url: string, params: {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (res) => {
          resolve(res.data);
        },
        (err) => {
          reject(err.data);
        },
      )
      .catch((err) => {
        reject(err.data);
      });
  });
}
export function get(url: string, params: {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 发送请求  resultful风格接口
export function resultfulPost(url: string, params: {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (res) => {
          resolve(res.data);
        },
        (err) => {
          reject(err.data);
        },
      )
      .catch((err) => {
        reject(err);
      });
  });
}
export function resultfulGet(url: string, _params: [], _params2: {}) {
  const params = _params ? `/${_params.join('/')}` : '';
  return new Promise((resolve, reject) => {
    axios
      .get(url + params, {
        params: _params2,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function resultfulPut(url: string, _params: [], _params2: {}) {
  const params = _params ? `/${_params.join('/')}` : '';
  return new Promise((resolve, reject) => {
    axios
      .put(url + params, _params2)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function resultfulDelete(url: string, id: string) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url + `/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
