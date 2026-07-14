import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-prompt',
  imports: [FormsModule],
  templateUrl: './ai-prompt.html',
  styleUrl: './ai-prompt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiPrompt {

  readonly prompt = signal('');

  readonly send = output<string>();

  protected submit(): void {

    const value = this.prompt().trim();

    if (!value) {
      return;
    }

    this.send.emit(value);

    this.prompt.set('');

  }
}
