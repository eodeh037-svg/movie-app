import { View, Text, Image, ActivityIndicator,TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

export default function MovieDetails() {
  const { id } = useLocalSearchParams()

  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=dc4feab8`
      )
      const data = await res.json()
      setMovie(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovieDetails()
  }, [])

  // Loading UI
  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#facc15" />
      </View>
    )
  }

  // Error handling
  if (!movie || movie.Response === "False") {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-center">
          {movie?.Error || "Movie not found"}
        </Text>
      </View>
    )
  }

  return (
    <>

      <Stack.Screen
        options={{
          title: movie?.Title || "Movie Details",
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#facc15",
          
        }}
      />

      <View className="flex-1 bg-black px-4 pt-10">

        {/* 🎬 Poster */}
        <Image
          source={{
            uri:
              movie?.Poster !== "N/A"
                ? movie?.Poster
                : "https://via.placeholder.com/300x450",
          }}
          className="w-full h-96 rounded-2xl"
          resizeMode="cover"
        />

        {/* 🎬 Title */}
        <Text className="text-white text-2xl font-bold mt-4">
          {movie?.Title}
        </Text>

        {/* 📅 Year + Genre */}
        <Text className="text-gray-400 mt-1">
          {movie?.Year} • {movie?.Genre}
        </Text>

        {/* 📝 Plot */}
        <Text className="text-white mt-4 leading-5">
          {movie?.Plot}
        </Text>

        <TouchableOpacity
  onPress={() => Linking.openURL(   `https://www.netflix.com/search?q=${movie?.Title}`)}
  className="bg-red-600 p-3 rounded-xl mt-4"
>
  <Text className="text-white font-bold text-center">
    Watch on Netflix
  </Text>
</TouchableOpacity>

        {/* ⭐ Rating */}
        <Text className="text-yellow-400 mt-4">
          ⭐ {movie?.imdbRating}
        </Text>

      </View>
    </>
  )
}