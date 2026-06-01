import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://pteris.onrender.com';

export interface AdminResultEntity {
  _id: string;
  category: string;
  client: string;
  location: string;
  year: number;
  plantsCount: string;
  area: string;
  duration: string;
  beforeImage?: string;
  afterImage?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpsertResultPayload {
  category?: string;
  client?: string;
  location?: string;
  year?: number;
  plantsCount?: string;
  area?: string;
  duration?: string;
  beforeImageFile?: File | null;
  afterImageFile?: File | null;
  imageFiles?: File[];
}

@Injectable({ providedIn: 'root' })
export class AdminResultsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<AdminResultEntity[]> {
    return this.http.get<AdminResultEntity[]>(`${BASE_URL}/api/results`, {
      withCredentials: true,
    });
  }

  getById(id: string): Observable<AdminResultEntity> {
    return this.http.get<AdminResultEntity>(`${BASE_URL}/api/results/${id}`, {
      withCredentials: true,
    });
  }

  create(payload: UpsertResultPayload): Observable<AdminResultEntity> {
    return this.http.post<AdminResultEntity>(
      `${BASE_URL}/api/results`,
      this.toFormData(payload),
      { withCredentials: true }
    );
  }

  update(id: string, payload: UpsertResultPayload): Observable<AdminResultEntity> {
    return this.http.put<AdminResultEntity>(
      `${BASE_URL}/api/results/${id}`,
      this.toFormData(payload),
      { withCredentials: true }
    );
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${BASE_URL}/api/results/${id}`, {
      withCredentials: true,
    });
  }

  private toFormData(payload: UpsertResultPayload): FormData {
    const fd = new FormData();

    if (payload.category !== undefined) fd.append('category', payload.category.trim());
    if (payload.client !== undefined) fd.append('client', payload.client.trim());
    if (payload.location !== undefined) fd.append('location', payload.location.trim());
    if (payload.year !== undefined) fd.append('year', String(payload.year));
    if (payload.plantsCount !== undefined) fd.append('plantsCount', payload.plantsCount.trim());
    if (payload.area !== undefined) fd.append('area', payload.area.trim());
    if (payload.duration !== undefined) fd.append('duration', payload.duration.trim());
    if (payload.beforeImageFile) fd.append('beforeImage', payload.beforeImageFile);
    if (payload.afterImageFile) fd.append('afterImage', payload.afterImageFile);
    if (payload.imageFiles?.length) {
      payload.imageFiles.forEach((f) => fd.append('images', f));
    }

    return fd;
  }
}
