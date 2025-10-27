import { SiteSettings } from '../pages/Index';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  settings: SiteSettings;
}

export default function HomePage({ settings }: HomePageProps) {
  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <div className="inline-block mb-6 px-6 py-2 bg-blue-100 rounded-full">
          <span className="text-blue-600 font-semibold">⚡ Быстро • Надежно • Безопасно</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
          {settings.site_name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          {settings.site_description}
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all shadow-lg shadow-blue-500/50">
            Начать прокачку
          </button>
          <button className="px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all">
            Узнать больше
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Icon name="Zap" className="text-blue-600" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Быстрая прокачка</h3>
          <p className="text-gray-600">
            Профессиональные бустеры прокачают ваш аккаунт в кратчайшие сроки
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
            <Icon name="Shield" className="text-cyan-600" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Безопасность</h3>
          <p className="text-gray-600">
            Гарантируем полную безопасность вашего аккаунта и конфиденциальность данных
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Icon name="Trophy" className="text-blue-600" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Опыт</h3>
          <p className="text-gray-600">
            Более 1000 успешно прокачанных аккаунтов, положительные отзывы клиентов
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
        <p className="text-xl mb-8 opacity-90">
          Выберите подходящий пакет прокачки и оставьте заявку
        </p>
        <button className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
          Посмотреть услуги
        </button>
      </section>
    </div>
  );
}
