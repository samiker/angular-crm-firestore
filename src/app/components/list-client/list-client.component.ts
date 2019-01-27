import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  search = "";
  searchClients: Client[] = [];
  clients: Client[] = [];
  total = 0;
  
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService._getClients()
        .subscribe(
          (res: Client[]) => {
           this.searchClients = this.clients = res
           this.calculeTotal();
        })
  }

  removeClient(id) {
    this.clientService._removeClient(id)
    .then((res) => console.log(res))
    .catch((error) => console.error(error))
  }

  searchClient() {
    this.searchClients = _.filter(
      this.clients,
        (client) => 
                  _.includes(client.email, this.search)
              //  || _.includes(client.firstName, this.search)
              //  || _.includes(client.lastName, this.search)
        )
   }

  toggleActive(client) {
    
    this.clientService._setActive(
      client.id,
      {
      active: !client.active
      }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  // getTotal(){
  //   this.clients.forEach(client => {
  //     this.total += client.balance
  //   });
  //   return this.total;
  // }

  calculeTotal(){

    this.total = _.reduce(
      this.searchClients,
      (sum, client) => {
        return sum + client.balance
      }, 0);
    }


}
