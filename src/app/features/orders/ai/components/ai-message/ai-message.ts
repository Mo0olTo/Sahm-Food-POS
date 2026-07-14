import {ChangeDetectionStrategy,Component,input,} from '@angular/core';
import { AiMessage } from '../../models/ai-message.model';

@Component({
  selector: 'app-ai-message',
  standalone: true,
  templateUrl: './ai-message.html',
  styleUrl: './ai-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiMessageComponent {

  readonly message = input.required<AiMessage>();

}