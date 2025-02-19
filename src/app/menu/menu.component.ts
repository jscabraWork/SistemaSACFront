import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterLinkActive  } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterLinkActive ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true, 
})
export class MenuComponent implements OnInit{

  ngOnInit(): void {
      
  }
}
