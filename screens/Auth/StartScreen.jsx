import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AppText from '../../components/AppText'

const StartScreen = () => {
  const navigation = useNavigation()
  return (
    <View className="flex flex-col flex-1 p-5">
      <View className="flex justify-center flex-1 py-10">
        <View className="flex flex-1" />
        <AppText classProps="text-3xl font-bold">
          Secure Borderless Crypto Payments
        </AppText>
      </View>

      <View className="flex flex-col justify-center py-8">
        {/* Button */}
        <Pressable
          onPress={() => navigation.navigate('SignupScreen')}
          className="flex items-center p-4 my-4 rounded-full bg-primary"
        >
          <AppText classProps="text-lg font-bold ">
            Open Shukuru Account
          </AppText>
        </Pressable>

        {/* Already */}
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          className="flex flex-row items-center justify-center"
        >
          <AppText classProps="text-base font-light">
            Already a Shukuru user?
          </AppText>
          <Text className="mx-3 text-lg font-bold text-primary">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StartScreen
