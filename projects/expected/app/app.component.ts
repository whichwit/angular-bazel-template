import { Component, OnInit, Injector } from '@angular/core';

import { AppInitializer } from 'lib/core';
import { Store } from '@ngxs/store';
import { EmitterService } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hello-world';

  _store: Store

  constructor(
    private config: AppInitializer,
    public store: Store,
    private emitter: EmitterService,
  ) {   }

  ngOnInit(): void {
    this.store.subscribe(x => this._store = x)
  }
}
