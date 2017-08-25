import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'hero-detail',
  styleUrls: [ './hero-detail.component.css' ],
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ){ }

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.getHero(+params.get('id'))).subscribe(hero => this.hero = hero);
  }

  getHero(id: number): Promise<Hero> {
    return this.heroService.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }

  saveHero(): void {
    this.heroService.updateHero(this.hero).then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
