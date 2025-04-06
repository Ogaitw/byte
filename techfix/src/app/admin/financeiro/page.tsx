'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tipos
type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Entrada' | 'Saída';
  category: string;
  status: 'Concluído' | 'Pendente' | 'Cancelado';
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
      <h3 className="text-lg font-medium text-gray-900 mb-4">Receita Mensal</h3>
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

// Componente de tabela de transações
const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Transações Recentes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.type === 'Entrada' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'Entrada' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
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

export default function Financeiro() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  
  // Dados de exemplo
  const mockTransactions: Transaction[] = [
    {
      id: 'TRX-001',
      date: '2024-03-15',
      description: 'Manutenção Preventiva - Cliente A',
      amount: 150.00,
      type: 'Entrada',
      category: 'Serviços',
      status: 'Concluído'
    },
    {
      id: 'TRX-002',
      date: '2024-03-14',
      description: 'Compra de Peças',
      amount: 450.00,
      type: 'Saída',
      category: 'Suprimentos',
      status: 'Concluído'
    },
    {
      id: 'TRX-003',
      date: '2024-03-13',
      description: 'Remoção de Vírus - Cliente B',
      amount: 120.00,
      type: 'Entrada',
      category: 'Serviços',
      status: 'Pendente'
    },
    {
      id: 'TRX-004',
      date: '2024-03-12',
      description: 'Upgrade de Hardware - Cliente C',
      amount: 350.00,
      type: 'Entrada',
      category: 'Serviços',
      status: 'Concluído'
    },
    {
      id: 'TRX-005',
      date: '2024-03-11',
      description: 'Aluguel de Equipamentos',
      amount: 200.00,
      type: 'Saída',
      category: 'Aluguel',
      status: 'Cancelado'
    },
    {
      id: 'TRX-006',
      date: '2024-03-10',
      description: 'Backup de Dados - Cliente D',
      amount: 180.00,
      type: 'Entrada',
      category: 'Serviços',
      status: 'Concluído'
    }
  ];
  
  const mockChartData = [4500, 5200, 4800, 6000, 5500, 5800];
  
  // Carregar dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
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
          title="Receita Total"
          value="R$ 15.800,00"
          change="+12% em relação ao mês anterior"
          icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <StatCard
          title="Despesas Totais"
          value="R$ 8.200,00"
          change="-5% em relação ao mês anterior"
          icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
        <StatCard
          title="Lucro Líquido"
          value="R$ 7.600,00"
          change="+8% em relação ao mês anterior"
          icon="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <StatCard
          title="Ticket Médio"
          value="R$ 350,00"
          change="+15% em relação ao mês anterior"
          icon="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart data={chartData} />
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
} 