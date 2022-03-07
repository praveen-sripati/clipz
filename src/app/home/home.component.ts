import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public clipService: ClipService) {
    this.clipService.getClips()
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll)
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const {scrollTop, offsetHeight} = document.documentElement
    const {innerHeight} = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

    if(bottomOfWindow) {
      this.clipService.getClips()
    }
  }
}
