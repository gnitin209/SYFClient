import { NgxSpinnerService } from "ngx-spinner";
import { CartService } from "src/app/shared/services/cart.service";
import { FurnitureCart } from "./../../../shared/models/furniture-cart";
import { Component, OnInit } from "@angular/core";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  constructor(
    private SpinnerService: NgxSpinnerService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.total = 0;
  }
  furnitures: FurnitureCart[];
  total: number;
  message: String;
  ngOnInit() {
    this.SpinnerService.show();
    this.cartService.getAllFurnitureOfCart().subscribe(
      data => {
        this.furnitures = data;

        this.SpinnerService.hide();
        for (var furniture of this.furnitures) {
          this.total += furniture.furniturePrice * furniture.furnitureQuanitity;
        }
      },
      error => {
        this.SpinnerService.hide();
      }
    );
  }

  showProduct(id: number) {
    this.router.navigate(["/view/" + id]);
  }
  remove(furniture) {
    const index: number = this.furnitures.indexOf(furniture);
    this.furnitures.splice(index, 1);
    this.cartService.deleteFurniture(furniture.furnitureId).subscribe(data => {
      this.message = data;
      this.total -= furniture.furnitureQuanitity * furniture.furniturePrice;
      if(! this.toastr.currentlyActive){
        this.toastr.success("The furniture has been removed!");
      }
     
      console.log(this.furnitures);
    });
  }
  increaseQuantity(furniture) {
    if (furniture.furnitureLimit <= furniture.furnitureQuanitity) {
      if(! this.toastr.currentlyActive){
        this.toastr.error("We are sorry, you cannot add more elements!");
      }
      return;
    }
    furniture.furnitureQuanitity++;
    this.total += furniture.furniturePrice;
    this.cartService
      .changeQuantity(furniture.furnitureId, true)
      .subscribe(data => {
        this.message = data;
      });
    console.log(this.furnitures);
    return;
  }
  decreaseQuantity(furniture) {
    if (furniture.furnitureQuanitity == 1) {
      const index: number = this.furnitures.indexOf(furniture);
      this.furnitures.splice(index, 1);
      this.cartService
        .deleteFurniture(furniture.furnitureId)
        .subscribe(data => {
          this.message = data;
          this.total -= furniture.furniturePrice;
          if(! this.toastr.currentlyActive){
            this.toastr.success("The furniture has been removed!");
          }
          
        });
      return;
    }
    furniture.furnitureQuanitity--;
    this.total -= furniture.furniturePrice;
    this.cartService
      .changeQuantity(furniture.furnitureId, false)
      .subscribe(data => {
        this.message = data;
      });
    console.log(this.furnitures);
    return;
  }
  proceedCheckout() {
    localStorage.setItem("cart", JSON.stringify(this.furnitures));
    this.router.navigate(["/adress"]);
  }
}
