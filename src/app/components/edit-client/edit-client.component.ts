import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {


  reload = false;
  selectedImage = null;
  previewFile = null;
  task: AngularFireUploadTask;
  
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    private afStorage: AngularFireStorage
    ) { }

  client: Client = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0,
    active: false,
    image: ""
  };

  id = "";
  ngOnInit() {
    this.id = this.route.snapshot.params.idclient;
    this.clientService._getClient(this.id)
                      .subscribe(
                        (client: Client) => {
                        this.client = client;
                        this.previewFile = client.image;
                      }
                      )
  }

  updateClient(form){
    if (form.valid){

      this.reload = true;

      //pour enregistrer le fichier sur firebase
      const image = this.selectedImage;
      const myFile = 'depots/clients/'+image.name;

      this.task = this.afStorage.upload(myFile, image);
      const ref = this.afStorage.ref(myFile);

      this.task.snapshotChanges().pipe(
        finalize(
          () => {
            ref.getDownloadURL().subscribe(
              (downloadURL) => {
                //inclure l'image sur le model client
                this.client.image = downloadURL;

                //pour enregister le client
                this.client.id = this.id;
                this.clientService._updateClient(this.client)
                    .then((res) => this.router.navigate(['/']))
                    .catch((error) => console.log(error));
              }
            )
          }
          )
      ).subscribe()


    }
    else {
      alert('form invalid');
    }
  }

  previewImage(event){
    this.selectedImage = event.target.files[0];


    const reader = new FileReader();
    reader.onload = () => this.previewFile = reader.result;
    reader.readAsDataURL(this.selectedImage)

  }


}
