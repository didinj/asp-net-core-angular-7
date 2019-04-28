import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {

  supplierForm: FormGroup;
  supplierId: number = null;
  companyName = '';
  contactName = '';
  contactTitle = '';
  address = '';
  city = '';
  region = '';
  postalCode = '';
  country = '';
  phone = '';
  fax = '';
  homePage = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getSupplier(this.route.snapshot.params['id']);
    this.supplierForm = this.formBuilder.group({
      'supplierId' : [null, Validators.required],
      'companyName' : [null, Validators.required],
      'contactName' : [null, null],
      'contactTitle' : [null, null],
      'address' : [null, null],
      'city' : [null, null],
      'region' : [null, null],
      'postalCode' : [null, null],
      'country' : [null, null],
      'phone' : [null, null],
      'fax' : [null, null],
      'homePage' : [null, null]
    });
  }

  getSupplier(id: number) {
    this.api.getSupplier(id).subscribe(data => {
      this.supplierId = data.supplierId;
      this.supplierForm.setValue({
        supplierId: data.supplierId,
        companyName: data.companyName,
        contactName: data.contactName,
        contactTitle: data.contactTitle,
        address: data.address,
        city: data.city,
        region: data.region,
        postalCode: data.postalCode,
        country: data.country,
        phone: data.phone,
        fax: data.fax,
        homePage: data.homePage
      });
    });
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.isLoadingResults = true;
    this.api.updateSupplier(this.supplierId, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/supplier']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  supplierDetails() {
    this.router.navigate(['/supplier-details', this.supplierId]);
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
