import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements AfterViewInit {
  constructor() {}

  element: HTMLElement | null = null;
  currentTab: string = 'movie';

  setCurrentTab(tab: string) {
    // Remove active class from the previous tab
    if (this.element) {
      this.element.classList.remove('tab-active');
    }

    // Add active class to the current tab
    this.element = document.getElementsByClassName(
      `tab-${tab}`
    )[0] as HTMLElement;
    this.element?.classList.add('tab-active');
    this.currentTab = tab;
  }

  ngAfterViewInit() {
    this.setCurrentTab(this.currentTab);
  }
}
