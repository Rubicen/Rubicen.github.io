import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  iconCount: number = 0;
  constructor() { }

  ngOnInit(): void { 
  }

  iconCounter(){
    this.iconCount++;
    if (this.iconCount == 10){
      alert(`Spaghetti Supply
For all your spaghetti needs
It's all bad code here...`);
    }
  }
}
