parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FeUn":[function(require,module,exports) {
document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("StateSelect"),t=(document.querySelectorAll(".chart"),document.querySelectorAll(".day"),document.querySelectorAll(".pos")),a=document.querySelectorAll(".deaths");document.querySelectorAll(".date");async function n(n=(e?e.value:"nj")){const c=function(e){const t=["lastUpdateEt","deathIncrease","positiveIncrease"];return e.slice(0,7).map(e=>{const a={};return t.forEach(t=>{a[t]=e[t]}),a})}(await async function(e=n){const t=`https://api.covidtracking.com/v1/states/${e}/daily.json`,a=await fetch(t);if(200===a.status)return await a.json();console.log("Looks like there was a problem. Status Code: "+a.status)}(n)),s=c.reduce((e,t)=>e=t.positiveIncrease>e?t.positiveIncrease:e,0),o=c.reduce((e,t)=>e=t.deathIncrease>e?t.deathIncrease:e,0);c.forEach((e,n)=>{const c=t[n];c.style.height=`${e.positiveIncrease/s*100}%`,c.dataset.total=`${e.positiveIncrease}`,c.nextElementSibling.innerText=new Date(e.lastUpdateEt).toLocaleDateString();const r=a[n];r.style.height=o>0?`${e.deathIncrease/o*100}%`:0,r.dataset.total=`${e.deathIncrease}`,r.nextElementSibling.innerText=new Date(e.lastUpdateEt).toLocaleDateString()})}e.addEventListener("change",e=>{n(e.currentTarget.value)}),n()});
},{}]},{},["FeUn"], null)
//# sourceMappingURL=historic.94206a86.js.map