(this.webpackJsonpkulttuurisomefrontend=this.webpackJsonpkulttuurisomefrontend||[]).push([[0],{100:function(e,n,t){},101:function(e,n,t){},106:function(e,n,t){},107:function(e,n,t){},108:function(e,n,t){},109:function(e,n,t){},110:function(e,n,t){},111:function(e,n,t){},123:function(e,n,t){"use strict";t.r(n);var c,a,s,i,r,o,l,j,d,u,b,O,m,h,v,x,p=t(60),f=t(2),g=t(71),N=t.n(g),k=t(138),S=t(17),C=t(53),w=t(124),y=t(122),E=t(77),I=t(26),T=t(75),D=(t(89),t(6)),U=t(10),q=t(11),$=(t(90),t(64),t(0)),L=function(e){var n=e.show;e.setShow;return n?Object($.jsx)("div",{className:"dropdown",children:Object($.jsx)("h3",{className:"notifications-title",children:"Notifications"})}):null},A=t(14),F=t.n(A),G=t(21),R=t(134),M=t(135),H=t(136),Q=t(15),P=t(31),B=Object(P.a)(c||(c=Object(Q.a)(["\n  query {\n    me {\n      id\n      username\n      jobQueries {\n        id, content, date\n      },\n      groups {\n        id\n        name\n      }\n    }\n  }\n"]))),J=Object(P.a)(a||(a=Object(Q.a)(["\n  query findUser($id: ID!){\n    findUser (id: $id) {\n      username,\n      profile {\n        about\n      }\n    }\n  }\n"]))),W=(Object(P.a)(s||(s=Object(Q.a)(["\n  query ($id: ID!) {\n    findGroup(id: $id) {\n      name\n    }\n  }\n"]))),Object(P.a)(i||(i=Object(Q.a)(["\n  query ($id: ID!) {\n    findUserOrGroup(id: $id) {\n        ... on User {\n        id,\n        username\n      }\n      ... on Group {\n        id,\n        name\n      }\n    }\n  }\n"])))),K=Object(P.a)(r||(r=Object(Q.a)(["\n  query {\n    me {\n      id\n    }\n  }\n"]))),Y=Object(P.a)(o||(o=Object(Q.a)(["\n  query {\n    me {\n      conversations {\n        id,\n        users {\n          username\n          }\n      }\n    }\n  }\n"]))),_=Object(P.a)(l||(l=Object(Q.a)(["\n  query ($id: ID!) {\n    findConversation(id: $id) {\n      id, \n      users {\n        id,\n        username\n      },\n      messages {\n        id\n        sender {\n          id\n        }\n        body \n      } \n    }\n  }\n"]))),z=Object(P.a)(j||(j=Object(Q.a)(["\n  query {\n    allJobqueries  {\n      content\n      date\n      user {\n        username\n      }\n    }\n  }\n"]))),V=Object(P.a)(d||(d=Object(Q.a)(["\n  query {\n    allUsers {\n      id\n      username \n      jobQueries {\n        content\n      }\n    }\n  }\n"]))),X="kulttuurisome-user-token",Z="kulttuurisome-session-token",ee=function(e){var n=e.show,t=e.setShow,c=Object(R.a)(),a=Object(M.a)(B),s=sessionStorage.getItem(Z),i=Object(H.a)(W),r=Object(D.a)(i,2),o=r[0],l=r[1],j=l.loading,d=l.data;Object(f.useEffect)((function(){o({variables:{id:s}})}),[]),console.log("DATA",d);var u=Object(q.f)();if(!n)return null;if(j)return Object($.jsx)("div",{className:"dropdown",children:"Loading..."});var b=function(){var e=Object(G.a)(F.a.mark((function e(){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.resetStore();case 2:localStorage.clear(),sessionStorage.clear(),window.location.assign("/");case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=Object(G.a)(F.a.mark((function e(n){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("SWITCH PROFILE TO ",n),sessionStorage.setItem(Z,n),o({variables:{id:n}});case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object($.jsxs)("div",{className:"dropdown",children:[Object($.jsxs)("div",{className:"dropdown-profile",onClick:function(){u.push("/profile/".concat(d.findUserOrGroup.id)),t(!1)},children:[Object($.jsx)("div",{children:Object($.jsx)("img",{src:"https://content.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg",alt:"musician",className:"profile-image"})}),Object($.jsx)("h3",{className:"profile-name",children:d.findUserOrGroup.username||d.findUserOrGroup.name}),Object($.jsx)("p",{className:"secondary-text",children:"Show profile"})]}),Object($.jsx)("div",{className:"dropdown-link",onClick:function(){sessionStorage.setItem(Z,a.data.me.id),o({variables:{id:a.data.me.id}})},children:Object($.jsx)("b",{children:"Me"})}),Object($.jsx)("div",{className:"dropdown-link",onClick:function(){console.log("NEW GROUP CLICKED")},children:Object($.jsx)("b",{children:"My groups +"})}),Object($.jsx)(U.b,{to:"/newgroup",activeClassName:"active",children:"New group"}),a.data.me.groups.map((function(e){return Object($.jsx)("div",{className:"dropdown-link",onClick:function(){return O(e.id)},children:e.name})})),Object($.jsx)("div",{className:"dropdown-link",onClick:function(){u.push("/settings"),t(!1)},children:"Settings"}),Object($.jsx)("div",{className:"dropdown-link",onClick:b,children:"Log out"})]})},ne=function(){var e=Object(f.useState)(!1),n=Object(D.a)(e,2),t=n[0],c=n[1],a=Object(f.useState)(!1),s=Object(D.a)(a,2),i=s[0],r=s[1],o=Object(f.useState)(!1),l=Object(D.a)(o,2),j=l[0],d=l[1],u=function(){c(!t),r(!1),d(!1)};return Object($.jsx)($.Fragment,{children:Object($.jsx)("nav",{className:"navbar",children:Object($.jsxs)("div",{className:"nav-container",children:[Object($.jsx)("div",{className:"nav-icon nav-menu",onClick:u,children:Object($.jsx)("i",{className:t?"fas fa-arrow-left":"fas fa-bars"})}),Object($.jsxs)(U.b,{to:"/",className:"nav-logo nav-menu",children:["HalfEatenBiscuit ",Object($.jsx)("i",{className:"fas fa-cookie-bite"})]}),Object($.jsxs)("ul",{className:t?"nav-menu hidden-links active":"nav-menu hidden-links",children:[Object($.jsx)("li",{className:"nav-item",children:Object($.jsx)(U.b,{exact:!0,to:"/",activeClassName:"active",className:"nav-links",onClick:u,children:"Home"})}),Object($.jsx)("li",{className:"nav-item",children:Object($.jsx)(U.b,{exact:!0,to:"/jobmarket/queries",activeClassName:"active",className:"nav-links",onClick:u,children:"Jobmarket"})}),Object($.jsx)("li",{className:"nav-item",children:Object($.jsx)(U.b,{exact:!0,to:"/profiles",activeClassName:"active",className:"nav-links",onClick:u,children:"Profiles"})})]}),Object($.jsxs)("ul",{className:"nav-menu constant-links",children:[Object($.jsx)("li",{className:"nav-item",children:Object($.jsx)(U.b,{exact:!0,to:"/messages",activeClassName:"active",className:"nav-links",children:Object($.jsx)("i",{className:"fa fa-comment"})})}),Object($.jsxs)("li",{className:"nav-item dropdown-container",children:[Object($.jsx)("div",{onClick:function(){d(!1),r(!i)},tabIndex:0,className:"nav-links",children:Object($.jsx)("i",{className:"fa fa-bell",children:" \u25bf"})}),Object($.jsx)(L,{show:i,setShow:r})]}),Object($.jsxs)("li",{className:"nav-item dropdown-container",children:[Object($.jsx)("div",{onClick:function(){r(!1),d(!j)},tabIndex:0,className:"nav-links",children:Object($.jsx)("i",{className:"fa fa-user",children:" \u25bf"})}),Object($.jsx)(ee,{show:j,setShow:d})]})]})]})})})},te=(t(100),function(e){var n=e.setShowContacts,t=Object(M.a)(Y);if(t.loading)return Object($.jsx)("div",{children:"Loading..."});var c=t.data.me.conversations;return Object($.jsx)("nav",{className:"msg-navigation",children:Object($.jsxs)("div",{className:"msg-nav-container",children:[Object($.jsx)("input",{value:"Search from conversations"}),Object($.jsx)("ul",{className:"msg-nav-menu",children:c.map((function(e){var t=e.users.map((function(e){return e.username})),c="../messages/".concat(e.id);return Object($.jsx)("li",{className:"msg-nav-item",children:Object($.jsx)(U.b,{exact:!0,to:c,activeClassName:"msg-active",className:"msg-nav-links",onClick:function(){return n(!1)},children:t})},e.id)}))})]})})}),ce=t(140),ae=t(141),se=(t(101),Object(P.a)(u||(u=Object(Q.a)(["\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password)  {\n      value, \n      id\n    }\n  }\n"])))),ie=Object(P.a)(b||(b=Object(Q.a)(["\n  mutation createUser($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      username\n    }\n}\n"]))),re=Object(P.a)(O||(O=Object(Q.a)(["\n  mutation createJobquery($content: String!) {\n    createJobquery(content: $content) {\n      content\n    }\n}\n"]))),oe=Object(P.a)(m||(m=Object(Q.a)(["\n  mutation newConversation($receiverId: ID!) {\n    createConversation(receiverId: $receiverId) {\n      id\n    }\n  }\n"]))),le=Object(P.a)(h||(h=Object(Q.a)(["\n  mutation sendMessage($id: ID!, $body: String!) {\n    sendMessage(conversationId: $id, body: $body) {\n      body\n    }\n}\n"]))),je=Object(P.a)(v||(v=Object(Q.a)(["\n  mutation createGroup($name: String!, $users: [ID!]!){\n    createGroup(name: $name, users: $users) {\n      name\n    }\n  }\n"]))),de=Object(P.a)(x||(x=Object(Q.a)(["\n  subscription {\n    messageAdded {\n      body\n    }\n  }\n"]))),ue=function(e){var n=e.setShowContacts,t=Object(q.g)().id,c=Object(R.a)(),a=function(){var e=Object(G.a)(F.a.mark((function e(n){var a,s;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("UPDATE CACHE WITH MESSAGE",n),a=function(e,n){return console.log("INCLUDED IN SET",e,"OBJECT",n),e.map((function(e){return e.id})).includes(n.id)},e.next=4,c.readQuery({query:_,variables:{id:t}});case 4:s=e.sent,console.log("DATA IN STORE",s),a(s.findConversation.messages,n)||c.writeQuery({query:_,variables:{id:t},data:{findConversation:s.findConversation.messages.concat(n)}});case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();Object(ce.a)(de,{onSubscriptionData:function(e){var n=e.subscriptionData;console.log("Subscription data",n);var t=n.data;console.log(t),a(t)}});var s=Object(ae.a)(le,{onError:function(e){console.log("ERROR ON SENDING MESSAGE",e)}}),i=Object(D.a)(s,1)[0],r=Object(M.a)(_,{variables:{id:t}}),o=Object(M.a)(K),l=Object(f.useState)(""),j=Object(D.a)(l,2),d=j[0],u=j[1];if(r.loading||o.loading)return Object($.jsx)("div",{children:"Loading..."});var b=r.data.findConversation.users,O=r.data.findConversation.messages,m=r.data.findConversation.id,h=o.data.me.id;return Object($.jsxs)("div",{className:"conversation-container",children:[Object($.jsxs)("div",{className:"conversation-info",children:[b.map((function(e){return e.username+", "})),Object($.jsx)("div",{onClick:function(){return n(!0)},className:"show-contacts-toggle",children:Object($.jsx)("i",{className:"fas fa-arrow-down"})})]}),Object($.jsxs)("h2",{children:["Conversation ",t]}),Object($.jsx)("div",{className:"conversation-content",children:O.map((function(e){return e.sender.id===h?Object($.jsx)("div",{className:"message-container user-sent",children:e.body},e.id):Object($.jsx)("div",{className:"message-container",children:e.body},e.id)}))}),Object($.jsx)("div",{className:"conversation-input-container",children:Object($.jsxs)("form",{children:[Object($.jsx)("input",{type:"text",onChange:function(e){return u(e.target.value)},value:d}),Object($.jsx)("button",{onClick:function(e){e.preventDefault(),console.log("HANDLE SEND MESSAGE CALLED",d),i({variables:{id:m,body:d}}),u("")},children:"Send"})]})})]})},be=(t(106),function(){var e=Object(f.useState)(!0),n=Object(D.a)(e,2),t=n[0],c=n[1];return Object($.jsx)("div",{className:"messages-container",children:Object($.jsxs)(U.a,{children:[Object($.jsx)("div",{className:t?"msg-contacts-container active":"msg-contacts-container",children:Object($.jsx)(te,{setShowContacts:c})}),Object($.jsx)("div",{className:"msg-conversation-container",children:Object($.jsx)(q.c,{children:Object($.jsx)(q.a,{path:"/messages/:id",component:function(){return Object($.jsx)(ue,{setShowContacts:c})}})})})]})})}),Oe=(t(52),t(107),function(e){var n=e.state,t=e.toggleClick;return Object($.jsx)("div",{className:n?"toggle-container toggle-on":"toggle-container toggle-off",onClick:t,children:Object($.jsx)("div",{className:n?"toggle-circle toggle-on-circle":"toggle-circle toggle-off-circle"})})}),me=function(e){var n=e.text,t=e.handleClick;return Object($.jsx)("div",{className:"button-container",onClick:t,children:n})},he=function(){var e=Object(M.a)(z);if(e.loading)return Object($.jsx)("div",{children:"loading..."});var n=function(){console.log("Button pressed")};return Object($.jsx)("div",{children:Object($.jsx)("ul",{children:e.data.allJobqueries.map((function(e){var t="Contact ".concat(e.user.username);return Object($.jsxs)("div",{className:"card",children:[Object($.jsxs)("div",{className:"general-info-container",children:[Object($.jsxs)("div",{className:"image-and-name-container",children:[Object($.jsx)("div",{className:"image-container"}),Object($.jsxs)("p",{children:[Object($.jsx)("b",{children:e.user.username})," is looking for ",Object($.jsx)("br",{}),"string ensemble"]})]}),Object($.jsxs)("div",{className:"details-container",children:[Object($.jsxs)("div",{className:"details-item",children:[Object($.jsx)("p",{children:"Salary"}),Object($.jsx)("p",{className:"details-value",children:"250"})]}),Object($.jsxs)("div",{className:"details-item",children:[Object($.jsx)("p",{children:"Location"}),Object($.jsx)("p",{className:"details-value",children:"Helsinki"})]}),Object($.jsxs)("div",{className:"details-item",children:[Object($.jsx)("p",{children:"Schedule"}),Object($.jsx)("p",{className:"details-value",children:"16.8.2021"})]})]})]}),Object($.jsxs)("div",{className:"buttons-container",children:[Object($.jsx)(me,{text:t,handleClick:n}),Object($.jsx)(me,{text:"More info",handleClick:n})]})]})}))})})},ve=function(){return Object($.jsx)("nav",{className:"job-navigation",children:Object($.jsx)("div",{className:"job-nav-container",children:Object($.jsxs)("ul",{className:"job-nav-menu",children:[Object($.jsx)("li",{className:"job-nav-item",children:Object($.jsx)(U.b,{exact:!0,to:"/jobmarket/queries/",activeClassName:"job-active",className:"job-nav-links",children:"Queries"})}),Object($.jsx)("li",{className:"job-nav-item",children:Object($.jsx)(U.b,{exact:!0,to:"/jobmarket/findplayers/",activeClassName:"job-active",className:"job-nav-links",children:"Find players"})}),Object($.jsx)("li",{className:"job-nav-item",children:Object($.jsx)(U.b,{exact:!0,to:"/jobmarket/sendquery/",activeClassName:"job-active",className:"job-nav-links",children:"Send query"})}),Object($.jsx)("li",{className:"job-nav-item",children:Object($.jsx)(U.b,{exact:!0,to:"/jobmarket/myqueries/",activeClassName:"job-active",className:"job-nav-links",children:"My queries"})})]})})})},xe=function(){var e=Object(f.useState)(""),n=Object(D.a)(e,2),t=n[0],c=n[1],a=Object(ae.a)(re,{onError:function(e){console.log("Error at create query mutation: \n",e)}}),s=Object(D.a)(a,1)[0],i=function(){var e=Object(G.a)(F.a.mark((function e(n){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),console.log("submit called with ".concat(t)),s({variables:{content:t}}),c("");case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object($.jsxs)("div",{children:[Object($.jsx)("h2",{children:"Send Query"}),Object($.jsx)("div",{children:Object($.jsxs)("form",{onSubmit:i,children:[Object($.jsxs)("ul",{children:[Object($.jsx)("li",{children:"what are you lookin for? ( single players | group )"}),Object($.jsx)("li",{children:"salary ( no | negotiable | by hour | fixed )"}),Object($.jsx)("li",{children:"description"}),Object($.jsx)("li",{children:"location ( single | multiple )"})]}),Object($.jsx)("br",{}),Object($.jsxs)("div",{children:["description ",Object($.jsx)("input",{value:t,onChange:function(e){var n=e.target;return c(n.value)}})]}),Object($.jsx)("button",{type:"submit",children:"send"})]})})]})},pe=function(){var e=Object(M.a)(B),n=Object(f.useState)(!1),t=Object(D.a)(n,2),c=t[0],a=t[1];console.log(c);return e.loading?Object($.jsx)("div",{children:"loading..."}):(console.log("RESULT MY QUERIES \n",e),Object($.jsxs)("div",{children:[Object($.jsx)("h3",{children:"My queries"}),e.data.me.jobQueries.map((function(e){return Object($.jsxs)("div",{children:[Object($.jsx)(Oe,{state:c,toggleClick:function(){return n=e.id,console.log("TOGGLE CLICKED",n),void a(!c);var n}}),Object($.jsx)("p",{children:e.content},e.id)]})}))]}))},fe=function(){return Object($.jsxs)("div",{children:[Object($.jsx)("h1",{children:"Find players (only available ones)"}),Object($.jsxs)("ul",{children:[Object($.jsx)("b",{children:"Filter: "}),Object($.jsx)("li",{children:"Group or individuals,"}),Object($.jsx)("li",{children:"By instrument, by group type"})]})]})},ge=function(){return Object($.jsx)($.Fragment,{children:Object($.jsx)(U.a,{children:Object($.jsxs)("div",{className:"job-page",children:[Object($.jsx)(ve,{}),Object($.jsx)("div",{className:"job-pages",children:Object($.jsxs)(q.c,{children:[Object($.jsx)(q.a,{path:"/jobmarket/findplayers/",component:fe}),Object($.jsx)(q.a,{path:"/jobmarket/queries/",component:he}),Object($.jsx)(q.a,{path:"/jobmarket/sendquery/",component:xe}),Object($.jsx)(q.a,{path:"/jobmarket/myqueries/",component:pe})]})})]})})})},Ne=(t(108),function(){var e=Object(M.a)(V),n=Object(M.a)(K),t=Object(ae.a)(oe),c=Object(D.a)(t,1)[0],a=Object(q.f)();if(e.loading||n.loading)return Object($.jsx)("div",{children:"loading..."});var s=function(){var e=Object(G.a)(F.a.mark((function e(n){var t,s;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("CONTACT BUTTON PRESSED FOR",n),e.next=3,c({variables:{receiverId:n}});case 3:t=e.sent,s=t.data.createConversation.id,a.push("/messages/".concat(s));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object($.jsxs)("div",{children:[Object($.jsx)("h1",{children:"Profiles"}),Object($.jsx)("b",{children:"Filters:"})," name ",Object($.jsx)("input",{}),", group or individual, instrument",Object($.jsx)("div",{className:"profiles-container",children:e.data.allUsers.map((function(e){var t="/profile/".concat(e.id);return Object($.jsxs)("div",{className:"profile-container",children:[Object($.jsx)("div",{className:"upper-container",children:Object($.jsx)("div",{className:"profile-image-container",children:Object($.jsx)("div",{className:"profile-image",children:Object($.jsx)("img",{src:"https://content.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg",alt:"musician",className:"profile-image"})})})}),Object($.jsxs)("div",{className:"lower-container",children:[Object($.jsxs)("div",{className:"name-container",children:[Object($.jsx)("h3",{className:"profile-name",children:e.username}),Object($.jsx)("p",{children:"violinist, saxophonist"})]}),Object($.jsxs)("div",{className:"profiles-buttons-container",children:[Object($.jsx)(me,{text:"To profile",handleClick:function(){return a.push(t)}}),e.id!==n.data.me.id?Object($.jsx)(me,{text:"Contact",handleClick:function(){return s(e.id)}}):null]})]})]})}))})]})}),ke=function(e){var n=e.setToken,t=Object(q.f)(),c=Object(f.useState)(""),a=Object(D.a)(c,2),s=a[0],i=a[1],r=Object(f.useState)(""),o=Object(D.a)(r,2),l=o[0],j=o[1],d=Object(ae.a)(se,{onError:function(e){console.log("Error at sign in mutation: \n",e.graphQLErrors[0].message)}}),u=Object(D.a)(d,2),b=u[0],O=u[1];Object(f.useEffect)((function(){if(O.data){console.log("RESULT DATA USE EFFECT",O.data);var e=O.data.login.value,c=O.data.login.id;n(e),localStorage.setItem(X,e),sessionStorage.setItem(Z,c),t.push("/")}}),[O.data]);var m=function(){var e=Object(G.a)(F.a.mark((function e(n){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),b({variables:{username:s,password:l}});case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object($.jsx)("div",{children:Object($.jsxs)("form",{onSubmit:m,children:[Object($.jsxs)("div",{children:["username ",Object($.jsx)("input",{value:s,onChange:function(e){var n=e.target;return i(n.value)}})]}),Object($.jsxs)("div",{children:["password ",Object($.jsx)("input",{type:"password",value:l,onChange:function(e){var n=e.target;return j(n.value)}})]}),Object($.jsx)("button",{type:"submit",children:"login"})]})})},Se=function(){var e=Object(q.f)(),n=Object(f.useState)(""),t=Object(D.a)(n,2),c=t[0],a=t[1],s=Object(f.useState)(""),i=Object(D.a)(s,2),r=i[0],o=i[1],l=Object(ae.a)(ie,{onError:function(e){console.log("Error at sign up mutation: \n",e.graphQLErrors[0].message)}}),j=Object(D.a)(l,2),d=j[0],u=j[1];Object(f.useEffect)((function(){u.data&&(console.log("(sign up) RESULT DATA USE EFFECT",u.data),e.push("/signin"))}),[u.data]);var b=function(){var e=Object(G.a)(F.a.mark((function e(n){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),d({variables:{username:c,password:r}});case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object($.jsxs)("div",{children:[Object($.jsx)("h2",{children:"Sign up"}),Object($.jsxs)("form",{onSubmit:b,children:[Object($.jsxs)("div",{children:["username ",Object($.jsx)("input",{value:c,onChange:function(e){var n=e.target;return a(n.value)}})]}),Object($.jsxs)("div",{children:["password ",Object($.jsx)("input",{type:"password",value:r,onChange:function(e){var n=e.target;return o(n.value)}})]}),Object($.jsx)("button",{type:"submit",children:"Sign up"})]})]})},Ce=(t(109),function(){return Object($.jsxs)("div",{children:[Object($.jsx)("div",{className:"title-and-links-container",children:Object($.jsxs)("div",{className:"title-and-links",children:[Object($.jsxs)("h1",{className:"title",children:["Hey freelancer, ",Object($.jsx)("br",{}),"you are needed!"]}),Object($.jsxs)("div",{className:"links",children:[Object($.jsx)("a",{href:"../signin",className:"link signin",children:"Sign In"}),Object($.jsx)("a",{href:"../signup",className:"link signup",children:"Sign Up"})]})]})}),Object($.jsx)("div",{children:Object($.jsx)("h1",{children:"About"})}),Object($.jsx)("div",{children:Object($.jsx)("h1",{children:"Features"})}),Object($.jsx)("div",{children:Object($.jsx)("h1",{children:"Footer"})})]})}),we=function(){var e=Object(M.a)(B),n=localStorage.getItem(X);return e.loading?Object($.jsx)("div",{children:"Loading..."}):Object($.jsxs)("div",{children:[Object($.jsxs)("h1",{children:["Welcome ",Object($.jsx)("i",{children:e.data.me.username})]}),Object($.jsxs)("p",{children:[Object($.jsx)("b",{children:"You token is: "}),n]})]})},ye=function(){return Object($.jsx)("h1",{children:"Settings"})},Ee=(t(110),function(){var e=Object(f.useState)(""),n=Object(D.a)(e,2),t=n[0],c=n[1],a=Object(f.useState)([]),s=Object(D.a)(a,2),i=s[0],r=s[1],o=Object(M.a)(V),l=Object(M.a)(B),j=Object(ae.a)(je,{onError:function(e){console.log("Error at create group mutation: \n",e)}}),d=Object(D.a)(j,1)[0];if(console.log("ME REUSLT",l),o.loading||l.loading)return Object($.jsx)("div",{children:"Loading..."});return Object($.jsxs)("div",{className:"new-group-container",children:[Object($.jsx)("h1",{children:"New group component"}),Object($.jsx)("input",{value:"Filter by name"}),Object($.jsx)("input",{value:t,onChange:function(e){var n=e.target;return c(n.value)}}),Object($.jsxs)("div",{className:"selected-users",children:[Object($.jsx)("h3",{children:"Selected users"}),i.map((function(e){return Object($.jsx)("div",{className:"selected-user",onClick:function(){return r(i.filter((function(n){return n.username!==e.username})))},children:Object($.jsx)("p",{children:e.username})})}))]}),Object($.jsx)("div",{className:"all-users-container",children:o.data.allUsers.map((function(e){return i.find((function(n){return n.username===e.username}))?Object($.jsx)("div",{className:"user-container selected",onClick:function(){return r(i.concat(e))},children:Object($.jsx)("p",{children:e.username})}):Object($.jsx)("div",{className:"user-container",onClick:function(){return r(i.concat(e))},children:Object($.jsx)("p",{children:e.username})})}))}),Object($.jsx)(me,{text:"Create group",handleClick:function(){console.log("NEW GROUP SUBMIT BUTTON PRESSED, users:",i,"name:",t);var e=i.map((function(e){return e.id}));d({variables:{name:t,users:e}}),r([]),c("")}})]})}),Ie=(t(111),function(){var e=Object(q.g)().id,n=Object(M.a)(J,{variables:{id:e}});return n.loading?Object($.jsx)("div",{children:"loading..."}):(console.log("PROFILE RESULT",n),Object($.jsx)("div",{children:n.data?Object($.jsxs)("div",{children:[Object($.jsxs)("h3",{children:[n.data.findUser.username,"'s profile"]}),n.data.findUser.profile.about]}):Object($.jsxs)("div",{children:[Object($.jsx)("b",{children:"No profile for dis guy:"})," ",e]})}))}),Te=function(){var e=localStorage.getItem(X),n=Object(f.useState)(e),t=Object(D.a)(n,2),c=t[0],a=t[1];return Object($.jsxs)(U.a,{children:[Object($.jsx)("div",{className:"production-notice-container",children:"In development"}),c?Object($.jsxs)($.Fragment,{children:[Object($.jsx)(ne,{}),Object($.jsx)("div",{className:"pages",children:Object($.jsxs)(q.c,{children:[Object($.jsx)(q.a,{path:"/messages",component:be}),Object($.jsx)(q.a,{path:"/jobmarket",component:ge}),Object($.jsx)(q.a,{path:"/profiles",component:Ne}),Object($.jsx)(q.a,{path:"/profile/:id",component:Ie}),Object($.jsx)(q.a,{path:"/settings",component:ye}),Object($.jsx)(q.a,{path:"/newgroup",component:Ee}),Object($.jsx)(q.a,{path:"/",component:we})]})})]}):Object($.jsxs)(q.c,{children:[Object($.jsx)(q.a,{path:"/signin",component:function(){return Object($.jsx)(ke,{setToken:a})}}),Object($.jsx)(q.a,{path:"/signup",component:function(){return Object($.jsx)(Se,{})}}),Object($.jsx)(q.a,{path:"/",component:Ce})]})]})},De=Object(E.a)((function(e,n){var t=n.headers,c=localStorage.getItem(X);return{headers:Object(p.a)(Object(p.a)({},t),{},{authorization:c?"bearer ".concat(c):null})}})),Ue=new k.a({uri:"https://halfeatenbiscuit.herokuapp.com/graphql"}),qe=new T.a({uri:"ws://localhost:4000/graphql",options:{reconnect:!0}}),$e=Object(S.split)((function(e){var n=e.query,t=Object(I.e)(n);return"OperationDefinition"===t.kind&&"subscription"===t.operation}),qe,De.concat(Ue)),Le=new C.a({cache:new w.a,link:$e,connectToDevTools:!0});N.a.render(Object($.jsx)(y.a,{client:Le,children:Object($.jsx)(Te,{})}),document.getElementById("root"))},52:function(e,n,t){},64:function(e,n,t){},89:function(e,n,t){},90:function(e,n,t){}},[[123,1,2]]]);
//# sourceMappingURL=main.1613a88a.chunk.js.map