import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { FormBuilder, Validators } from '@angular/forms';

describe('SigninComponent', () => {
let component: SigninComponent;
let mockFriendlyHomeService;
let mockRouter;
let mockFormBuilder;
let mockAuthService; 
let mockFormGroup;
let formBuilder = new FormBuilder();
beforeEach(()=>{
formBuilder.group({
userEmail: ["", [Validators.email, Validators.required]],
userPassword: ["", [Validators.required]]
});

// mockFriendlyHomeService = jasmine.createSpyObj(['login']);
// mockFormBuilder = jasmine.createSpyObj(["group"]);
// mockAuthService = jasmine.createSpyObj(['authState']);
// mockRouter = jasmine.createSpyObj(['navigateByUrl']);
// mockFormGroup = jasmine.createSpyObj(['invalid']);
});

// it('login through friendly home service ',()=>{
// mockFriendlyHomeService.login.and.returnValue({subscribe:()=>{}});
// mockFormBuilder.group.and.returnValue(formBuilder);
// mockFormGroup.invalid.and.returnValue({subscribe:()=>{}});

// component = new LoginComponent(mockFriendlyHomeService,mockRouter,mockFormBuilder,mockAuthService);
// component.login();
// expect(mockFriendlyHomeService.login).toHaveBeenCalled();
// })

});