var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function copy(val) {
    return __awaiter(this, void 0, void 0, function* () {
        if (navigator.clipboard && (yield navigator.permissions.query({ name: "clipboard-write" }))) {
            navigator.clipboard.writeText(val);
        }
        else {
            const textArea = document.createElement('textarea');
            textArea.value = val;
            textArea.style.width = '0';
            textArea.style.position = 'fixed';
            textArea.style.left = '-999px';
            textArea.style.top = '10px';
            textArea.setAttribute('readonly', 'readonly');
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    });
}
