# Çağdaş Müzik Platformu (CMP) - Hostinger Dağıtım & Yönetim Rehberi

Bu proje, **Çağdaş Müzik Platformu** için geliştirilmiş modern, performans odaklı web platformu ve tam teşekküllü **Yönetim Paneli (Admin Dashboard)** sistemidir.

Platform, karmaşık sunucu kurulumlarına (Node.js/npm) ihtiyaç duymadan **Hostinger Paylaşımlı Web Hosting (cPanel / hPanel)** paketlerinde doğrudan çalışacak şekilde sıfır bağımlılıkla (Zero-Dependency Vanilla JS + PHP + JSON/MySQL) mimarilenmiştir.

---

## 📁 Proje Dosya ve Klasör Yapısı

```text
public_html/
│
├── index.html                  # Ziyaretçilerin gördüğü ana web platformu
├── assets/                     # Resimler, logolar, afişler
│   └── images/                 # CMP logoları ve görseller
│
├── admin/                      # Kurumsal Yönetim Paneli
│   ├── index.html              # Yönetim konsolu arayüzü (LinkedIn / Tailwind stili)
│   └── admin.js                # Yönetim paneli mantığı & veri bağlayıcıları
│
├── api/                        # Hostinger PHP Uç Noktaları
│   ├── save.php                # Panel verilerini data/content.json'a güvenle yazan API
│   ├── data.php                # content.json verilerini JSON formatında sunan API
│   ├── application.php         # Başvuru formlarından gelen verileri kaydeden API
│   └── db_config.php           # Opsiyonel Hostinger MySQL PDO yapılandırması
│
├── data/                       # Dinamik JSON Veri Tabanı
│   └── content.json            # 40 kişilik ekip, etkinlikler, bloglar, başvurular
│
└── database/                   # Opsiyonel SQL Veritabanı
    └── schema.sql              # Hostinger MySQL için üretim şeması ve seed verileri
```

---

## 🚀 1. Hostinger'a Yükleme (Adım Adım Kurulum)

### Adım 1: Dosyaları Hazırlama
Tüm proje klasörünü bilgisayarınızda bir ZIP arşivine dönüştürün (`cagdas-muzik.zip`).

### Adım 2: Hostinger hPanel'e Giriş
1. [Hostinger hPanel](https://hpanel.hostinger.com) hesabınıza giriş yapın.
2. Web sitenizin yanındaki **Yönet (Manage)** butonuna tıklayın.
3. Sol menüden **Dosyalar (Files) ➔ Dosya Yöneticisi (File Manager)** seçeneğine gidin ve `public_html` klasörünü açın.

### Adım 3: Dosyaları Yükleme ve Çıkarma
1. Dosya Yöneticisi üst menüsündeki **Yükle (Upload)** ikonuna tıklayın ve `cagdas-muzik.zip` dosyasını seçin.
2. Yükleme tamamlandığında zip dosyasına sağ tıklayıp **Çıkar (Extract)** deyin ve hedef klasör olarak `public_html` seçin.
3. ZIP dosyasını silebilirsiniz.

### Adım 4: Dosya İzinleri (CHMOD) Kontrolü
PHP API'sinin verileri sorunsuz yazabilmesi için:
- `public_html/data/` klasörünün izinlerinin **755** (veya gerekirse **775**) olduğundan emin olun.
- `public_html/data/content.json` dosyasının izinlerinin **644** (veya **664**) olduğundan emin olun.

> **İpucu:** Hostinger Dosya Yöneticisi'nde klasöre sağ tıklayıp *İzinleri Değiştir (Permissions)* diyerek kontrol edebilirsiniz.

---

## 🔐 2. Admin Paneline Giriş ve Kullanım

- **Yönetim Paneli Adresi:** `https://siteniz.com/admin/`
- **Kullanıcı Adı:** `admin`
- **Yönetici Şifresi:** `admin123`

### Yönetim Paneli Modülleri:
1. **Genel Bakış (Dashboard):** Toplam etkinlik, blog yazısı, 40 kişilik ekip üyesi dağılımı ve gelen başvuruların canlı özet istatistikleri.
2. **Etkinlikler & Takvim:** Yeni konser/panel ekleme, bilet linki tanımlama, afiş güncelleme, taslak/aktif durumunu tek tıkla değiştirme.
3. **Blog & Düşünce:** Ses kuramı ve çağdaş müzik makalelerini düzenleme ve yayınlama.
4. **Ekip & Sanat Kurulu:** Platformun 8 koordinasyon biriminde (Yönetim, Sanat Kurulu, Müzikoloji, Prodüksiyon, Medya, Eğitim, Arşiv, Sponsorluk) yer alan tüm üyeleri yönetme.
5. **Dijital Ses Arşivi:** YouTube veya ses platformu bağlantılarını, icracı, şef ve besteci bilgilerini kataloglama.
6. **Gönüllü Başvuruları:** Web sitesindeki formdan gelen başvuruları inceleme, 'Yeni Başvuru' / 'İncelendi' / 'Davet Gönderildi' / 'Arşivlendi' durumlarına atama ve CSV olarak Excel'e aktarma.
7. **Sayfa Metinleri & Ayarlar:** Sitenin en üstündeki Duyuru Bandı'nı açıp kapama, Hero sloganlarını, sosyal medya hesaplarını ve iletişim bilgilerini güncelleme.
8. **Hostinger & Veri Senkronu:** Tek tıkla güncel `content.json` dosyasını indirme veya var olan bir yedeği yükleme.

---

## 🔄 3. Veri Kaydetme ve Çalışma Mantığı

Admin paneli **Çift Katmanlı Güvenlik & Senkronizasyon (Dual-Persistence)** mimarisine sahiptir:
1. **Sunucu Modu (Hostinger PHP):** Paneldeki her işlem otomatik olarak `api/save.php` üzerinden `data/content.json` dosyasına atomik kilit (`LOCK_EX`) ile yazılır. Bu sayede web sitesindeki tüm kullanıcılar değişiklikleri anında görür.
2. **LocalStorage Yedek Modu:** Sunucuya erişilemediği veya internet kesintisi yaşandığı anlarda panel tarayıcı hafızasını kullanarak verileri korur.
3. **JSON İndir / Yükle:** Dilediğiniz zaman tek tıkla `content.json` dosyasını bilgisayarınıza indirebilir, Hostinger hPanel üzerinden manuel olarak da yükleyebilirsiniz.

---

## 🗄️ 4. Opsiyonel: Hostinger MySQL Veritabanı Kurulumu

Proje varsayılan olarak sıfır yapılandırma gerektiren yüksek hızlı `JSON` mimarisiyle çalışır. İleride ilişkisel bir MySQL veritabanına geçmek isterseniz:

1. Hostinger hPanel'de **Veritabanları (Databases) ➔ MySQL Veritabanları** bölümüne gidin.
2. Yeni bir veritabanı adı, kullanıcı adı ve şifre oluşturun (örn: `u123456_cagdasmuzik`).
3. **phpMyAdmin**'e giriş yapın.
4. Sol menüden veritabanınızı seçip **İçe Aktar (Import)** sekmesine tıklayın.
5. `database/schema.sql` dosyasını seçip **Git (Go)** butonuna basarak tüm tabloları ve örnek verileri yükleyin.
6. `api/db_config.php` dosyasını Hostinger Dosya Yöneticisi'nde açıp veritabanı adı, kullanıcı ve şifrenizi girin:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'u123456_cagdasmuzik');
   define('DB_USER', 'u123456_cmp_admin');
   define('DB_PASS', 'BelirlediginizSifre123!');
   ```

---

## ❓ 5. Sık Karşılaşılan Sorunlar ve Çözümleri

- **"Veriler kaydedilmedi, dosya yazma hatası" uyarısı alıyorum:**
  Hostinger Dosya Yöneticisi'nden `data` klasörünün izinlerini **755** veya **775** yapınız.
- **Admin paneline girdiğimde şifre yanlış diyor:**
  Varsayılan şifre `admin123`'tür.
- **Yaptığım değişiklikler ana sayfada görünmüyor:**
  Tarayıcınızın önbelleğini temizlemek için `Ctrl + F5` (Mac için `Cmd + Shift + R`) tuşlarına basınız.

---

© 2026 **Çağdaş Müzik Platformu**. Tüm Hakları Saklıdır.  
Geliştirici & Sistem Mimarisi: **Efe Özkan**
