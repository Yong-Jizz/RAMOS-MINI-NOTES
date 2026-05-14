import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { getNotes, deleteNoteDB } from "../database/db";

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
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/detail" as any,
                params: {
                  id: item.id.toString(),
                  title: item.title,
                  category: item.category,
                },
              })
            }
          >
            <View style={styles.noteRow}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>

              {/* RIGHT SIDE BUTTONS */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    router.push({
                      pathname: "/edit" as any,
                      params: {
                        id: item.id.toString(),
                        title: item.title,
                        category: item.category,
                      },
                    })
                  }
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    deleteNoteDB(item.id);
                    loadNotes();
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ADD BUTTON */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/add" as any)}
        >
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EEF2FF" },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  noteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  category: {
    color: "#666",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },

  editButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },

  fab: {
    backgroundColor: "#4F46E5",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  fabText: {
    color: "#fff",
    fontSize: 28,
  },
});