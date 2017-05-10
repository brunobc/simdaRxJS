import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IFeature } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'feature-edit',
  templateUrl: 'feature-edit.component.html'
})
export class FeatureEditComponent implements OnInit {

  feature: IFeature = {
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    email: '',
    city: '',
    zip: 0
  };
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
    }

  }
  
  submit() {

      if (this.feature._id) {

        this.dataService.updateFeature(this.feature)
          .subscribe((feature: IFeature) => {
            if (feature) {
              this.router.navigate(['/features']);
            } else {
              this.errorMessage = 'Unable to save feature';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertFeature(this.feature)
          .subscribe((feature: IFeature) => {
            if (feature) {
              this.router.navigate(['/features']);
            }
            else {
              this.errorMessage = 'Unable to add feature';
            }
          },
          (err: any) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteFeature(this.feature._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/features']);
          }
          else {
            this.errorMessage = 'Unable to delete feature';
          }
        },
        (err) => console.log(err));
  }

}