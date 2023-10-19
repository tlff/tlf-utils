export async function copy(val:string){
    if (navigator.clipboard && await navigator.permissions.query({name:"clipboard-write"})) {
        navigator.clipboard.writeText(val)
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = val;
        textArea.style.width = '0'
        textArea.style.position = 'fixed'
        textArea.style.left = '-999px'
        textArea.style.top = '10px'
        textArea.setAttribute('readonly', 'readonly')
        document.body.appendChild(textArea)
    
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
}