import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactInfo = [
    { icon: 'location', label: 'მისამართი', value: 'თბილისი, ვაჟა-ფშაველას გამზ. 71' },
    { icon: 'phone', label: 'ტელეფონი', value: '+995 599 123 456' },
    { icon: 'email', label: 'ელ-ფოსტა', value: 'info@pteris.ge' },
    { icon: 'hours', label: 'სამუშაო საათები', value: 'ორშ-შაბ: 10:00 - 19:00' },
  ];
}
