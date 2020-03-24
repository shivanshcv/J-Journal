import { Component } from '@angular/core';
import { BackendService } from './backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public bs:BackendService,private router:Router){}
  async logout(){
    console.log("dab gaya00");
    
    this.bs.logout();
    console.log("logout ho gya");
    
    await new Promise(r => setTimeout(r, 500));
    this.router.navigateByUrl("/");
    console.log("navigate bhi ho gya");
    
  }
  
}
