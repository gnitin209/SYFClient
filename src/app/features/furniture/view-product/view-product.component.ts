import { Subscription } from "rxjs";
import { ReviewService } from "./../../../shared/services/review.service";
import { CartService } from "./../../../shared/services/cart.service";
import { AddReview } from "./../../../shared/models/AddReviewDTO";
import { Review } from "./../../../shared/models/DisplayReview";
import { FormGroup, FormControl } from "@angular/forms";
import { Product } from "./../../../shared/models/productDTO";
import { BrowserService } from "./../../../shared/services/browser.service";
import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrModule, ToastrService } from "ngx-toastr";
@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.scss"]
})
export class ViewProductComponent implements OnInit {
  error: string;
  updateFlag: boolean = false;
  userReviewed: any;
  // myForm: FormGroup;
  message: any;
  loggedIn: any;
  userEmail: any;
  product: Product = new Product();
  isLoaded: boolean = false;
  id: number;
  images: any;
  count: number = 0;
  //message:String;ss
  review: Review[] = [];
  initials: any;
  user: any;
  avgRating: any;
  reviewAdded: AddReview = new AddReview();
  feedback: any = "";
  rating: number = 1;
  flag: boolean = false;
  EditFlag: boolean = false;
  reviewId: number;
  reviewUpdated: AddReview = new AddReview();
  constructor(
    private SpinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private serviceBrowser: BrowserService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private toaster: ToastrService,
    private serviceReview: ReviewService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // this.myForm = new FormGroup({
    // 	feedback : new FormControl(''),
    //   });

    this.SpinnerService.show();
    console.log(this.activatedRoute.snapshot.params.value);
    this.id = this.activatedRoute.snapshot.params.value;
    this.serviceBrowser.viewProduct(this.id).subscribe((data: any) => {
      console.log(data);

      this.SpinnerService.hide();

      this.product = data;
      this.isLoaded = true;
      this.review = this.product.reviews;
      this.user = this.product.users;
      this.images = this.product.imageContent;
      this.avgRating = this.product.avgRating;
      this.avgRating = this.avgRating.toFixed(1);
      // this.userEmail = JSON.parse(localStorage.getItem("userEmail"));
      // this.loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
      // console.log(this.userEmail);
      console.log(this.images);
      console.log(this.avgRating);

      // this.formValue = this.myForm.value;
    });
    console.log(this.user);
  }

  addReview(rating, feedback) {
    if (this.feedback.length == 0 || this.feedback.match(/^ *$/) !== null) {
      this.error = "Please add review";
    } else {
      //if(this.user.includes(JSON.parse(localStorage.getItem("userEmail")))){
      if (this.flag) {
        this.reviewAdded.feedback = this.feedback;
        this.reviewAdded.rating = this.rating;
        this.reviewAdded.furnitureId = this.id;
        this.reviewAdded.userEmail = JSON.parse(
          localStorage.getItem("userEmail")
        );
        this.flag = false;
        console.log(this.rating);
        console.log(this.flag);

        this.error = "";
        try {
          this.serviceReview.addReview(this.reviewAdded).subscribe(
            data => {
              this.close();
              window.location.reload();
              this.ngOnInit();
              this.toaster.success("Review added");
            },
            error => {
              this.toaster.error(error.error);
            }
          );
        } catch (error) {
          console.error("Log error", error);
        }
      }
    }
  }

  UpdateReview(rating, feedback) {
    // if(ths.EditFlag)		{
    console.log("entered update");
    console.log(this.rating);
    console.log(this.feedback);
    if (this.feedback.length == 0 || this.feedback.match(/^ *$/) !== null) {
      this.error = "Please add review";
    } else {
      this.error = "";
      this.EditFlag = false;
      this.reviewUpdated.userEmail = JSON.parse(
        localStorage.getItem("userEmail")
      );
      this.reviewUpdated.feedback = this.feedback;
      this.reviewUpdated.rating = this.rating;
      this.reviewUpdated.furnitureId = this.id;

      try {
        this.serviceReview.updatedReview(this.reviewUpdated).subscribe(
          data => {
            this.close();
            //this.router.navigate(['/view/', this.id]);
            window.location.reload();
            this.ngOnInit();
            this.toaster.success("Review updated");
          },
          error => {
            this.toaster.error(error.error);
          }
        );
      } catch (error) {
        console.error("Log error", error);
      }
    }
  }
  addToCart() {
    var email = JSON.parse(localStorage.getItem("userEmail"));
    if (email == null) {
      this.toaster["warning"]("Please Log In First, You are not logged in!");
      this.router.navigate(["/login"]);
    }
    if (email != null) {
      const index = this.activatedRoute.snapshot.params.value;
      var numberValue = Number(index);
      this.cartService.sendNumber(numberValue, true).subscribe(data => {
        console.log("---------------");
        this.message = data;
      });
    }
  }
  buyNow() {
    var email = JSON.parse(localStorage.getItem("userEmail"));
    if (email == null) {
      this.toaster["warning"]("Please Log In First, You are not logged in!");
      this.router.navigate(["/login"]);
    }
    if (email != null) {
      const index = this.activatedRoute.snapshot.params.value;
      var numberValue = Number(index);
      this.cartService.sendNumber(numberValue, false).subscribe(data => {
        this.message = data;

        this.router.navigate(["/cart"]);
      });

      this.router.navigate(["/cart"]);
    }
  }

  checkUser() {
    try {
      this.serviceBrowser.viewProduct(this.id).subscribe((data: any) => {
        this.product = data;
        this.user = this.product.users;
        this.review = this.product.reviews;
        this.userReviewed = this.product.userReviewed;
        console.log(this.user);
        //this.flag = this.user.includes(JSON.parse(localStorage.getItem("userEmail")));
        // if(this.user.includes(JSON.~parse(localStorage.getItem("userEmail"))) && JSON.parse(localStorage.getItem("loggedIn")) === true){
        // 	this.flag = true;
        // }
        if (JSON.parse(localStorage.getItem("loggedIn")) === true) {
          if (
            this.userReviewed.includes(
              JSON.parse(localStorage.getItem("userEmail"))
            )
          ) {
            if (!this.toaster.currentlyActive) {
              this.toaster.error(
                "Looks like you have already added the review, kindly edit it"
              );
            }

            this.router.navigate(["/view/", this.id]);
          } else if (
            this.user.includes(JSON.parse(localStorage.getItem("userEmail")))
          ) {
            this.flag = true;
          } else {
            //this.message="The user should buy the furniture to give a review";
            if (!this.toaster.currentlyActive) {
              this.toaster.error("Kindly buy the furniture to add a review");
            }
          }
        } else {
          // this.message="You should signin first";
          this.toaster.error("You should signin first");
          this.router.navigateByUrl("/login");
        }
      });
    } catch (error) {
      console.error("Log error", error);
    }
    console.log(this.flag);
  }

  edit(event, userEmail1: string) {
    console.log(userEmail1);
    try {
      if (userEmail1 === JSON.parse(localStorage.getItem("userEmail"))) {
        console.log("entered");
        this.EditFlag = true;
        // this.updateFlag = true;
        // this.EditFlag = false;
        console.log(this.EditFlag);
      } else {
        if (!this.toaster.currentlyActive)
          this.toaster.error(
            "This review belongs to other user.You can't change it!"
          );
        this.router.navigate(["/view/", this.id]);
      }
    } catch (error) {
      console.error("Log error", error);
    }
    console.log(this.flag);
  }

  close() {
    this.feedback = "";
    this.rating = 1;
    this.error = "";
  }

  end() {
    this.EditFlag = false;
  }
}
