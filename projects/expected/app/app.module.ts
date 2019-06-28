import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { EmitterService, NgxsEmitPluginModule } from '@ngxs-labs/emitter';

import { AppInitializer, CoreModule } from 'lib/core';
import { HostState } from 'lib/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function loadConfiguration(
  appInitializer: AppInitializer,
  emitter: EmitterService,
  injector: Injector,
) {
  return () => new Promise<any>(resolve => {
    emitter.action(HostState.initRootInjector).emit(injector)

    appInitializer.init().then(() => {
      emitter.action(HostState.init).emit(appInitializer)
    })

    resolve()
  })
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    NgxsModule.forRoot([HostState], {
      developmentMode: false,
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    NgxsEmitPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: false,
    }),
    NgxsFormPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [AppInitializer, EmitterService, Injector],
      multi: true
    },
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
