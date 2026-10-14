<?php
/**
 * Çağdaş Müzik Platformu - Hostinger MySQL Veritabanı Yapılandırması (Opsiyonel)
 * /api/db_config.php
 *
 * Bu dosya, Hostinger hPanel veya cPanel üzerinden MySQL veritabanı
 * kullanmak isteyenler için PDO bağlantı köprüsünü ve yardımcı fonksiyonları sağlar.
 */

// Hostinger MySQL Bağlantı Bilgileri
// (Hostinger hPanel -> Veritabanları -> MySQL Veritabanları bölümünden alabilirsiniz)
define('DB_HOST', 'localhost'); // Hostinger'da genellikle localhost kullanılır
define('DB_NAME', 'u123456789_cagdasmuzik'); // Örnek veritabanı adı
define('DB_USER', 'u123456789_cmp_admin');   // Veritabanı kullanıcısı
define('DB_PASS', 'GucluSifre123!*');         // Veritabanı şifresi
define('DB_CHARSET', 'utf8mb4');

class Database {
    private static ?PDO $instance = null;

    /**
     * PDO Bağlantısını tekil (Singleton) olarak döndürür
     */
    public static function getConnection(): ?PDO {
        if (self::$instance === null) {
            try {
                $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
                $options = [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET
                ];
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, $options);
            } catch (PDOException $e) {
                // Hata durumunda log tutun (üretim ortamında hassas şifreleri ekrana basmayın)
                error_log("Veritabanı bağlantı hatası: " . $e->getMessage());
                return null;
            }
        }
        return self::$instance;
    }

    /**
     * Güvenli parametreli sorgu çalıştırıp tüm satırları döndürür
     */
    public static function fetchAll(string $sql, array $params = []): array {
        $db = self::getConnection();
        if (!$db) return [];
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /**
     * Güvenli parametreli sorgu çalıştırıp tek bir satır döndürür
     */
    public static function fetchOne(string $sql, array $params = []): ?array {
        $db = self::getConnection();
        if (!$db) return null;
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    /**
     * INSERT / UPDATE / DELETE gibi işlemleri çalıştırır
     */
    public static function execute(string $sql, array $params = []): bool {
        $db = self::getConnection();
        if (!$db) return false;
        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    }

    /**
     * Dinamik INSERT yardımcısı
     */
    public static function insert(string $table, array $data): int {
        $db = self::getConnection();
        if (!$db) return 0;

        $fields = array_keys($data);
        $placeholders = array_map(fn($f) => ":$f", $fields);

        $sql = "INSERT INTO {$table} (" . implode(',', $fields) . ") VALUES (" . implode(',', $placeholders) . ")";
        $stmt = $db->prepare($sql);
        $stmt->execute($data);
        return (int)$db->lastInsertId();
    }
}
