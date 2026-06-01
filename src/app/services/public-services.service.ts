import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://pteris.onrender.com';

export interface PublicServiceItem {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon?: string;
  features: string[];
}

@Injectable({ providedIn: 'root' })
export class PublicServicesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<PublicServiceItem[]> {
    return this.http.get<PublicServiceItem[]>(`${BASE_URL}/api/services`);
  }
}
