// YandexMap
function map() {
  const mapBlock = $('#map');
  if (mapBlock.length) {
    const coord = mapBlock.data('coord');
    ymaps.ready(function () {
      initYandexMap();
    });
    function initYandexMap() {
      var myMap;
      myMap = new ymaps.Map("map", {
        center: coord, // Центер карты
        zoom: 16, // Коэффициент масштаба карты
        controls: [ // Элементы управления
          'zoomControl',
          // 'searchControl',
          // 'typeSelector',
          // 'fullscreenControl',
          // 'routeButtonControl'
        ]
      });
      // Метка со своим изображением, балуном и хинтом
      var myPlacemark = new ymaps.Placemark(coord, null, {
        iconLayout: 'default#image',
        iconImageHref: 'img/placemark.svg',
        iconImageSize: [32, 42],
        iconImageOffset: [-15, -44]
      });
      myMap.geoObjects
      .add(myPlacemark);
      // myPlacemark.balloon.open(); // Открыть балун метки
      myMap.behaviors.disable('scrollZoom'); // Отключить изменение масштаба скроллом мыши
    }
  }
}
map();