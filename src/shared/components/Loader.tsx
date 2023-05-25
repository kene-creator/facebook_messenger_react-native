import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Loader = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <ActivityIndicator animating={true} color={MD2Colors.white} />;
};

export default Loader;
