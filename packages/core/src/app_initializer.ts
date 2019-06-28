import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const defaults = {
    userGuid: 9000039963501190,
    webServiceUri: 'https://api.icndb.com',
    dateFormat: 'D-MMM-YYYY HH:mm',
};

@Injectable({
    providedIn: 'root',
})
export class AppInitializer {
    userGuid: number
    webServiceUri: string
    dateFormat: string

    init(): Promise<any> {
        return new Promise<any>(resolve => {
            Object.assign(this, defaults)
            resolve()
        });
    }
}