import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxSpinnerModule } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { FurnitureService } from "./../../../shared/services/furniture.service";
import { FilterComponent } from "./../filter/filter.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchFurnitureComponent } from "./search-furniture.component";
import { CartService } from "src/app/shared/services/cart.service";

describe("SearchFurnitureComponent", () => {
  let component: SearchFurnitureComponent;
  let fixture: ComponentFixture<SearchFurnitureComponent>;
  let location: Location;
  let router: Router;
  let injector: TestBed;
  let serviceCart: CartService;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ToastrModule.forRoot(),
          NgxSpinnerModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([])
        ],
        declarations: [SearchFurnitureComponent],
        providers: [CartService, FurnitureService]
      }).compileComponents();
    })
  );
  beforeEach(
    async(() => {
      fixture = TestBed.createComponent(SearchFurnitureComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      router = TestBed.get(Router);
      serviceCart = TestBed.get(CartService);
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be able navigate to view component page", () => {
    const navigateSpy = spyOn(router, "navigate");
    component.showProduct(1);
    expect(navigateSpy).toHaveBeenCalledWith(["/view/1"]);
  });
  it("should not be able to add furniture to the cart", () => {
    component.addToCart(1);
  });
  it("should be able to add furniture to the cart", () => {
    
  });
});
