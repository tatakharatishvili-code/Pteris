import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  features = [
    {
      icon: 'leaf',
      title: 'ბოტანიკური ექსპერტიზა',
      description: 'ჩვენი გუნდი შედგება გამოცდილი ბოტანიკოსებისა და ლანდშაფტის დიზაინერებისგან, რომლებიც 15 წელზე მეტია მუშაობენ მცენარეთა სამყაროში.',
    },
    {
      icon: 'shield',
      title: 'ხარისხის გარანტია',
      description: 'ყველა მცენარე გადის მრავალსაფეხურიან შემოწმებას. გთავაზობთ ჯანმრთელ, ძლიერ მცენარეებს სრული მოვლის ინსტრუქციებით.',
    },
    {
      icon: 'globe',
      title: 'გლობალური მომწოდებლები',
      description: 'თანამშრომლობთ მსოფლიოს წამყვან სანერგეებთან — ჰოლანდიიდან იაპონიამდე, ეკვადორიდან ტაილანდამდე.',
    },
    {
      icon: 'heart',
      title: 'ინდივიდუალური მიდგომა',
      description: 'ყოველი კლიენტი უნიკალურია. ვქმნით პერსონალიზებულ გადაწყვეტილებებს თქვენი სივრცისა და ცხოვრების წესის გათვალისწინებით.',
    },
  ];
}
