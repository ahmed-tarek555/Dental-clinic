import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-page">
      <!-- Hero Section -->
      <section class="about-hero">
        <div class="container">
          <h1>من نحن</h1>
          <p>عيادة الهلال للاسنان - رؤيتنا ورسالتنا</p>
        </div>
      </section>

      <!-- Main Content -->
      <section class="about-content">
        <div class="container">
          <div class="content-grid">
            <div class="text-content">
              <h2>مرحباً بكم في عيادة الهلال للاسنان</h2>
              <p>بخبرة أكثر من 10 أعوام وأمهر أطباء الأسنان في المنطقة، نتربع الآن على عرش مجال طب الأسنان وتجميل الابتسامات بأحدث التقنيات العالمية. لذلك أصبحنا الاختيار الأول للعائلات والمرضى في المنطقة.</p>

              <h3>رؤيتنا</h3>
              <p>أن نكون الرائدين في مجال طب الأسنان وتجميل الابتسامات، وأن نقدم أفضل الخدمات الطبية بأعلى معايير الجودة والرعاية.</p>

              <h3>رسالتنا</h3>
              <p>نلتزم بتقديم رعاية طبية متميزة وشاملة لجميع المرضى، باستخدام أحدث التقنيات والطرق العلاجية، مع التركيز على الراحة والرضا التام للمريض.</p>

              <h3>قيمنا</h3>
              <ul>
                <li><strong>الجودة:</strong> نلتزم بأعلى معايير الجودة في جميع خدماتنا</li>
                <li><strong>الرعاية:</strong> نقدم رعاية شخصية ومتخصصة لكل مريض</li>
                <li><strong>الابتكار:</strong> نستخدم أحدث التقنيات والطرق العلاجية</li>
                <li><strong>الثقة:</strong> نبني علاقات طويلة الأمد مع مرضانا</li>
                <li><strong>الشفافية:</strong> نقدم معلومات واضحة ومفهومة</li>
              </ul>
            </div>

            <div class="image-content">
              <div class="image-placeholder">
                <span>صورة فريق العمل</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section">
        <div class="container">
          <h2>فريق العمل</h2>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-photo">
                <span>د. أحمد محمد</span>
              </div>
              <h3>د. أحمد محمد</h3>
              <p>استشاري طب الأسنان العام</p>
              <p>خبرة 15 عام في طب الأسنان</p>
            </div>
            <div class="team-member">
              <div class="member-photo">
                <span>د. فاطمة علي</span>
              </div>
              <h3>د. فاطمة علي</h3>
              <p>استشارية تقويم الأسنان</p>
              <p>خبرة 12 عام في تقويم الأسنان</p>
            </div>
            <div class="team-member">
              <div class="member-photo">
                <span>د. محمد حسن</span>
              </div>
              <h3>د. محمد حسن</h3>
              <p>استشاري زراعة الأسنان</p>
              <p>خبرة 10 أعوام في زراعة الأسنان</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Facilities Section -->
      <section class="facilities">
        <div class="container">
          <h2>مرافقنا</h2>
          <div class="facilities-grid">
            <div class="facility-item">
              <div class="facility-icon">🏥</div>
              <h3>عيادات مجهزة بأحدث التقنيات</h3>
              <p>عيادات مريحة ومجهزة بأحدث الأجهزة الطبية</p>
            </div>
            <div class="facility-item">
              <div class="facility-icon">🛡️</div>
              <h3>معايير السلامة العالية</h3>
              <p>نلتزم بأعلى معايير السلامة والنظافة</p>
            </div>
            <div class="facility-item">
              <div class="facility-icon">🚗</div>
              <h3>مواقف سيارات مجانية</h3>
              <p>مواقف واسعة ومجانية لراحة المرضى</p>
            </div>
            <div class="facility-item">
              <div class="facility-icon">☕</div>
              <h3>منطقة انتظار مريحة</h3>
              <p>منطقة انتظار مريحة مع خدمات المشروبات</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-page {
      min-height: 100vh;
    }

    .about-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .about-hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .about-hero p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .about-content {
      padding: 80px 0;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 4rem;
      align-items: start;
    }

    .text-content h2 {
      font-size: 2.2rem;
      color: #333;
      margin-bottom: 1.5rem;
    }

    .text-content h3 {
      font-size: 1.5rem;
      color: #667eea;
      margin: 2rem 0 1rem 0;
    }

    .text-content p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #666;
      margin-bottom: 1.5rem;
    }

    .text-content ul {
      list-style: none;
      padding: 0;
    }

    .text-content li {
      padding: 0.8rem 0;
      color: #666;
      line-height: 1.6;
    }

    .text-content li strong {
      color: #333;
    }

    .image-placeholder {
      background: #f0f0f0;
      height: 500px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: #999;
    }

    .team-section {
      padding: 80px 0;
      background: #f8f9fa;
    }

    .team-section h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 3rem;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .team-member {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .member-photo {
      width: 150px;
      height: 150px;
      background: #e1e5e9;
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #666;
    }

    .team-member h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .team-member p {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .facilities {
      padding: 80px 0;
    }

    .facilities h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 3rem;
    }

    .facilities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .facility-item {
      text-align: center;
      padding: 2rem;
    }

    .facility-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .facility-item h3 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .facility-item p {
      color: #666;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .about-hero h1 {
        font-size: 2.5rem;
      }

      .content-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .team-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}
