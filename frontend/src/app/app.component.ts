import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FundFragmentComponent } from './components/home-sections/fundFragment/fundFragment.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,FundFragmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
