import { MenuItem } from '../models/menu.model';

/**
 * Configuração do menu principal do sistema
 */
export const MENU_ITEMS: MenuItem[] = [
  { 
    icon: 'dashboard', 
    label: 'Dashboard', 
    route: '/dashboard' 
  },
  { 
    icon: 'settings', 
    label: 'Controle',
    children: [
      { label: 'Entrega de EPI', route: '/controle/entrega' },
      { label: 'Devolução', route: '/controle/devolucao' },
      { label: 'Validade', route: '/controle/validade' },
      { label: 'Histórico por funcionário', route: '/controle/historico' }
    ]
  },
  { 
    icon: 'assessment', 
    label: 'Relatórios',
    children: [
      { label: 'EPIs entregues', route: '/relatorios/epis-entregues' },
      { label: 'EPIs vencidos', route: '/relatorios/epis-vencidos' },
      { label: 'EPIs por setor', route: '/relatorios/epis-setor' },
      { label: 'Ficha de EPI (NR-6)', route: '/relatorios/ficha-epi' }
    ]
  },
  { 
    icon: 'list', 
    label: 'Cadastros',
    children: [
      { label: 'Funcionários', route: '/cadastros/funcionarios' },
      { label: 'EPIs', route: '/cadastros/epis' },
      { label: 'Setores', route: '/cadastros/setores' },
      { label: 'Fornecedores', route: '/cadastros/fornecedores' }
    ]
  }
];
