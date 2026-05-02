import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/notes")}
      >
        <Text style={styles.buttonText}>Open Notes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EEF2FF" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#4F46E5" },
  button: { backgroundColor: "#4F46E5", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff" },
});