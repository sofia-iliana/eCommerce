import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
//import { dummyTeas } from '../tea-products';
import { CartService } from '../Cart.service';
import { TeaItem } from '../teaItem';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tea-and-herbs',
  standalone: true,
  imports: [NgClass, NgFor, CommonModule],
  templateUrl: './tea-and-herbs.component.html',
  styleUrl: './tea-and-herbs.component.css',
})
export class TeaAndHerbsComponent implements OnInit {
  selectedFilter = '';
  classes = 'btn p-3 font-semibold text-brown';
  whenSelectedClass = 'btn p-3 font-semibold text-brown bg-peach';
  teaList: TeaItem[] = [];
  displayedTeas: TeaItem[] = [];
  showMessage = false;
  http = inject(HttpClient);

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.http.get<TeaItem[]>('https://localhost:5001/api/teaitems').subscribe({
      next: (response) => {
        this.teaList = response;
        this.teaList.map((item) => {
          item.quantity = 1;
        });
        this.displayedTeas = this.teaList;
      },
      error: (error) => console.log(error),
    });
  }

  onSelectFilter(e: any | null) {
    this.selectedFilter = e;
    if (this.selectedFilter === 'All' || this.selectedFilter === '') {
      this.displayedTeas = this.teaList.map((teaItem) => teaItem);
    } else {
      this.displayedTeas = this.teaList.filter(
        (teaItem) => teaItem.type === this.selectedFilter
      );
    }
  }

  addToCart(item: TeaItem) {
    this.cartService.onAddToCart(item);
    this.showNotificationMessage();
  }

  showNotificationMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3600);
  }
}
