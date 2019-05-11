import { Component, OnInit } from '@angular/core';
import {DatoInter} from '../models/data.interface';
import {DataService} from '../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-data-details',
  templateUrl: './data-details.page.html',
  styleUrls: ['./data-details.page.scss'],
})
export class DataDetailsPage implements OnInit {

  dato: DatoInter = {
    campo1: '',
    campo2: '',
    campo3: '',
    priority: 0
  };

  datoId = null;

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private datoService: DataService,
              private loadingCrtl: LoadingController) { }

  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.datoId = this.route.snapshot.params['id'];

    if(this.datoId){
      this.loadDato();
    }
  }

  async loadDato() {
    const loading = await this.loadingCrtl.create({
      message: 'loading...'
    });
    await loading.present();
    this.datoService.getDato(this.datoId).subscribe(res => {
      loading.dismiss();
      this.dato = res;
    });
  }

  async saveDato() {
    const loading = await this.loadingCrtl.create({
      message: 'Saving...'
    });
    await loading.present();

    if(this.datoId) {
      //si existe un id, se actualiza
      this.datoService.updateDato(this.dato, this.datoId).then(() => {
        loading.dismiss();
        this.navCtrl.navigateForward('/app/user/tabs/tab2');
      });
    } else{
      //si no, crear uno nuevo
      this.datoService.addDato(this.dato).then(() => {
        loading.dismiss();
        this.navCtrl.navigateForward('/app/user/tabs/tab2');
      });
    }
  }

  onRemove(idDato: string) {
    // console.log(dato);
    this.datoService.deleteDato(idDato);
  }

}
