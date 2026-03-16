import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-care',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './care.component.html',
  styleUrl: './care.component.scss',
})
export class CareComponent {
  tips = [
    {
      icon: 'water',
      title: 'მორწყვა',
      description: 'მორწყეთ მხოლოდ მაშინ, როცა ნიადაგის ზედა 2-3 სმ გამშრალია. ზედმეტი წყალი მცენარის მტერია.',
      tip: 'გამოიყენეთ ოთახის ტემპერატურის წყალი.',
    },
    {
      icon: 'light',
      title: 'განათება',
      description: 'უმეტესობა ინტერიერის მცენარეებს სჭირდება ნათელი, მაგრამ არაპირდაპირი სინათლე.',
      tip: 'ჩრდილოეთის ფანჯარა — იდეალურია.',
    },
    {
      icon: 'soil',
      title: 'ნიადაგი',
      description: 'გამოიყენეთ კარგად დრენაჟირებული, ნოყიერი ნიადაგი. ყოველ 1-2 წელიწადში გადარგეთ.',
      tip: 'პერლიტი აუმჯობესებს დრენაჟს.',
    },
    {
      icon: 'temp',
      title: 'ტემპერატურა',
      description: 'ოპტიმალური ტემპერატურაა 18-24°C. მოერიდეთ ცივ ჰაერის ნაკადებსა და რადიატორებს.',
      tip: 'ზამთარში მოარიდეთ ფანჯრის მინას.',
    },
    {
      icon: 'humidity',
      title: 'ტენიანობა',
      description: 'ტროპიკულ მცენარეებს სჭირდებათ 50-70% ტენიანობა. გამოიყენეთ ტენის მომწესრიგებელი.',
      tip: 'დაალაგეთ მცენარეები ჯგუფებად.',
    },
    {
      icon: 'fertilize',
      title: 'განოყიერება',
      description: 'გაზაფხულ-ზაფხულში განაყოფიერეთ თვეში ერთხელ. ზამთარში შეწყვიტეთ.',
      tip: 'ორგანული სასუქი უფრო უსაფრთხოა.',
    },
  ];
}
