
import { BrowserService } from "./../../../shared/services/browser.service";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DisplayFurnitureDTO } from "src/app/shared/models/displayFurnitureDTO";
import { Router } from "@angular/router";

@Component({
  selector: "app-order-history",
  templateUrl: "./order-history.component.html",
  styleUrls: ["./order-history.component.scss"]
})
export class OrderHistoryComponent implements OnInit {

  furniture: DisplayFurnitureDTO[] = [];
  total: number = 0;
  constructor(
    private router: Router,
    private service: BrowserService,
    private SpinnerService: NgxSpinnerService
  ) {}
  userEmail: any;
  ngOnInit() {
    this.SpinnerService.show();
    this.userEmail = JSON.parse(localStorage.getItem("userEmail"));
    console.log(this.userEmail);
    this.service.getOrderHistory(this.userEmail).subscribe(data => {
      this.furniture = data;
      this.total = this.furniture.length;
      this.SpinnerService.hide();
    },error=>{
      this.SpinnerService.hide();
    });
  }
  viewProduct(event, id: number) {
    this.router.navigate(["/view/", id]);
  }
}