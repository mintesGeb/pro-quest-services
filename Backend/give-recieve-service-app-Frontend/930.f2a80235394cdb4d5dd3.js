"use strict";(self.webpackChunkgive_recieve_service_app_frontend=self.webpackChunkgive_recieve_service_app_frontend||[]).push([[930],{930:(J,d,a)=>{a.r(d),a.d(d,{UsersModule:()=>S});var m=a(855),c=a(583),e=a(639),g=a(841);let h=(()=>{class s{constructor(t){this.client=t,this.baseURL="http://localhost:1211/api/users/"}getAllUsers(){return this.client.get(this.baseURL)}getByEmail(t){return this.client.get(this.baseURL+t)}deleteUser(t){return this.client.delete(this.baseURL+t)}updateUser(t,i){return this.client.put(this.baseURL+t,i)}}return s.\u0275fac=function(t){return new(t||s)(e.LFG(g.eN))},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();const f=function(s){return["","users","profile",s]};function v(s,n){if(1&s&&(e.TgZ(0,"a",5),e.TgZ(1,"h4"),e._uU(2),e.qZA(),e.qZA()),2&s){const t=n.$implicit;e.Q6J("routerLink",e.VKq(3,f,t.email)),e.xp6(2),e.AsE(" ",t.firstname," ",t.lastname," ")}}let y=(()=>{class s{constructor(t){this.userManager=t,t.getAllUsers().subscribe(i=>{this.users=i.data})}ngOnInit(){}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(h))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-myusers"]],decls:8,vars:1,consts:[[1,"i"],[1,"i-left"],[1,"i-middle"],[3,"routerLink",4,"ngFor","ngForOf"],[1,"i-right"],[3,"routerLink"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"h1"),e._uU(4,"Service Users"),e.qZA(),e.YNc(5,v,3,5,"a",3),e.qZA(),e._UZ(6,"div",4),e.qZA(),e._UZ(7,"router-outlet")),2&t&&(e.xp6(5),e.Q6J("ngForOf",i.users))},directives:[c.sg,m.lC,m.yS],encapsulation:2}),s})();var _=a(779);function Z(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"div",9),e.TgZ(1,"button",10),e.NdJ("click",function(){return e.CHM(t),e.oxw().editUser()}),e._uU(2," Edit"),e.qZA(),e._UZ(3,"br"),e.TgZ(4,"button",11),e.NdJ("click",function(){return e.CHM(t),e.oxw().deleteUser()}),e._uU(5," Delete "),e.qZA(),e.qZA()}}function U(s,n){if(1&s&&(e.TgZ(0,"div"),e.TgZ(1,"p"),e._uU(2),e.qZA(),e.qZA()),2&s){const t=n.$implicit;e.xp6(2),e.Oqu(t.service.title)}}function b(s,n){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,U,3,1,"div",12),e.qZA()),2&s){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.myServices)}}function T(s,n){1&s&&(e.TgZ(0,"div"),e.TgZ(1,"p"),e._uU(2,"Showing Rquests"),e.qZA(),e.qZA())}let C=(()=>{class s{constructor(t,i,r,l){this.ar=t,this.userManager=i,this.router=r,this.service=l,this.showingServices=!1,this.showingRequests=!1,this.ar.paramMap.subscribe(u=>{this.email=u.get("email"),console.log(this.email)})}showServices(){this.showingServices=!0,this.showingRequests=!1,this.myuser.provided.forEach(t=>{console.log(t),this.service.getCourseById(t).subscribe(i=>{i.data&&(console.log(i.data),this.myServices=[...this.myServices,i.data])})}),console.log(this.myServices)}showRequests(){this.showingServices=!1,this.showingRequests=!0,console.log(this.myuser.requested)}deleteUser(){let t=prompt('Are you sure? Type "yes" to confirm');console.log(t),"yes"===t&&this.userManager.deleteUser(this.email).subscribe(i=>{i.success&&this.router.navigate([""])})}editUser(){this.router.navigate(["","users","edit-profile",this.email],{state:this.myuser})}ngOnInit(){this.isCreator=!1;let t=localStorage.getItem("payload");this.user=JSON.parse(t),this.userManager.getByEmail(this.email).subscribe(i=>{this.myuser=i.data,console.log(i.data),this.myuser.firstname===this.user.firstname&&this.myuser.lastname===this.user.lastname&&(this.isCreator=!0)}),console.log(this.myuser.provided),this.myuser.provided.forEach(i=>{console.log(i)})}ngDoCheck(){(this.myuser.firstname!==this.user.firstname||this.myuser.lastname!==this.user.lastname)&&(this.isCreator=!1)}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(m.gz),e.Y36(h),e.Y36(m.F0),e.Y36(_.X))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-myuser"]],decls:21,vars:7,consts:[[1,"i"],[1,"i-left"],["class","checkUser",4,"ngIf"],[1,"i-middle"],[1,"userInfo"],[1,"i-right"],[1,"general-margin","btn","btn","basic",3,"click"],[1,"btn","btn","basic",3,"click"],[4,"ngIf"],[1,"checkUser"],[1,"btn","btn-primary","btn-lg",3,"click"],[1,"general-margin","btn","btn-primary","btn-lg",3,"click"],[4,"ngFor","ngForOf"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.YNc(2,Z,6,0,"div",2),e.qZA(),e.TgZ(3,"div",3),e.TgZ(4,"div"),e._uU(5," Fullname: "),e.TgZ(6,"h3",4),e._uU(7),e.qZA(),e._uU(8," Email: "),e.TgZ(9,"h4",4),e._uU(10),e.qZA(),e._uU(11," Phone: "),e.TgZ(12,"h4",4),e._uU(13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(14,"div",5),e.TgZ(15,"button",6),e.NdJ("click",function(){return i.showServices()}),e._uU(16,"My Services"),e.qZA(),e.TgZ(17,"button",7),e.NdJ("click",function(){return i.showRequests()}),e._uU(18,"My Requests"),e.qZA(),e.YNc(19,b,2,1,"div",8),e.YNc(20,T,3,0,"div",8),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Q6J("ngIf",i.isCreator),e.xp6(5),e.AsE("",i.myuser.firstname," ",i.myuser.lastname,""),e.xp6(3),e.Oqu(i.myuser.email),e.xp6(3),e.Oqu(i.myuser.phone),e.xp6(6),e.Q6J("ngIf",i.showingServices),e.xp6(1),e.Q6J("ngIf",i.showingRequests))},directives:[c.O5,c.sg],styles:[".userInfo[_ngcontent-%COMP%]{color:#14279b}.i[_ngcontent-%COMP%]{height:200px}"]}),s})();var o=a(665),q=a(891);function A(s,n){1&s&&(e.TgZ(0,"span"),e._uU(1,"Firstname is required"),e.qZA())}function M(s,n){1&s&&(e.TgZ(0,"span"),e._uU(1,"Lastname is required"),e.qZA())}function F(s,n){1&s&&(e.TgZ(0,"span"),e._uU(1,"Phone is required"),e.qZA())}let E=(()=>{class s{constructor(t,i,r,l,u,Y){this.userManager=t,this.router=i,this.ar=r,this.fb=l,this.auth=u,this.hc=Y,this.ar.paramMap.subscribe(I=>{var p;this.email=I.get("email"),console.log(this.email);let k=null===(p=this.router.getCurrentNavigation())||void 0===p?void 0:p.extras;this.myUser=k.state,console.log(this.myUser)})}updateUser(){}initializeForm(){var t,i,r;this.myEditForm=this.fb.group({firstname:["",o.kI.required],lastname:["",o.kI.required],phone:["",o.kI.required]}),null===(t=this.myEditForm.get("firstname"))||void 0===t||t.setValue(this.myUser.firstname),null===(i=this.myEditForm.get("lastname"))||void 0===i||i.setValue(this.myUser.lastname),null===(r=this.myEditForm.get("phone"))||void 0===r||r.setValue(this.myUser.phone)}onSubmit(){confirm("You have to log back in to apply the changes. Is that ok?")&&(this.hc.patch("http://localhost:1211/services/"+this.myUser.firstname+"-"+this.myUser.lastname,this.myEditForm.value).subscribe(i=>{console.log(i)}),this.userManager.updateUser(this.email,this.myEditForm.value).subscribe(i=>{console.log(i),i.success&&(this.auth.logout(),this.router.navigate(["","login"]))}))}ngOnInit(){this.initializeForm()}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(h),e.Y36(m.F0),e.Y36(m.gz),e.Y36(o.qu),e.Y36(q.e),e.Y36(g.eN))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-edit-user"]],decls:16,vars:4,consts:[[1,"i"],[1,"i-left"],[1,"i-middle"],[3,"formGroup","ngSubmit"],["type","text","placeholder","Firstname","formControlName","firstname",1,"form-control"],[4,"ngIf"],["type","text","placeholder","Lastname","formControlName","lastname",1,"form-control"],["type","text","placeholder","Phone","formControlName","phone",1,"form-control"],[1,"btn","btn-primary","btn-md"],[1,"i-right"]],template:function(t,i){if(1&t&&(e.TgZ(0,"div",0),e._UZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"h2"),e._uU(4,"Edit Profile"),e.qZA(),e.TgZ(5,"form",3),e.NdJ("ngSubmit",function(){return i.onSubmit()}),e._UZ(6,"input",4),e.YNc(7,A,2,0,"span",5),e._UZ(8,"input",6),e.YNc(9,M,2,0,"span",5),e._UZ(10,"input",7),e.YNc(11,F,2,0,"span",5),e._UZ(12,"br"),e.TgZ(13,"button",8),e._uU(14,"Submit"),e.qZA(),e.qZA(),e.qZA(),e._UZ(15,"div",9),e.qZA()),2&t){let r,l,u;e.xp6(5),e.Q6J("formGroup",i.myEditForm),e.xp6(2),e.Q6J("ngIf",(null==(r=i.myEditForm.get("firstname"))?null:r.touched)&&!(null!=(r=i.myEditForm.get("firstname"))&&r.valid)),e.xp6(2),e.Q6J("ngIf",(null==(l=i.myEditForm.get("lastname"))?null:l.touched)&&!(null!=(l=i.myEditForm.get("lastname"))&&l.valid)),e.xp6(2),e.Q6J("ngIf",(null==(u=i.myEditForm.get("phone"))?null:u.touched)&&!(null!=(u=i.myEditForm.get("phone"))&&u.valid))}},directives:[o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u,c.O5],styles:["span[_ngcontent-%COMP%]{color:red}"]}),s})(),S=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[[c.ez,o.UX,m.Bz.forChild([{path:"",component:y},{path:"profile/:email",component:C},{path:"edit-profile/:email",component:E}])]]}),s})()}}]);