import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  reload = false;
  selectedImage = null;
  previewFile = null;
  task: AngularFireUploadTask;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private afStorage: AngularFireStorage
    ) { }

  ngOnInit() {
  }

  addClient(form){
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
                form.value.image = downloadURL;
                //pour enregister le client
                this.clientService._persistClient(form.value)
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
