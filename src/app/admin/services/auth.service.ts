import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, map } from 'rxjs';

export interface AuthUser {
  _id: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user?: AuthUser;
  token?: string;
  accessToken?: string;
  data?: {
    token?: string;
    accessToken?: string;
  };
  _id?: string;
  email?: string;
  isAdmin?: boolean;
}

const BASE_URL = 'https://pteris.onrender.com';
const ADMIN_USER_STORAGE_KEY = 'admin_user';
const ADMIN_TOKEN_STORAGE_KEY = 'admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSignal = signal<AuthUser | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly isLoggedIn = computed(
    () => !!this.userSignal() || !!AuthService.getStoredToken()
  );

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.restoreSession();
  }

  login(payload: LoginPayload): Observable<AuthUser> {
    return this.http
      .post<LoginResponse>(`${BASE_URL}/api/auth/login`, payload, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          const user = response.user
            ? response.user
            : {
                _id: response._id ?? '',
                email: response.email ?? payload.email,
                isAdmin: response.isAdmin ?? true,
              };

          const token =
            response.token ??
            response.accessToken ??
            response.data?.token ??
            response.data?.accessToken;
          if (token) {
            localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
          }

          return user;
        }),
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
          localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
          this.router.navigate(['/admin']);
        })
      );
  }

  static getStoredToken(): string | null {
    return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  }

  private restoreSession(): void {
    try {
      const stored = localStorage.getItem(ADMIN_USER_STORAGE_KEY);
      if (stored) {
        this.userSignal.set(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
      localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    }
  }
}
