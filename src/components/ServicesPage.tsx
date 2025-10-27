import { useState } from 'react';
import { Service } from '../pages/Index';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ServicesPageProps {
  services: Service[];
  onSubmitRequest: (data: {
    service_id: number;
    phone: string;
    game_uid: string;
    telegram: string;
  }) => void;
}

export default function ServicesPage({ services, onSubmitRequest }: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    phone: '',
    game_uid: '',
    telegram: ''
  });

  const handleSubmit = () => {
    if (selectedService && formData.phone && formData.game_uid && formData.telegram) {
      onSubmitRequest({
        service_id: selectedService.id,
        ...formData
      });
      setSelectedService(null);
      setFormData({ phone: '', game_uid: '', telegram: '' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Услуги</h1>
        <p className="text-gray-600 text-lg">
          Выберите подходящую услугу и оставьте заявку
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full font-semibold">
                {service.price}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="CheckCircle2" className="text-blue-600" size={20} />
                <span className="font-semibold text-gray-800">Требования:</span>
              </div>
              <p className="text-gray-600 text-sm ml-7">{service.requirements}</p>
            </div>

            <Button
              onClick={() => setSelectedService(service)}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:scale-105 transition-all"
            >
              Отправить запрос
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Заявка на прокачку</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">{selectedService.title}</p>
                <p className="text-blue-600 font-bold">{selectedService.price}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uid">UID аккаунта</Label>
                <Input
                  id="uid"
                  placeholder="123456789"
                  value={formData.game_uid}
                  onChange={(e) => setFormData({ ...formData, game_uid: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram</Label>
                <Input
                  id="telegram"
                  placeholder="@username"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500"
                disabled={!formData.phone || !formData.game_uid || !formData.telegram}
              >
                Отправить заявку
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}