import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { updateNoteDB } from "./database/db";

export default function EditNote() {
  const { id, title, category } = useLocalSearchParams<{
    id: string;
    title: string;
    category: string;
  }>();

  const [newTitle, setNewTitle] = useState(title);
  const [newCategory, setNewCategory] = useState(category);

  const router = useRouter();

  const updateNote = () => {
    try {
      if (!id) throw new Error("Missing ID");
      if (!newTitle || !newCategory) throw new Error("Fields required");

      updateNoteDB(Number(id), newTitle, newCategory);

      Alert.alert("Success", "Note updated!");

      router.replace("/notes"); // IMPORTANT FIX
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput value={newTitle} onChangeText={setNewTitle} style={styles.input} />
      <TextInput value={newCategory} onChangeText={setNewCategory} style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={updateNote}>
        <Text style={{ color: "#fff" }}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EEF2FF" },
  input: { backgroundColor: "#fff", padding: 12, marginBottom: 10, borderRadius: 8 },
  button: { backgroundColor: "#4F46E5", padding: 15, borderRadius: 10, alignItems: "center" },
});