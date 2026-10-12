# İki Göz

Türkçe, mobil öncelikli, ana ekrana eklenebilir kişisel ambliyopi takip uygulaması. Statik HTML/CSS/JavaScript; sunucuya seans veya profil verisi göndermez. Veriler tarayıcı localStorage alanındadır. Kaynak kodda kullanıcıya ait klinik kayıtlar yoktur.

## Kapsam

- Varsayılan sol göz; sağ/sol seçimi cihazda hatırlanır.
- Başlangıçtan dört takvim ayı, isteğe bağlı beşinci ay. Ay sonu ve artık yıl için tarih sınırları hesaplanır.
- Doktor önerisi olarak kullanıcı tarafından girilen süreyi izleyen sayaç. Uygulama arka plana geçince duraklar; farklı bir uygulamada yapılan seans sonradan elle kaydedilebilir. Sayaç sayfa yeniden açılınca sıfırlanır, kaydedilmiş seanslar korunur.
- Tarihli seans, süre ve not kaydı; JSON dışa aktarma.
- Resmî bilgilendirme videosu bağlantıları ve kaynaklar.
- Yatay ekranda her daireyi ayrı sürükleme, ortak boyut, ok tuşlarıyla/nudge düğmeleriyle hareket, ortalama, yerleşimi localStorage içinde kaydetme ve kilitleme. Kaydedilmiş konumlar tekrar açıldığında kilitli yüklenir. Ekran oranı değiştiğinde kontrol uyarısı gösterilir. Konumlar klinik göz hizalama parametreleri değildir.
- MDN CC0 çiçek örneği URL üzerinden oynatılır; tek video, ara canvas üzerinden aynı kareyi iki alana çizer. Sessiz playsinline oynatma; 20 saniye sonunda, arka plana geçişte veya pencere boyutu değişince durur. Harici video yüklenemezse yerleşim ekranı kullanılabilir. 20 saniye klinik güvenlik veya tedavi dozu değildir.
- Klinik kalibrasyon yoktur. Göz başına kontrast yalnızca hekimin girdiği yüzdelerle 20 sn canvas önizlemesinde denenebilir; 120 günlük CSV şablonu boş sütunlarla indirilir (otomatik doz yok).
- Web manifest, PNG ana ekran ikonları ve uygulama kabuğu için service worker. Harici videolar internet gerektirir. Özel siteye ilk erişim giriş gerektirebilir. Safari/PWA depolama alanları cihaz sürümüne göre farklı olabilir.

## Klinik sınır

Vivid Vision eşdeğeri değildir. Fotoğrafta Trust Exa 21494 modeli belirlenmiş ve üretici destek sayfasında doğrulanmıştır. Telefonun gözlükte fiziksel uyumu, lens karakteristikleri ve göz başına klinik ayarlar doğrulanmamıştır. 45 dakika/gün ve dört ay kullanıcı tarafından verilen klinik formdan gelir; herkese uygulanabilecek tıbbi reçete olarak kullanılmaz. Kişisel tedavi parametreleri uydurulmamıştır. Yaş ve kişisel reçete henüz bilinmiyor.

## Çalıştırma

Proje kökünden `python3 -m http.server 8765 --bind 127.0.0.1 --directory dist`.

## Doğrulama

JS söz dizimi; dört/beş aylık tarih aritmetiği, ay sonu, artık yıl, profil normalleştirme ve geçersiz veri filtreleme kontrol edildi. Yerel tarayıcıda mobil görünüm, göz/ek ay seçiminin korunması, sürükleme, kaydetme/kilitleme, yeniden açılışta kilitli konumların yüklenmesi ve çift alanlı gerçek video oynatma doğrulandı. Yatay 874 × 402 CSS piksel görünümünde kontrol yapıldı. Gerçek iPhone 17 ve Trust donanımında klinik veya optik doğrulama yapılmadı.

## 45 dakikalık film izleme

İzle bölümünde Blender Foundation resmi PeerTube kaynağından dört CC BY kısa film akışla oynatılır. Toplam içerik 2872 saniyedir (47:52). Film dosyaları değiştirilmez ve indirilip yeniden yayımlanmaz; yapım ekibi/lisans bağlantıları sunulur. Oynatma 2700 saniyelik medya ilerlemesinde durur, tamponlama/duraklama sayılmaz. Aynı gün konum ve süre yerelde hatırlanır; sonraki gün yeni sıra ve sayaç başlar. Sıra sekiz günde tekrar eder; dört ay boyunca benzersiz içerik iddiası yoktur. Birlikte görme, baskılanma veya klinik doz ölçülmez. Kullanıcının son yönlendirmesiyle 45 dakikalık liste normal tek ekran video oynatıcıya alındı. VR tedavi modu veya göz başına kontrast değişimi eklenmedi.

Araştırma taslağı 25–30 yaş grubu için değerlendirme ve izlem önerisidir. Yayımlanmış bir tedavi protokolü veya kişisel sayısal reçete değildir. `watch.v3.js` bütçe, günlük sıra ve kayıt doğrulama yardımcılarıyla sınanmıştır.
