'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: '💻',
    title: 'Manutenção Preventiva',
    description: 'Evite problemas futuros com nossa manutenção regular',
    features: [
      'Limpeza completa',
      'Atualização de drivers',
      'Verificação de hardware'
    ]
  },
  {
    icon: '🛡️',
    title: 'Remoção de Vírus',
    description: 'Proteção completa contra malware e vírus',
    features: [
      'Análise completa',
      'Instalação de antivírus',
      'Configuração de firewall'
    ]
  },
  {
    icon: '⚡',
    title: 'Upgrade de Hardware',
    description: 'Melhore o desempenho do seu computador',
    features: [
      'Troca de componentes',
      'Instalação de SSD',
      'Aumento de memória RAM'
    ]
  },
  {
    icon: '💾',
    title: 'Recuperação de Dados',
    description: 'Recupere seus arquivos importantes',
    features: [
      'Recuperação de HD',
      'Backup de dados',
      'Recuperação de arquivos deletados'
    ]
  }
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="servicos" className="py-20 bg-gradient-to-b from-byteDarker to-deepPetrolDarker relative overflow-hidden">
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
            Nossos Serviços
          </h2>
          <p className="section-description">
            Oferecemos soluções completas para todos os seus problemas de computador
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="card group relative overflow-hidden"
            >
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-bit/20 to-petrol/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                  opacity: hoveredIndex === index ? 0.8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{
                    y: hoveredIndex === index ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/70 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-center text-white/70"
                      initial={false}
                      animate={{
                        x: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-bit"
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 