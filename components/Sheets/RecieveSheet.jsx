import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { useNavigation } from '@react-navigation/native'
import AppText from '../AppText'
import { useSelector } from 'react-redux'

const RecieveSheet = ({ receiveActionSheet, refresh }) => {
  const navigation = useNavigation()

  const height = useWindowDimensions().height

  return (
    <ActionSheet
      ref={receiveActionSheet}
      containerStyle={{
        height: height / 2,
        padding: 15,
      }}
    >
      {/* Sheet header */}
      <View className="flex flex-row items-center justify-between w-full mb-3">
        <AppText classProps="text-2xl font-bold">Receive Options</AppText>

        <TouchableOpacity
          onPress={() => receiveActionSheet.current?.hide()}
          className=""
        >
          <AntDesign name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View className="flex flex-col items-center flex-1 ">
        <TouchableOpacity
          onPress={() => {
            receiveActionSheet.current?.hide()
            navigation.navigate('ReceiveTerminal', {
              token: 'BTC-LT',
              refresh: refresh,
            })
          }}
          className="flex flex-row items-center w-full h-16 "
        >
          <View className="flex items-center justify-center bg-orange-500 rounded-full w-9 h-9">
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={30}
              color="#fff"
            />
          </View>
          <AppText classProps="mx-4 text-xl font-medium ">
            BTC Lightning
          </AppText>
        </TouchableOpacity>

        {/* BUSD  */}
        <TouchableOpacity
          onPress={() => {
            receiveActionSheet.current?.hide()
            navigation.navigate('ReceiveTerminal', { token: 'BUSD' })
          }}
          className="flex flex-row items-center w-full h-16 "
        >
          <View className="flex items-center justify-center bg-black rounded-full w-9 h-9">
            <Image
              source={require('../../assets/tokens/busd.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <AppText classProps="mx-4 text-xl font-medium ">
            BUSD (Binance USD)
          </AppText>
        </TouchableOpacity>

        {/* cUSD */}
        <TouchableOpacity
          onPress={() => {
            receiveActionSheet.current?.hide()
            navigation.navigate('ReceiveTerminal', { token: 'cUSD' })
          }}
          className="flex flex-row items-center w-full h-16 "
        >
          <Image
            source={require('../../assets/tokens/cusd.png')}
            style={{ width: 40, height: 40 }}
          />
          <AppText classProps="mx-4 text-xl font-medium ">
            cUSD (Celo Dollar)
          </AppText>
        </TouchableOpacity>

        {/* USDT */}
        <TouchableOpacity
          onPress={() => {
            receiveActionSheet.current?.hide()
            navigation.navigate('ReceiveTerminal', { token: 'USDT' })
          }}
          className="flex flex-row items-center w-full h-16 "
        >
          <Image
            source={require('../../assets/tokens/usdt.png')}
            style={{ width: 40, height: 40 }}
          />
          <View className="flex flex-row">
            <AppText classProps="mx-4 text-xl font-medium ">
              USDT (Tether)
            </AppText>
            <View className="flex flex-row">
              <Image
                source={require('../../assets/tokens/chain.png')}
                style={{ width: 18, height: 18 }}
              />
              <AppText classProps="text-xs mx-1">BNB Chain</AppText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  )
}

export default RecieveSheet
