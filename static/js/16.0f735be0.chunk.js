(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{138:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){var a=e.err;return a?r.a.createElement("div",{className:"alert alert-danger"},a.message?a.message:a):null}},139:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(8),s=t(142),c=t(143),i=t(11);a.a=function(e){var a=e.items,t=e.main,n=e.icon,o=null;return a&&(o=a.map(function(e,a){return r.a.createElement(s.a,{key:a},r.a.createElement(l.b,{className:"text-info",to:e.to},e.content))})),r.a.createElement(c.a,{listClassName:"bg-transparent rounded-0 small justify-content-end",style:{top:0,right:0,position:"absolute",zIndex:1e3}},r.a.createElement(s.a,null,r.a.createElement(l.b,{className:"text-info",to:"/"},r.a.createElement(i.a,{icon:n,className:"mr-1"})," Accueil")),o,r.a.createElement(s.a,{className:"text-danger",active:!0},t))}},140:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(11);a.a=function(e){var a=e.icon,t=e.children,n=e.className,s=e.user;return r.a.createElement("h2",{className:(s?"h4 ":"")+"mb-2 "+n},r.a.createElement(l.a,{icon:a,className:"mr-2",fixedWidth:!0}),t)}},141:function(e,a,t){"use strict";var n=t(0),r=t.n(n);a.a=function(e){var a=e.children,t=e.className;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"text-muted lead small "+t},a),r.a.createElement("hr",null))}},142:function(e,a,t){"use strict";var n=t(5),r=t(7),l=t(0),s=t.n(l),c=t(2),i=t.n(c),o=t(9),u=t.n(o),m=t(4),d={tag:m.m,active:i.a.bool,className:i.a.string,cssModule:i.a.object},p=function(e){var a=e.className,t=e.cssModule,l=e.active,c=e.tag,i=Object(r.a)(e,["className","cssModule","active","tag"]),o=Object(m.i)(u()(a,!!l&&"active","breadcrumb-item"),t);return s.a.createElement(c,Object(n.a)({},i,{className:o,"aria-current":l?"page":void 0}))};p.propTypes=d,p.defaultProps={tag:"li"},a.a=p},143:function(e,a,t){"use strict";var n=t(5),r=t(7),l=t(0),s=t.n(l),c=t(2),i=t.n(c),o=t(9),u=t.n(o),m=t(4),d={tag:m.m,listTag:m.m,className:i.a.string,listClassName:i.a.string,cssModule:i.a.object,children:i.a.node,"aria-label":i.a.string},p=function(e){var a=e.className,t=e.listClassName,l=e.cssModule,c=e.children,i=e.tag,o=e.listTag,d=e["aria-label"],p=Object(r.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),f=Object(m.i)(u()(a),l),b=Object(m.i)(u()("breadcrumb",t),l);return s.a.createElement(i,Object(n.a)({},p,{className:f,"aria-label":d}),s.a.createElement(o,{className:b},c))};p.propTypes=d,p.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=p},145:function(e,a,t){"use strict";var n=t(5),r=t(7),l=t(15),s=t(12),c=t(0),i=t.n(c),o=t(2),u=t.n(o),m=t(9),d=t.n(m),p=t(4),f={children:u.a.node,type:u.a.string,size:u.a.string,bsSize:u.a.string,valid:u.a.bool,invalid:u.a.bool,tag:p.m,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),plaintext:u.a.bool,addon:u.a.bool,className:u.a.string,cssModule:u.a.object},b=function(e){function a(a){var t;return(t=e.call(this,a)||this).getRef=t.getRef.bind(Object(l.a)(t)),t.focus=t.focus.bind(Object(l.a)(t)),t}Object(s.a)(a,e);var t=a.prototype;return t.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},t.focus=function(){this.ref&&this.ref.focus()},t.render=function(){var e=this.props,a=e.className,t=e.cssModule,l=e.type,s=e.bsSize,c=e.valid,o=e.invalid,u=e.tag,m=e.addon,f=e.plaintext,b=e.innerRef,g=Object(r.a)(e,["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"]),v=["radio","checkbox"].indexOf(l)>-1,h=new RegExp("\\D","g"),E=u||("select"===l||"textarea"===l?l:"input"),N="form-control";f?(N+="-plaintext",E=u||"input"):"file"===l?N+="-file":v&&(N=m?null:"form-check-input"),g.size&&h.test(g.size)&&(Object(p.n)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),s=g.size,delete g.size);var j=Object(p.i)(d()(a,o&&"is-invalid",c&&"is-valid",!!s&&"form-control-"+s,N),t);return("input"===E||u&&"function"===typeof u)&&(g.type=l),g.children&&!f&&"select"!==l&&"string"===typeof E&&"select"!==E&&(Object(p.n)('Input with a type of "'+l+'" cannot have children. Please use "value"/"defaultValue" instead.'),delete g.children),i.a.createElement(E,Object(n.a)({},g,{ref:b,className:j}))},a}(i.a.Component);b.propTypes=f,b.defaultProps={type:"text"},a.a=b},158:function(e,a,t){"use strict";var n=t(5),r=t(7),l=t(0),s=t.n(l),c=t(2),i=t.n(c),o=t(9),u=t.n(o),m=t(4),d={className:i.a.string,cssModule:i.a.object,size:i.a.string,bordered:i.a.bool,borderless:i.a.bool,striped:i.a.bool,dark:i.a.bool,hover:i.a.bool,responsive:i.a.oneOfType([i.a.bool,i.a.string]),tag:m.m,responsiveTag:m.m,innerRef:i.a.oneOfType([i.a.func,i.a.string,i.a.object])},p=function(e){var a=e.className,t=e.cssModule,l=e.size,c=e.bordered,i=e.borderless,o=e.striped,d=e.dark,p=e.hover,f=e.responsive,b=e.tag,g=e.responsiveTag,v=e.innerRef,h=Object(r.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),E=Object(m.i)(u()(a,"table",!!l&&"table-"+l,!!c&&"table-bordered",!!i&&"table-borderless",!!o&&"table-striped",!!d&&"table-dark",!!p&&"table-hover"),t),N=s.a.createElement(b,Object(n.a)({},h,{ref:v,className:E}));if(f){var j=Object(m.i)(!0===f?"table-responsive":"table-responsive-"+f,t);return s.a.createElement(g,{className:j},N)}return N};p.propTypes=d,p.defaultProps={tag:"table",responsiveTag:"div"},a.a=p},226:function(e,a,t){"use strict";var n=t(5),r=t(7),l=t(0),s=t.n(l),c=t(2),i=t.n(c),o=t(9),u=t.n(o),m=t(4),d={tag:m.m,size:i.a.string,className:i.a.string,cssModule:i.a.object},p=function(e){var a=e.className,t=e.cssModule,l=e.tag,c=e.size,i=Object(r.a)(e,["className","cssModule","tag","size"]),o=Object(m.i)(u()(a,"input-group",c?"input-group-"+c:null),t);return s.a.createElement(l,Object(n.a)({},i,{className:o}))};p.propTypes=d,p.defaultProps={tag:"div"},a.a=p},315:function(e,a,t){"use strict";var n=t(5),r=t(7),l=t(0),s=t.n(l),c=t(2),i=t.n(c),o=t(9),u=t.n(o),m=t(4),d={tag:m.m,className:i.a.string,cssModule:i.a.object},p=function(e){var a=e.className,t=e.cssModule,l=e.tag,c=Object(r.a)(e,["className","cssModule","tag"]),i=Object(m.i)(u()(a,"input-group-text"),t);return s.a.createElement(l,Object(n.a)({},c,{className:i}))};p.propTypes=d,p.defaultProps={tag:"span"};var f=p,b={tag:m.m,addonType:i.a.oneOf(["prepend","append"]).isRequired,children:i.a.node,className:i.a.string,cssModule:i.a.object},g=function(e){var a=e.className,t=e.cssModule,l=e.tag,c=e.addonType,i=e.children,o=Object(r.a)(e,["className","cssModule","tag","addonType","children"]),d=Object(m.i)(u()(a,"input-group-"+c),t);return"string"===typeof i?s.a.createElement(l,Object(n.a)({},o,{className:d}),s.a.createElement(f,{children:i})):s.a.createElement(l,Object(n.a)({},o,{className:d,children:i}))};g.propTypes=b,g.defaultProps={tag:"div"};a.a=g},317:function(e,a,t){"use strict";t.r(a);var n=t(16),r=t(25),l=t(26),s=t(28),c=t(27),i=t(29),o=t(0),u=t.n(o),m=t(33),d=t(137),p=t(226),f=t(315),b=t(80),g=t(145),v=t(127),h=t(50),E=t(158),N=t(30),j=t(11),O=t(139),y=t(40),x=t(140),C=t(141),k=t(138),T=t(31),P=function(e){function a(){var e,t;Object(r.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=Object(s.a)(this,(e=Object(c.a)(a)).call.apply(e,[this].concat(l)))).state={cart:[]},t.removeItemHandler=function(e){t.props.onDeleteCartItem(e)},t.minusClickedHandler=function(e){t.props.onSubtractCartItem(e)},t.plusClickedHandler=function(e){t.props.onAddCartItem(e)},t.clearClickedHandler=function(){t.props.onClearCart()},t}return Object(i.a)(a,e),Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,a=e.onAuthPageOff,t=e.onUserPageOn,n=e.onGetCart,r=e.auth,l=r.authPage,s=r.userPage;l&&a(),s||t(),n()}},{key:"componentWillUnmount",value:function(){this.props.onShopReset()}},{key:"render",value:function(){var e=this,a=this.props.shop,t=a.loading,n=a.cart,r=a.error,l=null,s=null,c=null;if(a.orderPosted&&(s=u.a.createElement(m.a,{to:"/orders"})),t)l=u.a.createElement("div",{className:"text-center"},u.a.createElement(d.a,{type:"grow",color:"danger",style:{width:"5rem",height:"5rem"},className:"mx-auto",size:"xl"}));else if(c=u.a.createElement(u.a.Fragment,null,u.a.createElement(k.a,{err:r})),n){var i=n.map(function(a){var t=a.productId,n=t.title,r=t._id,l=t.price,s=t.imageUrl,c=a.quantity;return u.a.createElement("tr",{key:r},u.a.createElement("td",{style:{maxWidth:"200px"}},u.a.createElement("img",{src:"http://localhost:8080/"+s,alt:n,className:"img-fluid"})),u.a.createElement("td",{className:"align-middle"},u.a.createElement("strong",{className:"lead"},n)),u.a.createElement("td",{className:"align-middle"},l," FCFA"),u.a.createElement("td",{className:"align-middle"},u.a.createElement(p.a,null,u.a.createElement(f.a,{addonType:"prepend"},u.a.createElement(b.a,{outline:!0,color:"danger",onClick:function(){return e.minusClickedHandler(r)}},"-")),u.a.createElement(g.a,{className:"text-center",readOnly:!0,value:c,style:{width:"20px"}}),u.a.createElement(f.a,{addonType:"append"},u.a.createElement(b.a,{outline:!0,color:"info",onClick:function(){return e.plusClickedHandler(r)}},"+")))),u.a.createElement("td",{className:"align-middle"},l*c," FCFA"),u.a.createElement("td",{className:"align-middle"},u.a.createElement(b.a,{color:"danger",onClick:function(){return e.removeItemHandler(r)}},u.a.createElement(j.a,{icon:"times"}))))}),o=n.reduce(function(e,a){return e+a.quantity*a.productId.price},0);l=0===n.length?u.a.createElement("h3",{className:"text-center"},"Aucun produit ajout\xe9 au panier."):u.a.createElement(u.a.Fragment,null,u.a.createElement(v.a,null,u.a.createElement(h.a,{xs:12,className:"pb-3 text-right"},u.a.createElement(b.a,{onClick:this.clearClickedHandler,color:"danger"},"Vider le panier ",u.a.createElement(j.a,{icon:"times"}))),u.a.createElement(h.a,{xs:12,className:"table-responsive-xl text-center"},u.a.createElement(E.a,{className:"bg-white",bordered:!0},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Image"),u.a.createElement("th",null,"Produit"),u.a.createElement("th",null,"Prix"),u.a.createElement("th",null,"Quantit\xe9"),u.a.createElement("th",null,"Total"),u.a.createElement("th",null,"Supprimer"))),u.a.createElement("tbody",null,i)))),u.a.createElement(v.a,{className:"justify-content-end"},u.a.createElement(h.a,{md:6,lg:4},u.a.createElement("h4",{className:"text-right"},"Prix total"),u.a.createElement("hr",null),u.a.createElement("div",{className:"d-flex justify-content-between mb-3"},u.a.createElement("span",null,"Total"),u.a.createElement("strong",null,o," FCFA")),u.a.createElement(b.a,{onClick:this.props.onPostOrder,block:!0,color:"info"},"Passer la commande"))))}return u.a.createElement("div",null,u.a.createElement(h.a,{xs:12,className:"Cart p-0"},s,u.a.createElement(O.a,{main:"Panier",icon:"shopping-cart"}),u.a.createElement(y.a,{user:!0,bg:"light",className:"py-0"},u.a.createElement(x.a,{user:!0,icon:"shopping-cart"},"Panier"),u.a.createElement(C.a,null,"Ici, vous pouvez consulter la liste des produits que vous avez ajout\xe9s \xe0 votre panier d'achats."),c,l)))}}]),a}(o.Component);a.default=Object(m.g)(Object(N.b)(function(e){return Object(n.a)({},e)},function(e){return{onAuthPageOff:function(){return e(T.y())},onUserPageOn:function(){return e(T.Z())},onShopReset:function(){return e(T.W())},onGetCart:function(){return e(T.F())},onAddCartItem:function(a){return e(T.a(a))},onSubtractCartItem:function(a){return e(T.X(a))},onDeleteCartItem:function(a){return e(T.E(a))},onClearCart:function(){return e(T.C())},onPostOrder:function(){return e(T.Q())}}})(P))}}]);
//# sourceMappingURL=16.0f735be0.chunk.js.map