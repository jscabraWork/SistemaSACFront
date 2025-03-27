import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterLinkActive  } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterLinkActive ,NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true, 
})
export class MenuComponent implements OnInit{


  constructor(public auth:AuthService){

  }

  ngOnInit(): void {
      
  }
}
