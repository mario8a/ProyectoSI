import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {DatoInter} from '../models/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //<Interface>
  private datosCollection: AngularFirestoreCollection<DatoInter>;
  //propiedad para almacenar toda slas tareas
  private datos: Observable<DatoInter[]>;

  constructor(db: AngularFirestore) {
    //<DatoInter>('nombre de la coleccion')
    this.datosCollection = db.collection<DatoInter>('datos');
    this.datos = this.datosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  //Obtener todos los datos
  getDatos() {
    return this.datos;
  }

  //Obtener un solo dato
  getDato(id: string) {
    return this.datosCollection.doc<DatoInter>(id).valueChanges();
  }
  
  //actualizar datos
  updateDato(dato: DatoInter, id: string) {
    return this.datosCollection.doc(id).update(dato);
  }

  //crear datos
  addDato(dato: DatoInter) {
    return this.datosCollection.add(dato);
  }

  //borrar datos
  deleteDato(id: string) {
    return this.datosCollection.doc(id).delete();
  }
}
