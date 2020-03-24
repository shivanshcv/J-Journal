import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  public blogTitle:String;
  public blogImage:String;
  public blogDescription:String;
  public blog:any[];
  public id:String;
  public obj:Object;
  constructor(private actRoute:ActivatedRoute,private bs:BackendService,private router:Router) { }

  ngOnInit() {

    this.actRoute.params.subscribe((params)=>{
      this.id=params['id'];
    })
    let b=this.bs.getData(this.id).subscribe((data)=>{
      this.blog=data;
      this.wait();
      
      
      // this.blogTitle=this.blog['title'];
      // this.blogImage=this.blog['image'];
      // this.blogdescription=this.blog['description'];
    });

    
  }
  async wait()
  {
    await new Promise(r => setTimeout(r, 500));
    this.blogTitle=this.blog['title'];
    this.blogImage=this.blog['image'];
    this.blogDescription=this.blog['description'];
    
  }
  async submit(){
    this.obj={_id:this.id,title:this.blogTitle,image:this.blogImage,description:this.blogDescription};
    console.log("next h update");
    this.bs.editBlog(this.obj,this.id);
    await new Promise(r => setTimeout(r, 500));
    this.router.navigateByUrl("/blogs/"+this.id);
  }

}
