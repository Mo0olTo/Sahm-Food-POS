import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

import { AiMessage } from '../../models/ai-message.model';
import { AiMessageComponent } from '../ai-message/ai-message';

@Component({
  selector: 'app-ai-response',
  standalone: true,
  imports: [AiMessageComponent],
  templateUrl: './ai-response.html',
  styleUrl: './ai-response.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiResponse {

  readonly messages = input.required<AiMessage[]>();

}