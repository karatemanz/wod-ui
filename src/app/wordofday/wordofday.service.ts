import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

import { WordOfDay } from './wordofday';

@Injectable()
export class WordOfDayService {

  private wordOfDayUrl = '/rest/wordofday/wotd';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getWordOfTheDay(): Promise<WordOfDay> {
    return this.http
    .get(this.wordOfDayUrl, {headers: this.headers})
    .toPromise()
    .then(response => response.json() as WordOfDay)
    .catch(this.handleError);
  }

  updateWordOfTheDay(wod: WordOfDay): Promise<WordOfDay> {
    const updateUrl = '${this.wordOfDayUrl}/${wod.id}';
    return this.http
    .put(updateUrl, JSON.stringify(wod), {headers: this.headers})
    .toPromise()
    .then(() => wod)
    .catch(this.handleError);
  }

  createHero(name: string): Promise<WordOfDay> {
    return this.http
    .post(this.wordOfDayUrl, JSON.stringify({name: name}), {headers: this.headers})
    .toPromise()
    .then(response => response.json().data as WordOfDay)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured ', error);
    return Promise.reject(error.message || error);
  }


}
