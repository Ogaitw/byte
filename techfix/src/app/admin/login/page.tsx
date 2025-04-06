'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verificar se já está logado
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simular um atraso para demonstrar o carregamento
    setTimeout(() => {
      // Credenciais de demonstração
      if (email === 'admin@techfix.com.br' && password === 'admin123') {
        try {
          localStorage.setItem('adminToken', 'demo-token');
          router.push('/admin/dashboard');
        } catch (err) {
          console.error('Erro ao salvar token:', err);
          setError('Erro ao fazer login. Tente novamente.');
          setIsLoading(false);
        }
      } else {
        setError('Credenciais inválidas');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-deepPetrolDarker p-8 rounded-xl shadow-lg border border-petrolDark"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-bit rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Painel Administrativo</h2>
          <p className="text-white/70 mt-2">Faça login para acessar o painel</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-byteDarker border border-petrolDark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-bit"
              placeholder="seu@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-byteDarker border border-petrolDark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-bit"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-bit focus:ring-bit border-petrolDark rounded bg-byteDarker"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                Lembrar-me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-bit hover:text-bitDark">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-bit text-white rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bit disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/50">
          <p>Credenciais de demonstração:</p>
          <p>Email: admin@techfix.com.br</p>
          <p>Senha: admin123</p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-bit hover:text-bitDark text-sm">
            Voltar para o site
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 