import { Component, OnInit, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Vacancy } from '../../models/vacancy';
import { VacancyService } from '../../services/vacancy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.scss',
})
export class VacancyComponent implements OnInit {
  vacancies: Vacancy[] = [];
  // displayedColumns: string[] = ['title', 'description', 'expand'];
  // expandedElement: Vacancy | null = null;

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

  // toggleRow(element: Vacancy): void {
  //   this.expandedElement = this.expandedElement === element ? null : element;
  // }
}
