import React from 'react';
import { Stack } from 'expo-router';
import { TodoProvider } from './context/ToDoContext';

export default function Layout() {
  return (
    <TodoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TodoProvider>
  )
}