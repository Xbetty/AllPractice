(()=>{"use strict";var e,r,o={1033:(e,r,o)=>{o(5769),o(3238),o(1418),o(7460),o(4078),o(6252),console.log("mul:",1),o.e(43).then(o.bind(o,6847)).then((function(e){console.log("res",e)})).catch((function(){console.log("文件加载失败～")})),console.log(2),console.log(5);var t=new Promise((function(e){setTimeout((function(){console.log("定时器执行完了"),e("success")}),1e3)}));console.log("promise",t),t.then((function(e){console.log("then",e)})).catch((function(e){console.log("err",e)})),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/service-worker.js").then((function(){console.log("sw注册成功了")})).catch((function(){console.log("sw注册失败了")}))}))}},t={};function n(e){var r=t[e];if(void 0!==r)return r.exports;var i=t[e]={exports:{}};return o[e](i,i.exports,n),i.exports}n.m=o,e=[],n.O=(r,o,t,i)=>{if(!o){var c=1/0;for(s=0;s<e.length;s++){for(var[o,t,i]=e[s],l=!0,a=0;a<o.length;a++)(!1&i||c>=i)&&Object.keys(n.O).every((e=>n.O[e](o[a])))?o.splice(a--,1):(l=!1,i<c&&(c=i));l&&(e.splice(s--,1),r=t())}return r}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[o,t,i]},n.d=(e,r)=>{for(var o in r)n.o(r,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((r,o)=>(n.f[o](e,r),r)),[])),n.u=e=>"js/"+e+".built.01686cf779.js",n.miniCssF=e=>{},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r={},n.l=(e,o,t,i)=>{if(r[e])r[e].push(o);else{var c,l;if(void 0!==t)for(var a=document.getElementsByTagName("script"),s=0;s<a.length;s++){var u=a[s];if(u.getAttribute("src")==e){c=u;break}}c||(l=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.src=e),r[e]=[o];var f=(o,t)=>{c.onerror=c.onload=null,clearTimeout(d);var n=r[e];if(delete r[e],c.parentNode&&c.parentNode.removeChild(c),n&&n.forEach((e=>e(t))),o)return o(t)},d=setTimeout(f.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=f.bind(null,c.onerror),c.onload=f.bind(null,c.onload),l&&document.head.appendChild(c)}},n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var r=n.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var o=r.getElementsByTagName("script");o.length&&(e=o[o.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e+"../"})(),(()=>{var e={179:0};n.f.j=(r,o)=>{var t=n.o(e,r)?e[r]:void 0;if(0!==t)if(t)o.push(t[2]);else{var i=new Promise(((o,n)=>t=e[r]=[o,n]));o.push(t[2]=i);var c=n.p+n.u(r),l=new Error;n.l(c,(o=>{if(n.o(e,r)&&(0!==(t=e[r])&&(e[r]=void 0),t)){var i=o&&("load"===o.type?"missing":o.type),c=o&&o.target&&o.target.src;l.message="Loading chunk "+r+" failed.\n("+i+": "+c+")",l.name="ChunkLoadError",l.type=i,l.request=c,t[1](l)}}),"chunk-"+r,r)}},n.O.j=r=>0===e[r];var r=(r,o)=>{var t,i,[c,l,a]=o,s=0;for(t in l)n.o(l,t)&&(n.m[t]=l[t]);if(a)var u=a(n);for(r&&r(o);s<c.length;s++)i=c[s],n.o(e,i)&&e[i]&&e[i][0](),e[c[s]]=0;return n.O(u)},o=self.webpackChunk=self.webpackChunk||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})();var i=n.O(void 0,[223],(()=>n(1033)));i=n.O(i)})();