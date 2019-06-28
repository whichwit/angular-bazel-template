import { Injector } from '@angular/core';
import {
  State,
  StateContext,
  Selector
} from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { AppInitializer } from 'lib/core';

export interface IHostState {
  userGuid: number
}

@State<IHostState>({
  name: 'host'
})
export class HostState {
  private static _injector: Injector | undefined

  @Selector()
  static userGuid(state: IHostState) {
    return state.userGuid;
  }

  @Selector()
  static injector() {
    return HostState._injector;
  }

  @Receiver()
  public static init(
    { patchState }: StateContext<IHostState>,
    { payload }: EmitterAction<AppInitializer>
  ): void {
    if (payload) {
      patchState({
        userGuid: payload.userGuid
      } as Partial<IHostState>)
    }
  }

  @Receiver()
  public static initRootInjector(
    { payload }: EmitterAction<Injector>
  ): void {
    HostState._injector = payload;
  }

  @Receiver()
  public static tester(): void { }
}
