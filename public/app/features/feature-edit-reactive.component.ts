import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data.service';
import { IFeature } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'feature-edit-reactive',
  templateUrl: 'feature-edit-reactive.component.html'
})
export class FeatureEditReactiveComponent implements OnInit {

  featureForm: FormGroup;
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
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
    }

    this.buildForm();
  }

  buildForm() {
      this.featureForm = this.formBuilder.group({
        firstName:  [this.feature.firstName, Validators.required],
        lastName:   [this.feature.lastName, Validators.required],
        gender:     [this.feature.gender, Validators.required],
        email:      [this.feature.email, [Validators.required]],
        address:    [this.feature.address, Validators.required],
        city:       [this.feature.city, Validators.required]
      });
  }
  
  submit({ value, valid }: { value: IFeature, valid: boolean }) {
      
      value._id = this.feature._id;
      value.zip = this.feature.zip || 0; 
      // var feature: IFeature = {
      //   _id: this.feature._id,
      // };

      if (value._id) {

        this.dataService.updateFeature(value)
          .subscribe((feature: IFeature) => {
            if (feature) {
              this.router.navigate(['/features']);
            }
            else {
              this.errorMessage = 'Unable to save feature';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertFeature(value)
          .subscribe((feature: IFeature) => {
            if (feature) {
              this.router.navigate(['/features']);
            }
            else {
              this.errorMessage = 'Unable to add feature';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/features']);
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