import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import HomePage from '../components/HomePage';
import ServicesPage from '../components/ServicesPage';
import AdminPanel from '../components/AdminPanel';

const API_URL = 'https://functions.poehali.dev/e932e01d-2704-41d3-b0d9-d1467b9c2823';

export interface Service {
  id: number;
  title: string;
  description: string;
  requirements: string;
  price: string;
  is_active: boolean;
}

export interface UserRequest {
  id: number;
  service_id: number;
  service_title?: string;
  phone: string;
  game_uid: string;
  telegram: string;
  status: string;
  admin_action?: string;
  created_at: string;
}

export interface SiteSettings {
  id: number;
  site_name: string;
  site_description: string;
}

function Index() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'admin'>('home');
  const [services, setServices] = useState<Service[]>([]);
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    id: 1,
    site_name: 'GenLeveling',
    site_description: 'Профессиональная прокачка аккаунтов Genshin Impact'
  });
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const [servicesRes, requestsRes, settingsRes] = await Promise.all([
        fetch(`${API_URL}?path=services`),
        fetch(`${API_URL}?path=requests`),
        fetch(`${API_URL}?path=settings`)
      ]);
      
      const servicesData = await servicesRes.json();
      const requestsData = await requestsRes.json();
      const settingsData = await settingsRes.json();
      
      setServices(servicesData);
      setRequests(requestsData);
      if (settingsData.site_name) {
        setSettings(settingsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitRequest = async (requestData: {
    service_id: number;
    phone: string;
    game_uid: string;
    telegram: string;
  }) => {
    toast({
      title: "Обработка заявки...",
      description: "Ваша заявка обрабатывается",
    });

    setTimeout(async () => {
      try {
        await fetch(`${API_URL}?path=request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });
        
        toast({
          title: "Заявка отправлена!",
          description: "Ваша заявка отправлена, ожидайте!",
        });
        
        await fetchData();
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить заявку",
          variant: "destructive"
        });
      }
    }, 3000);
  };

  const handleUpdateRequest = async (id: number, status: string, admin_action?: string) => {
    try {
      await fetch(`${API_URL}?path=request`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, admin_action })
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const handleCreateService = async (serviceData: Omit<Service, 'id' | 'is_active'>) => {
    try {
      await fetch(`${API_URL}?path=service`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      await fetchData();
      toast({
        title: "Услуга создана",
        description: "Новая услуга успешно добавлена",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать услугу",
        variant: "destructive"
      });
    }
  };

  const handleUpdateService = async (serviceData: Service) => {
    try {
      await fetch(`${API_URL}?path=service`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      await fetchData();
      toast({
        title: "Услуга обновлена",
        description: "Изменения успешно сохранены",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить услугу",
        variant: "destructive"
      });
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      await fetch(`${API_URL}?path=service-delete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      await fetchData();
      toast({
        title: "Услуга удалена",
        description: "Услуга успешно удалена",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить услугу",
        variant: "destructive"
      });
    }
  };

  const handleUpdateSettings = async (newSettings: { site_name: string; site_description: string }) => {
    try {
      await fetch(`${API_URL}?path=settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      await fetchData();
      toast({
        title: "Настройки обновлены",
        description: "Настройки сайта успешно сохранены",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить настройки",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-purple-950">
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-float">
              ⚡ {settings.site_name}
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                  currentPage === 'home'
                    ? 'game-button text-white'
                    : 'text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/30'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setCurrentPage('services')}
                className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                  currentPage === 'services'
                    ? 'game-button text-white'
                    : 'text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/30'
                }`}
              >
                Услуги
              </button>
              <button
                onClick={() => setCurrentPage('admin')}
                className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                  currentPage === 'admin'
                    ? 'game-button text-white'
                    : 'text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/30'
                }`}
              >
                Админ-панель
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage settings={settings} />}
        {currentPage === 'services' && (
          <ServicesPage services={services} onSubmitRequest={handleSubmitRequest} />
        )}
        {currentPage === 'admin' && (
          <AdminPanel
            requests={requests}
            services={services}
            settings={settings}
            isAuth={isAdminAuth}
            onAuth={setIsAdminAuth}
            onUpdateRequest={handleUpdateRequest}
            onCreateService={handleCreateService}
            onUpdateService={handleUpdateService}
            onDeleteService={handleDeleteService}
            onUpdateSettings={handleUpdateSettings}
          />
        )}
      </main>
    </div>
  );
}

export default Index;