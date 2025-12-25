import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  template: `
    <div class="page-background">
      <div class="container">

        <!-- HEADER -->
        <div class="dashboard-header">
          <h2>لوحة التحكم</h2>

          <div class="actions">
            <button (click)="fetchData()">تحديث</button>
            <button class="logout" (click)="logout()">تسجيل الخروج</button>
          </div>
        </div>

        <!-- STATS -->
        <div class="stats">
          <div class="stat-card">
            <h4>عدد الحجوزات</h4>
            <p>{{ totalUsers }}</p>
          </div>

          <div class="stat-card">
            <h4>رسائل التواصل</h4>
            <p>{{ totalMessages }}</p>
          </div>
        </div>

        <!-- LOADING -->
        <div *ngIf="isLoading" class="summary info">
          جاري تحميل البيانات...
        </div>

        <!-- ERROR -->
        <div *ngIf="errorMessage" class="summary error">
          {{ errorMessage }}
        </div>

        <!-- USERS TABLE -->
        <h3>الحجوزات</h3>

        <div class="table-wrapper" *ngIf="users.length > 0">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>الاسم</th>
                <th>العمر</th>
                <th>الجنس</th>
                <th>العنوان</th>
                <th>البريد</th>
                <th>المرض</th>
                <th>السبب</th>
                <th>تاريخ مرضي</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.age }}</td>
                <td>{{ user.gender }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.disease }}</td>
                <td>{{ user.reason }}</td>
                <td>{{ user.past_illness }}</td>
                <td>{{ user.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p *ngIf="!isLoading && users.length === 0">لا يوجد حجوزات</p>

        <!-- MESSAGES TABLE -->
        <h3>رسائل التواصل</h3>

        <div class="table-wrapper" *ngIf="messages.length > 0">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>الاسم</th>
                <th>الهاتف</th>
                <th>البريد</th>
                <th>العنوان</th>
                <th>الرسالة</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let msg of messages">
                <td>{{ msg.id }}</td>
                <td>{{ msg.name }}</td>
                <td>{{ msg.phone }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.subject }}</td>
                <td>{{ msg.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p *ngIf="!isLoading && messages.length === 0">لا توجد رسائل</p>

      </div>
    </div>
  `,
  styles: [`
    .page-background {
      background-color: #e6f0fa;
      min-height: 100vh;
      padding: 24px 0;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 24px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    /* HEADER */
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .actions button {
      margin-left: 8px;
      padding: 8px 14px;
      border-radius: 6px;
      border: 0;
      cursor: pointer;
      background: #1565c0;
      color: #fff;
    }

    .logout {
      background: #c62828;
    }

    /* STATS */
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: #f0f4f8;
      padding: 16px;
      border-radius: 8px;
      text-align: center;
    }

    .stat-card p {
      font-size: 26px;
      font-weight: bold;
      margin-top: 8px;
    }

    /* TABLES */
    h3 {
      margin: 24px 0 12px;
      text-align: center;
    }

    .table-wrapper {
      overflow-x: auto;
      margin-bottom: 24px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 8px 12px;
      white-space: nowrap;
    }

    th {
      background-color: #f0f4f8;
    }

    /* STATES */
    .summary {
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 16px;
      text-align: center;
    }

    .summary.info {
      background: #e3f2fd;
      color: #0d47a1;
    }

    .summary.error {
      background: #fde2e2;
      color: #a00;
    }
  `]
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  messages: any[] = [];

  totalUsers = 0;
  totalMessages = 0;

  isLoading = false;
  errorMessage = '';

  private apiUrl = 'http://localhost:8000/admin/dashboard';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.users = res.users || [];
        this.messages = res.contact_messages || [];

        this.totalUsers = this.users.length;
        this.totalMessages = this.messages.length;

        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'حدث خطأ أثناء جلب البيانات';
        this.isLoading = false;
      }
    });
  }

  logout() {
    // clear token later if you add auth
    this.router.navigate(['/']);
  }
}
