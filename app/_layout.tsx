import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDB } from "./database/db";

export default function Layout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="detail" options={{ title: "Note Details" }} />
      <Stack.Screen name="add" options={{ title: "Add Note" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Note" }} />
    </Stack>
  );
}