'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tipos
type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: 'Hardware' | 'Software' | 'Rede' | 'Segurança';
  status: 'Ativo' | 'Inativo';
  icon: string;
};

// Componente de barra de filtros
const FilterBar = ({ 
  onFilterChange 
}: { 
  onFilterChange: (filters: { search: string; category: string; status: string }) => void 
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  
  useEffect(() => {
    onFilterChange({ search, category, status });
  }, [search, category, status, onFilterChange]);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou descrição..."
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Rede">Rede</option>
            <option value="Segurança">Segurança</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Componente de card de serviço
const ServiceCard = ({ 
  service, 
  onStatusChange 
}: { 
  service: Service; 
  onStatusChange: (serviceId: string, newStatus: 'Ativo' | 'Inativo') => void;
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Hardware':
        return 'bg-blue-100 text-blue-800';
      case 'Software':
        return 'bg-green-100 text-green-800';
      case 'Rede':
        return 'bg-purple-100 text-purple-800';
      case 'Segurança':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Inativo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
            </svg>
          </div>
          <select
            value={service.status}
            onChange={(e) => onStatusChange(service.id, e.target.value as 'Ativo' | 'Inativo')}
            className={`text-sm rounded-full px-2.5 py-0.5 font-medium ${getStatusColor(service.status)}`}
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {service.name}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Duração: {service.duration}
          </span>
          <span className="font-medium text-gray-900">
            R$ {service.price.toFixed(2)}
          </span>
        </div>
        
        <div className="mt-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
            {service.category}
          </span>
        </div>
        
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Editar
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
            Excluir
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Servicos() {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  
  // Dados de exemplo
  const mockServices: Service[] = [
    {
      id: 'SERV-001',
      name: 'Manutenção Preventiva',
      description: 'Manutenção regular para prevenir problemas e manter o desempenho do computador.',
      price: 150.00,
      duration: '2 horas',
      category: 'Hardware',
      status: 'Ativo',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
    },
    {
      id: 'SERV-002',
      name: 'Remoção de Vírus',
      description: 'Identificação e remoção de vírus, malware e outros programas maliciosos.',
      price: 120.00,
      duration: '1 hora',
      category: 'Software',
      status: 'Ativo',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    },
    {
      id: 'SERV-003',
      name: 'Upgrade de Hardware',
      description: 'Atualização de componentes para melhorar o desempenho do computador.',
      price: 450.00,
      duration: '4 horas',
      category: 'Hardware',
      status: 'Ativo',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
    },
    {
      id: 'SERV-004',
      name: 'Configuração de Rede',
      description: 'Instalação e configuração de redes domésticas e empresariais.',
      price: 200.00,
      duration: '3 horas',
      category: 'Rede',
      status: 'Ativo',
      icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
    },
    {
      id: 'SERV-005',
      name: 'Backup de Dados',
      description: 'Criação de cópias de segurança dos seus dados importantes.',
      price: 180.00,
      duration: '2 horas',
      category: 'Software',
      status: 'Ativo',
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
    },
    {
      id: 'SERV-006',
      name: 'Segurança de Rede',
      description: 'Implementação de medidas de segurança para proteger sua rede.',
      price: 350.00,
      duration: '4 horas',
      category: 'Segurança',
      status: 'Inativo',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    }
  ];
  
  // Carregar dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(mockServices);
      setFilteredServices(mockServices);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filtrar serviços
  const handleFilterChange = (filters: { search: string; category: string; status: string }) => {
    let filtered = [...services];
    
    if (filters.category) {
      filtered = filtered.filter(service => service.category === filters.category);
    }
    
    if (filters.status) {
      filtered = filtered.filter(service => service.status === filters.status);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        service => 
          service.name.toLowerCase().includes(searchLower) ||
          service.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredServices(filtered);
  };
  
  // Atualizar status do serviço
  const handleStatusChange = (serviceId: string, newStatus: 'Ativo' | 'Inativo') => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, status: newStatus } : service
    ));
    setFilteredServices(filteredServices.map(service => 
      service.id === serviceId ? { ...service, status: newStatus } : service
    ));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Serviços</h1>
        <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Serviço
        </button>
      </div>
      
      <FilterBar onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard 
            key={service.id}
            service={service}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
} 