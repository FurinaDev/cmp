-- ============================================================
-- ÇAĞDAŞ MÜZİK PLATFORMU - HOSTINGER MYSQL VERİTABANI ŞEMASI
-- Sürüm: 2.0 (Production Ready)
-- Karakter Seti: utf8mb4 (Türkçe ve Özel Karakter Tam Uyumu)
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `contacts`;
DROP TABLE IF EXISTS `applications`;
DROP TABLE IF EXISTS `archive_items`;
DROP TABLE IF EXISTS `blog_posts`;
DROP TABLE IF EXISTS `team_members`;
DROP TABLE IF EXISTS `team_units`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `settings`;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- 1. TABLO: settings (Genel Site ve Sistem Ayarları)
-- ------------------------------------------------------------
CREATE TABLE `settings` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(64) NOT NULL UNIQUE,
  `setting_value` LONGTEXT NULL,
  `description` VARCHAR(255) NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_settings_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. TABLO: team_units (Ekip Birimleri - 8 Ana Birim)
-- ------------------------------------------------------------
CREATE TABLE `team_units` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL UNIQUE,
  `display_order` SMALLINT UNSIGNED DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. TABLO: team_members (Ekip ve Sanat Kurulu Üyeleri)
-- ------------------------------------------------------------
CREATE TABLE `team_members` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `unit_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `linkedin_url` VARCHAR(255) NULL,
  `bio` TEXT NULL,
  `avatar_url` VARCHAR(500) NULL,
  `display_order` SMALLINT UNSIGNED DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_team_unit` (`unit_id`),
  INDEX `idx_team_active` (`is_active`),
  CONSTRAINT `fk_team_unit` FOREIGN KEY (`unit_id`) REFERENCES `team_units` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 4. TABLO: events (Konserler, Paneller, Atölyeler)
-- ------------------------------------------------------------
CREATE TABLE `events` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `event_date` DATE NOT NULL,
  `event_time` VARCHAR(20) NOT NULL DEFAULT '20:00',
  `venue` VARCHAR(200) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Konser',
  `ticket_status` VARCHAR(50) NOT NULL DEFAULT 'Biletix',
  `poster_url` VARCHAR(500) NULL,
  `description` TEXT NULL,
  `status` ENUM('active', 'draft', 'past') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_event_date` (`event_date`),
  INDEX `idx_event_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 5. TABLO: blog_posts (Blog, Düşünce ve Makaleler)
-- ------------------------------------------------------------
CREATE TABLE `blog_posts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Ses Kuramı',
  `author` VARCHAR(120) NOT NULL,
  `read_time` VARCHAR(30) NOT NULL DEFAULT '5 dk okuma',
  `excerpt` TEXT NULL,
  `content` LONGTEXT NOT NULL,
  `image_url` VARCHAR(500) NULL,
  `published_date` DATE NOT NULL,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_blog_published` (`is_published`, `published_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 6. TABLO: archive_items (Dijital Arşiv - Ses, Video, Eserler)
-- ------------------------------------------------------------
CREATE TABLE `archive_items` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `composer` VARCHAR(150) NOT NULL,
  `performer` VARCHAR(200) NULL,
  `conductor` VARCHAR(150) NULL,
  `work_date` VARCHAR(30) NULL,
  `embed_url` VARCHAR(500) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Elektroakustik',
  `duration` VARCHAR(30) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_archive_composer` (`composer`),
  INDEX `idx_archive_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 7. TABLO: applications (Gönüllü ve Ekip Başvuruları)
-- ------------------------------------------------------------
CREATE TABLE `applications` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `university` VARCHAR(150) NULL,
  `department` VARCHAR(150) NULL,
  `requested_unit` VARCHAR(120) NOT NULL,
  `status` ENUM('Yeni Başvuru', 'İncelendi', 'Davet Gönderildi', 'Arşivlendi') NOT NULL DEFAULT 'Yeni Başvuru',
  `notes` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_app_status` (`status`),
  INDEX `idx_app_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 8. TABLO: contacts (İletişim Formu Mesajları)
-- ------------------------------------------------------------
CREATE TABLE `contacts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(200) NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('Okunmadı', 'Cevaplandı', 'Arşivlendi') DEFAULT 'Okunmadı',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- BAŞLANGIÇ VERİLERİ (SEED DATA)
-- ============================================================

-- Ayarlar
INSERT INTO `settings` (`setting_key`, `setting_value`, `description`) VALUES
('notice_bar_enabled', '1', 'Duyuru bandı aktiflik durumu'),
('notice_bar_text', '2026 Çağdaş Müzik Günleri & Ses Sanatı Atölyeleri başvuruları açıldı!', 'Duyuru bandı metni'),
('notice_bar_link', '#basvuru', 'Duyuru bandı hedef linki'),
('hero_headline', 'Türkiye\'nin Çağdaş Müzik ve Ses Sanatı İnisiyatifi', 'Hero ana başlık'),
('hero_subhead', 'Besteciler, icracılar, araştırmacılar ve dinleyiciler için ortak üretim, açık arşiv ve disiplinlerarası diyalog platformu.', 'Hero alt başlık'),
('contact_email', 'iletisim@cagdasmuzik.net', 'Genel iletişim e-postası'),
('press_email', 'basin@cagdasmuzik.net', 'Basın iletişim e-postası'),
('phone', '+90 (212) 543 21 00', 'İletişim telefonu'),
('address', 'Moda Cad. No: 142/3, Kadıköy, İstanbul', 'Fiziksel adres'),
('social_instagram', 'https://instagram.com/cagdasmuzikplatformu', 'Instagram linki'),
('social_youtube', 'https://youtube.com/@cagdasmuzik', 'YouTube linki'),
('social_linkedin', 'https://linkedin.com/company/cagdas-muzik-platformu', 'LinkedIn linki'),
('social_spotify', 'https://spotify.com/show/cagdasmuzik', 'Spotify linki');

-- Ekip Birimleri (8 Birim)
INSERT INTO `team_units` (`id`, `name`, `display_order`) VALUES
(1, 'Yönetim & İcra Kurulu', 1),
(2, 'Sanat Kurulu', 2),
(3, 'Müzikoloji & Araştırma Birimi', 3),
(4, 'Konser & Prodüksiyon Birimi', 4),
(5, 'Dijital Medya & İletişim Birimi', 5),
(6, 'Eğitim & Atölye Birimi', 6),
(7, 'Dijital Arşiv & Dokümantasyon Birimi', 7),
(8, 'Sponsorluk & Fon Geliştirme Birimi', 8);

-- Örnek Ekip Üyeleri
INSERT INTO `team_members` (`unit_id`, `name`, `title`, `linkedin_url`, `bio`, `avatar_url`, `display_order`) VALUES
(1, 'Efe Özkan', 'Kurucu & Genel Direktör', 'https://linkedin.com/in/efeozkan', 'Çağdaş Müzik Platformu\'nun kurucusu; küratör, besteci ve ses tasarımı araştırmacısı.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', 1),
(1, 'Selin Aksoy', 'Genel Koordinatör & Operasyon Direktörü', 'https://linkedin.com/in/selinaksoy', 'Kültür yönetimi uzmanı; uluslararası festival ve konser organizasyonları stratejisti.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', 2),
(2, 'Prof. Dr. Hasan Uçarsu', 'Sanat Kurulu Başkanı & Kıdemli Besteci', 'https://linkedin.com/in/hasanucarsu', 'Çağdaş Türk besteciliğinin öncü ismi, orkestra ve oda müziği eserleri bestecisi.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80', 1),
(2, 'Zeynep Gedizlioğlu', 'Sanat Kurulu Üyesi & Besteci', 'https://linkedin.com/in/zeynepgedizlioglu', 'Ernst von Siemens Bestecilik Ödülü sahibi; uluslararası çağdaş müzik bestecisi.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', 2),
(3, 'Doç. Dr. Alper Maral', 'Birim Başkanı & Müzikolog', 'https://linkedin.com/in/alpermaral', 'Müzik felsefesi, elektroakustik müzik tarihi ve 20. yüzyıl estetiği uzmanı.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 1),
(4, 'Deniz Arıcan', 'Birim Başkanı & Baş Prodüktör', 'https://linkedin.com/in/denizarican', 'Akustik ve hibrit konserlerin sahne, ışık ve teknik altyapı direktörü.', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80', 1),
(5, 'Burcu Güneş', 'Birim Başkanı & İletişim Direktörü', 'https://linkedin.com/in/burcugunes', 'Kültür diplomasisi, ulusal ve uluslararası medya ilişkileri lideri.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', 1),
(6, 'Doç. Onur Türkmen', 'Birim Başkanı & Eğitim Koordinatörü', 'https://linkedin.com/in/onurturkmen', 'Bilkent Üniversitesi kompozisyon öğretim üyesi, atölye programları mimarı.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', 1),
(7, 'Yavuz Selim Çetin', 'Birim Başkanı & Baş Arşivist', 'https://linkedin.com/in/yavuzselimcetin', 'Partitür sayısallaştırma, metadata standartları ve açık veri uzmanı.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80', 1),
(8, 'İrem Yurtsever', 'Birim Başkanı & Fon Geliştirme Direktörü', 'https://linkedin.com/in/iremyurtsever', 'AB Yaratıcı Avrupa (Creative Europe) ve uluslararası fonlar stratejisti.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80', 1);

-- Örnek Etkinlikler
INSERT INTO `events` (`slug`, `title`, `event_date`, `event_time`, `venue`, `category`, `ticket_status`, `poster_url`, `description`, `status`) VALUES
('yeni-sesler-premiere', 'Yeni Sesler, Yeni Ufuklar: Elektroakustik Prömiyerler Gecesi', '2026-11-18', '20:00', 'Süreyya Operası, Kadıköy', 'Konser & Prömiyer', 'Biletix', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', 'Türkiye ve dünyadan altı genç bestecinin çok kanallı ses tasarımı ve akusmatik kompozisyonlarının Türkiye prömiyeri.', 'active'),
('mikrotonal-armoni-paneli', 'Mikrotonal Armoni ve Çağdaş Makam Teorisi Paneli', '2026-11-25', '15:30', 'İTÜ MİAM Oditoryumu', 'Sempozyum & Panel', 'Ücretsiz / Kayıtlı', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80', 'Geleneksel makam matematiğinin 21. yüzyıl çağdaş oda müziğinde kullanımı üzerine sempozyum.', 'active');

-- Örnek Başvurular
INSERT INTO `applications` (`name`, `email`, `phone`, `university`, `department`, `requested_unit`, `status`, `notes`) VALUES
('Can Bartu Yıldız', 'canbartu@itu.edu.tr', '+90 532 123 45 67', 'İTÜ TMDK', 'Kompozisyon (Lisans 3)', 'Konser & Prodüksiyon Birimi', 'Yeni Başvuru', 'Elektronik müzik prodüksiyonu ve canlı ses masası tecrübesi.'),
('Beren Su Korkmaz', 'berensu@bilkent.edu.tr', '+90 554 987 65 43', 'Bilkent Üniversitesi', 'Müzik Teorisi & Müzikoloji', 'Müzikoloji & Araştırma Birimi', 'İncelendi', 'Cumhuriyet dönemi mikrotonal arşivi üzerine araştırma yürütüyor.');
