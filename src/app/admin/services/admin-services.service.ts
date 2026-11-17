import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://pteris2-app-4dgcp.ondigitalocean.app';

export interface AdminServiceEntity {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon?: string;
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpsertServicePayload {
  name?: string;
  shortDescription?: string;
  longDescription?: string;
  features?: string[];
  iconFile?: File | null;
}

@Injectable({ providedIn: 'root' })
export class AdminServicesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<AdminServiceEntity[]> {
    return this.http.get<AdminServiceEntity[]>(`${BASE_URL}/api/services`, {
      withCredentials: true,
    });
  }

  getById(id: string): Observable<AdminServiceEntity> {
    return this.http.get<AdminServiceEntity>(`${BASE_URL}/api/services/${id}`, {
      withCredentials: true,
    });
  }

  create(payload: UpsertServicePayload): Observable<AdminServiceEntity> {
    return this.http.post<AdminServiceEntity>(
      `${BASE_URL}/api/services`,
      this.toFormData(payload),
      { withCredentials: true }
    );
  }

  update(id: string, payload: UpsertServicePayload): Observable<AdminServiceEntity> {
    return this.http.put<AdminServiceEntity>(
      `${BASE_URL}/api/services/${id}`,
      this.toFormData(payload),
      { withCredentials: true }
    );
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${BASE_URL}/api/services/${id}`, {
      withCredentials: true,
    });
  }

  private toFormData(payload: UpsertServicePayload): FormData {
    const formData = new FormData();

    if (payload.name !== undefined) {
      formData.append('name', payload.name.trim());
    }

    if (payload.shortDescription !== undefined) {
      formData.append('shortDescription', payload.shortDescription.trim());
    }

    if (payload.longDescription !== undefined) {
      formData.append('longDescription', payload.longDescription.trim());
    }

    if (payload.features !== undefined) {
      formData.append('features', JSON.stringify(payload.features));
    }

    if (payload.iconFile) {
      formData.append('icon', payload.iconFile);
    }

    return formData;
  }
}
