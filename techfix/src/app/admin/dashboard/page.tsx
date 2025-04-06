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

export default function Dashboard() {
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
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Pedidos"
          value="150"
          change="+12% em relação ao mês anterior"
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
        <StatCard
          title="Receita Total"
          value="R$ 15.800,00"
          change="+8% em relação ao mês anterior"
          icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <StatCard
          title="Clientes Ativos"
          value="85"
          change="+5% em relação ao mês anterior"
          icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
        <StatCard
          title="Taxa de Conclusão"
          value="92%"
          change="+3% em relação ao mês anterior"
          icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart data={chartData} />
        <RecentOrders orders={orders} />
      </div>
      
      <RecentActivities activities={activities} />
    </div>
  );
} 