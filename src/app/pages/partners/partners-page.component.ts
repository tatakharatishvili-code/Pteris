import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';

export interface Partner {
    name: string;
    type: string;
    category: 'hotel' | 'finance' | 'retail' | 'private' | 'restaurant';
    description: string;
    projects: string;
    since: string;
}

@Component({
    selector: 'app-partners-page',
    standalone: true,
    imports: [CommonModule, PageHeroComponent],
    templateUrl: './partners-page.component.html',
    styleUrl: './partners-page.component.scss',
})
export class PartnersPageComponent {
    activeFilter: string = 'all';

    categories = [
        { key: 'all', label: 'ყველა' },
        { key: 'hotel', label: 'სასტუმროები' },
        { key: 'finance', label: 'ფინანსები' },
        { key: 'retail', label: 'სავაჭრო' },
        { key: 'restaurant', label: 'რესტორნები' },
        { key: 'private', label: 'კერძო' },
    ];

    partners: Partner[] = [
        {
            name: 'Radisson Blu Iveria',
            type: 'სასტუმრო',
            category: 'hotel',
            description:
                'ლობის და რესტორნის სრული გამწვანება 120+ მცენარით. მუდმივი მოვლის სერვისი.',
            projects: '3 პროექტი',
            since: '2019',
        },
        {
            name: 'TBC Bank',
            type: 'ფინანსები',
            category: 'finance',
            description:
                'სათავო ოფისის 5 სართულის ბიოფილური გამწვანება. Green Office სერტიფიკაცია.',
            projects: '5 პროექტი',
            since: '2020',
        },
        {
            name: 'Stamba Hotel',
            type: 'სასტუმრო',
            category: 'hotel',
            description:
                'ინდუსტრიული სივრცის ტრანსფორმაცია ტროპიკულ ბოტანიკურ ბაღად.',
            projects: '2 პროექტი',
            since: '2021',
        },
        {
            name: 'Rooms Hotel',
            type: 'სასტუმრო',
            category: 'hotel',
            description:
                'ინტერიერისა და ტერასის მწვანე კონცეფციის შემუშავება და რეალიზაცია.',
            projects: '4 პროექტი',
            since: '2018',
        },
        {
            name: 'BOG',
            type: 'ფინანსები',
            category: 'finance',
            description:
                'საქართველოს ბანკის ფილიალების მწვანე სტანდარტის შემუშავება და დანერგვა.',
            projects: '8 პროექტი',
            since: '2019',
        },
        {
            name: 'Tbilisi Mall',
            type: 'სავაჭრო',
            category: 'retail',
            description:
                'საერთო სივრცეების და ფუდკორტის მწვანე ზონების მოწყობა და მოვლა.',
            projects: '2 პროექტი',
            since: '2021',
        },
        {
            name: 'East Point',
            type: 'სავაჭრო',
            category: 'retail',
            description:
                'ინტერიერის მწვანე ინსტალაციები და სეზონური დეკორაციები.',
            projects: '3 პროექტი',
            since: '2020',
        },
        {
            name: 'Wyndham Grand',
            type: 'სასტუმრო',
            category: 'hotel',
            description:
                'პრემიუმ სასტუმროს ლობის, სპა ზონის და ტერასის სრული გამწვანება.',
            projects: '2 პროექტი',
            since: '2022',
        },
        {
            name: 'Sheraton Grand',
            type: 'სასტუმრო',
            category: 'hotel',
            description:
                'კლასიკური სტილის მწვანე ელემენტები და ვერტიკალური ბაღის ინსტალაცია.',
            projects: '3 პროექტი',
            since: '2019',
        },
        {
            name: 'Hilton Garden Inn',
            type: 'სასტუმრო',
            category: 'hotel',
            description:
                'თანამედროვე მინიმალისტური გამწვანება ლობისა და საკონფერენციო სივრცეების.',
            projects: '2 პროექტი',
            since: '2023',
        },
        {
            name: 'Liberty Bank',
            type: 'ფინანსები',
            category: 'finance',
            description:
                'ცენტრალური ოფისის და ფილიალების სტანდარტიზებული გამწვანება.',
            projects: '6 პროექტი',
            since: '2021',
        },
        {
            name: 'Galleria Tbilisi',
            type: 'სავაჭრო',
            category: 'retail',
            description:
                'პრემიუმ სავაჭრო ცენტრის მწვანე კუთხეები და სეზონური ინსტალაციები.',
            projects: '2 პროექტი',
            since: '2022',
        },
        {
            name: 'Café Littera',
            type: 'რესტორანი',
            category: 'restaurant',
            description:
                'ისტორიულ შენობაში რესტორნის ეზოისა და ინტერიერის ბოტანიკური დიზაინი.',
            projects: '1 პროექტი',
            since: '2023',
        },
        {
            name: 'Barbarestan',
            type: 'რესტორანი',
            category: 'restaurant',
            description:
                'რესტორნის ინტერიერის მწვანე აქცენტები და სანელებლების მინი-ბაღი.',
            projects: '1 პროექტი',
            since: '2022',
        },
        {
            name: 'კერძო რეზიდენციები',
            type: 'კერძო',
            category: 'private',
            description:
                '50-ზე მეტი კერძო სახლისა და ვილის ბაღის დიზაინი და გამწვანება საქართველოს მასშტაბით.',
            projects: '50+ პროექტი',
            since: '2015',
        },
    ];

    testimonials = [
        {
            text: 'Pteris-მა ჩვენი ოფისი სრულიად ტრანსფორმაცია და მწვანე ოაზისად აქცია. თანამშრომლების პროდუქტიულობა 20%-ით გაიზარდა.',
            author: 'ნინო კაპანაძე',
            position: 'HR დირექტორი, TBC Bank',
        },
        {
            text: 'პროფესიონალიზმის უმაღლესი დონე. ყოველთვიური მოვლის სერვისი ზუსტი, პუნქტუალური და ხარისხიანია.',
            author: 'გიორგი მელაძე',
            position: 'გენერალური მენეჯერი, Stamba Hotel',
        },
        {
            text: 'ქორწილის ფლორისტიკა ჩვენს ოცნებაზე ბევრად მეტი აღმოჩნდა. ყოველი დეტალი სრულყოფილი იყო.',
            author: 'მარიამ ჯავახიშვილი',
            position: 'კერძო კლიენტი',
        },
        {
            text: 'Radisson-ის ლობის მწვანე ტრანსფორმაციით სტუმრების კმაყოფილების ინდექსი 23%-ით გავზარდეთ.',
            author: 'ალექსანდრე ბერიძე',
            position: 'ოპერაციების მენეჯერი, Radisson Blu',
        },
    ];

    currentTestimonial = 0;

    get filteredPartners(): Partner[] {
        if (this.activeFilter === 'all') return this.partners;
        return this.partners.filter((p) => p.category === this.activeFilter);
    }

    setFilter(key: string): void {
        this.activeFilter = key;
    }

    nextTestimonial(): void {
        this.currentTestimonial =
            (this.currentTestimonial + 1) % this.testimonials.length;
    }

    prevTestimonial(): void {
        this.currentTestimonial =
            this.currentTestimonial === 0
                ? this.testimonials.length - 1
                : this.currentTestimonial - 1;
    }
}
