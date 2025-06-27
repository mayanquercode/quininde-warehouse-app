import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Cerámica",
              headerStyle: { backgroundColor: "#7863ac" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="new_tile"
            options={{
              title: "Nueva cerámica",
              headerStyle: { backgroundColor: "#7863ac" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="edit_tile"
            options={{
              title: "Editar cerámica",
              headerStyle: { backgroundColor: "#7863ac" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  )
}

export default App;