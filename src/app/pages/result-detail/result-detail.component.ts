import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';
import { PROJECTS_DATA, ProjectItem } from '../results/results-page.component';
import { PublicContentService, PublicResult } from '../../services/public-content.service';

export interface ProjectDetail extends ProjectItem {
    heroSubtitle: string;
    client: string;
    location: string;
    year: string;
    challenge: string;
    solution: string;
    result: string;
    gallery: { gradient: string; label: string }[];
    testimonial?: {
        text: string;
        author: string;
        role: string;
    };
}

const PROJECT_DETAILS: Record<string, Omit<ProjectDetail, keyof ProjectItem>> = {
    'radisson-blu-iveria': {
        heroSubtitle:
            'ლობის და რესტორნის სრული გამწვანება — მინიმალისტური დიზაინით შექმნილი მწვანე ოაზისი.',
        client: 'Radisson Blu Iveria',
        location: 'თბილისი, ვარდების მოედანი',
        year: '2023',
        challenge:
            'სასტუმროს ლობი და რესტორანი მოითხოვდა სრული გამწვანების კონცეფციას, რომელიც შეთავსებადი იქნებოდა თანამედროვე მინიმალისტურ ინტერიერთან და ხელს შეუწყობდა სტუმრების კომფორტს.',
        solution:
            'შევარჩიეთ 120-ზე მეტი მცენარე ტროპიკული და სუბტროპიკული ოჯახებიდან. შევქმენით ვერტიკალური ბაღები ლობის ცენტრალურ ზონაში და ბიოფილური კუთხეები რესტორანში. ინსტალაცია მოიცავდა ავტომატურ მორწყვის სისტემას და LED განათებას მცენარეთა ზრდისთვის.',
        result:
            'სტუმრების კმაყოფილების ინდექსი გაიზარდა 23%-ით. რესტორანმა მიიღო საერთაშორისო აღიარება ბიოფილური დიზაინისთვის. მცენარეების 95% წარმატებით ადაპტირდა ახალ გარემოში.',
        gallery: [
            { gradient: 'linear-gradient(160deg, #8B8B8B, #C4C4C4)', label: 'ლობი — მანამდე' },
            { gradient: 'linear-gradient(160deg, #1B4332, #52B788)', label: 'ლობი — შემდეგ' },
            { gradient: 'linear-gradient(160deg, #A0A0A0, #D0D0D0)', label: 'რესტორანი — მანამდე' },
            { gradient: 'linear-gradient(160deg, #2D6A4F, #95D5B2)', label: 'რესტორანი — შემდეგ' },
        ],
        testimonial: {
            text: 'Pteris-მა სრულიად ტრანსფორმაცია მოახდინა ჩვენს სივრცეზე. სტუმრები აღფრთოვანებულები არიან მწვანე ელემენტებით.',
            author: 'ნინო კაპანაძე',
            role: 'გენერალური მენეჯერი, Radisson Blu',
        },
    },
    'tbc-bank-hq': {
        heroSubtitle:
            'თიბისი ბანკის სათავო ოფისის 5 სართულის ბიოფილური გამწვანება.',
        client: 'TBC Bank',
        location: 'თბილისი, მარჯანიშვილი',
        year: '2024',
        challenge:
            '2000 კვ.მ-ზე მეტი ოფისის სივრცე მოითხოვდა ბიოფილურ დიზაინს, რომელიც გაზრდიდა თანამშრომლების კომფორტს და პროდუქტიულობას, ამავდროულად შეინარჩუნებდა კორპორატიულ იმიჯს.',
        solution:
            '250-ზე მეტი მცენარე განვათავსეთ 5 სართულზე. შევქმენით მწვანე კედლები სხვადასხვა სართულის საერთო სივრცეებში, ინდივიდუალური desktop მცენარეები თანამშრომლებისთვის და დიდი ზომის ფიკუსების ალეა ცენტრალურ ატრიუმში.',
        result:
            'თანამშრომლების კმაყოფილების გამოკითხვაში სამუშაო გარემოს შეფასება გაიზარდა 31%-ით. ჰაერის ხარისხის მაჩვენებლები 40%-ით გაუმჯობესდა. პროექტმა მიიღო Green Office სერტიფიკაცია.',
        gallery: [
            { gradient: 'linear-gradient(160deg, #9E9E9E, #D5D5D5)', label: 'ატრიუმი — მანამდე' },
            { gradient: 'linear-gradient(160deg, #2D6A4F, #52B788)', label: 'ატრიუმი — შემდეგ' },
            { gradient: 'linear-gradient(160deg, #B0B0B0, #DEDEDE)', label: 'ოფისი — მანამდე' },
            { gradient: 'linear-gradient(160deg, #1B4332, #95D5B2)', label: 'ოფისი — შემდეგ' },
        ],
        testimonial: {
            text: 'ბიოფილურმა დიზაინმა რეალურად შეცვალა ჩვენი სამუშაო გარემო. თანამშრომლები გაცილებით ენერგიულები და კმაყოფილები არიან.',
            author: 'გიორგი თავართქილაძე',
            role: 'ოფის მენეჯერი, TBC Bank',
        },
    },
    'stamba-hotel': {
        heroSubtitle:
            'ინდუსტრიული სივრცის ტრანსფორმაცია ტროპიკულ ბოტანიკურ ბაღად.',
        client: 'Stamba Hotel',
        location: 'თბილისი, ჭოველიძის ქუჩა',
        year: '2023',
        challenge:
            'ყოფილი საგამომცემლო სახლის ინდუსტრიული არქიტექტურა მოითხოვდა ხასიათიან ბოტანიკურ ელემენტებს, რომლებიც შეხამდებოდა ლოფტის სტილთან.',
        solution:
            '180-ზე მეტი მცენარე — მათ შორის დიდი ზომის პალმები, ტროპიკული ფერნები და კაქტუსების კოლექცია. შევქმენით ცენტრალური ატრიუმის მწვანე ინსტალაცია და რესტორნის ტერასის ბოტანიკური ბაღი.',
        result:
            'პროექტმა საერთაშორისო მედიის ყურადღება მიიპყრო. Stamba Hotel-ი დასახელდა ერთ-ერთ საუკეთესო ბიოფილურ სასტუმროდ აღმოსავლეთ ევროპაში. ტურისტული ნაკადი 18%-ით გაიზარდა.',
        gallery: [
            { gradient: 'linear-gradient(160deg, #7A7A7A, #BFBFBF)', label: 'ატრიუმი — მანამდე' },
            { gradient: 'linear-gradient(160deg, #C9A96E, #2D6A4F)', label: 'ატრიუმი — შემდეგ' },
            { gradient: 'linear-gradient(160deg, #8A8A8A, #C8C8C8)', label: 'ტერასა — მანამდე' },
            { gradient: 'linear-gradient(160deg, #52B788, #1B4332)', label: 'ტერასა — შემდეგ' },
        ],
    },
    'sachkhere-villa': {
        heroSubtitle:
            'ექსკლუზიური კერძო რეზიდენციის ბაღი ქართული და მედიტერანული მცენარეების კომბინაციით.',
        client: 'კერძო კლიენტი',
        location: 'საჩხერე, იმერეთი',
        year: '2024',
        challenge:
            'კერძო ვილის ეზოს 500 კვ.მ-იან ტერიტორიაზე საჭირო იყო ბაღის შექმნა, რომელიც გააერთიანებდა ქართულ ტრადიციულ მებაღეობას თანამედროვე ლანდშაფტის დიზაინთან.',
        solution:
            '90-ზე მეტი მცენარე — ვარდების ბაღი, ლავანდის ბილიკები, ხეხილის ზონა და მედიტერანული სანელებლების ბაღი. დავამონტაჟეთ ავტომატური მორწყვის სისტემა და ღამის განათება.',
        result:
            'ოჯახი სრულად კმაყოფილია შედეგით. ბაღი გახდა სოფლის ერთ-ერთი მთავარი სანახაობა. ლოკალურმა მედიამ გააშუქა პროექტი როგორც თანამედროვე ქართული ლანდშაფტის დიზაინის საუკეთესო მაგალითი.',
        gallery: [
            { gradient: 'linear-gradient(160deg, #A0937D, #D4C9B8)', label: 'ეზო — მანამდე' },
            { gradient: 'linear-gradient(160deg, #1A1A2E, #52B788)', label: 'ეზო — შემდეგ' },
            { gradient: 'linear-gradient(160deg, #8C8070, #C4B8A8)', label: 'ბაღი — მანამდე' },
            { gradient: 'linear-gradient(160deg, #2D6A4F, #C9A96E)', label: 'ბაღი — შემდეგ' },
        ],
        testimonial: {
            text: 'ჩვენი ბაღი ჩვენი ოჯახის სიამაყეა. Pteris-მა ოცნება ახდინა — ქართული და ევროპული ყვავილების ჰარმონია.',
            author: 'ლ. ხარატიშვილი',
            role: 'სახლის მფლობელი',
        },
    },
    'axis-towers': {
        heroSubtitle:
            'თანამედროვე კომერციული ცენტრის ინტერიერისა და ტერასების ვერტიკალური ბაღები.',
        client: 'Axis Towers',
        location: 'თბილისი, ჭავჭავაძის გამზირი',
        year: '2024',
        challenge:
            'მრავალფუნქციური კომერციული ცენტრი მოითხოვდა ინოვაციურ მწვანე გადაწყვეტილებებს, რომლებიც ფუნქციონალურიც იქნებოდა და ესთეტიკურიც.',
        solution:
            '200-ზე მეტი მცენარე ვერტიკალური ბაღების, ტერასების და საერთო სივრცეების გამწვანებისთვის. მოდულური მწვანე კედლები, რომლებიც ჰაერის ხარისხს ამაღლებს.',
        result:
            'კომერციული ფართების გაქირავების მაჩვენებელი 12%-ით გაიზარდა. მოიჯარეები აღნიშნავენ გაუმჯობესებულ სამუშაო ატმოსფეროს.',
        gallery: [
            { gradient: 'linear-gradient(160deg, #8C8C8C, #CCCCCC)', label: 'ფოიე — მანამდე' },
            { gradient: 'linear-gradient(160deg, #2D6A4F, #52B788)', label: 'ფოიე — შემდეგ' },
            { gradient: 'linear-gradient(160deg, #999999, #D9D9D9)', label: 'ტერასა — მანამდე' },
            { gradient: 'linear-gradient(160deg, #1B4332, #95D5B2)', label: 'ტერასა — შემდეგ' },
        ],
    },
    'biltmore-hotel': {
        heroSubtitle:
            'ისტორიული სასტუმროს ინტერიერების გამწვანება კლასიკური ევროპული სტილით.',
        client: 'The Biltmore Hotel',
        location: 'თბილისი, რუსთაველის გამზირი',
        year: '2023',
        challenge:
            'ისტორიული შენობის კლასიკური ინტერიერი მოითხოვდა ელეგანტურ მწვანე ელემენტებს, რომლებიც არ დაარღვევდნენ არქიტექტურულ სტილს.',
        solution:
            '150-ზე მეტი მცენარე — კლასიკური ევროპული სტილის ქოთნებში. ბუქსუსის ტოპიარები, ორქიდეების კოლექცია, ვინტაჟური ტერაკოტის ქოთნებში ფერნები და კლასიკური პალმები.',
        result:
            'სასტუმრომ შეინარჩუნა ისტორიული ხიბლი და დაამატა ბოტანიკური სილამაზე. საერთაშორისო TripAdvisor-ის შეფასება 4.2-დან 4.7-მდე გაიზარდა.',
        gallery: [
            { gradient: 'linear-gradient(160deg, #9B8F7E, #D1C7B7)', label: 'ლობი — მანამდე' },
            { gradient: 'linear-gradient(160deg, #1B4332, #C9A96E)', label: 'ლობი — შემდეგ' },
            { gradient: 'linear-gradient(160deg, #A59888, #CBBFB2)', label: 'ბალკონი — მანამდე' },
            { gradient: 'linear-gradient(160deg, #2D6A4F, #C9A96E)', label: 'ბალკონი — შემდეგ' },
        ],
        testimonial: {
            text: 'Pteris-მა შეძლო კლასიკურ არქიტექტურაში ბუნებრივი ელემენტების ჰარმონიული ინტეგრაცია. შედეგი განსაცვიფრებელია.',
            author: 'დავით მჭედლიშვილი',
            role: 'გენერალური მენეჯერი, Biltmore Hotel',
        },
    },
};

@Component({
    selector: 'app-result-detail',
    standalone: true,
    imports: [CommonModule, PageHeroComponent],
    templateUrl: './result-detail.component.html',
    styleUrl: './result-detail.component.scss',
})
export class ResultDetailComponent implements OnInit {
    private readonly contentApi = inject(PublicContentService);
    detail: PublicResult | null = null;
    sliderPosition = 50;
    loading = signal(true);
    error = signal<string | null>(null);

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.loading.set(true);
            this.error.set(null);
            this.contentApi.getResult(params['slug']).subscribe({
                next: (result) => {
                    this.detail = result;
                    this.sliderPosition = 50;
                    this.loading.set(false);
                },
                error: () => {
                    this.error.set('შედეგი ვერ მოიძებნა');
                    this.loading.set(false);
                },
            });
        });
    }

    onSliderMove(event: MouseEvent | TouchEvent, el: HTMLElement): void {
        const rect = el.getBoundingClientRect();
        const clientX =
            event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        this.sliderPosition = (x / rect.width) * 100;
    }

    imageBackground(url: string, fallback: string): string {
        return url ? `center / cover no-repeat url("${url}")` : fallback;
    }
}
