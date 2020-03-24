import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {
  public name:String;
  public comment:String;
  public blog:any[];
  public id:String;
  public obj:Object;
   
  constructor(private bs:BackendService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.id=params['id'];
    })
    let b=this.bs.specificBlog(this.id).subscribe((data)=>{
      this.blog=data;
     
      
      
      
      
    });
     console.log(this.blog);
  }
  async submit()
  {
    this.obj={name:this.name,comment:this.comment};
    this.bs.commentFormSubmit(this.obj,this.id);
    await new Promise(r => setTimeout(r, 500));
    this.name="";
    this.comment="";
    
    this.ngOnInit();
  }
  async delete()
  {
    let m=this.bs.deleteBlog(this.id);
    await new Promise(r => setTimeout(r,1000));
    this.router.navigateByUrl("/blogs");
  }
 


}
