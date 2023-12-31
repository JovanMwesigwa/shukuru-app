import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ReceiveTerminalScreen from '../screens/Terminals/RecieveTerminalScreen'
import SendTerminalScreen from '../screens/Terminals/SendTerminalScreen'
import FindUser from '../screens/FindUser'
import QRCodeShownScreen from '../screens/QRCodeShownScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TransactionDetailScreen from '../screens/TransactionDetail'
import ScanQRScreen from '../screens/ScanQRScreen'
import ReadInvoiceScreen from '../screens/ReadInvoiceScreen'
import PayTransactionScreen from '../screens/PayTransactionScreen'

const Stack = createNativeStackNavigator()

function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ReceiveTerminal" component={ReceiveTerminalScreen} />
      <Stack.Screen name="SendTerminal" component={SendTerminalScreen} />
      <Stack.Screen name="FindUser" component={FindUser} />
      <Stack.Screen name="QRCodeShownScreen" component={QRCodeShownScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ScanQRScreen" component={ScanQRScreen} />
      <Stack.Screen name="ReadInvoiceScreen" component={ReadInvoiceScreen} />
      <Stack.Screen
        name="PayTransactionScreen"
        component={PayTransactionScreen}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
    </Stack.Navigator>
  )
}

export default MainStackNavigator
