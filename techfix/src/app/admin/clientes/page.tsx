'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tipos
type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  lastOrder: string;
  status: 'Ativo' | 'Inativo';
};

// Componente de barra de filtros
const FilterBar = ({ 
  onFilterChange 
}: { 
  onFilterChange: (filters: { search: string; status: string }) => void 
}) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  
  useEffect(() => {
    onFilterChange({ search, status });
  }, [search, status, onFilterChange]);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, email ou telefone..."
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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

// Componente de tabela de clientes
const CustomersTable = ({ 
  customers, 
  onStatusChange 
}: { 
  customers: Customer[]; 
  onStatusChange: (customerId: string, newStatus: 'Ativo' | 'Inativo') => void;
}) => {
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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Endereço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total de Pedidos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Último Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.totalOrders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.lastOrder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={customer.status}
                    onChange={(e) => onStatusChange(customer.id, e.target.value as 'Ativo' | 'Inativo')}
                    className={`text-sm rounded-full px-2.5 py-0.5 font-medium ${getStatusColor(customer.status)}`}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente de paginação
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 mt-6">
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default function Clientes() {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Dados de exemplo
  const mockCustomers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      address: 'Rua A, 123 - São Paulo, SP',
      totalOrders: 5,
      lastOrder: '2024-04-06',
      status: 'Ativo'
    },
    {
      id: 'CUST-002',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(11) 98888-8888',
      address: 'Rua B, 456 - São Paulo, SP',
      totalOrders: 3,
      lastOrder: '2024-04-05',
      status: 'Ativo'
    },
    {
      id: 'CUST-003',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone: '(11) 97777-7777',
      address: 'Rua C, 789 - São Paulo, SP',
      totalOrders: 2,
      lastOrder: '2024-04-04',
      status: 'Inativo'
    },
    {
      id: 'CUST-004',
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      phone: '(11) 96666-6666',
      address: 'Rua D, 321 - São Paulo, SP',
      totalOrders: 1,
      lastOrder: '2024-04-03',
      status: 'Ativo'
    },
    {
      id: 'CUST-005',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@email.com',
      phone: '(11) 95555-5555',
      address: 'Rua E, 654 - São Paulo, SP',
      totalOrders: 4,
      lastOrder: '2024-04-02',
      status: 'Ativo'
    }
  ];
  
  // Carregar dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filtrar clientes
  const handleFilterChange = (filters: { search: string; status: string }) => {
    let filtered = [...customers];
    
    if (filters.status) {
      filtered = filtered.filter(customer => customer.status === filters.status);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        customer => 
          customer.name.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.phone.includes(searchLower)
      );
    }
    
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };
  
  // Atualizar status do cliente
  const handleStatusChange = (customerId: string, newStatus: 'Ativo' | 'Inativo') => {
    setCustomers(customers.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
    setFilteredCustomers(filteredCustomers.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
  };
  
  // Calcular paginação
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
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
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Cliente
        </button>
      </div>
      
      <FilterBar onFilterChange={handleFilterChange} />
      
      <CustomersTable 
        customers={paginatedCustomers} 
        onStatusChange={handleStatusChange}
      />
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
} 