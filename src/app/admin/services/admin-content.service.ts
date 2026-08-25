import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://pteris-e5dq2.ondigitalocean.app/api';

export interface NamedDescription {
  name: string;
  description: string;
}

export interface AdminProduct {
  _id: string;
  name: string;
  price: number;
  volume?: string;
  characteristics: string[];
  instructions: NamedDescription[];
  composition: string[];
  tips: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type ProductPayload = Omit<AdminProduct, '_id' | 'createdAt' | 'updatedAt'>;

export interface AdminLesson {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  steps: NamedDescription[];
  videos: string[];
  advices: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type LessonPayload = Omit<AdminLesson, '_id' | 'createdAt' | 'updatedAt'>;

export interface AdminCoworker {
  _id: string;
  name: string;
  description: string;
  position: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CoworkerPayload {
  name: string;
  description: string;
  position: string;
  image?: File | null;
}

export interface AdminMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminContentService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(`${API_URL}/products`, { withCredentials: true });
  }

  createProduct(payload: ProductPayload): Observable<AdminProduct> {
    return this.http.post<AdminProduct>(`${API_URL}/products`, payload, { withCredentials: true });
  }

  updateProduct(id: string, payload: ProductPayload): Observable<AdminProduct> {
    return this.http.put<AdminProduct>(`${API_URL}/products/${id}`, payload, { withCredentials: true });
  }

  deleteProduct(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/products/${id}`, { withCredentials: true });
  }

  getLessons(): Observable<AdminLesson[]> {
    return this.http.get<AdminLesson[]>(`${API_URL}/lessons`, { withCredentials: true });
  }

  createLesson(payload: LessonPayload): Observable<AdminLesson> {
    return this.http.post<AdminLesson>(`${API_URL}/lessons`, payload, { withCredentials: true });
  }

  updateLesson(id: string, payload: LessonPayload): Observable<AdminLesson> {
    return this.http.put<AdminLesson>(`${API_URL}/lessons/${id}`, payload, { withCredentials: true });
  }

  deleteLesson(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/lessons/${id}`, { withCredentials: true });
  }

  getCoworkers(): Observable<AdminCoworker[]> {
    return this.http.get<AdminCoworker[]>(`${API_URL}/coworkers`, { withCredentials: true });
  }

  createCoworker(payload: CoworkerPayload): Observable<AdminCoworker> {
    return this.http.post<AdminCoworker>(`${API_URL}/coworkers`, this.toCoworkerFormData(payload), { withCredentials: true });
  }

  updateCoworker(id: string, payload: CoworkerPayload): Observable<AdminCoworker> {
    return this.http.put<AdminCoworker>(`${API_URL}/coworkers/${id}`, this.toCoworkerFormData(payload), { withCredentials: true });
  }

  deleteCoworker(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/coworkers/${id}`, { withCredentials: true });
  }

  getMessages(): Observable<AdminMessage[]> {
    return this.http.get<AdminMessage[]>(`${API_URL}/messages`, { withCredentials: true });
  }

  updateMessage(id: string, payload: Omit<AdminMessage, '_id' | 'createdAt' | 'updatedAt'>): Observable<AdminMessage> {
    return this.http.put<AdminMessage>(`${API_URL}/messages/${id}`, payload, { withCredentials: true });
  }

  deleteMessage(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/messages/${id}`, { withCredentials: true });
  }

  private toCoworkerFormData(payload: CoworkerPayload): FormData {
    const formData = new FormData();
    formData.append('name', payload.name.trim());
    formData.append('description', payload.description.trim());
    formData.append('position', payload.position.trim());
    if (payload.image) formData.append('image', payload.image);
    return formData;
  }
}