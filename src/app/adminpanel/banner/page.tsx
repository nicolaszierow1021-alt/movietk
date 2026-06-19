import { supabase } from '@/lib/supabase';
import BannerFormClient from './BannerFormClient';

export const dynamic = 'force-dynamic';

export default async function BannerManagementPage() {
  const { data: announcements } = await supabase.from('Announcement').select('*').limit(1);
  const currentBanner = announcements && announcements.length > 0 ? announcements[0] : null;

  let initialData = { text: '', icon: 'alert', link: '', bgColor: '#E50914' };
  if (currentBanner?.message) {
    try {
      initialData = JSON.parse(currentBanner.message);
    } catch (e) {
      initialData.text = currentBanner.message;
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
          Gestión de Anuncios
        </h1>
        <p style={{ color: '#555', fontSize: '0.9rem' }}>
          Configura el banner global que aparece en la parte superior de la web.
        </p>
      </div>

      <div style={{
        backgroundColor: '#141414', border: '1px solid #1f1f1f',
        borderRadius: '12px', padding: '2rem', maxWidth: '800px'
      }}>
        <BannerFormClient 
          initialData={initialData} 
          initialIsActive={currentBanner ? currentBanner.isActive : false} 
        />
      </div>
    </div>
  );
}
