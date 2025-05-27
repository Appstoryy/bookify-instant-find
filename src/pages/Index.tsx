
import { useState } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { BookingModal } from "@/components/BookingModal";
import { mockProperties } from "@/data/mockData";
import { Property } from "@/types/booking";

const Index = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setShowBookingModal(true);
  };

  const handleFilter = (filters: any) => {
    let filtered = mockProperties;
    
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    
    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Bookify
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Найдите и забронируйте идеальное место для любого случая
            </p>
          </div>
          
          <SearchFilters onFilter={handleFilter} />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Доступные объекты
          </h2>
          <p className="text-gray-600">
            Найдено {filteredProperties.length} объектов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={handlePropertySelect}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить критерии поиска
            </p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedProperty && (
        <BookingModal
          property={selectedProperty}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
