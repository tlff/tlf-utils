let data = {};
let events = {};
let copyProperty = function (target, source) {
    let keys = Reflect.ownKeys(source);
    for (const key of keys) {
        if (key != "construct" && key != "prototype" && key != "name") {
            let descriptor = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(target, key, descriptor);
        }
    }
}
export default class baseClass {
    constructor(...args) {
        data[this] = {};
        events[this] = {};
        this.call(this.init, ...args);
        return this;
    }
    /**
     * 替代子类的构造函数,
     * 提示:子类不能再实现构造函数
     * @param {*} args 
     */
    init() {

    }
    /**
     * 用来实现多重继承,以自己为主体将其他类混合到自己里面,相当于自己是最右面的那个.优先级从左往右递增,右面的会覆盖左面的
     * @param {object} classes 类
     */
    static mixin(...classes) {
        class a { }
        classes.push(this);
        for (const cs of classes) {
            copyProperty(a, cs);
            copyProperty(a.prototype, cs.prototype);
        }
        return a;
    }
    /**
     * 用来实现多重继承.优先级从左往右递增,右面的会覆盖左面的
     * @param {object} classes 类
     */
    static mix(...classes){
        class a{}
        for (const cs of classes) {
            copyProperty(a, cs);
            copyProperty(a.prototype, cs.prototype);    
        }
        return a;
    }
    /**
     * 用来实现多重继承,将自己混合到其他对象中,相当于自己是左面第一个.优先级从左往右递增,右面的会覆盖左面的
     * @param {object} classes 
     */
    static mixto(...classes) {
        class a { }
        classes.unshift(this);
        for (const cs of classes) {
            copyProperty(a, cs);
            copyProperty(a.prototype, cs.prototype);
        }
        return a;
    }
    /**
     * 根据键值获取数据
     * @param {mix} key 数据的键值,可以通过`.`分割获取子对象 比如 .get(a.b.c) => get(a).b.c
     */
    get(key) {
        let target = data[this];
        if (key.indexOf(".") === -1) {
            return target[key];
        }
        let nodes = key.split(".").filter(val => val && val != "");
        if (nodes.length === 0) return;
        for (const node of nodes) {
            if (typeof target != "object" || !target[node]) return;
            target = target[node];
        }
        return target;
    }
    /**
     * 保存数据
     *
     * @param {string} key 数据的键值,可以是用`.`分割的字符串,比如 .set(a.b.c,val)=>.set(a).b.c=val
     * @param {mix} val 需要保存的数据
     * @param {boolean} [notify=true] 是否触发数据变化事件
     * @returns this
     * @memberof baseClass
     */
    set(key, val, notify = true) {
        let target = data[this];
        if(typeof key !=="string") {
            throw new Error("键必须是字符串");
        }
        if (key.indexOf(".") === -1) {
            target[key] = val;
            if (notify) {
                this.trigger("change:" + key, val);
            }
            return this;
        }
        
        let nodes = key.split(".").filter(val => val && val != "");
        if (!nodes.length) return;
        let last=nodes.pop();
        for (const node of nodes) {
            if (typeof target !== "object") return;
            if (!target[node]) target[node] = {};
            target = target[node];
        }
        target[last] = val;
        if(notify){
            nodes.push(last);
            let ev="change:"+nodes.shift();
            this.trigger(ev,val);
            nodes.forEach(n=>{
                ev=ev+"."+n;
                this.trigger(ev,val);
            })     
        }
        return this;
    }
    /**
     * 绑定事件,而且能够根据事件的排序从小到大开始触发
     *
     * @param {string} evts 需要监听的事件 可以用" "(空格)分割监听多个事件
     * @param {function} fn 回调函数
     * @param {number} [order=10] 监听事件的优先级,数字越小越早触发
     * @returns this
     * @memberof baseClass
     */
    on(evts, fn, order = 10) {
        if (!events[this]) events[this] = {};
        let target = events[this];
        evts = evts.split(" ");
        if (evts.length === 0) return;
        evts.forEach(evt => {
            if (!target[evt]) target[evt] = {};
            let nodes = target[evt];
            if (!nodes[order]) nodes[order] = [];
            let node = nodes[order];
            if (node.indexOf(fn) === -1) node.push(fn);
        });
        return this;
    }
    /**
     * 分发事件
     *
     * @param {string} evt 要触发的事件
     * @param {mix} args 事件的参数
     * @returns void
     * @memberof baseClass
     */
    trigger(evt, ...args) {
        let target = events[this][evt];
        if (!target) return;
        let orders = Object.keys(target);
        if (orders.length === 0) return;
        orders.sort((a, b) => a - b);
        let fn = [];
        orders.forEach(order => {
            fn = [...fn, ...target[order]];
        })
        fn.forEach(val => {
            if (typeof val === "function") {
                val(...args);
            }
        })
    }
    /**
     * 删除对指定事件的监听
     *
     * @param {string} evt 事件类型
     * @param {mix} fn 处理事件的方法,如果没有指定方法会删除所有`evt`事件的监听
     * @returns void
     * @memberof baseClass
     */
    off(evt, fn) {
        if (!fn) {
            events[this][evt] = {};
            return this;
        }
        let target = events[this][evt];
        let orders = Object.keys(target);
        if (orders.length === 0) return;
        orders.sort((a, b) => a - b);
        orders.forEach(order => {
            let node = target[order];
            let index = node.indexOf(fn);
            if (index > -1) { node.splice(index, 1) }
            if (node.length == 0) { delete target[order] }
        })
        return this;
    }
    /**
     * 用来调用私有方法让私有方法里面的`this`可以访问到对象里面的属性
     *
     * @param {*} fn 要调用的方法
     * @param {*} args 调用方法的参数
     * @returns this
     * @memberof baseClass
     */
    call(fn, ...args) {
        fn.apply(this, args);
        return this;
    }
}