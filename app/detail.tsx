import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Detail() {
  const { id, title, category } = useLocalSearchParams<{
    id: string;
    title: string;
    category: string;
  }>();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <Text style={styles.value}>{title}</Text>

      <Text style={styles.label}>Category</Text>
      <Text style={styles.value}>{category}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/edit",
            params: { id, title, category },
          })
        }
      >
        <Text style={styles.buttonText}>Edit Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EEF2FF" },
  label: { color: "#666", marginTop: 15 },
  value: { fontSize: 22, fontWeight: "bold", color: "#4F46E5" },
  button: { marginTop: 30, backgroundColor: "#4F46E5", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center" },
});