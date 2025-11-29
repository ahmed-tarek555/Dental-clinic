import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="services-page">
      <!-- Hero Section -->
      <section class="services-hero">
        <div class="container">
          <h1>خدماتنا الطبية</h1>
          <p>نقدم مجموعة شاملة من خدمات طب الأسنان بأحدث التقنيات</p>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="services-content">
        <div class="container">
          <div class="search-section">
            <h2>خدماتنا الطبية</h2>
            <div class="search-box">
              <input type="text" [(ngModel)]="searchTerm" (input)="searchServices()" placeholder="ابحث عن خدمة..." />
              <button (click)="clearSearch()" *ngIf="searchTerm">مسح</button>
            </div>
          </div>
          <div class="services-grid">
            <div class="service-card detailed" *ngFor="let service of filteredServices" (click)="selectService(service)">
              <div class="service-icon">{{ service.icon }}</div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <div class="service-info">
                <div class="service-price">{{ service.price }}</div>
                <div class="service-duration">{{ service.duration }}</div>
              </div>
              <button class="book-btn" (click)="bookService(service); $event.stopPropagation()">احجز الآن</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="process-section">
        <div class="container">
          <h2>خطوات العلاج</h2>
          <div class="process-steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>الاستشارة الأولية</h3>
              <p>فحص شامل وتشخيص الحالة وتحديد خطة العلاج المناسبة</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <h3>التخطيط للعلاج</h3>
              <p>وضع خطة علاجية مفصلة وتوضيح التكاليف والمواعيد</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <h3>بدء العلاج</h3>
              <p>تنفيذ خطة العلاج بأحدث التقنيات والأساليب</p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <h3>المتابعة</h3>
              <p>متابعة النتائج وضمان نجاح العلاج</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Service Details Modal -->
      <div class="service-modal" *ngIf="showDetails" (click)="closeDetails()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeDetails()">×</button>
          <div class="modal-header">
            <div class="service-icon">{{ selectedService?.icon }}</div>
            <h2>{{ selectedService?.title }}</h2>
          </div>
          <div class="modal-body">
            <p class="service-description">{{ selectedService?.description }}</p>
            <div class="service-details">
              <h3>تفاصيل الخدمة:</h3>
              <ul>
                <li *ngFor="let detail of selectedService?.details">{{ detail }}</li>
              </ul>
            </div>
            <div class="service-info">
              <div class="info-item">
                <strong>السعر:</strong> {{ selectedService?.price }}
              </div>
              <div class="info-item">
                <strong>المدة:</strong> {{ selectedService?.duration }}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-primary" (click)="bookService(selectedService)">احجز الآن</button>
            <button class="btn-secondary" (click)="closeDetails()">إغلاق</button>
          </div>
        </div>
      </div>
  `,
  styles: [`
    .services-page {
      min-height: 100vh;
    }

    .services-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .services-hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .services-hero p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .services-content {
      padding: 80px 0;
    }

    .search-section {
      text-align: center;
      margin-bottom: 3rem;
    }

    .search-section h2 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 2rem;
    }

    .search-box {
      display: flex;
      justify-content: center;
      gap: 1rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .search-box input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 25px;
      font-size: 1rem;
      outline: none;
    }

    .search-box input:focus {
      border-color: #667eea;
    }

    .search-box button {
      padding: 12px 20px;
      background: #ff6b6b;
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
    }

    .service-card.detailed {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .service-card.detailed:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    .service-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
    }

    .service-duration {
      background: #e8f4fd;
      color: #1976d2;
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.9rem;
    }

    .book-btn {
      width: 100%;
      padding: 10px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      margin-top: 1rem;
    }

    .book-btn:hover {
      background: #218838;
    }

    .service-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 15px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 20px;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #999;
    }

    .modal-header {
      padding: 2rem 2rem 1rem;
      text-align: center;
      border-bottom: 1px solid #eee;
    }

    .modal-header .service-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .modal-body {
      padding: 2rem;
    }

    .service-details ul {
      list-style: none;
      padding: 0;
    }

    .service-details li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.5rem;
    }

    .service-details li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #28a745;
      font-weight: bold;
    }

    .service-info {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
    }

    .info-item {
      margin: 0.5rem 0;
    }

    .modal-footer {
      padding: 1rem 2rem 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .service-card.detailed {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .service-card.detailed:hover {
      transform: translateY(-5px);
    }

    .service-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .service-card h3 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 1rem;
      text-align: center;
    }

    .service-card p {
      color: #666;
      margin-bottom: 1rem;
      text-align: center;
    }

    .service-card ul {
      list-style: none;
      padding: 0;
      margin-bottom: 1.5rem;
    }

    .service-card li {
      padding: 0.5rem 0;
      color: #666;
      position: relative;
      padding-left: 1.5rem;
    }

    .service-card li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #27ae60;
      font-weight: bold;
    }

    .service-price {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.8rem;
      border-radius: 8px;
      text-align: center;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .process-section {
      padding: 80px 0;
      background: #f8f9fa;
    }

    .process-section h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 3rem;
    }

    .process-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .step {
      text-align: center;
      padding: 2rem;
    }

    .step-number {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 1rem;
    }

    .step h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .step p {
      color: #666;
      line-height: 1.6;
    }

    .cta-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta-section p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .btn-primary {
      padding: 15px 30px;
      background: #ff6b6b;
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-primary:hover {
      background: #ff5252;
      transform: translateY(-2px);
    }

    .btn-primary.large {
      padding: 20px 40px;
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .services-hero h1 {
        font-size: 2.5rem;
      }
      
      .services-grid {
        grid-template-columns: 1fr;
      }
      
      .process-steps {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServicesComponent implements OnInit {
  selectedService: any = null;
  showDetails = false;
  filteredServices: any[] = [];
  searchTerm = '';

  services = [
    {
      id: 1,
      icon: '🦷',
      title: 'طب الأسنان العام',
      description: 'فحص شامل وعلاج مشاكل الأسنان الأساسية',
      details: ['فحص شامل للأسنان واللثة', 'حشو الأسنان', 'تنظيف الأسنان', 'علاج التسوس', 'استشارات طبية'],
      price: 'من 200 جنيه',
      duration: '30-60 دقيقة'
    },
    {
      id: 2,
      icon: '🌱',
      title: 'زراعة الأسنان',
      description: 'أحدث تقنيات زراعة الأسنان الدائمة',
      details: ['زراعة الأسنان الفردية', 'زراعة الأسنان المتعددة', 'زراعة الأسنان الكاملة', 'زراعة الأسنان الفورية', 'متابعة ما بعد الزراعة'],
      price: 'من 9000 جنيه',
      duration: '2-3 ساعات'
    },
    {
      id: 3,
      icon: '✨',
      title: 'تقويم الأسنان',
      description: 'تقويم متقدم للحصول على ابتسامة مثالية',
      details: ['التقويم المعدني التقليدي', 'التقويم الشفاف', 'التقويم الداخلي', 'تقويم الأطفال', 'متابعة دورية'],
      price: 'من 25000 جنيه',
      duration: '1-2 سنوات'
    },
    {
      id: 4,
      icon: '🚨',
      title: 'جراحات الطوارئ',
      description: 'خدمات طوارئ على مدار الساعة',
      details: ['علاج آلام الأسنان الحادة', 'خلع الأسنان الطارئ', 'علاج التهابات اللثة', 'إصابات الأسنان', 'خدمة الطوارئ 24/7'],
      price: 'من 800 جنيه',
      duration: '30-90 دقيقة'
    },
    {
      id: 5,
      icon: '👶',
      title: 'طب أسنان الأطفال',
      description: 'رعاية خاصة ومتخصصة لأسنان الأطفال',
      details: ['فحص أسنان الأطفال', 'حشو أسنان الأطفال', 'خلع أسنان الأطفال', 'تقويم الأطفال', 'توعية الأطفال'],
      price: 'من 500 جنيه',
      duration: '20-45 دقيقة'
    },
    {
      id: 6,
      icon: '💎',
      title: 'فينير الأسنان',
      description: 'هوليود سمايل للحصول على ابتسامة نجمية',
      details: ['فينير السيراميك', 'فينير البورسلين', 'فينير اللومينير', 'تصميم الابتسامة', 'متابعة النتائج'],
      price: 'من 5000 جنيه',
      duration: '2-3 ساعات'
    },
    {
      id: 7,
      icon: '⚡',
      title: 'علاج العصب',
      description: 'علاج وحشو العصب بأحدث الطرق',
      details: ['علاج عصب الأسنان الأمامية', 'علاج عصب الأسنان الخلفية', 'حشو العصب', 'علاج التهابات العصب', 'متابعة العلاج'],
      price: 'من 1800 جنيه',
      duration: '1-2 ساعات'
    },
    {
      id: 8,
      icon: '💡',
      title: 'تبييض الأسنان',
      description: 'تبييض بالليزر للحصول على أسنان بيضاء ناصعة',
      details: ['تبييض الأسنان بالليزر', 'تبييض الأسنان المنزلي', 'تبييض الأسنان المهني', 'تبييض الأسنان السريع', 'متابعة النتائج'],
      price: 'من 5000 جنيه',
      duration: '1-2 ساعات'
    },
    {
      id: 9,
      icon: '🏗️',
      title: 'تركيبات ثابتة',
      description: 'تركيب طربوش و كوبري [ بورسيلين و زيركون و اي ماكس ] ',
      details: [ 'كوبري', 'طربوش '],
      price: 'من 1800 جنيه',
      duration: '30-90 دقيقة'
    },
    {
      id: 10,
      icon: '🧩',
      title: 'تركيبات متحركة',
      description: 'تركيب طقم متحرك للفك العلوي والسفلي',
      details: [ 'طقم متحرك علوي وسفلي'],
      price: 'من 4500 جنيه',
      duration: '30-90 دقيقة'
    },
    {
      id: 11,
      icon: '🧩',
      title: 'تنضيف و تلميع الأسنان',
      description: 'إزالة الجير و علاج مشاكل اللثه',
      details: [ 'إزالة جير الأسنان وتلميع الأسنان وعلاج مشاكل اللثة و إزالة التصبغات'],
      price: 'من 600 جنيه',
      duration: '30-90 دقيقة'
    },
  ];

  ngOnInit() {
    this.filteredServices = [...this.services];
  }

  selectService(service: any) {
    this.selectedService = service;
    this.showDetails = true;
  }

  closeDetails() {
    this.showDetails = false;
    this.selectedService = null;
  }

  searchServices() {
    if (this.searchTerm.trim() === '') {
      this.filteredServices = [...this.services];
    } else {
      this.filteredServices = this.services.filter(service =>
        service.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredServices = [...this.services];
  }

  bookService(service: any) {
    // يمكن إضافة منطق حجز الخدمة هنا
    console.log('Booking service:', service.title);
    // يمكن توجيه المستخدم لصفحة الحجز مع تفاصيل الخدمة
  }
}
