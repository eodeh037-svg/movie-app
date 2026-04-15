import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'

export default function Index() {
  const [movie, setMovie] = useState<any>(null)
  const [search, setSearch] = useState<string>("batman")
  const [loading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const fetchMovies = async () => {
    setIsLoading(true)

    try {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${search}&apikey=dc4feab8`
      )
      const data = await res.json()
      setMovie(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <View className="flex-1 bg-black px-4 pt-10">

      {/* 🔍 Search Bar */}
      <View className="flex-row items-center bg-gray-900 rounded-2xl px-3 py-2 mb-4">
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          className="flex-1 text-white"
        />

        <TouchableOpacity
          onPress={fetchMovies}
          className="bg-yellow-400 px-4 py-2 rounded-xl"
        >
          <Text className="font-bold text-black">Go</Text>
        </TouchableOpacity>
      </View>

      {/* 🎬 Loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#facc15" />
      ) : movie?.Response === "False" ? (
        <Text className="text-white text-center mt-10">
          {movie.Error}
        </Text>
      ) : (
        <FlatList
          data={movie?.Search}
          keyExtractor={(item, index) => item.imdbID + index}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(`/movieDetails/${item.imdbID}`)
              }
              className="flex-row items-center bg-gray-900 rounded-2xl p-3 mb-3"
            >
              <Image
                source={{
                  uri:
                    item.Poster !== "N/A"
                      ? item.Poster
                      : "https://via.placeholder.com/100x150",
                }}
                className="w-16 h-24 rounded-lg"
                resizeMode="cover"
              />

              <View className="ml-4 flex-1">
                <Text className="text-white font-bold text-lg">
                  {item.Title}
                </Text>
                <Text className="text-gray-400">
                  {item.Year}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}