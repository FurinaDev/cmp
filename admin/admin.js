/**
 * Çağdaş Müzik Platformu - Admin Yönetim Konsolu JavaScript Mantığı
 * Tam Hostinger & PHP Entegrasyonu + LocalStorage Yedekleme Desteği
 */

// Varsayılan İlk Tohum Verisi (Sunucu veya LocalStorage boşsa kullanılır)
const DEFAULT_DATA = {
  settings: {
    noticeBar: {
      enabled: true,
      text: "2026 Çağdaş Müzik Günleri & Ses Sanatı Atölyeleri başvuruları açıldı!",
      link: "#basvuru"
    },
    heroHeadline: "Türkiye'nin Çağdaş Müzik ve Ses Sanatı İnisiyatifi",
    heroSubhead: "Besteciler, icracılar, araştırmacılar ve dinleyiciler için ortak üretim, açık arşiv ve disiplinlerarası diyalog platformu.",
    contactEmail: "iletisim@cagdasmuzik.net",
    pressEmail: "basin@cagdasmuzik.net",
    phone: "+90 (212) 543 21 00",
    address: "Moda Cad. No: 142/3, Kadıköy, İstanbul",
    socialLinks: {
      instagram: "https://instagram.com/cagdasmuzikplatformu",
      youtube: "https://youtube.com/@cagdasmuzik",
      linkedin: "https://linkedin.com/company/cagdas-muzik-platformu",
      spotify: "https://spotify.com/show/cagdasmuzik",
      twitter: "https://x.com/cagdasmuzik"
    }
  },
  events: [
    {
      id: "evt-101",
      title: "Yeni Sesler, Yeni Ufuklar: Elektroakustik Prömiyerler Gecesi",
      date: "2026-11-18",
      time: "20:00",
      venue: "Süreyya Operası, Kadıköy",
      category: "Konser & Prömiyer",
      ticketStatus: "Biletix",
      poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      description: "Türkiye ve dünyadan altı genç bestecinin çok kanallı ses tasarımı ve akusmatik kompozisyonlarının Türkiye prömiyeri.",
      status: "active"
    },
    {
      id: "evt-102",
      title: "Mikrotonal Armoni ve Çağdaş Makam Teorisi Paneli",
      date: "2026-11-25",
      time: "15:30",
      venue: "İTÜ MİAM Oditoryumu",
      category: "Sempozyum & Panel",
      ticketStatus: "Ücretsiz / Kayıtlı",
      poster: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      description: "Geleneksel makam matematiğinin 21. yüzyıl çağdaş oda müziğinde kullanımı üzerine uluslararası sempozyum.",
      status: "active"
    },
    {
      id: "evt-103",
      title: "Çağdaş Müzik Platformu Yaylı Çalgılar Dörtlüsü - Güz Resitali",
      date: "2026-12-05",
      time: "19:30",
      venue: "Zorlu PSM Touche",
      category: "Oda Müziği",
      ticketStatus: "Biletix",
      poster: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      description: "Lachenmann, Saariaho ve çağdaş Türk bestecilerinin dörtlüleri için genişletilmiş tekniklerle unutulmaz bir akşam.",
      status: "active"
    },
    {
      id: "evt-104",
      title: "Genç Besteciler Forumu & Eser Analizi Atölyesi",
      date: "2026-12-14",
      time: "14:00",
      venue: "Akbank Sanat, Beyoğlu",
      category: "Atölye & Masterclass",
      ticketStatus: "Ücretsiz / Kayıtlı",
      poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      description: "Konservatuvar öğrencileri ve bağımsız besteciler için Sanat Kurulu üyeleri eşliğinde partitür okuma.",
      status: "active"
    },
    {
      id: "evt-105",
      title: "Mekansal Ses & Ambisonics Uygulamaları Laboratuvarı",
      date: "2027-01-10",
      time: "17:00",
      venue: "Çağdaş Müzik Stüdyosu",
      category: "Teknoloji & Ses",
      ticketStatus: "Yakında",
      poster: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
      description: "16 kanallı hoparlör kubbesinde mekansallaştırılmış canlı elektronik performansları.",
      status: "draft"
    }
  ],
  blogs: [
    {
      id: "blg-201",
      title: "Akusmatik Mekanlarda Sesin Özgürleşmesi: Schaeffer'dan Günümüze",
      category: "Ses Kuramı",
      author: "Dr. Efe Özkan",
      readTime: "6 dk okuma",
      date: "2026-10-02",
      excerpt: "Görsel kaynağından koparılan ses nesnesinin dinleme bilincinde yarattığı dönüşüm ve modern kompozisyondaki yeri.",
      content: "Pierre Schaeffer'ın somut müzik manifestolarıyla başlayan akusmatik yaklaşım, dinleyicinin alıştığı sahne ve icracı hiyerarşisini kökten yıktı. Bugün mekansal ses algoritmaları ve sanal gerçeklik ile birlikte ses, mimarinin kendisi haline geliyor...",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "blg-202",
      title: "Genişletilmiş İcra Tekniklerinin Partitürdeki Grameri",
      category: "Bestecilik",
      author: "Zeynep Gedizlioğlu",
      readTime: "8 dk okuma",
      date: "2026-09-21",
      excerpt: "Yaylı ve nefesli çalgılarda çoksesli armonikler, jeté efektleri ve perküsif artikülasyonların standart nota yazımındaki karşılıkları.",
      content: "20. yüzyılın ikinci yarısından itibaren enstrümanın salt bir melodi aracı olmaktan çıkıp tını jeneratörüne evrilmesi, notasyon sisteminde derin bir kırılma yarattı...",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "blg-203",
      title: "Türkiye'de Çağdaş Müzik Arşivciliği: Belleğin Sayısallaştırılması",
      category: "Arşiv & Araştırma",
      author: "Doç. Dr. Alper Maral",
      readTime: "5 dk okuma",
      date: "2026-09-10",
      excerpt: "Kayıp makaralardan FLAC ve Dolby Atmos formatlarına: Cumhuriyet dönemi avant-garde mirasını geleceğe taşımak.",
      content: "Çağdaş Türk bestecilerinin 1960'lardan bugüne kaydettiği yüzlerce radyo bandı ve kaset arşivlerde oksitlenmeye terk edilmişti. Platformumuzun başlattığı yüksek çözünürlüklü sayısallaştırma programı mirası kurtarıyor...",
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "blg-204",
      title: "Yapay Zeka ve Algoritmik Kompozisyon: Yeni Bir Yoldaş mı, Tehdit mi?",
      category: "Teknoloji",
      author: "Kaan Bulak",
      readTime: "7 dk okuma",
      date: "2026-08-28",
      excerpt: "Olasılıksal modeller (Markov zincirleri) ile derin öğrenme modellerinin çağdaş orkestrasyon süreçlerindeki yaratıcı rolü.",
      content: "Iannis Xenakis'in FORTRAN ile yazdığı stokastik müzik algoritmalarından bu yana besteciler makineleri yaratım ortağı olarak kullandı...",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    }
  ],
  team: [
    {
      id: "tm-01",
      name: "Efe Özkan",
      unit: "Yönetim & İcra Kurulu",
      title: "Kurucu & Genel Direktör",
      linkedin: "https://linkedin.com/in/efeozkan",
      bio: "Çağdaş Müzik Platformu'nun kurucusu; küratör, besteci ve ses tasarımı araştırmacısı.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-02",
      name: "Selin Aksoy",
      unit: "Yönetim & İcra Kurulu",
      title: "Genel Koordinatör & Operasyon Direktörü",
      linkedin: "https://linkedin.com/in/selinaksoy",
      bio: "Kültür yönetimi uzmanı; uluslararası festival ve konser organizasyonları stratejisti.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-03",
      name: "Mert Demir",
      unit: "Yönetim & İcra Kurulu",
      title: "İdari ve Hukuki İşler Direktörü",
      linkedin: "https://linkedin.com/in/mertdemir",
      bio: "Fikri mülkiyet ve telif hukuku danışmanı; sanatçı hakları savunucusu.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-04",
      name: "Defne Yılmaz",
      unit: "Yönetim & İcra Kurulu",
      title: "Mali İşler ve Bütçe Koordinatörü",
      linkedin: "https://linkedin.com/in/defneyilmaz",
      bio: "Kültür-sanat projeleri finansal denetim ve bütçe planlama uzmanı.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-05",
      name: "Boran Kaya",
      unit: "Yönetim & İcra Kurulu",
      title: "Stratejik Ortaklıklar Temsilcisi",
      linkedin: "https://linkedin.com/in/borankaya",
      bio: "Avrupa sanat kurumları ve vakıflar arası ağ koordinatörü.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-06",
      name: "Prof. Dr. Hasan Uçarsu",
      unit: "Sanat Kurulu",
      title: "Sanat Kurulu Başkanı & Kıdemli Besteci",
      linkedin: "https://linkedin.com/in/hasanucarsu",
      bio: "Çağdaş Türk besteciliğinin öncü ismi, orkestra ve oda müziği eserleri bestecisi.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-07",
      name: "Zeynep Gedizlioğlu",
      unit: "Sanat Kurulu",
      title: "Sanat Kurulu Üyesi & Besteci",
      linkedin: "https://linkedin.com/in/zeynepgedizlioglu",
      bio: "Ernst von Siemens Bestecilik Ödülü sahibi; uluslararası çağdaş müzik bestecisi.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-08",
      name: "Tolga Yayalar",
      unit: "Sanat Kurulu",
      title: "Sanat Kurulu Üyesi & Müzik Teorisyeni",
      linkedin: "https://linkedin.com/in/tolgayayalar",
      bio: "Harvard doktoralı besteci; spektral müzik ve algoritmik yapı araştırmacısı.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-09",
      name: "Cem Önertürk",
      unit: "Sanat Kurulu",
      title: "Sanat Kurulu Üyesi & Flüt Sanatçısı",
      linkedin: "https://linkedin.com/in/cemonerturk",
      bio: "Genişletilmiş flüt teknikleri icracısı ve Hezarfen Ensemble üyesi.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-10",
      name: "Nisan Ak",
      unit: "Sanat Kurulu",
      title: "Sanat Kurulu Üyesi & Orkestra Şefi",
      linkedin: "https://linkedin.com/in/nisanak",
      bio: "Uluslararası orkestraları yöneten, çağdaş prömiyerler şefi.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-11",
      name: "Doç. Dr. Alper Maral",
      unit: "Müzikoloji & Araştırma Birimi",
      title: "Birim Başkanı & Müzikolog",
      linkedin: "https://linkedin.com/in/alpermaral",
      bio: "Müzik felsefesi, elektroakustik müzik tarihi ve 20. yüzyıl estetiği uzmanı.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-12",
      name: "Gözde Çakır",
      unit: "Müzikoloji & Araştırma Birimi",
      title: "Kıdemli Araştırmacı & Editör",
      linkedin: "https://linkedin.com/in/gozdecakir",
      bio: "Cumhuriyet dönemi avant-garde akımları ve kadın besteciler araştırmacısı.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-13",
      name: "Caner Özgür",
      unit: "Müzikoloji & Araştırma Birimi",
      title: "Etnomüzikoloji ve Mikrotonalite Uzmanı",
      linkedin: "https://linkedin.com/in/canerozgur",
      bio: "Makam müziği frekans analizleri ve mikrotonal perde sistemleri araştırmacısı.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-14",
      name: "Irmak Şen",
      unit: "Müzikoloji & Araştırma Birimi",
      title: "Akademik Yayınlar Koordinatörü",
      linkedin: "https://linkedin.com/in/irmaksen",
      bio: "Hakemli çağdaş müzik bülteni ve yayın dizisi genel koordinatörü.",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-15",
      name: "Oğuzhan Tan",
      unit: "Müzikoloji & Araştırma Birimi",
      title: "Arşiv Araştırmacısı & Metin Yazarı",
      linkedin: "https://linkedin.com/in/oguzhantan",
      bio: "TRT ve konservatuvar ses kayıt koleksiyonları üzerine tez araştırmacısı.",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-16",
      name: "Deniz Arıcan",
      unit: "Konser & Prodüksiyon Birimi",
      title: "Birim Başkanı & Baş Prodüktör",
      linkedin: "https://linkedin.com/in/denizarican",
      bio: "Akustik ve hibrit konserlerin sahne, ışık ve teknik altyapı direktörü.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-17",
      name: "Cihan Barış",
      unit: "Konser & Prodüksiyon Birimi",
      title: "Baş Ses Mühendisi & Canlı Ses Şefi",
      linkedin: "https://linkedin.com/in/cihanbaris",
      bio: "Ambisonics, çok kanallı ses yayılımı ve sahne canlı elektronik teknisyeni.",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-18",
      name: "Ece Çetin",
      unit: "Konser & Prodüksiyon Birimi",
      title: "Sahne Yönetmeni & Sanatçı İlişkileri",
      linkedin: "https://linkedin.com/in/ececetin",
      bio: "Konuk solist ve orkestraların prova, kulis ve sahne akış koordinatörü.",
      avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-19",
      name: "Kürşat Erdem",
      unit: "Konser & Prodüksiyon Birimi",
      title: "Işık ve Görsel-İşitsel (AV) Tasarımcısı",
      linkedin: "https://linkedin.com/in/kursaterdem",
      bio: "Müzikle senkronize generative görsel ve sahne atmosferi tasarımcısı.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-20",
      name: "Melis Soylu",
      unit: "Konser & Prodüksiyon Birimi",
      title: "Lojistik & Mekan Koordinatörü",
      linkedin: "https://linkedin.com/in/melissoylu",
      bio: "Konser salonları tahsisi, seyahat ve ekipman lojistiği yöneticisi.",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-21",
      name: "Burcu Güneş",
      unit: "Dijital Medya & İletişim Birimi",
      title: "Birim Başkanı & İletişim Direktörü",
      linkedin: "https://linkedin.com/in/burcugunes",
      bio: "Kültür diplomasisi, ulusal ve uluslararası medya ilişkileri lideri.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-22",
      name: "Emre Vural",
      unit: "Dijital Medya & İletişim Birimi",
      title: "Kreatif Direktör & Marka Tasarımcısı",
      linkedin: "https://linkedin.com/in/emrevural",
      bio: "Platformun kurumsal kimliği, tipografi ve afiş tasarımlarının yaratıcısı.",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-23",
      name: "Hazal Kaya",
      unit: "Dijital Medya & İletişim Birimi",
      title: "Sosyal Medya ve Topluluk Yöneticisi",
      linkedin: "https://linkedin.com/in/hazalkaya",
      bio: "Instagram, YouTube ve podcast içerik stratejisti; dijital etkileşim lideri.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-24",
      name: "Tuna Bulut",
      unit: "Dijital Medya & İletişim Birimi",
      title: "Video Prodüktörü & Belgesel Yönetmeni",
      linkedin: "https://linkedin.com/in/tunabulut",
      bio: "Konser kayıtları, besteci röportajları ve mini belgesel çekimleri şefi.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-25",
      name: "Aslı Erten",
      unit: "Dijital Medya & İletişim Birimi",
      title: "Basın Danışmanı & İletişim Asistanı",
      linkedin: "https://linkedin.com/in/aslierten",
      bio: "Sanat dergileri ve basın kuruluşları için basın bültenleri koordinatörü.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-26",
      name: "Doç. Onur Türkmen",
      unit: "Eğitim & Atölye Birimi",
      title: "Birim Başkanı & Eğitim Koordinatörü",
      linkedin: "https://linkedin.com/in/onurturkmen",
      bio: "Bilkent Üniversitesi kompozisyon öğretim üyesi, atölye programları mimarı.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-27",
      name: "Pelin Başaran",
      unit: "Eğitim & Atölye Birimi",
      title: "Gençlik Programları Danışmanı",
      linkedin: "https://linkedin.com/in/pelinbasaran",
      bio: "Lise ve üniversite konservatuvar öğrencilerine yönelik staj mentörü.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-28",
      name: "Koray Günay",
      unit: "Eğitim & Atölye Birimi",
      title: "Ses Teknolojileri Eğitmeni",
      linkedin: "https://linkedin.com/in/koraygunay",
      bio: "Max/MSP, SuperCollider ve PureData yazılım atölyeleri eğitmeni.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-29",
      name: "Gizem Eren",
      unit: "Eğitim & Atölye Birimi",
      title: "Müzik Pedagojisi ve Çocuk Atölyeleri Şefi",
      linkedin: "https://linkedin.com/in/gizemeren",
      bio: "Çocuklar için deneysel ses ve tını keşfi atölyelerinin yaratıcısı.",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-30",
      name: "Barış Duman",
      unit: "Eğitim & Atölye Birimi",
      title: "Masterclass ve Rezidans Koordinatörü",
      linkedin: "https://linkedin.com/in/barisduman",
      bio: "Yurt dışından davet edilen konuk bestecilerin rezidans program yöneticisi.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-31",
      name: "Yavuz Selim Çetin",
      unit: "Dijital Arşiv & Dokümantasyon Birimi",
      title: "Birim Başkanı & Baş Arşivist",
      linkedin: "https://linkedin.com/in/yavuzselimcetin",
      bio: "Partitür sayısallaştırma, metadata standartları ve açık veri uzmanı.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-32",
      name: "Damla Karaca",
      unit: "Dijital Arşiv & Dokümantasyon Birimi",
      title: "Ses Restorasyonu ve Mastering Uzmanı",
      linkedin: "https://linkedin.com/in/damlakaraca",
      bio: "Tarihi analog bantların temizlenmesi ve hi-res dijital aktarım teknisyeni.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-33",
      name: "Kemal Aktaş",
      unit: "Dijital Arşiv & Dokümantasyon Birimi",
      title: "Açık Erişim ve Veri Tabanı Yöneticisi",
      linkedin: "https://linkedin.com/in/kemalaktas",
      bio: "Müzikolojik arşiv için Dublin Core ve MusicXML kataloglama mimarı.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-34",
      name: "Şebnem Doğan",
      unit: "Dijital Arşiv & Dokümantasyon Birimi",
      title: "Partitür Notatörü & Kütüphaneci",
      linkedin: "https://linkedin.com/in/sebnemdogan",
      bio: "Sibelius ve Dorico ile çağdaş eser notasyonu tanzim uzmanı.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-35",
      name: "Serkan Uçar",
      unit: "Dijital Arşiv & Dokümantasyon Birimi",
      title: "Yazılım ve Web Arşiv Uzmanı",
      linkedin: "https://linkedin.com/in/serkanucar",
      bio: "Dijital ses kütüphanesi arayüzü ve API entegrasyonları geliştiricisi.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-36",
      name: "İrem Yurtsever",
      unit: "Sponsorluk & Fon Geliştirme Birimi",
      title: "Birim Başkanı & Fon Geliştirme Direktörü",
      linkedin: "https://linkedin.com/in/iremyurtsever",
      bio: "AB Yaratıcı Avrupa (Creative Europe) ve uluslararası fonlar stratejisti.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-37",
      name: "Volkan Güler",
      unit: "Sponsorluk & Fon Geliştirme Birimi",
      title: "Kurumsal Sponsorluklar Yöneticisi",
      linkedin: "https://linkedin.com/in/volkanguler",
      bio: "Özel sektör kültür-sanat destek programları ve CSR proje lideri.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-38",
      name: "Büşra Çelik",
      unit: "Sponsorluk & Fon Geliştirme Birimi",
      title: "Hibe ve Fon Başvuru Koordinatörü",
      linkedin: "https://linkedin.com/in/busracelik",
      bio: "Kültür Bakanlığı, Goethe Institut ve Institut Français fon başvuru uzmanı.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-39",
      name: "Tolga Sezgin",
      unit: "Sponsorluk & Fon Geliştirme Birimi",
      title: "Bireysel Bağışçı ve Üyelik Yöneticisi",
      linkedin: "https://linkedin.com/in/tolgasezgin",
      bio: "Platform Hamileri Kulübü ve kitlesel fonlama (crowdfunding) koordinatörü.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "tm-40",
      name: "Ecem Aksoy",
      unit: "Sponsorluk & Fon Geliştirme Birimi",
      title: "Sponsorluk Etkinlikleri Sorumlusu",
      linkedin: "https://linkedin.com/in/ecemaksoy",
      bio: "Destekçi gala yemekleri ve VIP ağ oluşturma etkinlikleri koordinatörü.",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80"
    }
  ],
  archive: [
    {
      id: "arc-301",
      title: "Mekansal Yankılar No. 4 (Yaylılar ve Canlı Elektronik İçin)",
      composer: "Hasan Uçarsu",
      performer: "Hezarfen Ensemble",
      conductor: "Nisan Ak",
      date: "2025-10-15",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      category: "Elektroakustik & Yaylılar",
      duration: "14:22"
    },
    {
      id: "arc-302",
      title: "Kayıp Çanların Rüzgarı: Hazırlanmış Piyano için Mikrotonal Çeşitlemeler",
      composer: "Zeynep Gedizlioğlu",
      performer: "Metin Ülkü",
      conductor: "-",
      date: "2025-05-12",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      category: "Hazırlanmış Piyano",
      duration: "11:45"
    },
    {
      id: "arc-303",
      title: "Stokastik Salınımlar ve Ney için Rezonans Alanı",
      composer: "Tolga Yayalar",
      performer: "Kudsi Erguner & Canlı DSP Grubu",
      conductor: "Tolga Yayalar",
      date: "2024-11-20",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      category: "Karma & Akusmatik",
      duration: "18:04"
    },
    {
      id: "arc-304",
      title: "Şehrin Sayısal Nabzı (16 Kanal Ses Heykeli Kaydı)",
      composer: "Efe Özkan",
      performer: "Çağdaş Müzik Laboratuvarı",
      conductor: "Efe Özkan",
      date: "2024-06-03",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      category: "Ses Enstalasyonu",
      duration: "22:15"
    }
  ],
  applications: [
    {
      id: "app-501",
      name: "Can Bartu Yıldız",
      email: "canbartu@itu.edu.tr",
      phone: "+90 532 123 45 67",
      university: "İTÜ Türk Musikisi Devlet Konservatuvarı",
      department: "Kompozisyon Bölümü (Lisans 3)",
      requestedUnit: "Konser & Prodüksiyon Birimi",
      status: "Yeni Başvuru",
      notes: "Elektronik müzik prodüksiyonu ve canlı ses masası kullanımında deneyimli.",
      date: "2026-10-12 14:32"
    },
    {
      id: "app-502",
      name: "Beren Su Korkmaz",
      email: "berensu@bilkent.edu.tr",
      phone: "+90 554 987 65 43",
      university: "Bilkent Üniversitesi Müzik ve Sahne Sanatları",
      department: "Müzik Teorisi & Müzikoloji",
      requestedUnit: "Müzikoloji & Araştırma Birimi",
      status: "İncelendi",
      notes: "Cumhuriyet dönemi mikrotonal arşivi üzerine yüksek lisans tezi yazıyor. Almanca ve İngilizce biliyor.",
      date: "2026-10-10 11:15"
    },
    {
      id: "app-503",
      name: "Emirhan Ertekin",
      email: "emirhan.ertekin@mimar.edu.tr",
      phone: "+90 541 333 22 11",
      university: "Mimar Sinan Güzel Sanatlar Üniversitesi",
      department: "Görsel İletişim Tasarımı",
      requestedUnit: "Dijital Medya & İletişim Birimi",
      status: "Davet Gönderildi",
      notes: "Tipografi ve konser afiş tasarımı portfolyosu oldukça güçlü. Görüşmeye çağrıldı.",
      date: "2026-10-08 09:40"
    },
    {
      id: "app-504",
      name: "Lara Deniz Akın",
      email: "laradeniz@boun.edu.tr",
      phone: "+90 535 777 88 99",
      university: "Boğaziçi Üniversitesi",
      department: "Sosyoloji / Kültür Yönetimi Yan Dal",
      requestedUnit: "Sponsorluk & Fon Geliştirme Birimi",
      status: "Arşivlendi",
      notes: "Daha önce İKSV'de gönüllü festival koordinasyonunda çalışmış. Yedek listeye alındı.",
      date: "2026-09-29 16:20"
    }
  ]
};

// ========================================================
// ANA YÖNETİM UYGULAMASI (SINGLETON OBJESİ)
// ========================================================
class AdminDashboardApp {
  constructor() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.currentTab = 'dashboard';
    this.isServerApiAvailable = false;
    this.selectedAppId = null;

    this.init();
  }

  async init() {
    this.bindAuthEvents();
    this.bindNavigationEvents();
    this.bindFormEvents();
    this.bindFilterEvents();

    // Oturum Kontrolü
    if (this.checkAuth()) {
      this.showAppLayout();
      await this.loadData();
    } else {
      this.showLoginScreen();
    }
  }

  // ------------------------------------------------------
  // GÜVENLİK VE OTURUM YÖNETİMİ
  // ------------------------------------------------------
  checkAuth() {
    return localStorage.getItem('cmp_admin_auth') === 'true' || sessionStorage.getItem('cmp_admin_auth') === 'true';
  }

  bindAuthEvents() {
    const loginForm = document.getElementById('login-form');
    const togglePassBtn = document.getElementById('toggle-pass-visibility');
    const passInput = document.getElementById('login-pass');
    const logoutBtn = document.getElementById('btn-logout');

    if (togglePassBtn && passInput) {
      togglePassBtn.addEventListener('click', () => {
        const isPass = passInput.getAttribute('type') === 'password';
        passInput.setAttribute('type', isPass ? 'text' : 'password');
        togglePassBtn.innerHTML = isPass ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('login-pass').value.trim();
        const remember = document.getElementById('remember-me').checked;
        const alertBox = document.getElementById('login-alert');

        if (pass === 'admin123') {
          if (remember) {
            localStorage.setItem('cmp_admin_auth', 'true');
          } else {
            sessionStorage.setItem('cmp_admin_auth', 'true');
          }

          alertBox.className = 'p-3 rounded-xl text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200 block';
          alertBox.innerHTML = '<i class="fa-solid fa-circle-check mr-1.5"></i> Giriş başarılı, yönlendiriliyorsunuz...';

          setTimeout(() => {
            alertBox.classList.add('hidden');
            this.showAppLayout();
            this.loadData();
            this.showToast('Yönetim paneline hoş geldiniz!', 'success');
          }, 400);
        } else {
          alertBox.className = 'p-3 rounded-xl text-xs font-semibold border bg-rose-50 text-rose-700 border-rose-200 block';
          alertBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation mr-1.5"></i> Hatalı şifre! (Varsayılan: admin123)';
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Yönetim panelinden güvenli çıkış yapmak istiyor musunuz?')) {
          localStorage.removeItem('cmp_admin_auth');
          sessionStorage.removeItem('cmp_admin_auth');
          this.showLoginScreen();
          this.showToast('Başarıyla çıkış yapıldı.', 'info');
        }
      });
    }
  }

  showLoginScreen() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('app-layout').classList.add('hidden');
  }

  showAppLayout() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-layout').classList.remove('hidden');
  }

  // ------------------------------------------------------
  // VERİ YÜKLEME VE SENKRONİZASYON (PHP API & LOCALSTORAGE)
  // ------------------------------------------------------
  async loadData() {
    let loadedFromServer = false;

    // 1. Önce Hostinger PHP API üzerinden /api/data.php çekmeyi dene
    try {
      const response = await fetch('../api/data.php', { cache: 'no-store' });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData && typeof jsonData === 'object' && jsonData.team && jsonData.team.length > 0) {
          this.data = jsonData;
          loadedFromServer = true;
          this.isServerApiAvailable = true;
          this.updateSyncIndicator(true, 'Sunucu Hazır (PHP API Aktif)');
        }
      }
    } catch (err) {
      console.warn('PHP API /api/data.php bağlantısı kurulamadı (statik modda çalışıyor olabilir):', err);
    }

    // 2. Sunucu yoksa doğrudan ../data/content.json dene
    if (!loadedFromServer) {
      try {
        const res = await fetch('../data/content.json', { cache: 'no-store' });
        if (res.ok) {
          const jsonData = await res.json();
          if (jsonData && jsonData.team && jsonData.team.length > 0) {
            this.data = jsonData;
            loadedFromServer = true;
            this.updateSyncIndicator(true, 'Statik JSON Okundu');
          }
        }
      } catch (e) {
        console.warn('data/content.json fetch edilemedi:', e);
      }
    }

    // 3. LocalStorage kontrol et (cmp_platform_content_v1 veya cmp_content_data)
    const localRaw = localStorage.getItem('cmp_platform_content_v1') || localStorage.getItem('cmp_content_data');
    if (localRaw) {
      try {
        const parsed = JSON.parse(localRaw);
        if (parsed && parsed.team && parsed.team.length > 0) {
          this.data = parsed;
        }
      } catch (e) {
        console.error('LocalStorage verisi okunamadı:', e);
      }
    }

    // Ekip verisi eksikse varsayılanı doldur
    if (!this.data.team || this.data.team.length === 0) {
      this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    this.renderAll();
  }

  async saveData(notifyUser = true) {
    // Site ve settings nesnelerini çift yönlü senkron tut
    if (this.data.settings) {
      if (!this.data.site) this.data.site = {};
      if (this.data.settings.contactEmail) this.data.site.email = this.data.settings.contactEmail;
      if (this.data.settings.pressEmail) this.data.site.pressEmail = this.data.settings.pressEmail;
      if (this.data.settings.phone) this.data.site.phone = this.data.settings.phone;
      if (this.data.settings.address) this.data.site.address = this.data.settings.address;
      if (this.data.settings.socialLinks) this.data.site.socialLinks = this.data.settings.socialLinks;
      if (this.data.settings.noticeBar) this.data.site.noticeBar = this.data.settings.noticeBar;
    }

    // 1. Her zaman derhal LocalStorage'a kaydet (Frontend ve Admin ortak anahtarları)
    try {
      localStorage.setItem('cmp_platform_content_v1', JSON.stringify(this.data));
      localStorage.setItem('cmp_content_data', JSON.stringify(this.data));
    } catch (e) {
      console.error('LocalStorage yazma hatası:', e);
    }

    // 2. Hostinger PHP API'sine asenkron kaydet
    let serverSuccess = false;
    try {
      const response = await fetch('../api/save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data)
      });
      if (response.ok) {
        const resJson = await response.json();
        if (resJson.success) {
          serverSuccess = true;
          this.isServerApiAvailable = true;
          this.updateSyncIndicator(true, 'Sunucuya Kaydedildi (content.json Güncel)');
        }
      }
    } catch (err) {
      console.warn('PHP API save.php bağlantı kurulamadı:', err);
      this.isServerApiAvailable = false;
      this.updateSyncIndicator(false, 'LocalStorage Kaydedildi (Sunucu Çevrimdışı)');
    }

    this.renderAll();

    if (notifyUser) {
      if (serverSuccess) {
        this.showToast('Değişiklikler sunucuya ve content.json dosyasına başarıyla kaydedildi!', 'success');
      } else {
        this.showToast('Değişiklikler tarayıcı hafızasına (LocalStorage) kaydedildi!', 'success');
      }
    }
  }

  updateSyncIndicator(isOnline, text) {
    const indicator = document.getElementById('sync-status-indicator');
    const textSpan = document.getElementById('sync-status-text');
    if (!indicator || !textSpan) return;

    textSpan.textContent = text;
    if (isOnline) {
      indicator.className = 'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200';
      indicator.querySelector('span').className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
    } else {
      indicator.className = 'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200';
      indicator.querySelector('span').className = 'w-2 h-2 rounded-full bg-amber-500';
    }
  }

  async testServerConnection() {
    try {
      const res = await fetch('../api/data.php', { cache: 'no-store' });
      if (res.ok) {
        this.showToast('Sunucu bağlantısı başarılı! PHP API ve /data/content.json tam çalışır durumda.', 'success');
        this.updateSyncIndicator(true, 'Sunucu Hazır (PHP API Aktif)');
      } else {
        throw new Error('HTTP ' + res.status);
      }
    } catch (e) {
      this.showToast('Sunucuya ulaşılamadı. Hostinger /api dizinini ve dosya yetkilerini kontrol ediniz.', 'error');
      this.updateSyncIndicator(false, 'Sunucu Yanıt Vermiyor');
    }
  }

  // ------------------------------------------------------
  // NAVİGASYON VE SEKME DEĞİŞTİRME
  // ------------------------------------------------------
  bindNavigationEvents() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    const toggleSidebar = document.getElementById('toggle-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    if (toggleSidebar && sidebar) {
      toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
      });
    }

    const quickExportBtn = document.getElementById('btn-quick-export');
    if (quickExportBtn) {
      quickExportBtn.addEventListener('click', () => this.downloadJSON());
    }
  }

  switchTab(tabName, openModalAfter = false) {
    this.currentTab = tabName;

    // Menü aktiflik durumunu güncelle
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-tab') === tabName) {
        item.classList.add('bg-slate-800/90', 'text-white', 'border-l-4', 'border-orange-500');
        item.classList.remove('text-slate-300');
      } else {
        item.classList.remove('bg-slate-800/90', 'text-white', 'border-l-4', 'border-orange-500');
        item.classList.add('text-slate-300');
      }
    });

    // Sekme bölümlerini gizle/göster
    const tabs = ['dashboard', 'events', 'blog', 'team', 'archive', 'applications', 'settings', 'backup'];
    tabs.forEach(t => {
      const el = document.getElementById(`tab-${t}`);
      if (el) {
        if (t === tabName) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });

    // Başlık ve alt başlığı güncelle
    const titles = {
      dashboard: { title: 'Genel Bakış & Özet İstatistikler', sub: 'Çağdaş Müzik Platformu Yönetim Masası' },
      events: { title: 'Etkinlikler & Konser Takvimi', sub: 'Planlanan konserler, prömiyerler ve biletleme durumları' },
      blog: { title: 'Blog, Düşünce ve Makaleler', sub: 'Ses kuramı, çağdaş müzikoloji ve bestecilik yazıları' },
      team: { title: 'Ekip ve Sanat Kurulu', sub: '8 ana birimde görev yapan 40 kişilik koordinasyon kadrosu' },
      archive: { title: 'Dijital Ses ve Eser Arşivi', sub: 'Kayıtlar, orkestra icraları ve akusmatik kompozisyonlar' },
      applications: { title: 'Gönüllü ve Ekip Katılım Başvuruları', sub: 'Site formlarından iletilen aday başvuruları ve durum yönetimi' },
      settings: { title: 'Sayfa Metinleri & Ayarlar', sub: 'Duyuru bandı, ana sayfa hero sloganı ve kurumsal iletişim bilgileri' },
      backup: { title: 'Hostinger & Veri Senkronizasyonu', sub: 'content.json dosyasını dışa aktarma, içe aktarma ve yedekleme' }
    };

    if (titles[tabName]) {
      document.getElementById('page-title').textContent = titles[tabName].title;
      document.getElementById('page-subtitle').textContent = titles[tabName].sub;
    }

    if (openModalAfter && tabName === 'events') {
      this.openEventModal();
    }
  }

  // ------------------------------------------------------
  // EKRAN RENDER VE TABLO DOLDURMA
  // ------------------------------------------------------
  renderAll() {
    this.updateBadgesAndStats();
    this.renderDashboard();
    this.renderEventsTable();
    this.renderBlogsTable();
    this.renderTeamTable();
    this.renderArchiveTable();
    this.renderApplicationsTable();
    this.renderSettingsForm();
  }

  updateBadgesAndStats() {
    const eventsCount = (this.data.events || []).length;
    const blogsCount = (this.data.blogs || []).length;
    const teamCount = (this.data.team || []).length;
    const archiveCount = (this.data.archive || []).length;
    const appsCount = (this.data.applications || []).length;

    const newAppsCount = (this.data.applications || []).filter(a => a.status === 'Yeni Başvuru').length;

    // Sidebar Rozetleri
    const badgeEvents = document.getElementById('badge-events-count');
    const badgeBlogs = document.getElementById('badge-blogs-count');
    const badgeTeam = document.getElementById('badge-team-count');
    const badgeArchive = document.getElementById('badge-archive-count');
    const badgeApps = document.getElementById('badge-apps-count');

    if (badgeEvents) badgeEvents.textContent = eventsCount;
    if (badgeBlogs) badgeBlogs.textContent = blogsCount;
    if (badgeTeam) badgeTeam.textContent = teamCount;
    if (badgeArchive) badgeArchive.textContent = archiveCount;
    if (badgeApps) badgeApps.textContent = newAppsCount > 0 ? `${newAppsCount} Yeni` : appsCount;

    // Dashboard Kartları
    const statEvents = document.getElementById('stat-events');
    const statBlogs = document.getElementById('stat-blogs');
    const statTeam = document.getElementById('stat-team');
    const statArchive = document.getElementById('stat-archive');
    const statApps = document.getElementById('stat-applications');
    const statNewApps = document.getElementById('stat-new-applications');

    if (statEvents) statEvents.textContent = eventsCount;
    if (statBlogs) statBlogs.textContent = blogsCount;
    if (statTeam) statTeam.textContent = teamCount;
    if (statArchive) statArchive.textContent = archiveCount;
    if (statApps) statApps.textContent = appsCount;
    if (statNewApps) statNewApps.textContent = `${newAppsCount} Yeni Bekleyen`;
  }

  renderDashboard() {
    // Son Gelen Başvurular
    const recentAppsContainer = document.getElementById('dashboard-recent-apps');
    if (recentAppsContainer) {
      const apps = (this.data.applications || []).slice(0, 4);
      if (apps.length === 0) {
        recentAppsContainer.innerHTML = '<div class="p-6 text-center text-xs text-slate-400">Henüz başvuru bulunmamaktadır.</div>';
      } else {
        recentAppsContainer.innerHTML = apps.map(app => {
          let badgeClass = 'bg-blue-50 text-blue-700 border border-blue-200';
          if (app.status === 'İncelendi') badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
          if (app.status === 'Davet Gönderildi') badgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
          if (app.status === 'Arşivlendi') badgeClass = 'bg-slate-100 text-slate-600 border border-slate-200';

          return `
            <div class="p-4 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer" onclick="app.openAppDetailModal('${app.id}')">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                  ${this.getInitials(app.name)}
                </div>
                <div>
                  <h5 class="text-xs font-bold text-slate-800">${this.escape(app.name)}</h5>
                  <p class="text-[11px] text-slate-500">${this.escape(app.requestedUnit || 'Genel')} • <span class="text-slate-400">${app.date || ''}</span></p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="badge ${badgeClass}">${app.status}</span>
                <i class="fa-solid fa-angle-right text-slate-400 text-xs"></i>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Birim Dağılımı Listesi
    const unitDistContainer = document.getElementById('unit-distribution-list');
    if (unitDistContainer) {
      const units = [
        "Yönetim & İcra Kurulu",
        "Sanat Kurulu",
        "Müzikoloji & Araştırma Birimi",
        "Konser & Prodüksiyon Birimi",
        "Dijital Medya & İletişim Birimi",
        "Eğitim & Atölye Birimi",
        "Dijital Arşiv & Dokümantasyon Birimi",
        "Sponsorluk & Fon Geliştirme Birimi"
      ];

      const counts = {};
      units.forEach(u => counts[u] = 0);
      (this.data.team || []).forEach(m => {
        if (counts[m.unit] !== undefined) counts[m.unit]++;
      });

      unitDistContainer.innerHTML = units.map(unit => {
        const count = counts[unit] || 0;
        const percent = Math.min(100, Math.round((count / 10) * 100));
        return `
          <div class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="font-medium text-slate-700 truncate pr-2">${unit}</span>
              <span class="font-bold text-slate-900">${count} Üye</span>
            </div>
            <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-orange-500 rounded-full" style="width: ${percent}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // ------------------------------------------------------
  // MODÜL 1: ETKİNLİKLER
  // ------------------------------------------------------
  renderEventsTable() {
    const tbody = document.getElementById('events-table-body');
    if (!tbody) return;

    const searchTerm = (document.getElementById('filter-events-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('filter-events-status')?.value || 'all';

    let events = (this.data.events || []).filter(e => {
      const matchSearch = e.title.toLowerCase().includes(searchTerm) || e.venue.toLowerCase().includes(searchTerm);
      const matchStatus = statusFilter === 'all' || e.status === statusFilter;
      return matchSearch && matchStatus;
    });

    if (events.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="py-8 text-center text-slate-400 text-xs">Eşleşen etkinlik bulunamadı.</td></tr>';
      return;
    }

    tbody.innerHTML = events.map(evt => {
      let statusBadge = '<span class="badge bg-emerald-50 text-emerald-700 border border-emerald-200">Yayında</span>';
      if (evt.status === 'draft') statusBadge = '<span class="badge bg-amber-50 text-amber-700 border border-amber-200">Taslak</span>';
      if (evt.status === 'past') statusBadge = '<span class="badge bg-slate-100 text-slate-600 border border-slate-200">Geçmiş</span>';

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              <img src="${evt.poster || '../assets/images/logo-square-navy.jpg'}" alt="Afiş" class="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0" onerror="this.src='../assets/images/logo-square-navy.jpg'">
              <div class="max-w-xs">
                <span class="font-bold text-slate-800 line-clamp-1">${this.escape(evt.title)}</span>
                <span class="text-[11px] text-slate-400">${this.escape(evt.description || '').substring(0, 50)}...</span>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 whitespace-nowrap">
            <span class="font-semibold text-slate-700 block">${evt.date}</span>
            <span class="text-[11px] text-slate-400">${evt.time || '20:00'}</span>
          </td>
          <td class="py-3 px-4 whitespace-nowrap text-slate-700 font-medium">${this.escape(evt.venue)}</td>
          <td class="py-3 px-4 whitespace-nowrap"><span class="badge bg-slate-100 text-slate-700">${this.escape(evt.category)}</span></td>
          <td class="py-3 px-4 whitespace-nowrap">
            <span class="badge ${evt.ticketStatus === 'Tükendi' ? 'bg-rose-50 text-rose-700' : 'bg-sky-50 text-sky-700'}">${evt.ticketStatus}</span>
          </td>
          <td class="py-3 px-4 whitespace-nowrap">${statusBadge}</td>
          <td class="py-3 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1">
              <button onclick="app.toggleEventStatus('${evt.id}')" title="Durum Değiştir" class="p-1.5 text-slate-400 hover:text-orange-600 rounded-lg transition"><i class="fa-solid fa-arrows-rotate"></i></button>
              <button onclick="app.openEventModal('${evt.id}')" title="Düzenle" class="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg transition"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="app.deleteEvent('${evt.id}')" title="Sil" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openEventModal(id = null) {
    const modal = document.getElementById('modal-event');
    const form = document.getElementById('form-event');
    form.reset();

    if (id) {
      const evt = this.data.events.find(e => e.id === id);
      if (!evt) return;
      document.getElementById('modal-event-title').textContent = 'Etkinliği Düzenle';
      document.getElementById('event-id').value = evt.id;
      document.getElementById('event-title').value = evt.title;
      document.getElementById('event-date').value = evt.date;
      document.getElementById('event-time').value = evt.time || '20:00';
      document.getElementById('event-venue').value = evt.venue;
      document.getElementById('event-category').value = evt.category;
      document.getElementById('event-ticket').value = evt.ticketStatus;
      document.getElementById('event-status').value = evt.status;
      document.getElementById('event-poster').value = evt.poster || '';
      document.getElementById('event-desc').value = evt.description || '';
    } else {
      document.getElementById('modal-event-title').textContent = 'Yeni Etkinlik Ekle';
      document.getElementById('event-id').value = '';
    }

    modal.classList.remove('hidden');
  }

  saveEvent(e) {
    e.preventDefault();
    const id = document.getElementById('event-id').value;
    const newEvent = {
      id: id || 'evt-' + Date.now(),
      title: document.getElementById('event-title').value.trim(),
      date: document.getElementById('event-date').value,
      time: document.getElementById('event-time').value,
      venue: document.getElementById('event-venue').value.trim(),
      category: document.getElementById('event-category').value.trim(),
      ticketStatus: document.getElementById('event-ticket').value,
      status: document.getElementById('event-status').value,
      poster: document.getElementById('event-poster').value.trim() || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      description: document.getElementById('event-desc').value.trim()
    };

    if (id) {
      const idx = this.data.events.findIndex(x => x.id === id);
      if (idx !== -1) this.data.events[idx] = newEvent;
    } else {
      this.data.events.unshift(newEvent);
    }

    this.closeModal('modal-event');
    this.saveData();
    this.showToast('Etkinlik başarıyla kaydedildi.', 'success');
  }

  toggleEventStatus(id) {
    const evt = this.data.events.find(e => e.id === id);
    if (!evt) return;
    evt.status = evt.status === 'active' ? 'draft' : 'active';
    this.saveData();
    this.showToast(`Etkinlik durumu "${evt.status === 'active' ? 'Yayında' : 'Taslak'}" olarak değiştirildi.`, 'info');
  }

  deleteEvent(id) {
    if (confirm('Bu etkinliği silmek istediğinize emin misiniz?')) {
      this.data.events = this.data.events.filter(e => e.id !== id);
      this.saveData();
      this.showToast('Etkinlik silindi.', 'info');
    }
  }

  // ------------------------------------------------------
  // MODÜL 2: BLOG & DÜŞÜNCE
  // ------------------------------------------------------
  renderBlogsTable() {
    const tbody = document.getElementById('blogs-table-body');
    if (!tbody) return;

    const searchTerm = (document.getElementById('filter-blogs-search')?.value || '').toLowerCase();

    let blogs = (this.data.blogs || []).filter(b => {
      return b.title.toLowerCase().includes(searchTerm) || b.author.toLowerCase().includes(searchTerm);
    });

    if (blogs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-slate-400 text-xs">Yazı bulunamadı.</td></tr>';
      return;
    }

    tbody.innerHTML = blogs.map(b => {
      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              <img src="${b.image || '../assets/images/logo-square-orange.jpg'}" alt="Kapak" class="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0" onerror="this.src='../assets/images/logo-square-orange.jpg'">
              <div class="max-w-xs">
                <span class="font-bold text-slate-800 line-clamp-1">${this.escape(b.title)}</span>
                <span class="text-[11px] text-slate-400">${this.escape(b.excerpt || '').substring(0, 50)}...</span>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 whitespace-nowrap font-medium text-slate-700">${this.escape(b.author)}</td>
          <td class="py-3 px-4 whitespace-nowrap"><span class="badge bg-slate-100 text-slate-700">${this.escape(b.category)}</span></td>
          <td class="py-3 px-4 whitespace-nowrap text-slate-500">${this.escape(b.readTime || '5 dk okuma')}</td>
          <td class="py-3 px-4 whitespace-nowrap text-slate-500">${b.date || '-'}</td>
          <td class="py-3 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1">
              <button onclick="app.openBlogModal('${b.id}')" title="Düzenle" class="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg transition"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="app.deleteBlog('${b.id}')" title="Sil" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openBlogModal(id = null) {
    const modal = document.getElementById('modal-blog');
    const form = document.getElementById('form-blog');
    form.reset();

    if (id) {
      const b = this.data.blogs.find(x => x.id === id);
      if (!b) return;
      document.getElementById('modal-blog-title').textContent = 'Yazıyı Düzenle';
      document.getElementById('blog-id').value = b.id;
      document.getElementById('blog-title').value = b.title;
      document.getElementById('blog-category').value = b.category;
      document.getElementById('blog-author').value = b.author;
      document.getElementById('blog-readtime').value = b.readTime || '6 dk okuma';
      document.getElementById('blog-image').value = b.image || '';
      document.getElementById('blog-excerpt').value = b.excerpt || '';
      document.getElementById('blog-content').value = b.content || '';
    } else {
      document.getElementById('modal-blog-title').textContent = 'Yeni Yazı Ekle';
      document.getElementById('blog-id').value = '';
    }

    modal.classList.remove('hidden');
  }

  saveBlog(e) {
    e.preventDefault();
    const id = document.getElementById('blog-id').value;
    const newBlog = {
      id: id || 'blg-' + Date.now(),
      title: document.getElementById('blog-title').value.trim(),
      category: document.getElementById('blog-category').value.trim(),
      author: document.getElementById('blog-author').value.trim(),
      readTime: document.getElementById('blog-readtime').value.trim(),
      image: document.getElementById('blog-image').value.trim() || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      excerpt: document.getElementById('blog-excerpt').value.trim(),
      content: document.getElementById('blog-content').value.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    if (id) {
      const idx = this.data.blogs.findIndex(x => x.id === id);
      if (idx !== -1) this.data.blogs[idx] = newBlog;
    } else {
      this.data.blogs.unshift(newBlog);
    }

    this.closeModal('modal-blog');
    this.saveData();
    this.showToast('Makale başarıyla kaydedildi.', 'success');
  }

  deleteBlog(id) {
    if (confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      this.data.blogs = this.data.blogs.filter(b => b.id !== id);
      this.saveData();
      this.showToast('Yazı silindi.', 'info');
    }
  }

  // ------------------------------------------------------
  // MODÜL 3: EKİP & SANAT KURULU (40 ÜYE - 8 BİRİM)
  // ------------------------------------------------------
  populateUnitDropdowns() {
    const filterSelect = document.getElementById('filter-team-unit');
    const modalSelect = document.getElementById('team-unit');
    if (!filterSelect || !modalSelect) return;

    const standardUnits = [
      'İdari Koordinasyon',
      'Sanat Danışma Kurulu',
      'Proje Yönetimi ve Kaynak Geliştirme',
      'Kurumsal İletişim',
      'Hukuk & Mevzuat',
      'Dijital & Teknoloji',
      'İnsan Kaynakları',
      'İş Geliştirme ve Stratejik Ortaklıklar',
      'Yönetim & İcra Kurulu',
      'Sanat Kurulu',
      'Müzikoloji & Araştırma Birimi',
      'Konser & Prodüksiyon Birimi',
      'Dijital Medya & İletişim Birimi',
      'Eğitim & Atölye Birimi',
      'Dijital Arşiv & Dokümantasyon Birimi',
      'Sponsorluk & Fon Geliştirme Birimi'
    ];

    const teamUnits = (this.data.team || []).map(m => m.unit).filter(Boolean);
    const allUnits = [...new Set([...teamUnits, ...standardUnits])];

    const currentFilterVal = filterSelect.value || 'all';
    filterSelect.innerHTML = '<option value="all">Tüm Birimler (' + allUnits.length + ' Birim)</option>' +
      allUnits.map(u => `<option value="${this.escape(u)}" ${u === currentFilterVal ? 'selected' : ''}>${this.escape(u)}</option>`).join('');

    const currentModalVal = modalSelect.value;
    modalSelect.innerHTML = allUnits.map(u => `<option value="${this.escape(u)}" ${u === currentModalVal ? 'selected' : ''}>${this.escape(u)}</option>`).join('');
  }

  renderTeamTable() {
    this.populateUnitDropdowns();
    const tbody = document.getElementById('team-table-body');
    if (!tbody) return;

    const searchTerm = (document.getElementById('filter-team-search')?.value || '').toLowerCase();
    const unitFilter = document.getElementById('filter-team-unit')?.value || 'all';

    let members = (this.data.team || []).filter(m => {
      const matchSearch = (m.name || '').toLowerCase().includes(searchTerm) || (m.title || '').toLowerCase().includes(searchTerm);
      const matchUnit = unitFilter === 'all' || m.unit === unitFilter;
      return matchSearch && matchUnit;
    });

    if (members.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-slate-400 text-xs">Eşleşen ekip üyesi bulunamadı.</td></tr>';
      return;
    }

    tbody.innerHTML = members.map(m => {
      // Birim renk kodları
      let unitBadgeColor = 'bg-slate-100 text-slate-700';
      if (m.unit.includes('Yönetim')) unitBadgeColor = 'bg-purple-100 text-purple-800 border border-purple-200';
      else if (m.unit.includes('Sanat Kurulu')) unitBadgeColor = 'bg-amber-100 text-amber-800 border border-amber-200 font-bold';
      else if (m.unit.includes('Müzikoloji')) unitBadgeColor = 'bg-blue-100 text-blue-800 border border-blue-200';
      else if (m.unit.includes('Prodüksiyon')) unitBadgeColor = 'bg-orange-100 text-orange-800 border border-orange-200';
      else if (m.unit.includes('Medya')) unitBadgeColor = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      else if (m.unit.includes('Eğitim')) unitBadgeColor = 'bg-teal-100 text-teal-800 border border-teal-200';
      else if (m.unit.includes('Arşiv')) unitBadgeColor = 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      else if (m.unit.includes('Sponsorluk')) unitBadgeColor = 'bg-rose-100 text-rose-800 border border-rose-200';

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              <img src="${m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}" alt="Avatar" class="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0" onerror="this.src='../assets/images/logo-square-navy.jpg'">
              <div>
                <span class="font-bold text-slate-900 block">${this.escape(m.name)}</span>
                <span class="text-[11px] text-slate-400">ID: ${m.id}</span>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 whitespace-nowrap"><span class="badge ${unitBadgeColor}">${this.escape(m.unit)}</span></td>
          <td class="py-3 px-4 whitespace-nowrap font-semibold text-slate-700">${this.escape(m.title)}</td>
          <td class="py-3 px-4 whitespace-nowrap">
            ${m.linkedin ? `<a href="${this.escape(m.linkedin)}" target="_blank" class="text-sky-600 hover:text-sky-700 text-xs font-semibold flex items-center gap-1"><i class="fa-brands fa-linkedin"></i> Profil</a>` : '<span class="text-slate-300">-</span>'}
          </td>
          <td class="py-3 px-4">
            <p class="text-[11px] text-slate-500 line-clamp-1 max-w-xs">${this.escape(m.bio || '-')}</p>
          </td>
          <td class="py-3 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1">
              <button onclick="app.openTeamModal('${m.id}')" title="Düzenle" class="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg transition"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="app.deleteTeamMember('${m.id}')" title="Sil" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openTeamModal(id = null) {
    const modal = document.getElementById('modal-team');
    const form = document.getElementById('form-team');
    form.reset();

    if (id) {
      const m = this.data.team.find(x => x.id === id);
      if (!m) return;
      document.getElementById('modal-team-title').textContent = 'Ekip Üyesini Düzenle';
      document.getElementById('team-id').value = m.id;
      document.getElementById('team-name').value = m.name;
      document.getElementById('team-title').value = m.title;
      document.getElementById('team-unit').value = m.unit;
      document.getElementById('team-linkedin').value = m.linkedin || '';
      document.getElementById('team-avatar').value = m.avatar || '';
      document.getElementById('team-bio').value = m.bio || '';
    } else {
      document.getElementById('modal-team-title').textContent = 'Yeni Ekip Üyesi Ekle';
      document.getElementById('team-id').value = '';
    }

    modal.classList.remove('hidden');
  }

  saveTeamMember(e) {
    e.preventDefault();
    const id = document.getElementById('team-id').value;
    const newMember = {
      id: id || 'tm-' + (this.data.team.length + 1).toString().padStart(2, '0'),
      name: document.getElementById('team-name').value.trim(),
      title: document.getElementById('team-title').value.trim(),
      unit: document.getElementById('team-unit').value,
      linkedin: document.getElementById('team-linkedin').value.trim(),
      avatar: document.getElementById('team-avatar').value.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: document.getElementById('team-bio').value.trim()
    };

    if (id) {
      const idx = this.data.team.findIndex(x => x.id === id);
      if (idx !== -1) this.data.team[idx] = newMember;
    } else {
      this.data.team.push(newMember);
    }

    this.closeModal('modal-team');
    this.saveData();
    this.showToast('Ekip üyesi başarıyla kaydedildi.', 'success');
  }

  deleteTeamMember(id) {
    if (confirm('Bu ekip üyesini silmek istediğinize emin misiniz?')) {
      this.data.team = this.data.team.filter(m => m.id !== id);
      this.saveData();
      this.showToast('Ekip üyesi silindi.', 'info');
    }
  }

  // ------------------------------------------------------
  // MODÜL 4: DİJİTAL SES ARŞİVİ
  // ------------------------------------------------------
  renderArchiveTable() {
    const tbody = document.getElementById('archive-table-body');
    if (!tbody) return;

    const searchTerm = (document.getElementById('filter-archive-search')?.value || '').toLowerCase();

    let items = (this.data.archive || []).filter(item => {
      return item.title.toLowerCase().includes(searchTerm) || item.composer.toLowerCase().includes(searchTerm);
    });

    if (items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="py-8 text-center text-slate-400 text-xs">Arşiv kaydı bulunamadı.</td></tr>';
      return;
    }

    tbody.innerHTML = items.map(arc => {
      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="py-3 px-4 font-bold text-slate-800">${this.escape(arc.title)}</td>
          <td class="py-3 px-4 whitespace-nowrap font-medium text-slate-700">${this.escape(arc.composer)}</td>
          <td class="py-3 px-4 whitespace-nowrap text-slate-600">${this.escape(arc.performer || '-')}</td>
          <td class="py-3 px-4 whitespace-nowrap"><span class="badge bg-purple-50 text-purple-700 border border-purple-200">${this.escape(arc.category)}</span></td>
          <td class="py-3 px-4 whitespace-nowrap text-slate-500">${arc.date || '-'}</td>
          <td class="py-3 px-4 whitespace-nowrap font-mono text-slate-500">${arc.duration || '-'}</td>
          <td class="py-3 px-4 whitespace-nowrap">
            <a href="${this.escape(arc.embedUrl)}" target="_blank" class="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1">
              <i class="fa-solid fa-play text-[10px]"></i> Dinle / İzle
            </a>
          </td>
          <td class="py-3 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1">
              <button onclick="app.openArchiveModal('${arc.id}')" title="Düzenle" class="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg transition"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="app.deleteArchiveItem('${arc.id}')" title="Sil" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openArchiveModal(id = null) {
    const modal = document.getElementById('modal-archive');
    const form = document.getElementById('form-archive');
    form.reset();

    if (id) {
      const arc = this.data.archive.find(x => x.id === id);
      if (!arc) return;
      document.getElementById('modal-archive-title').textContent = 'Arşiv Kaydını Düzenle';
      document.getElementById('archive-id').value = arc.id;
      document.getElementById('archive-item-title').value = arc.title;
      document.getElementById('archive-composer').value = arc.composer;
      document.getElementById('archive-performer').value = arc.performer || '';
      document.getElementById('archive-conductor').value = arc.conductor || '';
      document.getElementById('archive-date').value = arc.date || '';
      document.getElementById('archive-duration').value = arc.duration || '';
      document.getElementById('archive-category').value = arc.category || '';
      document.getElementById('archive-embed').value = arc.embedUrl || '';
    } else {
      document.getElementById('modal-archive-title').textContent = 'Yeni Arşiv Kaydı Ekle';
      document.getElementById('archive-id').value = '';
    }

    modal.classList.remove('hidden');
  }

  saveArchiveItem(e) {
    e.preventDefault();
    const id = document.getElementById('archive-id').value;
    const newItem = {
      id: id || 'arc-' + Date.now(),
      title: document.getElementById('archive-item-title').value.trim(),
      composer: document.getElementById('archive-composer').value.trim(),
      performer: document.getElementById('archive-performer').value.trim(),
      conductor: document.getElementById('archive-conductor').value.trim(),
      date: document.getElementById('archive-date').value.trim(),
      duration: document.getElementById('archive-duration').value.trim(),
      category: document.getElementById('archive-category').value.trim(),
      embedUrl: document.getElementById('archive-embed').value.trim()
    };

    if (id) {
      const idx = this.data.archive.findIndex(x => x.id === id);
      if (idx !== -1) this.data.archive[idx] = newItem;
    } else {
      this.data.archive.unshift(newItem);
    }

    this.closeModal('modal-archive');
    this.saveData();
    this.showToast('Arşiv eseri kaydedildi.', 'success');
  }

  deleteArchiveItem(id) {
    if (confirm('Bu arşiv kaydını silmek istediğinize emin misiniz?')) {
      this.data.archive = this.data.archive.filter(a => a.id !== id);
      this.saveData();
      this.showToast('Arşiv kaydı silindi.', 'info');
    }
  }

  // ------------------------------------------------------
  // MODÜL 5: GÖNÜLLÜ VE EKİP BAŞVURULARI
  // ------------------------------------------------------
  renderApplicationsTable() {
    const tbody = document.getElementById('apps-table-body');
    if (!tbody) return;

    const searchTerm = (document.getElementById('filter-apps-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('filter-apps-status')?.value || 'all';

    let apps = (this.data.applications || []).filter(a => {
      const name = (a.name || a.fullName || '').toLowerCase();
      const email = (a.email || '').toLowerCase();
      const uni = (a.university || a.education || '').toLowerCase();
      const matchSearch = name.includes(searchTerm) || email.includes(searchTerm) || uni.includes(searchTerm);
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      return matchSearch && matchStatus;
    });

    if (apps.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="py-8 text-center text-slate-400 text-xs">Başvuru bulunamadı.</td></tr>';
      return;
    }

    tbody.innerHTML = apps.map(app => {
      const appName = app.name || app.fullName || 'İsimsiz';
      const appEmail = app.email || '';
      const appPhone = app.phone || '-';
      const appUni = app.university || app.education || '-';
      const appDept = app.department || (app.skills ? app.skills.substring(0, 40) + '...' : '-');
      const appUnit = app.requestedUnit || app.unitPreference || 'Genel';
      const appDate = (app.date || app.appliedAt || '-').replace('T', ' ').substring(0, 16);

      let badgeClass = 'bg-blue-50 text-blue-700 border border-blue-200';
      if (app.status === 'İncelendi' || app.status === 'In Review') badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
      if (app.status === 'Davet Gönderildi' || app.status === 'Shortlisted' || app.status === 'Approved') badgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold';
      if (app.status === 'Arşivlendi') badgeClass = 'bg-slate-100 text-slate-600 border border-slate-200';

      return `
        <tr class="hover:bg-slate-50 transition cursor-pointer" onclick="app.openAppDetailModal('${app.id}')">
          <td class="py-3 px-4">
            <span class="font-bold text-slate-900 block">${this.escape(appName)}</span>
            <span class="text-[11px] text-slate-400">ID: ${app.id}</span>
          </td>
          <td class="py-3 px-4 whitespace-nowrap">
            <span class="font-medium text-slate-700 block">${this.escape(appEmail)}</span>
            <span class="text-[11px] text-slate-500">${this.escape(appPhone)}</span>
          </td>
          <td class="py-3 px-4 whitespace-nowrap">
            <span class="font-medium text-slate-800 block">${this.escape(appUni)}</span>
            <span class="text-[11px] text-slate-500">${this.escape(appDept)}</span>
          </td>
          <td class="py-3 px-4 whitespace-nowrap font-semibold text-slate-700">${this.escape(appUnit)}</td>
          <td class="py-3 px-4 whitespace-nowrap text-slate-500 text-[11px]">${appDate}</td>
          <td class="py-3 px-4 whitespace-nowrap"><span class="badge ${badgeClass}">${app.status}</span></td>
          <td class="py-3 px-4 text-right whitespace-nowrap" onclick="event.stopPropagation()">
            <div class="flex items-center justify-end gap-1">
              <button onclick="app.openAppDetailModal('${app.id}')" title="İncele" class="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg transition"><i class="fa-solid fa-eye"></i></button>
              <button onclick="app.deleteApplication('${app.id}')" title="Sil" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openAppDetailModal(id) {
    const app = this.data.applications.find(a => a.id === id);
    if (!app) return;

    this.selectedAppId = id;
    const appName = app.name || app.fullName || 'İsimsiz';
    const appEmail = app.email || '';
    const appPhone = app.phone || '-';
    const appUni = app.university || app.education || '-';
    const appDept = app.department || app.skills || '-';
    const appUnit = app.requestedUnit || app.unitPreference || 'Genel';
    const appNotes = app.notes || app.reviewerNotes || app.motivation || 'Aday herhangi bir ek not belirtmemiş.';
    const appDate = (app.date || app.appliedAt || '').replace('T', ' ').substring(0, 16);

    document.getElementById('detail-app-name').textContent = appName;
    document.getElementById('detail-app-date').textContent = appDate;
    document.getElementById('detail-app-email').textContent = appEmail;
    document.getElementById('detail-app-email').href = `mailto:${appEmail}`;
    document.getElementById('detail-app-phone').textContent = appPhone;
    document.getElementById('detail-app-university').textContent = appUni;
    document.getElementById('detail-app-department').textContent = appDept;
    document.getElementById('detail-app-unit').textContent = appUnit;
    document.getElementById('detail-app-notes').textContent = appNotes;

    const badgeEl = document.getElementById('detail-app-badge');
    badgeEl.textContent = app.status;
    let badgeClass = 'bg-blue-50 text-blue-700 border border-blue-200';
    if (app.status === 'İncelendi' || app.status === 'In Review') badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
    if (app.status === 'Davet Gönderildi' || app.status === 'Shortlisted' || app.status === 'Approved') badgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (app.status === 'Arşivlendi') badgeClass = 'bg-slate-100 text-slate-600 border border-slate-200';
    badgeEl.className = `badge ${badgeClass}`;

    document.getElementById('modal-app-detail').classList.remove('hidden');
  }

  updateAppStatus(newStatus) {
    if (!this.selectedAppId) return;
    const app = this.data.applications.find(a => a.id === this.selectedAppId);
    if (app) {
      app.status = newStatus;
      this.saveData();
      this.openAppDetailModal(this.selectedAppId);
      this.showToast(`Başvuru durumu "${newStatus}" olarak güncellendi.`, 'success');
    }
  }

  deleteApplication(id) {
    if (confirm('Bu başvuruyu kalıcı olarak silmek istiyor musunuz?')) {
      this.data.applications = this.data.applications.filter(a => a.id !== id);
      this.saveData();
      this.showToast('Başvuru silindi.', 'info');
      this.closeModal('modal-app-detail');
    }
  }

  exportApplicationsCSV() {
    const apps = this.data.applications || [];
    if (apps.length === 0) {
      this.showToast('Dışa aktarılacak başvuru bulunmamaktadır.', 'error');
      return;
    }

    const headers = ['ID', 'Ad Soyad', 'E-Posta', 'Telefon', 'Üniversite', 'Bölüm', 'Birim', 'Durum', 'Tarih', 'Notlar'];
    const rows = apps.map(a => [
      a.id,
      `"${(a.name || '').replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${(a.phone || '').replace(/"/g, '""')}"`,
      `"${(a.university || '').replace(/"/g, '""')}"`,
      `"${(a.department || '').replace(/"/g, '""')}"`,
      `"${(a.requestedUnit || '').replace(/"/g, '""')}"`,
      `"${(a.status || '').replace(/"/g, '""')}"`,
      `"${(a.date || '').replace(/"/g, '""')}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cagdas-muzik-basvurular-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Başvuru listesi CSV olarak indirildi.', 'success');
  }

  // ------------------------------------------------------
  // MODÜL 6: SAYFA METİNLERİ VE AYARLAR
  // ------------------------------------------------------
  renderSettingsForm() {
    const s = this.data.settings || {};
    const nb = s.noticeBar || {};
    const sl = s.socialLinks || {};

    const chkNotice = document.getElementById('setting-notice-enabled');
    if (chkNotice) chkNotice.checked = !!nb.enabled;

    document.getElementById('setting-notice-text').value = nb.text || '';
    document.getElementById('setting-notice-link').value = nb.link || '';
    document.getElementById('setting-hero-headline').value = s.heroHeadline || '';
    document.getElementById('setting-hero-subhead').value = s.heroSubhead || '';
    document.getElementById('setting-contact-email').value = s.contactEmail || '';
    document.getElementById('setting-press-email').value = s.pressEmail || '';
    document.getElementById('setting-phone').value = s.phone || '';
    document.getElementById('setting-address').value = s.address || '';

    document.getElementById('setting-social-instagram').value = sl.instagram || '';
    document.getElementById('setting-social-youtube').value = sl.youtube || '';
    document.getElementById('setting-social-linkedin').value = sl.linkedin || '';
    document.getElementById('setting-social-spotify').value = sl.spotify || '';
  }

  saveSettings(e) {
    e.preventDefault();
    if (!this.data.settings) this.data.settings = {};

    this.data.settings.noticeBar = {
      enabled: document.getElementById('setting-notice-enabled').checked,
      text: document.getElementById('setting-notice-text').value.trim(),
      link: document.getElementById('setting-notice-link').value.trim()
    };
    this.data.settings.heroHeadline = document.getElementById('setting-hero-headline').value.trim();
    this.data.settings.heroSubhead = document.getElementById('setting-hero-subhead').value.trim();
    this.data.settings.contactEmail = document.getElementById('setting-contact-email').value.trim();
    this.data.settings.pressEmail = document.getElementById('setting-press-email').value.trim();
    this.data.settings.phone = document.getElementById('setting-phone').value.trim();
    this.data.settings.address = document.getElementById('setting-address').value.trim();

    this.data.settings.socialLinks = {
      instagram: document.getElementById('setting-social-instagram').value.trim(),
      youtube: document.getElementById('setting-social-youtube').value.trim(),
      linkedin: document.getElementById('setting-social-linkedin').value.trim(),
      spotify: document.getElementById('setting-social-spotify').value.trim()
    };

    this.saveData();
    this.showToast('Sayfa ayarları başarıyla kaydedildi.', 'success');
  }

  // ------------------------------------------------------
  // MODÜL 7: YEDEKLEME, İÇE/DIŞA AKTARMA VE SIFIRLAMA
  // ------------------------------------------------------
  downloadJSON() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('content.json dosyası indirildi! Hostinger cPanel public_html/data/ içerisine atabilirsiniz.', 'success');
  }

  handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed && typeof parsed === 'object') {
          this.data = parsed;
          this.saveData();
          this.showToast('JSON dosyası başarıyla içe aktarıldı ve uygulandı!', 'success');
        } else {
          throw new Error('Geçersiz JSON');
        }
      } catch (err) {
        this.showToast('Geçersiz JSON dosyası! Lütfen geçerli bir content.json dosyası seçiniz.', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  resetToDefault() {
    if (confirm('TÜM veriler orijinal demo ayarlarına ve 40 kişilik varsayılan ekibe sıfırlanacak. Onaylıyor musunuz?')) {
      this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      this.saveData();
      this.showToast('Tüm veriler varsayılana sıfırlandı.', 'info');
    }
  }

  // ------------------------------------------------------
  // FORM & MODAL & BİLDİRİM YARDIMCILARI
  // ------------------------------------------------------
  bindFormEvents() {
    document.getElementById('form-event')?.addEventListener('submit', (e) => this.saveEvent(e));
    document.getElementById('form-blog')?.addEventListener('submit', (e) => this.saveBlog(e));
    document.getElementById('form-team')?.addEventListener('submit', (e) => this.saveTeamMember(e));
    document.getElementById('form-archive')?.addEventListener('submit', (e) => this.saveArchiveItem(e));
    document.getElementById('settings-form')?.addEventListener('submit', (e) => this.saveSettings(e));
  }

  bindFilterEvents() {
    document.getElementById('filter-events-search')?.addEventListener('input', () => this.renderEventsTable());
    document.getElementById('filter-events-status')?.addEventListener('change', () => this.renderEventsTable());

    document.getElementById('filter-blogs-search')?.addEventListener('input', () => this.renderBlogsTable());

    document.getElementById('filter-team-search')?.addEventListener('input', () => this.renderTeamTable());
    document.getElementById('filter-team-unit')?.addEventListener('change', () => this.renderTeamTable());

    document.getElementById('filter-archive-search')?.addEventListener('input', () => this.renderArchiveTable());

    document.getElementById('filter-apps-search')?.addEventListener('input', () => this.renderApplicationsTable());
    document.getElementById('filter-apps-status')?.addEventListener('change', () => this.renderApplicationsTable());
  }

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.add('hidden');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    let bg = 'bg-slate-900 text-white';
    let icon = '<i class="fa-solid fa-circle-info text-sky-400"></i>';

    if (type === 'success') {
      bg = 'bg-slate-900 text-white border-l-4 border-emerald-500';
      icon = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
    } else if (type === 'error') {
      bg = 'bg-slate-900 text-white border-l-4 border-rose-500';
      icon = '<i class="fa-solid fa-triangle-exclamation text-rose-400"></i>';
    } else if (type === 'info') {
      bg = 'bg-slate-900 text-white border-l-4 border-orange-500';
      icon = '<i class="fa-solid fa-bell text-orange-400"></i>';
    }

    toast.className = `p-4 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-3 transform transition-all duration-300 translate-y-2 opacity-0 ${bg}`;
    toast.innerHTML = `
      <span class="text-base">${icon}</span>
      <span class="flex-1">${this.escape(message)}</span>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  escape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  getInitials(name) {
    if (!name) return 'CM';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
}

// Global Uygulama Örneğini Başlat
window.app = new AdminDashboardApp();
