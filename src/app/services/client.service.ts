import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection: AngularFirestoreCollection;
  constructor(private afs: AngularFirestore) {

    this.clientCollection = afs.collection('clients');
  
  }

  _getClients(){
    return this.afs.collection('clients').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  _persistClient(data){
    return this.clientCollection.add(data);
  }

  _removeClient(id){
    //return this.afs.doc(`clients/${id}`).delete();
    return this.clientCollection.doc(id).delete();
  }

  _setActive(id, data) {
    //return this.afs.doc(`clients/${id}`).update({active: !myActive});
    return this.clientCollection.doc(id).update(data);
  }

  _getClient(id){
    return this.clientCollection.doc(id).valueChanges();
  }

  _updateClient(client){
    return this.clientCollection.doc(client.id).update(client);
  }


}
