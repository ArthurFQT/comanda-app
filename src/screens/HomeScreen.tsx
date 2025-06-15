import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useOrders } from '../context/OrdersContext';

const saboresDisponiveis = ['Carne de sol com queijo', 'Frango', 'Chocolate', 'Queijo', 'Palmito'];

export default function HomeScreen() {
  const { addOrder } = useOrders();
  const [name, setName] = useState('');
  const [itens, setItens] = useState<{ flavor: string; quantity: number }[]>(
    [],
  );

  function adicionarSabor(sabor: string) {
    setItens((prev) => {
      const index = prev.findIndex((item) => item.flavor === sabor);
      if (index >= 0) {
        const updated = [...prev];
        updated[index].quantity += 1;
        return updated;
      } else {
        return [...prev, { flavor: sabor, quantity: 1 }];
      }
    });
  }

  function aumentarQuantidade(sabor: string) {
    setItens((prev) =>
      prev.map((item) =>
        item.flavor === sabor ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function confirmarPedido() {
    if (!name || itens.length === 0) return;

    itens.forEach((item) => {
      addOrder(name, item.quantity, item.flavor);
    });

    setName('');
    setItens([]);
  }

  function diminuirQuantidade(sabor: string) {
    setItens((prev) => {
      return prev
        .map((item) =>
          item.flavor === sabor
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do cliente:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome"
        style={styles.input}
      />

      <Text style={styles.label}>Escolha os sabores:</Text>
      <View style={styles.saboresContainer}>
        {saboresDisponiveis.map((sabor) => (
          <TouchableOpacity
            key={sabor}
            style={styles.saborBtn}
            onPress={() => adicionarSabor(sabor)}
          >
            <Text>{sabor}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Itens selecionados:</Text>
      {itens.length === 0 ? (
        <Text style={styles.vazio}>Nenhum pastel adicionado</Text>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.flavor}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TouchableOpacity onPress={() => diminuirQuantidade(item.flavor)}>
                <Text style={styles.botao}>−</Text>
              </TouchableOpacity>

              <Text style={styles.itemTexto}>
                {item.quantity}x {item.flavor}
              </Text>

              <TouchableOpacity onPress={() => aumentarQuantidade(item.flavor)}>
                <Text style={styles.botao}>＋</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Button
        title="Confirmar Pedido"
        onPress={confirmarPedido}
        disabled={!name || itens.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
  },
  saboresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 10,
  },
  saborBtn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  mais: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  vazio: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemTexto: {
    flex: 1,
    textAlign: 'center',
  },
  botao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    paddingHorizontal: 10,
  },
});
