import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';
import { PublicContentService } from '../../services/public-content.service';

export interface ProductItem {
    slug: string;
    name: string;
    category: string;
    price: string;
    volume: string;
    description: string;
    badge?: string;
    gradient: string;
}

export const PRODUCTS_DATA: ProductItem[] = [
    // ── სასუქები ──
    {
        slug: 'universal-fertilizer',
        name: 'უნივერსალური სასუქი',
        category: 'fertilizer',
        price: '18 ₾',
        volume: '500 მლ',
        description:
            'ყველა ტიპის მცენარისთვის შესაფერისი თხევადი სასუქი. ბალანსირებული NPK ფორმულა აქტიური ზრდისთვის.',
        badge: 'ბესტსელერი',
        gradient: 'linear-gradient(135deg, #2D6A4F, #52B788)',
    },
    {
        slug: 'orchid-fertilizer',
        name: 'ორქიდეის სასუქი',
        category: 'fertilizer',
        price: '22 ₾',
        volume: '300 მლ',
        description:
            'სპეციალურად ორქიდეებისთვის შექმნილი სასუქი. ხელს უწყობს ხანგრძლივ ყვავილობას და ძლიერ ფესვთა სისტემას.',
        gradient: 'linear-gradient(135deg, #C9A96E, #E8D5A3)',
    },
    {
        slug: 'cactus-succulent-fertilizer',
        name: 'კაქტუსის & სუკულენტის სასუქი',
        category: 'fertilizer',
        price: '16 ₾',
        volume: '300 მლ',
        description:
            'დაბალი აზოტის შემცველობით, სპეციალურად სუკულენტებისა და კაქტუსებისთვის. თავიდან იცილებთ გადაზრდას.',
        gradient: 'linear-gradient(135deg, #95D5B2, #D8F3DC)',
    },
    {
        slug: 'blooming-fertilizer',
        name: 'მაყვავილებელი სასუქი',
        category: 'fertilizer',
        price: '20 ₾',
        volume: '500 მლ',
        description:
            'მაღალი ფოსფორის შემცველობა ყვავილოვანი მცენარეებისთვის. გაზრდილი ყვავილობის ინტენსივობა და ხანგრძლივობა.',
        badge: 'ახალი',
        gradient: 'linear-gradient(135deg, #52B788, #C9A96E)',
    },
    {
        slug: 'leaf-shine-spray',
        name: 'ფოთლის ბზინვარე სპრეი',
        category: 'fertilizer',
        price: '14 ₾',
        volume: '250 მლ',
        description:
            'ფოთლების გაწმენდა და გაპრიალება ერთი სპრეით. ბუნებრივი ცვილის ბაზაზე, ფოთლებს სუნთქვის საშუალებას აძლევს.',
        gradient: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
    },
    {
        slug: 'root-stimulator',
        name: 'ფესვის სტიმულატორი',
        category: 'fertilizer',
        price: '25 ₾',
        volume: '250 მლ',
        description:
            'გადანერგვისთანავე გამოსაყენებელი ფესვის სტიმულატორი. აჩქარებს ადაპტაციას და ამცირებს სტრესს.',
        gradient: 'linear-gradient(135deg, #2D6A4F, #95D5B2)',
    },

    // ── ნიადაგი ──
    {
        slug: 'universal-soil',
        name: 'უნივერსალური ნიადაგი',
        category: 'soil',
        price: '12 ₾',
        volume: '5 ლ',
        description:
            'მაღალი ხარისხის ნიადაგი ინტერიერის მცენარეებისთვის. ოპტიმალური დრენაჟი და საკვები ელემენტები.',
        badge: 'ბესტსელერი',
        gradient: 'linear-gradient(135deg, #5C4033, #8B6C42)',
    },
    {
        slug: 'orchid-substrate',
        name: 'ორქიდეის სუბსტრატი',
        category: 'soil',
        price: '15 ₾',
        volume: '3 ლ',
        description:
            'ფიჭვის ქერქი, სფაგნუმ ხავსი და პერლიტის ნარევი. იდეალური აერაცია ორქიდეის ფესვებისთვის.',
        gradient: 'linear-gradient(135deg, #8B6C42, #C9A96E)',
    },
    {
        slug: 'cactus-soil',
        name: 'კაქტუსის ნიადაგი',
        category: 'soil',
        price: '10 ₾',
        volume: '3 ლ',
        description:
            'მაღალი დრენაჟის ნიადაგი ქვიშის და პერლიტის შემცველობით. სუკულენტებისა და კაქტუსებისთვის.',
        gradient: 'linear-gradient(135deg, #A0937D, #D4C9B8)',
    },
    {
        slug: 'peat-moss',
        name: 'ტორფის ხავსი (პიტმოსი)',
        category: 'soil',
        price: '8 ₾',
        volume: '5 ლ',
        description:
            'ნიადაგის სტრუქტურის გაუმჯობესება, ტენის შენარჩუნება და pH-ის რეგულირებისთვის.',
        gradient: 'linear-gradient(135deg, #3E2723, #6D4C41)',
    },
    {
        slug: 'perlite',
        name: 'პერლიტი',
        category: 'soil',
        price: '7 ₾',
        volume: '3 ლ',
        description:
            'ნიადაგის აერაციისა და დრენაჟის გასაუმჯობესებლად. მსუბუქი, სტერილური მინერალური დანამატი.',
        badge: 'პოპულარული',
        gradient: 'linear-gradient(135deg, #E0E0E0, #F5F5F5)',
    },
    {
        slug: 'vermiculite',
        name: 'ვერმიკულიტი',
        category: 'soil',
        price: '9 ₾',
        volume: '3 ლ',
        description:
            'ტენის და საკვები ელემენტების შენარჩუნება. იდეალურია თესლის გაღივებისა და ახალი ნერგების გასაზრდელად.',
        gradient: 'linear-gradient(135deg, #BDB76B, #D4C9A8)',
    },
];

@Component({
    selector: 'app-products-page',
    standalone: true,
    imports: [CommonModule, RouterLink, PageHeroComponent],
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnInit {
    private readonly contentApi = inject(PublicContentService);
    loading = signal(true);
    error = signal<string | null>(null);

    products: ProductItem[] = [];

    ngOnInit(): void {
        this.contentApi.getProducts().subscribe({
            next: (products) => {
                this.products = products.map((product, index) => ({
                    slug: product._id,
                    name: product.name,
                    category: 'all',
                    price: `${product.price} ₾`,
                    volume: product.volume ?? '',
                    description: product.characteristics?.[0] ?? product.composition?.[0] ?? '',
                    badge: index === 0 ? 'ახალი' : undefined,
                    gradient: this.gradients[index % this.gradients.length],
                }));
                this.loading.set(false);
            },
            error: () => {
                this.error.set('პროდუქტების ჩატვირთვა ვერ მოხერხდა');
                this.loading.set(false);
            },
        });
    }

    get filteredProducts(): ProductItem[] {
        return this.products;
    }

    private readonly gradients = [
        'linear-gradient(135deg, #2D6A4F, #52B788)',
        'linear-gradient(135deg, #C9A96E, #E8D5A3)',
        'linear-gradient(135deg, #1B4332, #95D5B2)',
    ];
}
