import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="articles-page">
      <!-- Hero Section -->
      <section class="articles-hero">
        <div class="container">
          <h1>مقالات طب الأسنان</h1>
          <p>ابق على اطلاع بأحدث المقالات والمعلومات الطبية</p>
        </div>
      </section>

      <!-- Search and Filter Section -->
      <section class="search-section">
        <div class="container">
          <div class="search-controls">
            <div class="search-box">
              <input type="text" [(ngModel)]="searchTerm" (input)="filterArticles()" placeholder="ابحث في المقالات..." />
              <button (click)="clearSearch()" *ngIf="searchTerm">مسح</button>
            </div>
            <div class="category-filter">
              <select [(ngModel)]="selectedCategory" (change)="filterArticles()">
                <option value="">جميع الفئات</option>
                <option value="زراعة الأسنان">زراعة الأسنان</option>
                <option value="تقويم الأسنان">تقويم الأسنان</option>
                <option value="تجميل الأسنان">تجميل الأسنان</option>
                <option value="علاج العصب">علاج العصب</option>
                <option value="طب أسنان الأطفال">طب أسنان الأطفال</option>
                <option value="الوقاية">الوقاية</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Articles Grid -->
      <section class="articles-content">
        <div class="container">
          <div class="articles-grid">
            <article class="article-card" *ngFor="let article of filteredArticles" (click)="viewArticle(article)">
              <div class="article-image">
                <div class="image-placeholder">
                  <span>{{ article.category }}</span>
                </div>
                <div class="article-date">{{ article.date }}</div>
              </div>
              <div class="article-content">
                <div class="article-category">{{ article.category }}</div>
                <h3>{{ article.title }}</h3>
                <p>{{ article.excerpt }}</p>
                <div class="article-meta">
                  <span class="read-time">{{ article.readTime }} دقيقة قراءة</span>
                  <button class="read-more">اقرأ المزيد...</button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Article Modal -->
      <div class="article-modal" *ngIf="selectedArticle" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeModal()">×</button>
          <div class="article-header">
            <div class="article-category">{{ selectedArticle.category }}</div>
            <h1>{{ selectedArticle.title }}</h1>
            <div class="article-meta">
              <span class="date">{{ selectedArticle.date }}</span>
              <span class="read-time">{{ selectedArticle.readTime }} دقيقة قراءة</span>
            </div>
          </div>
          <div class="article-body">
            <div class="article-image">
              <div class="image-placeholder">
                <span>{{ selectedArticle.category }}</span>
              </div>
            </div>
            <div class="article-text">
              <div *ngFor="let section of selectedArticle.content" class="content-section">
                <h3 *ngIf="section.heading">{{ section.heading }}</h3>
                <p *ngIf="section.text">{{ section.text }}</p>
                <ul *ngIf="section.list">
                  <li *ngFor="let item of section.list">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="article-footer">
            <div class="share-buttons">
              <button class="share-btn">مشاركة</button>
              <button class="print-btn">طباعة</button>
            </div>
            <a routerLink="/booking" class="btn-primary">احجز استشارة</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .articles-page {
      min-height: 100vh;
    }

    .articles-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .articles-hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .articles-hero p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .search-section {
      padding: 40px 0;
      background: #f8f9fa;
    }

    .search-controls {
      display: flex;
      gap: 2rem;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-box {
      display: flex;
      gap: 1rem;
      max-width: 400px;
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

    .category-filter select {
      padding: 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
    }

    .articles-content {
      padding: 60px 0;
    }

    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .article-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .article-card:hover {
      transform: translateY(-5px);
    }

    .article-image {
      position: relative;
      height: 200px;
    }

    .article-image .image-placeholder {
      width: 100%;
      height: 100%;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: #999;
    }

    .article-date {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.9rem;
    }

    .article-content {
      padding: 1.5rem;
    }

    .article-category {
      background: #e8f4fd;
      color: #1976d2;
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.9rem;
      display: inline-block;
      margin-bottom: 1rem;
    }

    .article-content h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .article-content p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .article-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .read-time {
      color: #999;
      font-size: 0.9rem;
    }

    .read-more {
      background: #667eea;
      color: white;
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .read-more:hover {
      background: #5a6fd8;
    }

    .article-modal {
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
      max-width: 900px;
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

    .article-header {
      padding: 2rem 2rem 1rem;
      border-bottom: 1px solid #eee;
    }

    .article-header h1 {
      font-size: 2rem;
      color: #333;
      margin: 1rem 0;
      line-height: 1.3;
    }

    .article-meta {
      display: flex;
      gap: 2rem;
      color: #666;
      font-size: 0.9rem;
    }

    .article-body {
      padding: 2rem;
    }

    .article-body .image-placeholder {
      width: 100%;
      height: 300px;
      background: #f0f0f0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
      font-size: 1.2rem;
      color: #999;
    }

    .content-section {
      margin-bottom: 2rem;
    }

    .content-section h3 {
      color: #333;
      margin-bottom: 1rem;
    }

    .content-section p {
      color: #666;
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .content-section ul {
      list-style: none;
      padding: 0;
    }

    .content-section li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.5rem;
      color: #666;
    }

    .content-section li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
    }

    .article-footer {
      padding: 1rem 2rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #eee;
    }

    .share-buttons {
      display: flex;
      gap: 1rem;
    }

    .share-btn, .print-btn {
      background: #6c757d;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-primary {
      background: #667eea;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }

    .btn-primary:hover {
      background: #5a6fd8;
    }

    @media (max-width: 768px) {
      .search-controls {
        flex-direction: column;
        gap: 1rem;
      }
      
      .articles-grid {
        grid-template-columns: 1fr;
      }
      
      .article-footer {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class ArticlesComponent implements OnInit {
  searchTerm = '';
  selectedCategory = '';
  filteredArticles: any[] = [];
  selectedArticle: any = null;

  articles = [
    {
      id: 1,
      title: 'زراعة الأسنان الفورية',
      category: 'زراعة الأسنان',
      date: 'أبريل 12, 2024',
      readTime: 8,
      excerpt: 'كيفية إجراء زراعة الأسنان الفورية وتكاليفها المتوقعة ومزاياها وعيوبها مقارنة بالزراعات التقليدية.',
      content: [
        {
          heading: 'ما هي زراعة الأسنان الفورية؟',
          text: 'زراعة الأسنان الفورية هي تقنية حديثة تسمح بوضع الزرعة والتركيب في نفس الجلسة، بدلاً من الانتظار عدة أشهر كما في الطرق التقليدية.'
        },
        {
          heading: 'مزايا الزراعة الفورية',
          list: [
            'توفير الوقت والجهد',
            'نتائج فورية',
            'تقليل عدد الجلسات',
            'تحسين الثقة بالنفس'
          ]
        },
        {
          heading: 'التكاليف المتوقعة',
          text: 'تتراوح تكلفة زراعة الأسنان الفورية بين 8000-15000 جنيه مصري للسن الواحد، حسب نوع الزرعة والتركيب المستخدم.'
        }
      ]
    },
    {
      id: 2,
      title: 'زراعة الأسنان: الدليل الشامل لعام 2024',
      category: 'زراعة الأسنان',
      date: 'يونيو 15, 2024',
      readTime: 12,
      excerpt: 'أصبحت زراعة الأسنان حلاً شائعاً بشكل متزايد لفقدان الأسنان، حيث توفر بديلاً طويل الأمد وطبيعي المظهر عن الأطقم والجسور.',
      content: [
        {
          heading: 'مقدمة عن زراعة الأسنان',
          text: 'زراعة الأسنان هي الحل الأمثل لاستبدال الأسنان المفقودة، حيث توفر ثباتاً ومظهراً طبيعياً لا يمكن الحصول عليه من الطرق التقليدية.'
        },
        {
          heading: 'أنواع زراعات الأسنان',
          list: [
            'الزراعة التقليدية',
            'الزراعة الفورية',
            'زراعة العظام',
            'الزراعة المجهرية'
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'فينير الأسنان',
      category: 'تجميل الأسنان',
      date: 'أبريل 24, 2024',
      readTime: 6,
      excerpt: 'فينير الأسنان عبارة عن قشور رقيقة ومنتظمة تغطي الأسنان الأمامية للأشخاص الذين يريدون ابتسامة هوليود.',
      content: [
        {
          heading: 'ما هو فينير الأسنان؟',
          text: 'الفينير هو قشرة رقيقة من البورسلين أو السيراميك توضع على السطح الأمامي للأسنان لتحسين مظهرها.'
        },
        {
          heading: 'أنواع الفينير',
          list: [
            'فينير البورسلين',
            'فينير السيراميك',
            'فينير اللومينير',
            'الفينير المؤقت'
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'طربوش الأسنان عيوبه ومميزاته',
      category: 'تجميل الأسنان',
      date: 'مايو 8, 2024',
      readTime: 7,
      excerpt: 'طربوش الأسنان هو من أهم التركيبات التي تستخدم في علاج الأسنان، وهو تركيبة تماثل لونها لون الأسنان.',
      content: [
        {
          heading: 'ما هو طربوش الأسنان؟',
          text: 'الطربوش هو تركيبة تغطي السن بالكامل لحمايته واستعادة وظيفته الطبيعية.'
        },
        {
          heading: 'مميزات الطربوش',
          list: [
            'حماية السن من الكسر',
            'استعادة الوظيفة الطبيعية',
            'مظهر طبيعي',
            'متانة عالية'
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'الابتسامة اللثوية أسبابها وطرق علاجها',
      category: 'تجميل الأسنان',
      date: 'مايو 14, 2024',
      readTime: 9,
      excerpt: 'الابتسامة اللثوية هي حالة تظهر فيها كمية كبيرة من أنسجة اللثة فوق الأسنان العلوية عند الابتسامة.',
      content: [
        {
          heading: 'ما هي الابتسامة اللثوية؟',
          text: 'الابتسامة اللثوية تحدث عندما تظهر كمية كبيرة من اللثة عند الابتسامة، مما يؤثر على المظهر الجمالي.'
        },
        {
          heading: 'أسباب الابتسامة اللثوية',
          list: [
            'عوامل وراثية',
            'نمو مفرط للثة',
            'أسنان قصيرة',
            'عضلات الشفة القوية'
          ]
        }
      ]
    },
    {
      id: 6,
      title: 'تقويم الأسنان للكبار',
      category: 'تقويم الأسنان',
      date: 'يونيو 20, 2024',
      readTime: 10,
      excerpt: 'تقويم الأسنان لم يعد مقتصراً على الأطفال، فالكبار أيضاً يمكنهم الحصول على ابتسامة مثالية.',
      content: [
        {
          heading: 'تقويم الأسنان للكبار',
          text: 'تقويم الأسنان للكبار أصبح شائعاً جداً مع تطور التقنيات الحديثة التي توفر خيارات أكثر راحة.'
        },
        {
          heading: 'أنواع التقويم للكبار',
          list: [
            'التقويم الشفاف',
            'التقويم الداخلي',
            'التقويم المعدني',
            'التقويم السريع'
          ]
        }
      ]
    }
  ];

  ngOnInit() {
    this.filteredArticles = [...this.articles];
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter(article => {
      const matchesSearch = !this.searchTerm || 
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        article.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredArticles = [...this.articles];
  }

  viewArticle(article: any) {
    this.selectedArticle = article;
  }

  closeModal() {
    this.selectedArticle = null;
  }
}
