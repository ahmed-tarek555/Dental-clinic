import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

interface ApiResponse {
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  template: `
    <div class="contact-page">
      <!-- Hero Section -->
      <section class="contact-hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>تواصل معنا</h1>
          <p>نحن هنا لمساعدتك. تواصل معنا في أي وقت</p>
        </div>
      </section>

      <div class="contact-container">
        <!-- Contact Info Cards -->
        <section class="contact-info-section">
          <div class="info-cards">
            <div class="info-card">
              <div class="card-icon">
                <span>📍</span>
              </div>
              <h3>العنوان</h3>
              <p>شارع الملك فيصل</p>
              <p>المنصورة، الدقهلية</p>
            </div>

            <div class="info-card">
              <div class="card-icon">
                <span>📞</span>
              </div>
              <h3>الهاتف</h3>
              <p dir="ltr">+20 123 456 7890</p>
              <p dir="ltr">+20 111 222 3333</p>
            </div>

            <div class="info-card">
              <div class="card-icon">
                <span>✉️</span>
              </div>
              <h3>البريد الإلكتروني</h3>
              <p>info&#64;alhelal-clinic.com</p>
              <p>booking&#64;alhelal-clinic.com</p>
            </div>

            <div class="info-card">
              <div class="card-icon">
                <span>🕐</span>
              </div>
              <h3>ساعات العمل</h3>
              <p>السبت - الخميس: 9ص - 9م</p>
              <p>الجمعة: مغلق</p>
            </div>
          </div>
        </section>

        <!-- Doctor Message Section -->
        <section class="doctor-message-section">
          <div class="doctor-message-wrapper">
            <div class="doctor-info">
              <div class="doctor-details">
                <h1>راسلنا</h1>
              </div>
            </div>

            <div class="message-options">
              <div class="message-option" >
                <div class="option-icon">🩺</div>
                <div class="option-content">
                  <h4>استشارة طبية</h4>
                  <p>اسأل الدكتور عن حالتك الصحية</p>
                </div>
              </div>

              <div class="message-option" >
                <div class="option-icon">📋</div>
                <div class="option-content">
                  <h4>متابعة علاج</h4>
                  <p>متابعة حالتك بعد العلاج</p>
                </div>
              </div>

              <div class="message-option" >
                <div class="option-icon">📄</div>
                <div class="option-content">
                  <h4>إرسال تقرير</h4>
                  <p>أرسل صور أو تقارير طبية</p>
                </div>
              </div>

              <div class="message-option" >
                <div class="option-icon">⚡</div>
                <div class="option-content">
                  <h4>استفسار عاجل</h4>
                  <p>للحالات التي تحتاج رد سريع</p>
                </div>
              </div>
            </div>

            <div class="doctor-message-form" *ngIf="selectedMessageType">
              <form [formGroup]="doctorMessageForm" (ngSubmit)="onDoctorMessageSubmit()">
                <div class="form-row">
                  <div class="form-group">
                    <label>الاسم الكامل</label>
                    <input type="text" formControlName="patientName" placeholder="أدخل اسمك الكامل" />
                  </div>
                  <div class="form-group">
                    <label>رقم الهاتف</label>
                    <input type="tel" formControlName="patientPhone" placeholder="01XXXXXXXXX" />
                  </div>
                </div>

                <div class="form-group" *ngIf="selectedMessageType === 'followup'">
                  <label>رقم الملف الطبي (إن وجد)</label>
                  <input type="text" formControlName="fileNumber" placeholder="رقم الملف الطبي" />
                </div>

                <div class="form-group">
                  <label>
                    <span *ngIf="selectedMessageType === 'consultation'">صف حالتك أو سؤالك</span>
                    <span *ngIf="selectedMessageType === 'followup'">كيف تشعر بعد العلاج؟</span>
                    <span *ngIf="selectedMessageType === 'report'">وصف التقرير أو الصور</span>
                    <span *ngIf="selectedMessageType === 'urgent'">ما هي المشكلة العاجلة؟</span>
                  </label>
                  <textarea formControlName="doctorMessage" rows="5"
                            [placeholder]="getMessagePlaceholder()"></textarea>
                </div>

                <div class="form-group" *ngIf="selectedMessageType === 'report'">
                  <label>إرفاق ملفات</label>
                  <div class="file-upload-area" (click)="triggerFileInput()"
                       (dragover)="onDragOver($event)" (drop)="onDrop($event)">
                    <input type="file" #fileInput (change)="onFileSelected($event)"
                           multiple accept="image/*,.pdf" style="display: none" />
                    <div class="upload-content">
                      <span class="upload-icon">📎</span>
                      <p>اضغط هنا أو اسحب الملفات</p>
                      <span class="upload-hint">صور، PDF (الحد الأقصى 5MB)</span>
                    </div>
                  </div>
                  <div class="attached-files" *ngIf="attachedFiles.length > 0">
                    <div class="attached-file" *ngFor="let file of attachedFiles; let i = index">
                      <span class="file-icon">📄</span>
                      <span class="file-name">{{ file.name }}</span>
                      <button type="button" class="remove-file" (click)="removeFile(i)">✕</button>
                    </div>
                  </div>
                </div>

                <div class="priority-selector" *ngIf="selectedMessageType === 'urgent'">
                  <label>مستوى الاستعجال</label>
                  <div class="priority-options">
                    <button type="button" class="priority-btn"
                            [class.active]="urgencyLevel === 'high'"
                            (click)="urgencyLevel = 'high'">
                      <span>🔴</span> عالي جداً
                    </button>
                    <button type="button" class="priority-btn"
                            [class.active]="urgencyLevel === 'medium'"
                            (click)="urgencyLevel = 'medium'">
                      <span>🟡</span> متوسط
                    </button>
                    <button type="button" class="priority-btn"
                            [class.active]="urgencyLevel === 'low'"
                            (click)="urgencyLevel = 'low'">
                      <span>🟢</span> منخفض
                    </button>
                  </div>
                </div>

                <button type="submit" class="send-doctor-btn"
                        [disabled]="doctorMessageForm.invalid || isDoctorMessageLoading">
                  <span *ngIf="!isDoctorMessageLoading">
                    <span>إرسال للدكتور</span>
                    <span class="btn-icon">💬</span>
                  </span>
                  <span *ngIf="isDoctorMessageLoading">جاري الإرسال...</span>
                </button>
              </form>
            </div>

            <div class="doctor-message-success" *ngIf="doctorMessageSubmitted">
              <div class="success-animation">
                <span>✅</span>
              </div>
              <h3>تم إرسال رسالتك للدكتور!</h3>
              <p>سيتم الرد عليك في أقرب وقت ممكن</p>
              <div class="expected-response">
                <span class="response-icon">⏱️</span>
                <span *ngIf="selectedMessageType === 'urgent'">الرد المتوقع: خلال ساعة</span>
                <span *ngIf="selectedMessageType !== 'urgent'">الرد المتوقع: خلال 24 ساعة</span>
              </div>
              <button (click)="resetDoctorMessage()" class="btn-new-message">
                إرسال رسالة أخرى
              </button>
            </div>
          </div>
        </section>

        <!-- Contact Form & Map Section -->
        <section class="contact-main">
          <div class="contact-grid">
            <!-- Contact Form -->
            <div class="contact-form-wrapper">
              <div class="form-header">
                <h2>أرسل لنا رسالة</h2>
                <p>سنقوم بالرد عليك في أقرب وقت ممكن</p>
              </div>

              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label>الاسم الكامل</label>
                    <input type="text" formControlName="name" placeholder="أدخل اسمك" />
                    <div class="error" *ngIf="contactForm.controls.name.touched && contactForm.controls.name.invalid">
                      الاسم مطلوب
                    </div>
                  </div>

                  <div class="form-group">
                    <label>رقم الهاتف</label>
                    <input type="tel" formControlName="phone" placeholder="01XXXXXXXXX" />
                    <div class="error" *ngIf="contactForm.controls.phone.touched && contactForm.controls.phone.invalid">
                      رقم الهاتف مطلوب
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>البريد الإلكتروني</label>
                  <input type="email" formControlName="email" placeholder="example@email.com" />
                  <div class="error" *ngIf="contactForm.controls.email.touched && contactForm.controls.email.invalid">
                    البريد الإلكتروني غير صحيح
                  </div>
                </div>

                <div class="form-group">
                  <label>الموضوع</label>
                  <select formControlName="subject">
                    <option value="">اختر الموضوع</option>
                    <option value="inquiry">استفسار عام</option>
                    <option value="booking">حجز موعد</option>
                    <option value="complaint">شكوى</option>
                    <option value="suggestion">اقتراح</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>الرسالة</label>
                  <textarea formControlName="message" rows="5" placeholder="اكتب رسالتك هنا..."></textarea>
                  <div class="error" *ngIf="contactForm.controls.message.touched && contactForm.controls.message.invalid">
                    الرسالة مطلوبة
                  </div>
                </div>

                <button type="submit" [disabled]="contactForm.invalid || isLoading" class="submit-btn">
                  <span *ngIf="!isLoading">
                    <span>إرسال الرسالة</span>
                    <span class="btn-icon">➤</span>
                  </span>
                  <span *ngIf="isLoading">جاري الإرسال...</span>
                </button>
              </form>

              <div class="success-message" *ngIf="submitted">
                <div class="success-icon">✅</div>
                <h3>{{detailsMessage}}</h3>
                <button (click)="resetForm()" class="btn-secondary">إرسال رسالة أخرى</button>
              </div>
            </div>

            <!-- Map & Social -->
            <div class="map-social-wrapper">
              <div class="map-container">
                <div class="map-placeholder">
                  <div class="map-icon">🗺️</div>
                  <h3>موقعنا على الخريطة</h3>
                  <p>شارع الملك فيصل، المنصورة</p>
                  <a href="https://maps.google.com" target="_blank" class="map-link">
                    <span>افتح في خرائط جوجل</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div class="social-section">
                <h3>تابعنا على</h3>
                <div class="social-links">
                  <a href="#" class="social-link facebook">
                    <span class="social-icon">📘</span>
                    <span>Facebook</span>
                  </a>
                  <a href="#" class="social-link instagram">
                    <span class="social-icon">📷</span>
                    <span>Instagram</span>
                  </a>
                  <a href="#" class="social-link whatsapp">
                    <span class="social-icon">💬</span>
                    <span>WhatsApp</span>
                  </a>
                  <a href="#" class="social-link twitter">
                    <span class="social-icon">🐦</span>
                    <span>Twitter</span>
                  </a>
                </div>
              </div>

              <div class="emergency-box">
                <div class="emergency-icon">🚨</div>
                <h3>حالات الطوارئ</h3>
                <p>للحالات الطارئة، اتصل بنا على مدار الساعة</p>
                <a href="tel:+201234567890" class="emergency-btn">
                  <span>📞</span>
                  <span dir="ltr">+20 123 456 7890</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      min-height: 100vh;
    }

    .contact-hero {
      height: 350px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      overflow: hidden;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%);
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero-content p {
      font-size: 1.3rem;
      opacity: 0.9;
    }

    .contact-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Info Cards */
    .contact-info-section {
      margin-top: -80px;
      position: relative;
      z-index: 10;
      margin-bottom: 4rem;
    }

    .info-cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .info-card {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    }

    .card-icon {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 1.8rem;
    }

    .info-card h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .info-card p {
      color: #666;
      margin: 0.3rem 0;
      font-size: 0.95rem;
    }

    /* Doctor Message Section */
    .doctor-message-section {
      margin-bottom: 4rem;
    }

    .doctor-message-wrapper {
      background: white;
      border-radius: 24px;
      padding: 3rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      position: relative;
      overflow: hidden;
    }

    .doctor-message-wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-radius: 50%;
      transform: translate(50%, -50%);
    }

    .doctor-info {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2.5rem;
      position: relative;
      z-index: 1;
    }

    .doctor-avatar {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    .doctor-details h2 {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 0.3rem;
    }

    .doctor-details p {
      color: #666;
      font-size: 1rem;
    }

    .message-options {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .message-option {
      background: #f8f9fa;
      border: 2px solid transparent;
      border-radius: 16px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      text-align: center;
    }

    .message-option:hover {
      background: #f0f0ff;
      border-color: #667eea;
      transform: translateY(-3px);
    }

    .message-option.active {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-color: #667eea;
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.2);
    }

    .option-icon {
      font-size: 2rem;
      margin-bottom: 0.8rem;
    }

    .option-content h4 {
      color: #333;
      font-size: 1rem;
      margin-bottom: 0.3rem;
    }

    .option-content p {
      color: #888;
      font-size: 0.85rem;
    }

    .doctor-message-form {
      background: #f8f9fa;
      border-radius: 16px;
      padding: 2rem;
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .file-upload-area {
      border: 2px dashed #ccc;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: white;
    }

    .file-upload-area:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }

    .upload-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    .upload-content p {
      color: #333;
      margin-bottom: 0.3rem;
    }

    .upload-hint {
      color: #999;
      font-size: 0.85rem;
    }

    .attached-files {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .attached-file {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: white;
      border: 1px solid #e1e5e9;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .file-name {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .remove-file {
      background: none;
      border: none;
      color: #e74c3c;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
    }

    .priority-selector {
      margin-bottom: 1.5rem;
    }

    .priority-selector label {
      display: block;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.8rem;
    }

    .priority-options {
      display: flex;
      gap: 1rem;
    }

    .priority-btn {
      flex: 1;
      padding: 1rem;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      background: white;
      cursor: pointer;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .priority-btn:hover {
      border-color: #667eea;
    }

    .priority-btn.active {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }

    .send-doctor-btn {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      margin-top: 1rem;
    }

    .send-doctor-btn:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    .send-doctor-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .doctor-message-success {
      text-align: center;
      padding: 3rem 2rem;
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .success-animation span {
      font-size: 5rem;
      display: block;
      animation: bounceIn 0.5s ease;
    }

    @keyframes bounceIn {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }

    .doctor-message-success h3 {
      font-size: 1.8rem;
      color: #27ae60;
      margin: 1.5rem 0 0.5rem;
    }

    .doctor-message-success p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .expected-response {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #f0f9f4;
      padding: 1rem 2rem;
      border-radius: 50px;
      color: #27ae60;
      font-weight: 500;
      margin-bottom: 2rem;
    }

    .response-icon {
      font-size: 1.2rem;
    }

    .btn-new-message {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-new-message:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
    }

    /* Contact Main Section */
    .contact-main {
      padding: 2rem 0 5rem;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3rem;
    }

    /* Contact Form */
    .contact-form-wrapper {
      background: white;
      padding: 3rem;
      border-radius: 24px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    }

    .form-header {
      margin-bottom: 2rem;
    }

    .form-header h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .form-header p {
      color: #666;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 14px 18px;
      border: 2px solid #e8ecef;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #f8f9fa;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .error {
      color: #e74c3c;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    .submit-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-icon {
      transform: rotate(180deg);
    }

    .success-message {
      text-align: center;
      padding: 3rem 2rem;
      background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
      border-radius: 16px;
      margin-top: 2rem;
    }

    .success-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .success-message h3 {
      color: #155724;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .success-message p {
      color: #155724;
      margin-bottom: 1.5rem;
    }

    .btn-secondary {
      background: #155724;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: #0d3d16;
    }

    /* Map & Social */
    .map-social-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .map-container {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    }

    .map-placeholder {
      height: 250px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
    }

    .map-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .map-placeholder h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .map-placeholder p {
      color: #666;
      margin-bottom: 1rem;
    }

    .map-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .map-link:hover {
      color: #764ba2;
    }

    /* Social Section */
    .social-section {
      background: white;
      padding: 2rem;
      border-radius: 24px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    }

    .social-section h3 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
    }

    .social-links {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      color: white;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      transform: translateY(-3px);
    }

    .social-link.facebook {
      background: linear-gradient(135deg, #1877f2 0%, #0d65d9 100%);
    }

    .social-link.instagram {
      background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }

    .social-link.whatsapp {
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    }

    .social-link.twitter {
      background: linear-gradient(135deg, #1da1f2 0%, #0c85d0 100%);
    }

    .social-icon {
      font-size: 1.3rem;
    }

    /* Emergency Box */
    .emergency-box {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
      padding: 2rem;
      border-radius: 24px;
      text-align: center;
      color: white;
    }

    .emergency-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .emergency-box h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .emergency-box p {
      opacity: 0.9;
      margin-bottom: 1.5rem;
    }

    .emergency-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      background: white;
      color: #ff6b6b;
      padding: 1rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.1rem;
      transition: all 0.3s ease;
    }

    .emergency-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .info-cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 992px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }

      .hero-content h1 {
        font-size: 2.5rem;
      }
    }

    @media (max-width: 992px) {
      .message-options {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .contact-hero {
        height: 280px;
      }

      .hero-content h1 {
        font-size: 2rem;
      }

      .info-cards {
        grid-template-columns: 1fr;
      }

      .contact-info-section {
        margin-top: -60px;
      }

      .contact-form-wrapper {
        padding: 2rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .social-links {
        grid-template-columns: 1fr;
      }

      .doctor-message-wrapper {
        padding: 1.5rem;
      }

      .doctor-info {
        flex-direction: column;
        text-align: center;
      }

      .message-options {
        grid-template-columns: 1fr;
      }

      .doctor-message-form {
        padding: 1.5rem;
      }

      .priority-options {
        flex-direction: column;
      }

      .doctor-details h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class ContactComponent {

  submitted = false;
  detailsMessage = "";
  isLoading = false;

  selectedMessageType: string = '';
  isDoctorMessageLoading = false;
  doctorMessageSubmitted = false;
  urgencyLevel: string = 'medium';
  attachedFiles: File[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  doctorMessageForm = this.fb.group({
    patientName: ['', Validators.required],
    patientPhone: ['', Validators.required],
    fileNumber: [''],
    doctorMessage: ['', Validators.required]
  });

  contactForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
  });

   onSubmit() {
    if (this.contactForm.invalid) return;

    this.isLoading = true;

    const formData = new FormData();
    Object.entries(this.contactForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value as string);
    });

    const url = 'http://localhost:8000/contact_us';

    this.http.post<{message: string}>(url, formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.submitted = true
        this.detailsMessage = res.message;
      }
    });
  }


  resetForm() {
    this.contactForm.reset();
    this.submitted = false;
  }

  // Doctor Message Methods
  selectMessageType(type: string) {
    this.selectedMessageType = type;
    this.doctorMessageSubmitted = false;
  }

  getMessagePlaceholder(): string {
    switch (this.selectedMessageType) {
      case 'consultation':
        return 'صف الأعراض أو المشكلة التي تواجهها بالتفصيل...';
      case 'followup':
        return 'كيف تشعر بعد العلاج؟ هل هناك أي تحسن أو مشاكل؟';
      case 'report':
        return 'اكتب وصف للتقرير أو الصور المرفقة...';
      case 'urgent':
        return 'ما هي المشكلة العاجلة؟ صفها بالتفصيل...';
      default:
        return 'اكتب رسالتك هنا...';
    }
  }

  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        if (file.size <= 5 * 1024 * 1024) { // 5MB limit
          this.attachedFiles.push(file);
        }
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file = event.dataTransfer.files[i];
        if (file.size <= 5 * 1024 * 1024) {
          this.attachedFiles.push(file);
        }
      }
    }
  }

  removeFile(index: number) {
    this.attachedFiles.splice(index, 1);
  }

  onDoctorMessageSubmit() {
    if (this.doctorMessageForm.valid) {
      this.isDoctorMessageLoading = true;

      setTimeout(() => {
        this.isDoctorMessageLoading = false;
        this.doctorMessageSubmitted = true;

        console.log('Doctor message data:', {
          ...this.doctorMessageForm.value,
          messageType: this.selectedMessageType,
          urgencyLevel: this.urgencyLevel,
          attachedFiles: this.attachedFiles.map(f => f.name)
        });
      }, 1500);
    }
  }

  resetDoctorMessage() {
    this.doctorMessageForm.reset();
    this.doctorMessageSubmitted = false;
    this.selectedMessageType = '';
    this.attachedFiles = [];
    this.urgencyLevel = 'medium';
  }
}

