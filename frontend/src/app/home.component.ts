import { Component, OnInit, HostListener, ViewChild, ElementRef, NgZone} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="hero" [class.scrolled]="isScrolled">
      <div class="hero-content">
        <h1>عيادة الهلال للاسنان</h1>
        <h2>شريكك الموثوق في العناية بالأسنان</h2>
        <p>بخبرة أكثر من 10 أعوام وأمهر أطباء الأسنان، نقدم لك أفضل الخدمات الطبية بأحدث التقنيات العالمية</p>
        <div class="hero-buttons">
          <a routerLink="/ai" class="btn-primary">تقنية الذكاء الاصطناعي</a>
          <button (click)="scrollToSection('why-choose-us')" class="btn-secondary">لماذا تختارنا؟</button>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="statistics">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">+100</div>
            <div class="stat-label">أطباء متخصصون</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">+50</div>
            <div class="stat-label">غرف العيادة</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">+10</div>
            <div class="stat-label">سنوات من الخبرة</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">+13000</div>
            <div class="stat-label">عملاء سعداء</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="why-choose-us" class="why-choose-us">
      <div class="container">
        <h2>لماذا تختارنا؟</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>ضمان مدى الحياة على زراعة الأسنان</h3>
            <p>نقدم ضمان شامل مدى الحياة على جميع عمليات زراعة الأسنان</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>المتابعة الإلكترونية</h3>
            <p>نظام متابعة إلكتروني متطور لضمان أفضل النتائج</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👨‍⚕️</div>
            <h3>أطباء متخصصون</h3>
            <p>فريق من الأطباء المتخصصين للرد على كافة استفساراتكم</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>خدمة سريعة</h3>
            <p>حجز المواعيد والاستشارات الطبية بسهولة وسرعة</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
      <div class="container">
        <h2>خدماتنا الطبية</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🦷</div>
            <h3>طب الأسنان العام</h3>
            <p>فحص شامل وعلاج مشاكل الأسنان الأساسية</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🌱</div>
            <h3>زراعة الأسنان</h3>
            <p>أحدث تقنيات زراعة الأسنان الدائمة</p>
          </div>
          <div class="service-card">
            <div class="service-icon">✨</div>
            <h3>تقويم الأسنان</h3>
            <p>تقويم متقدم للحصول على ابتسامة مثالية</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🚨</div>
            <h3>جراحات الطوارئ</h3>
            <p>خدمات طوارئ على مدار الساعة</p>
          </div>
          <div class="service-card">
            <div class="service-icon">👶</div>
            <h3>طب أسنان الأطفال</h3>
            <p>رعاية خاصة ومتخصصة لأسنان الأطفال</p>
          </div>
          <div class="service-card">
            <div class="service-icon">💎</div>
            <h3>فينير الأسنان</h3>
            <p>هوليود سمايل للحصول على ابتسامة نجمية</p>
          </div>
          <div class="service-card">
            <div class="service-icon">⚡</div>
            <h3>علاج العصب</h3>
            <p>علاج وحشو العصب بأحدث الطرق</p>
          </div>
          <div class="service-card">
            <div class="service-icon">💡</div>
            <h3>تبييض الأسنان</h3>
            <p>تبييض بالليزر للحصول على أسنان بيضاء ناصعة</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>من نحن</h2>
            <h3>عيادة الهلال للاسنان</h3>
            <p>بخبرة أكثر من 10 أعوام وأمهر أطباء الأسنان في المنطقة، نتربع الآن على عرش مجال طب الأسنان وتجميل الابتسامات بأحدث التقنيات العالمية. لذلك أصبحنا الاختيار الأول للعائلات والمرضى في المنطقة.</p>
            <p>يمكنك زيارتنا في مقرنا الرئيسي حيث نقدم أفضل الخدمات الطبية في بيئة مريحة وآمنة.</p>
            <a routerLink="/about" class="btn-primary">اعرف المزيد</a>
          </div>
          <div class="about-image">
            <div class="image-placeholder">
              <span>صورة العيادة</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2>آراء عملائنا</h2>
        <div class="testimonials-carousel">
          <div class="testimonial-card active" *ngFor="let testimonial of testimonials; let i = index"
               [class.active]="i === currentTestimonial">
            <div class="stars">{{ getStars(testimonial.rating) }}</div>
            <p>"{{ testimonial.text }}"</p>
            <div class="client-info">
              <strong>{{ testimonial.name }}</strong>
              <span>{{ testimonial.role }}</span>
            </div>
          </div>
          <div class="testimonial-dots">
            <button *ngFor="let testimonial of testimonials; let i = index"
                    (click)="goToTestimonial(i)"
                    [class.active]="i === currentTestimonial"
                    class="dot"></button>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Booking Assistant Section -->
    <section class="ai-booking-section">
      <div class="container">
        <div class="ai-booking-wrapper">
          <div class="ai-intro">
            <div class="ai-badge">
              <span class="ai-icon">🤖</span>
              <span>مدعوم بالذكاء الاصطناعي</span>
            </div>
            <h2>احجز موعدك مع مساعدنا الذكي</h2>
            <p>تحدث مع مساعدنا الذكي لحجز موعدك بسهولة وسرعة. أخبرنا باحتياجاتك وسنساعدك في اختيار أفضل موعد متاح.</p>
            <div class="ai-features">
              <div class="ai-feature">
                <span>⚡</span>
                <span>حجز فوري</span>
              </div>
              <div class="ai-feature">
                <span>🕐</span>
                <span>متاح 24/7</span>
              </div>
              <div class="ai-feature">
                <span>💬</span>
                <span>محادثة طبيعية</span>
              </div>
            </div>
          </div>

          <div class="ai-chat-container">
            <div class="chat-header">
              <div class="chat-header-info">
                <div class="ai-avatar">
                  <span>🦷</span>
                </div>
                <div>
                  <h4>مساعد العيادة الذكي</h4>
                  <span class="status-online">● متصل الآن</span>
                </div>
              </div>
              <button class="reset-chat-btn" (click)="resetChat()" title="بدء محادثة جديدة">
                🔄
              </button>
            </div>

            <div class="chat-messages" #chatMessages>
              <div *ngFor="let message of chatMessages_list"
                   class="message"
                   [class.user]="message.isUser"
                   [class.ai]="!message.isUser">
                <div class="message-avatar" *ngIf="!message.isUser">🤖</div>
                <div class="message-content">
                  <p [innerHTML]="message.text"></p>
                  <span class="message-time">{{ message.time }}</span>
                </div>
                <div class="message-avatar user-avatar" *ngIf="message.isUser">👤</div>
              </div>

              <div class="typing-indicator" *ngIf="isTyping">
                <div class="message-avatar">🤖</div>
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            <div class="quick-replies" *ngIf="quickReplies.length > 0">
              <button *ngFor="let reply of quickReplies"
                      (click)="sendQuickReply(reply)"
                      class="quick-reply-btn">
                {{ reply }}
              </button>
            </div>

            <div class="chat-input-container">
              <input
                type="text"
                [(ngModel)]="userMessage"
                (keyup.enter)="sendMessage()"
                placeholder="اكتب رسالتك هنا..."
                [disabled]="isTyping"
                class="chat-input"
              />
              <button (click)="sendMessage()" [disabled]="!userMessage.trim() || isTyping" class="send-btn">
                <span>إرسال</span>
                <span class="send-icon">➤</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .hero-content h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-weight: 400;
      opacity: 0.9;
    }

    .statistics {
      padding: 60px 0;
      background: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      text-align: center;
    }

    .stat-item {
      padding: 1rem;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1.1rem;
      color: #666;
      font-weight: 500;
    }

    .why-choose-us {
      padding: 80px 0;
      background: #f8f9fa;
    }

    .why-choose-us h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 3rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      padding: 15px 30px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-primary {
      background: #ff6b6b;
      color: white;
    }

    .btn-primary:hover {
      background: #ff5252;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: white;
      color: #667eea;
    }

    .btn-primary.large {
      padding: 20px 40px;
      font-size: 1.2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .services {
      padding: 80px 0;
      background: #f8f9fa;
    }

    .services h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #333;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .service-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-5px);
    }

    .service-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .service-card h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .service-card p {
      color: #666;
      line-height: 1.6;
    }

    .about {
      padding: 80px 0;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .about h3 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #667eea;
    }

    .about p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #666;
      margin-bottom: 1.5rem;
    }

    .image-placeholder {
      background: #f0f0f0;
      height: 400px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: #999;
    }

    .testimonials {
      padding: 80px 0;
      background: #f8f9fa;
    }

    .testimonials h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #333;
    }

    .testimonials-carousel {
      position: relative;
      max-width: 600px;
      margin: 0 auto;
    }

    .testimonial-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      text-align: center;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.5s ease;
      position: absolute;
      width: 100%;
    }

    .testimonial-card.active {
      opacity: 1;
      transform: translateX(0);
      position: relative;
    }

    .testimonial-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: #ccc;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .dot.active {
      background: #667eea;
    }

    .stars {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .testimonial-card p {
      font-style: italic;
      margin-bottom: 1.5rem;
      color: #666;
      line-height: 1.6;
    }

    .client-info strong {
      display: block;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .client-info span {
      color: #999;
    }

    /* AI Booking Section Styles */
    .ai-booking-section {
      padding: 100px 0;
      background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
      position: relative;
      overflow: hidden;
    }

    .ai-booking-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 30%);
      pointer-events: none;
    }

    .ai-booking-wrapper {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    .ai-intro {
      color: white;
    }

    .ai-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .ai-icon {
      font-size: 1.2rem;
    }

    .ai-intro h2 {
      font-size: 2.8rem;
      margin-bottom: 1.5rem;
      line-height: 1.3;
      background: linear-gradient(90deg, #fff, #00d4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .ai-intro p {
      font-size: 1.2rem;
      opacity: 0.9;
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .ai-features {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .ai-feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      font-size: 0.95rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .ai-feature:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }

    .ai-chat-container {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 24px;
      overflow: hidden;
      box-shadow:
        0 25px 50px rgba(0, 0, 0, 0.3),
        0 0 100px rgba(102, 126, 234, 0.2);
      display: flex;
      flex-direction: column;
      height: 550px;
    }

    .chat-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1.2rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-header-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .ai-avatar {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .chat-header h4 {
      color: white;
      margin: 0;
      font-size: 1.1rem;
    }

    .status-online {
      color: #7fff7f;
      font-size: 0.85rem;
    }

    .reset-chat-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }

    .reset-chat-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: rotate(180deg);
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
    }

    .message {
      display: flex;
      gap: 0.8rem;
      align-items: flex-start;
      animation: messageSlide 0.3s ease;
    }

    @keyframes messageSlide {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message.user {
      flex-direction: row-reverse;
    }

    .message-avatar {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .message-avatar.user-avatar {
      background: linear-gradient(135deg, #00d4ff 0%, #667eea 100%);
    }

    .message-content {
      max-width: 75%;
      padding: 1rem 1.2rem;
      border-radius: 18px;
      position: relative;
    }

    .message.ai .message-content {
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      border-bottom-left-radius: 4px;
    }

    .message.user .message-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .message-content p {
      margin: 0;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .message-time {
      font-size: 0.75rem;
      opacity: 0.6;
      margin-top: 0.5rem;
      display: block;
    }

    .typing-indicator {
      display: flex;
      gap: 0.8rem;
      align-items: center;
    }

    .typing-dots {
      display: flex;
      gap: 4px;
      padding: 1rem;
      background: white;
      border-radius: 18px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    .typing-dots span {
      width: 8px;
      height: 8px;
      background: #667eea;
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out;
    }

    .typing-dots span:nth-child(1) { animation-delay: 0s; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typingBounce {
      0%, 80%, 100% {
        transform: scale(0.7);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .quick-replies {
      padding: 0.8rem 1.5rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      background: #f8f9fa;
      border-top: 1px solid #eee;
    }

    .quick-reply-btn {
      background: white;
      border: 2px solid #667eea;
      color: #667eea;
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .quick-reply-btn:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }

    .chat-input-container {
      padding: 1rem 1.5rem;
      background: white;
      border-top: 1px solid #eee;
      display: flex;
      gap: 1rem;
    }

    .chat-input {
      flex: 1;
      padding: 1rem 1.5rem;
      border: 2px solid #e1e5e9;
      border-radius: 50px;
      font-size: 1rem;
      transition: all 0.3s ease;
      outline: none;
    }

    .chat-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    .chat-input:disabled {
      background: #f5f5f5;
    }

    .send-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .send-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }

    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .send-icon {
      transform: rotate(180deg);
    }

    @media (max-width: 992px) {
      .ai-booking-wrapper {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .ai-intro {
        text-align: center;
      }

      .ai-intro h2 {
        font-size: 2.2rem;
      }

      .ai-features {
        justify-content: center;
      }

      .ai-chat-container {
        height: 500px;
      }
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }

      .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }

      .ai-booking-section {
        padding: 60px 0;
      }

      .ai-intro h2 {
        font-size: 1.8rem;
      }

      .ai-intro p {
        font-size: 1rem;
      }

      .ai-features {
        flex-direction: column;
        align-items: center;
      }

      .ai-chat-container {
        height: 450px;
        border-radius: 16px;
      }

      .chat-header {
        padding: 1rem;
      }

      .chat-messages {
        padding: 1rem;
      }

      .quick-replies {
        padding: 0.5rem 1rem;
      }

      .quick-reply-btn {
        font-size: 0.8rem;
        padding: 0.5rem 1rem;
      }

      .chat-input-container {
        padding: 0.8rem 1rem;
      }

      .send-btn {
        padding: 0.8rem 1.2rem;
      }

      .send-btn span:first-child {
        display: none;
      }
    }
  `]
})
export class HomeComponent implements OnInit {

  @ViewChild('chatMessages') chatMessagesEl!: ElementRef;

  isScrolled = false;
  currentTestimonial = 0;

  // AI Chat properties
  userMessage = '';
  isTyping = false;
  chatMessages_list: { text: string; isUser: boolean; time: string }[] = [];
  quickReplies: string[] = [];
  bookingState = {
    step: 0,
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  };

  services = [
    'طب الأسنان العام',
    'زراعة الأسنان',
    'تقويم الأسنان',
    'جراحات الطوارئ',
    'طب أسنان الأطفال',
    'علاج العصب',
    'فينير الأسنان',
    'تبييض الأسنان'
  ];

  availableTimes = [
    '9:00 صباحاً',
    '10:00 صباحاً',
    '11:00 صباحاً',
    '12:00 ظهراً',
    '2:00 بعد الظهر',
    '3:00 بعد الظهر',
    '4:00 بعد الظهر',
    '5:00 مساءً'
  ];

  testimonials = [
    {
      name: "أحمد محمد",
      role: "مريض",
      text: "خدمة ممتازة وطاقم طبي محترف جداً. أنصح الجميع بالتعامل مع هذه العيادة.",
      rating: 5
    },
    {
      name: "فاطمة أحمد",
      role: "مريضة",
      text: "تجربة رائعة من البداية للنهاية. الأطباء متخصصون جداً والنتائج مذهلة.",
      rating: 5
    },
    {
      name: "محمد علي",
      role: "مريض",
      text: "أفضل عيادة أسنان في المنطقة. الخدمة سريعة والنتائج ممتازة.",
      rating: 5
    },
    {
      name: "سارة محمود",
      role: "مريضة",
      text: "معاملة راقية ونتائج مذهلة. شكراً لكم على الخدمة المتميزة.",
      rating: 5
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.startTestimonialRotation();
    this.initializeChat();
  }

  @HostListener('window:keydown', ['$event'])
  handleShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      this.router.navigate(['/adminLogin']);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  startTestimonialRotation() {
    setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  goToTestimonial(index: number) {
    this.currentTestimonial = index;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getStars(rating: number): string {
    return '⭐'.repeat(rating);
  }

  // AI Chat Methods
  initializeChat() {
    setTimeout(() => {
      this.addAIMessage('مرحباً بك في عيادة الأسنان المتطورة! 🦷✨');
      setTimeout(() => {
        this.addAIMessage('أنا مساعدك الذكي، سأساعدك في حجز موعدك بسهولة. هل تود البدء في حجز موعد جديد؟');
        this.quickReplies = ['نعم، أريد الحجز', 'استفسار عن الخدمات', 'معرفة أوقات العمل'];
      }, 800);
    }, 500);
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  }

  addAIMessage(text: string) {
    this.chatMessages_list.push({
      text,
      isUser: false,
      time: this.getCurrentTime()
    });
    this.scrollToBottom();
  }

  addUserMessage(text: string) {
    this.chatMessages_list.push({
      text,
      isUser: true,
      time: this.getCurrentTime()
    });
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatMessagesEl) {
        const el = this.chatMessagesEl.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 100);
  }

  sendMessage() {
    if (!this.userMessage.trim() || this.isTyping) return;

    const message = this.userMessage.trim();
    this.addUserMessage(message);
    this.userMessage = '';
    this.quickReplies = [];
    this.processUserMessage(message);
  }

  sendQuickReply(reply: string) {
    this.userMessage = reply;
    this.sendMessage();
  }

  processUserMessage(message: string) {
    this.isTyping = true;

    setTimeout(() => {
      this.isTyping = false;

      const lowerMessage = message.toLowerCase();

      // Handle based on current booking step
      switch (this.bookingState.step) {
        case 0:
          if (lowerMessage.includes('نعم') || lowerMessage.includes('الحجز') || lowerMessage.includes('موعد')) {
            this.bookingState.step = 1;
            this.addAIMessage('رائع! 🎉 دعني أساعدك في حجز موعدك. أولاً، ما هو اسمك الكريم؟');
            this.quickReplies = [];
          } else if (lowerMessage.includes('خدمات') || lowerMessage.includes('استفسار')) {
            this.addAIMessage('نقدم مجموعة واسعة من الخدمات تشمل:<br>🦷 طب الأسنان العام<br>🌱 زراعة الأسنان<br>✨ تقويم الأسنان<br>🚨 جراحات الطوارئ<br>👶 طب أسنان الأطفال<br>⚡ علاج العصب<br>💎 فينير الأسنان<br>💡 تبييض الأسنان');
            setTimeout(() => {
              this.addAIMessage('هل تريد حجز موعد لأي من هذه الخدمات؟');
              this.quickReplies = ['نعم، أريد الحجز', 'لا، شكراً'];
            }, 800);
          } else if (lowerMessage.includes('أوقات') || lowerMessage.includes('عمل') || lowerMessage.includes('مواعيد')) {
            this.addAIMessage('أوقات العمل لدينا:<br>📅 السبت - الخميس: 9 صباحاً - 9 مساءً<br>🕌 الجمعة: مغلق<br><br>خدمات الطوارئ متاحة على مدار الساعة! 🚨');
            this.quickReplies = ['حجز موعد', 'شكراً'];
          } else {
            this.addAIMessage('أنا هنا لمساعدتك! يمكنني مساعدتك في:');
            this.quickReplies = ['حجز موعد', 'استفسار عن الخدمات', 'معرفة أوقات العمل'];
          }
          break;

        case 1:
          this.bookingState.name = message;
          this.bookingState.step = 2;
          this.addAIMessage(`أهلاً ${message}! سعيد بالتعرف عليك 😊`);
          setTimeout(() => {
            this.addAIMessage('من فضلك، أدخل رقم هاتفك للتواصل معك:');
            this.quickReplies = [];
          }, 600);
          break;

        case 2:
          const phoneRegex = /^01[0-9]{9}$/;
          if (phoneRegex.test(message.replace(/\s/g, ''))) {
            this.bookingState.phone = message;
            this.bookingState.step = 3;
            this.addAIMessage('تمام! 📱 رقم الهاتف مسجل.');
            setTimeout(() => {
              this.addAIMessage('ما هي الخدمة التي تحتاجها؟');
              this.quickReplies = this.services.slice(0, 4);
            }, 600);
          } else {
            this.addAIMessage('عذراً، يبدو أن رقم الهاتف غير صحيح. يرجى إدخال رقم صحيح يبدأ بـ 01 ويتكون من 11 رقم.');
          }
          break;

        case 3:
          const selectedService = this.services.find(s => message.includes(s) || s.includes(message));
          if (selectedService) {
            this.bookingState.service = selectedService;
          } else {
            this.bookingState.service = message;
          }
          this.bookingState.step = 4;
          this.addAIMessage(`ممتاز! اخترت: ${this.bookingState.service} ✅`);
          setTimeout(() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dateStr = tomorrow.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            this.addAIMessage(`ما هو التاريخ المناسب لك؟<br>أقرب موعد متاح: ${dateStr}`);
            this.quickReplies = ['غداً', 'بعد غد', 'الأسبوع القادم'];
          }, 600);
          break;

        case 4:
          this.bookingState.date = message;
          this.bookingState.step = 5;
          this.addAIMessage(`تمام! 📅 التاريخ: ${message}`);
          setTimeout(() => {
            this.addAIMessage('اختر الوقت المناسب لك:');
            this.quickReplies = this.availableTimes.slice(0, 4);
          }, 600);
          break;

        case 5:
          this.bookingState.time = message;
          this.bookingState.step = 6;
          this.addAIMessage('🎊 رائع! دعني أؤكد بيانات الحجز:');
          setTimeout(() => {
            this.addAIMessage(
              `<strong>ملخص الحجز:</strong><br>` +
              `👤 الاسم: ${this.bookingState.name}<br>` +
              `📱 الهاتف: ${this.bookingState.phone}<br>` +
              `🦷 الخدمة: ${this.bookingState.service}<br>` +
              `📅 التاريخ: ${this.bookingState.date}<br>` +
              `🕐 الوقت: ${this.bookingState.time}<br><br>` +
              `هل البيانات صحيحة؟`
            );
            this.quickReplies = ['نعم، تأكيد الحجز', 'تعديل البيانات'];
          }, 800);
          break;

        case 6:
          if (lowerMessage.includes('نعم') || lowerMessage.includes('تأكيد')) {
            this.bookingState.step = 7;
            this.addAIMessage('⏳ جاري تأكيد الحجز...');
            setTimeout(() => {
              this.addAIMessage(
                `✅ <strong>تم تأكيد الحجز بنجاح!</strong><br><br>` +
                `🎉 شكراً لك ${this.bookingState.name}!<br>` +
                `سيتم التواصل معك قريباً لتأكيد الموعد.<br><br>` +
                `📞 للاستفسارات: اتصل على 01XXXXXXXXX<br><br>` +
                `نتطلع لرؤيتك! 😊🦷`
              );
              this.quickReplies = ['حجز موعد آخر', 'شكراً'];
            }, 1500);
          } else {
            this.bookingState.step = 1;
            this.addAIMessage('لا مشكلة! دعنا نبدأ من جديد. ما هو اسمك الكريم؟');
            this.quickReplies = [];
          }
          break;

        case 7:
          if (lowerMessage.includes('حجز') || lowerMessage.includes('آخر')) {
            this.resetChat();
          } else {
            this.addAIMessage('شكراً لتواصلك معنا! نتمنى لك يوماً سعيداً 😊');
            this.quickReplies = ['حجز موعد جديد'];
          }
          break;
      }

      this.scrollToBottom();
    }, 1000 + Math.random() * 500);
  }

  resetChat() {
    this.chatMessages_list = [];
    this.quickReplies = [];
    this.bookingState = {
      step: 0,
      name: '',
      phone: '',
      service: '',
      date: '',
      time: ''
    };
    this.initializeChat();
  }
}

