import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://pteris2-app-4dgcp.ondigitalocean.app/api';

export interface NamedDescription {
  name: string;
  description: string;
}

export interface PublicProduct {
  _id: string;
  name: string;
  price: number;
  volume?: string;
  characteristics: string[];
  instructions: NamedDescription[];
  composition: string[];
  tips: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PublicLesson {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  steps: NamedDescription[];
  videos: string[];
  advices: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PublicCoworker {
  _id: string;
  name: string;
  image?: string;
  description: string;
  position: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface PublicResult {
  _id: string;
  category: string;
  client: string;
  location: string;
  year: number;
  plantsCount: string;
  area: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PublicPartner {
  _id: string;
  name: string;
  category: string;
  description: string;
  projectCount: number;
  partnershipYear: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class PublicContentService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<PublicProduct[]> {
    return this.http.get<PublicProduct[]>(`${API_URL}/products`);
  }

  getProduct(id: string): Observable<PublicProduct> {
    return this.http.get<PublicProduct>(`${API_URL}/products/${id}`);
  }

  getLessons(): Observable<PublicLesson[]> {
    return this.http.get<PublicLesson[]>(`${API_URL}/lessons`);
  }

  getLesson(id: string): Observable<PublicLesson> {
    return this.http.get<PublicLesson>(`${API_URL}/lessons/${id}`);
  }

  getCoworkers(): Observable<PublicCoworker[]> {
    return this.http.get<PublicCoworker[]>(`${API_URL}/coworkers`);
  }

  submitMessage(payload: ContactMessagePayload): Observable<unknown> {
    return this.http.post(`${API_URL}/messages`, payload);
  }

  getResults(): Observable<PublicResult[]> {
    return this.http.get<PublicResult[]>(`${API_URL}/results`);
  }

  getResult(id: string): Observable<PublicResult> {
    return this.http.get<PublicResult>(`${API_URL}/results/${id}`);
  }

  getPartners(): Observable<PublicPartner[]> {
    return this.http.get<PublicPartner[]>(`${API_URL}/partners`);
  }
}