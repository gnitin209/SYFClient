import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BrowserService } from './../../../shared/services/browser.service';
import { DisplayFurnitureDTO } from './../../../shared/models/displayFurnitureDTO';
import { Router } from "@angular/router";
import { CartService } from "src/app/shared/services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message:any;
  furniture: DisplayFurnitureDTO[] = []; 
  heading=true;
  check=true;
    constructor(private cartService:CartService,private SpinnerService: NgxSpinnerService,private service: BrowserService,private router: Router,private toaster:ToastrService) { }
  
    ngOnInit() {

      this.SpinnerService.show();    
      
      this.service.displayFurniture().subscribe((data) => { 
        this.furniture = data; console.log(data);    
          this.SpinnerService.hide();   
          this.heading=true;
        },error=>{
       this.heading=false;
       this.SpinnerService.hide();
       this.furniture=[];
        });
        
      }

  
    viewProduct(id:number){
      this.router.navigate(['/view/',id]);
    }

    addToCart(id:number){
      var email=JSON.parse(localStorage.getItem('userEmail'));
      if(email==null){
        this.toaster["warning"]("Please Log In First, You are not logged in!");
        this.router.navigate(["/login"]);
      }
      
        if(email!=null){
          this.cartService.sendNumber(id,true).subscribe((data)=>{
            console.log("---------------");
            this.message=data;
          });
        }
     
    }
}