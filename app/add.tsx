import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { addNoteDB } from "./database/db";
import { useRouter } from "expo-router";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const saveNote = () => {
    try {
      if (!title || !category) throw new Error("All fields required");

      addNoteDB(title, category);
      Alert.alert("Success", "Note added!");
      router.back();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={{ color: "#fff" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EEF2FF" },
  input: { backgroundColor: "#fff", padding: 12, marginBottom: 10, borderRadius: 8 },
  button: { backgroundColor: "#4F46E5", padding: 15, borderRadius: 10, alignItems: "center" },
});