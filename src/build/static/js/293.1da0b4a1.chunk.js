"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[293],{7769:function(e,n,r){var i=r(8348),s=r(4087),t=r(3544),c=r(3380),o=r(7693),l=r(7521),d=r(4653),u=r(4224),h=r(2791),x=r(7425),a=r(9434),j=r(184);n.Z=function(e){var n=e.handleDelete,r=e.id,f=(0,i.q)(),p=f.isOpen,m=f.onOpen,g=f.onClose,b=h.useRef(null),v=(0,a.v9)((function(e){return e.common})).loading;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(s.xu,{onClick:m,children:(0,j.jsx)(x.qy0,{color:"red",size:18,cursor:"pointer"})}),(0,j.jsx)(t.a,{isOpen:p,leastDestructiveRef:b,onClose:g,children:(0,j.jsx)(c.Z,{bg:"blackAlpha.300",backdropFilter:"blur(5px) hue-rotate(90deg)",children:(0,j.jsxs)(t._,{children:[(0,j.jsx)(o.x,{fontSize:"lg",fontWeight:"bold",children:"Delete"}),(0,j.jsx)(l.f,{children:"Are you sure? You can't undo this action afterwards."}),(0,j.jsxs)(d.m,{children:[(0,j.jsx)(u.z,{size:"sm",fontWeight:"medium",ref:b,onClick:g,children:"Cancel"}),(0,j.jsx)(u.z,{size:"sm",fontWeight:"medium",isLoading:v,loadingText:"Please wait...",colorScheme:"red",onClick:function(){n(r),g()},ml:3,children:"Delete"})]})]})})})]})}},1605:function(e,n,r){var i=r(3129),s=r(4004),t=r(896),c=r(4087),o=r(7263),l=r(184);n.Z=function(){return(0,l.jsx)(i.Tr,{height:400,maxHeight:"400px",children:(0,l.jsx)(s.Td,{colSpan:25,children:(0,l.jsx)(t.M,{h:"100%",children:(0,l.jsx)(c.xu,{children:(0,l.jsx)(o.N,{mt:"4",noOfLines:12,spacing:"4",skeletonHeight:"4",width:"84rem",borderRadius:"2rem"})})})})})}},2293:function(e,n,r){r.r(n);var i=r(4165),s=r(5861),t=r(2791),c=r(3682),o=r(751),l=r(4087),d=r(4464),u=r(4224),h=r(7281),x=r(1900),a=r(2732),j=r(553),f=r(3129),p=r(5237),m=r(8500),g=r(4004),b=r(9434),v=r(7165),k=r(7689),C=r(7769),T=r(458),z=r(1605),w=r(3853),y=r(184);n.default=function(){var e=(0,b.v9)((function(e){return e.common})),n=e.courses,r=e.loading,D=(0,b.I0)(),Z=(0,k.s0)(),F="course",_=(0,c.p)(),A=(0,t.useMemo)((function(){return n}),[n]);(0,t.useEffect)((function(){0===A.length&&D((0,v.Yu)(F))}),[D,F,A.length]);var R=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(n){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D((0,v.SR)(n,F,_));case 2:D((0,v.Yu)(F));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,y.jsxs)(o.K,{h:"100%",mt:1,children:[(0,y.jsxs)(l.xu,{px:10,h:"40px",display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,y.jsx)(d.L,{}),(0,y.jsx)(u.z,{onClick:function(){return Z("/add-course")},mt:2,size:"sm",_hover:{bg:"#FF9000"},w:"7.188rem",bg:"#FF9000",borderRadius:"0.25rem",color:"whiteAlpha.900",fontWeight:"700",fontSize:"1rem",children:"Add Product"}),(0,y.jsx)(l.xu,{mt:"2",ml:"3",children:(0,y.jsx)(u.z,{size:"xs",borderRadius:"full",onClick:function(){return D((0,v.Yu)(F))},children:(0,y.jsx)(w.Qxo,{})})})]}),(0,y.jsx)(h.i,{bg:"gray.300",height:"2px"}),(0,y.jsx)(x.x,{px:"2",children:(0,y.jsx)(l.xu,{overflowY:"auto",height:480,maxHeight:"480px",children:(0,y.jsxs)(a.i,{variant:"simple",size:"sm",children:[(0,y.jsx)(j.h,{bg:"gray.100",position:"sticky",top:"0",children:(0,y.jsxs)(f.Tr,{children:[(0,y.jsx)(p.Th,{children:"#"}),(0,y.jsx)(p.Th,{children:"Date Created"}),(0,y.jsx)(p.Th,{children:"Product Name"}),(0,y.jsx)(p.Th,{children:"Price"}),(0,y.jsx)(p.Th,{children:"Action"})]})}),r?(0,y.jsx)(z.Z,{}):(0,y.jsx)(m.p,{children:null===n||void 0===n?void 0:n.map((function(e,n){return(0,y.jsxs)(f.Tr,{children:[(0,y.jsx)(g.Td,{children:n+1}),(0,y.jsx)(g.Td,{children:new Date(e.createdAt).toLocaleDateString()}),(0,y.jsx)(g.Td,{children:e.CourseName}),(0,y.jsx)(g.Td,{children:e.CourseValue}),(0,y.jsxs)(g.Td,{display:"flex",alignItems:"center",children:[(0,y.jsx)(l.xu,{cursor:"pointer",mr:"5",onClick:function(){return Z("/update-course/".concat(e._id))},children:(0,y.jsx)(T.FNg,{color:"blue",size:19})}),(0,y.jsx)(l.xu,{cursor:"pointer",children:(0,y.jsx)(C.Z,{id:e._id,handleDelete:R})})]})]},e._id)}))})]})})})]})}}}]);
//# sourceMappingURL=293.1da0b4a1.chunk.js.map