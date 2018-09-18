import $ from "jquery";
import { expect } from "chai";
import mock from "mockjs";
mock.setup({
    timeout: 200
})
mock.mock(/\.json/, {
    "list|1-10": [{
        "id|+1": 1,
        "email":'@EMAIL',
        "name":"@NAME",
        "url":"@URL",
        "IP":"@IP"
    }]
})
describe("测试mock",e=>{
    it("aaa", e => {
        $.ajax({
            url: "./a.json",
            dataType: "json",
        }).then((re) => {
            console.log(re);
            expect(re.list.length).to.be.an("object");
            
        }, er => { })
        
    })
    
})
