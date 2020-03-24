import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public isRegisterSuccess:Boolean=true;
  public id:string;
  public errorMessage:string;
  public url:string="http://localhost:1000/";
  constructor(private http:HttpClient,private router:Router) { }

async storeId(s:string){
    localStorage.setItem("id",s);
    await new Promise(r => setTimeout(r, 500));
   
    
    
}
async storeError(s:string){
  localStorage.setItem("errorMessage",s);
  await new Promise(r => setTimeout(r, 500));
}

getError():string{
  if(localStorage.getItem("errorMessage"))
    {
      return localStorage.getItem("errorMessage");
    }
  else
  return "";
}

logout(){
  localStorage.removeItem("id");
}


isLoggedIn():boolean{
  
  if(localStorage.getItem("id"))
   { 
   
     return true;
  
     }  else
    return false;
}


  register(obj:Object){
    this.http.post(this.url+"register",obj).subscribe((data)=>{
      this.storeId(data['id']);
      this.storeError(data['err']);
    });
  }

  login(obj:Object){
    this.http.post(this.url+"login",obj).subscribe((data)=>{
      this.storeId(data['id']);
      
      
    });
  }


  newFormSubmit(obj:Object){
    return this.http.post(this.url+"blogs/new/"+localStorage.getItem("id"),obj).subscribe((data)=>{
      return data['n'];
    });
  }

  allBlogs():Observable<any[]>
  {
    return this.http.get<any[]>(this.url+"blogs");
    
      
  }
  specificBlog(s:String):Observable<any[]>
  {
    let m= this.http.get<any[]>(this.url+"blogs/"+s);
    
    return m;
  }

  commentFormSubmit(obj:Object,s:String){
    this.http.post(this.url+"blogs/"+localStorage.getItem("id")+"/"+s,obj).subscribe((data)=>{
      return data;
      
      
    });
  }

  editBlog(obj:Object,blogId){
    console.log("bs wale update m h abhi");
    return this.http.put(this.url+"blogs/"+localStorage.getItem("id")+"/"+blogId,obj).subscribe((data)=>{
      console.log("aa gye return")
      

    });
  }

  getData(s:String):Observable<any[]>
  {
    return this.http.get<any[]>(this.url+"blogs/"+s+"/edit");
  }

  deleteBlog(blogId:String)
  {
    return this.http.delete(this.url+"blogs/"+localStorage.getItem("id")+"/"+blogId).subscribe((data)=>{
      return data['n'];
    });
  }

  
}
