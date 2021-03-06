import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FileService } from './../upload-file.service';

import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { report } from 'process';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {


  // Lista de nomes de arquivos
  lisNameFiles: string[] = [];

  // Os arquivos selecionados
  selectedFiles

  // Lista que reune os arquivos para ser salvo!
  // Tem um filtro para não ter repetidos
  files: Set <File>

  // Variavel usada para se desinscrever!
  sub: Subscription;

  // Variavel que informa a % do carregamento!
  progress: number = 0;

  // Variavel que informa quando foi concluido!
  concluido: string = "";

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(){}

  // Método de Evento que pega os arquivos e trata eles!
  onChange(event){

    // Pega os arquivos pelo DOM!
    //const selectedFiles = <FileList>event.target.files;
    this.selectedFiles = <FileList>event.srcElement.files;

    //console.log(this.selectedFiles);

    // Instancia a lista!
    this.files = new Set();

    // Cria uma lista de apenas NOMES dos arquivos, para exibição!
    for (let i = 0; i < this.selectedFiles.length; i++) {

      this.lisNameFiles.push(this.selectedFiles[i].name);
      this.files.add(this.selectedFiles[i]);
    }

    //this.fildFile = document.getElementById('customFile');
    //document.getElementById('customFile').innerHTML = fileNames.join(', ');
    //const valueFild = [...event.srcElement.files].map((file) => `${file.name}`).join(', ');

    this.progress = 0;
  }

  // Método que faz p upload, chamando o serviço personalizado de upload de arquivos!
  // pODE SE USAR: environment.BASE_URL + '/upload'
  onUpload(){

    if(this.files && this.files.size > 0){

      //this.sub = this.serviceUpload.upload(this.files, 'http://localhost:8005/upload')
      //this.sub = this.serviceUpload.upload(this.files, environment.BASE_URL + '/upload')
      this.sub = this.fileService.upload(this.files, '/api/upload')
      .pipe(
        uploadProgress(progress => {
          console.log("valor: " ,progress);
          this.progress = progress
        }),
        filterResponse()
      )
      .subscribe(response =>
        {
          console.log('Upload Concluido'),
          this.concluido = 'upload concluido!';
        }
      );

      /*
      .subscribe((event: HttpEvent<Object>) => {

        // Evento que occorre em download e upload!
        // HttpEventType
        //console.log(event);

        if(event.type === HttpEventType.Response)
        {
          this.concluido = 'upload concluido!';
        }
        else if (event.type === HttpEventType.UploadProgress)
        {
          // Se o evento for do tipo "UploadProgress" ele carrega a barra de progresso!
          const percentDone = Math.round((event.loaded * 100) / event.total);

          // console.log('Progresso', percentDone , '%');
          this.progress = percentDone;
        }
      });

      */

      this.lisNameFiles = [];

    }
  }


  // Método que ativa quando o component é destruido
  // Esta se desinscrevendo para não gerar erro de memoria!
  ngOnDestroy(){
    //console.log(this.sub);

    if(this.sub !== undefined){
      this.sub.unsubscribe();
    }
  }


  // Remove o arquivo da lista! NÃO É POSSIVEL REMOVER OQUE FOI SELECIONADO!
  //onRemoveList(itemList: string){
    //const index = this.lisNameFiles.indexOf(itemList)

    //this.lisNameFiles.splice(index, 1);

    //console.log(this.selectedFiles);
    //console.log("Lista depois de ser deletado: " + this.selectedFiles);

    /*<button type="button" class="close" aria-label="Close" (click)="onRemoveList(item)">
            <span aria-hidden="true">&times;</span>
          </button> */

  //}


  // TODO : preciso terminar
  onDownloadExcel(){

  }

  // Botão de download
  onDownloadPdf(){

    this.fileService.download('api/downloadPDF')
    .subscribe((res: any) => {

      this.fileService.handleFile(res, 'report.pdf');

    });
  }
}
