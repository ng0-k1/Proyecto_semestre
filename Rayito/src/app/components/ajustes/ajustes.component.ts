import { Component, OnInit } from '@angular/core';
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { Foto } from 'src/app/interfaces/foto';
import { TecnologiaSobreMiService } from 'src/app/services/tecnologia-sobre-mi.service';
import { NgForm } from '@angular/forms';
import { TooltipService } from 'src/app/services/tooltip.service';

import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styles: []
})
export class AjustesComponent implements OnInit {

  fotoSel: Foto;
  tecnologiasDestacadas: string[] = [];

  sobreMiBackend: any;

  constructor(
    public imagenYoService: ImagenesYoService,
    public tecSobre: TecnologiaSobreMiService,
    public tooltip: TooltipService) { }

  ngOnInit(): void {
    this.tooltip.abrirTooltip();
    setTimeout(() => {
      this.tooltip.abrirTooltipHover();
    }, 150);

    this.tecSobre.getTecnologia()
      .subscribe((res: any) => {
        this.tecnologiasDestacadas.push(...res.tecnologias);
      });

    this.tecSobre.getSobreMi()
      .subscribe(async (res: any) => {
        this.sobreMiBackend = await res.sobreMi[0];
      });
  }

  editarImgYo(img: Foto) {
    this.fotoSel = img;

    if (this.fotoSel.img === this.imagenYoService.img1) {
      $('#imagen').modal();
      this.imagenYoService.imagenNombre = '1a.jpg';
      this.imagenYoService.imagenPath = this.fotoSel.img;
      this.tooltip.cerrarTooltip();
    }
    if (this.fotoSel.img === this.imagenYoService.img2) {
      $('#imagen').modal();
      this.imagenYoService.imagenNombre = '2a.jpg';
      this.imagenYoService.imagenPath = this.fotoSel.img;
      this.tooltip.cerrarTooltip();
    }
    if (this.fotoSel.img === this.imagenYoService.img3) {
      $('#imagen').modal();
      this.imagenYoService.imagenNombre = '3a.jpg';
      this.imagenYoService.imagenPath = this.fotoSel.img;
      this.tooltip.cerrarTooltip();
    }
    if (this.fotoSel.img === this.imagenYoService.img4) {
      $('#imagen').modal();
      this.imagenYoService.imagenNombre = '4a.jpg';
      this.imagenYoService.imagenPath = this.fotoSel.img;
      this.tooltip.cerrarTooltip();
    }
  }

  editarTec(tec: string) {
    this.tecSobre.mostrarTec = true;
    this.tecSobre.tecSel = tec;
    this.tooltip.cerrarTooltip();
    setTimeout(() => {
      $('#tecnologia').modal();
    }, 100);
  }

  actualizarSobreMi() {
    this.tecSobre.mostrarSobreMi = true;
    this.tooltip.settings = false;
    this.tooltip.settings3 = false;
  }

  actualizarSobreMiFull(f: NgForm) {
    this.tecSobre.actualizarSobreMi(this.sobreMiBackend, this.sobreMiBackend._id);
    this.tecSobre.mostrarSobreMi = false;
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      title: 'SobreMi actualizado correctamente',
      background: 'rgb(233,233,0)'
    });
  }

  cerrarSobreMi() {
    this.tecSobre.mostrarSobreMi = false;
    this.tooltip.settings3 = true;
    this.tooltip.settings = true;
    window.scrollTo(0, 0);
  }

}
