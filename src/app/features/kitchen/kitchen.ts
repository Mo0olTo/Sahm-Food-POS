import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-kitchen',
  imports: [],
  templateUrl: './kitchen.html',
  styleUrl: './kitchen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Kitchen {}
