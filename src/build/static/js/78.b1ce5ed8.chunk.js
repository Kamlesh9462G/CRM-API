"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[78],{7769:function(e,n,i){var r=i(8348),t=i(4087),s=i(8288),c=i(3380),l=i(7693),o=i(7521),d=i(4653),a=i(4224),h=i(2791),u=i(7425),x=i(9434),j=i(184);n.Z=function(e){var n=e.handleDelete,i=e.id,p=(0,r.q)(),f=p.isOpen,m=p.onOpen,g=p.onClose,b=h.useRef(null),y=(0,x.v9)((function(e){return e.common})).loading;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(t.xu,{onClick:m,children:(0,j.jsx)(u.qy0,{color:"red",size:18,cursor:"pointer"})}),(0,j.jsx)(s.a,{isOpen:f,leastDestructiveRef:b,onClose:g,children:(0,j.jsx)(c.Z,{bg:"blackAlpha.300",backdropFilter:"blur(5px) hue-rotate(90deg)",children:(0,j.jsxs)(s._,{children:[(0,j.jsx)(l.x,{fontSize:"lg",fontWeight:"bold",children:"Delete"}),(0,j.jsx)(o.f,{children:"Are you sure? You can't undo this action afterwards."}),(0,j.jsxs)(d.m,{children:[(0,j.jsx)(a.z,{size:"sm",fontWeight:"medium",ref:b,onClick:g,children:"Cancel"}),(0,j.jsx)(a.z,{size:"sm",fontWeight:"medium",isLoading:y,loadingText:"Please wait...",colorScheme:"red",onClick:function(){n(i),g()},ml:3,children:"Delete"})]})]})})})]})}},1605:function(e,n,i){var r=i(3129),t=i(4004),s=i(2893),c=(i(2791),i(6286)),l=i(184);n.Z=function(){return(0,l.jsx)(r.Tr,{height:400,maxHeight:"400px",children:(0,l.jsx)(t.Td,{colSpan:25,children:(0,l.jsx)(s.U,{justifyContent:"center",alignItems:"center",w:"100%",children:(0,l.jsx)(c.NB,{visible:!0,height:"80",width:"80",ariaLabel:"blocks-loading",wrapperStyle:{},wrapperClass:"blocks-wrapper",colors:["#e15b64","#f47e60","#f8b26a","#abbd81","#849b87"]})})})})}},6078:function(e,n,i){i.r(n);var r=i(4165),t=i(5861),s=i(2791),c=i(3682),l=i(751),o=i(4087),d=i(4464),a=i(4224),h=i(7281),u=i(1900),x=i(2732),j=i(553),p=i(3129),f=i(5237),m=i(8500),g=i(4004),b=i(9434),y=i(7689),C=i(7165),v=i(7769),k=i(458),w=i(1605),z=i(3853),T=i(184);n.default=function(){var e=(0,b.v9)((function(e){return e.common})),n=e.cities,i=e.loading,D=(0,b.I0)(),Z=(0,y.s0)(),F="city",S=(0,c.p)(),_=(0,s.useMemo)((function(){return n}),[n]);(0,s.useEffect)((function(){0===_.length&&D((0,C.Yu)(F))}),[D,F,_.length]);var A=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D((0,C.SR)(n,F,S));case 2:D((0,C.Yu)(F));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,T.jsxs)(l.K,{h:"100%",mt:1,children:[(0,T.jsxs)(o.xu,{px:10,h:"40px",display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,T.jsx)(d.L,{}),(0,T.jsx)(a.z,{onClick:function(){return Z("/add-city")},mt:2,size:"sm",_hover:{bg:"#FF9000"},w:"7.188rem",bg:"#FF9000",borderRadius:"0.25rem",color:"whiteAlpha.900",fontWeight:"700",fontSize:"1rem",children:"Add City"}),(0,T.jsx)(o.xu,{mt:"2",ml:"3",children:(0,T.jsx)(a.z,{size:"xs",borderRadius:"full",onClick:function(){return D((0,C.Yu)(F))},children:(0,T.jsx)(z.Qxo,{})})})]}),(0,T.jsx)(h.i,{bg:"gray.300",height:"2px"}),(0,T.jsx)(u.x,{px:"2",children:(0,T.jsx)(o.xu,{overflowY:"auto",height:480,maxHeight:"480px",children:(0,T.jsxs)(x.i,{variant:"simple",size:"sm",children:[(0,T.jsx)(j.h,{bg:"gray.100",position:"sticky",top:"0",children:(0,T.jsxs)(p.Tr,{children:[(0,T.jsx)(f.Th,{children:"#"}),(0,T.jsx)(f.Th,{children:"Date Created"}),(0,T.jsx)(f.Th,{children:"City Name"}),(0,T.jsx)(f.Th,{children:"Action"})]})}),(0,T.jsx)(m.p,{children:i?(0,T.jsx)(w.Z,{}):null===n||void 0===n?void 0:n.map((function(e,n){return(0,T.jsxs)(p.Tr,{children:[(0,T.jsx)(g.Td,{children:n+1}),(0,T.jsx)(g.Td,{children:new Date(e.createdAt).toLocaleDateString()}),(0,T.jsx)(g.Td,{children:e.CityName}),(0,T.jsxs)(g.Td,{display:"flex",alignItems:"center",children:[(0,T.jsx)(o.xu,{cursor:"pointer",mr:"5",onClick:function(){return Z("/update-city/".concat(e._id))},children:(0,T.jsx)(k.FNg,{color:"blue",size:19})}),(0,T.jsx)(o.xu,{cursor:"pointer",children:(0,T.jsx)(v.Z,{id:e._id,handleDelete:A})})]})]},e._id)}))})]})})})]})}}}]);
//# sourceMappingURL=78.b1ce5ed8.chunk.js.map