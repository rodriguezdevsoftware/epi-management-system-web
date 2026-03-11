/**
 * Modelo de Cargo
 */
export interface Position {
  _id?: string;
  code?: string;
  description: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Resposta da API para listagem de cargos
 */
export interface PositionsResponse {
  success: boolean;
  positions: Position[];
}

/**
 * Resposta da API para um cargo específico
 */
export interface PositionResponse {
  success: boolean;
  position: Position;
}

/**
 * Payload para criar/atualizar cargo
 */
export interface PositionPayload {
  code?: string;
  description: string;
  companyId: string;
}
