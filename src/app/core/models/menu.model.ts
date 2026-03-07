/**
 * Interface para itens de submenu
 */
export interface SubMenuItem {
  label: string;
  route: string;
}

/**
 * Interface para itens do menu principal
 */
export interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: SubMenuItem[];
}
