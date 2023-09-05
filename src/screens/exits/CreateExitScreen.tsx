import { Text, View } from 'react-native';

const CreateExitScreen = () => {
  return (
    <View>
      <Text>Llena el formulario para crear una nueva salida</Text>
      <Text>Predio</Text>
      <Text>Nombre del predio seleccionado</Text>
      <View>
        <Text>Tipo de salida</Text>
        <Text>Cosecha</Text>
        <Text>Número de plantas</Text>
        <Text>###</Text>
        <Text>Notas</Text>
        <Text>
          Estas plantas fueron cosechadas por orden de Fulanito Cosme, notamos que a simple vista
          son plantas sanas y con la madurez apropiada.
        </Text>
        <Text>Subir foto</Text>
      </View>
      <Text>Agregar más salidas</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>Cancelar</Text>
        <Text>Guardar</Text>
      </View>
    </View>
  );
};

export default CreateExitScreen;
