import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="team-page">
      <!-- Hero Section -->
      <section class="team-hero">
        <div class="container">
          <h1>فريقنا من الأخصائيين والاستشاريين في طب الأسنان</h1>
          <p>فريق من أفضل الأطباء المتخصصين في جميع مجالات طب الأسنان</p>
        </div>
      </section>

      <!-- Main Doctor Section -->
      <section class="main-doctor">
        <div class="container">
          <div class="doctor-profile">
            <div class="doctor-image">
              <div class="image-placeholder">
                <span>د. أحمد طلعت</span>
              </div>
            </div>
            <div class="doctor-info">
              <h2>دكتور أحمد طلعت</h2>
              <h3>استشاري طب الأسنان وزراعة الأسنان</h3>
              <p>من أهم الشخصيات البارزة في مجال طب وزراعة الأسنان في مصر والشرق الأوسط، حيث قام بتأسيس وإدارة واحدة من أبرز وأكبر المراكز المتخصصة في زراعة وتجميل الأسنان بالشرق الأوسط.</p>

              <div class="doctor-credentials">
                <div class="credential">
                  <strong>التخصص:</strong> زراعة الأسنان وتجميل الأسنان
                </div>
                <div class="credential">
                  <strong>الخبرة:</strong> أكثر من 15 عام
                </div>
                <div class="credential">
                  <strong>الشهادات:</strong> دكتوراه في زراعة الأسنان من جامعة القاهرة
                </div>
                <div class="credential">
                  <strong>اللغات:</strong> العربية، الإنجليزية، الفرنسية
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Team Grid -->
      <section class="team-grid-section">
        <div class="container">
          <h2>فريق العمل</h2>
          <div class="team-grid">
            <div class="team-member" *ngFor="let member of teamMembers">
              <div class="member-photo">
                <div class="image-placeholder">
                  <span>{{ member.name }}</span>
                </div>
              </div>
              <div class="member-info">
                <h3>{{ member.name }}</h3>
                <p class="specialty">{{ member.specialty }}</p>
                <p class="experience">{{ member.experience }}</p>
                <div class="member-skills">
                  <span *ngFor="let skill of member.skills" class="skill-tag">{{ skill }}</span>
                </div>
                <button class="view-profile" (click)="viewProfile(member)">عرض الملف الشخصي</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Doctor Profile Modal -->
      <div class="doctor-modal" *ngIf="selectedDoctor" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeModal()">×</button>
          <div class="modal-header">
            <div class="doctor-image">
              <div class="image-placeholder">
                <span>{{ selectedDoctor.name }}</span>
              </div>
            </div>
            <div class="doctor-details">
              <h2>{{ selectedDoctor.name }}</h2>
              <h3>{{ selectedDoctor.specialty }}</h3>
              <p>{{ selectedDoctor.experience }}</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="doctor-bio">
              <h4>نبذة عن الطبيب</h4>
              <p>{{ selectedDoctor.bio }}</p>
            </div>
            <div class="doctor-education">
              <h4>التعليم والشهادات</h4>
              <ul>
                <li *ngFor="let education of selectedDoctor.education">{{ education }}</li>
              </ul>
            </div>
            <div class="doctor-skills">
              <h4>المهارات المتخصصة</h4>
              <div class="skills-grid">
                <span *ngFor="let skill of selectedDoctor.skills" class="skill-tag">{{ skill }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" (click)="closeModal()">إغلاق</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-page {
      min-height: 100vh;
    }

    .team-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .team-hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .team-hero p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .main-doctor {
      padding: 80px 0;
      background: white;
    }

    .doctor-profile {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
      align-items: center;
    }

    .doctor-image {
      text-align: center;
    }

    .image-placeholder {
      width: 300px;
      height: 300px;
      background: #f0f0f0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: #999;
      margin: 0 auto;
    }

    .doctor-info h2 {
      font-size: 2.2rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .doctor-info h3 {
      font-size: 1.5rem;
      color: #667eea;
      margin-bottom: 1.5rem;
    }

    .doctor-info p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #666;
      margin-bottom: 2rem;
    }

    .doctor-credentials {
      margin-bottom: 2rem;
    }

    .credential {
      margin: 1rem 0;
      color: #666;
    }

    .credential strong {
      color: #333;
    }

    .doctor-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-primary, .btn-secondary {
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
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

    .team-grid-section {
      padding: 80px 0;
      background: #f8f9fa;
    }

    .team-grid-section h2 {
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
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      text-align: center;
    }

    .member-photo {
      margin-bottom: 1.5rem;
    }

    .member-photo .image-placeholder {
      width: 150px;
      height: 150px;
      margin: 0 auto;
    }

    .member-info h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .specialty {
      color: #667eea;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .experience {
      color: #666;
      margin-bottom: 1rem;
    }

    .member-skills {
      margin-bottom: 1.5rem;
    }

    .skill-tag {
      display: inline-block;
      background: #e8f4fd;
      color: #1976d2;
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.9rem;
      margin: 0.2rem;
    }

    .view-profile {
      background: #28a745;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .view-profile:hover {
      background: #218838;
    }

    .doctor-modal {
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
      max-width: 800px;
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
      padding: 2rem;
      display: flex;
      gap: 2rem;
      border-bottom: 1px solid #eee;
    }

    .modal-header .image-placeholder {
      width: 120px;
      height: 120px;
    }

    .doctor-details h2 {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .doctor-details h3 {
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .modal-body {
      padding: 2rem;
    }

    .modal-body h4 {
      color: #333;
      margin-bottom: 1rem;
    }

    .modal-body ul {
      list-style: none;
      padding: 0;
    }

    .modal-body li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.5rem;
    }

    .modal-body li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #28a745;
      font-weight: bold;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .modal-footer {
      padding: 1rem 2rem 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .doctor-profile {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .modal-header {
        flex-direction: column;
        text-align: center;
      }

      .doctor-actions {
        justify-content: center;
      }
    }
  `]
})
export class TeamComponent implements OnInit {
  selectedDoctor: any = null;

  teamMembers = [
    {
      name: "د. مصطفي المهدي ",
      specialty: "استشاري تقويم الأسنان",
      experience: "خبرة 12 عام في تقويم الأسنان",
      skills: ["تقويم الأطفال", "التقويم الشفاف", "التقويم المعدني"],
      bio: "خبيرة في تقويم الأسنان مع خبرة واسعة في علاج جميع أنواع مشاكل الأسنان",
      education: [
        "دكتوراه في تقويم الأسنان من جامعة عين شمس",
        "ماجستير في طب الأسنان من جامعة القاهرة",
        "دبلومة في التقويم الشفاف من ألمانيا"
      ]
    },
    {
      name: "د. أحمد ماجد",
      specialty: "استشاري زراعة الأسنان",
      experience: "خبرة 10 أعوام في زراعة الأسنان",
      skills: ["الزراعة الفورية", "زراعة العظام", "الزراعة المتقدمة"],
      bio: "متخصص في زراعة الأسنان بأحدث التقنيات العالمية",
      education: [
        "دكتوراه في زراعة الأسنان من جامعة الإسكندرية",
        "شهادة في الزراعة الفورية من سويسرا",
        "دبلومة في زراعة العظام من إيطاليا"
      ]
    },
    {
      name: "د. محمد محمود",
      specialty: "استشاري طب أسنان الأطفال",
      experience: "خبرة 8 أعوام في طب أسنان الأطفال",
      skills: ["علاج الأطفال", "التخدير الآمن", "الوقاية"],
      bio: "متخصص في رعاية أسنان الأطفال بطريقة آمنة ومريحة",
      education: [
        "دكتوراه في طب أسنان الأطفال من جامعة القاهرة",
        "شهادة في التخدير الآمن للأطفال",
        "دبلومة في طب الأسنان الوقائي"
      ]
    },
    {
      name: "د. أحمد علي",
      specialty: "استشاري علاج العصب",
      experience: "خبرة 14 عام في علاج العصب",
      skills: ["علاج العصب المتقدم", "الجراحة المجهرية", "الإنقاذ"],
      bio: "خبير في علاج العصب والجراحة المجهرية",
      education: [
        "دكتوراه في علاج العصب من جامعة القاهرة",
        "شهادة في الجراحة المجهرية من أمريكا",
        "دبلومة في إنقاذ الأسنان"
      ]
    },
    {
      name: "د. رحمة رضا ",
      specialty: "استشارية تجميل الأسنان",
      experience: "خبرة 9 أعوام في تجميل الأسنان",
      skills: ["الفينير", "التبييض", "التجميل الشامل"],
      bio: "متخصصة في تجميل الأسنان وابتسامة هوليود",
      education: [
        "دكتوراه في تجميل الأسنان من جامعة عين شمس",
        "شهادة في الفينير من كوريا",
        "دبلومة في التبييض المتقدم"
      ]
    },
    {
      name: "د . كريم ياسر",
      specialty: "استشاري جراحة الفم والأسنان",
      experience: "خبرة 16 عام في الجراحة",
      skills: ["جراحة الفم", "خلع الأسنان", "جراحة الوجه"],
      bio: "خبير في جراحة الفم والأسنان والوجه والفكين",
      education: [
        "دكتوراه في جراحة الفم والأسنان من جامعة القاهرة",
        "شهادة في جراحة الوجه من فرنسا",
        "دبلومة في الجراحة التجميلية"
      ]
    }
  ];

  ngOnInit() {
    // يمكن إضافة منطق التحميل هنا
  }

  viewProfile(member: any) {
    this.selectedDoctor = member;
  }

  closeModal() {
    this.selectedDoctor = null;
  }
}

