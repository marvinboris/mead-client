(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{152:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(8),c=a(142),s=a(126),i=a(143);t.a=function(e){var t=e.items,a=e.main,n=null;return t&&(n=t.map(function(e,t){return r.a.createElement(c.a,{key:t},r.a.createElement(l.b,{className:"text-info",to:e.to},e.content))})),r.a.createElement("div",{className:"container-fluid bg-light"},r.a.createElement(s.a,{className:"p-0"},r.a.createElement(i.a,{listClassName:"bg-transparent rounded-0"},r.a.createElement(c.a,null,r.a.createElement(l.b,{className:"text-info",to:"/"},"Accueil")),n,r.a.createElement(c.a,{className:"text-danger",active:!0},a))))}},276:function(e,t){},278:function(e,t){},345:function(e,t,a){"use strict";a.r(t);var n=a(16),r=a(25),l=a(26),c=a(28),s=a(27),i=a(29),o=a(0),u=a.n(o),m=a(30),f=a(271),p=a.n(f),d=a(50),h=a(137),g=a(127),b=a(152),E=a(120),v=a(121),N=a(122),w=a(123),x=a(124),y=a(125),O=function(e){var t=e.src,a=e.title,n=e.subtitle,r=e.children,l=(e.link,e.md),c=e.lg,s=new Date(n);return u.a.createElement(d.a,{md:l,lg:c,className:"pb-3"},u.a.createElement(E.a,null,u.a.createElement(v.a,{top:!0,width:"100%",src:t,alt:"News card cap"}),u.a.createElement(N.a,null,u.a.createElement(w.a,{className:"h6 text-info"},a),u.a.createElement(x.a,{className:"text-danger mb-3"},"Publi\xe9 le ",s.getDate()," ",["Janvier","F\xe9vrier","Mars","Avril","Mai","Juin","Juillet","Ao\xfbt","Septembre","Octobre","Novembre","D\xe9cembre"][s.getMonth()]," ",s.getFullYear()),u.a.createElement(y.a,{className:"small",dangerouslySetInnerHTML:{__html:r}}))))},k=a(59),j=a(40),A=a(31),P=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={data:[]},a}return Object(i.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.auth.authPage&&this.props.onAuthPageOff(),this.props.auth.userPage&&this.props.onUserPageOff();(new p.a).parseURL("https://cors-anywhere.herokuapp.com/https://cdn-elle.ladmedia.fr/var/plain_site/storage/flux_rss/fluxMode.xml").then(function(t){e.setState(function(e){return{data:e.data.concat(t)}})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e=this.state.data,t=null;return e.length&&(t=e[0].items.map(function(e,t){return u.a.createElement(O,{key:t,src:e.enclosure.url,md:6,lg:4,link:e.link,subtitle:e.pubDate,title:e.title},e.content)})),u.a.createElement(d.a,{xs:12,className:"p-0"},u.a.createElement(b.a,{main:"Actualit\xe9s"}),u.a.createElement(j.a,null,t?u.a.createElement(u.a.Fragment,null,u.a.createElement(k.a,{className:"text-center"},"Derni\xe8res infos sur la mode dans le monde"),u.a.createElement(g.a,{className:"justify-content-center"},t)):u.a.createElement("div",{className:"text-center"},u.a.createElement(h.a,{type:"grow",color:"danger",style:{width:"5rem",height:"5rem"},className:"mx-auto",size:"xl"}))))}}]),t}(o.Component);t.default=Object(m.b)(function(e){return Object(n.a)({},e)},function(e){return{onAuthPageOff:function(){return e(A.y())},onUserPageOff:function(){return e(A.Y())}}})(P)}}]);
//# sourceMappingURL=35.fb6e967c.chunk.js.map