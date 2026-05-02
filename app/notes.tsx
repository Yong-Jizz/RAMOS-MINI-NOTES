import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { getNotes } from "../database/db";

type Note = {
  id: number;
  title: string;
  category: string;
};

export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = () => {
    const data = getNotes() as Note[];
    setNotes(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/detail",
                params: {
                  id: item.id.toString(),
                  title: item.title,
                  category: item.category,
                },
              })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EEF2FF" },
  header: { fontSize: 24, fontWeight: "bold", color: "#4F46E5", marginBottom: 10 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "600" },
  category: { color: "#666" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#4F46E5",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: { color: "#fff", fontSize: 28 },
});