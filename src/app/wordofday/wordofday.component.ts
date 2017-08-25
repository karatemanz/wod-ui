import { Component, OnInit } from '@angular/core';
import { WordOfDayService } from './wordofday.service';
import { WordOfDay } from './wordofday';

@Component({
  selector: 'wordofday',
  styleUrls: [ './wordofday.component.css' ],
  templateUrl: './wordofday.html',
})
export class WordOfDayComponent implements OnInit {

  wordOfDay: WordOfDay;

  constructor(private wordOfDayService: WordOfDayService) {}

  ngOnInit(): void {
    this.getWordOfDay();
    console.log(this.wordOfDay);
  }

  getWordOfDay(): void {
    Promise.resolve(this.wordOfDayService.getWordOfTheDay().then(wordOfDay => this.wordOfDay = wordOfDay));
  }

}
