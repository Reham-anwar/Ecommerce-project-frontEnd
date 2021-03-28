import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
emailData:any;
nameData:any;
  constructor(private userService:UserService,private route:Router) {
    
        
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails);
        this.userService.getUserType(this.userDetails.userType);
        this.nameData = this.userDetails.name;
      this.emailData = this.userDetails.email;
      },
      err => { 
        console.log(err);
        
      }
    );
   }
userDetails:any;
  ngOnInit(): void {
  
  
  }
  onSubmit(){
    console.log(this.nameData);
    this.userService.editUserProfile(this.nameData,this.emailData).subscribe((response)=>{

    },(err)=>{

    });
    this.route.navigate(["/userprofile"]);
  }

}
