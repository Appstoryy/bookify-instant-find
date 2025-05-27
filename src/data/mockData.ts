
import { Property, AdditionalService } from "@/types/booking";

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Grand Hotel Москва',
    type: 'hotel',
    location: 'Москва, центр',
    price: 8500,
    currency: 'RUB',
    rating: 4.8,
    reviews: 324,
    image: '/placeholder.svg',
    description: 'Роскошный отель в самом сердце Москвы с панорамным видом на Красную площадь',
    amenities: ['Wi-Fi', 'Завтрак', 'Спа', 'Фитнес-центр', 'Парковка'],
    capacity: 4
  },
  {
    id: '2',
    name: 'Ресторан "Белуга"',
    type: 'restaurant',
    location: 'Санкт-Петербург',
    price: 3500,
    currency: 'RUB',
    rating: 4.9,
    reviews: 156,
    image: '/placeholder.svg',
    description: 'Изысканная кухня и атмосфера премиум-класса в историческом центре',
    amenities: ['Живая музыка', 'Винная карта', 'Веранда', 'Парковка'],
    capacity: 50
  },
  {
    id: '3',
    name: 'Конференц-зал "Инновации"',
    type: 'conference',
    location: 'Москва, Сити',
    price: 15000,
    currency: 'RUB',
    rating: 4.7,
    reviews: 89,
    image: '/placeholder.svg',
    description: 'Современный конференц-зал с новейшим оборудованием для деловых мероприятий',
    amenities: ['Проектор', 'Микрофоны', 'Wi-Fi', 'Кофе-брейк', 'Парковка'],
    capacity: 100
  },
  {
    id: '4',
    name: 'Бутик-отель "Эрмитаж"',
    type: 'hotel',
    location: 'Санкт-Петербург',
    price: 6200,
    currency: 'RUB',
    rating: 4.6,
    reviews: 198,
    image: '/placeholder.svg',
    description: 'Уютный бутик-отель рядом с Эрмитажем в стиле классической Европы',
    amenities: ['Wi-Fi', 'Завтрак', 'Консьерж', 'Камин'],
    capacity: 2
  },
  {
    id: '5',
    name: 'Ресторан "Прованс"',
    type: 'restaurant',
    location: 'Екатеринбург',
    price: 2800,
    currency: 'RUB',
    rating: 4.4,
    reviews: 112,
    image: '/placeholder.svg',
    description: 'Французская кухня и уютная атмосфера прованских кафе',
    amenities: ['Терраса', 'Детское меню', 'Парковка'],
    capacity: 30
  },
  {
    id: '6',
    name: 'Зал "Панорама"',
    type: 'conference',
    location: 'Новосибирск',
    price: 9500,
    currency: 'RUB',
    rating: 4.5,
    reviews: 67,
    image: '/placeholder.svg',
    description: 'Конференц-зал с панорамными окнами и видом на город',
    amenities: ['Проектор', 'Кондиционер', 'Wi-Fi', 'Буфет'],
    capacity: 60
  }
];

export const mockAdditionalServices: AdditionalService[] = [
  {
    id: '1',
    name: 'Завтрак в номер',
    price: 1200,
    description: 'Континентальный завтрак с доставкой в номер'
  },
  {
    id: '2',
    name: 'Трансфер из аэропорта',
    price: 2500,
    description: 'Комфортабельный трансфер на премиум автомобиле'
  },
  {
    id: '3',
    name: 'Дополнительная уборка',
    price: 800,
    description: 'Дополнительная уборка номера'
  },
  {
    id: '4',
    name: 'Букет цветов',
    price: 1500,
    description: 'Свежий букет сезонных цветов'
  },
  {
    id: '5',
    name: 'Техническая поддержка',
    price: 3000,
    description: 'Персональный технический специалист на мероприятии'
  }
];
