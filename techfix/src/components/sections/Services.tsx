'use client';

import { motion } from 'framer-motion';

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
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
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
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 