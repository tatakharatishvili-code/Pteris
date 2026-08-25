import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';
import { PublicContentService } from '../../services/public-content.service';

export interface CareGuide {
    slug: string;
    title: string;
    category: string;
    difficulty: string;
    readTime: string;
    description: string;
    icon: string;
    gradient: string;
}

export const CARE_GUIDES_DATA: CareGuide[] = [
    // ── მორწყვა ──
    {
        slug: 'watering-basics',
        title: 'მორწყვის საფუძვლები',
        category: 'watering',
        difficulty: 'დამწყები',
        readTime: '5 წთ',
        description: 'როგორ მორწყოთ ინტერიერის მცენარეები სწორად — სიხშირე, წყლის რაოდენობა და საუკეთესო მეთოდები.',
        icon: '💧',
        gradient: 'linear-gradient(135deg, #2196F3, #64B5F6)',
    },
    {
        slug: 'overwatering-signs',
        title: 'გადაჭარბებული მორწყვის ნიშნები',
        category: 'watering',
        difficulty: 'დამწყები',
        readTime: '4 წთ',
        description: 'როგორ ამოვიცნოთ გადამორწყვის სიმპტომები და როგორ გადავარჩინოთ დაზიანებული მცენარე.',
        icon: '⚠️',
        gradient: 'linear-gradient(135deg, #FF9800, #FFB74D)',
    },

    // ── განათება ──
    {
        slug: 'light-guide',
        title: 'განათების გზამკვლევი',
        category: 'light',
        difficulty: 'დამწყები',
        readTime: '6 წთ',
        description: 'სინათლის ტიპები, მცენარეების განთავსება ფანჯრებთან მიმართებით და ხელოვნური განათების არჩევა.',
        icon: '☀️',
        gradient: 'linear-gradient(135deg, #FFC107, #FFE082)',
    },
    {
        slug: 'low-light-plants',
        title: 'ნაკლებ სინათლეზე მცენარეები',
        category: 'light',
        difficulty: 'დამწყები',
        readTime: '5 წთ',
        description: 'საუკეთესო მცენარეები ბნელი ოთახებისთვის — სახეობები, რომლებიც ნაკლებ სინათლეს მოითმენენ.',
        icon: '🌿',
        gradient: 'linear-gradient(135deg, #4CAF50, #81C784)',
    },

    // ── ნიადაგი & გადანერგვა ──
    {
        slug: 'repotting-guide',
        title: 'გადანერგვის სრული გაიდი',
        category: 'soil',
        difficulty: 'საშუალო',
        readTime: '8 წთ',
        description: 'როდის და როგორ გადანერგოთ მცენარე — ნიშნები, ქოთნის არჩევა, ნიადაგის მომზადება და ეტაპები.',
        icon: '🪴',
        gradient: 'linear-gradient(135deg, #8D6E63, #A1887F)',
    },
    {
        slug: 'soil-mixing',
        title: 'ნიადაგის ნარევების მომზადება',
        category: 'soil',
        difficulty: 'საშუალო',
        readTime: '7 წთ',
        description: 'სხვადასხვა მცენარისთვის იდეალური ნიადაგის ნარევის მომზადება სახლის პირობებში.',
        icon: '🌱',
        gradient: 'linear-gradient(135deg, #5D4037, #795548)',
    },

    // ── დაავადებები & მავნებლები ──
    {
        slug: 'common-pests',
        title: 'ხშირი მავნებლები',
        category: 'health',
        difficulty: 'საშუალო',
        readTime: '7 წთ',
        description: 'ფარიანა, ტკიპა, ბუგრი და სხვა მავნებლების ამოცნობა და ბრძოლის ბუნებრივი მეთოდები.',
        icon: '🐛',
        gradient: 'linear-gradient(135deg, #F44336, #E57373)',
    },
    {
        slug: 'yellow-leaves',
        title: 'ყვითელი ფოთლები — მიზეზები',
        category: 'health',
        difficulty: 'დამწყები',
        readTime: '5 წთ',
        description: 'რატომ ყვითლდება ფოთლები და რას ნიშნავს თითოეული ტიპის გაყვითლება — დიაგნოსტიკის გზამკვლევი.',
        icon: '🍂',
        gradient: 'linear-gradient(135deg, #FF9800, #FFCC80)',
    },

    // ── სეზონური მოვლა ──
    {
        slug: 'winter-care',
        title: 'ზამთრის მოვლა',
        category: 'seasonal',
        difficulty: 'დამწყები',
        readTime: '6 წთ',
        description: 'როგორ მოვუაროთ მცენარეებს ზამთარში — მორწყვის შემცირება, განათება და ტემპერატურის კონტროლი.',
        icon: '❄️',
        gradient: 'linear-gradient(135deg, #90CAF9, #BBDEFB)',
    },
    {
        slug: 'spring-awakening',
        title: 'გაზაფხულის გამოფხიზლება',
        category: 'seasonal',
        difficulty: 'საშუალო',
        readTime: '7 წთ',
        description: 'გაზაფხულზე მცენარეების გააქტიურება — გასხვლა, განოყიერება, გადანერგვა და ახალი ზრდის სტიმულაცია.',
        icon: '🌸',
        gradient: 'linear-gradient(135deg, #E91E63, #F48FB1)',
    },

    // ── სპეციალური მოვლა ──
    {
        slug: 'orchid-care',
        title: 'ორქიდეის მოვლა',
        category: 'special',
        difficulty: 'მოწინავე',
        readTime: '10 წთ',
        description: 'ორქიდეის სრული მოვლის გაიდი — მორწყვა, განათება, ყვავილობის სტიმულაცია და გადანერგვა.',
        icon: '🌺',
        gradient: 'linear-gradient(135deg, #9C27B0, #CE93D8)',
    },
    {
        slug: 'succulent-care',
        title: 'სუკულენტების მოვლა',
        category: 'special',
        difficulty: 'დამწყები',
        readTime: '5 წთ',
        description: 'სუკულენტებისა და კაქტუსების მოვლის გზამკვლევი — ნაკლები ყურადღება, მეტი სილამაზე.',
        icon: '🌵',
        gradient: 'linear-gradient(135deg, #66BB6A, #A5D6A7)',
    },
];

@Component({
    selector: 'app-care-page',
    standalone: true,
    imports: [CommonModule, RouterLink, PageHeroComponent],
    templateUrl: './care-page.component.html',
    styleUrl: './care-page.component.scss',
})
export class CarePageComponent implements OnInit {
    private readonly contentApi = inject(PublicContentService);
    loading = signal(true);
    error = signal<string | null>(null);

    guides: CareGuide[] = [];

    ngOnInit(): void {
        this.contentApi.getLessons().subscribe({
            next: (lessons) => {
                this.guides = lessons.map((lesson, index) => ({
                    slug: lesson._id,
                    title: lesson.name,
                    category: 'all',
                    difficulty: 'გზამკვლევი',
                    readTime: `${Math.max(3, lesson.steps.length * 2)} წთ`,
                    description: lesson.shortDescription,
                    icon: ['✦', '◉', '◇'][index % 3],
                    gradient: this.gradients[index % this.gradients.length],
                }));
                this.loading.set(false);
            },
            error: () => {
                this.error.set('გაკვეთილების ჩატვირთვა ვერ მოხერხდა');
                this.loading.set(false);
            },
        });
    }

    get filteredGuides(): CareGuide[] {
        return this.guides;
    }

    private readonly gradients = [
        'linear-gradient(135deg, #1B4332, #52B788)',
        'linear-gradient(135deg, #C9A96E, #95D5B2)',
        'linear-gradient(135deg, #2D6A4F, #D8F3DC)',
    ];
}
