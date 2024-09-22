import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store/store';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import * as Notifications from 'expo-notifications';

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    // Handler para receber notificações enquanto o app está em primeiro plano
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
    });

    return () => subscription.remove();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
