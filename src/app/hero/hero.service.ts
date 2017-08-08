import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from '../mock-heroes/mock-heroes';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http
    .get(this.heroesUrl)
    .toPromise()
    .then(response => response.json().data as Hero[])
    .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const heroUrl = '${this.heroesUrl}/${id}';
    return this.http
    .get(heroUrl)
    .toPromise()
    .then(response => response.json().data as Hero)
    .catch(this.handleError);
  }

  updateHero(hero: Hero): Promise<Hero> {
    const updateUrl = '${this.heroesUrl}/${hero.id}';
    return this.http
    .put(updateUrl, JSON.stringify(hero), {headers: this.headers})
    .toPromise()
    .then(() => hero)
    .catch(this.handleError);
  }

  createHero(name: string): Promise<Hero> {
    return this.http
    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    .toPromise()
    .then(response => response.json().data as Hero)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured ', error);
    return Promise.reject(error.message || error);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulation of a 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

}
