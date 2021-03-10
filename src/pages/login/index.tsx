import { useState } from 'react';
import { useBoolean } from 'ahooks';

import './index.scss';

// banner image
import Banner from './components/banner';

// account password
import Account from './components/account';

// phone code
import Phone from './components/phone';

export default () => {
  const [loginFlag, setLoginFlag] = useState(true);

  const [imgLoad, { setTrue: setImgLoad }] = useBoolean(false);

  imgOnload();

  const Root = imgLoad && (
    <div className="body login">
      <div className="login-body">
        <div className="login-left">
          <Banner></Banner>
        </div>
        <div className="login-main">
          <div className="login-main__inner">
            <div className="login-title">矩变计划申报评审系统</div>
            <div className="login-tab">
              <div
                className={getActiveClass(loginFlag)}
                onClick={() => setLoginFlag(true)}
              >
                密码登录
              </div>
              <div
                className={getActiveClass(!loginFlag)}
                onClick={() => setLoginFlag(false)}
              >
                验证码登录
              </div>
            </div>
            <div className="login-info">
              {loginFlag ? <Account></Account> : <Phone></Phone>}
            </div>
            <div className="login-footer">
              <span>忘记密码?</span>
              <span>注册</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  //set active class
  function getActiveClass(flag: Boolean) {
    return flag ? 'login-tab__item login-tab__item--active' : 'login-tab__item';
  }

  function imgOnload() {
    let num = 0;
    [
      'https://91trial.oss-cn-shanghai.aliyuncs.com/91trialTest/f3b4c1f1cb0c4888820049f85c07bbe2.png',
    ].forEach((v, idx, arr) => {
      const img = new Image();
      img.src = v;
      img.onload = () => {
        num++;
        if (num == arr.length) {
          setImgLoad();
        }
      };
    });
  }

  return Root;
};
