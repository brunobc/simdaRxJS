import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../core/data.service';
import { IFeature } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'features',
  templateUrl: 'features.component.html'
})
export class FeaturesComponent implements OnInit {

  title: string;
  features: IFeature[] = [];
  filteredFeatures: IFeature[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.title = 'Features';
  }

}