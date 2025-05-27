
import { Property } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export const PropertyCard = ({ property, onSelect }: PropertyCardProps) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel': return 'Отель';
      case 'restaurant': return 'Ресторан';
      case 'conference': return 'Конференц-зал';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'bg-blue-100 text-blue-800';
      case 'restaurant': return 'bg-green-100 text-green-800';
      case 'conference': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${getTypeColor(property.type)} border-0`}>
            {getTypeLabel(property.type)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-xs text-gray-500">({property.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {property.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-3">{property.location}</p>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {property.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - 3} еще
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">
              {property.price.toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-sm text-gray-500">
              за {property.type === 'hotel' ? 'ночь' : property.type === 'restaurant' ? 'стол' : 'час'}
            </div>
          </div>
          
          <Button 
            onClick={() => onSelect(property)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
          >
            Забронировать
          </Button>
        </div>
      </div>
    </div>
  );
};
