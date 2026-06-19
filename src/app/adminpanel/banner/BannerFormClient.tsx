'use client';

import { useState } from 'react';
import { saveBanner } from '@/app/actions/bannerActions';

export default function BannerFormClient({ 
  initialData, 
  initialIsActive 
}: { 
  initialData: any, 
  initialIsActive: boolean 
}) {
  const [text, setText] = useState(initialData.text || '');
  const [icon, setIcon] = useState(initialData.icon || 'alert');
  const [link, setLink] = useState(initialData.link || '');
  const [bgColor, setBgColor] = useState(initialData.bgColor || '#E50914');
  const [isActive, setIsActive] = useState(initialIsActive);

  const presets = [
    {
      label: '📱 Telegram',
      data: { 
        text: '¡Únete a nuestro canal de Telegram para pedir películas y enterarte de estrenos!', 
        icon: 'telegram', 
        link: 'https://t.me/tu_canal', 
        bgColor: '#0088cc' 
      }
    },
    {
      label: '💬 WhatsApp',
      data: { 
        text: '¡Tenemos grupo de WhatsApp! Únete para debatir sobre películas.', 
        icon: 'whatsapp', 
        link: 'https://chat.whatsapp.com/...', 
        bgColor: '#25D366' 
      }
    },
    {
      label: '🎬 Bienvenida',
      data: { 
        text: '¡Bienvenidos a PAPU MOVIE, tu nueva web favorita de películas y series!', 
        icon: 'info', 
        link: '', 
        bgColor: '#E50914' 
      }
    },
    {
      label: '🛠️ Mantenimiento',
      data: { 
        text: 'Estamos en mantenimiento programado. Algunas funciones podrían fallar.', 
        icon: 'alert', 
        link: '', 
        bgColor: '#d97706' 
      }
    }
  ];

  const applyPreset = (data: any) => {
    setText(data.text);
    setIcon(data.icon);
    setLink(data.link);
    setBgColor(data.bgColor);
  };

  const payload = JSON.stringify({ text, icon, link, bgColor });

  return (
    <form action={saveBanner}>
      <input type="hidden" name="message" value={payload} />
      <input type="hidden" name="isActive" value={isActive.toString()} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Presets */}
        <div style={{ backgroundColor: '#0f0f0f', padding: '1.5rem', borderRadius: '12px', border: '1px solid #1f1f1f' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Anuncios Predeterminados
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(preset.data)}
                style={{
                  backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff',
                  padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2a2a2a' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#1a1a1a' }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario Custom */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ccc', textTransform: 'uppercase' }}>
              Texto del Anuncio
            </label>
            <textarea 
              rows={2}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ej: ¡Nuevo servidor de Telegram! Únete aquí..."
              style={{
                backgroundColor: '#0a0a0a', border: '1px solid #2a2a2a', color: '#fff',
                padding: '1rem', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit',
                resize: 'vertical', outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ccc', textTransform: 'uppercase' }}>
                Icono
              </label>
              <select 
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                style={{
                  backgroundColor: '#0a0a0a', border: '1px solid #2a2a2a', color: '#fff',
                  padding: '1rem', borderRadius: '8px', fontSize: '1rem', outline: 'none', cursor: 'pointer'
                }}
              >
                <option value="none">Ninguno</option>
                <option value="telegram">Telegram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="discord">Discord</option>
                <option value="alert">Alerta (Triángulo)</option>
                <option value="info">Información (Estrella/Info)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ccc', textTransform: 'uppercase' }}>
                Color de Fondo
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{
                    width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent'
                  }}
                />
                <input 
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{
                    backgroundColor: '#0a0a0a', border: '1px solid #2a2a2a', color: '#fff', flex: 1,
                    padding: '0.85rem', borderRadius: '8px', fontSize: '1rem', outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ccc', textTransform: 'uppercase' }}>
              Enlace (Opcional)
            </label>
            <input 
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://t.me/..."
              style={{
                backgroundColor: '#0a0a0a', border: '1px solid #2a2a2a', color: '#fff',
                padding: '1rem', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', outline: 'none'
              }}
            />
            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '-4px' }}>Si pones un enlace, todo el anuncio será clickeable.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ccc', textTransform: 'uppercase' }}>
              Estado del Anuncio
            </label>
            <select 
              value={isActive.toString()}
              onChange={(e) => setIsActive(e.target.value === 'true')}
              style={{
                backgroundColor: '#0a0a0a', border: '1px solid #2a2a2a', color: '#fff',
                padding: '1rem', borderRadius: '8px', fontSize: '1rem', outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="true">🟢 Activo (Mostrar en la web)</option>
              <option value="false">🔴 Inactivo (Ocultar)</option>
            </select>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            style={{
              marginTop: '1rem', backgroundColor: '#E50914', color: '#fff',
              border: 'none', padding: '1rem', borderRadius: '8px',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9' }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Guardar Configuración
          </button>
        </div>
      </div>
    </form>
  );
}
