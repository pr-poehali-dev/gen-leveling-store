import { SiteSettings } from '../pages/Index';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  settings: SiteSettings;
}

export default function HomePage({ settings }: HomePageProps) {
  return (
    <div className="space-y-16">
      <section className="text-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-3xl blur-3xl"></div>
        <div className="relative">
          <div className="inline-block mb-8 px-8 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-400/30 animate-glow">
            <span className="text-purple-300 font-bold text-lg">⚡ Быстро • 🛡️ Надежно • 🔒 Безопасно</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-float drop-shadow-2xl">
            {settings.site_name}
          </h1>
          <p className="text-2xl text-purple-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            {settings.site_description}
          </p>
          <div className="flex justify-center gap-6">
            <button className="game-button px-10 py-5 text-white rounded-2xl font-bold text-lg">
              🎮 Выбрать услугу!
            </button>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="game-card rounded-3xl p-8 animate-float">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 animate-glow">
            <Icon name="Zap" className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-purple-100">⚡ Быстрая прокачка</h3>
          <p className="text-purple-300 text-lg leading-relaxed">
            Профессиональные бустеры прокачают ваш аккаунт в кратчайшие сроки
          </p>
        </div>

        <div className="game-card rounded-3xl p-8 animate-float" style={{ animationDelay: '0.2s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 animate-glow" style={{ animationDelay: '0.5s' }}>
            <Icon name="Shield" className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-purple-100">🛡️ Безопасность</h3>
          <p className="text-purple-300 text-lg leading-relaxed">
            Гарантируем полную безопасность вашего аккаунта и конфиденциальность данных
          </p>
        </div>

        <div className="game-card rounded-3xl p-8 animate-float" style={{ animationDelay: '0.4s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 animate-glow" style={{ animationDelay: '1s' }}>
            <Icon name="Trophy" className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-purple-100">🏆 Опыт</h3>
          <p className="text-purple-300 text-lg leading-relaxed">
            Более 1000 успешно прокачанных аккаунтов, положительные отзывы клиентов
          </p>
        </div>
      </section>

      <section className="game-card rounded-3xl p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-cyan-600/30"></div>
        <div className="relative">
          <h2 className="text-5xl font-black mb-6 text-white drop-shadow-lg">🎯 Готовы начать?</h2>
          <p className="text-2xl mb-10 text-purple-200">
            Выберите подходящий пакет прокачки и оставьте заявку
          </p>
          <button className="game-button px-12 py-5 text-white rounded-2xl font-bold text-lg">
            👀 Посмотреть услуги
          </button>
        </div>
      </section>
    </div>
  );
}