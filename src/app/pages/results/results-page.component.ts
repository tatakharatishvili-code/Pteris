import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';

export interface ProjectItem {
    slug: string;
    title: string;
    category: string;
    description: string;
    beforeGradient: string;
    afterGradient: string;
    stats: { plants: string; area: string; duration: string };
}

export const PROJECTS_DATA: ProjectItem[] = [
    {
        slug: 'radisson-blu-iveria',
        title: 'Radisson Blu Iveria',
        category: 'სასტუმრო',
        description:
            'ლობის და რესტორნის სრული გამწვანება 120+ მცენარით. მინიმალისტური დიზაინით შექმნილი მწვანე ოაზისი.',
        beforeGradient: 'linear-gradient(160deg, #8B8B8B, #C4C4C4)',
        afterGradient: 'linear-gradient(160deg, #1B4332, #52B788)',
        stats: { plants: '120+', area: '800 მ²', duration: '3 თვე' },
    },
    {
        slug: 'tbc-bank-hq',
        title: 'TBC Bank HQ',
        category: 'ოფისი',
        description:
            'თიბისი ბანკის სათავო ოფისის 5 სართულის გამწვანება, ბიოფილური დიზაინის პრინციპებით.',
        beforeGradient: 'linear-gradient(160deg, #9E9E9E, #D5D5D5)',
        afterGradient: 'linear-gradient(160deg, #2D6A4F, #95D5B2)',
        stats: { plants: '250+', area: '2000 მ²', duration: '5 თვე' },
    },
    {
        slug: 'stamba-hotel',
        title: 'Stamba Hotel',
        category: 'სასტუმრო',
        description:
            'ტრანსფორმაციული პროექტი — ინდუსტრიული სივრცის გარდაქმნა ტროპიკულ ბოტანიკურ ბაღად.',
        beforeGradient: 'linear-gradient(160deg, #7A7A7A, #BFBFBF)',
        afterGradient: 'linear-gradient(160deg, #C9A96E, #2D6A4F)',
        stats: { plants: '180+', area: '1200 მ²', duration: '4 თვე' },
    },
    {
        slug: 'sachkhere-villa',
        title: 'საჩხერის ვილა',
        category: 'კერძო',
        description:
            'ექსკლუზიური კერძო რეზიდენციის ბაღი ქართული და მედიტერანული მცენარეების კომბინაციით.',
        beforeGradient: 'linear-gradient(160deg, #A0937D, #D4C9B8)',
        afterGradient: 'linear-gradient(160deg, #1A1A2E, #52B788)',
        stats: { plants: '90+', area: '500 მ²', duration: '2 თვე' },
    },
    {
        slug: 'axis-towers',
        title: 'Axis Towers',
        category: 'კომერციული',
        description:
            'თანამედროვე კომერციული ცენტრის ინტერიერისა და ტერასების გამწვანება ვერტიკალური ბაღებით.',
        beforeGradient: 'linear-gradient(160deg, #8C8C8C, #CCCCCC)',
        afterGradient: 'linear-gradient(160deg, #2D6A4F, #52B788)',
        stats: { plants: '200+', area: '1500 მ²', duration: '6 თვე' },
    },
    {
        slug: 'biltmore-hotel',
        title: 'Biltmore Hotel',
        category: 'სასტუმრო',
        description:
            'ისტორიული სასტუმროს ინტერიერების გამწვანება კლასიკური ევროპული სტილის შენარჩუნებით.',
        beforeGradient: 'linear-gradient(160deg, #9B8F7E, #D1C7B7)',
        afterGradient: 'linear-gradient(160deg, #1B4332, #C9A96E)',
        stats: { plants: '150+', area: '1000 მ²', duration: '4 თვე' },
    },
];

@Component({
    selector: 'app-results-page',
    standalone: true,
    imports: [CommonModule, RouterLink, PageHeroComponent],
    templateUrl: './results-page.component.html',
    styleUrl: './results-page.component.scss',
})
export class ResultsPageComponent {
    projects = PROJECTS_DATA;
    sliderPositions: Record<string, number> = {};

    getSliderPosition(slug: string): number {
        return this.sliderPositions[slug] ?? 50;
    }

    onSliderMove(event: MouseEvent | TouchEvent, slug: string, el: HTMLElement): void {
        const rect = el.getBoundingClientRect();
        const clientX =
            event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        this.sliderPositions[slug] = (x / rect.width) * 100;
    }
}
