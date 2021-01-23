import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spaghetti-supply-project';
  constructor() {
    let cursor = 0;
    const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    document.addEventListener('keydown', (e) => {
      cursor = (e.keyCode == KONAMI_CODE[cursor]) ? cursor + 1 : 0;
      if (cursor == KONAMI_CODE.length) {
        this.activateCheats();
      }
    });
  }

  activateCheats(){
    alert('Cheats activated');
    var _this = this;
    setInterval(() => {
      var backgroundElement = document.getElementById("changingBackground");
      backgroundElement.style.backgroundColor = _this.createRandomColour();
    }, 200);
  }

  createRandomColour() {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }

}
