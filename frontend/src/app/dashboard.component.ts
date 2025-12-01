// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  template: `
    <div class="page-background">
      <div class="container">

        <h3>الحجوزات</h3>
        <table *ngIf="users.length > 0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Email</th>
              <th>Disease</th>
              <th>Reason</th>
              <th>Medical History</th>
              <th>Date</th>
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
        <p *ngIf="users.length === 0">لا يوجد حجوزات</p>

        <h3>رسائل التواصل</h3>
        <table *ngIf="messages.length > 0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
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
        <p *ngIf="messages.length === 0">لا توجد رسائل</p>

        <div *ngIf="errorMessage" class="summary">
          <p>{{ errorMessage }}</p>
        </div>
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
      max-width: 900px;
      margin: 0 auto;
      padding: 24px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h2, h3 { text-align: center; margin-bottom: 16px; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background-color: #f0f4f8;
    }
    .summary { margin-top: 16px; padding: 12px; background: #fde2e2; border-radius: 6px; color: #a00; }
  `]
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  messages: any[] = [];
  errorMessage = '';

  private apiUrl = 'http://localhost:8000/admin/dashboard';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.users = res.users || [];
        this.messages = res.contact_messages || [];
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'حدث خطأ أثناء جلب البيانات';
      }
    });
  }
}
