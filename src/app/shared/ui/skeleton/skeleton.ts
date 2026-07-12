import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
})
export class Skeleton {

  rows = input<number>(5); 

  get skeletonRows() {
    return Array.from({ length: this.rows() });
  }
}
