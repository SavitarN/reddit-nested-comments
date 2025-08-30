import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native/';

function App() {
  return <SafeAreaProvider style={styles.container}></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
