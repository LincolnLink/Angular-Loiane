# Forms

- Existe 2 tipos de formulario no angular 2+ o Template Driven e o Data Driven

- Template Driven: 

  - O formulario é criado e configurado no HTML.

  - Validações são feitas no proprio template do HTML.

  - Angular cria/deduz um FormGroup do cod HTML, é colocado diretivas nos campos para o angular saber para o Angular gerencia.

  - Valores do form são submetidos com ngSubmit, é usada uma variasvel local para o método que faz o submite pegar os valores.

- Data Driven(Reativo)

  - O formulario é criado e configurado no Component, o HTML só recebe o basico, o componente cria o objeto forms, e o proprio componente gerencia os dados.

  - Validações são feitas no component, no HTML é feita apenas uma ferencia para poder casar as informações!

  - Angular usa o FormGroup criado no Component!

  - Form já está no Component e não precisa de ngSubmit

# Iniciando um projeto para estudo de formularios no Angular 2+

- Cria um projeto chamado "forms"

  <blockquote>ng new forms</blockquote>

- Instala o ngx-bootstrap no projeto

  https://github.com/valor-software/ngx-bootstrap/blob/development/docs/getting-started/ng-cli.md
  
  <blockquote>
    npm install ngx-bootstrap bootstrap --save
  </blockquote>


- Link com os exemplos de forms: 
  
  https://getbootstrap.com/docs/3.3/css/#forms

  Bota o caminho do css no arquivo angular.json

  <blockquote>

    "styles": [
            "./node_modules/bootstrap/dist/css/bootstrap.min.css",
            "styles.css",
          
    ],

  </blockquote>

- Estrutura HTML do NavBar com as duas rotas

  <blockquote>

      < nav ngxNavbarDynamicExpand class="navbar navbar-expand-lg navbar-dark bg-dark">

        <a class="navbar-brand" routerLink="">Angular Forms</a>

        <button class="navbar-toggler" type="button" (click)="collapse.toggle()">
          <span class="navbar-toggler-icon"></span>
        </button>

        <ngx-navbar-collapse id="main-nav" #collapse="ngxNavbarCollapse">
          <ul class="navbar-nav">
            <li class="nav-item active" routerLinkActive="active">
              <a class="nav-link" routerLink="/templateForm">Form - Template Driven</a>
            </li>
            <li class="nav-item" routerLinkActive="active">
              <a class="nav-link" routerLink="/dataForm">Form - Data Driven</a>
            </li>
            
          </ul>
        </ngx-navbar-collapse>
      < /nav>

      < div class="container">        
          
            <router-outlet></router-outlet>          
        
      < /div>

  </blockquote>

  Crie dois componentes, para cada formulario diferente, depois configura no module de rotas


  </blockquote>ng g c TemplateFormComponent</blockquote>


  </blockquote>ng g c DataFormComponent</blockquote>


# Estrutura em HTML do Template-formulario

- Exemplo
  
    </blockquote>
    
        <form class="form-horizontal" #f=ngForm (ngSubmit)="onSubmit(f)>
            <div class="form-group">

                <label for="nome" class="control-label">Nome</label>
                <input type="text" class="form-control" id="nome" placeholder="Nome">
                

                <label for="email" class="control-label">Email</label>        
                <input type="email" class="form-control" id="email" placeholder="nome@Email.com">
                
                <button type="submit" class="btn btn-primary">Enviar</button>
                
            </div>
        </form>    
    
    </blockquote>


    - Crie uma variavel local na tag "< form>" para poder fazer referencia ao formulario, essa variavel recebe uma diretiva do angular 2+ chamada "ngForm", ela ajuda a gerenciar!

    - Crie um evento chamado "(ngSubmit)='método()'", que pode ativar um método quando o botão de submit é clickado, deve ser passa para o método a variavel que faz referencia do formulario!

    <blockquote>

        onSubmit(form: any){
            console.log(form);
        }

    </blockquote>

    - Com as diretivas é criado uma formReative por de baixo dos panos.
      Porem para pegar o valor de cada campo, precisa ter uma asociação em cada campo, cada nome recebe uma propriedade chamada "nome" com seu valor nos campos input no HTML, e é colocada a diretiva "ngModel"!

      <blockquote>

        < label for="email" class="control-label">Email</ label>        
        < input type="email" class="form-control" id="email" 
        placeholder="nome@Email.com" nome="email" ngModel>

      </blockquote>

      Com isso é possivel obter os valores

- Forms (template driven) Inicializando valores com ngModel (two data binding)

  Cria uma variavel, ela recebe um objeto do tipo any, que tem a propriedade nome e email com um valor qualquer!

  <blockquote>

    userExemplo: any = { 
      nome: 'Lincoln', 
      email: 'link@email.com.br'
    };

  </blockquote>

  Com o "two data binding" se modificar o valor no formulario, o objeto é atualizado, com o propert Binding vai apenas inicializar o valor!

- Forms (template driven) Módulos e FormsModule

  Crie um Module para o projeto "template-form", e importa o componente "template-form" para o module "template-form", tem que ficar atento em importar o "FormsModule" no novo module!


  <blockquote>

  @NgModule({
    declarations: [
      TemplateFormComponent
    ],
    imports: [    
      CommonModule,
      FormsModule     
    ]
  })
  export class TemplateFormModule { }

  </blockquote>

- Forms (template driven) Aplicando validação nos campos

  Nas referencias da Api( https://angular.io/api) busca por "validator"

  - required: Torna o campo obrigatorio!

  - maxlength: Tamanho maximo!

  - minlength: Tamanho minimo!

  - email: Validação de email!


  O Angular usa a validação do HTML5:

  https://www.the-art-of-web.com/html/html5-form-validation/

  
- Forms (template driven) Aplicando CSS na validação dos campos

  O Angular aplica classes css nos CONTROLES de formulario dependendo do seu estado! 

  - Estado            |       Sim         |     Não

  - Controle visitado |     ng-Touched    |     ng-untouched

  - Valor mudou       |     ng dirty      |     ng-pristine

  - Controle válido   |     bg-valid      |     bg-invalid


  As classes é inlusa dependendo do estado do controle, pode ser um campo ou formulario!

  <blockquote>
      
    .ng-invalid.ng-touched:not(form) {
        border: 1px solid red;
    }

  </blockquote>

- Forms (template driven) Mostrando mensagens de erro de validação

  Os controles ganhando classes do css quando sofre uma ação, e também tem propriedades que tem essas informações, podendo assim criar uma logica dentro do HTML "*ngIf="!nome.valid && nome.touched", exibindo a mensagem apenas quando for verdadeira! 

  Uma forma de ver todas as informações é vendo cada objeto/controle dentro do form!

  <blockquote>
  
    onSubmit(form: any){
      console.log(form);      
    }    

  </blockquote> 

  Logica no HTML completa!
  <blockquote>

      < input type="text" class="form-control" name="nome" id="nome" 
        placeholder="Nome" [ (ngModel)]="userExemplo.nome" required 
        #nome="ngModel">

      < div *ngIf="!nome.valid && nome.touched" class="alert alert-danger" role="alert">
          Nome é obrigatorio
      < /div>

  </blockquote> 

  Outro exemplo mostrando o form completo, foi usado o NGX-Bootstrap para 
  <blockquote>

    < form class="form-horizontal" #f=ngForm (ngSubmit)="onSubmit(f)" >
      < div class="form-group"
            [ class.has-error]="!email.valid && email.touched"
            [ ngClass]="{'has-feedback': !email.valid && email.touched}">

            <label class="control-label" for="emailLb">Email</label> 

            <input type="email" class="form-control" name="email"
            id="email" placeholder="nome@Email.com" 
            [(ngModel)]="userExemplo.email" required email #email="ngModel" >       
          
            <alert type="danger" [dismissible]="dismissible" *ngIf="!email.valid && email.touched">
                <strong>Alerta -</strong> Com Botão!.
            </alert>
        
        </div>
      < /form>

  </blockquote>

- Forms (template driven) Desabilitando o botão de submit para formulário inválido

  Usando a propriedade "disabled" com isso podemos criar uma logica para habilitar apenas quando o formulario for totalmente valido!

  <blockquote>
    < button disabled="!f.valid" type="submit" class="btn btn-primary">Enviar< /button>
  </blockquote>

- Forms (Dica): Verificando dados do Form no template com JSON


  Crie um component com o nome de "FormDebugComponent", esse componente serve para ver informações do formulario!
  <blockquote>

    < div style="margin-top: 20px;" *ngIf="form">
        < div>
            Detalhes do form
        < /div>
        < pre>
            Form válido: {{ form.valid  }}
        < /pre>
        < pre>
            Form submetido: {{ form.submitted  }}
        < /pre>
        < pre>
            Valores: < br> {{ form.value | json  }}
        < /pre>
    < /div>
  
  </blockquote>

  Ele recebe do component pai um objeto de formulario!

  <blockquote>

    < app-form-debug [ form]="f"></ app-form-debug>
  
  </blockquote>

























  



