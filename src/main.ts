import { copy } from "../lib/main";

const btn1 = document.querySelector('#btn1')
btn1?.addEventListener('click', () => {
    copy("123")
})
