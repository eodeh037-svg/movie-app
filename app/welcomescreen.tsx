import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'

export default function WelcomeScreen() {
  const router = useRouter()

  // 🎬 animation values
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.8)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 })
    scale.value = withTiming(1, { duration: 1000 })
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
      }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="flex-1 bg-black/70 justify-center items-center px-6">

        {/* 🎬 Animated Logo */}
        <Animated.View style={animatedStyle}>
          <Text className="text-red-600 text-5xl font-bold mb-4">
            MovieFlix
          </Text>
        </Animated.View>

        {/* 📝 Subtitle */}
        <Text className="text-gray-300 text-center mb-10">
          Discover your favorite movies 🍿
        </Text>

        {/* 🚀 Button */}
        <TouchableOpacity
          onPress={() => router.push('/')}
          className="bg-red-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold text-lg">
            Get Started
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  )
}