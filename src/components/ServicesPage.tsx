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
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-float">
          🎮 Услуги
        </h1>
        <p className="text-purple-200 text-xl">
          Выберите подходящую услугу и оставьте заявку
        </p>
      </div>

      {services.length === 0 ? (
        <div className="game-card rounded-3xl p-16 text-center animate-float">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
            <Icon name="Package" className="text-white" size={48} />
          </div>
          <h3 className="text-3xl font-bold text-purple-100 mb-3">📦 Услуги добавляются администратором</h3>
          <p className="text-purple-300 text-lg">Скоро здесь появятся доступные услуги</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="game-card rounded-3xl p-8 animate-float"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl font-bold text-purple-100">{service.title}</h3>
                <span className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg">
                  {service.price}
                </span>
              </div>
              
              <p className="text-purple-300 mb-6 text-lg leading-relaxed">{service.description}</p>
              
              <div className="bg-purple-900/30 rounded-2xl p-5 mb-6 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="CheckCircle2" className="text-cyan-400" size={24} />
                  <span className="font-bold text-purple-100 text-lg">⚡ Требования:</span>
                </div>
                <p className="text-purple-300 ml-9">{service.requirements}</p>
              </div>

              <Button
                onClick={() => setSelectedService(service)}
                className="game-button w-full py-6 text-lg font-bold"
              >
                📝 Отправить запрос
              </Button>
            </div>
          ))}
        </div>
      )}

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