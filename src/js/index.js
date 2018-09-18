// import { removeRepeatLine } from "./rmRepeatLine";
import bc from "./event";
class a extends bc{
    constructor(){
        super();
    }
    init(){
        console.log("a");
    }
}
let a1=new a();
a1.one("a",(...a)=>{
    console.log(...a);
})
a1.trigger("a", 11,22,333);
a1.trigger("a",22);
if (module.hot) {
    module.hot.accept();
}