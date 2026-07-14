import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-ai-loading',
  standalone: true,
  templateUrl: './ai-loading.html',
  styleUrl: './ai-loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiLoading {

  protected readonly cards = Array.from({ length: 3 });

}