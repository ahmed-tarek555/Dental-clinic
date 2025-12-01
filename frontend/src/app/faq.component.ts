import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="faq-page">
      <!-- Hero Section -->
      <section class="faq-hero">
        <div class="container">
          <h1>الأسئلة الشائعة</h1>
          <p>إجابات على أكثر الأسئلة شيوعاً حول خدماتنا الطبية</p>
        </div>
      </section>

      <!-- Search Section -->
      <section class="search-section">
        <div class="container">
          <div class="search-box">
            <input type="text" [(ngModel)]="searchTerm" (input)="filterFAQs()" placeholder="ابحث في الأسئلة..." />
            <button (click)="clearSearch()" *ngIf="searchTerm">مسح</button>
          </div>
        </div>
      </section>

      <!-- FAQ Categories -->
      <section class="faq-categories">
        <div class="container">
          <div class="category-tabs">
            <button 
              *ngFor="let category of categories" 
              (click)="selectCategory(category)"
              [class.active]="selectedCategory === category"
              class="category-tab">
              {{ category }}
            </button>
          </div>
        </div>
      </section>

      <!-- FAQ Content -->
      <section class="faq-content">
        <div class="container">
          <div class="faq-list">
            <div class="faq-item" *ngFor="let faq of filteredFAQs">
              <div class="faq-question" (click)="toggleFAQ(faq)">
                <h3>{{ faq.question }}</h3>
                <span class="toggle-icon" [class.open]="faq.isOpen">+</span>
              </div>
              <div class="faq-answer" [class.open]="faq.isOpen">
                <div class="answer-content">
                  <p *ngIf="faq.answer">{{ faq.answer }}</p>
                  <ul *ngIf="faq.list">
                    <li *ngFor="let item of faq.list">{{ item }}</li>
                  </ul>
                  <div *ngIf="faq.tips" class="tips">
                    <h4>نصائح مهمة:</h4>
                    <ul>
                      <li *ngFor="let tip of faq.tips">{{ tip }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="container">
          <div class="contact-content">
            <h2>لم تجد إجابة لسؤالك؟</h2>
            <p>فريقنا الطبي المتخصص جاهز للإجابة على جميع استفساراتك</p>
            <div class="contact-options">
              <a routerLink="/booking" class="btn-primary">احجز استشارة</a>
              <a href="tel:+201507556382" class="btn-secondary">اتصل بنا</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .faq-page {
      min-height: 100vh;
    }

    .faq-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .faq-hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .faq-hero p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .search-section {
      padding: 40px 0;
      background: #f8f9fa;
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

    .faq-categories {
      padding: 40px 0;
      background: white;
    }

    .category-tabs {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .category-tab {
      padding: 12px 24px;
      background: #f8f9fa;
      border: 2px solid #e1e5e9;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .category-tab:hover {
      background: #e8f4fd;
      border-color: #667eea;
    }

    .category-tab.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    .faq-content {
      padding: 60px 0;
    }

    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-item {
      background: white;
      border-radius: 15px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 1rem;
      overflow: hidden;
    }

    .faq-question {
      padding: 1.5rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.3s ease;
    }

    .faq-question:hover {
      background: #f8f9fa;
    }

    .faq-question h3 {
      font-size: 1.2rem;
      color: #333;
      margin: 0;
      flex: 1;
    }

    .toggle-icon {
      font-size: 1.5rem;
      color: #667eea;
      font-weight: bold;
      transition: transform 0.3s ease;
    }

    .toggle-icon.open {
      transform: rotate(45deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .faq-answer.open {
      max-height: 500px;
    }

    .answer-content {
      padding: 0 1.5rem 1.5rem;
      border-top: 1px solid #eee;
    }

    .answer-content p {
      color: #666;
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .answer-content ul {
      list-style: none;
      padding: 0;
      margin-bottom: 1rem;
    }

    .answer-content li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.5rem;
      color: #666;
    }

    .answer-content li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
    }

    .tips {
      background: #e8f4fd;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .tips h4 {
      color: #1976d2;
      margin-bottom: 0.5rem;
    }

    .tips ul {
      margin: 0;
    }

    .contact-section {
      padding: 80px 0;
      background: #f8f9fa;
      text-align: center;
    }

    .contact-content h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .contact-content p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
    }

    .contact-options {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      padding: 15px 30px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background: #5a6fd8;
    }

    .btn-secondary {
      background: transparent;
      color: #667eea;
      border: 2px solid #667eea;
    }

    .btn-secondary:hover {
      background: #667eea;
      color: white;
    }

    @media (max-width: 768px) {
      .category-tabs {
        flex-direction: column;
        align-items: center;
      }
      
      .contact-options {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class FAQComponent implements OnInit {
  searchTerm = '';
  selectedCategory = 'الكل';
  filteredFAQs: any[] = [];
  
  categories = ['الكل', 'زراعة الأسنان', 'تقويم الأسنان', 'تجميل الأسنان', 'علاج العصب', 'طب أسنان الأطفال', 'الوقاية'];

  faqs = [
    {
      id: 1,
      category: 'زراعة الأسنان',
      question: 'ما هي زراعة الأسنان؟',
      answer: 'زراعة الأسنان هي بديل صناعي لجذر السن الطبيعي، مصنوع من التيتانيوم، يتم وضعه في عظم الفك لاستبدال السن المفقود.',
      isOpen: false
    },
    {
      id: 2,
      category: 'زراعة الأسنان',
      question: 'كم تستغرق عملية زراعة الأسنان؟',
      answer: 'تستغرق عملية زراعة الأسنان عادة من 3-6 أشهر، حسب حالة العظم وصحة المريض العامة.',
      isOpen: false
    },
    {
      id: 3,
      category: 'زراعة الأسنان',
      question: 'هل زراعة الأسنان مؤلمة؟',
      answer: 'لا، يتم إجراء زراعة الأسنان تحت التخدير الموضعي، لذلك لن تشعر بأي ألم أثناء العملية.',
      tips: [
        'تناول المسكنات حسب وصفة الطبيب',
        'تجنب الأطعمة الصلبة في الأيام الأولى',
        'حافظ على نظافة الفم'
      ],
      isOpen: false
    },
    {
      id: 4,
      category: 'تقويم الأسنان',
      question: 'في أي عمر يمكن تركيب التقويم؟',
      answer: 'يمكن تركيب التقويم في أي عمر، لكن النتائج تكون أفضل عند الأطفال والمراهقين.',
      isOpen: false
    },
    {
      id: 5,
      category: 'تقويم الأسنان',
      question: 'كم يستغرق علاج التقويم؟',
      answer: 'يستغرق علاج التقويم عادة من 12-24 شهراً، حسب حالة الأسنان ومدى تعقيد المشكلة.',
      isOpen: false
    },
    {
      id: 6,
      category: 'تجميل الأسنان',
      question: 'ما هو الفينير؟',
      answer: 'الفينير هو قشرة رقيقة من البورسلين أو السيراميك توضع على السطح الأمامي للأسنان لتحسين مظهرها.',
      isOpen: false
    },
    {
      id: 7,
      category: 'تجميل الأسنان',
      question: 'كم يدوم الفينير؟',
      answer: 'يدوم الفينير عادة من 10-15 عاماً مع العناية المناسبة.',
      tips: [
        'تجنب قضم الأطعمة الصلبة',
        'حافظ على نظافة الأسنان',
        'زر الطبيب بانتظام'
      ],
      isOpen: false
    },
    {
      id: 8,
      category: 'علاج العصب',
      question: 'متى أحتاج لعلاج العصب؟',
      answer: 'تحتاج لعلاج العصب عندما يصل التسوس أو العدوى إلى عصب السن، مما يسبب ألماً شديداً.',
      isOpen: false
    },
    {
      id: 9,
      category: 'علاج العصب',
      question: 'هل علاج العصب مؤلم؟',
      answer: 'لا، يتم إجراء علاج العصب تحت التخدير الموضعي، لذلك لن تشعر بأي ألم أثناء العلاج.',
      isOpen: false
    },
    {
      id: 10,
      category: 'طب أسنان الأطفال',
      question: 'متى يجب أن أبدأ في تنظيف أسنان طفلي؟',
      answer: 'يجب البدء في تنظيف أسنان الطفل بمجرد ظهور أول سن، باستخدام فرشاة ناعمة ومعجون أسنان مناسب للأطفال.',
      isOpen: false
    },
    {
      id: 11,
      category: 'طب أسنان الأطفال',
      question: 'متى يجب أن أزور طبيب الأسنان لأول مرة؟',
      answer: 'يجب زيارة طبيب الأسنان لأول مرة عند بلوغ الطفل سن السنة، أو عند ظهور أول سن.',
      isOpen: false
    },
    {
      id: 12,
      category: 'الوقاية',
      question: 'كم مرة يجب أن أنظف أسناني؟',
      answer: 'يجب تنظيف الأسنان مرتين يومياً على الأقل، صباحاً ومساءً، لمدة دقيقتين في كل مرة.',
      tips: [
        'استخدم فرشاة ناعمة',
        'استخدم معجون أسنان يحتوي على الفلورايد',
        'استخدم خيط الأسنان يومياً'
      ],
      isOpen: false
    },
    {
      id: 13,
      category: 'الوقاية',
      question: 'كم مرة يجب أن أزور طبيب الأسنان؟',
      answer: 'يجب زيارة طبيب الأسنان كل 6 أشهر للفحص الدوري والتنظيف.',
      isOpen: false
    },
    {
      id: 14,
      category: 'الوقاية',
      question: 'ما هي أفضل طريقة لمنع تسوس الأسنان؟',
      answer: 'أفضل طريقة لمنع تسوس الأسنان هي الحفاظ على نظافة الفم، وتجنب السكريات، وزيارة الطبيب بانتظام.',
      list: [
        'تنظيف الأسنان مرتين يومياً',
        'استخدام خيط الأسنان',
        'تجنب السكريات والمشروبات الغازية',
        'زيارة الطبيب كل 6 أشهر'
      ],
      isOpen: false
    }
  ];

  ngOnInit() {
    this.filteredFAQs = [...this.faqs];
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterFAQs();
  }

  filterFAQs() {
    this.filteredFAQs = this.faqs.filter(faq => {
      const matchesSearch = !this.searchTerm || 
        faq.question.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'الكل' || 
        faq.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredFAQs = [...this.faqs];
  }

  toggleFAQ(faq: any) {
    faq.isOpen = !faq.isOpen;
  }
}
