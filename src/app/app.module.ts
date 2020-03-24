import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BlogsComponent } from './blogs/blogs.component';
import { ShowPageComponent } from './show-page/show-page.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { HttpClientModule } from '@angular/common/http';

import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LoggedInService } from './logged-in.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    ShowPageComponent,
    NewBlogComponent,
    EditBlogComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [LoggedInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
