import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDB } from "../database/db";

export default function Layout() {
  useEffect(() => {
    initDB(); // create table on start
  }, []);

  return <Stack />;
}