import Error from 'next/error';

const CustomError = ({ statusCode }) => {
  let title;
  switch (statusCode) {
    case 400:
      title = 'Geçersiz İstek';
      break;
    case 401:
      title = 'Kimlik Doğrulaması Yapılamadı';
      break;
    case 402:
      title = 'Ödeme Gerekli';
      break;
    case 403:
      title = 'Erişim Hakkına Sahip Değil';
      break;
    case 404:
      title = 'Geçersiz Url';
      break;
    case 405:
      title = 'İzinsiz Metod';
      break;
    case 406:
      title = 'Kabul Edilemez';
      break;
    case 407:
      title = 'Proxy Kimlik Doğrulaması Gerekli';
      break;
    case 408:
      title = 'İstek Zaman Aşımına Uğradı';
      break;
    case 409:
      title = 'Çelişki';
      break;
    case 410:
      title = 'Tamamen Silindi';
      break;
    case 411:
      title = 'Uzunluk Gerekli';
      break;
    case 412:
      title = 'Önkoşul Başarısız';
      break;
    case 413:
      title = 'Payload Çok Büyük';
      break;
    case 414:
      title = 'URI Çok Uzun';
      break;
    case 415:
      title = 'Desteklenmeyen Medya Tipi';
      break;
    case 422:
      title = 'İşlenemeyen Varlık';
      break;
    case 500:
      title = 'İç Sunucu Hatası';
      break;
    case 501:
      title = 'Henüz Uygulanmadı';
      break;
    case 502:
      title = 'Bozuk Ağ Geçidi';
      break;
    case 503:
      title = 'Hizmet Kullanılamıyor';
      break;
    case 504:
      title = 'Ağ Geçidi Zaman Aşımı';
      break;
    default:
      title = 'Status Code algılanamadı.';
      break;
  }

  return <Error statusCode={statusCode} title={title} />;
};
// res serverside , err client side errorlar için
CustomError.getInitialProps = ({ err, res }) => {
  return { statusCode: res ? res.statusCode : err ? err.statusCode : 404 };
};

export default CustomError;
