import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';

import { Observable, of, empty } from 'rxjs';
import { map, share, mergeMap, take, shareReplay, defaultIfEmpty, filter } from 'rxjs/operators';

import { NPPES } from '../models';

interface NPPESResponse {
  result_count: number
  results: NPPES[]
}

@Injectable({
  providedIn: 'root'
})
export class NPPESService {

  private api: string = 'https://npiregistry.cms.hhs.gov/api/';

  constructor(
    private http: HttpClient,
  ) { }

  get(npi: number | string) {
    const r = this.query({ term: npi })

    return r && r.pipe(
      mergeMap(x => x),
      take(1)
    )
  }

  search(params: { [key: string]: any }): Observable<NPPES[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }),
      params: new HttpParams({ fromObject: params, encoder: new HttpUrlEncodingCodec }),
    };

    return this.http.get<NPPESResponse>(this.api, httpOptions).pipe(
      map(val => val.results
        .map(x => new NPPES(x))
        .filter(x => x.basic.status === 'A')
      ),
      defaultIfEmpty([]),
      shareReplay(),
    )
  }

  query(params: {
    term: string | number
    state?: string
    organization?: boolean
  } = { term: '', organization: false }) {

    const defaultParam = {
      number: '',
      enumeration_type: '',
      taxonomy_description: '',
      first_name: '',
      use_first_name_alias: true,
      last_name: '',
      organization_name: '',
      address_purpose: 'PRIMARY',
      city: '',
      state: '',
      postal_code: '',
      country_code: '',
      limit: '',
      skip: '',
      version: '2.1',
    }

    const term = params.term.toString().trim()
    if (!term) { return of([]) }

    let queryParams: any = {
      limit: 200,
      state: params.state
    }

    let middle_name: string

    if (term.length === 10 && !isNaN(Number.parseInt(term))) {
      queryParams['number'] = term
    } else {
      if (params.organization) {  // organization
        queryParams['enumeration_type'] = 'NPI-2'
        queryParams['organization_name'] = term
      } else {  // individual
        queryParams['enumeration_type'] = 'NPI-1'

        // match "LastName, FirstName MI" format
        const match1: RegExpExecArray = /^([\w-]+),(.+)$/.exec(term)!
        // match "FirstName LastName" format
        const match2 = /^(.+)\s+([\w-]+)$/.exec(term)!

        let last_name: string = '', first_names: string = '', first_name: string = ''

        if (match1) {
          [, last_name, first_names] = match1
        } else if (match2) {
          [, first_names, last_name] = /^(.+?)([\w-]+)$/.exec(term)!
        } else {
          last_name = term
        }

        if (first_names) {
          const names = first_names.trim().split(' ');

          first_name = names[0]
          middle_name = names.slice(1).join(' ').trim()

          queryParams['first_name'] = first_name.length < 2 ? first_name : `${first_name}*`
        }

        if (last_name) {
          queryParams['last_name'] = last_name.length < 2 ? last_name : `${last_name}*`
        }
      }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        }),
        params: new HttpParams({ fromObject: { ...defaultParam, ...queryParams } }),
      };

      return this.http.get<NPPESResponse>(this.api, httpOptions).pipe(
        map(val => val.results.map(x => new NPPES(x))
          .filter(x => !middle_name || x.basic.middle_name && x.basic.middle_name.toLowerCase() === middle_name.toLowerCase())
          .filter(x => x.basic.status === 'A')),
      )
    }
  }
}
