'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Componente de seção de configurações
const SettingsSection = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
};

// Componente de campo de formulário
const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  options
}: { 
  label: string; 
  type?: string; 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required={required}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required={required}
        />
      )}
    </div>
  );
};

export default function Configuracoes() {
  // Estado para dados do perfil
  const [profileData, setProfileData] = useState({
    name: 'Admin',
    email: 'admin@techfix.com',
    phone: '(11) 99999-9999',
    address: 'Rua Exemplo, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  });
  
  // Estado para configurações de notificação
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newOrders: true,
    orderUpdates: true,
    paymentReminders: true,
    marketingEmails: false
  });
  
  // Estado para configurações de segurança
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiration: '90',
    ipRestriction: false,
    allowedIps: ''
  });
  
  // Estado para configurações de integração
  const [integrationSettings, setIntegrationSettings] = useState({
    paymentGateway: 'mercadopago',
    smsProvider: 'twilio',
    emailProvider: 'sendgrid',
    calendarSync: 'google',
    cloudStorage: 'dropbox'
  });
  
  // Manipuladores de eventos
  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleIntegrationChange = (field: string, value: string) => {
    setIntegrationSettings(prev => ({ ...prev, [field]: value }));
  };
  
  // Salvar alterações
  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log('Salvando configurações...');
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
        >
          Salvar Alterações
        </button>
      </div>
      
      <SettingsSection title="Dados do Perfil">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Nome"
            value={profileData.name}
            onChange={(value) => handleProfileChange('name', value)}
            required
          />
          <FormField
            label="E-mail"
            type="email"
            value={profileData.email}
            onChange={(value) => handleProfileChange('email', value)}
            required
          />
          <FormField
            label="Telefone"
            value={profileData.phone}
            onChange={(value) => handleProfileChange('phone', value)}
          />
          <FormField
            label="Endereço"
            value={profileData.address}
            onChange={(value) => handleProfileChange('address', value)}
          />
          <FormField
            label="Cidade"
            value={profileData.city}
            onChange={(value) => handleProfileChange('city', value)}
          />
          <FormField
            label="Estado"
            value={profileData.state}
            onChange={(value) => handleProfileChange('state', value)}
          />
          <FormField
            label="CEP"
            value={profileData.zipCode}
            onChange={(value) => handleProfileChange('zipCode', value)}
          />
        </div>
      </SettingsSection>
      
      <SettingsSection title="Notificações">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notificações por E-mail</h3>
              <p className="text-sm text-gray-500">Receber notificações por e-mail</p>
            </div>
            <button
              onClick={() => handleNotificationChange('emailNotifications', !notificationSettings.emailNotifications)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notificações por SMS</h3>
              <p className="text-sm text-gray-500">Receber notificações por SMS</p>
            </div>
            <button
              onClick={() => handleNotificationChange('smsNotifications', !notificationSettings.smsNotifications)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notificationSettings.smsNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notificationSettings.smsNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Tipos de Notificação</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.newOrders}
                  onChange={(e) => handleNotificationChange('newOrders', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Novos Pedidos</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.orderUpdates}
                  onChange={(e) => handleNotificationChange('orderUpdates', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Atualizações de Pedidos</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.paymentReminders}
                  onChange={(e) => handleNotificationChange('paymentReminders', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Lembretes de Pagamento</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.marketingEmails}
                  onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">E-mails de Marketing</span>
              </label>
            </div>
          </div>
        </div>
      </SettingsSection>
      
      <SettingsSection title="Segurança">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Autenticação em Duas Etapas</h3>
              <p className="text-sm text-gray-500">Adicionar uma camada extra de segurança à sua conta</p>
            </div>
            <button
              onClick={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  securitySettings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Tempo de Expiração da Sessão (minutos)"
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(value) => handleSecurityChange('sessionTimeout', value)}
              options={[
                { value: '15', label: '15 minutos' },
                { value: '30', label: '30 minutos' },
                { value: '60', label: '1 hora' },
                { value: '120', label: '2 horas' }
              ]}
            />
            <FormField
              label="Expiração de Senha (dias)"
              type="number"
              value={securitySettings.passwordExpiration}
              onChange={(value) => handleSecurityChange('passwordExpiration', value)}
              options={[
                { value: '30', label: '30 dias' },
                { value: '60', label: '60 dias' },
                { value: '90', label: '90 dias' },
                { value: '180', label: '180 dias' }
              ]}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Restrição de IP</h3>
              <p className="text-sm text-gray-500">Limitar acesso a IPs específicos</p>
            </div>
            <button
              onClick={() => handleSecurityChange('ipRestriction', !securitySettings.ipRestriction)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                securitySettings.ipRestriction ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  securitySettings.ipRestriction ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          
          {securitySettings.ipRestriction && (
            <FormField
              label="IPs Permitidos (separados por vírgula)"
              value={securitySettings.allowedIps}
              onChange={(value) => handleSecurityChange('allowedIps', value)}
              placeholder="Ex: 192.168.1.1, 10.0.0.1"
            />
          )}
        </div>
      </SettingsSection>
      
      <SettingsSection title="Integrações">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Gateway de Pagamento"
            type="select"
            value={integrationSettings.paymentGateway}
            onChange={(value) => handleIntegrationChange('paymentGateway', value)}
            options={[
              { value: 'mercadopago', label: 'Mercado Pago' },
              { value: 'pagseguro', label: 'PagSeguro' },
              { value: 'stripe', label: 'Stripe' }
            ]}
          />
          <FormField
            label="Provedor de SMS"
            type="select"
            value={integrationSettings.smsProvider}
            onChange={(value) => handleIntegrationChange('smsProvider', value)}
            options={[
              { value: 'twilio', label: 'Twilio' },
              { value: 'messagebird', label: 'MessageBird' },
              { value: 'nexmo', label: 'Nexmo' }
            ]}
          />
          <FormField
            label="Provedor de E-mail"
            type="select"
            value={integrationSettings.emailProvider}
            onChange={(value) => handleIntegrationChange('emailProvider', value)}
            options={[
              { value: 'sendgrid', label: 'SendGrid' },
              { value: 'mailgun', label: 'Mailgun' },
              { value: 'amazonses', label: 'Amazon SES' }
            ]}
          />
          <FormField
            label="Sincronização de Calendário"
            type="select"
            value={integrationSettings.calendarSync}
            onChange={(value) => handleIntegrationChange('calendarSync', value)}
            options={[
              { value: 'google', label: 'Google Calendar' },
              { value: 'outlook', label: 'Outlook Calendar' },
              { value: 'apple', label: 'Apple Calendar' }
            ]}
          />
          <FormField
            label="Armazenamento em Nuvem"
            type="select"
            value={integrationSettings.cloudStorage}
            onChange={(value) => handleIntegrationChange('cloudStorage', value)}
            options={[
              { value: 'dropbox', label: 'Dropbox' },
              { value: 'googledrive', label: 'Google Drive' },
              { value: 'onedrive', label: 'OneDrive' }
            ]}
          />
        </div>
      </SettingsSection>
    </div>
  );
} 