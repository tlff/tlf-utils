async function o(t) {
  if (navigator.clipboard && await navigator.permissions.query({ name: "clipboard-write" }))
    navigator.clipboard.writeText(t);
  else {
    const e = document.createElement("textarea");
    e.value = t, e.style.width = "0", e.style.position = "fixed", e.style.left = "-999px", e.style.top = "10px", e.setAttribute("readonly", "readonly"), document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
export {
  o as copy
};
