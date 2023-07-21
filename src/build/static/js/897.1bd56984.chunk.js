"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[897],{1605:function(e,n,t){var r=t(3129),i=t(4004),a=t(896),o=t(4087),c=t(7263),s=t(184);n.Z=function(){return(0,s.jsx)(r.Tr,{height:400,maxHeight:"400px",children:(0,s.jsx)(i.Td,{colSpan:25,children:(0,s.jsx)(a.M,{h:"100%",children:(0,s.jsx)(o.xu,{children:(0,s.jsx)(c.N,{mt:"4",noOfLines:12,spacing:"4",skeletonHeight:"4",width:"84rem",borderRadius:"2rem"})})})})})}},1897:function(e,n,t){t.r(n);var r=t(4165),i=t(5861),a=t(751),o=t(4087),c=t(4464),s=t(4224),u=t(7281),d=t(1900),l=t(2732),h=t(553),f=t(3129),v=t(5237),p=t(8500),m=t(4004),x=t(794),b=t(9549),g=t(2791),k=t(9434),y=t(7689),j=t(7165),w=t(1605),C=t(458),P=t(3853),Z=t(184);n.default=function(){(0,k.v9)((function(e){return e.common})).signinuser;var e=(0,k.v9)((function(e){return e.common})),n=e.users,t=e.loading;console.log(n);var T=(0,k.I0)(),B=(0,y.s0)(),E="user",L=(0,g.useMemo)((function(){return n}),[n]);(0,g.useEffect)((function(){0===L.length&&T((0,j.Yu)(E))}),[T,E,L.length]);var _=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(n,t){var i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=n.target.checked,e.prev=1,e.next=4,T((0,j.VA)(t,E,{active:i})).then((function(){return T((0,j.Yu)(E))}));case 4:e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.error("Error updating user ".concat(t,": ").concat(e.t0.message));case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(n,t){return e.apply(this,arguments)}}();return(0,Z.jsxs)(a.K,{h:"100%",mt:1,children:[(0,Z.jsxs)(o.xu,{px:10,h:"40px",display:"flex",justifyContent:"space-between",alignItems:"center",children:[" ",(0,Z.jsx)(c.L,{}),(0,Z.jsx)(s.z,{onClick:function(){return B("/addnewuser")},size:"sm",_hover:{bg:"#FF9000"},w:"7.188rem",bg:"#FF9000",mt:2,borderRadius:"0.25rem",color:"whiteAlpha.900",fontWeight:"700",fontSize:"1rem",children:"Add User"}),(0,Z.jsx)(o.xu,{mt:"2",ml:"3",children:(0,Z.jsx)(s.z,{size:"xs",borderRadius:"full",onClick:function(){return T((0,j.Yu)(E))},children:(0,Z.jsx)(P.Qxo,{})})})]}),(0,Z.jsx)(u.i,{bg:"gray.300",height:"2px"}),(0,Z.jsx)(d.x,{px:"2",children:(0,Z.jsx)(o.xu,{overflowY:"auto",height:480,maxHeight:"480px",children:(0,Z.jsxs)(l.i,{variant:"simple",size:"sm",children:[(0,Z.jsx)(h.h,{bg:"gray.100",children:(0,Z.jsxs)(f.Tr,{children:[(0,Z.jsx)(v.Th,{children:"Photo"}),(0,Z.jsx)(v.Th,{children:"Name"}),(0,Z.jsx)(v.Th,{children:"Username"}),(0,Z.jsx)(v.Th,{children:"Phone No."}),(0,Z.jsx)(v.Th,{children:"Email-ID"}),(0,Z.jsx)(v.Th,{children:"UserType"}),(0,Z.jsx)(v.Th,{children:"City"}),(0,Z.jsx)(v.Th,{children:"Branch"}),(0,Z.jsx)(v.Th,{children:"Action"})]})}),t?(0,Z.jsx)(w.Z,{}):(0,Z.jsx)(p.p,{children:null===n||void 0===n?void 0:n.map((function(e){return(0,Z.jsxs)(f.Tr,{children:[(0,Z.jsxs)(m.Td,{children:[" ",(0,Z.jsx)(x.q,{size:"sm",bg:"blue.500",color:"whiteAlpha.900",name:e.Name,src:e.image})]}),(0,Z.jsx)(m.Td,{children:e.Name}),(0,Z.jsx)(m.Td,{children:e.UserName}),(0,Z.jsx)(m.Td,{children:e.Phone}),(0,Z.jsx)(m.Td,{children:e.Email}),(0,Z.jsx)(m.Td,{children:e.UserType}),(0,Z.jsx)(m.Td,{children:e.City}),(0,Z.jsx)(m.Td,{children:e.Branch}),(0,Z.jsxs)(m.Td,{display:"flex",alignItems:"center",children:[(0,Z.jsx)(o.xu,{cursor:"pointer",mr:"3",children:(0,Z.jsx)(b.r,{isChecked:e.active,size:"sm",onChange:function(n){return _(n,e._id)}})}),(0,Z.jsx)(o.xu,{cursor:"pointer",mr:"5",onClick:function(){return B("/update-user/".concat(e._id))},children:(0,Z.jsx)(C.FNg,{color:"blue",size:19})})]})]},e._id)}))})]})})})]})}},753:function(e,n,t){t.d(n,{O:function(){return x}});var r=t(1413),i=t(9439),a=t(5987),o=t(7762),c=t(3461),s=t(9205),u=t(5280),d=t(6367),l=t(4591),h=t(6992),f={border:"0",clip:"rect(0, 0, 0, 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"},v=t(6326),p=t(2791),m=["defaultChecked","isChecked","isFocusable","onChange","isIndeterminate","name","value","tabIndex","aria-label","aria-labelledby","aria-invalid"];function x(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,c.K)(e),t=n.isDisabled,x=n.isReadOnly,g=n.isRequired,k=n.isInvalid,y=n.id,j=n.onBlur,w=n.onFocus,C=n["aria-describedby"],P=e.defaultChecked,Z=e.isChecked,T=e.isFocusable,B=e.onChange,E=e.isIndeterminate,L=e.name,_=e.value,M=e.tabIndex,S=void 0===M?void 0:M,I=e["aria-label"],N=e["aria-labelledby"],D=e["aria-invalid"],F=function(e){var n,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=Object.assign({},e),i=(0,o.Z)(t);try{for(i.s();!(n=i.n()).done;){var a=n.value;a in r&&delete r[a]}}catch(c){i.e(c)}finally{i.f()}return r}((0,a.Z)(e,m),["isDisabled","isReadOnly","isRequired","isInvalid","id","onBlur","onFocus","aria-describedby"]),R=(0,d.W)(B),z=(0,d.W)(j),A=(0,d.W)(w),K=(0,p.useState)(!1),U=(0,i.Z)(K,2),q=U[0],H=U[1],O=(0,p.useState)(!1),G=(0,i.Z)(O,2),W=G[0],Y=G[1],Q=(0,p.useState)(!1),V=(0,i.Z)(Q,2),J=V[0],X=V[1],$=(0,p.useState)(!1),ee=(0,i.Z)($,2),ne=ee[0],te=ee[1];(0,p.useEffect)((function(){return(0,v.BT)(H)}),[]);var re=(0,p.useRef)(null),ie=(0,p.useState)(!0),ae=(0,i.Z)(ie,2),oe=ae[0],ce=ae[1],se=(0,p.useState)(!!P),ue=(0,i.Z)(se,2),de=ue[0],le=ue[1],he=void 0!==Z,fe=he?Z:de,ve=(0,p.useCallback)((function(e){x||t?e.preventDefault():(he||le(fe?e.target.checked:!!E||e.target.checked),null==R||R(e))}),[x,t,fe,he,E,R]);(0,s.G)((function(){re.current&&(re.current.indeterminate=Boolean(E))}),[E]),(0,u.r)((function(){t&&Y(!1)}),[t,Y]),(0,s.G)((function(){var e=re.current;(null==e?void 0:e.form)&&(e.form.onreset=function(){le(!!P)})}),[]);var pe=t&&!T,me=(0,p.useCallback)((function(e){" "===e.key&&te(!0)}),[te]),xe=(0,p.useCallback)((function(e){" "===e.key&&te(!1)}),[te]);(0,s.G)((function(){re.current&&(re.current.checked!==fe&&le(re.current.checked))}),[re.current]);var be=(0,p.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.Z)((0,r.Z)({},e),{},{ref:n,"data-active":(0,h.PB)(ne),"data-hover":(0,h.PB)(J),"data-checked":(0,h.PB)(fe),"data-focus":(0,h.PB)(W),"data-focus-visible":(0,h.PB)(W&&q),"data-indeterminate":(0,h.PB)(E),"data-disabled":(0,h.PB)(t),"data-invalid":(0,h.PB)(k),"data-readonly":(0,h.PB)(x),"aria-hidden":!0,onMouseDown:(0,h.v0)(e.onMouseDown,(function(e){W&&e.preventDefault(),te(!0)})),onMouseUp:(0,h.v0)(e.onMouseUp,(function(){return te(!1)})),onMouseEnter:(0,h.v0)(e.onMouseEnter,(function(){return X(!0)})),onMouseLeave:(0,h.v0)(e.onMouseLeave,(function(){return X(!1)}))})}),[ne,fe,t,W,q,J,E,k,x]),ge=(0,p.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.Z)((0,r.Z)((0,r.Z)({},F),e),{},{ref:(0,l.lq)(n,(function(e){e&&ce("LABEL"===e.tagName)})),onClick:(0,h.v0)(e.onClick,(function(){var e;oe||(null==(e=re.current)||e.click(),requestAnimationFrame((function(){var e;null==(e=re.current)||e.focus()})))})),"data-disabled":(0,h.PB)(t),"data-checked":(0,h.PB)(fe),"data-invalid":(0,h.PB)(k)})}),[F,t,fe,k,oe]),ke=(0,p.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.Z)((0,r.Z)({},e),{},{ref:(0,l.lq)(re,n),type:"checkbox",name:L,value:_,id:y,tabIndex:S,onChange:(0,h.v0)(e.onChange,ve),onBlur:(0,h.v0)(e.onBlur,z,(function(){return Y(!1)})),onFocus:(0,h.v0)(e.onFocus,A,(function(){return Y(!0)})),onKeyDown:(0,h.v0)(e.onKeyDown,me),onKeyUp:(0,h.v0)(e.onKeyUp,xe),required:g,checked:fe,disabled:pe,readOnly:x,"aria-label":I,"aria-labelledby":N,"aria-invalid":D?Boolean(D):k,"aria-describedby":C,"aria-disabled":t,style:f})}),[L,_,y,ve,z,A,me,xe,g,fe,pe,x,I,N,D,k,C,t,S]),ye=(0,p.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.Z)((0,r.Z)({},e),{},{ref:n,onMouseDown:(0,h.v0)(e.onMouseDown,b),"data-disabled":(0,h.PB)(t),"data-checked":(0,h.PB)(fe),"data-invalid":(0,h.PB)(k)})}),[fe,t,k]);return{state:{isInvalid:k,isFocused:W,isChecked:fe,isActive:ne,isHovered:J,isIndeterminate:E,isDisabled:t,isReadOnly:x,isRequired:g},getRootProps:ge,getCheckboxProps:be,getInputProps:ke,getLabelProps:ye,htmlProps:F}}function b(e){e.preventDefault(),e.stopPropagation()}},9549:function(e,n,t){t.d(n,{r:function(){return v}});var r=t(1413),i=t(5987),a=t(753),o=t(7872),c=t(9084),s=t(2996),u=t(2952),d=t(6992),l=t(2791),h=t(184),f=["spacing","children"],v=(0,o.G)((function(e,n){var t=(0,c.jC)("Switch",e),o=(0,s.Lr)(e),v=o.spacing,p=void 0===v?"0.5rem":v,m=o.children,x=(0,i.Z)(o,f),b=(0,a.O)(x),g=b.state,k=b.getInputProps,y=b.getCheckboxProps,j=b.getRootProps,w=b.getLabelProps,C=(0,l.useMemo)((function(){return(0,r.Z)({display:"inline-block",position:"relative",verticalAlign:"middle",lineHeight:0},t.container)}),[t.container]),P=(0,l.useMemo)((function(){return(0,r.Z)({display:"inline-flex",flexShrink:0,justifyContent:"flex-start",boxSizing:"content-box",cursor:"pointer"},t.track)}),[t.track]),Z=(0,l.useMemo)((function(){return(0,r.Z)({userSelect:"none",marginStart:p},t.label)}),[p,t.label]);return(0,h.jsxs)(u.m.label,(0,r.Z)((0,r.Z)({},j()),{},{className:(0,d.cx)("chakra-switch",e.className),__css:C,children:[(0,h.jsx)("input",(0,r.Z)({className:"chakra-switch__input"},k({},n))),(0,h.jsx)(u.m.span,(0,r.Z)((0,r.Z)({},y()),{},{className:"chakra-switch__track",__css:P,children:(0,h.jsx)(u.m.span,{__css:t.thumb,className:"chakra-switch__thumb","data-checked":(0,d.PB)(g.isChecked),"data-hover":(0,d.PB)(g.isHovered)})})),m&&(0,h.jsx)(u.m.span,(0,r.Z)((0,r.Z)({className:"chakra-switch__label"},w()),{},{__css:Z,children:m}))]}))}));v.displayName="Switch"},6326:function(e,n,t){t.d(n,{BT:function(){return x}});var r=!1,i=null,a=!1,o=!1,c=new Set;function s(e,n){c.forEach((function(t){return t(e,n)}))}var u="undefined"!==typeof window&&null!=window.navigator&&/^Mac/.test(window.navigator.platform);function d(e){var n;a=!0,(n=e).metaKey||!u&&n.altKey||n.ctrlKey||"Control"===n.key||"Shift"===n.key||"Meta"===n.key||(i="keyboard",s("keyboard",e))}function l(e){if(i="pointer","mousedown"===e.type||"pointerdown"===e.type){a=!0;var n=e.composedPath?e.composedPath()[0]:e.target,t=!1;try{t=n.matches(":focus-visible")}catch(r){}if(t)return;s("pointer",e)}}function h(e){var n;(0===(n=e).mozInputSource&&n.isTrusted||0===n.detail&&!n.pointerType)&&(a=!0,i="virtual")}function f(e){e.target!==window&&e.target!==document&&(a||o||(i="virtual",s("virtual",e)),a=!1,o=!1)}function v(){a=!1,o=!0}function p(){return"pointer"!==i}function m(){if("undefined"!==typeof window&&!r){var e=HTMLElement.prototype.focus;HTMLElement.prototype.focus=function(){a=!0;for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];e.apply(this,t)},document.addEventListener("keydown",d,!0),document.addEventListener("keyup",d,!0),document.addEventListener("click",h,!0),window.addEventListener("focus",f,!0),window.addEventListener("blur",v,!1),"undefined"!==typeof PointerEvent?(document.addEventListener("pointerdown",l,!0),document.addEventListener("pointermove",l,!0),document.addEventListener("pointerup",l,!0)):(document.addEventListener("mousedown",l,!0),document.addEventListener("mousemove",l,!0),document.addEventListener("mouseup",l,!0)),r=!0}}function x(e){m(),e(p());var n=function(){return e(p())};return c.add(n),function(){c.delete(n)}}}}]);
//# sourceMappingURL=897.1bd56984.chunk.js.map