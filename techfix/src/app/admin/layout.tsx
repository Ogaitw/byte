'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';

// Componente de proteção de rota
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (token && pathname === '/admin/login') {
        // Se já estiver logado e estiver na página de login, redirecionar para o dashboard
        router.push('/admin/dashboard');
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-byteDarker">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bit"></div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  return <>{children}</>;
};

// Componente de cabeçalho
const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-byteDarker shadow-sm z-10 border-b border-petrolDark">
      <div className="flex items-center justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Painel Administrativo</h1>
            
            <div className="flex items-center space-x-4">
              <button className="text-white/80 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-2 text-white/80 hover:text-white">
                  <div className="w-8 h-8 bg-bit rounded-full flex items-center justify-center text-white">
                    A
                  </div>
                  <span className="hidden md:block">Admin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Não mostrar o layout na página de login
  if (pathname === '/admin/login') {
    return <AuthGuard>{children}</AuthGuard>;
  }
  
  return (
    <AuthGuard>
      <div className="min-h-screen bg-byteDarker">
        <Sidebar />
        <Header />
        
        <main className="pt-16 min-h-screen lg:ml-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
} 