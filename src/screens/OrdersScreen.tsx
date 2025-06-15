import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { generatePDFReport } from '../utils/generateReport';
import { useOrders } from '../context/OrdersContext';

export default function OrdersScreen() {
  const { orders, allOrders, completeOrder } = useOrders();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function formatElapsed(startTime: string | Date) {
    const elapsedMs = currentTime - new Date(startTime).getTime();
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function getHighlightStyle(createdAt: string | Date) {
    const elapsedMs = currentTime - new Date(createdAt).getTime();
    const minutes = Math.floor(elapsedMs / 60000);

    if (minutes < 10) return {};

    const highlight = Math.min(1, (minutes - 10) / 10);
    const backgroundColor = `rgba(255, 0, 0, ${highlight})`;
    return { backgroundColor };
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, getHighlightStyle(item.createdAt)]}>
            <Text style={styles.title}>
              {item.name} - {item.quantity}x {item.flavor}
            </Text>
            <Text style={styles.timer}>
              Tempo: {formatElapsed(item.createdAt)}
            </Text>
            <Button
              title="Concluir pedido"
              onPress={() => completeOrder(item.id)}
            />
          </View>
        )}
        ListFooterComponent={
          
            <View style={{ padding: 20 }}>
              <Button
                title="Gerar Relatório do Dia"
                onPress={() => generatePDFReport(allOrders)}
              />
            </View>
        
        }
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Text>Nenhum pedido pendente no momento.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timer: {
    marginBottom: 6,
    color: '#555',
  },
});
