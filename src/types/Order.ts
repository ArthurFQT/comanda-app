export interface Order {
  id: string;
  name: string;
  quantity: number;
  flavor: string;
  createdAt: Date | string;
  status: 'pending' | 'completed';
  completedAt?: Date | string; // opcional, pra marcar quando foi concluído
}
