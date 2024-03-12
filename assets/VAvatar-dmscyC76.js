import{b0 as q,g as V,b1 as Xe,aX as Ye,m as z,as as xe,p as _,aD as R,h as v,b2 as W,aE as ke,b3 as ge,b4 as Je,b5 as Qe,b6 as Ke,O as ae,c as d,F as Ie,aI as H,E as Ze,aB as Ee,aC as et,t as $,k as Y,w as A,aJ as tt,r as Pe,o as nt,aA as Te,a7 as at,b7 as st,b8 as rt,A as it,j as C,a1 as Ve,a as J,d as Q,x as K,e as Z,b9 as lt,u as N,ba as ot,bb as ut,s as L,bc as le,f as ct,ac as dt,n as Be,T as $e,av as vt,bd as he,af as ft,D as ze,ap as mt,be as gt,bf as be,B as Le,z as ht,a4 as ye,a5 as bt,aN as yt}from"./index-iVPC1WgH.js";const Re=["top","bottom"],Ct=["start","end","left","right"];function St(e,t){let[a,n]=e.split(" ");return n||(n=q(Re,a)?"start":q(Ct,a)?"top":"center"),{side:Ce(a,t),align:Ce(n,t)}}function Ce(e,t){return e==="start"?t?"right":"left":e==="end"?t?"left":"right":e}function an(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function sn(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function rn(e){return{side:e.align,align:e.side}}function ln(e){return q(Re,e.side)?"y":"x"}function on(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",a=arguments.length>2?arguments[2]:void 0;return V()({name:a??Xe(Ye(e.replace(/__/g,"-"))),props:{tag:{type:String,default:t},...z()},setup(n,r){let{slots:s}=r;return()=>{var i;return xe(n.tag,{class:[e,n.class],style:n.style},(i=s.default)==null?void 0:i.call(s))}}})}const un=_({border:[Boolean,Number,String]},"border");function cn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R();return{borderClasses:v(()=>{const n=W(e)?e.value:e.border,r=[];if(n===!0||n==="")r.push(`${t}--border`);else if(typeof n=="string"||n===0)for(const s of String(n).split(" "))r.push(`border-${s}`);return r})}}const _t=[null,"default","comfortable","compact"],pt=_({density:{type:String,default:"default",validator:e=>_t.includes(e)}},"density");function wt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R();return{densityClasses:v(()=>`${t}--density-${e.density}`)}}const dn=_({elevation:{type:[Number,String],validator(e){const t=parseInt(e);return!isNaN(t)&&t>=0&&t<=24}}},"elevation");function vn(e){return{elevationClasses:v(()=>{const a=W(e)?e.value:e.elevation,n=[];return a==null||n.push(`elevation-${a}`),n})}}const oe=_({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded");function ue(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R();return{roundedClasses:v(()=>{const n=W(e)?e.value:e.rounded,r=[];if(n===!0||n==="")r.push(`${t}--rounded`);else if(typeof n=="string"||n===0)for(const s of String(n).split(" "))r.push(`rounded-${s}`);return r})}}function ce(e){return ke(()=>{const t=[],a={};if(e.value.background)if(ge(e.value.background)){if(a.backgroundColor=e.value.background,!e.value.text&&Je(e.value.background)){const n=Qe(e.value.background);if(n.a==null||n.a===1){const r=Ke(n);a.color=r,a.caretColor=r}}}else t.push(`bg-${e.value.background}`);return e.value.text&&(ge(e.value.text)?(a.color=e.value.text,a.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:a}})}function G(e,t){const a=v(()=>({text:W(e)?e.value:t?e[t]:null})),{colorClasses:n,colorStyles:r}=ce(a);return{textColorClasses:n,textColorStyles:r}}function se(e,t){const a=v(()=>({background:W(e)?e.value:t?e[t]:null})),{colorClasses:n,colorStyles:r}=ce(a);return{backgroundColorClasses:n,backgroundColorStyles:r}}const xt=["elevated","flat","tonal","outlined","text","plain"];function kt(e,t){return d(Ie,null,[e&&d("span",{key:"overlay",class:`${t}__overlay`},null),d("span",{key:"underlay",class:`${t}__underlay`},null)])}const It=_({color:String,variant:{type:String,default:"elevated",validator:e=>xt.includes(e)}},"variant");function Et(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R();const a=v(()=>{const{variant:s}=ae(e);return`${t}--variant-${s}`}),{colorClasses:n,colorStyles:r}=ce(v(()=>{const{variant:s,color:i}=ae(e);return{[["elevated","flat"].includes(s)?"background":"text"]:i}}));return{colorClasses:n,colorStyles:r,variantClasses:a}}const fn=_({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),mn=_({value:null,disabled:Boolean,selectedClass:String},"group-item");function gn(e,t){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;const n=H("useGroupItem");if(!n)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");const r=Ze();Ee(Symbol.for(`${t.description}:id`),r);const s=et(t,null);if(!s){if(!a)return s;throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`)}const i=$(e,"value"),c=v(()=>!!(s.disabled.value||e.disabled));s.register({id:r,value:i,disabled:c},n),Y(()=>{s.unregister(r)});const o=v(()=>s.isSelected(r)),f=v(()=>o.value&&[s.selectedClass.value,e.selectedClass]);return A(o,m=>{n.emit("group:selected",{value:m})}),{id:r,isSelected:o,toggle:()=>s.select(r,!o.value),select:m=>s.select(r,m),selectedClass:f,value:i,disabled:c,group:s}}function hn(e,t){let a=!1;const n=tt([]),r=Pe(e,"modelValue",[],u=>u==null?[]:Ne(n,at(u)),u=>{const l=Tt(n,u);return e.multiple?l:l[0]}),s=H("useGroup");function i(u,l){const b=u,g=Symbol.for(`${t.description}:id`),S=st(g,s==null?void 0:s.vnode).indexOf(l);ae(b.value)==null&&(b.value=S),S>-1?n.splice(S,0,b):n.push(b)}function c(u){if(a)return;o();const l=n.findIndex(b=>b.id===u);n.splice(l,1)}function o(){const u=n.find(l=>!l.disabled);u&&e.mandatory==="force"&&!r.value.length&&(r.value=[u.id])}nt(()=>{o()}),Y(()=>{a=!0});function f(u,l){const b=n.find(g=>g.id===u);if(!(l&&(b!=null&&b.disabled)))if(e.multiple){const g=r.value.slice(),p=g.findIndex(x=>x===u),S=~p;if(l=l??!S,S&&e.mandatory&&g.length<=1||!S&&e.max!=null&&g.length+1>e.max)return;p<0&&l?g.push(u):p>=0&&!l&&g.splice(p,1),r.value=g}else{const g=r.value.includes(u);if(e.mandatory&&g)return;r.value=l??!g?[u]:[]}}function m(u){if(e.multiple,r.value.length){const l=r.value[0],b=n.findIndex(S=>S.id===l);let g=(b+u)%n.length,p=n[g];for(;p.disabled&&g!==b;)g=(g+u)%n.length,p=n[g];if(p.disabled)return;r.value=[n[g].id]}else{const l=n.find(b=>!b.disabled);l&&(r.value=[l.id])}}const y={register:i,unregister:c,selected:r,select:f,disabled:$(e,"disabled"),prev:()=>m(n.length-1),next:()=>m(1),isSelected:u=>r.value.includes(u),selectedClass:v(()=>e.selectedClass),items:v(()=>n),getItemIndex:u=>Pt(n,u)};return Ee(t,y),y}function Pt(e,t){const a=Ne(e,[t]);return a.length?e.findIndex(n=>n.id===a[0]):-1}function Ne(e,t){const a=[];return t.forEach(n=>{const r=e.find(i=>Te(n,i.value)),s=e[n];(r==null?void 0:r.value)!=null?a.push(r.id):s!=null&&a.push(s.id)}),a}function Tt(e,t){const a=[];return t.forEach(n=>{const r=e.findIndex(s=>s.id===n);if(~r){const s=e[r];a.push(s.value!=null?s.value:r)}}),a}const Vt=_({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),Bt=V(!1)({name:"VDefaultsProvider",props:Vt(),setup(e,t){let{slots:a}=t;const{defaults:n,disabled:r,reset:s,root:i,scoped:c}=rt(e);return it(n,{reset:s,root:i,scoped:c,disabled:r}),()=>{var o;return(o=a.default)==null?void 0:o.call(a)}}}),$t=["x-small","small","default","large","x-large"],de=_({size:{type:[String,Number],default:"default"}},"size");function ve(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R();return ke(()=>{let a,n;return q($t,e.size)?a=`${t}--size-${e.size}`:e.size&&(n={width:C(e.size),height:C(e.size)}),{sizeClasses:a,sizeStyles:n}})}const zt=_({color:String,start:Boolean,end:Boolean,icon:Ve,...z(),...de(),...J({tag:"i"}),...Q()},"VIcon"),Lt=V()({name:"VIcon",props:zt(),setup(e,t){let{attrs:a,slots:n}=t;const r=K(),{themeClasses:s}=Z(e),{iconData:i}=lt(v(()=>r.value||e.icon)),{sizeClasses:c}=ve(e),{textColorClasses:o,textColorStyles:f}=G($(e,"color"));return N(()=>{var y,u;const m=(y=n.default)==null?void 0:y.call(n);return m&&(r.value=(u=ot(m).filter(l=>l.type===ut&&l.children&&typeof l.children=="string")[0])==null?void 0:u.children),d(i.value.component,{tag:e.tag,icon:i.value.icon,class:["v-icon","notranslate",s.value,c.value,o.value,{"v-icon--clickable":!!a.onClick,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[c.value?void 0:{fontSize:C(e.size),height:C(e.size),width:C(e.size)},f.value,e.style],role:a.onClick?"button":void 0,"aria-hidden":!a.onClick},{default:()=>[m]})}),{}}});function Oe(e,t){const a=K(),n=L(!1);if(le){const r=new IntersectionObserver(s=>{e==null||e(s,r),n.value=!!s.find(i=>i.isIntersecting)},t);Y(()=>{r.disconnect()}),A(a,(s,i)=>{i&&(r.unobserve(i),n.value=!1),s&&r.observe(s)},{flush:"post"})}return{intersectionRef:a,isIntersecting:n}}const Rt=_({bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...z(),...de(),...J({tag:"div"}),...Q()},"VProgressCircular"),bn=V()({name:"VProgressCircular",props:Rt(),setup(e,t){let{slots:a}=t;const n=20,r=2*Math.PI*n,s=K(),{themeClasses:i}=Z(e),{sizeClasses:c,sizeStyles:o}=ve(e),{textColorClasses:f,textColorStyles:m}=G($(e,"color")),{textColorClasses:y,textColorStyles:u}=G($(e,"bgColor")),{intersectionRef:l,isIntersecting:b}=Oe(),{resizeRef:g,contentRect:p}=ct(),S=v(()=>Math.max(0,Math.min(100,parseFloat(e.modelValue)))),x=v(()=>Number(e.width)),E=v(()=>o.value?Number(e.size):p.value?p.value.width:Math.max(x.value,32)),k=v(()=>n/(1-x.value/E.value)*2),P=v(()=>x.value/E.value*k.value),O=v(()=>C((100-S.value)/100*r));return dt(()=>{l.value=s.value,g.value=s.value}),N(()=>d(e.tag,{ref:s,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":b.value,"v-progress-circular--disable-shrink":e.indeterminate==="disable-shrink"},i.value,c.value,f.value,e.class],style:[o.value,m.value,e.style],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:S.value},{default:()=>[d("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${k.value} ${k.value}`},[d("circle",{class:["v-progress-circular__underlay",y.value],style:u.value,fill:"transparent",cx:"50%",cy:"50%",r:n,"stroke-width":P.value,"stroke-dasharray":r,"stroke-dashoffset":0},null),d("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:n,"stroke-width":P.value,"stroke-dasharray":r,"stroke-dashoffset":O.value},null)]),a.default&&d("div",{class:"v-progress-circular__content"},[a.default({value:S.value})])]})),{}}}),Nt=_({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function Ot(e){return{dimensionStyles:v(()=>({height:C(e.height),maxHeight:C(e.maxHeight),maxWidth:C(e.maxWidth),minHeight:C(e.minHeight),minWidth:C(e.minWidth),width:C(e.width)}))}}const Se={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},At=_({location:String},"location");function Dt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=arguments.length>2?arguments[2]:void 0;const{isRtl:n}=Be();return{locationStyles:v(()=>{if(!e.location)return{};const{side:s,align:i}=St(e.location.split(" ").length>1?e.location:`${e.location} center`,n.value);function c(f){return a?a(f):0}const o={};return s!=="center"&&(t?o[Se[s]]=`calc(100% - ${c(s)}px)`:o[s]=0),i!=="center"?t?o[Se[i]]=`calc(100% - ${c(i)}px)`:o[i]=0:(s==="center"?o.top=o.left="50%":o[{top:"left",bottom:"left",left:"top",right:"top"}[s]]="50%",o.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[s]),o})}}const Mt=_({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...z(),...At({location:"top"}),...oe(),...J(),...Q()},"VProgressLinear"),Wt=V()({name:"VProgressLinear",props:Mt(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const n=Pe(e,"modelValue"),{isRtl:r,rtlClasses:s}=Be(),{themeClasses:i}=Z(e),{locationStyles:c}=Dt(e),{textColorClasses:o,textColorStyles:f}=G(e,"color"),{backgroundColorClasses:m,backgroundColorStyles:y}=se(v(()=>e.bgColor||e.color)),{backgroundColorClasses:u,backgroundColorStyles:l}=se(e,"color"),{roundedClasses:b}=ue(e),{intersectionRef:g,isIntersecting:p}=Oe(),S=v(()=>parseInt(e.max,10)),x=v(()=>parseInt(e.height,10)),E=v(()=>parseFloat(e.bufferValue)/S.value*100),k=v(()=>parseFloat(n.value)/S.value*100),P=v(()=>r.value!==e.reverse),O=v(()=>e.indeterminate?"fade-transition":"slide-x-transition"),F=v(()=>e.bgOpacity==null?e.bgOpacity:parseFloat(e.bgOpacity));function ee(B){if(!g.value)return;const{left:te,right:j,width:h}=g.value.getBoundingClientRect(),w=P.value?h-B.clientX+(j-h):B.clientX-te;n.value=Math.round(w/h*S.value)}return N(()=>d(e.tag,{ref:g,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&p.value,"v-progress-linear--reverse":P.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},b.value,i.value,s.value,e.class],style:[{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?C(x.value):0,"--v-progress-linear-height":C(x.value),...c.value},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:k.value,onClick:e.clickable&&ee},{default:()=>[e.stream&&d("div",{key:"stream",class:["v-progress-linear__stream",o.value],style:{...f.value,[P.value?"left":"right"]:C(-x.value),borderTop:`${C(x.value/2)} dotted`,opacity:F.value,top:`calc(50% - ${C(x.value/4)})`,width:C(100-E.value,"%"),"--v-progress-linear-stream-to":C(x.value*(P.value?1:-1))}},null),d("div",{class:["v-progress-linear__background",m.value],style:[y.value,{opacity:F.value,width:C(e.stream?E.value:100,"%")}]},null),d($e,{name:O.value},{default:()=>[e.indeterminate?d("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(B=>d("div",{key:B,class:["v-progress-linear__indeterminate",B,u.value],style:l.value},null))]):d("div",{class:["v-progress-linear__determinate",u.value],style:[l.value,{width:C(k.value,"%")}]},null)]}),a.default&&d("div",{class:"v-progress-linear__content"},[a.default({value:k.value,buffer:E.value})])]})),{}}}),yn=_({loading:[Boolean,String]},"loader");function Cn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R();return{loaderClasses:v(()=>({[`${t}--loading`]:e.loading}))}}function Sn(e,t){var n;let{slots:a}=t;return d("div",{class:`${e.name}__loader`},[((n=a.default)==null?void 0:n.call(a,{color:e.color,isActive:e.active}))||d(Wt,{absolute:e.absolute,active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}function Ht(){const e=H("useRoute");return v(()=>{var t;return(t=e==null?void 0:e.proxy)==null?void 0:t.$route})}function _n(){var e,t;return(t=(e=H("useRouter"))==null?void 0:e.proxy)==null?void 0:t.$router}function pn(e,t){const a=vt("RouterLink"),n=v(()=>!!(e.href||e.to)),r=v(()=>(n==null?void 0:n.value)||he(t,"click")||he(e,"click"));if(typeof a=="string")return{isLink:n,isClickable:r,href:$(e,"href")};const s=e.to?a.useLink(e):void 0,i=Ht();return{isLink:n,isClickable:r,route:s==null?void 0:s.route,navigate:s==null?void 0:s.navigate,isActive:s&&v(()=>{var c,o,f;return e.exact?i.value?((f=s.isExactActive)==null?void 0:f.value)&&Te(s.route.value.query,i.value.query):(o=s.isExactActive)==null?void 0:o.value:(c=s.isActive)==null?void 0:c.value}),href:v(()=>e.to?s==null?void 0:s.route.value.href:e.href)}}const wn=_({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let ne=!1;function xn(e,t){let a=!1,n,r;ft&&(ze(()=>{window.addEventListener("popstate",s),n=e==null?void 0:e.beforeEach((i,c,o)=>{ne?a?t(o):o():setTimeout(()=>a?t(o):o()),ne=!0}),r=e==null?void 0:e.afterEach(()=>{ne=!1})}),mt(()=>{window.removeEventListener("popstate",s),n==null||n(),r==null||r()}));function s(i){var c;(c=i.state)!=null&&c.replaced||(a=!0,setTimeout(()=>a=!1))}}const re=Symbol("rippleStop"),Ft=80;function _e(e,t){e.style.transform=t,e.style.webkitTransform=t}function ie(e){return e.constructor.name==="TouchEvent"}function Ae(e){return e.constructor.name==="KeyboardEvent"}const jt=function(e,t){var y;let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=0,r=0;if(!Ae(e)){const u=t.getBoundingClientRect(),l=ie(e)?e.touches[e.touches.length-1]:e;n=l.clientX-u.left,r=l.clientY-u.top}let s=0,i=.3;(y=t._ripple)!=null&&y.circle?(i=.15,s=t.clientWidth/2,s=a.center?s:s+Math.sqrt((n-s)**2+(r-s)**2)/4):s=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const c=`${(t.clientWidth-s*2)/2}px`,o=`${(t.clientHeight-s*2)/2}px`,f=a.center?c:`${n-s}px`,m=a.center?o:`${r-s}px`;return{radius:s,scale:i,x:f,y:m,centerX:c,centerY:o}},X={show(e,t){var l;let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((l=t==null?void 0:t._ripple)!=null&&l.enabled))return;const n=document.createElement("span"),r=document.createElement("span");n.appendChild(r),n.className="v-ripple__container",a.class&&(n.className+=` ${a.class}`);const{radius:s,scale:i,x:c,y:o,centerX:f,centerY:m}=jt(e,t,a),y=`${s*2}px`;r.className="v-ripple__animation",r.style.width=y,r.style.height=y,t.appendChild(n);const u=window.getComputedStyle(t);u&&u.position==="static"&&(t.style.position="relative",t.dataset.previousPosition="static"),r.classList.add("v-ripple__animation--enter"),r.classList.add("v-ripple__animation--visible"),_e(r,`translate(${c}, ${o}) scale3d(${i},${i},${i})`),r.dataset.activated=String(performance.now()),setTimeout(()=>{r.classList.remove("v-ripple__animation--enter"),r.classList.add("v-ripple__animation--in"),_e(r,`translate(${f}, ${m}) scale3d(1,1,1)`)},0)},hide(e){var s;if(!((s=e==null?void 0:e._ripple)!=null&&s.enabled))return;const t=e.getElementsByClassName("v-ripple__animation");if(t.length===0)return;const a=t[t.length-1];if(a.dataset.isHiding)return;a.dataset.isHiding="true";const n=performance.now()-Number(a.dataset.activated),r=Math.max(250-n,0);setTimeout(()=>{a.classList.remove("v-ripple__animation--in"),a.classList.add("v-ripple__animation--out"),setTimeout(()=>{var c;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((c=a.parentNode)==null?void 0:c.parentNode)===e&&e.removeChild(a.parentNode)},300)},r)}};function De(e){return typeof e>"u"||!!e}function D(e){const t={},a=e.currentTarget;if(!(!(a!=null&&a._ripple)||a._ripple.touched||e[re])){if(e[re]=!0,ie(e))a._ripple.touched=!0,a._ripple.isTouch=!0;else if(a._ripple.isTouch)return;if(t.center=a._ripple.centered||Ae(e),a._ripple.class&&(t.class=a._ripple.class),ie(e)){if(a._ripple.showTimerCommit)return;a._ripple.showTimerCommit=()=>{X.show(e,a,t)},a._ripple.showTimer=window.setTimeout(()=>{var n;(n=a==null?void 0:a._ripple)!=null&&n.showTimerCommit&&(a._ripple.showTimerCommit(),a._ripple.showTimerCommit=null)},Ft)}else X.show(e,a,t)}}function pe(e){e[re]=!0}function I(e){const t=e.currentTarget;if(t!=null&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),e.type==="touchend"&&t._ripple.showTimerCommit){t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,t._ripple.showTimer=window.setTimeout(()=>{I(e)});return}window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1)}),X.hide(t)}}function Me(e){const t=e.currentTarget;t!=null&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let M=!1;function We(e){!M&&(e.keyCode===be.enter||e.keyCode===be.space)&&(M=!0,D(e))}function He(e){M=!1,I(e)}function Fe(e){M&&(M=!1,I(e))}function je(e,t,a){const{value:n,modifiers:r}=t,s=De(n);if(s||X.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=s,e._ripple.centered=r.center,e._ripple.circle=r.circle,gt(n)&&n.class&&(e._ripple.class=n.class),s&&!a){if(r.stop){e.addEventListener("touchstart",pe,{passive:!0}),e.addEventListener("mousedown",pe);return}e.addEventListener("touchstart",D,{passive:!0}),e.addEventListener("touchend",I,{passive:!0}),e.addEventListener("touchmove",Me,{passive:!0}),e.addEventListener("touchcancel",I),e.addEventListener("mousedown",D),e.addEventListener("mouseup",I),e.addEventListener("mouseleave",I),e.addEventListener("keydown",We),e.addEventListener("keyup",He),e.addEventListener("blur",Fe),e.addEventListener("dragstart",I,{passive:!0})}else!s&&a&&Ue(e)}function Ue(e){e.removeEventListener("mousedown",D),e.removeEventListener("touchstart",D),e.removeEventListener("touchend",I),e.removeEventListener("touchmove",Me),e.removeEventListener("touchcancel",I),e.removeEventListener("mouseup",I),e.removeEventListener("mouseleave",I),e.removeEventListener("keydown",We),e.removeEventListener("keyup",He),e.removeEventListener("dragstart",I),e.removeEventListener("blur",Fe)}function Ut(e,t){je(e,t,!1)}function qt(e){delete e._ripple,Ue(e)}function Gt(e,t){if(t.value===t.oldValue)return;const a=De(t.oldValue);je(e,t,a)}const kn={mounted:Ut,unmounted:qt,updated:Gt};function Xt(e){return{aspectStyles:v(()=>{const t=Number(e.aspectRatio);return t?{paddingBottom:String(1/t*100)+"%"}:void 0})}}const qe=_({aspectRatio:[String,Number],contentClass:String,inline:Boolean,...z(),...Nt()},"VResponsive"),we=V()({name:"VResponsive",props:qe(),setup(e,t){let{slots:a}=t;const{aspectStyles:n}=Xt(e),{dimensionStyles:r}=Ot(e);return N(()=>{var s;return d("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[r.value,e.style]},[d("div",{class:"v-responsive__sizer",style:n.value},null),(s=a.additional)==null?void 0:s.call(a),a.default&&d("div",{class:["v-responsive__content",e.contentClass]},[a.default()])])}),{}}}),Yt=_({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),U=(e,t)=>{let{slots:a}=t;const{transition:n,disabled:r,...s}=e,{component:i=$e,...c}=typeof n=="object"?n:{};return xe(i,Le(typeof n=="string"?{name:r?"":n}:c,s,{disabled:r}),a)};function Jt(e,t){if(!le)return;const a=t.modifiers||{},n=t.value,{handler:r,options:s}=typeof n=="object"?n:{handler:n,options:{}},i=new IntersectionObserver(function(){var y;let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],o=arguments.length>1?arguments[1]:void 0;const f=(y=e._observe)==null?void 0:y[t.instance.$.uid];if(!f)return;const m=c.some(u=>u.isIntersecting);r&&(!a.quiet||f.init)&&(!a.once||m||f.init)&&r(m,c,o),m&&a.once?Ge(e,t):f.init=!0},s);e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:i},i.observe(e)}function Ge(e,t){var n;const a=(n=e._observe)==null?void 0:n[t.instance.$.uid];a&&(a.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const Qt={mounted:Jt,unmounted:Ge},Kt=Qt,Zt=_({alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...qe(),...z(),...oe(),...Yt()},"VImg"),en=V()({name:"VImg",directives:{intersect:Kt},props:Zt(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,t){let{emit:a,slots:n}=t;const{backgroundColorClasses:r,backgroundColorStyles:s}=se($(e,"color")),{roundedClasses:i}=ue(e),c=H("VImg"),o=L(""),f=K(),m=L(e.eager?"loading":"idle"),y=L(),u=L(),l=v(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),b=v(()=>l.value.aspect||y.value/u.value||0);A(()=>e.src,()=>{g(m.value!=="idle")}),A(b,(h,w)=>{!h&&w&&f.value&&k(f.value)}),ht(()=>g());function g(h){if(!(e.eager&&h)&&!(le&&!h&&!e.eager)){if(m.value="loading",l.value.lazySrc){const w=new Image;w.src=l.value.lazySrc,k(w,null)}l.value.src&&ze(()=>{var w;a("loadstart",((w=f.value)==null?void 0:w.currentSrc)||l.value.src),setTimeout(()=>{var T;if(!c.isUnmounted)if((T=f.value)!=null&&T.complete){if(f.value.naturalWidth||S(),m.value==="error")return;b.value||k(f.value,null),m.value==="loading"&&p()}else b.value||k(f.value),x()})})}}function p(){var h;c.isUnmounted||(x(),k(f.value),m.value="loaded",a("load",((h=f.value)==null?void 0:h.currentSrc)||l.value.src))}function S(){var h;c.isUnmounted||(m.value="error",a("error",((h=f.value)==null?void 0:h.currentSrc)||l.value.src))}function x(){const h=f.value;h&&(o.value=h.currentSrc||h.src)}let E=-1;Y(()=>{clearTimeout(E)});function k(h){let w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const T=()=>{if(clearTimeout(E),c.isUnmounted)return;const{naturalHeight:fe,naturalWidth:me}=h;fe||me?(y.value=me,u.value=fe):!h.complete&&m.value==="loading"&&w!=null?E=window.setTimeout(T,w):(h.currentSrc.endsWith(".svg")||h.currentSrc.startsWith("data:image/svg+xml"))&&(y.value=1,u.value=1)};T()}const P=v(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),O=()=>{var T;if(!l.value.src||m.value==="idle")return null;const h=d("img",{class:["v-img__img",P.value],style:{objectPosition:e.position},src:l.value.src,srcset:l.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:f,onLoad:p,onError:S},null),w=(T=n.sources)==null?void 0:T.call(n);return d(U,{transition:e.transition,appear:!0},{default:()=>[ye(w?d("picture",{class:"v-img__picture"},[w,h]):h,[[yt,m.value==="loaded"]])]})},F=()=>d(U,{transition:e.transition},{default:()=>[l.value.lazySrc&&m.value!=="loaded"&&d("img",{class:["v-img__img","v-img__img--preload",P.value],style:{objectPosition:e.position},src:l.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),ee=()=>n.placeholder?d(U,{transition:e.transition,appear:!0},{default:()=>[(m.value==="loading"||m.value==="error"&&!n.error)&&d("div",{class:"v-img__placeholder"},[n.placeholder()])]}):null,B=()=>n.error?d(U,{transition:e.transition,appear:!0},{default:()=>[m.value==="error"&&d("div",{class:"v-img__error"},[n.error()])]}):null,te=()=>e.gradient?d("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,j=L(!1);{const h=A(b,w=>{w&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{j.value=!0})}),h())})}return N(()=>{const h=we.filterProps(e);return ye(d(we,Le({class:["v-img",{"v-img--booting":!j.value},r.value,i.value,e.class],style:[{width:C(e.width==="auto"?y.value:e.width)},s.value,e.style]},h,{aspectRatio:b.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>d(Ie,null,[d(O,null,null),d(F,null,null),d(te,null,null),d(ee,null,null),d(B,null,null)]),default:n.default}),[[bt("intersect"),{handler:g,options:e.options},null,{once:!0}]])}),{currentSrc:o,image:f,state:m,naturalWidth:y,naturalHeight:u}}}),tn=_({start:Boolean,end:Boolean,icon:Ve,image:String,text:String,...z(),...pt(),...oe(),...de(),...J(),...Q(),...It({variant:"flat"})},"VAvatar"),In=V()({name:"VAvatar",props:tn(),setup(e,t){let{slots:a}=t;const{themeClasses:n}=Z(e),{colorClasses:r,colorStyles:s,variantClasses:i}=Et(e),{densityClasses:c}=wt(e),{roundedClasses:o}=ue(e),{sizeClasses:f,sizeStyles:m}=ve(e);return N(()=>d(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},n.value,r.value,c.value,o.value,f.value,i.value,e.class],style:[s.value,m.value,e.style]},{default:()=>[a.default?d(Bt,{key:"content-defaults",defaults:{VImg:{cover:!0,image:e.image},VIcon:{icon:e.icon}}},{default:()=>[a.default()]}):e.image?d(en,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?d(Lt,{key:"icon",icon:e.icon},null):e.text,kt(!1,"v-avatar")]})),{}}});export{Dt as A,pn as B,kt as C,Yt as D,G as E,Wt as F,St as G,an as H,sn as I,rn as J,ln as K,Sn as L,U as M,xn as N,Kt as O,fn as P,hn as Q,kn as R,mn as S,gn as T,Bt as V,dn as a,oe as b,cn as c,vn as d,ue as e,_n as f,Cn as g,Lt as h,bn as i,en as j,pt as k,wt as l,un as m,de as n,ve as o,Nt as p,Ot as q,on as r,In as s,Ce as t,se as u,yn as v,At as w,wn as x,It as y,Et as z};