import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required]),
    cpassword:new FormControl(null,[Validators.required])

  });

  constructor(private bs:BackendService,private router:Router) { }

  ngOnInit() {
    
  }
  async submit()
  {

    
    if(!this.registerForm.valid || this.registerForm.get('password').value!==this.registerForm.get('cpassword').value)
      {
        this.registerForm.setValue({name:null,email:null,password:null,cpassword:null});
        this.router.navigateByUrl("/register");
      }
    else
    {
      this.bs.register(this.registerForm.value);
      await new Promise(r => setTimeout(r, 500));
      if(this.bs.isLoggedIn())
        this.router.navigateByUrl("/blogs");
      else
        {
          this.registerForm.setValue({name:null,email:null,password:null,cpassword:null});
          this.router.navigateByUrl("/register");
        }
 }
  }

}
