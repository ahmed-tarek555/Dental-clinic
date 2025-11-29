import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="booking-container">
      <div class="booking-header">
        <h1>احجز موعدك الآن</h1>
        <p>املأ البيانات التالية وسنقوم بالتواصل معك لتأكيد الموعد</p>
      </div>

      <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="booking-form">
        <div class="form-group">
          <label>الاسم الكامل</label>
          <input type="text" formControlName="fullName" placeholder="أدخل اسمك الكامل" />
          <div class="error" *ngIf="bookingForm.controls.fullName.touched && bookingForm.controls.fullName.invalid">
            الاسم مطلوب
          </div>
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input type="tel" formControlName="phone" placeholder="01XXXXXXXXX" (blur)="validatePhone($event)" />
          <div class="error" *ngIf="bookingForm.controls.phone.touched && bookingForm.controls.phone.invalid">
            {{ getErrorMessage('phone') }}
          </div>
        </div>

        <div class="form-group">
          <label>البريد الإلكتروني</label>
          <input type="email" formControlName="email" placeholder="example@email.com" />
        </div>

        <div class="form-group">
          <label>الخدمة المطلوبة</label>
          <select formControlName="service">
            <option value="">اختر الخدمة</option>
            <option value="general">طب الأسنان العام</option>
            <option value="implant">زراعة الأسنان</option>
            <option value="orthodontics">تقويم الأسنان</option>
            <option value="emergency">جراحات الطوارئ</option>
            <option value="pediatric">طب أسنان الأطفال</option>
            <option value="root-canal">علاج العصب</option>
            <option value="veneer">فينير الأسنان</option>
            <option value="whitening">تبييض الأسنان</option>
          </select>
          <div class="error" *ngIf="bookingForm.controls.service.touched && bookingForm.controls.service.invalid">
            يرجى اختيار الخدمة
          </div>
        </div>

        <div class="form-group">
          <label>تاريخ الموعد المفضل</label>
          <input type="date" formControlName="preferredDate" (change)="onDateChange()" [attr.min]="minDate" [attr.max]="maxDate" />
          <div class="error" *ngIf="bookingForm.controls.preferredDate.touched && bookingForm.controls.preferredDate.invalid">
            {{ getErrorMessage('preferredDate') }}
          </div>
        </div>

        <div class="form-group">
          <label>الوقت المفضل</label>
          <select formControlName="preferredTime">
            <option value="">اختر الوقت</option>
            <option *ngFor="let slot of availableSlots" [value]="slot">{{ slot }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>ملاحظات إضافية</label>
          <textarea formControlName="notes" rows="4" placeholder="أي ملاحظات أو تفاصيل إضافية..."></textarea>
        </div>

        <button type="submit" [disabled]="bookingForm.invalid || isLoading" class="submit-btn">
          <span *ngIf="!isLoading">إرسال طلب الحجز</span>
          <span *ngIf="isLoading">جاري الإرسال...</span>
        </button>
      </form>

      <div class="booking-info">
        <h3>معلومات مهمة</h3>
        <ul>
          <li>سيتم التواصل معك خلال 24 ساعة لتأكيد الموعد</li>
          <li>يرجى الحضور قبل الموعد بـ 15 دقيقة</li>
          <li>في حالة عدم القدرة على الحضور، يرجى الإلغاء قبل 24 ساعة</li>
          <li>نقدم خدمات الطوارئ على مدار الساعة</li>
        </ul>
      </div>

      <div class="success-message" *ngIf="submitted">
        <h3>تم إرسال طلب الحجز بنجاح!</h3>
        <p>شكراً لك، سيتم التواصل معك قريباً لتأكيد الموعد.</p>
        <button (click)="resetForm()" class="btn-secondary">حجز موعد جديد</button>
      </div>
    </div>
  `,
  styles: [`
    .booking-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .booking-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .booking-header h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .booking-header p {
      font-size: 1.1rem;
      color: #666;
    }

    .booking-form {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
    }

    .error {
      color: #e74c3c;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    .submit-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .booking-info {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 15px;
      margin-bottom: 2rem;
    }

    .booking-info h3 {
      color: #333;
      margin-bottom: 1rem;
    }

    .booking-info ul {
      list-style: none;
      padding: 0;
    }

    .booking-info li {
      padding: 0.5rem 0;
      color: #666;
      position: relative;
      padding-left: 1.5rem;
    }

    .booking-info li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #27ae60;
      font-weight: bold;
    }

    .success-message {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      margin-top: 1rem;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    @media (max-width: 768px) {
      .booking-container {
        padding: 1rem;
      }
      
      .booking-header h1 {
        font-size: 2rem;
      }
      
      .booking-form {
        padding: 1.5rem;
      }
    }
  `]
})
export class BookingComponent implements OnInit {
  private fb = new FormBuilder();
  
  submitted = false;
  isLoading = false;
  availableSlots: string[] = [];
  selectedDate = '';
  minDate = '';
  maxDate = '';
  // أيام الإغلاق الأسبوعية: 0 الأحد ... 5 الجمعة، 6 السبت
  closedWeekdays: number[] = [5];
  // تواريخ أعياد/إغلاقات خاصة بالتنسيق YYYY-MM-DD
  holidays: string[] = [];

  bookingForm = this.fb.group({
    fullName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', Validators.email],
    service: ['', Validators.required],
    preferredDate: ['', [Validators.required, this.dateRangeValidator()]],
    preferredTime: [''],
    notes: ['']
  });

  ngOnInit() {
    this.setMinDate();
    // تهيئة المواعيد حسب التاريخ الافتراضي
    this.onDateChange();
  }

  setMinDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const max = new Date(today);
    max.setDate(max.getDate() + 30);

    // اجعل الحد الأدنى أول يوم عمل متاح بدءًا من اليوم
    let candidate = new Date(today);
    while (this.isClosedDate(candidate.toISOString().split('T')[0])) {
      candidate.setDate(candidate.getDate() + 1);
    }
    this.minDate = candidate.toISOString().split('T')[0];
    this.maxDate = max.toISOString().split('T')[0];

    // إذا كان التاريخ الحالي خارج النطاق، عيّن الحد الأدنى بشكل افتراضي
    const current = this.bookingForm.get('preferredDate')?.value;
    if (!current) {
      this.bookingForm.patchValue({ preferredDate: this.minDate });
    }
  }

  generateAvailableSlots() {
    this.availableSlots = [
      '9:00 صباحاً',
      '10:00 صباحاً', 
      '11:00 صباحاً',
      '12:00 ظهراً',
      '2:00 بعد الظهر',
      '3:00 بعد الظهر',
      '4:00 بعد الظهر',
      '5:00 مساءً'
    ];
  }

  onDateChange() {
    const selectedDate = this.bookingForm.get('preferredDate')?.value;
    if (selectedDate) {
      this.selectedDate = selectedDate;
      this.updateSlotsForDate(selectedDate);
      // فرض إعادة التحقق من صلاحية التاريخ بعد تغيّر القيمة
      this.bookingForm.get('preferredDate')?.updateValueAndValidity();
    }
  }

  isClosedDate(dateStr: string): boolean {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return false;
    const w = d.getDay();
    if (this.closedWeekdays.includes(w)) return true;
    return this.holidays.includes(dateStr);
  }

  updateSlotsForDate(dateStr: string) {
    if (this.isClosedDate(dateStr)) {
      this.availableSlots = [];
      // ضع خطأ يوضّح أن اليوم مغلق
      const ctrl = this.bookingForm.get('preferredDate');
      const currentErrors = ctrl?.errors || {};
      ctrl?.setErrors({ ...currentErrors, closedDay: true });
      return;
    }
    // إزالة خطأ اليوم المغلق إن وجد
    const ctrl = this.bookingForm.get('preferredDate');
    if (ctrl?.errors && ctrl.errors['closedDay']) {
      const { closedDay, ...rest } = ctrl.errors as any;
      ctrl.setErrors(Object.keys(rest).length ? rest : null);
    }
    this.generateAvailableSlots();
  }

  dateRangeValidator() {
    return (control: any) => {
      const value = control?.value;
      if (!value) return null;
      const selected = new Date(value);
      selected.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const max = new Date(today);
      max.setDate(max.getDate() + 30);

      const valueStr = value;
      if (this.isClosedDate(valueStr)) {
        return { closedDay: true };
      }
      if (selected < today || selected > max) {
        return { dateOutOfRange: true };
      }
      return null;
    };
  }

  validatePhone(event: any) {
    const phone = event.target.value;
    const phoneRegex = /^01[0-9]{9}$/;
    if (phone && !phoneRegex.test(phone)) {
      this.bookingForm.get('phone')?.setErrors({ invalidFormat: true });
    }
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.isLoading = true;
      
      // محاكاة إرسال البيانات
      setTimeout(() => {
        this.submitted = true;
        this.isLoading = false;
        console.log('Booking data:', this.bookingForm.value);
        
        // إرسال إشعار نجاح
        this.showSuccessNotification();
      }, 2000);
    }
  }

  showSuccessNotification() {
    // يمكن إضافة مكتبة إشعارات هنا
    alert('تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريباً.');
  }

  resetForm() {
    this.bookingForm.reset();
    this.submitted = false;
    this.setMinDate();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.bookingForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} مطلوب`;
      if (field.errors['email']) return 'البريد الإلكتروني غير صحيح';
      if (field.errors['minlength']) return `${fieldName} قصير جداً`;
      if (field.errors['invalidFormat']) return 'رقم الهاتف غير صحيح';
      if (field.errors['dateOutOfRange']) return 'يرجى اختيار تاريخ من اليوم وحتى 30 يوماً فقط';
      if (field.errors['closedDay']) return 'هذا اليوم غير متاح للحجز (المركز مغلق).';
    }
    return '';
  }
}
