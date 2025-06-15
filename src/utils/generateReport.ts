import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Order } from '../types/Order';

export async function generatePDFReport(orders: Order[]) {
  const total = orders.reduce((sum, order) => sum + order.quantity, 0);

  const flavorsCount: Record<string, number> = {};
  orders.forEach((order) => {
    flavorsCount[order.flavor] =
      (flavorsCount[order.flavor] || 0) + order.quantity;
  });

  const flavorList = Object.entries(flavorsCount)
    .map(([flavor, count]) => `<li>${flavor}: ${count}</li>`)
    .join('');

  const html = `
    <h1>Relatório de Pedidos do Dia</h1>
    <p><strong>Total de pastéis vendidos:</strong> ${total}</p>
    <p><strong>Sabores vendidos:</strong></p>
    <ul>${flavorList}</ul>
    <p>Gerado em: ${new Date().toLocaleString()}</p>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
}
