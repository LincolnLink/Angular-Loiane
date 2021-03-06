import { AuthService } from './login/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Exemplo de rotas';

  mostrarMenu: boolean = false;

  constructor( private authService: AuthService,
    private router: Router){}

  ngOnInit(){

    // Se inscreve para saber se o usuario está logado ou não!
    // Pode trocar pelo observable
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

  }
}
