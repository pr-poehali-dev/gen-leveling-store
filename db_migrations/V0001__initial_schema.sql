-- Таблица настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    site_name VARCHAR(255) NOT NULL DEFAULT 'GenLeveling',
    site_description TEXT DEFAULT 'Профессиональная прокачка аккаунтов Genshin Impact',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица услуг прокачки
CREATE TABLE IF NOT EXISTS boost_services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    price VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заявок пользователей
CREATE TABLE IF NOT EXISTS user_requests (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES boost_services(id),
    phone VARCHAR(50) NOT NULL,
    game_uid VARCHAR(100) NOT NULL,
    telegram VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    admin_action VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных настроек
INSERT INTO site_settings (site_name, site_description) 
VALUES ('GenLeveling', 'Профессиональная прокачка аккаунтов Genshin Impact');

-- Вставка примеров услуг
INSERT INTO boost_services (title, description, requirements, price) VALUES
('Прокачка Adventure Rank до 30', 'Быстрая прокачка ранга приключений до 30 уровня', 'AR 1-20, доступ к аккаунту', '1500₽'),
('Прокачка Adventure Rank до 50', 'Прокачка до 50 уровня с выполнением квестов', 'AR 20-40, доступ к аккаунту', '3000₽'),
('Фарм персонажей', 'Прокачка выбранного персонажа до 90 уровня', 'AR 30+, материалы в наличии', '2000₽'),
('Прохождение Abyss', 'Полное прохождение Витой Бездны', 'AR 45+, прокачанная команда', '2500₽');