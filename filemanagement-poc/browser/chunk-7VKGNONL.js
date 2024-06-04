import{$ as k,A as ee,B as E,C as u,D as _,H as C,I as s,K as b,M as A,N as j,O as H,Q as X,V as P,W as te,aa as ie,ba as V,ca as Y,ea as I,fa as ne,ga as F,h as N,ha as y,ia as M,j as S,ja as L,k as U,ka as T,la as re,m as g,ma as B,n as h,na as D,oa as O,pa as oe,q as d,qa as G,r as w,ra as ae,sa as se,t as v,u as p,v as i,w as e,x as f}from"./chunk-SGL2QQJ6.js";function ce(t,n){if(t&1&&(i(0,"h5",26),s(1),e()),t&2){let m=_();d(),b("",m.errorMessage,"!")}}function ue(t,n){t&1&&(i(0,"span",27),s(1,"Please enter username!! "),e())}function fe(t,n){t&1&&(i(0,"span",27),s(1,"Please enter password!! "),e())}var q=(()=>{let n=class n{constructor(a,r,o){this.fileManagementService=a,this.router=r,this.activatedRoute=o,this.username="",this.password="",this.passwordShow=!1,this.isPasswordError=!1,this.errorMessage=""}ngOnInit(){sessionStorage.getItem("authToken")&&this.router.navigate(["batch/list"])}submitHandler(){this.fileManagementService.userLogin(this.username,this.password).subscribe({next:a=>{a.token&&(sessionStorage.setItem("authToken",a.token),this.fileManagementService.userAuthenicationStats.next({hasAuthenticationCheck:!1,isAuthenticated:!0}),this.router.navigate(["batch/list"]))},error:a=>{this.isPasswordError=!0;let{error:r}=a;r&&r.errors&&(this.errorMessage=r.errors[0]?r.errors[0].msg:"some error")}})}signUpButtonHandler(){this.router.navigate(["../sign-up"],{relativeTo:this.activatedRoute})}forgotPwdHandler(){this.router.navigate(["../pwd-reset"],{relativeTo:this.activatedRoute})}};n.\u0275fac=function(r){return new(r||n)(w(I),w(V),w(k))},n.\u0275cmp=S({type:n,selectors:[["app-login"]],decls:49,vars:7,consts:[["userNameVal","ngModel"],["passwordFeild","ngModel"],[1,"d-flex","justify-content-center"],[1,"cardBlock","bg-body-secondary","p-3","m-3"],[1,"d-flex","flex-row","align-items-center","justify-content-center"],[1,"text-center","fs-1"],[1,"bi","bi-file-earmark-check"],[1,"loginHeader"],[1,"bi","bi-person-circle"],[1,"text-center"],["class","text-center text-danger",4,"ngIf"],[1,"row","mb-3"],[1,"col"],["for","loginInput",1,"form-label"],["type","text","id","loginInput","placeholder","Enter your email!","required","",1,"form-control",3,"ngModelChange","ngModel"],["class","text-danger",4,"ngIf"],[1,"row","mb-2"],["placeholder","Enter your password!","required","",1,"form-control",3,"keyup.enter","ngModelChange","type","ngModel"],["type","checkbox","role","button","id","showPassword",1,"form-check-input",3,"ngModelChange","ngModel"],["for","showPassword",1,"form-check-label"],[1,"col","text-center"],["role","button",1,"link-primary","text-decoration-none",3,"click"],[1,"d-grid","gap-2"],["type","button",1,"btn","btn-primary",3,"click"],[1,"row"],[1,"btn","btn-outline-primary",3,"click"],[1,"text-center","text-danger"],[1,"text-danger"]],template:function(r,o){if(r&1){let l=E();i(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5),f(4,"i",6),e(),i(5,"h3",7),s(6,"File Validation Portal!"),e()(),i(7,"div",5),f(8,"i",8),e(),i(9,"div",9)(10,"span")(11,"h4"),s(12,"Sign-In"),e()()(),v(13,ce,2,1,"h5",10),i(14,"div",11)(15,"div",12)(16,"label",13),s(17,"User Name"),e(),i(18,"input",14,0),H("ngModelChange",function(x){return g(l),j(o.username,x)||(o.username=x),h(x)}),e()(),i(20,"div"),v(21,ue,2,0,"span",15),e()(),i(22,"div",16)(23,"div",12)(24,"label",13),s(25,"Password"),e(),i(26,"input",17,1),u("keyup.enter",function(){return g(l),h(o.submitHandler())}),H("ngModelChange",function(x){return g(l),j(o.password,x)||(o.password=x),h(x)}),e()(),i(28,"div"),v(29,fe,2,0,"span",15),e()(),i(30,"div",11)(31,"div",12)(32,"input",18),H("ngModelChange",function(x){return g(l),j(o.passwordShow,x)||(o.passwordShow=x),h(x)}),e(),i(33,"label",19),s(34," Show Password! "),e()()(),i(35,"div",11)(36,"div",20)(37,"a",21),u("click",function(){return g(l),h(o.forgotPwdHandler())}),s(38,"Forgot password?"),e()()(),i(39,"div",11)(40,"div",12)(41,"div",22)(42,"button",23),u("click",function(){return g(l),h(o.submitHandler())}),s(43," Login"),e()()()(),i(44,"div",24)(45,"div",12)(46,"div",22)(47,"button",25),u("click",function(){return g(l),h(o.signUpButtonHandler())}),s(48," Sign Up"),e()()()()()()}if(r&2){let l=C(19),c=C(27);d(13),p("ngIf",o.isPasswordError),d(5),A("ngModel",o.username),d(3),p("ngIf",l.invalid&&(l.dirty||l.touched)),d(5),p("type",o.passwordShow?"text":"password"),A("ngModel",o.password),d(3),p("ngIf",c.invalid&&(c.dirty||c.touched)),d(3),A("ngModel",o.passwordShow)}},dependencies:[P,F,ne,M,oe,re],styles:[".cardBlock[_ngcontent-%COMP%]{width:34%;border-radius:10px;box-shadow:20px 20px 80px #cecece}.loginHeader[_ngcontent-%COMP%]{text-decoration:underline;font-family:catchyHeader}"]});let t=n;return t})();var W=class{constructor(){this.name="",this.email="",this.password=""}};var K=class{constructor(){this.authtoken="",this.userExist=!1,this.userData=new $}},$=class{constructor(){this._id="",this.name="",this.email="",this.password="",this.avatar="",this.date="",this.__v=""}};function ge(t,n){if(t&1&&(i(0,"h5",26),s(1),e()),t&2){let m=_();d(),b("",m.errorMessage,"!")}}function he(t,n){t&1&&(i(0,"span",27),s(1,"Please enter Name!! "),e())}function we(t,n){t&1&&(i(0,"span",27),s(1,"Please enter valid email!! "),e())}function ve(t,n){t&1&&(i(0,"span",27),s(1,"Please enter password!! "),e())}var z=(()=>{let n=class n{constructor(a,r,o,l){this.untypedFormBuilder=a,this.router=r,this.fileManagementService=o,this.activatedRoute=l,this.passwordShow=!1,this.errorMessage="",this.signupForm=new T({}),this.isError=!1}ngOnInit(){this.signupForm=this.untypedFormBuilder.group({name:["",y.required],email:["",[y.required,y.email]],password:["",y.required]})}inputboxValidation(a){return!!((this.signupForm.get(a)?.dirty||this.signupForm.get(a)?.touched)&&this.signupForm.get(a)?.errors)}createUser(){if(this.signupForm.markAllAsTouched(),this.signupForm.valid){let a=new W;a=this.signupForm.value,this.fileManagementService.signUpUsers(a).subscribe({next:r=>{r.token&&(sessionStorage.setItem("authToken",r.token),this.fileManagementService.userAuthenicationStats.next({hasAuthenticationCheck:!1,isAuthenticated:!0}),this.router.navigate(["batch/list"]))},error:r=>{this.isError=!0;let{error:o}=r;o&&o.errors&&(this.errorMessage=o.errors[0]?o.errors[0].msg:"some error")}})}}redirectToSignIn(){this.router.navigate(["../login"],{relativeTo:this.activatedRoute})}};n.\u0275fac=function(r){return new(r||n)(w(G),w(V),w(I),w(k))},n.\u0275cmp=S({type:n,selectors:[["app-signup"]],decls:50,vars:6,consts:[[1,"d-flex","justify-content-center"],[1,"cardBlock","bg-body-secondary","p-3","m-3"],[1,"d-flex","flex-row","align-items-center","justify-content-center"],[1,"text-center","fs-1"],[1,"bi","bi-file-earmark-check"],[1,"loginHeader"],[1,"bi","bi-person-fill-add"],[1,"text-center"],["class","text-center text-danger",4,"ngIf"],[3,"formGroup"],[1,"row","mb-3"],[1,"col"],["for","userName",1,"form-label"],["type","text","id","userName","placeholder","Enter your name!","formControlName","name",1,"form-control"],["class","text-danger",4,"ngIf"],["for","userEmail",1,"form-label"],["type","text","id","userEmail","placeholder","Enter your email!","formControlName","email",1,"form-control"],[1,"row","mb-2"],["for","newUserPwd",1,"form-label"],["placeholder","Enter your password!","formControlName","password",1,"form-control",3,"keyup.enter","type"],["type","checkbox","role","button","id","showPassword",1,"form-check-input",3,"change"],["for","showPassword",1,"form-check-label"],[1,"d-grid","gap-2"],["type","button",1,"btn","btn-primary",3,"click"],[1,"col","text-center"],["role","button",1,"link-primary","text-decoration-none",3,"click"],[1,"text-center","text-danger"],[1,"text-danger"]],template:function(r,o){r&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),f(4,"i",4),e(),i(5,"h3",5),s(6,"File Validation Portal!"),e()(),i(7,"div",3),f(8,"i",6),e(),i(9,"div",7)(10,"span")(11,"h4"),s(12,"Create User Login!"),e()()(),v(13,ge,2,1,"h5",8),i(14,"form",9)(15,"div",10)(16,"div",11)(17,"label",12),s(18,"Name"),e(),f(19,"input",13),e(),i(20,"div"),v(21,he,2,0,"span",14),e()(),i(22,"div",10)(23,"div",11)(24,"label",15),s(25,"Email"),e(),f(26,"input",16),e(),i(27,"div"),v(28,we,2,0,"span",14),e()(),i(29,"div",17)(30,"div",11)(31,"label",18),s(32,"Password"),e(),i(33,"input",19),u("keyup.enter",function(){return o.createUser()}),e()(),i(34,"div"),v(35,ve,2,0,"span",14),e()(),i(36,"div",10)(37,"div",11)(38,"input",20),u("change",function(){return o.passwordShow=!o.passwordShow}),e(),i(39,"label",21),s(40," Show Password! "),e()()(),i(41,"div",10)(42,"div",11)(43,"div",22)(44,"button",23),u("click",function(){return o.createUser()}),s(45," Create User!"),e()()()()(),i(46,"div",10)(47,"div",24)(48,"a",25),u("click",function(){return o.redirectToSignIn()}),s(49,"Already have Account ? sign in!"),e()()()()()),r&2&&(d(13),p("ngIf",o.isError),d(),p("formGroup",o.signupForm),d(7),p("ngIf",o.inputboxValidation("name")),d(7),p("ngIf",o.inputboxValidation("email")),d(5),p("type",o.passwordShow?"text":"password"),d(2),p("ngIf",o.inputboxValidation("password")))},dependencies:[P,B,F,M,L,D,O],styles:[".cardBlock[_ngcontent-%COMP%]{width:34%;border-radius:10px;box-shadow:20px 20px 80px #cecece}.loginHeader[_ngcontent-%COMP%]{text-decoration:underline;font-family:catchyHeader}"]});let t=n;return t})();function _e(t,n){if(t&1&&(i(0,"h5",14),s(1),e()),t&2){let m=_();d(),b("",m.errorMessage,"!")}}function xe(t,n){if(t&1&&(i(0,"h5",15),s(1),e()),t&2){let m=_();d(),b("",m.updatedInfo,"!")}}function ye(t,n){t&1&&ee(0)}function Se(t,n){t&1&&(i(0,"span",26),s(1,"Please enter valid email!! "),e())}function be(t,n){t&1&&(i(0,"span",26),s(1,"Please Secret Key!! "),e())}function Ee(t,n){if(t&1){let m=E();i(0,"form",16)(1,"div",17)(2,"div",18)(3,"label",19),s(4,"Email"),e(),f(5,"input",20),e(),i(6,"div"),v(7,Se,2,0,"span",21),e()(),i(8,"div",17)(9,"div",18)(10,"label",22),s(11,"Secert key"),e(),f(12,"input",23),e(),i(13,"div"),v(14,be,2,0,"span",21),e()(),i(15,"div",17)(16,"div",18)(17,"div",24)(18,"button",25),u("click",function(){g(m);let r=_();return h(r.validateUser())}),s(19," Validate!"),e()()()()()}if(t&2){let m=_();p("formGroup",m.userValidationForm),d(7),p("ngIf",m.userFormValidationHandler("email")),d(7),p("ngIf",m.userFormValidationHandler("secertKey"))}}function Ce(t,n){t&1&&(i(0,"span",26),s(1,"Please enter password!! "),e())}function Pe(t,n){if(t&1){let m=E();i(0,"form",16)(1,"div",27)(2,"div",18)(3,"label",28),s(4,"Enter New Password!"),e(),i(5,"input",29),u("keyup.enter",function(){g(m);let r=_();return h(r.submitNewPassword())}),e()(),i(6,"div"),v(7,Ce,2,0,"span",21),e()(),i(8,"div",17)(9,"div",18)(10,"input",30),u("change",function(){g(m);let r=_();return h(r.passwordShow=!r.passwordShow)}),e(),i(11,"label",31),s(12," Show Password! "),e()()(),i(13,"div",17)(14,"div",18)(15,"div",24)(16,"button",25),u("click",function(){g(m);let r=_();return h(r.submitNewPassword())}),s(17," Submit New Password!"),e()()()()()}if(t&2){let m=_();p("formGroup",m.newPasswordForm),d(5),p("type",m.passwordShow?"text":"password"),d(2),p("ngIf",m.newPasswordValidationHandler("updatedPassword"))}}function ke(t,n){if(t&1){let m=E();i(0,"div",17)(1,"div",32)(2,"a",33),u("click",function(){g(m);let r=_();return h(r.redirectToSignup())}),s(3,"Dont have a account? create one!"),e()()()}}var J=(()=>{let n=class n{get hasUserLoggedin(){return this.fileManagementService.isUserAuthenticated}constructor(a,r,o,l){this.untypedFormBuilder=a,this.router=r,this.fileManagementService=o,this.activatedRoute=l,this.isUserAuthenticated=!1,this.authenticatedUserResponse=new K,this.passwordShow=!1,this.errorMessage="",this.userValidationForm=new T({}),this.newPasswordForm=new T({}),this.isError=!1,this.updatedInfo=""}ngOnInit(){this.userValidationForm=this.untypedFormBuilder.group({email:["",[y.required,y.email]],secertKey:["",y.required]}),this.newPasswordForm=this.untypedFormBuilder.group({updatedPassword:["",y.required]})}userFormValidationHandler(a){return!!((this.userValidationForm.get(a)?.dirty||this.userValidationForm.get(a)?.touched)&&this.userValidationForm.get(a)?.errors)}newPasswordValidationHandler(a){return!!((this.newPasswordForm.get(a)?.dirty||this.newPasswordForm.get(a)?.touched)&&this.newPasswordForm.get(a)?.errors)}validateUser(){if(this.userValidationForm.valid){let a=this.userValidationForm.value,{email:r,secertKey:o}=a;this.fileManagementService.validateUser(r,o).subscribe({next:l=>{this.isError=!1,this.authenticatedUserResponse=l,sessionStorage.setItem("authToken",this.authenticatedUserResponse.authtoken),this.isUserAuthenticated=!0},error:l=>{this.isError=!0;let{error:c}=l;c&&c.errors&&(this.errorMessage=c.errors[0]?c.errors[0].msg:"some error")}})}}submitNewPassword(){if(this.newPasswordForm.valid){let a=this.newPasswordForm.value,{updatedPassword:r}=a;this.fileManagementService.changeUserPassword(this.authenticatedUserResponse.userData._id,r).subscribe({next:o=>{this.isError=!1,this.updatedInfo=o.message,setTimeout(()=>{this.router.navigate(["batch/list"])},1e3)},error:o=>{this.isError=!0;let{error:l}=o;l&&l.errors&&(this.errorMessage=l.errors[0]?l.errors[0].msg:"some error")}})}}redirectToSignup(){this.router.navigate(["../sign-up"],{relativeTo:this.activatedRoute})}};n.\u0275fac=function(r){return new(r||n)(w(G),w(V),w(I),w(k))},n.\u0275cmp=S({type:n,selectors:[["app-password-reset"]],decls:21,vars:6,consts:[["showValidationForm",""],["showNewPwdForm",""],[1,"d-flex","justify-content-center"],[1,"cardBlock","bg-body-secondary","p-3","m-3"],[1,"d-flex","flex-row","align-items-center","justify-content-center"],[1,"text-center","fs-1"],[1,"bi","bi-file-earmark-check"],[1,"loginHeader"],[1,"bi","bi-person-fill-gear"],[1,"text-center"],["class","text-center text-danger",4,"ngIf"],["class","user-info",4,"ngIf"],[4,"ngIf","ngIfThen","ngIfElse"],["class","row mb-3",4,"ngIf"],[1,"text-center","text-danger"],[1,"user-info"],[3,"formGroup"],[1,"row","mb-3"],[1,"col"],["for","emailValidation",1,"form-label"],["type","text","id","emailValidation","placeholder","Enter your email!","formControlName","email",1,"form-control"],["class","text-danger",4,"ngIf"],["for","secretKeyValidation",1,"form-label"],["type","text","id","secretKeyValidation","placeholder","Enter secert key!","formControlName","secertKey",1,"form-control"],[1,"d-grid","gap-2"],["type","button",1,"btn","btn-primary",3,"click"],[1,"text-danger"],[1,"row","mb-2"],["for","enterNewPwd",1,"form-label"],["placeholder","Enter your password!","formControlName","updatedPassword",1,"form-control",3,"keyup.enter","type"],["type","checkbox","role","button","id","showPassword",1,"form-check-input",3,"change"],["for","showPassword",1,"form-check-label"],[1,"col","text-center"],["role","button",1,"link-primary","text-decoration-none",3,"click"]],template:function(r,o){if(r&1&&(i(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5),f(4,"i",6),e(),i(5,"h3",7),s(6,"File Validation Portal!"),e()(),i(7,"div",5),f(8,"i",8),e(),i(9,"div",9)(10,"span")(11,"h4"),s(12,"Password Reset!"),e()()(),v(13,_e,2,1,"h5",10)(14,xe,2,1,"h5",11)(15,ye,1,0,"ng-container",12)(16,Ee,20,3,"ng-template",null,0,X)(18,Pe,18,3,"ng-template",null,1,X)(20,ke,4,0,"div",13),e()()),r&2){let l=C(17),c=C(19);d(13),p("ngIf",o.isError),d(),p("ngIf",o.updatedInfo),d(),p("ngIf",o.isUserAuthenticated)("ngIfThen",c)("ngIfElse",l),d(5),p("ngIf",!o.hasUserLoggedin)}},dependencies:[P,B,F,M,L,D,O],styles:[".cardBlock[_ngcontent-%COMP%]{width:34%;border-radius:10px;box-shadow:20px 20px 80px #cecece}.loginHeader[_ngcontent-%COMP%]{text-decoration:underline;font-family:catchyHeader}"]});let t=n;return t})();var Q=(()=>{let n=class n{};n.\u0275fac=function(r){return new(r||n)},n.\u0275cmp=S({type:n,selectors:[["app-user-page"]],decls:2,vars:0,consts:[[1,"section-wrapper"]],template:function(r,o){r&1&&(i(0,"section",0),f(1,"router-outlet"),e())},dependencies:[ie],styles:[".section-wrapper[_ngcontent-%COMP%]{min-height:calc(100vh - 45px);font-family:Poppins,sans-serif;background:linear-gradient(115deg,#62cff4,#2c67f2)}"]});let t=n;return t})();var Ve=[{path:"",component:Q,children:[{path:"login",component:q},{path:"sign-up",component:z},{path:"pwd-reset",component:J},{path:"",pathMatch:"full",redirectTo:"login"}]},{path:"**",redirectTo:"notFound"}],pe=(()=>{let n=class n{};n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=U({type:n}),n.\u0275inj=N({imports:[Y.forChild(Ve),Y]});let t=n;return t})();var Ie=[te,ae,se,pe],Ze=[Q,q,z,J],$e=(()=>{let n=class n{};n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=U({type:n}),n.\u0275inj=N({imports:[Ie]});let t=n;return t})();export{Ze as USER_DIRECTIVES,Ie as USER_IMPORT,$e as UserModule};
