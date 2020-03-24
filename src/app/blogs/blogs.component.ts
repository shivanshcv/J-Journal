import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs:any[];
  
  
    

  constructor(private bs:BackendService,private router:Router) {
 
   }

  ngOnInit() {
    let blog=this.bs.allBlogs().subscribe((data)=>{
      this.blogs=data;
    });
    
  }


}

