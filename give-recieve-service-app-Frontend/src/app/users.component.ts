import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    <div class="i">
      <div class="i-left"></div>
      <div class="i-middle">
        <p>users works!</p>
      </div>
      <div class="i-right"></div>
    </div>
  `,
  styles: [],
})
export class UsersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
