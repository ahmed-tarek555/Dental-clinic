import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // <-- Add HttpClientModule here
  template: `
    <div class="page-background">
      <div class="container">
        <h2>تسجيل الدخول للإدارة</h2>

        <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
          <div class="row">
            <label>اسم المستخدم</label>
            <input type="text" name="username" required [(ngModel)]="username" placeholder="أدخل اسم المستخدم"/>
          </div>

          <div class="row">
            <label>كلمة المرور</label>
            <input type="password" name="password" required [(ngModel)]="password" placeholder="أدخل كلمة المرور"/>
          </div>

          <button type="submit" [disabled]="loginForm.invalid || isLoading">
            <span *ngIf="!isLoading">تسجيل الدخول</span>
            <span *ngIf="isLoading">جاري تسجيل الدخول...</span>
          </button>
        </form>

        <div class="summary" *ngIf="errorMessage">
          <h3>خطأ</h3>
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-background { background-color: #e6f0fa; min-height: 100vh; padding: 24px 0; }
    .container { max-width: 400px; margin: 0 auto; padding: 24px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    h2 { text-align: center; margin-bottom: 20px; }
    form { display: grid; gap: 12px 16px; }
    .row { display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 600; }
    input { padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { padding: 12px; background: #2e7d32; color: #fff; border: 0; border-radius: 6px; cursor: pointer; }
    .summary { margin-top: 20px; background: #f6f8fa; padding: 12px; border-radius: 6px; }
  `]
})
export class AdminLoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  private apiUrl = 'http://localhost:8000/admin/login';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    this.http.post<any>(this.apiUrl, formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.detail || err?.error?.message || 'اسم المستخدم أو كلمة المرور غير صحيحة';
      }
    });
  }
}

