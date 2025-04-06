'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tipos
type OrderStatus = 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado' | 'Aguardando';

type Order = {
  id: string;
  customer: string;
  service: string;
  status: OrderStatus;
  date: string;
  amount: number;
  priority: 'Baixa' | 'Média' | 'Alta';
  technician?: string;
};

// Componente de barra de filtros
const FilterBar = ({ 
  onFilterChange,
  status,
  setStatus,
  search,
  setSearch,
  priority,
  setPriority
}: { 
  onFilterChange: (filters: { status: string; search: string; priority: string }) => void;
  status: string;
  setStatus: (status: string) => void;
  search: string;
  setSearch: (search: string) => void;
  priority: string;
  setPriority: (priority: string) => void;
}) => {
  useEffect(() => {
    onFilterChange({ status, search, priority });
  }, [status, search, priority, onFilterChange]);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Aguardando">Aguardando</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioridade
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente ou serviço..."
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

// Componente de tabela de pedidos
const OrdersTable = ({ 
  orders, 
  onStatusChange 
}: { 
  orders: Order[]; 
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      case 'Aguardando':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Baixa':
        return 'bg-gray-100 text-gray-800';
      case 'Média':
        return 'bg-yellow-100 text-yellow-800';
      case 'Alta':
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
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serviço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prioridade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                    className={`text-sm rounded-full px-2.5 py-0.5 font-medium ${getStatusColor(order.status)}`}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Aguardando">Aguardando</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {order.amount.toFixed(2)}
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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
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
        {pages.map((page) => (
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

export default function Pedidos() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Simulado
  
  // Dados de exemplo
  const mockOrders: Order[] = [
    { id: 'ORD-001', customer: 'João Silva', service: 'Manutenção Preventiva', status: 'Concluído', date: '05/04/2023', amount: 150.00, technician: 'Carlos Oliveira', priority: 'Média' },
    { id: 'ORD-002', customer: 'Maria Oliveira', service: 'Remoção de Vírus', status: 'Em Andamento', date: '04/04/2023', amount: 120.00, technician: 'Ana Santos', priority: 'Alta' },
    { id: 'ORD-003', customer: 'Carlos Santos', service: 'Upgrade de Hardware', status: 'Aguardando', date: '03/04/2023', amount: 350.00, priority: 'Baixa' },
    { id: 'ORD-004', customer: 'Ana Pereira', service: 'Recuperação de Dados', status: 'Concluído', date: '02/04/2023', amount: 280.00, technician: 'Roberto Almeida', priority: 'Alta' },
    { id: 'ORD-005', customer: 'Roberto Almeida', service: 'Manutenção Preventiva', status: 'Cancelado', date: '01/04/2023', amount: 150.00, technician: 'Carlos Oliveira', priority: 'Média' },
    { id: 'ORD-006', customer: 'Patrícia Lima', service: 'Instalação de Software', status: 'Aguardando', date: '31/03/2023', amount: 90.00, priority: 'Baixa' },
    { id: 'ORD-007', customer: 'Fernando Costa', service: 'Manutenção de Notebook', status: 'Em Andamento', date: '30/03/2023', amount: 200.00, technician: 'Ana Santos', priority: 'Média' },
    { id: 'ORD-008', customer: 'Juliana Souza', service: 'Backup de Dados', status: 'Concluído', date: '29/03/2023', amount: 180.00, technician: 'Roberto Almeida', priority: 'Baixa' },
    { id: 'ORD-009', customer: 'Ricardo Mendes', service: 'Formatação', status: 'Aguardando', date: '28/03/2023', amount: 130.00, priority: 'Média' },
    { id: 'ORD-010', customer: 'Camila Ferreira', service: 'Troca de Peças', status: 'Em Andamento', date: '27/03/2023', amount: 420.00, technician: 'Carlos Oliveira', priority: 'Alta' },
  ];
  
  // Carregar dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filtrar pedidos
  useEffect(() => {
    let result = [...orders];
    
    // Filtrar por status
    if (status) {
      result = result.filter(order => order.status === status);
    }
    
    // Filtrar por prioridade
    if (priority) {
      result = result.filter(order => order.priority === priority);
    }
    
    // Filtrar por busca
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        order => 
          order.id.toLowerCase().includes(searchLower) || 
          order.customer.toLowerCase().includes(searchLower) ||
          order.service.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // Resetar para a primeira página ao filtrar
  }, [orders, status, priority, search]);
  
  // Atualizar status do pedido
  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Novo Pedido
          </button>
        </div>
      </div>
      
      <FilterBar 
        onFilterChange={() => {}}
        status={status}
        setStatus={setStatus}
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
      />
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <OrdersTable orders={filteredOrders} onStatusChange={handleStatusChange} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
} 