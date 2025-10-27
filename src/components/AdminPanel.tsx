import { useState } from 'react';
import { Service, UserRequest, SiteSettings } from '../pages/Index';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface AdminPanelProps {
  requests: UserRequest[];
  services: Service[];
  settings: SiteSettings;
  isAuth: boolean;
  onAuth: (auth: boolean) => void;
  onUpdateRequest: (id: number, status: string, admin_action?: string) => void;
  onCreateService: (service: Omit<Service, 'id' | 'is_active'>) => void;
  onUpdateService: (service: Service) => void;
  onDeleteService: (id: number) => void;
  onUpdateSettings: (settings: { site_name: string; site_description: string }) => void;
}

export default function AdminPanel({
  requests,
  services,
  settings,
  isAuth,
  onAuth,
  onUpdateRequest,
  onCreateService,
  onUpdateService,
  onDeleteService,
  onUpdateSettings
}: AdminPanelProps) {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    requirements: '',
    price: ''
  });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editSettings, setEditSettings] = useState({
    site_name: settings.site_name,
    site_description: settings.site_description
  });

  const handleLogin = () => {
    if (loginData.username === 'skzry' && loginData.password === '568876Qqq') {
      onAuth(true);
    }
  };

  const handleCreateService = () => {
    if (newService.title && newService.description && newService.requirements && newService.price) {
      onCreateService(newService);
      setNewService({ title: '', description: '', requirements: '', price: '' });
    }
  };

  const handleUpdateService = () => {
    if (editingService) {
      onUpdateService(editingService);
      setEditingService(null);
    }
  };

  const handleDeleteService = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
      onDeleteService(id);
    }
  };

  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Вход в админ-панель
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500">
              Войти
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Админ-панель
        </h1>
        <Button onClick={() => onAuth(false)} variant="outline">
          Выйти
        </Button>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests">Заявки ({requests.length})</TabsTrigger>
          <TabsTrigger value="services">Услуги ({services.length})</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          {requests.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Нет заявок</p>
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{request.service_title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleString('ru-RU')}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      request.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : request.status === 'accepted'
                        ? 'bg-blue-100 text-blue-700'
                        : request.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {request.status === 'pending'
                      ? 'Ожидает'
                      : request.status === 'accepted'
                      ? 'Принято'
                      : request.status === 'completed'
                      ? 'Выполнено'
                      : 'Отклонено'}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Телефон:</span>
                    <p className="font-semibold">{request.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">UID:</span>
                    <p className="font-semibold">{request.game_uid}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Telegram:</span>
                    <p className="font-semibold">{request.telegram}</p>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onUpdateRequest(request.id, 'accepted')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Принять
                    </Button>
                    <Button
                      onClick={() => onUpdateRequest(request.id, 'rejected')}
                      variant="destructive"
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Отклонить
                    </Button>
                  </div>
                )}

                {request.status === 'accepted' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onUpdateRequest(request.id, 'completed', 'completed')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Icon name="CheckCheck" size={16} className="mr-2" />
                      Выполнено
                    </Button>
                    <Button
                      onClick={() => onUpdateRequest(request.id, 'cancelled', 'cancelled')}
                      variant="outline"
                    >
                      <Icon name="XCircle" size={16} className="mr-2" />
                      Отменено
                    </Button>
                  </div>
                )}
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Создать новую услугу</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Название</Label>
                <Input
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="Прокачка Adventure Rank"
                />
              </div>
              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Быстрая прокачка ранга приключений"
                />
              </div>
              <div className="space-y-2">
                <Label>Требования</Label>
                <Textarea
                  value={newService.requirements}
                  onChange={(e) => setNewService({ ...newService, requirements: e.target.value })}
                  placeholder="AR 1-20, доступ к аккаунту"
                />
              </div>
              <div className="space-y-2">
                <Label>Цена</Label>
                <Input
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  placeholder="1500₽"
                />
              </div>
              <Button onClick={handleCreateService} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500">
                Создать услугу
              </Button>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold">{service.title}</h4>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingService(service)}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Pencil" size={16} className="text-blue-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteService(service.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Trash2" size={16} className="text-red-600" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                <span className="text-blue-600 font-semibold">{service.price}</span>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Настройки сайта</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Название сайта</Label>
                <Input
                  value={editSettings.site_name}
                  onChange={(e) => setEditSettings({ ...editSettings, site_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea
                  value={editSettings.site_description}
                  onChange={(e) =>
                    setEditSettings({ ...editSettings, site_description: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={() => onUpdateSettings(editSettings)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500"
              >
                Сохранить изменения
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать услугу</DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Название</Label>
                <Input
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({ ...editingService, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Требования</Label>
                <Textarea
                  value={editingService.requirements}
                  onChange={(e) =>
                    setEditingService({ ...editingService, requirements: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Цена</Label>
                <Input
                  value={editingService.price}
                  onChange={(e) =>
                    setEditingService({ ...editingService, price: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={handleUpdateService}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500"
              >
                Сохранить изменения
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}