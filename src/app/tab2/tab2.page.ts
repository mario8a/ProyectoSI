import { Component, OnInit } from '@angular/core';
import {DatoInter} from '../models/data.interface';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  datos: DatoInter[];
  
  constructor(private datosService: DataService) {}

  ngOnInit() {
    this.datosService.getDatos().subscribe(res => {
      // console.log('Datos', res);
      this.datos = res;
    });
  }
}
