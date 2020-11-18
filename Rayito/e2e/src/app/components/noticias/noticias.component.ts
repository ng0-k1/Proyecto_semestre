import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Router } from '@angular/router';
import { Noticia, RespuestaNoticia } from 'src/app/interfaces/noticias';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: []
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  paginaLength = true;

  constructor(
    public noticiasService: NoticiaService,
    private router: Router) { }

  ngOnInit(): void {
    this.noticiasService.noticiaCompleta = false;

    // Obtener noticias
    this.noticiasService.getUltimasNoticias2()
      .subscribe((res: RespuestaNoticia) => {
        this.noticias.push(...res.noticias);
      });
  }

  mostrarNoticia(noticia: any) {
    this.noticiasService.noticiaSel = noticia;
    this.noticiasService.noticiaCompleta = true;
    this.router.navigateByUrl('noticiaCompleta');
  }

  restar() {
    this.paginaLength = true;
    this.noticiasService.getNoticiasPaginadasMenos()
      .subscribe((res: RespuestaNoticia) => {
        this.noticias = res.noticias;
      });
    window.scrollTo(0, 0);
  }

  sumar() {
    this.noticiasService.getNoticiasPaginadasMas()
      .subscribe((res: RespuestaNoticia) => {
        this.noticias = res.noticias;
        if (res.noticias.length !== 8) {
          this.paginaLength = false;
        }
        if (res.noticias.length === 0) {
          this.restar();
          this.paginaLength = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire({
            title: 'No hay más noticias',
            background: 'rgb(233,233,0)'
          });
        }
      });
    window.scrollTo(0, 0);
  }

}
