import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


interface ApiResponse {
  message: string;
}



@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  template: `
  <div class="container">
    <h2>حجز موعد</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="row">
        <label>الاسم</label>
        <input type="text" formControlName="name" />
      </div>

      <div class="row">
        <label>السن</label>
        <input type="number" formControlName="age" />
      </div>
      <div class="row">
        <label>النوع</label>
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
        </div>
      <div class="row">
        <label>هل تعاني من أي أمراض؟</label>
        <select formControlName="disease">
          <option value="none">لا</option>
          <option value="diabetes">سكر</option>
          <option value="thyroid disease">غده</option>
          <option value="hypertension">ضغط</option>
          <option value="asthma">ربو</option>
          <option value="heart disease">أمراض قلب</option>
          <option value="other">أخرى</option>
        </select>
      </div>
       <div class="row">
        <label>سبب الزيارة</label>
        <select formControlName="reason">
          <option value="Checkup">كشف</option>
          <option value="Cosmetic fillings">حشو تجميلي</option>
          <option value="Nerve fillings">حشو عصب</option>
          <option value="Tooth extraction">خلع</option>
          <option value="Surgery">جراحة</option>
          <option value="Teeth transplant">زراعة الأسنان</option>
          <option value="Orthodontics">تقويم</option>
          <option value="Teeth whitning">تنضيف وتلميع الاسنان</option>
          <option value="vinir">فينير</option>
          <option value="Removalble prostheses">تركيبات متحركة</option>
          <option value="Fixed prostheses">تركيبات ثابتة</option>
        </select>
      </div>
      <div class="row">
        <label>التاريخ المرضي</label>
        <input type="text" formControlName="past_illness" />
      </div>
      <div class="row">
        <label>موعد الزيارة</label>
        <input type="datetime-local" formControlName="date" />
      </div>
      <button type="submit" [disabled]="form.invalid">حفظ البيانات</button>
    </form>

    <div class="summary" *ngIf="submitted">
      <h3>{{ detailsMessage }}</h3>
    </div>
  </div>
  `,
  styles: [`
    .container { max-width: 720px; margin: 24px auto; display: block; }
    form { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 16px; }
    .row { display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 600; }
    input, select, textarea { padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { grid-column: 1 / -1; padding: 12px; background: #2e7d32; color: #fff; border: 0; border-radius: 6px; cursor: pointer; }
    .summary { margin-top: 20px; background: #f6f8fa; padding: 12px; border-radius: 6px; }
    h2, h3 { text-align: center; }
  `]
})

export class PatientFormComponent {

  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);


  submitted = false;
  detailsMessage = '';

  readonly form = this.fb.group({
    name: ['', Validators.required],
    age: [null as number | null, [Validators.required, Validators.min(0)]],
    gender: ['male', Validators.required],
    address: [''],
    email: ['', Validators.email],
    disease: ['none'],
    reason: ['none'],
    past_illness: [''],
    date: ['']
  });

onSubmit() {
  if (this.form.invalid) return;
  this.submitted = false;
  this.detailsMessage = '';

  const apiUrl = 'http://localhost:8000/register';

  const formData = new FormData();
  Object.entries(this.form.value).forEach(([key, value]) => {
    formData.append(key, value != null ? value.toString() : '');
  });

  this.http.post<{message: string}>(apiUrl, formData).subscribe({
    next: (res) => {
      this.submitted = true;
      this.detailsMessage = res.message;
    },
  });
}
}


