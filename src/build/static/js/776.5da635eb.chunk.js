"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[776],{776:function(e,r,i){i.r(r);var n=i(1413),o=i(3682),c=i(751),l=i(9683),s=i(4087),t=i(9229),a=i(8886),d=i(6069),u=i(4224),h=i(2791),m=i(1134),f=i(9434),p=i(7165),x=i(7689),j=i(8596),v=i(184);r.default=function(){var e=(0,m.cI)(),r=e.register,i=e.handleSubmit,Z=e.reset,S=e.control,g=e.formState.errors,b=(0,f.v9)((function(e){return e.common})),_=b.source,y=b.sources,N=b.loading,z=(0,x.UO)().id,C="source",w=(0,f.I0)(),k=(0,x.s0)(),E=(0,o.p)();(0,h.useEffect)((function(){w((0,p.M4)(z,C)),w((0,p.Yu)(C))}),[z]),(0,h.useEffect)((function(){_&&Z(_)}),[_]);return(0,v.jsxs)(c.K,{h:"100%",children:[(0,v.jsx)("form",{onSubmit:i((function(e){w((0,p.VA)(z,C,e,k,E)).then((function(){w((0,p.Yu)("source"))}))})),children:(0,v.jsxs)(l.M,{columns:3,px:10,py:1,gap:6,children:[(0,v.jsxs)(s.xu,{children:[(0,v.jsx)(t.x,{fontSize:"1rem",ml:"2",mb:"0.5",children:"Source Name"}),(0,v.jsx)(a.P,(0,n.Z)((0,n.Z)({},r("SourceName",{required:!0})),{},{size:"sm",borderColor:g.SourceName?"red.500":"gray.400",borderRadius:"0.25rem",children:null===y||void 0===y?void 0:y.map((function(e){return(0,v.jsx)("option",{value:e.SourceName,children:e.SourceName},e._id)}))})),g.SourceName&&(0,v.jsx)(t.x,{color:"red.500",fontSize:"xs",children:"Source name is required"})]}),(0,v.jsxs)(s.xu,{children:[(0,v.jsx)(t.x,{fontSize:"1rem",ml:"2",mb:"0.5",children:"Description"}),(0,v.jsx)(d.I,(0,n.Z)((0,n.Z)({},r("Description",{required:!0})),{},{size:"sm",borderColor:null!==g&&void 0!==g&&g.Description?"red.500":"gray.400",borderRadius:"0.25rem",placeholder:""})),g.Description&&(0,v.jsx)(t.x,{color:"red.500",fontSize:"xs",children:"Description is required."})]}),(0,v.jsx)(s.xu,{display:"flex",justifyContent:"flex-start",alignItems:"center",children:(0,v.jsx)(u.z,{isLoading:N,loadingText:"Please wait...",type:"submit",size:"sm",mt:6,_hover:{bg:"#FF9000"},w:"8.188rem",bg:"#FF9000",borderRadius:"0.25rem",color:"whiteAlpha.900",fontWeight:"700",fontSize:"1rem",children:"Update Source"})})]})}),(0,v.jsx)(j.DevTool,{control:S})]})}},8886:function(e,r,i){i.d(r,{P:function(){return v}});var n=i(1413),o=i(5987),c=i(9439),l=i(6992),s=i(7872),t=i(1999),a=i(184),d=["children","placeholder","className"],u=(0,s.G)((function(e,r){var i=e.children,c=e.placeholder,s=e.className,u=(0,o.Z)(e,d);return(0,a.jsxs)(t.m.select,(0,n.Z)((0,n.Z)({},u),{},{ref:r,className:(0,l.cx)("chakra-select",s),children:[c&&(0,a.jsx)("option",{value:"",children:c}),i]}))}));u.displayName="SelectField";var h=i(3461),m=i(9084),f=i(2996),p=i(2791),x=["rootProps","placeholder","icon","color","height","h","minH","minHeight","iconColor","iconSize"],j=["children"];var v=(0,s.G)((function(e,r){var i,s=(0,m.jC)("Select",e),d=(0,f.Lr)(e),p=d.rootProps,j=d.placeholder,v=d.icon,Z=d.color,S=d.height,b=d.h,_=d.minH,y=d.minHeight,N=d.iconColor,z=d.iconSize,C=function(e,r){for(var i={},n={},o=0,l=Object.entries(e);o<l.length;o++){var s=(0,c.Z)(l[o],2),t=s[0],a=s[1];r.includes(t)?i[t]=a:n[t]=a}return[i,n]}((0,o.Z)(d,x),f.oE),w=(0,c.Z)(C,2),k=w[0],E=w[1],I=(0,h.Y)(E),D={width:"100%",height:"fit-content",position:"relative",color:Z},P=(0,n.Z)((0,n.Z)({paddingEnd:"2rem"},s.field),{},{_focus:(0,n.Z)({zIndex:"unset"},null==(i=s.field)?void 0:i._focus)});return(0,a.jsxs)(t.m.div,(0,n.Z)((0,n.Z)((0,n.Z)({className:"chakra-select__wrapper",__css:D},k),p),{},{children:[(0,a.jsx)(u,(0,n.Z)((0,n.Z)({ref:r,height:null!=b?b:S,minH:null!=_?_:y,placeholder:j},I),{},{__css:P,children:e.children})),(0,a.jsx)(g,(0,n.Z)((0,n.Z)((0,n.Z)({"data-disabled":(0,l.PB)(I.disabled)},(N||Z)&&{color:N||Z}),{},{__css:s.icon},z&&{fontSize:z}),{},{children:v}))]}))}));v.displayName="Select";var Z=function(e){return(0,a.jsx)("svg",(0,n.Z)((0,n.Z)({viewBox:"0 0 24 24"},e),{},{children:(0,a.jsx)("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})}))},S=(0,t.m)("div",{baseStyle:{position:"absolute",display:"inline-flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}}),g=function(e){var r=e.children,i=void 0===r?(0,a.jsx)(Z,{}):r,c=(0,o.Z)(e,j),l=(0,p.cloneElement)(i,{role:"presentation",className:"chakra-select__icon",focusable:!1,"aria-hidden":!0,style:{width:"1em",height:"1em",color:"currentColor"}});return(0,a.jsx)(S,(0,n.Z)((0,n.Z)({},c),{},{className:"chakra-select__icon-wrapper",children:(0,p.isValidElement)(i)?l:null}))};g.displayName="SelectIcon"}}]);
//# sourceMappingURL=776.5da635eb.chunk.js.map