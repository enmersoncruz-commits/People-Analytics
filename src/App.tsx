/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Users, 
  Activity, 
  AlertTriangle, 
  DollarSign, 
  ChevronRight, 
  ChevronLeft,
  Target,
  ShieldCheck,
  Brain,
  MessageSquare,
  BarChart3,
  ExternalLink,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// COLORS
const COLORS = {
  primary: '#ff0032', // Santa Casa Red
  dark: '#323232',
  medium: '#b4b4b4',
  light: '#a3a3a3',
  bg: '#f8f9fa',
  accent: '#E63946',
  white: '#ffffff',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#3b82f6'
};

// DATA
const ABSENTEEISM_DATA = [
  { month: 'Janeiro', rate: 2.7, benchmark: 2.5 },
  { month: 'Fevereiro', rate: 3.4, benchmark: 2.5 },
  { month: 'Março', rate: 3.5, benchmark: 2.5 },
];

const ACCIDENT_CAUSES = [
  { cause: 'Descarte Inadequado', qty: 7 },
  { cause: 'Manuseio sem Dispositivo', qty: 7 },
  { cause: 'Condição Insegura', qty: 4 },
  { cause: 'Exposição Química', qty: 4 },
  { cause: 'Evento Via Pública', qty: 3 },
];

const TURNOVER_REASONS = [
  { reason: 'Ambiente Tóxico', value: 35.29 },
  { reason: 'Falta de Reconhecimento', value: 29.41 },
  { reason: 'Plano de Carreira', value: 23.53 },
  { reason: 'Presencial Obrigatório', value: 11.76 },
];

const TOP_CIDS = [
  { name: 'Osteomuscular', value: 24.39, color: '#ff0032' },
  { name: 'Respiratório', value: 11.70, color: '#323232' },
  { name: 'Infecciosas', value: 9.59, color: '#323232' },
  { name: 'S. Saúde', value: 8.37, color: '#b4b4b4' },
  { name: 'Mental', value: 8.15, color: '#ff0032' },
];

const TURNOVER_GENERATION = [
  { gen: '17-23 (Gen Z)', rate: 7.6, benchmark: 5.2 },
  { gen: '24-28 (Millennial)', rate: 4.9, benchmark: 4.0 },
  { gen: '29-33', rate: 3.1, benchmark: 3.5 },
  { gen: '34-38', rate: 3.7, benchmark: 3.5 },
  { gen: '39-43', rate: 3.7, benchmark: 3.2 },
];

const ACCIDENT_DATA = [
  { month: 'Jan', rate: 33.58 },
  { month: 'Fev', rate: 37.11 },
  { month: 'Mar', rate: 55.42 },
];

const CLIMATE_BARS = [
  { name: 'Orgulho', score: 89.56, type: 'Green' },
  { name: 'Imparcialidade', score: 89.34, type: 'Green' },
  { name: 'Colaboração', score: 81.3, type: 'Green' },
  { name: 'Liderança', score: 73.67, type: 'Amber' },
  { name: 'Crescimento', score: 73.1, type: 'Amber' },
  { name: 'Remuneração', score: 68.99, type: 'Red' },
];

// Logo Component - Stylized heart logo based on provided image
const SantaCasaLogo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <svg viewBox="0 0 100 100" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M50 20 C60 0 95 5 95 40 C95 70 50 95 50 95 C50 95 5 70 5 40 C5 5 40 0 50 20" 
        fill="#ff0032" 
      />
      <path 
        d="M35 45 Q50 35 65 45 Q50 55 35 45" 
        fill="white" 
        opacity="0.3"
      />
    </svg>
    <div className="flex flex-col leading-none">
      <span className="text-dark font-black text-xs md:text-sm uppercase tracking-tighter">Santa Casa</span>
      <span className="text-[8px] md:text-[10px] text-light font-bold uppercase">Belo Horizonte</span>
    </div>
  </div>
);

// COMPONENTS
const StatCard = ({ title, value, subValue, icon: Icon, trend, trendColor }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">
        <Icon size={24} className="text-dark" />
      </div>
      {trend && (
        <div className={cn("text-xs font-semibold flex items-center gap-1", trendColor)}>
          {trend}
          {trend.includes('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        </div>
      )}
    </div>
    <div>
      <p className="text-xs text-light font-medium uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-dark">{value}</h3>
      <p className="text-sm text-medium mt-1 font-mono">{subValue}</p>
    </div>
  </motion.div>
);

const SlideWrapper = ({ children, title, subtitle }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="min-h-full flex flex-col p-4 md:p-12"
  >
    <header className="mb-6 md:mb-8 border-l-4 border-[#ff0032] pl-4 md:pl-6">
      <h2 className="text-2xl md:text-3xl font-bold text-dark tracking-tight leading-tight">{title}</h2>
      {subtitle && <p className="text-sm md:text-lg text-light font-medium">{subtitle}</p>}
    </header>
    <div className="flex-1 pb-12">
      {children}
    </div>
  </motion.div>
);

const ExecutiveInsight = ({ content }: { content: string }) => (
  <div className="bg-dark text-white p-6 rounded-2xl flex items-start gap-4 shadow-xl">
    <div className="bg-[#ff0032] p-2 rounded-lg shrink-0">
      <Brain size={20} />
    </div>
    <div>
      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ff0032] block mb-1">Impacto Estratégico</span>
      <p className="text-sm leading-relaxed font-medium">{content}</p>
    </div>
  </div>
);

const BenchmarkBadge = ({ value, label, isHigher }: any) => (
  <div className={cn(
    "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
    isHigher ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-600 border border-green-100"
  )}>
    {isHigher ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
    {value} vs Mercado ({label})
  </div>
);

// SLIDES
const Slides = [
  // SLIDE 0: CAPA
  () => (
    <div className="h-full bg-dark relative flex items-center justify-center p-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ff0032] opacity-10 skew-x-12 translate-x-1/2" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#ff0032] rounded-full blur-[120px] opacity-20" />
      
      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-[0.3em] uppercase mb-8">
            Executive Summary • People Analytics
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.95]">
            ESTRATÉGIA & <span className="text-[#ff0032]">RESULTADOS</span>
          </h1>
          <p className="text-xl text-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Painel Executivo 1º Trimestre de 2026: Transformando indicadores operacionais em valor estratégico para a Santa Casa BH.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/10">
            <div className="text-left">
              <span className="text-[10px] text-light uppercase tracking-widest block mb-2">Relatório</span>
              <span className="text-white font-bold block">Conselho Diretor</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] text-light uppercase tracking-widest block mb-2">Data</span>
              <span className="text-white font-bold block">Maio, 2026</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] text-light uppercase tracking-widest block mb-2">Acesso</span>
              <span className="text-white font-bold block">Privilegiado</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 right-12 flex items-center gap-4 text-white/50 text-sm font-medium">
        <span>SAÚDE DE PONTA PARA TODOS</span>
        <div className="w-12 h-[1px] bg-white/20" />
        <span className="text-white font-bold italic">SANTA CASA BH</span>
      </div>
    </div>
  ),

  // SLIDE 1: RESUMO EXECUTIVO
  () => (
    <SlideWrapper title="Snapshot Estratégico" subtitle="Principais Alavancas do 1º Trimestre">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Absenteísmo" value="3,5%" subValue="Trend: +29% vs Jan" icon={Activity} trend="+0,8%" trendColor="text-red-500" />
        <StatCard title="Turnover" value="3,0%" subValue="Foco: Gen Z (7,6%)" icon={Users} trend="+0,6%" trendColor="text-red-500" />
        <StatCard title="Acidentes" value="42,3" subValue="Taxa média trimestral" icon={AlertTriangle} trend="+65% Mar" trendColor="text-red-500" />
        <StatCard title="Impacto Financeiro" value="R$ 227k" subValue="Custo Absenteísmo" icon={DollarSign} trend="R$ 61/colab" trendColor="text-gray-500" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <BarChart3 size={120} />
          </div>
          <h4 className="text-lg font-bold text-dark mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#ff0032]" />
            Correlação: Absenteísmo vs Acidentes
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACCIDENT_DATA}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff0032" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff0032" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#b4b4b4', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#b4b4b4', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{fontWeight: 'bold', color: '#323232'}}
                />
                <Area type="monotone" dataKey="rate" name="Taxa de Acidente" stroke="#ff0032" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center gap-3">
            <Info className="text-light shrink-0" size={18} />
            <p className="text-sm text-dark font-medium italic">
              "Observamos uma correlação direta de 0.85 entre o aumento de absenteísmo e a taxa de acidentes em Março. Sobrecarga e fadiga são os gatilhos."
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <ExecutiveInsight content="O aumento exponencial de acidentes em março (55,42) reflete um sistema em exaustão operacional, não apenas falhas técnicas individuais." />
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h5 className="font-bold text-[#ff0032] mb-3 flex items-center gap-2">
              <ShieldCheck size={18} /> Alerta de Risco
            </h5>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-red-800 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                Déficit assistencial por afastamento de longo prazo.
              </li>
              <li className="flex gap-2 text-sm text-red-800 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                Risco de multas previdenciárias (FAP).
              </li>
              <li className="flex gap-2 text-sm text-red-800 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                Impacto na imagem institucional de segurança.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SlideWrapper>
  ),

  // SLIDE 2: O CICLO VICIOSO 
  () => (
    <SlideWrapper title="O Ciclo Vicioso da Instabilidade" subtitle="Visão Sistêmica do Desgaste Organizacional">
      <div className="relative mt-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
          {[
            { step: 1, title: 'SOBRECARGA', desc: 'Hotelaria operando com déficit.', icon: Clock, color: '#323232' },
            { step: 2, title: 'ADOECIMENTO', desc: 'CIDs Osteomusculares e Mentais.', icon: Activity, color: '#ff0032' },
            { step: 3, title: 'ABSENTEÍSMO', desc: '1.380 atestados no trimestre.', icon: AlertTriangle, color: '#ff0032' },
            { step: 4, title: 'ERRO/ACIDENTE', desc: 'Picos de acidentes diurnos.', icon: ShieldCheck, color: '#323232' },
            { step: 5, title: 'RUPTURA', desc: 'Turnover precoce (Geração Z).', icon: Target, color: '#ff0032' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white shadow-md" style={{ backgroundColor: item.color }}>
                <item.icon size={20} />
              </div>
              <h6 className="font-bold text-dark mb-2 tracking-tighter text-sm uppercase">{item.title}</h6>
              <p className="text-[10px] text-medium leading-relaxed font-semibold">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-[2rem]">
        <div className="space-y-4">
          <h5 className="text-xl font-bold text-dark tracking-tight">Impacto Financeiro Consolidado</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-red-500 block mb-1">Direto (Folha)</span>
              <span className="text-xl font-bold text-dark">R$ 227.389</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-dark block mb-1">Indireto (Prod.)</span>
              <span className="text-xl font-bold text-dark">~R$ 681k</span>
            </div>
          </div>
          <p className="text-xs text-medium leading-relaxed italic">
            "A ineficiência operacional gerada pelo atestado de curto prazo (3,2 dias médios) desarticula as escalas de assistência, forçando dobras de turno e aumentando o risco de acidentes."
          </p>
        </div>
        <div className="bg-dark p-6 rounded-2xl flex flex-col justify-between">
          <h6 className="text-xs font-black text-white/50 mb-4 uppercase tracking-[0.2em]">Causas de Acidentes (Março)</h6>
          <div className="space-y-3">
             {ACCIDENT_CAUSES.map((c, i) => (
               <div key={i} className="flex items-center justify-between group">
                  <span className="text-xs text-white font-medium">{c.cause}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff0032]" style={{ width: `${(c.qty/7)*100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[#ff0032]">{c.qty}</span>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  ),

  // SLIDE 3: ABSENTEÍSMO + BENCHMARK
  () => (
    <SlideWrapper title="Absenteísmo & Longevidade" subtitle="A Anatomia do Afastamento no 1º Tri">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        <div>
          <div className="flex justify-between items-end mb-6">
            <h5 className="font-bold text-dark">Tendência Mensal (%)</h5>
            <BenchmarkBadge value="+15%" label="Média Hospitalar Nac." isHigher={true} />
          </div>
          <div className="h-[250px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ABSENTEEISM_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#b4b4b4', fontSize: 12}} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fill: '#b4b4b4', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="rate" name="Taxa Real" radius={[8, 8, 0, 0]} barSize={40}>
                  {ABSENTEEISM_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate > 3 ? '#ff0032' : '#323232'} />
                  ))}
                </Bar>
                <Line type="monotone" dataKey="benchmark" name="Benchmark Mercado" stroke="#b4b4b4" strokeWidth={2} strokeDasharray="5 5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-dark text-white p-8 rounded-3xl relative overflow-hidden">
             <div className="relative z-10">
               <h6 className="text-[#ff0032] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Inside the Numbers</h6>
               <div className="grid grid-cols-2 gap-8">
                 <div>
                   <span className="text-3xl font-black block">3,2</span>
                   <span className="text-white/50 text-xs font-bold uppercase">Dias médios / atestado</span>
                 </div>
                 <div>
                   <span className="text-3xl font-black block">30%</span>
                   <span className="text-white/50 text-xs font-bold uppercase">Da org. em Hotelaria</span>
                 </div>
               </div>
             </div>
             <div className="absolute -bottom-4 -right-4 opacity-10">
                <Target size={120} />
             </div>
          </div>
        </div>

        <div>
           <h5 className="font-bold text-dark mb-6">Top 5 CIDs: Causas e Riscos</h5>
           <div className="space-y-6">
             {TOP_CIDS.map((cid, i) => (
               <div key={i} className="group">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-dark uppercase">{cid.name}</span>
                    <span className="text-sm font-mono font-bold text-medium">{cid.value}% dos dias</span>
                 </div>
                 <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${(cid.value / 25) * 100}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     className="h-full rounded-full"
                     style={{ backgroundColor: cid.color }}
                   />
                 </div>
               </div>
             ))}
           </div>
           
           <div className="mt-12 bg-gray-50 border border-gray-100 p-6 rounded-2xl">
              <h6 className="text-[10px] font-black text-[#ff0032] uppercase mb-3 px-2">Insight de Mercado (ISMA-BR)</h6>
              <p className="text-sm text-dark font-semibold leading-relaxed">
                As "Doenças Mentais" representam o risco mais volátil. Embora sejam o 5º CID, elas possuem os maiores tempos de afastamento e maior custo de subistituição. <span className="text-[#ff0032]">Média Brasil: 30% de Burnout em saúde.</span>
              </p>
           </div>
        </div>
      </div>
    </SlideWrapper>
  ),

  // SLIDE 4: TURNOVER GERACIONAL
  () => (
    <SlideWrapper title="Geração Z & Retenção" subtitle="O Mercado de Talentos em 2026">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 items-center">
         <div className="lg:col-span-12 items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex justify-between items-end mb-8">
                <h5 className="font-bold text-dark">Taxa de Turnover (%) vs Benchmark</h5>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TURNOVER_GENERATION} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="gen" type="category" axisLine={false} tickLine={false} tick={{fill: '#323232', fontWeight: 'bold', fontSize: 13}} width={120} />
                    <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                    <Bar dataKey="rate" name="Santa Casa" radius={[0, 8, 8, 0]} barSize={25}>
                      {TURNOVER_GENERATION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.rate > 5 ? '#ff0032' : '#323232'} />
                      ))}
                    </Bar>
                    <Bar dataKey="benchmark" name="Benchmark" fill="#b4b4b4" radius={[0, 8, 8, 0]} barSize={8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-[2rem] flex flex-col justify-center">
               <h6 className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500 mb-6">Motivos de Desligamento (Entrevista)</h6>
               <div className="space-y-4">
                  {TURNOVER_REASONS.map((r, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between text-xs font-bold text-dark mb-1.5 uppercase">
                        <span>{r.reason}</span>
                        <span className="text-[#ff0032]">{r.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-dark group-hover:bg-[#ff0032] transition-colors" style={{ width: `${r.value}%` }} />
                      </div>
                    </div>
                  ))}
               </div>
               <div className="mt-8 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <AlertTriangle className="text-[#ff0032]" size={20} />
                  <p className="text-xs font-bold text-dark">62% dos desligamentos são por "Ambiente & Liderança" (Fatores Internos Gerenciáveis).</p>
               </div>
            </div>
          </div>
        </div>
       </div>
       
       <div className="mt-12 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max pb-4">
             {[
               { label: 'Efeito Melancia', val: '78% Confiança vs 3% Turnover', icon: Activity },
               { label: 'Causa Raiz', val: 'Liderança Intermediária (58% de aprovação)', icon: Users },
               { label: 'Gap de Talentos', val: 'Alta exposição a Burnout', icon: Target }
             ].map((item, i) => (
               <div key={i} className="bg-gray-50 border border-gray-100 p-4 px-6 rounded-2xl flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg text-[#ff0032] shadow-sm"><item.icon size={18} /></div>
                  <div>
                    <div className="text-[10px] font-black text-light uppercase mb-0.5">{item.label}</div>
                    <div className="text-xs font-bold text-dark">{item.val}</div>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </SlideWrapper>
  ),

  // SLIDE 5: O FENÔMENO DA MELANCIA
  () => (
    <SlideWrapper title="Cultura & Segurança Psicológica" subtitle="O 'Fenômeno da Melancia' e a Dissonância Cognitiva">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        <div>
           <div className="relative p-12 bg-white rounded-[3rem] border border-gray-100 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-50" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-48 h-48 rounded-full border-[10px] border-green-500 border-t-red-500 animate-spin-slow flex items-center justify-center bg-white shadow-inner">
                   <div className="text-center">
                     <span className="text-4xl font-black text-dark block">78,4%</span>
                     <span className="text-[10px] font-bold text-light uppercase">Satisfação</span>
                   </div>
                </div>
                <div className="mt-8 text-center">
                  <h6 className="text-lg font-black text-dark uppercase tracking-tight mb-2">Verde por fora, Vermelho por dentro</h6>
                  <p className="text-xs text-medium max-w-xs font-medium">
                    A alta satisfação declarada esconde um ambiente de medo e insegurança onde falhas não são reportadas preventivamente.
                  </p>
                </div>
              </div>
           </div>
        </div>

        <div>
          <h5 className="font-bold text-dark mb-6">Quebra por Requisitos (Satisfação %)</h5>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CLIMATE_BARS} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#323232', fontWeight: 'bold', fontSize: 13}} width={120} />
                <Tooltip cursor={{fill: '#f8f9fa'}} />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={25}>
                  {CLIMATE_BARS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.type === 'Green' ? '#10b981' : entry.type === 'Amber' ? '#f59e0b' : '#ff0032'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-6 bg-dark text-white rounded-3xl">
             <div className="flex gap-4">
                <MessageSquare className="text-[#ff0032] shrink-0" />
                <div>
                   <h6 className="text-sm font-bold mb-2">Voz do Desligado (Insight Raiz)</h6>
                   <p className="text-xs text-white/70 italic leading-relaxed">
                     "Adquiri depressão e ansiedade... fui obrigada a escutar coisas humilhantes." — Este relato contradiz os 78% de satisfação e aponta falha na liderança imediata (58% de confiança).
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  ),

  // SLIDE 6: PLANO DE AÇÃO
  () => (
    <SlideWrapper title="Prioridades Estratégicas" subtitle="Roadmap para Estabilização 2T/2026">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {[
            { 
              title: 'Gestão de Faltas & Saúde', 
              icon: Activity, 
              actions: ['Criação do Comitê de Saúde Mental', 'Monitoramento ativo de CIDs Osteomusculares', 'Escala flexível na Hotelaria'],
              impact: 'Alta Redução de Custos'
            },
            { 
              title: 'Segurança Assistencial', 
              icon: ShieldCheck, 
              actions: ['Blitz NR32: Treinamento em campo', 'Substituição de dispositivos de segurança', 'Incentivo ao reporte de quase-erros'],
              impact: 'Zero Acidentes Graves'
            },
            { 
              title: 'Liderança & Retenção', 
              icon: Users, 
              actions: ['Upskilling para Gerência Intermediária', 'Revisão do EVP para Geração Z', 'Plano de Desenvolvimento Individual'],
              impact: 'Redução de 20% no Turnover'
            }
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-dark mb-6">
                <card.icon size={24} />
              </div>
              <h5 className="text-xl font-black text-dark mb-6 tracking-tight">{card.title}</h5>
              <ul className="space-y-4 mb-8 flex-1">
                {card.actions.map((act, j) => (
                  <li key={j} className="flex gap-3 text-sm text-medium font-bold">
                    <ChevronRight size={16} className="text-[#ff0032] shrink-0 mt-0.5" />
                    {act}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-50 mt-auto">
                 <span className="text-[10px] font-black text-[#ff0032] uppercase tracking-widest">{card.impact}</span>
              </div>
            </motion.div>
          ))}
       </div>
       
       <div className="mt-12 bg-[#ff0032] p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Target size={180} />
          </div>
          <div className="relative z-10 max-w-xl">
             <h6 className="text-sm font-black uppercase tracking-[0.4em] mb-4 text-white/80">Meta Trimestral</h6>
             <h2 className="text-4xl font-black mb-4 leading-none">REDUZIR O ABSENTEÍSMO PARA 2,8% ATÉ JUNHO/2026.</h2>
             <p className="text-white/70 font-medium">Foco absoluto na Gerência de Hotelaria e na preservação da saúde psíquica das equipes.</p>
          </div>
          <div className="relative z-10">
            <button className="bg-white text-[#ff0032] px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-dark hover:text-white transition-all shadow-xl flex items-center gap-3">
              Aprovar Investimentos <ArrowRight size={18} />
            </button>
          </div>
       </div>
    </SlideWrapper>
  ),

  // SLIDE 7: ENCERRAMENTO
  () => (
    <div className="h-full bg-dark flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5 skew-y-12" />
       
       <motion.div
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.8 }}
         className="relative z-10"
       >
         <div className="w-24 h-1 bg-[#ff0032] mx-auto mb-12" />
         <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">OBRIGADO</h1>
         <p className="text-xl text-medium max-w-xl mx-auto font-medium mb-12">
           People Analytics é sobre pessoas. Os dados apenas nos mostram onde cuidar primeiro.
         </p>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Efetivo Protegido', val: '1.236' },
              { label: 'Gerências Analisadas', val: '03' },
              { label: 'Confiança Clima', val: '78%' },
              { label: 'ROI Estimado Ação', val: '12,5%' }
            ].map((stat, i) => (
              <div key={i} className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                 <span className="text-[10px] uppercase font-bold text-light block mb-2">{stat.label}</span>
                 <span className="text-2xl font-black text-white">{stat.val}</span>
              </div>
            ))}
         </div>
         
         <div className="mt-16 text-white/30 text-[10px] font-bold uppercase tracking-[0.5em]">
           SANTA CASA BH • GESTÃO DE PESSOAS • 2026
         </div>
       </motion.div>
    </div>
  )
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < Slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col font-sans selection:bg-[#ff0032] selection:text-white">
      {/* Navigation Top Bar */}
      <nav className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ff0032] flex items-center justify-center rounded-lg shadow-lg">
             <BarChart3 className="text-white" size={18} />
          </div>
          <div className="hidden sm:block">
            <span className="text-xs md:text-sm font-black text-dark uppercase tracking-tighter block">People Analytics</span>
            <span className="text-[8px] md:text-[10px] text-light uppercase font-bold">Q1 2026</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-gray-100">
          {Slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-all duration-300",
                currentSlide === idx ? "w-4 md:w-8 bg-[#ff0032]" : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="text-right hidden xs:block">
             <span className="text-[8px] md:text-[10px] font-bold text-light block uppercase tracking-widest leading-none mb-1">Status</span>
             <span className="text-[10px] md:text-xs font-black text-[#ff0032] italic">CONFIDENTIAL</span>
          </div>
          <SantaCasaLogo className="h-8 md:h-10 w-auto" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative bg-white">
        <AnimatePresence mode="wait">
          <div key={currentSlide} className="min-h-full">
            {Slides[currentSlide]()}
          </div>
        </AnimatePresence>

        {/* Floating Controls */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-white/90 backdrop-blur-xl border border-gray-200 p-1.5 rounded-2xl shadow-2xl z-50">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 md:p-3 text-dark hover:bg-gray-100 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} md:size={24} />
          </button>
          <div className="px-2 md:px-4 font-mono font-bold text-xs md:text-sm text-dark min-w-[50px] md:min-w-[60px] text-center border-x border-gray-100">
            {currentSlide + 1} / {Slides.length}
          </div>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === Slides.length - 1}
            className="p-2 md:p-3 text-dark hover:bg-gray-100 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} md:size={24} />
          </button>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="h-4 bg-dark flex items-center justify-center shrink-0">
        <div className="w-full flex">
          <div className="flex-1 h-full bg-[#ff0032]" />
          <div className="flex-1 h-full bg-[#323232]" />
          <div className="flex-1 h-full bg-[#b4b4b4]" />
          <div className="flex-1 h-full bg-[#a3a3a3]" />
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@500;700&display=swap');
        
        :root {
          --font-sans: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        body {
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
