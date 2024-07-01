import { Component, OnInit, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Vacancy } from '../../models/vacancy';
import { VacancyService } from '../../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.scss',
})
export class VacancyComponent implements OnInit {
  vacancies: Vacancy[] = [];
  isLoading = true;

  private vacancyService = inject(VacancyService);

  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe(
      (data) => {
        this.vacancies = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching vacancies:', error);
        this.isLoading = false;
      }
    );
  }
}
