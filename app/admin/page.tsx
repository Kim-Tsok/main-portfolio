import {redirect} from 'next/navigation';
import {adminSession} from '@/lib/admin';
import ContentDashboard from '@/components/admin/content-dashboard';
export default async function AdminPage(){if(!await adminSession())redirect('/admin/login');return <ContentDashboard/>;}
