import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginService {

  constructor(private bs:BackendService,private router:Router) { }
  canActivate():any{
    if(!this.bs.isLoggedIn())
      return true;
    else
    {
      this.router.navigateByUrl("/profile");
      return false;
    }
    }
}
