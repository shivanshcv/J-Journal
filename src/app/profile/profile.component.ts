import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private bs:BackendService,private router:Router) { }

  ngOnInit() {
    // if(!this.bs.isLoggedIn())
    //     {
    //       console.log("restricted");
    //       this.router.navigateByUrl("/login");
    //     }
    

  }

}
