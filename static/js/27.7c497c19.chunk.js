(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{138:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){var a=e.err;return a?r.a.createElement("div",{className:"alert alert-danger"},a.message?a.message:a):null}},139:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(8),s=t(142),l=t(143),i=t(11);a.a=function(e){var a=e.items,t=e.main,n=e.icon,o=null;return a&&(o=a.map(function(e,a){return r.a.createElement(s.a,{key:a},r.a.createElement(c.b,{className:"text-info",to:e.to},e.content))})),r.a.createElement(l.a,{listClassName:"bg-transparent rounded-0 small justify-content-end",style:{top:0,right:0,position:"absolute",zIndex:1e3}},r.a.createElement(s.a,null,r.a.createElement(c.b,{className:"text-info",to:"/"},r.a.createElement(i.a,{icon:n,className:"mr-1"})," Accueil")),o,r.a.createElement(s.a,{className:"text-danger",active:!0},t))}},140:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(11);a.a=function(e){var a=e.icon,t=e.children,n=e.className,s=e.user;return r.a.createElement("h2",{className:(s?"h4 ":"")+"mb-2 "+n},r.a.createElement(c.a,{icon:a,className:"mr-2",fixedWidth:!0}),t)}},141:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){var a=e.children,t=e.className;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"text-muted lead small "+t},a),r.a.createElement("hr",null))}},142:function(e,a,t){"use strict";var n=t(5),r=t(7),c=t(0),s=t.n(c),l=t(2),i=t.n(l),o=t(9),m=t.n(o),u=t(4),d={tag:u.m,active:i.a.bool,className:i.a.string,cssModule:i.a.object},b=function(e){var a=e.className,t=e.cssModule,c=e.active,l=e.tag,i=Object(r.a)(e,["className","cssModule","active","tag"]),o=Object(u.i)(m()(a,!!c&&"active","breadcrumb-item"),t);return s.a.createElement(l,Object(n.a)({},i,{className:o,"aria-current":c?"page":void 0}))};b.propTypes=d,b.defaultProps={tag:"li"},a.a=b},143:function(e,a,t){"use strict";var n=t(5),r=t(7),c=t(0),s=t.n(c),l=t(2),i=t.n(l),o=t(9),m=t.n(o),u=t(4),d={tag:u.m,listTag:u.m,className:i.a.string,listClassName:i.a.string,cssModule:i.a.object,children:i.a.node,"aria-label":i.a.string},b=function(e){var a=e.className,t=e.listClassName,c=e.cssModule,l=e.children,i=e.tag,o=e.listTag,d=e["aria-label"],b=Object(r.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),g=Object(u.i)(m()(a),c),f=Object(u.i)(m()("breadcrumb",t),c);return s.a.createElement(i,Object(n.a)({},b,{className:g,"aria-label":d}),s.a.createElement(o,{className:f},l))};b.propTypes=d,b.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=b},318:function(e,a,t){"use strict";t.r(a);var n=t(16),r=t(25),c=t(26),s=t(28),l=t(27),i=t(29),o=t(0),m=t.n(o),u=t(30),d=t(8),b=t(33),g=t(137),f=t(50),v=t(51),h=t(31),p=t(139),E=t(40),N=t(140),j=t(141),O=t(138),y=function(e){function a(){return Object(r.a)(this,a),Object(s.a)(this,Object(l.a)(a).apply(this,arguments))}return Object(i.a)(a,e),Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,a=e.onAuthPageOff,t=e.onUserPageOn,n=e.onGetMyCommunities,r=e.auth,c=r.authPage,s=r.userPage;c&&a(),s||t(),n()}},{key:"render",value:function(){var e=this.props.shop,a=e.communities,t=e.loading,n=e.error,r=null,c=null;if(t)r=m.a.createElement("div",{className:"text-center"},m.a.createElement(g.a,{type:"grow",color:"danger",style:{width:"5rem",height:"5rem"},className:"mx-auto",size:"xl"}));else if(c=m.a.createElement(m.a.Fragment,null,m.a.createElement(O.a,{err:n})),a){var s=a.map(function(e,a){var t=e.owner,n=e.name,r=e.imageUrl;return a>0?m.a.createElement(f.a,{className:"pb-3 pt-2 mb-3 shadow-sm bg-white",key:t._id},m.a.createElement(v.a,null,m.a.createElement(v.a,{left:!0},m.a.createElement(v.a,{object:!0,src:r?"http://localhost:8080/"+r:"holder.js/64x64",style:{width:64,height:64,objectFit:"cover",objectPosition:"center"},className:"rounded-circle mr-2",alt:n})),m.a.createElement(v.a,{body:!0},m.a.createElement(v.a,{heading:!0},m.a.createElement(d.b,{to:"/communities/"+t._id,className:"text-reset"},n)),"Propri\xe9taire : ",m.a.createElement("strong",null,t.name)))):null});r=s.length>0?s:m.a.createElement("h3",{className:"text-center"},"Aucune communaut\xe9 suivie pour le moment.")}return m.a.createElement("div",null,m.a.createElement(f.a,{xs:12,className:"p-0"},m.a.createElement(p.a,{main:"Mes communaut\xe9s",icon:"store"}),m.a.createElement(E.a,{user:!0,bg:"light"},m.a.createElement(N.a,{user:!0,icon:"store"},"Mes communaut\xe9s"),m.a.createElement(j.a,null,"Ici, vous pouvez consulter la liste des communaut\xe9s que vous suivez."),c,r)))}}]),a}(o.Component);a.default=Object(b.g)(Object(u.b)(function(e){return Object(n.a)({},e)},function(e){return{onAuthPageOff:function(){return e(h.y())},onUserPageOn:function(){return e(h.Z())},onGetInvoice:function(a){return e(h.H(a))},onGetMyCommunities:function(){return e(h.I())}}})(y))}}]);
//# sourceMappingURL=27.7c497c19.chunk.js.map