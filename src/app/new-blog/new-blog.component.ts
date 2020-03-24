import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {
  public blogTitle:String;
  public blogImage:String;
  public blogDescription:String;
 
  public obj:Object;
  

  constructor(private router:Router,private bs:BackendService) { }

  ngOnInit() {
   
  }
  
  async submit()
  {
    this.obj={title:this.blogTitle,image:this.blogImage,description:this.blogDescription};
    let m=this.bs.newFormSubmit(this.obj);
    await new Promise(r => setTimeout(r, 2000));
    this.router.navigateByUrl("/blogs");

  }

}
