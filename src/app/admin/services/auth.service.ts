import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';

export interface AuthUser {
  _id: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

const BASE_URL = 'https://pteris2-app-4dgcp.ondigitalocean.app';
const ADMIN_USER_STORAGE_KEY = 'admin_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSignal = signal<AuthUser | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly isLoggedIn = computed(() => !!this.userSignal());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.restoreSession();
  }

  login(payload: LoginPayload): Observable<AuthUser> {
    return this.http
      .post<AuthUser>(`${BASE_URL}/api/auth/login`, payload, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          this.userSignal.set(user);
          localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(user));
        }),
        catchError((err) => {
          return throwError(
            () => err.error?.message || 'არასწორი ელფოსტა ან პაროლი'
          );
        })
      );
  }

  logout(): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${BASE_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.userSignal.set(null);
          localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
          this.router.navigate(['/admin']);
        })
      );
  }

  private restoreSession(): void {
    try {
      const stored = localStorage.getItem(ADMIN_USER_STORAGE_KEY);
      if (stored) {
        this.userSignal.set(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
    }
  }
}
