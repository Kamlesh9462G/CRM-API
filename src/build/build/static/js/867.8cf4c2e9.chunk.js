"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[867],{1867:function(e,r,i){i.r(r);var n=i(1413),o=i(9439),l=i(751),s=i(3722),t=i(4087),d=i(2392),a=i(6069),u=i(8208),c=i(9229),h=i(8886),m=i(4224),x=i(2791),f=i(9434),p=i(7689),g=i(7165),j=i(5232),y=i(2424),b=i(1134),v=i(8596),C=i(3682),Z=i(184),N={file:null};r.default=function(){var e,r=(0,x.useState)(N),i=(0,o.Z)(r,2),q=i[0],I=i[1],z=(0,f.v9)((function(e){return e.common})),S=z.branches,U=z.users,P=z.cities,E=(0,b.cI)(),R=E.register,B=E.handleSubmit,W=E.control,w=E.formState.errors;(0,x.useEffect)((function(){_((0,g.Yu)("branch")),_((0,g.Yu)("user")),_((0,g.Yu)("city"))}),[g.Yu]);var _=(0,f.I0)(),k=(0,p.s0)(),T=(0,C.p)(),F=null===S||void 0===S?void 0:S.map((function(e){return(0,Z.jsx)("option",{value:e.BranchName,children:e.BranchName},e._id)})),Y=null===P||void 0===P?void 0:P.map((function(e){return(0,Z.jsx)("option",{value:e.CityName,children:e.CityName},e._id)})),D=(0,y.ZP)(),M=(0,x.useState)([]),A=(0,o.Z)(M,2),G=A[0],H=A[1],K=U.filter((function(e){return 3===e.role})),J=null===K||void 0===K?void 0:K.map((function(e){return{value:e._id,label:e.Name}}));return(0,Z.jsxs)(l.K,{h:"100%",children:[(0,Z.jsxs)("form",{onSubmit:B((function(e){var r=(0,n.Z)((0,n.Z)({},e),{},{file:q.file}),i=G.map((function(e){return e.label}));r.selectedUsers=i,_((0,g.qC)(r,"user",k,T)).then((function(){_((0,g.Yu)("user")),k("/user-list"),console.log("ok")}))})),children:[(0,Z.jsxs)(s.M,{columns:[1,1,2,3],autoFlow:"row",gap:7,px:[2,5],py:[2,5],minWidth:"250px",children:[(0,Z.jsx)(t.xu,{children:(0,Z.jsxs)(d.NI,{variant:"floating",id:"Name",children:[(0,Z.jsx)(a.I,(0,n.Z)((0,n.Z)({autoComplete:"off"},R("Name",{required:"name is required"})),{},{borderColor:null!==w&&void 0!==w&&w.Name?"red.500":"gray.400",borderRadius:"0.25rem",size:"sm",placeholder:" ",className:"autocomplete-input"})),(0,Z.jsx)(u.l,{fontWeight:"400",color:"gray.600",children:"Enter Name"}),w.Name&&(0,Z.jsx)(c.x,{color:"red.500",fontSize:"xs",children:null===(e=w.Name)||void 0===e?void 0:e.message})]})}),(0,Z.jsx)(t.xu,{children:(0,Z.jsxs)(d.NI,{variant:"floating",id:"Phone",children:[(0,Z.jsx)(a.I,(0,n.Z)((0,n.Z)({autoComplete:"off"},R("Phone",{required:"mobile no is required"})),{},{borderColor:null!==w&&void 0!==w&&w.Phone?"red.500":"gray.400",borderRadius:"0.25rem",size:"sm",placeholder:" ",type:"number"})),(0,Z.jsx)(u.l,{fontWeight:"400",color:"gray.600",children:"Enter Phone No."}),w.Phone&&(0,Z.jsx)(c.x,{color:"red.500",fontSize:"xs",children:"mobile no is required"})]})}),(0,Z.jsx)(t.xu,{children:(0,Z.jsxs)(d.NI,{variant:"floating",id:"Email",children:[(0,Z.jsx)(a.I,(0,n.Z)((0,n.Z)({autoComplete:"off"},R("Email",{required:"email ID is required"})),{},{borderColor:null!==w&&void 0!==w&&w.Email?"red.500":"gray.400",borderRadius:"0.25rem",size:"sm",placeholder:" "})),(0,Z.jsx)(u.l,{fontWeight:"400",color:"gray.600",children:"Enter Email ID"}),w.Email&&(0,Z.jsx)(c.x,{color:"red.500",fontSize:"xs",children:"email ID is required"})]})}),(0,Z.jsx)(t.xu,{children:(0,Z.jsxs)(d.NI,{variant:"floating",id:"Branch",children:[(0,Z.jsxs)(h.P,(0,n.Z)((0,n.Z)({},R("Branch",{required:"Branch is required"})),{},{borderColor:null!==w&&void 0!==w&&w.Branch?"red.500":"gray.400",size:"sm",borderRadius:"0.25rem",placeholder:"",children:[" ",(0,Z.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Select Branch"}),F]})),(0,Z.jsx)(u.l,{fontWeight:"400",color:"gray.600",children:"Branch"}),w.Branch&&(0,Z.jsx)(c.x,{color:"red.500",fontSize:"xs",children:"branch is required"})]})}),(0,Z.jsx)(t.xu,{children:(0,Z.jsxs)(d.NI,{variant:"floating",id:"City",children:[(0,Z.jsxs)(h.P,(0,n.Z)((0,n.Z)({},R("City",{required:"City is required"})),{},{borderColor:null!==w&&void 0!==w&&w.City?"red.500":"gray.400",size:"sm",borderRadius:"0.25rem",placeholder:"",children:[" ",(0,Z.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Select City"}),Y]})),(0,Z.jsx)(u.l,{fontWeight:"400",color:"gray.600",children:"City"}),w.City&&(0,Z.jsx)(c.x,{color:"red.500",fontSize:"xs",children:"City is required"})]})}),(0,Z.jsx)(t.xu,{children:(0,Z.jsxs)(d.NI,{variant:"floating",id:"UserName",children:[(0,Z.jsx)(a.I,(0,n.Z)((0,n.Z)({autoComplete:"off"},R("UserName",{required:"UserName is required"})),{},{borderColor:null!==w&&void 0!==w&&w.UserName?"red.500":"gray.400",borderRadius:"0.25rem",size:"sm",placeholder:" "})),(0,Z.jsx)(u.l,{fontWeight:"400",color:"gray.600",children:"Enter Unique Username"}),w.UserName&&(0,Z.jsx)(c.x,{color:"red.500",fontSize:"xs",children:"username is required"})]})}),(0,Z.jsx)(t.xu,{children:(0,Z.jsxs)(d.NI,{variant:"floating",id:"UserType",children:[(0,Z.jsx)(a.I,(0,n.Z)((0,n.Z)({autoComplete:"off"},R("UserType",{required:"UserType is required"})),{},{borderColor:null!==w&&void 0!==w&&w.UserType?"red.500":"gray.400",borderRadius:"0.25rem",size:"sm",placeholder:" "})),(0,Z.jsx)(u.l,{fontWeight:"400",color:"gray.600",children:"Enter User Profile"}),w.UserType&&(0,Z.jsx)(c.x,{color:"red.500",fontSize:"xs",children:"user type is required"})]})}),(0,Z.jsx)(t.xu,{children:(0,Z.jsx)(a.I,{borderColor:"gray.400",size:"sm",type:"file",borderRadius:"0.25rem",sx:{"::file-selector-button":{bg:"gray.500",color:"white",ml:-6,mt:.7,py:1.45,px:12,mr:15,borderRadius:"0.25rem",_hover:{bg:"blue.600"}}},flexGrow:1,onChange:function(e){var r,i=null===(r=e.target.files)||void 0===r?void 0:r[0];I((0,n.Z)((0,n.Z)({},q),{},{file:i||null}))}})}),(0,Z.jsxs)(t.xu,{mt:"-3",children:[(0,Z.jsx)(c.x,{fontSize:"0.9rem",ml:"2",mb:"0.5",children:"Permissions"}),(0,Z.jsx)(j.ZP,{id:"assigned-users",name:"assigned-users",className:"react-select-sm",styles:{control:function(e,r){return(0,n.Z)((0,n.Z)({},e),{},{background:"#fff",borderColor:"#9e9e9e",minHeight:"30px",height:"30px"})},valueContainer:function(e,r){return(0,n.Z)((0,n.Z)({},e),{},{height:"30px",padding:"0 6px"})},input:function(e,r){return(0,n.Z)((0,n.Z)({},e),{},{margin:"0px"})},indicatorSeparator:function(e){return{display:"none"}},indicatorsContainer:function(e,r){return(0,n.Z)((0,n.Z)({},e),{},{height:"30px"})}},placeholder:"Select Permisssions",isMulti:!0,components:D,options:J,value:G,onChange:function(e){H(e)}})]}),(0,Z.jsx)(t.xu,{display:"flex",justifyContent:"flex-end",alignItems:"center"})," "]}),(0,Z.jsx)(t.xu,{display:"flex",justifyContent:"flex-end",alignItems:"center",mx:4,children:(0,Z.jsx)(m.z,{type:"submit",mt:6,size:"sm",_hover:{bg:"#FF9000"},w:"8.188rem",bg:"#FF9000",borderRadius:"0.25rem",color:"whiteAlpha.900",fontWeight:"700",fontSize:"1rem",children:"Submit"})})," "]}),(0,Z.jsx)(v.DevTool,{control:W})]})}}}]);
//# sourceMappingURL=867.8cf4c2e9.chunk.js.map