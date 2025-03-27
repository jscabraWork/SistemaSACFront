import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../models/login.models';
import { NgIf } from '@angular/common';
import { LoginService } from '../services/login.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  usuario:Usuario;
  errorMessage:string;
  invalidLogin:boolean

  constructor(private login:LoginService,private auth:AuthService){

  }

  ngOnInit(): void {
      this.usuario = new Usuario()
      this.invalidLogin=false
  }


  handleLogin(){

    if(this.usuario.col_identificacion==null || this.usuario.lo_password==null){
      //alert('Username o Password vacios');
      alert('Username o Password vacios');
      return;
    }

    this.login.login(this.usuario).subscribe({next:response=>{
      this.auth.guardarAgente(response)
    },error:error=>{
      alert("Sucedio un error");
      error
    }});
  }

  
}
