import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as o}from"./assets/vendor-A92OCY9B.js";document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".form");t.addEventListener("submit",i=>{i.preventDefault();const s=parseInt(t.elements.delay.value,10),r=t.elements.state.value;new Promise((e,n)=>{setTimeout(()=>{r==="fulfilled"?e(s):n(s)},s)}).then(e=>{o.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{o.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})}),t.reset()})});
//# sourceMappingURL=2-snackbar.js.map
