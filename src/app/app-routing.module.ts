import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BlogsComponent } from './blogs/blogs.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { ShowPageComponent } from './show-page/show-page.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LoggedInService } from './logged-in.service';
import { GuardLoginService } from './guard-login.service';



const routes: Routes = [
  {path:'',component:BlogsComponent},
  {path:'register',component:RegisterComponent,canActivate:[GuardLoginService]},
  {path:'login',component:LoginComponent,canActivate:[GuardLoginService]},
  {path:'profile',component:ProfileComponent,canActivate:[LoggedInService]},
  {path:'blogs',component:BlogsComponent},
  {path:'blogs/new',component:NewBlogComponent,canActivate:[LoggedInService]},
  {path:'blogs/:id',component:ShowPageComponent},
  {path:'blogs/:id/edit',component:EditBlogComponent,canActivate:[LoggedInService]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
