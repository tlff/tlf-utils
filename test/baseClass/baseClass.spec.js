import baseClass from "../../src/js/baseClass";
import { expect } from "chai";
class a{
    constructor(){

    }
    say() {
        return "aaa";
    }    
}
class b{
    constructor(){
    }
    say() {
        return "bbb";
    }      
}
class c extends baseClass{
    say(){
        return "ccc";
    }    
}
class d extends baseClass.mixin(a,b,c){
    
}
class e extends baseClass.mixto(a,b,c){
      
}
class f extends baseClass.mix(a, b, c) {

}
describe('类继承顺序测试', function () {
    let d1=new d();
    let e1 = new e();
    let f1 = new f();
    it('mixin(a,b,c)', function () {
        var result = d1.say();
        expect(result).to.equal("ccc");
    });
    it('mixto(a,b,c)', function () {
        var result = e1.say();
        expect(result).to.equal("ccc");
    });
    it('mix(a,b,c)', function () {
        var result = f1.say();
        expect(result).to.equal("ccc");
    });
});
describe("测试存取数据",()=>{
    let c1=new c();
    it("get('a')=2",()=>{
        c1.set('a', 2);
        expect(c1.get("a")).to.equal(2);
    })
    it("get('b.c.d')=2", () => {
        c1.set('b.c.d', 2);
        expect(c1.get("b.c.d")).to.equal(2);
    })
})
describe("测试监听数据变化", () => {
    let c1 = new c();
    it("change:a", () => {
        let res;
        c1.on("change:a",val=>{
            res=val;   
        })
        c1.set('a',2);
        expect(res).to.equal(2);
        
    })
    it("change:c.d.e", () => {
        let res;
        c1.on("change:c.d.e", val => {
            res = val;
        })
        c1.set('c.d.e', 2);
        expect(res).to.equal(2);

    })
})