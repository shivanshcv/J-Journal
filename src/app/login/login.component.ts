import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required])

  });
  constructor(private bs:BackendService,private router:Router) { }

  ngOnInit() {
   
   
  }
  async submit()
  {
    
    if(!this.loginForm.valid)
      {
        this.loginForm.setValue({email:null,password:null});
        this.router.navigateByUrl("/register");
      }
    else
    {
      this.bs.login(this.loginForm.value);
      await new Promise(r => setTimeout(r, 500));
      if(this.bs.isLoggedIn())
        this.router.navigateByUrl("/blogs");
      else
      {
        this.loginForm.setValue({email:null,password:null});
        console.log("wapas login page pe aa gye");
        this.router.navigateByUrl("/login");
      }
      }
  }

}
