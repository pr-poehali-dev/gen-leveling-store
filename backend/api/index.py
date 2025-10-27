'''
Business: API для управления заявками и настройками сайта GenLeveling
Args: event - HTTP запрос с методом, телом, параметрами
      context - объект контекста с request_id
Returns: HTTP ответ с данными заявок, услуг или настроек
'''
import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    path: str = event.get('queryStringParameters', {}).get('path', '')
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
    }
    
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}
    
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Получить все услуги
    if method == 'GET' and path == 'services':
        cursor.execute('SELECT * FROM boost_services WHERE is_active = true ORDER BY id')
        services = cursor.fetchall()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps([dict(s) for s in services], default=str)
        }
    
    # Получить заявки
    if method == 'GET' and path == 'requests':
        cursor.execute('''
            SELECT ur.*, bs.title as service_title 
            FROM user_requests ur 
            LEFT JOIN boost_services bs ON ur.service_id = bs.id 
            ORDER BY ur.created_at DESC
        ''')
        requests = cursor.fetchall()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps([dict(r) for r in requests], default=str)
        }
    
    # Получить настройки
    if method == 'GET' and path == 'settings':
        cursor.execute('SELECT * FROM site_settings ORDER BY id DESC LIMIT 1')
        settings = cursor.fetchone()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(dict(settings) if settings else {}, default=str)
        }
    
    # Создать заявку
    if method == 'POST' and path == 'request':
        body = json.loads(event.get('body', '{}'))
        cursor.execute('''
            INSERT INTO user_requests (service_id, phone, game_uid, telegram, status)
            VALUES (%s, %s, %s, %s, 'pending')
            RETURNING id
        ''', (body['service_id'], body['phone'], body['game_uid'], body['telegram']))
        request_id = cursor.fetchone()['id']
        conn.commit()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'id': request_id, 'status': 'pending'})
        }
    
    # Обновить статус заявки (админ)
    if method == 'PUT' and path == 'request':
        body = json.loads(event.get('body', '{}'))
        cursor.execute('''
            UPDATE user_requests 
            SET status = %s, admin_action = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
        ''', (body['status'], body.get('admin_action'), body['id']))
        conn.commit()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True})
        }
    
    # Создать услугу (админ)
    if method == 'POST' and path == 'service':
        body = json.loads(event.get('body', '{}'))
        cursor.execute('''
            INSERT INTO boost_services (title, description, requirements, price)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        ''', (body['title'], body['description'], body['requirements'], body['price']))
        service_id = cursor.fetchone()['id']
        conn.commit()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'id': service_id})
        }
    
    # Обновить услугу (админ)
    if method == 'PUT' and path == 'service':
        body = json.loads(event.get('body', '{}'))
        cursor.execute('''
            UPDATE boost_services 
            SET title = %s, description = %s, requirements = %s, price = %s
            WHERE id = %s
        ''', (body['title'], body['description'], body['requirements'], body['price'], body['id']))
        conn.commit()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True})
        }
    
    # Удалить услугу (админ)
    if method == 'PUT' and path == 'service-delete':
        body = json.loads(event.get('body', '{}'))
        cursor.execute('''
            UPDATE boost_services 
            SET is_active = false
            WHERE id = %s
        ''', (body['id'],))
        conn.commit()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True})
        }
    
    # Обновить настройки (админ)
    if method == 'PUT' and path == 'settings':
        body = json.loads(event.get('body', '{}'))
        cursor.execute('''
            UPDATE site_settings 
            SET site_name = %s, site_description = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = 1
        ''', (body['site_name'], body['site_description']))
        conn.commit()
        cursor.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True})
        }
    
    cursor.close()
    conn.close()
    return {
        'statusCode': 404,
        'headers': headers,
        'body': json.dumps({'error': 'Not found'})
    }