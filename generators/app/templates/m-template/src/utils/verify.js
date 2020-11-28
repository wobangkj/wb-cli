/* eslint-disable */
import { Toast } from 'antd-mobile';

/**
 *
 *
 * 表单校验 支持链式调用 使用
 * new Verify()
 * .required(username,'用户名')
 * .required(password,'密码')
 *
 * @export
 * @class Verify
 */
export default class Verify {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._isOne = false;
    this.EMPTY_STRING_REGEXP = /^\s*$/;
  }

  isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  // Returns false if the object is not a function
  isFunction(value) {
    return typeof value === 'function';
  }

  // A simple check to verify that the value is an integer. Uses `isNumber`
  // and a simple modulo check.
  isInteger(value) {
    return this.isNumber(value) && value % 1 === 0;
  }

  // Checks if the value is a boolean
  isBoolean(value) {
    return typeof value === 'boolean';
  }

  // Uses the `Object` function to check if the given argument is an object.
  isObject(obj) {
    return obj === Object(obj);
  }

  // Simply checks if the object is an instance of a date
  isDate(obj) {
    return obj instanceof Date;
  }

  // Returns false if the object is `null` of `undefined`
  isDefined(obj) {
    return obj !== null && obj !== undefined;
  }

  // Checks if the given argument is a promise. Anything with a `then`
  // function is considered a promise.
  isPromise(p) {
    return !!p && this.isFunction(p.then);
  }

  isString(value) {
    return typeof value === 'string';
  }

  isArray(value) {
    return {}.toString.call(value) === '[object Array]';
  }
  /**
   *
   * @description 验证是否必填
   * @param {*} val 验证值
   * @param {string} text 验证未通过提示语
   * @param {true} [isCondition=true] 验证的先决条件
   * @param {string} [fullText] 自定义提示
   * @returns
   * @memberof Verify
   */

  required(val, text, isCondition = true, fullText) {
    // 先决条件为false直接通过本次验证
    if (!isCondition) {
      return this;
    }
    // 如果前面有未验证通过的函数，则直接终止本次验证

    // eslint-disable-next-line no-underscore-dangle
    if (this._isOne) return this;
    let attr;

    // Null and undefined are empty
    if (!this.isDefined(val)) {
      this.isPass = false;
    }

    // functions are non empty
    if (this.isFunction(val)) {
      this.isPass = true;
    }

    // Whitespace only strings are empty
    if (this.isString(val)) {
      this.isPass = !this.EMPTY_STRING_REGEXP.test(val);
    }

    // For arrays we use the length property
    if (this.isArray(val)) {
      this.isPass = val.length !== 0;
    }

    // Dates have no attributes but aren't empty
    if (this.isDate(val)) {
      this.isPass = true;
    }

    if (this.isBoolean(val)) {
      this.isPass = val;
    }

    if (this.isInteger(val)) {
      this.isPass = val !== 0;
    }

    // If we find at least one property we consider it non empty
    if (this.isObject(val)) {
      (() => {
        // eslint-disable-next-line
        for (attr in val) {
          // eslint-disable-next-line
          return (this.isPass = true);
        }
        // eslint-disable-next-line
        return (this.isPass = false);
      })();
    }

    if (!this.isPass) {
      // eslint-disable-next-line
      this._isOne = true;
      Toast.info(fullText || `${text}不能为空!`, 3, null, false);
    }
    return this;
  }

  /**
   * @description 验证手机格式是否正确
   * @param { object } that 当前this作用域
   * @param { string } 验证值
   * @param { string } text 验证未通过提示语
   *
   */
  verifyPhone(val, text) {
    // 如果前面有未验证通过的函数，则直接终止本次验证
    // eslint-disable-next-line no-underscore-dangle
    if (this._isOne) return this;

    if (!val || !/^1[2,3,4,5,6,7,8,9]\d{9}$/.test(val)) {
      this.isPass = false;
      // eslint-disable-next-line no-underscore-dangle
      this._isOne = true;
      Toast.info(`${text || '手机号码'}格式错误!`, 3, null, false);
    } else {
      this.isPass = true;
    }
    return this;
  }

  /**
   * @description 验证邮箱格式是否正确
   * @param { object } that当前this作用域
   * @param { string } 验证值
   * @param { string } text 验证未通过提示语
   *
   */
  verifyEmail(val, text) {
    // 如果前面有未验证通过的函数，则直接终止本次验证
    // eslint-disable-next-line no-underscore-dangle
    if (this._isOne) return this;

    // eslint-disable-next-line no-useless-escape
    if (!val || !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(val)) {
      this.isPass = false;
      // eslint-disable-next-line no-underscore-dangle
      this._isOne = true;
      Toast.info(`${text || '邮箱'}格式错误!`, 3, null, false);
    } else {
      this.isPass = true;
    }
    return this;
  }

  /**
   * @description 验证身份证格式是否正确
   * @param { object } that当前this作用域
   * @param { string } 验证值
   * @param { string } text 验证未通过提示语
   *
   */
  verifyIdcard(val, text) {
    // 如果前面有未验证通过的函数，则直接终止本次验证
    // eslint-disable-next-line no-underscore-dangle
    if (this._isOne) return this;

    // eslint-disable-next-line no-useless-escape
    if (
      !val ||
      !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
        val,
      )
    ) {
      this.isPass = false;
      // eslint-disable-next-line no-underscore-dangle
      this._isOne = true;
      Toast.info(`${text || '身份证'}格式错误!`, 3, null, false);
    } else {
      this.isPass = true;
    }
    return this;
  }

  /**
   * @description 验证时间格式是否正确
   * @param { object } that当前this作用域
   * @param { string } 验证值
   * @param { string } text 验证未通过提示语
   *
   */
  verifyDate(val, text) {
    // 如果前面有未验证通过的函数，则直接终止本次验证
    // eslint-disable-next-line no-underscore-dangle
    if (this._isOne) return this;

    if (!val || new Date(val).toString() === 'Invalid Date') {
      this.isPass = false;
      // eslint-disable-next-line no-underscore-dangle
      this._isOne = true;
      Toast.info(`${text || '日期'}格式错误!`, 3, null, false);
    } else {
      this.isPass = true;
    }
    return this;
  }
  /**
   * @description 验证成功后回调方法
   * @param { callback } 回调函数
   *
   */

  success(cb) {
    if (this.isPass) {
      // eslint-disable-next-line no-unused-expressions
      cb && cb();
    }
    return this;
  }

  /**
   * @description 验证失败后回调方法
   * @param { callback } 回调函数
   *
   */

  fail(cb) {
    if (!this.isPass) {
      // eslint-disable-next-line no-unused-expressions
      cb && cb();
    }
    return this;
  }

  /**
   * @description 无论成功与否都执行=的回调方法
   * @param { callback } 回调函数
   *
   */

  complete(cb) {
    if (this.isPass) {
      // eslint-disable-next-line no-unused-expressions
      cb && cb();
    }
    return this;
  }
}
