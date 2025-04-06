'use client';

import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Básico',
    price: 'R$ 99',
    period: '/mês',
    description: 'Ideal para pequenas empresas e residências',
    features: [
      'Suporte técnico remoto',
      'Manutenção básica de hardware',
      'Instalação de software',
      'Backup local',
      'Atendimento em horário comercial',
    ],
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    name: 'Profissional',
    price: 'R$ 199',
    period: '/mês',
    description: 'Perfeito para empresas em crescimento',
    features: [
      'Todas as funcionalidades do plano Básico',
      'Suporte técnico 24/7',
      'Manutenção preventiva mensal',
      'Backup em nuvem',
      'Monitoramento de sistema',
      'Atendimento prioritário',
    ],
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'R$ 399',
    period: '/mês',
    description: 'Solução completa para grandes empresas',
    features: [
      'Todas as funcionalidades do plano Profissional',
      'Consultoria em TI dedicada',
      'Infraestrutura personalizada',
      'Segurança avançada',
      'Recuperação de dados',
      'Relatórios personalizados',
    ],
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-dark py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Planos e Preços
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-white/70">
            Escolha o plano ideal para suas necessidades
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-deepPetrolDarker rounded-xl shadow-xl p-8 ${
                plan.popular ? 'ring-2 ring-bit' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-bit text-white">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <div className="w-12 h-12 bg-bit rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={plan.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-4 text-white/70">{plan.description}</p>
                <div className="mt-6 flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold text-white/70">{plan.period}</span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bit flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                    plan.popular
                      ? 'bg-bit hover:bg-opacity-90'
                      : 'bg-petrolDark hover:bg-petrol'
                  }`}
                >
                  Começar Agora
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 