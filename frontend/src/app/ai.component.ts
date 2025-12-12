import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
<div class="page-layout">

  <!-- LEFT SIDE -->
  <div class="left-side">
    <div class="card form-card">

      <form (submit)="onSubmit($event)">
        <h2 class="card-title">رفع ومعالجة صورة الأشعة</h2>

        <div class="row">
          <label for="file">اختر صورة الاسنان (اشعة)</label>
          <input id="file" type="file" accept="image/*" (change)="onFileChange($event)" />
        </div>

        <div class="row" *ngIf="previewUrl">
          <img [src]="previewUrl" alt="preview" class="image-preview"/>
        </div>

        <button type="submit" [disabled]="!file || isLoading" class="btn primary-btn">
          إرسال
        </button>
      </form>

      <div class="summary" *ngIf="isLoading">
        <p class="loading">جاري المعالجة...</p>
      </div>

      <div class="summary error" *ngIf="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>

      <div class="summary" *ngIf="processedImageUrl">
        <h3>النتيجة</h3>
        <img [src]="processedImageUrl" alt="processed" class="image-result"/>

        <button (click)="downloadImage()" class="btn secondary-btn">
          تحميل الصورة
        </button>
      </div>

    </div>
  </div>

  <div class="right-side">
    <div class="card description-card">
      <h2 class="card-title">وصف نتائج التحليل</h2>

      <div class="desc-item">
        <h4>BDC-BDR</h4>
        <p>تقييم كثافة العظم وحالته حول الضرس.</p>
      </div>

      <div class="desc-item">
        <h4>تسوس (Caries)</h4>
        <p>نخر أو تلف في بنية السن.</p>
      </div>

      <div class="desc-item">
        <h4>كسر (Fractured)</h4>
        <p>شرخ أو كسر في التاج أو الجذر.</p>
      </div>

      <div class="desc-item">
        <h4>منطمر (Impacted)</h4>
        <p>سن لم يبزغ بسبب انسداد أو وضع غير طبيعي.</p>
      </div>

      <div class="desc-item">
        <h4>التهاب / عدوى (Infection)</h4>
        <p>وجود التهاب في اللثة أو العظم أو حول الجذر.</p>
      </div>

    </div>
  </div>

</div>
  `,
  styles: [`
/* --- Page Layout --- */
.page-layout {
  display: grid;
  grid-template-columns: 1fr 380px;  /* left takes full space, right fixed */
  gap: 30px;
  padding: 20px;
  direction: rtl;
}

/* Center the left side content */
.left-side {
  display: flex;
  justify-content: center;
}

/* --- Cards --- */
.card {
  width: 100%;
  max-width: 520px;       /* keeps the form centered and not too wide */
  background: #ffffff;
  padding: 24px;
  border-radius: 14px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.08);
  border: 1px solid #e6eaf0;
}

.card-title {
  margin-bottom: 16px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: #0d47a1;
}

/* --- Form --- */
.form-card form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row label {
  font-weight: 600;
  margin-bottom: 6px;
}

input {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

/* --- Images --- */
.image-preview,
.image-result {
  max-width: 100%;
  border-radius: 10px;
  margin: 10px auto 0;
  display: block;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
}

/* --- Buttons --- */
.btn {
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.primary-btn {
  background: #1565c0;
  color: white;
}

.primary-btn:hover {
  background: #0d47a1;
}

.secondary-btn {
  background: #009688;
  color: white;
  margin-top: 10px;
}

.secondary-btn:hover {
  background: #00796b;
}

/* --- Center the result area --- */
.summary {
  margin-top: 20px;
  padding-top: 10px;
  text-align: center;
}

/* --- Description Panel --- */
.description-card .desc-item {
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eef1f5;
}

.description-card h4 {
  margin: 0;
  color: #1976d2;
}

/* --- Messages --- */
.error {
  color: #c62828;
}

.loading {
  color: #0277bd;
  font-weight: 600;
}


  `]
})
export class AiComponent {
  private http = inject(HttpClient);

  file: File | null = null;
  previewUrl: string | null = null;
  processedImageUrl: string | null = null;
  isLoading = false;
  errorMessage = '';
  email = '';

  private apiUrl = 'http://localhost:8000/ai/process_image';

  onFileChange(event: Event) {
    this.resetResult();
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.file = null;
      this.previewUrl = null;
      return;
    }
    this.file = input.files[0];

    const reader = new FileReader();
    reader.onload = (e) => this.previewUrl = e.target?.result as string || null;
    reader.readAsDataURL(this.file);
  }

  async onSubmit(e: Event) {
    e.preventDefault();

    if (!this.file) {
      this.errorMessage = 'اختر صورة أولاً';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.processedImageUrl = null;

    const formData = new FormData();
    formData.append('file', this.file);
    if (this.email) formData.append('email', this.email);

    this.http.post(this.apiUrl, formData, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        this.processedImageUrl = url;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'حدث خطأ أثناء معالجة الصورة';
        this.isLoading = false;
      }
    });
  }

  async downloadImage() {
    if (!this.processedImageUrl) return;
    try {
      const response = await fetch(this.processedImageUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to download image');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      const parts = this.processedImageUrl.split('/');
      const suggested = parts[parts.length - 1] || 'processed.png';
      a.download = suggested;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      this.errorMessage = 'فشل تحميل الصورة';
    }
  }

  private resetResult() {
    this.processedImageUrl = null;
    this.errorMessage = '';
    this.isLoading = false;
  }
}
