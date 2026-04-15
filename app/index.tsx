import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'

export default function Index() {
  const [movie, setMovie] = useState<any>(null)
  const [trending, setTrending] = useState<any[]>([])
  const [search, setSearch] = useState<string>("batman")
  const [loading, setIsLoading] = useState<boolean>(false)

  const [action, setAction] = useState<any[]>([])
  const [comedy, setComedy] = useState<any[]>([])
  const [marvel, setMarvel] = useState<any[]>([])

  const router = useRouter()

  // 🎬 Search
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

  // 🔥 Trending
  const fetchTrending = async () => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?s=avengers&apikey=dc4feab8`
      )
      const data = await res.json()
      setTrending(data?.Search || [])
    } catch (error) {
      console.log(error)
    }
  }

  // 🎬 Categories
  const fetchAction = async () => {
    const res = await fetch(`http://www.omdbapi.com/?s=action&apikey=dc4feab8`)
    const data = await res.json()
    setAction(data?.Search || [])
  }

  const fetchComedy = async () => {
    const res = await fetch(`http://www.omdbapi.com/?s=comedy&apikey=dc4feab8`)
    const data = await res.json()
    setComedy(data?.Search || [])
  }

  const fetchMarvel = async () => {
    const res = await fetch(`http://www.omdbapi.com/?s=marvel&apikey=dc4feab8`)
    const data = await res.json()
    setMarvel(data?.Search || [])
  }

  useEffect(() => {
    fetchMovies()
    fetchTrending()
    fetchAction()
    fetchComedy()
    fetchMarvel()
  }, [])

  // 🎬 Reusable Row Component
  const MovieRow = ({ title, data }: any) => (
    <View className="mb-6">

      <Text className="text-white text-xl font-bold mb-3">
        {title}
      </Text>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.imdbID + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/movieDetails/${item.imdbID}`)
            }
            className="mr-3"
          >
            <Image
              source={{
                uri:
                  item.Poster !== "N/A"
                    ? item.Poster
                    : "https://via.placeholder.com/100x150",
              }}
              className="w-28 h-40 rounded-xl"
            />

            <Text className="text-white text-xs mt-1 w-28">
              {item.Title.length > 15
                ? item.Title.slice(0, 15) + "..."
                : item.Title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )

 return (
  <ScrollView
    className="flex-1 bg-black"
    contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 50 }}
    showsVerticalScrollIndicator={false}
  >

    {/* 🔥 Header */}
    <Text className="text-red-600 text-3xl font-bold mb-4">
      MovieFlix
    </Text>

    {/* 🔍 Search Bar */}
    <View className="flex-row items-center bg-gray-900 rounded-2xl px-3 py-2 mb-5">
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        className="flex-1 text-white"
      />

      <TouchableOpacity
        onPress={fetchMovies}
        className="bg-red-600 px-4 py-2 rounded-xl"
      >
        <Text className="font-bold text-white">Go</Text>
      </TouchableOpacity>
    </View>

    {/* 🔥 Trending */}
    <MovieRow title="🔥 Trending" data={trending} />

    {/* 🎬 Categories */}
    <MovieRow title="🎬 Action" data={action} />
    <MovieRow title="😂 Comedy" data={comedy} />
    <MovieRow title="🦸 Marvel" data={marvel} />

    {/* 🎬 Loading / Search Results */}
    {loading ? (
      <ActivityIndicator size="large" color="#ef4444" />
    ) : movie?.Response === "False" ? (
      <Text className="text-white text-center mt-10">
        {movie.Error}
      </Text>
    ) : (
      movie?.Search?.map((item: any, index: number) => (
        <TouchableOpacity
          key={item.imdbID + index}
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
            className="w-20 h-28 rounded-xl"
          />

          <View className="ml-4 flex-1">
            <Text className="text-white font-bold text-lg">
              {item.Title}
            </Text>
            <Text className="text-gray-400 mt-1">
              {item.Year}
            </Text>

            <Text className="text-red-500 text-xs mt-2">
              🎬 Movie
            </Text>
          </View>
        </TouchableOpacity>
      ))
    )}

  </ScrollView>
)
}