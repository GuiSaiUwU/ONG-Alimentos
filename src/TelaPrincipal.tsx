import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaDetalhePonto from "./telas/TelaDetalhePonto";
import TelaListaPontos from "./telas/TelaListaPontos";
import { RootStackParamList } from "./types";
import MinhasDoacoes from "./telas/MinhasDoacoes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TelaPrincipal() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaListaPontos">
        <Stack.Screen
          name="TelaListaPontos"
          component={TelaListaPontos}
          options={{ title: "Pontos de coleta" }}
        />
        <Stack.Screen
          name="TelaDetalhePonto"
          component={TelaDetalhePonto}
          options={{ title: "Detalhes do ponto" }}
        />
        <Stack.Screen
          name="MinhasDoacoes"
          component={MinhasDoacoes}
          options={{ title: "Minhas doações" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
