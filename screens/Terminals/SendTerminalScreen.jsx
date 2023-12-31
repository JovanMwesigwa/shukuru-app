import { useNavigation, useRoute } from '@react-navigation/native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import SendingMoney from '../../components/Loading/SendingMoney'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { API_URL, SOCKET_SERVER } from '../../apiURL'
import AppText from '../../components/AppText'
import TransactionDone from '../Animators/TransactionDone'
import { io } from 'socket.io-client'
import TransactionFailed from '../Animators/TransactionFailed'

const socket = io(SOCKET_SERVER)

const SendTerminalScreen = () => {
  const [number, setNumber] = useState('0.00')
  const [hasPoint, setHasPoint] = useState(false)

  const userState = useSelector((state) => state.user)

  const { profile } = useSelector((state) => state.profile)

  const [done, setDone] = useState(false)

  const [failed, setFailed] = useState(false)

  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const route = useRoute()

  const { token, contactNumber, userId, refresh } = route.params

  const handleSubmit = async () => {
    if (number == '0.0') return
    setLoading(true)
    try {
      let PAY_URL

      const data = {
        from: userState.user.userId,
        to: userId,
        amount: number,
        memo: 'hello world ',
      }

      if (token === 'cUSD') {
        PAY_URL = `${API_URL}/send/cusd`
      } else if (token === 'BTC-LT') {
        PAY_URL = `${API_URL}/send`
      } else if (token === 'BUSD') {
        PAY_URL = `${API_URL}/send/busd`
      }

      const result = await axios.post(PAY_URL, data, {
        headers: {
          Authorization: `Bearer ${userState.user.token}`,
        },
      })

      if (result.data.success) {
        // socket.emit('sendTxNotification', {
        //   recipientId: userId,
        //   message: 'New transaction here...',
        // })

        socket.emit('sendTxNotification', {
          recipientId: userId,
          message: {
            title: 'You received a new payment',
            subtitle: `@${result.data.data.name}`,
            // body: `Paid in ${token} Congrats! 🎉`,
            body: `Payment via app. Congrats! 🎉`,
          },
          // message: {
          //   title: 'You received a new payment',
          //   subtitle: '@kabaya',
          //   body: `${user.country} ${Number} ${
          //     token === 'BTC-LT' ? ' Lightning BTC' : ' Celo dollar'
          //   }`,
          // },
        })

        setLoading(false)
        setNumber('0.00')
        setDone(true)
      } else {
        setLoading(false)
        setFailed(true)
      }
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }

  const handleNumberPress = (num) => {
    let newPrice

    if (num.includes('.')) {
      setHasPoint(true)
    }

    if (number === '0.00' || number === '0.0' || !number) {
      newPrice = num
    } else {
      newPrice = number + num
    }

    setNumber(newPrice)
  }

  const handleBackspacePress = () => {
    let newPrice = number?.slice(0, -1)
    setNumber(newPrice)

    if (!number) {
      setHasPoint(false)
    }
  }

  const renderNumberButton = (num) => (
    <TouchableOpacity
      style={styles.button}
      disabled={hasPoint && num == '.' && true}
      onPress={() => handleNumberPress(num)}
    >
      <Text style={styles.buttonText}>{num}</Text>
    </TouchableOpacity>
  )

  if (loading) return <SendingMoney />

  if (done) return <TransactionDone refresh={refresh} />

  if (failed) return <TransactionFailed />

  return (
    <View style={styles.container}>
      {/* Headre */}
      <View className="flex flex-row items-center justify-between w-full px-5">
        <Pressable onPress={() => navigation.goBack()} className="flex flex-1">
          <SimpleLineIcons name="arrow-left" size={22} color="black" />
        </Pressable>

        <View className="flex items-center justify-center flex-1">
          <AppText classProps="text-2xl font-bold">Send to</AppText>
          <AppText classProps="text-sm font-medium">{contactNumber}</AppText>
        </View>

        <View className="flex items-center justify-center flex-1">
          <AppText classProps="p-2 font-bold bg-yellow-100 rounded-full text-primary">
            {token}
          </AppText>
        </View>
      </View>

      {/* Entry */}
      <View className="flex flex-col items-center justify-center flex-1">
        <AppText classProps="text-6xl font-bold">
          {number ? number : '0.00'}
        </AppText>
        <AppText>{profile.country}</AppText>
      </View>

      {/* 
      <View className="flex w-full px-5">
        <TextInput
          className="w-full p-4 h-16 px-4 border-[0.8px] rounded-lg border-neutral-300"
          placeholder="Add a memo"
        />
      </View>
       */}

      <View style={styles.row}>
        {renderNumberButton('1')}
        {renderNumberButton('2')}
        {renderNumberButton('3')}
      </View>
      <View style={styles.row}>
        {renderNumberButton('4')}
        {renderNumberButton('5')}
        {renderNumberButton('6')}
      </View>
      <View style={styles.row}>
        {renderNumberButton('7')}
        {renderNumberButton('8')}
        {renderNumberButton('9')}
      </View>
      <View style={styles.row}>
        {renderNumberButton('.')}
        {renderNumberButton('0')}
        <TouchableOpacity style={styles.button} onPress={handleBackspacePress}>
          <Feather name="delete" size={25} color="#404040" />
        </TouchableOpacity>
      </View>

      <View className="w-full px-6 my-4">
        <Pressable
          disabled={loading}
          onPress={handleSubmit}
          // onPress={() => refresh()}
          className="flex items-center justify-center w-full p-4 rounded-full bg-primary "
        >
          <AppText classProps="text-xl font-bold">Send</AppText>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#404040',
  },
  number: {
    fontSize: 48,
    marginBottom: 20,
  },
})

export default SendTerminalScreen
