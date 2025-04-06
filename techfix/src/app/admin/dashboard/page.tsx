'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tipos
type Order = {
  id: string;
  customer: string;
  service: string;
  status: 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';
  date: string;
  amount: number;
};

type Activity = {
  id: string;
  user: string;
  action: string;
  timestamp: string;
};

// Componente de card de estatística
const StatCard = ({ 
  title, 
  value, 
  change, 
  icon 
}: { 
  title: string; 
  value: string; 
  change?: string; 
  icon: string;
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-sm font-medium text-green-600 mt-1">
              {change}
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// Componente de gráfico
const Chart = ({ data }: { data: number[] }) => {
  const maxValue = Math.max(...data);
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">Pedidos por Mês</h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((value, index) => (
          <motion.div
            key={index}
            className="flex-1 bg-blue-500 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${(value / maxValue) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>Jan</span>
        <span>Fev</span>
        <span>Mar</span>
        <span>Abr</span>
        <span>Mai</span>
        <span>Jun</span>
      </div>
    </motion.div>
  );
};

// Componente de pedidos recentes
const RecentOrders = ({ orders }: { orders: Order[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pedidos Recentes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
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
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {order.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

// Componente de atividades recentes
const RecentActivities = ({ activities }: { activities: Activity[] }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Atividades Recentes</h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  
  // Dados de exemplo
  const mockOrders: Order[] = [
    {
      id: 'ORD-001',
      customer: 'João Silva',
      service: 'Manutenção Preventiva',
      status: 'Concluído',
      date: '2024-03-15',
      amount: 150.00
    },
    {
      id: 'ORD-002',
      customer: 'Maria Santos',
      service: 'Remoção de Vírus',
      status: 'Em Andamento',
      date: '2024-03-14',
      amount: 120.00
    },
    {
      id: 'ORD-003',
      customer: 'Pedro Oliveira',
      service: 'Upgrade de Hardware',
      status: 'Pendente',
      date: '2024-03-13',
      amount: 450.00
    },
    {
      id: 'ORD-004',
      customer: 'Ana Costa',
      service: 'Configuração de Rede',
      status: 'Concluído',
      date: '2024-03-12',
      amount: 200.00
    },
    {
      id: 'ORD-005',
      customer: 'Carlos Souza',
      service: 'Backup de Dados',
      status: 'Cancelado',
      date: '2024-03-11',
      amount: 180.00
    }
  ];
  
  const mockActivities: Activity[] = [
    {
      id: 'ACT-001',
      user: 'Admin User',
      action: 'Atualizou o status do pedido ORD-002 para Em Andamento',
      timestamp: 'há 5 minutos'
    },
    {
      id: 'ACT-002',
      user: 'Tech Support',
      action: 'Criou um novo pedido para o cliente Carlos Souza',
      timestamp: 'há 15 minutos'
    },
    {
      id: 'ACT-003',
      user: 'Admin User',
      action: 'Concluiu o pedido ORD-001',
      timestamp: 'há 1 hora'
    },
    {
      id: 'ACT-004',
      user: 'Tech Support',
      action: 'Atualizou as informações do cliente Maria Santos',
      timestamp: 'há 2 horas'
    },
    {
      id: 'ACT-005',
      user: 'Admin User',
      action: 'Cancelou o pedido ORD-005',
      timestamp: 'há 3 horas'
    }
  ];
  
  const mockChartData = [45, 52, 48, 60, 55, 58];
  
  // Carregar dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setActivities(mockActivities);
      setChartData(mockChartData);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const stats = [
    { name: 'Pedidos Pendentes', value: '12', change: '+2', changeType: 'increase' },
    { name: 'Clientes Ativos', value: '48', change: '+5', changeType: 'increase' },
    { name: 'Receita Mensal', value: 'R$ 12.450', change: '+8%', changeType: 'increase' },
    { name: 'Tickets Abertos', value: '7', change: '-3', changeType: 'decrease' },
  ];

  const recentOrders = [
    { id: 'ORD-001', client: 'João Silva', service: 'Manutenção de PC', status: 'Em andamento', date: '12/05/2023' },
    { id: 'ORD-002', client: 'Maria Santos', service: 'Recuperação de Dados', status: 'Concluído', date: '11/05/2023' },
    { id: 'ORD-003', client: 'Pedro Oliveira', service: 'Instalação de Rede', status: 'Aguardando', date: '10/05/2023' },
    { id: 'ORD-004', client: 'Ana Costa', service: 'Remoção de Vírus', status: 'Concluído', date: '09/05/2023' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-bit text-white rounded-lg hover:bg-opacity-90 transition-colors">
            Novo Pedido
          </button>
          <button className="px-4 py-2 bg-petrol text-white rounded-lg hover:bg-opacity-90 transition-colors">
            Relatório
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-deepPetrolDarker p-6 rounded-lg border border-petrolDark"
          >
            <h3 className="text-white/70 text-sm font-medium">{stat.name}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className={`ml-2 text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-deepPetrolDarker rounded-lg border border-petrolDark overflow-hidden">
        <div className="px-6 py-4 border-b border-petrolDark">
          <h2 className="text-lg font-medium text-white">Pedidos Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-petrolDark">
            <thead className="bg-deepPetrolDarker">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Serviço
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-deepPetrolDarker divide-y divide-petrolDark">
              {recentOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                    {order.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                    {order.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Concluído' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Em andamento'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-bit hover:text-bitDark">
                      Ver detalhes
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 