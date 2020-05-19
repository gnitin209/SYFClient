import { element } from "protractor";
import { NgxSpinnerService } from "ngx-spinner";
import { FurnitureService } from "./../../../shared/services/furniture.service";
import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChildren,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DisplayFurnitureDTO } from "src/app/shared/models/displayFurnitureDTO";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { CartService } from "src/app/shared/services/cart.service";

@Component({
  selector: "app-search-furniture",
  templateUrl: "./search-furniture.component.html",
  styleUrls: ["./search-furniture.component.scss"],
})
export class SearchFurnitureComponent implements OnInit {
  something: boolean = false;
  heroesnew1: DisplayFurnitureDTO[];
  empty: boolean = false;
  empty1: boolean;
  val: string;
  val1: string;
  number1: number;
  number2: number;
  number3: any;
  number4: number;
  constructor(
    private cartService: CartService,
    private toaster: ToastrService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private service: FurnitureService,
    private activatedRoute: ActivatedRoute,
    private resolver: ComponentFactoryResolver
  ) {
    this.heading = true;
  }
  sidBar: any = false;
  message: String;
  heading: boolean;
  furniture: DisplayFurnitureDTO[] = [];
  heroesnew: DisplayFurnitureDTO[] = [];
  new: DisplayFurnitureDTO[] = [];
  someArray: DisplayFurnitureDTO[] = [];
  furnitures1: boolean = false;
  i: number = 0;
  furnitures: boolean = false;
  furnitures2 = false;
  free: boolean = false;
  paid: boolean = false;
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.SpinnerService.show();
      this.message = params.value;
      this.service.getSearchresults(this.message).subscribe(
        (data) => {
          this.furniture = data;
          this.heroesnew = data;
          console.log(this.furniture);
          this.SpinnerService.hide();
          this.heading = true;
        },
        (error) => {
          this.heading = false;
          this.SpinnerService.hide();
          this.furniture = [];
        }
      );
    });
    this.heroesnew = this.furniture;
  }
  showProduct(id: number) {
    this.router.navigate(["/view/" + id]);
  }

  addToCart(id: number) {
    var email = JSON.parse(localStorage.getItem("userEmail"));
    if (email == null) {
      this.toaster["warning"]("Please Log In First, You are not logged in!");
      this.router.navigate(["/login"]);
    }
    if (email != null) {
      this.cartService.sendNumber(id,true).subscribe((data) => {
        this.message = data;
        this.cartService.message.subscribe((inf) => {
          this.toaster.info(inf);
        });
      });
    }
  }
  openNav() {
    this.sidBar = true;
  }

  closeNav() {
    this.sidBar = false;
    // document.getElementById("mySidebar").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
  }
  filters(value: string, event: any) {
    if (this.furnitures1 || this.furnitures2) {
      if (event.target.checked) {
        if (this.heroesnew == this.furniture) {
          this.heroesnew = this.heroesnew.filter(
            (t) => t.furnitureMaterial.toLowerCase() == value.toLowerCase()
          );
        } else {
          this.someArray = [];
          for (var index in this.heroesnew) {
            this.someArray.push(this.heroesnew[index]);
          }
          this.new = this.heroesnew.filter(
            (t) => t.furnitureMaterial.toLowerCase() == value.toLowerCase()
          );
          for (var index in this.new) {
            if (this.heroesnew.includes(this.new[index])) {
              this.heroesnew = [];
            }
          }
          for (var index in this.new) {
            this.heroesnew.push(this.new[index]);
          }
        }
      } else {
        this.heroesnew = this.someArray;
      }
    } else {
      if (event.target.checked) {
        this.val = value;
        if (this.heroesnew == this.furniture) {
          this.furnitures = true;
          this.heroesnew = this.furniture.filter((t) =>
            t.furnitureMaterial.toLowerCase().includes(value)
          );
        } else {
          this.furnitures = true;
          this.new = this.furniture.filter((t) =>
            t.furnitureMaterial.toLowerCase().includes(value)
          );

          for (var index in this.new) {
            this.heroesnew.push(this.new[index]);
          }
        }
      } else {
        this.val1 = value;
        if (this.new.length == 0 && this.heroesnew.length != 0) {
          if (this.val === this.val1) {
            this.heroesnew = this.furniture;
            this.furnitures = true;
          } else {
            this.heroesnew = [];
            if ((<HTMLInputElement>document.getElementById("1")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "wooden"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }
            if ((<HTMLInputElement>document.getElementById("2")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "plastic"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("3")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "fibre"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("4")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "fabric"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("5")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "engineered wood"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("6")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "solid wood"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("7")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "leather"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("8")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "laminate"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("9")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "steel"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("10")).checked) {
              this.furnitures = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureMaterial.toLowerCase() == "microfiber"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }
            if (this.heroesnew.length == 0) {
              this.furnitures = false;
            }
          }
        } else {
          this.furnitures = false;
          this.new = this.heroesnew.filter(
            (t) => !t.furnitureMaterial.toLowerCase().includes(value)
          );
          if (this.new.length == 0) {
            this.furnitures = false;
            this.heroesnew = this.furniture;
          } else {
            this.heroesnew = this.new;
          }
        }
      }
    }
  }

  filter1(value: string, event: any) {
    if (this.furnitures || this.furnitures2) {
      if (event.target.checked) {
        if (this.heroesnew == this.furniture) {
          this.heroesnew = this.heroesnew.filter(
            (t) => t.furnitureType1.toLowerCase() == value.toLowerCase()
          );
          // console.log(this.heroesnew);
        } else {
          this.someArray = [];
          for (var index in this.heroesnew) {
            this.someArray.push(this.heroesnew[index]);
          }
          console.log(this.someArray);
          this.new = this.furniture.filter(
            (t) => t.furnitureType1.toLowerCase() == value.toLowerCase()
          );

          for (var index in this.new) {
            if (this.heroesnew.includes(this.new[index])) {
              this.heroesnew = [];
            }
          }
          for (var index in this.new) {
            this.heroesnew.push(this.new[index]);
          }
        }
      } else {
        console.log("somethi");
        console.log(this.someArray);
        this.heroesnew = this.someArray;
      }
    } else {
      if (event.target.checked) {
        this.val = value;
        if (this.heroesnew == this.furniture) {
          this.furnitures1 = true;
          this.heroesnew = this.furniture.filter((t) =>
            t.furnitureType1.toLowerCase().includes(value)
          );
        } else {
          this.furnitures1 = true;
          this.new = this.furniture.filter((t) =>
            t.furnitureType1.toLowerCase().includes(value)
          );

          for (var index in this.new) {
            this.heroesnew.push(this.new[index]);
          }
        }
      } 
      else {
       
        this.val1 = value;
        if (this.new.length == 0 && this.heroesnew.length != 0) {
          if (this.val === this.val1) {
            this.heroesnew = this.furniture;
            console.log(this.heroesnew)
            console.log(this.furniture)
            this.furnitures1 = true;
          } else {
            this.heroesnew = [];
            if ((<HTMLInputElement>document.getElementById("1")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "sofa"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }
            if ((<HTMLInputElement>document.getElementById("2")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "bed"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("3")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "chair"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("4")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "dinning set"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("5")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "bookshelf"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("6")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "armoire"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("7")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "table"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("8")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "Book Case"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("9")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "recliners"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("10")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "tv cupboard"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("11")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "tv stand"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("12")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furnitureType1.toLowerCase() == "wardrobe"
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }
            if (this.heroesnew.length == 0) {
              this.furnitures1 = false;
            }
          }
        } else {
          this.furnitures1 = false;
          this.new = this.heroesnew.filter(
            (t) => !t.furnitureType1.toLowerCase().includes(value)
          );
          if (this.new.length == 0) {
            this.furnitures = false;
            this.heroesnew = this.furniture;
          } else {
            this.heroesnew = this.new;
          }
        }
      }
    }
  }

  @ViewChildren("input") input;
  clear() {
    this.input.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.heroesnew = this.furniture;
  }

  filterByPrice(value1: number, value2: number, event: any) {
    if (this.furnitures || this.furnitures1) {
      if (event.target.checked) {
        console.log(this.furnitures);
        if (this.heroesnew == this.furniture) {
          this.heroesnew = this.heroesnew.filter(
            (t) => t.furniturePrice <= value2 && t.furniturePrice >= value1
          );
        } else {
          this.someArray = this.heroesnew;
          this.new = this.heroesnew.filter(
            (t) => t.furniturePrice <= value2 && t.furniturePrice >= value1
          );
          this.heroesnew = [];

          for (var index in this.new) {
            this.heroesnew.push(this.new[index]);
          }
        }
      } else {
        this.heroesnew = this.someArray;
      }
    } else {
      if (event.target.checked) {
        this.number1 = value1;
        this.number2=value2;
        if (this.heroesnew == this.furniture) {
          this.furnitures2 = true;
          this.heroesnew = this.furniture.filter((t) => t.furniturePrice <= value2 && t.furniturePrice >= value1
          );
        } else {
          this.furnitures2 = true;
          this.new = this.furniture.filter((t) => t.furniturePrice <= value2 && t.furniturePrice >= value1
          );

          for (var index in this.new) {
            this.heroesnew.push(this.new[index]);
          }
        }
      } 
      else {
       
        this.number3 = value1;
        this.number4 = value2;
        if (this.new.length == 0 && this.heroesnew.length != 0) {
          if (this.number1 === this.number3 && this.number2==this.number4) {
            this.heroesnew = this.furniture;
            console.log(this.heroesnew)
            console.log(this.furniture)
            this.furnitures1 = true;
          } else {
            this.heroesnew = [];
            if ((<HTMLInputElement>document.getElementById("1")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furniturePrice <= 500 && t.furniturePrice > 1000
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }
            if ((<HTMLInputElement>document.getElementById("2")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furniturePrice <= 1000 && t.furniturePrice > 5000
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if ((<HTMLInputElement>document.getElementById("3")).checked) {
              this.furnitures1 = true;
              this.heroesnew1 = this.new = this.furniture.filter(
                (t) => t.furniturePrice <= 5000 && t.furniturePrice >= 100000
              );
              for (var index in this.heroesnew1) {
                this.heroesnew.push(this.new[index]);
              }
            }

            if (this.heroesnew.length == 0) {
              this.furnitures1 = false;
            }
          }
        } else {
          this.furnitures1 = false;
          this.new = this.heroesnew.filter(
            (t) => t.furniturePrice <= value2 && t.furniturePrice >= value1
          );
          if (this.new.length == 0) {
            this.furnitures = false;
            this.heroesnew = this.furniture;
          } else {
            this.heroesnew = this.new;
          }
        }
      }
    }
  }


  filterByShipping(event: any) {
    if (event.target.value === "free") {
      this.free = true;
      if (this.paid) {
        console.log(this.furniture);
        this.heroesnew = this.furniture.filter(
          (t) => t.furnitureShipping == "Free"
        );
      } else {
        this.heroesnew = this.heroesnew.filter(
          (t) => t.furnitureShipping == "Free"
        );
      }
    } else {
      this.paid = true;
      if (this.free) {
        this.heroesnew = this.furniture.filter(
          (t) => t.furnitureShipping == "Paid"
        );
      } else {
        this.heroesnew = this.heroesnew.filter(
          (t) => t.furnitureShipping == "Paid"
        );
      }
    }
  }
}
