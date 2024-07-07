import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-introductory',
  standalone: true,
  imports: [],
  templateUrl: './introductory.component.html',
  styleUrl: './introductory.component.scss',
})
export class IntroductoryComponent {
  constructor(private elRef: ElementRef) {
    // this.scrollToVacancies = this.scrollToVacancies.bind(this);
  }

  // scrollToVacancies(): void {
  //   const vacancySection = document.getElementById('vacancySection');
  //   console.log(vacancySection);

  //   if (vacancySection) {
  //     vacancySection.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
}
