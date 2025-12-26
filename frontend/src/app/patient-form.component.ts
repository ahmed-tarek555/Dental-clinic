import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="page-background">
      <div class="card">

        <!-- HEADER -->
        <div class="card-header">
          <h2>حجز موعد</h2>
          <p>يرجى ملء البيانات التالية لحجز موعدك</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <div class="row">
            <label>الاسم الكامل *</label>
            <input type="text" formControlName="name" />
            <small *ngIf="isInvalid('name')">الاسم مطلوب</small>
          </div>

          <div class="row">
            <label>السن *</label>
            <input type="number" formControlName="age" />
            <small *ngIf="isInvalid('age')">أدخل سن صحيح</small>
          </div>

          <div class="row">
            <label>النوع *</label>
            <select formControlName="gender">
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
          </div>

          <div class="row">
            <label>العنوان</label>
            <input type="text" formControlName="address" />
          </div>

          <div class="row">
            <label>البريد الإلكتروني</label>
            <input type="email" formControlName="email" placeholder="example@email.com" />
            <small *ngIf="isInvalid('email')">بريد إلكتروني غير صحيح</small>
          </div>

          <div class="row">
            <label>هل تعاني من أمراض؟</label>
            <select formControlName="disease">
              <option value="none">لا</option>
              <option value="diabetes">سكر</option>
              <option value="hypertension">ضغط</option>
              <option value="heart disease">أمراض قلب</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          <div class="row">
            <label>سبب الزيارة *</label>
            <select formControlName="reason">
              <option value="">-- اختر --</option>
              <option value="Checkup">كشف</option>
              <option value="Cosmetic fillings">حشو تجميلي</option>
              <option value="Nerve fillings">حشو عصب</option>
              <option value="Surgery">جراحة</option>
              <option value="Orthodontics">تقويم</option>
              <option value="Teeth transplant">زراعة أسنان</option>
            </select>
            <small *ngIf="isInvalid('reason')">اختر سبب الزيارة</small>
          </div>

          <div class="row">
            <label>التاريخ المرضي</label>
            <input type="text" formControlName="past_illness" />
          </div>

          <div class="row">
            <label>موعد الزيارة *</label>
            <input type="datetime-local" formControlName="date" />
            <small *ngIf="isInvalid('date')">حدد موعد الزيارة</small>
          </div>

          <button type="submit" [disabled]="form.invalid || isLoading">
            <span *ngIf="!isLoading">تأكيد الحجز</span>
            <span *ngIf="isLoading">جاري الإرسال...</span>
          </button>
        </form>

        <!-- SUCCESS -->
        <div class="alert success" *ngIf="successMessage">
          ✅ {{ successMessage }}
        </div>

        <!-- ERROR -->
        <div class="alert error" *ngIf="errorMessage">
          ❌ {{ errorMessage }}
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* BACKGROUND */
    .page-background {
      min-height: 100vh;
      background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 12px;
    }

    /* CARD */
    .card {
      width: 100%;
      max-width: 820px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.12);
      overflow: hidden;
      animation: fadeIn 0.5s ease;
    }

    .card-header {
      background: linear-gradient(135deg, #1565c0, #2e7d32);
      color: #fff;
      padding: 24px;
      text-align: center;
    }

    .card-header h2 {
      margin: 0;
      font-size: 26px;
    }

    .card-header p {
      margin-top: 6px;
      opacity: 0.9;
      font-size: 14px;
    }

    /* FORM */
    form {
      padding: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px 18px;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-weight: 600;
      color: #333;
    }

    input, select {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      transition: all 0.2s ease;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #2e7d32;
      box-shadow: 0 0 0 3px rgba(46,125,50,0.15);
    }

    small {
      font-size: 12px;
      color: #c62828;
    }

    button {
      grid-column: 1 / -1;
      margin-top: 8px;
      padding: 14px;
      border-radius: 10px;
      border: none;
      font-size: 16px;
      font-weight: bold;
      background: linear-gradient(135deg, #2e7d32, #1b5e20);
      color: #fff;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.2);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* ALERTS */
    .alert {
      margin: 16px 24px 24px;
      padding: 14px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }

    .success {
      background: #e8f5e9;
      color: #1b5e20;
    }

    .error {
      background: #fde2e2;
      color: #a00;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class PatientFormComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    name: ['', Validators.required],
    age: [null, [Validators.required, Validators.min(1)]],
    gender: ['male', Validators.required],
    address: [''],
    email: ['', Validators.email],
    disease: ['none'],
    reason: ['', Validators.required],
    past_illness: [''],
    date: ['', Validators.required]
  });

  isInvalid(field: string) {
    const c = this.form.get(field);
    return c?.invalid && c?.touched;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([k, v]) =>
      formData.append(k, v ?? '')
    );

    this.http.post<{ message: string }>('http://localhost:8000/register', formData)
      .subscribe({
        next: (res) => {
          this.successMessage = res.message || 'تم الحجز بنجاح';
          this.form.reset({ gender: 'male', disease: 'none' });
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'حدث خطأ أثناء إرسال البيانات';
          this.isLoading = false;
        }
      });
  }
}
