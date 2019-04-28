import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  supplier: Supplier = {
    supplierId: null,
    companyName: '',
    contactName: '',
    contactTitle: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phone: '',
    fax: '',
    homePage: ''
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getSupplierDetails(this.route.snapshot.params['id']);
  }

  getSupplierDetails(id: number) {
    this.api.getSupplier(id)
      .subscribe(data => {
        this.supplier = data;
        console.log(this.supplier);
        this.isLoadingResults = false;
      });
  }

  deleteSupplier(id: number) {
    this.isLoadingResults = true;
    this.api.deleteSupplier(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/supplier']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
