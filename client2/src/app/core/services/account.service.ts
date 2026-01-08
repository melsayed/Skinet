import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address, User } from '../../shared/models/user';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseURL = environment.apiUrl;
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  /*
  ليه بنستخدم withCredentials: true؟
  لأنّك بتتعامل مع Cookies Authentication مش Bearer Token.
  وعشان Angular يسمح بإرسال واستقبال الكوكيز في طلبات HTTP
  */
  login(values: any) {
    let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<User>(this.baseURL + 'login', values, { params });
  }

  register(values: any) {
    return this.http.post<User>(this.baseURL + 'account/register', values);
  }

  getUserInfo() {
    return this.http.get<User>(this.baseURL + 'account/user-info').pipe(
      map(user => {
        this.currentUser.set(user);
        return user;
      })
    );
  }

  logout() {
    return this.http.post(this.baseURL + 'account/logout', {});
  }

  updateAddress(address: Address) {
    return this.http.post<Address>(this.baseURL + 'account/address', address).pipe(
      tap(() => {
        this.currentUser.update(user => {
          if (user)
            user.address = address;
          return user;
        })
      })
    );
    // .subscribe(
    //   response => {
    //     const user = this.currentUser();
    //     if (user != null) {
    //       user.address = response;
    //       this.currentUser.set(user);
    //     }
    //   }
    // );
  }
  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(this.baseURL + 'account/auth-state');
  }
}
