/**
 * 事件监听对象
 */
class Event {
    /**
     * 构造函数
     * 事件管理器
     * @memberof Event
     */
    constructor() {
        this.__list = {};
    }
    /**
     * 有没有指定类型的事件正在监听
     * @param {string} type 事件类型
     */
    hasType(type) {
        if (this.__list.hasOwnProperty(type) && this.__list[type].length > 0) {
            return true;
        }
        return false;
    }
    /**
     * 绑定事件
     *
     * @param {string} type 事件类型
     * @param {function} fn 回调函数
     * @memberof EventTarget
     */
    on(type, fn) {
        if (!this.__list.hasOwnProperty(type)) {
            this.__list[type] = [];
        }
        this.__list[type].push(fn);
    }
    one(type, fn) {
        let a = (...arg) => {
            this.off(type, a);
            fn.call(this,...arg);
        }
        this.on(type, a);
    }
    /**
     *触发指定的事件
     *
     * @param {string} type 事件类型
     * @param {function} event 回调的参数
     * @memberof EventTarget
     */
    trigger(type, ...arg) {
        if (this.__list.hasOwnProperty(type)) {
            this.__list[type].map(val => {
                val.call(this, ...arg);
            })
        }
    }
    /**
     * 清除指定的事件
     *
     * @param {string} type 事件类型
     * @param {function} fn 回调函数
     * @memberof EventTarget
     */
    off(type, fn) {
        if (!fn) {
            if (this.__list.hasOwnProperty(type)) {
                this.__list[type] = [];
            }
        } else {
            if (this.__list.hasOwnProperty(type)) {
                this.__list[type] = this.__list[type].filter(val => {
                    return val !== fn;
                })
            }
        }
    }
}
export default Event;
