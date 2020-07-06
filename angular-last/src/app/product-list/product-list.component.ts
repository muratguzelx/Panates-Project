import { Component, OnInit } from '@angular/core';

import { products } from '../products';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:3000/list';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = products;
  items: any;
  filteredItems: any;
  selectedItem: any;
  constructor(private http: HttpClient) { } // Dependency Injection
  ngOnInit(): void {
    this.getItems().toPromise().then(d => {
      this.items = d;
      const { code, message, records } = d;
      if (code === 0) {
        this.items = records;
        this.filteredItems = records;
        console.log(records);

      }
      else {
        this.items = [];
        this.filteredItems = [];
      }
    });
  }
  onKey(event: any) { // without type info
    const value = event.target.value;
    this.filteredItems = this.items.filter(i => i.name.includes(value));
  }
  getItems(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/list', { startDate: '2016-02-02', endDate: '2020-07-01' });
  }

  onSelectItem(item) {  // soldaki listeden elemanı seçmek için tıkladığımızda bu metot çağırılır ve o eleman seçilmiş eleman değişkenine atanır.
    this.selectedItem = item;
  }

  share() {
    window.alert('The product has been shared!');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/