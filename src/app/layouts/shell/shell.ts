import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '../sidebar/sidebar';
import { Header } from "../header/header";
import { Workspace } from "../workspace/workspace";

@Component({
  selector: 'app-shell',
  imports: [ Sidebar, Header, Workspace],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {}
