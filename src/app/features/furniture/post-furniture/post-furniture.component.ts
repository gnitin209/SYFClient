import { Router } from '@angular/router';
import { FurnitureService } from './../../../shared/services/furniture.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Furniture } from './../../../shared/models/Furniture';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/models/AppConstants';
import { LoginServiceService } from "src/app/shared/services/login-service.service";
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-post-furniture',
	templateUrl: './post-furniture.component.html',
	styleUrls: ['./post-furniture.component.scss']
})
export class PostFurnitureComponent implements OnInit {
  file(file: any) {
    throw new Error("Method not implemented.");
  }
	userEmail: any;
	Paid: boolean = false;
	name: boolean;
	l: boolean = false;
	message: any;
	furniture: Furniture = new Furniture();
	isDisabled: boolean;
	title = 'PostFurniture';
	registerForm: FormGroup;
	submitted = false;
	price: string;

	selectedFiles: FileList;
	currentFileUpload: File;
	progress: { percentage: number } = { percentage: 0 };
	selectedFile = null;
	changeImage = false;
   formBuilder: FormBuilder=new FormBuilder;
	openForm(): any {
		document.getElementById('myForm').style.display = 'block';
	}

	constructor(
		private service: FurnitureService,

		private router: Router,
    private toastr: ToastrService,
    private serviceLogin: LoginServiceService

	) {}
	check(event): any {
		console.log(event.target);
		if (event.target.id === 'paid') {
			let a = event.target.id;
			this.Paid = true;
			//let inputElement = <HTMLInputElement>document.getElementById('greet');
			this.furniture.furnitureShippingType = 'Paid';
		} else {
			this.Paid = false;
			this.furniture.furnitureShippingType = 'Free';
			document.getElementById('shipping_charge').innerHTML = '0';
		}
	}

	ngOnInit() {
		this.serviceLogin.getLoggedInName.subscribe(name => (this.l = name));

		//	this.service.getLoggedInName.subscribe(name => this.l=name);

		if (this.l != null) {
			this.name = true;
		} else {
			this.name = false;
			this.router.navigate(['/home']);
		}
		this.registerForm = this.formBuilder.group({
			type: ['', Validators.required],
			price: ['', Validators.required],
			shipping: ['', Validators.required],
			shipping_charge: ['', Validators.pattern('^[0-9]*')],
			material: ['', Validators.required],
			description: ['', Validators.required],
			file: ['', Validators.required],
			quantity: ['', Validators.required],
			name: ['', Validators.required]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.registerForm.controls;
	}

	onSubmit() {
		console.log('hello');

		this.furniture.furnitureType = this.registerForm.value.type;
		this.furniture.furniturePrice = this.registerForm.value.price;
		this.furniture.userEmail = JSON.parse(localStorage.getItem("userEmail"))
		this.furniture.furnitureMaterial = this.registerForm.value.material;
		this.furniture.furnitureShippingCharge = this.registerForm.value.shiping_charge;
		this.furniture.furnitureDescription = this.registerForm.value.description;
		this.furniture.furnitureQuantity = this.registerForm.value.quantity;
		this.furniture.furnitureName = this.registerForm.value.name;
		this.furniture.furnitureShippingCharge = this.registerForm.value.shipping_charge;
		console.log();
		try{
		this.service.addFurniture(this.furniture).subscribe(
      data => {
			this.message = data;
			this.progress.percentage = 0;

			this.currentFileUpload = this.selectedFiles.item(0);
			this.service.addImage(this.currentFileUpload).subscribe(event =>
				{
				if (event.type === HttpEventType.UploadProgress)
				{
				}
				else if (event instanceof HttpResponse) {
					this.toastr.success('Furniture Adevertisment Uploaded Successfully');
				}
				//this.selectedFiles = undefined;
			});
		}, error => {
		//	window.location.reload();
			this.toastr.error(error.error);
		}

	);
	}
	catch(error) {
	  console.error('Log error', error);
	}

	this.router.navigate(['/home']);


	}
	selectFile(event) {
		this.selectedFiles = event.target.files;
	}

	onReset() {
		this.submitted = false;
		this.registerForm.reset();
	}
}
