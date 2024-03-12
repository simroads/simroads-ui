import{p as F,m as j,a as G,g as O,u as W,c as o,b as ie,d as ue,e as se,t as A,s as _,f as Te,h,i as re,j as ce,o as de,w as $,k as ve,C as Be,l as Me,n as Ee,q as Ie,r as q,v as Pe,x as me,y as X,z as Le,A as xe,B as Y,T as Re,F as fe,D as _e,E as pe,G as De,H as He,I as Ne,J as $e,K as ze,L as Ae,M as R,N as te,O as H,P as Ye}from"./index-iVPC1WgH.js";import{u as Fe,m as Oe,a as We,b as Ue,V as ae,c as le,d as Xe,e as qe}from"./VSelect-B1224IQV.js";import{V as Ze,a as je,b as Ge,c as Je,d as Ke}from"./VList-t7JIXIjE.js";import{m as ge,a as he,b as ye,u as Z,c as we,d as be,e as Ve,f as Qe,t as et,g as tt,V as at,h as lt,L as nt,i as ot}from"./VAvatar-dmscyC76.js";const it=F({start:Boolean,end:Boolean,...j(),...G()},"VListItemAction"),ut=O()({name:"VListItemAction",props:it(),setup(e,u){let{slots:c}=u;return W(()=>o(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end},e.class],style:e.style},c)),{}}}),st=F({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...ge(),...j(),...he(),...ie(),...ye(),...G({tag:"footer"}),...ue()},"VFooter"),rt=O()({name:"VFooter",props:st(),setup(e,u){let{slots:c}=u;const{themeClasses:l}=se(e),{backgroundColorClasses:a,backgroundColorStyles:t}=Z(A(e,"color")),{borderClasses:s}=we(e),{elevationClasses:d}=be(e),{roundedClasses:b}=Ve(e),y=_(32),{resizeRef:r}=Te(g=>{g.length&&(y.value=g[0].target.clientHeight)}),f=h(()=>e.height==="auto"?y.value:parseInt(e.height,10)),{layoutItemStyles:m}=re({id:e.name,order:h(()=>parseInt(e.order,10)),position:h(()=>"bottom"),layoutSize:f,elementSize:h(()=>e.height==="auto"?void 0:f.value),active:h(()=>e.app),absolute:A(e,"absolute")});return W(()=>o(e.tag,{ref:r,class:["v-footer",l.value,a.value,s.value,d.value,b.value,e.class],style:[t.value,e.app?m.value:{height:ce(e.height)},e.style]},c)),{}}});function ct(e){let{rootEl:u,isSticky:c,layoutItemStyles:l}=e;const a=_(!1),t=_(0),s=h(()=>{const y=typeof a.value=="boolean"?"top":a.value;return[c.value?{top:"auto",bottom:"auto",height:void 0}:void 0,a.value?{[y]:ce(t.value)}:{top:l.value.top}]});de(()=>{$(c,y=>{y?window.addEventListener("scroll",b,{passive:!0}):window.removeEventListener("scroll",b)},{immediate:!0})}),ve(()=>{window.removeEventListener("scroll",b)});let d=0;function b(){const y=d>window.scrollY?"up":"down",r=u.value.getBoundingClientRect(),f=parseFloat(l.value.top??0),m=window.scrollY-Math.max(0,t.value-f),g=r.height+Math.max(t.value,f)-window.scrollY-window.innerHeight,S=parseFloat(getComputedStyle(u.value).getPropertyValue("--v-body-scroll-y"))||0;r.height<window.innerHeight-f?(a.value="top",t.value=f):y==="up"&&a.value==="bottom"||y==="down"&&a.value==="top"?(t.value=window.scrollY+r.top-S,a.value=!0):y==="down"&&g<=0?(t.value=0,a.value="bottom"):y==="up"&&m<=0&&(S?a.value!=="top"&&(t.value=-m+S+f,a.value="top"):(t.value=r.top+m,a.value="top")),d=window.scrollY}return{isStuck:a,stickyStyles:s}}const dt=100,vt=20;function ne(e){return(e<0?-1:1)*Math.sqrt(Math.abs(e))*1.41421356237}function oe(e){if(e.length<2)return 0;if(e.length===2)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let u=0;for(let c=e.length-1;c>0;c--){if(e[c].t===e[c-1].t)continue;const l=ne(u),a=(e[c].d-e[c-1].d)/(e[c].t-e[c-1].t);u+=(a-l)*Math.abs(a),c===e.length-1&&(u*=.5)}return ne(u)*1e3}function mt(){const e={};function u(a){Array.from(a.changedTouches).forEach(t=>{(e[t.identifier]??(e[t.identifier]=new Be(vt))).push([a.timeStamp,t])})}function c(a){Array.from(a.changedTouches).forEach(t=>{delete e[t.identifier]})}function l(a){var y;const t=(y=e[a])==null?void 0:y.values().reverse();if(!t)throw new Error(`No samples for touch id ${a}`);const s=t[0],d=[],b=[];for(const r of t){if(s[0]-r[0]>dt)break;d.push({t:r[0],d:r[1].clientX}),b.push({t:r[0],d:r[1].clientY})}return{x:oe(d),y:oe(b),get direction(){const{x:r,y:f}=this,[m,g]=[Math.abs(r),Math.abs(f)];return m>g&&r>=0?"right":m>g&&r<=0?"left":g>m&&f>=0?"down":g>m&&f<=0?"up":ft()}}}return{addMovement:u,endTouch:c,getVelocity:l}}function ft(){throw new Error}function gt(e){let{isActive:u,isTemporary:c,width:l,touchless:a,position:t}=e;de(()=>{window.addEventListener("touchstart",B,{passive:!0}),window.addEventListener("touchmove",M,{passive:!1}),window.addEventListener("touchend",E,{passive:!0})}),ve(()=>{window.removeEventListener("touchstart",B),window.removeEventListener("touchmove",M),window.removeEventListener("touchend",E)});const s=h(()=>["left","right"].includes(t.value)),{addMovement:d,endTouch:b,getVelocity:y}=mt();let r=!1;const f=_(!1),m=_(0),g=_(0);let S;function V(i,n){return(t.value==="left"?i:t.value==="right"?document.documentElement.clientWidth-i:t.value==="top"?i:t.value==="bottom"?document.documentElement.clientHeight-i:N())-(n?l.value:0)}function P(i){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const v=t.value==="left"?(i-g.value)/l.value:t.value==="right"?(document.documentElement.clientWidth-i-g.value)/l.value:t.value==="top"?(i-g.value)/l.value:t.value==="bottom"?(document.documentElement.clientHeight-i-g.value)/l.value:N();return n?Math.max(0,Math.min(1,v)):v}function B(i){if(a.value)return;const n=i.changedTouches[0].clientX,v=i.changedTouches[0].clientY,w=25,k=t.value==="left"?n<w:t.value==="right"?n>document.documentElement.clientWidth-w:t.value==="top"?v<w:t.value==="bottom"?v>document.documentElement.clientHeight-w:N(),C=u.value&&(t.value==="left"?n<l.value:t.value==="right"?n>document.documentElement.clientWidth-l.value:t.value==="top"?v<l.value:t.value==="bottom"?v>document.documentElement.clientHeight-l.value:N());(k||C||u.value&&c.value)&&(r=!0,S=[n,v],g.value=V(s.value?n:v,u.value),m.value=P(s.value?n:v),b(i),d(i))}function M(i){const n=i.changedTouches[0].clientX,v=i.changedTouches[0].clientY;if(r){if(!i.cancelable){r=!1;return}const k=Math.abs(n-S[0]),C=Math.abs(v-S[1]);(s.value?k>C&&k>3:C>k&&C>3)?(f.value=!0,r=!1):(s.value?C:k)>3&&(r=!1)}if(!f.value)return;i.preventDefault(),d(i);const w=P(s.value?n:v,!1);m.value=Math.max(0,Math.min(1,w)),w>1?g.value=V(s.value?n:v,!0):w<0&&(g.value=V(s.value?n:v,!1))}function E(i){if(r=!1,!f.value)return;d(i),f.value=!1;const n=y(i.changedTouches[0].identifier),v=Math.abs(n.x),w=Math.abs(n.y);(s.value?v>w&&v>400:w>v&&w>3)?u.value=n.direction===({left:"right",right:"left",top:"down",bottom:"up"}[t.value]||N()):u.value=m.value>.5}const L=h(()=>f.value?{transform:t.value==="left"?`translateX(calc(-100% + ${m.value*l.value}px))`:t.value==="right"?`translateX(calc(100% - ${m.value*l.value}px))`:t.value==="top"?`translateY(calc(-100% + ${m.value*l.value}px))`:t.value==="bottom"?`translateY(calc(100% - ${m.value*l.value}px))`:N(),transition:"none"}:void 0);return{isDragging:f,dragProgress:m,dragStyles:L}}function N(){throw new Error}const ht=["start","end","left","right","top","bottom"],yt=F({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>ht.includes(e)},sticky:Boolean,...ge(),...j(),...Me(),...he(),...ie(),...ye(),...G({tag:"nav"}),...ue()},"VNavigationDrawer"),wt=O()({name:"VNavigationDrawer",props:yt(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,u){let{attrs:c,emit:l,slots:a}=u;const{isRtl:t}=Ee(),{themeClasses:s}=se(e),{borderClasses:d}=we(e),{backgroundColorClasses:b,backgroundColorStyles:y}=Z(A(e,"color")),{elevationClasses:r}=be(e),{displayClasses:f,mobile:m}=Ie(e),{roundedClasses:g}=Ve(e),S=Qe(),V=q(e,"modelValue",null,T=>!!T),{ssrBootStyles:P}=Pe(),{scopeId:B}=Fe(),M=me(),E=_(!1),L=h(()=>e.rail&&e.expandOnHover&&E.value?Number(e.width):Number(e.rail?e.railWidth:e.width)),i=h(()=>et(e.location,t.value)),n=h(()=>!e.permanent&&(m.value||e.temporary)),v=h(()=>e.sticky&&!n.value&&i.value!=="bottom");X(()=>e.expandOnHover&&e.rail!=null,()=>{$(E,T=>l("update:rail",!T))}),X(()=>!e.disableResizeWatcher,()=>{$(n,T=>!e.permanent&&_e(()=>V.value=!T))}),X(()=>!e.disableRouteWatcher&&!!S,()=>{$(S.currentRoute,()=>n.value&&(V.value=!1))}),$(()=>e.permanent,T=>{T&&(V.value=!0)}),Le(()=>{e.modelValue!=null||n.value||(V.value=e.permanent||!m.value)});const{isDragging:w,dragProgress:k,dragStyles:C}=gt({isActive:V,isTemporary:n,width:L,touchless:A(e,"touchless"),position:i}),x=h(()=>{const T=n.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):L.value;return w.value?T*k.value:T}),{layoutItemStyles:p,layoutItemScrimStyles:I}=re({id:e.name,order:h(()=>parseInt(e.order,10)),position:i,layoutSize:x,elementSize:L,active:h(()=>V.value||w.value),disableTransitions:h(()=>w.value),absolute:h(()=>e.absolute||v.value&&typeof z.value!="string")}),{isStuck:z,stickyStyles:U}=ct({rootEl:M,isSticky:v,layoutItemStyles:p}),D=Z(h(()=>typeof e.scrim=="string"?e.scrim:null)),ke=h(()=>({...w.value?{opacity:k.value*.2,transition:"none"}:void 0,...I.value}));xe({VList:{bgColor:"transparent"}});function Se(){E.value=!0}function Ce(){E.value=!1}return W(()=>{const T=a.image||e.image;return o(fe,null,[o(e.tag,Y({ref:M,onMouseenter:Se,onMouseleave:Ce,class:["v-navigation-drawer",`v-navigation-drawer--${i.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":E.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":n.value,"v-navigation-drawer--active":V.value,"v-navigation-drawer--sticky":v.value},s.value,b.value,d.value,f.value,r.value,g.value,e.class],style:[y.value,p.value,C.value,P.value,U.value,e.style]},B,c),{default:()=>{var J,K,Q,ee;return[T&&o("div",{key:"image",class:"v-navigation-drawer__img"},[a.image?(J=a.image)==null?void 0:J.call(a,{image:e.image}):o("img",{src:e.image,alt:""},null)]),a.prepend&&o("div",{class:"v-navigation-drawer__prepend"},[(K=a.prepend)==null?void 0:K.call(a)]),o("div",{class:"v-navigation-drawer__content"},[(Q=a.default)==null?void 0:Q.call(a)]),a.append&&o("div",{class:"v-navigation-drawer__append"},[(ee=a.append)==null?void 0:ee.call(a)])]}}),o(Re,{name:"fade-transition"},{default:()=>[n.value&&(w.value||V.value)&&!!e.scrim&&o("div",Y({class:["v-navigation-drawer__scrim",D.backgroundColorClasses.value],style:[ke.value,D.backgroundColorStyles.value],onClick:()=>V.value=!1},B),null)]})])}),{isStuck:z}}}),bt=F({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...Oe(),...We()},"VSwitch"),Vt=O()({name:"VSwitch",inheritAttrs:!1,props:bt(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,u){let{attrs:c,slots:l}=u;const a=q(e,"indeterminate"),t=q(e,"modelValue"),{loaderClasses:s}=tt(e),{isFocused:d,focus:b,blur:y}=Ue(e),r=me(),f=h(()=>typeof e.loading=="string"&&e.loading!==""?e.loading:e.color),m=pe(),g=h(()=>e.id||`switch-${m}`);function S(){a.value&&(a.value=!1)}function V(P){var B,M;P.stopPropagation(),P.preventDefault(),(M=(B=r.value)==null?void 0:B.input)==null||M.click()}return W(()=>{const[P,B]=De(c),M=ae.filterProps(e),E=le.filterProps(e);return o(ae,Y({class:["v-switch",{"v-switch--inset":e.inset},{"v-switch--indeterminate":a.value},s.value,e.class]},P,M,{modelValue:t.value,"onUpdate:modelValue":L=>t.value=L,id:g.value,focused:d.value,style:e.style}),{...l,default:L=>{let{id:i,messagesId:n,isDisabled:v,isReadonly:w,isValid:k}=L;const C={model:t,isValid:k};return o(le,Y({ref:r},E,{modelValue:t.value,"onUpdate:modelValue":[x=>t.value=x,S],id:i.value,"aria-describedby":n.value,type:"checkbox","aria-checked":a.value?"mixed":void 0,disabled:v.value,readonly:w.value,onFocus:b,onBlur:y},B),{...l,default:x=>{let{backgroundColorClasses:p,backgroundColorStyles:I}=x;return o("div",{class:["v-switch__track",...p.value],style:I.value,onClick:V},[l["track-true"]&&o("div",{key:"prepend",class:"v-switch__track-true"},[l["track-true"](C)]),l["track-false"]&&o("div",{key:"append",class:"v-switch__track-false"},[l["track-false"](C)])])},input:x=>{let{inputNode:p,icon:I,backgroundColorClasses:z,backgroundColorStyles:U}=x;return o(fe,null,[p,o("div",{class:["v-switch__thumb",{"v-switch__thumb--filled":I||e.loading},e.inset?void 0:z.value],style:e.inset?void 0:U.value},[l.thumb?o(at,{defaults:{VIcon:{icon:I,size:"x-small"}}},{default:()=>[l.thumb({...C,icon:I})]}):o(Ze,null,{default:()=>[e.loading?o(nt,{name:"v-switch",active:!0,color:k.value===!1?void 0:f.value},{default:D=>l.loader?l.loader(D):o(ot,{active:D.isActive,color:D.color,indeterminate:!0,size:"16",width:"2"},null)}):I&&o(lt,{key:String(I),icon:I,size:"x-small"},null)]})])])}})}})}),{}}}),Bt=He({__name:"SettingsDrawer",setup(e){const u=Ne(),c=Xe(),l=$e(),a=t=>l.getLocaleMessage(t).lang_name;return(t,s)=>(ze(),Ae(wt,{modelValue:H(c).settingsDrawer,"onUpdate:modelValue":s[3]||(s[3]=d=>H(c).settingsDrawer=d),location:t.$vuetify.display.mobile?"bottom":"right",temporary:""},{default:R(()=>[o(je,null,{default:R(()=>[o(Ge,null,{default:R(()=>[te("Settings")]),_:1}),o(Je,{onClick:s[1]||(s[1]=d=>H(u).colorRoads=!H(u).colorRoads)},{append:R(()=>[o(ut,{start:""},{default:R(()=>[o(Vt,{"hide-details":"",modelValue:H(u).colorRoads,"onUpdate:modelValue":s[0]||(s[0]=d=>H(u).colorRoads=d)},null,8,["modelValue"])]),_:1})]),default:R(()=>[o(Ke,null,{default:R(()=>[te(Ye(t.$t("colored_roads")),1)]),_:1})]),_:1})]),_:1}),o(rt,{app:""},{default:R(()=>[o(qe,{"prepend-icon":"mdi-translate",variant:"outlined",label:t.$t("language"),modelValue:t.$i18n.locale,"onUpdate:modelValue":s[2]||(s[2]=d=>t.$i18n.locale=d),items:t.$i18n.availableLocales.sort((d,b)=>a(d).localeCompare(a(b))),"item-title":a,"item-value":d=>d,density:"compact","hide-details":""},null,8,["label","modelValue","items","item-value"])]),_:1})]),_:1},8,["modelValue","location"]))}});export{Bt as default};