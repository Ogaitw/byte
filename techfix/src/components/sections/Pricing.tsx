'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const plans = [
  {
    name: 'Básico',
    price: '99,90',
    features: [
      'Limpeza básica',
      'Remoção de vírus',
      'Atualização de Windows',
      'Suporte por 7 dias'
    ],
    popular: false
  },
  {
    name: 'Profissional',
    price: '199,90',
    features: [
      'Limpeza completa',
      'Remoção de vírus',
      'Atualização de drivers',
      'Backup de dados',
      'Suporte por 30 dias'
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: '299,90',
    features: [
      'Limpeza completa',
      'Remoção de vírus',
      'Upgrade de hardware',
      'Backup em nuvem',
      'Suporte por 90 dias'
    ],
    popular: false
  }
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="precos" className="py-20 bg-gradient-to-b from-deepPetrolDarker to-byteDarker relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Planos e Preços
          </h2>
          <p className="section-description mb-8">
            Escolha o plano ideal para suas necessidades
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg ${!isAnnual ? 'text-bit font-semibold' : 'text-white/70'}`}>
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-bit/30 rounded-full p-1 transition-colors"
            >
              <motion.div
                animate={{ x: isAnnual ? 28 : 0 }}
                className="w-5 h-5 bg-bit rounded-full"
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-bit font-semibold' : 'text-white/70'}`}>
              Anual
              <span className="text-sm text-accent ml-1">-20%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-bit to-petrol text-white shadow-bit-lg'
                  : 'bg-byte text-white shadow-petrol'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-bit/20 to-petrol/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{
                  scale: hoveredIndex === index ? 1.05 : 1,
                  opacity: hoveredIndex === index ? 0.8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ {isAnnual ? (parseFloat(plan.price.replace(',', '.')) * 0.8).toFixed(2).replace('.', ',') : plan.price}</span>
                  <span className="text-white/70">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-center"
                      initial={false}
                      animate={{
                        x: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    plan.popular
                      ? 'bg-white text-bit hover:bg-white/90'
                      : 'bg-bit text-white hover:bg-bitDark'
                  }`}
                >
                  Escolher Plano
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 