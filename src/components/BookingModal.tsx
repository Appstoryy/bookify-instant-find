
import { useState } from "react";
import { Property } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { mockAdditionalServices } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface BookingModalProps {
  property: Property;
  onClose: () => void;
}

export const BookingModal = ({ property, onClose }: BookingModalProps) => {
  const [bookingData, setBookingData] = useState({
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    guests: 1,
    additionalServices: [] as string[],
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleServiceToggle = (serviceId: string) => {
    setBookingData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }));
  };

  const calculateTotal = () => {
    let total = property.price;
    
    if (bookingData.checkIn && bookingData.checkOut && property.type === 'hotel') {
      const nights = Math.ceil((bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24));
      total = property.price * nights;
    }

    const servicesTotal = bookingData.additionalServices.reduce((sum, serviceId) => {
      const service = mockAdditionalServices.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    return total + servicesTotal;
  };

  const handleBooking = () => {
    if (!bookingData.customerName || !bookingData.customerEmail || !bookingData.customerPhone) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    if (!bookingData.checkIn) {
      toast({
        title: "Ошибка",
        description: "Выберите дату бронирования",
        variant: "destructive"
      });
      return;
    }

    // Simulate booking creation
    toast({
      title: "Бронирование создано!",
      description: `Ваше бронирование на сумму ${calculateTotal().toLocaleString('ru-RU')} ₽ подтверждено`,
    });

    onClose();
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Бронирование: {property.name}
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Dates and Guests */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Дата заезда *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !bookingData.checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingData.checkIn ? format(bookingData.checkIn, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingData.checkIn}
                      onSelect={(date) => setBookingData(prev => ({ ...prev, checkIn: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {property.type === 'hotel' && (
                <div className="space-y-2">
                  <Label>Дата выезда</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !bookingData.checkOut && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingData.checkOut ? format(bookingData.checkOut, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={bookingData.checkOut}
                        onSelect={(date) => setBookingData(prev => ({ ...prev, checkOut: date }))}
                        disabled={(date) => date < new Date() || (bookingData.checkIn && date <= bookingData.checkIn)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Количество гостей</Label>
              <Select value={bookingData.guests.toString()} onValueChange={(value) => setBookingData(prev => ({ ...prev, guests: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: Math.min(property.capacity, 10) }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'гость' : num <= 4 ? 'гостя' : 'гостей'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Additional Services */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Дополнительные услуги</h3>
            <div className="space-y-3">
              {mockAdditionalServices.map((service) => (
                <div key={service.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={service.id}
                    checked={bookingData.additionalServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={service.id} className="font-medium cursor-pointer">
                      {service.name}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <p className="text-sm font-semibold text-blue-600 mt-1">
                      +{service.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Контактная информация</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя и фамилия *</Label>
                <Input
                  id="name"
                  value={bookingData.customerName}
                  onChange={(e) => setBookingData(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="Введите ваше имя"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.customerEmail}
                  onChange={(e) => setBookingData(prev => ({ ...prev, customerEmail: e.target.value }))}
                  placeholder="Введите ваш email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  value={bookingData.customerPhone}
                  onChange={(e) => setBookingData(prev => ({ ...prev, customerPhone: e.target.value }))}
                  placeholder="+7 (xxx) xxx-xx-xx"
                />
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <h4 className="font-semibold mb-3">Детали бронирования</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Объект:</span>
                  <span>{property.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Дата:</span>
                  <span>
                    {bookingData.checkIn ? format(bookingData.checkIn, "dd.MM.yyyy", { locale: ru }) : '-'}
                    {bookingData.checkOut && ` - ${format(bookingData.checkOut, "dd.MM.yyyy", { locale: ru })}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Гости:</span>
                  <span>{bookingData.guests}</span>
                </div>
                {bookingData.additionalServices.length > 0 && (
                  <div className="flex justify-between">
                    <span>Доп. услуги:</span>
                    <span>{bookingData.additionalServices.length}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Итого:</span>
                    <span>{calculateTotal().toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : prevStep}
          >
            {currentStep === 1 ? 'Отмена' : 'Назад'}
          </Button>
          
          {currentStep < 3 ? (
            <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
              Далее
            </Button>
          ) : (
            <Button onClick={handleBooking} className="bg-green-600 hover:bg-green-700">
              Забронировать за {calculateTotal().toLocaleString('ru-RU')} ₽
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
