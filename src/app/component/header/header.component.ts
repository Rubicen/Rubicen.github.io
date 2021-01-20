import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  themeOptions = [{name: 'Dark Theme', value:'purple-green'},{name: 'Light Theme', value: 'indigo-pink'}]
  theme: string = 'Dark Theme';
  constructor() { }

  ngOnInit(): void {
    //this.onThemeClick('Dark Theme');
  }

  //onThemeClick(theme: string){
  //  var themeName = this.themeOptions.find(r => r.name == theme).value;
  //  this.theme = theme;
  //  (document.getElementById('themeAsset') as any).href = `assets/${themeName}.css`;
  //}

}
