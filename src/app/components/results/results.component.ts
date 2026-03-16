import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  projects = [
    {
      title: 'Radisson Blu Iveria',
      category: 'სასტუმრო',
      description: 'ლობის და რესტორნის სრული გამწვანება 120+ მცენარით. მინიმალისტური დიზაინით შექმნილი მწვანე ოაზისი.',
      stats: { plants: '120+', area: '800 მ²', duration: '3 თვე' },
    },
    {
      title: 'TBC Bank HQ',
      category: 'ოფისი',
      description: 'თიბისი ბანკის სათავო ოფისის 5 სართულის გამწვანება, ბიოფილური დიზაინის პრინციპებით.',
      stats: { plants: '250+', area: '2000 მ²', duration: '5 თვე' },
    },
    {
      title: 'Stamba Hotel',
      category: 'სასტუმრო',
      description: 'ტრანსფორმაციული პროექტი — ინდუსტრიული სივრცის გარდაქმნა ტროპიკულ ბოტანიკურ ბაღად.',
      stats: { plants: '180+', area: '1200 მ²', duration: '4 თვე' },
    },
    {
      title: 'საჩხერის ვილა',
      category: 'კერძო',
      description: 'ექსკლუზიური კერძო რეზიდენციის ბაღი ქართული და მედიტერანული მცენარეების კომბინაციით.',
      stats: { plants: '90+', area: '500 მ²', duration: '2 თვე' },
    },
  ];
}
