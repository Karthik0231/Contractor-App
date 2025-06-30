import React, { useState } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { Button } from 'react-native-paper'

export default function ManageContract() {
  const project = {
    name: 'Residential Apartment Project',
    client: 'ABC Constructions Pvt. Ltd.',
    location: 'Udupi, Karnataka',
    status: 'Ongoing',
    image: 'https://picsum.photos/400/250?random=1',
  };

  return (
    <View className="flex-1">
      <View className="flex-1 p-3">
        <ImageBackground
          source={{ uri: project.image }}
          className="rounded-2xl overflow-hidden shadow-md mb-3"
          imageStyle={{ borderRadius: 16 }}
        >
          <View className="bg-black/40 p-4">
            <Text className="font-bold text-xl text-white mb-1">
              {project.name}
            </Text>
            <Text className="text-white/90 text-sm mb-1">
              📍 {project.location}
            </Text>
            <Text className="text-white/90 text-sm mb-1">
              Client: {project.client}
            </Text>
            <View className="bg-green-500 self-start px-3 py-1 rounded-full mt-2">
              <Text className="text-white text-xs font-medium">
                {project.status}
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* Buttons moved here - directly below the banner */}
        <View className="flex-row justify-between space-x-3 mb-4">
          <Button
          icon="plus"
            mode="contained"
            onPress={() => console.log('Add Job')}
            className="flex-1 bg-teal-600 rounded-xl"
            labelStyle={{ fontWeight: 'bold', color: 'white' }}
            contentStyle={{ paddingVertical: 8 }}
          >
            Add Job
          </Button>

          <Button
            mode="contained"
            onPress={() => console.log('Manage Tasks')}
            className="flex-1 bg-teal-600 rounded-xl"
            labelStyle={{ fontWeight: 'bold', color: 'white' }}
            contentStyle={{ paddingVertical: 8 }}
          >
            Manage Tasks
          </Button>
        </View>

        {/* Space for additional content */}
        <View className="flex-1">
          {/* You can add more components here */}
        </View>
      </View>
    </View>
  )
}