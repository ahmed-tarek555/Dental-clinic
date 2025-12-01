import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="container">

      <form (submit)="onSubmit($event)">
        <div class="row">
          <label for="file">(اشعة) اختر صورة الأسنان</label>
          <input id="file" type="file" accept="image/*" (change)="onFileChange($event)" />
        </div>

        <div class="row" *ngIf="previewUrl">
          <label>معاينة الصورة</label>
          <img [src]="previewUrl" alt="preview" style="max-width:100%; border-radius:6px;"/>
        </div>

        <div class="row">
          <label>البريد الإلكتروني (اختياري)</label>
          <input type="email" [(ngModel)]="email" name="email" placeholder="example@email.com"/>
        </div>

        <button type="submit" [disabled]="!file || isLoading">إرسال إلى المعالجة</button>
      </form>

      <div class="summary" *ngIf="isLoading">
        <h3>جاري المعالجة...</h3>
      </div>

      <div class="summary" *ngIf="errorMessage">
        <h3>خطأ</h3>
        <p>{{ errorMessage }}</p>
      </div>

      <div class="summary" *ngIf="processedImageUrl">
        <h3>النتيجة</h3>
        <img [src]="processedImageUrl" alt="processed" style="display:block; max-width:100%; margin: 12px auto; border-radius:6px;" />
        <div style="text-align:center; margin-top:8px;">
          <button (click)="downloadImage()" class="download-btn">تحميل الصورة</button>
        </div>
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
    .download-btn { padding: 10px 14px; background:#1565c0; border-radius:6px; color:#fff; border:0; cursor:pointer; }
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
