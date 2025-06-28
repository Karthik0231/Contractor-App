import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TextInput, Button, Card, Chip, FAB, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function ContractList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const theme = useTheme();
  const navigation = useNavigation();

  const contracts = [
    {
      id: 1,
      name: 'Residential Apartment Project',
      client: 'ABC Constructions Pvt. Ltd.',
      location: 'Udupi, Karnataka',
      startDate: '2024-10-01',
      endDate: '2025-06-30',
      budget: '₹1.2 Crore',
      status: 'Ongoing',
      progress: 65,
      description: 'Construction of a 5-storey residential apartment with 20 units and a basement parking.',
      image: 'https://picsum.photos/400/250?random=1'
    },
    {
      id: 2,
      name: 'Commercial Office Complex',
      client: 'XYZ Realty',
      location: 'Mangalore, Karnataka',
      startDate: '2023-12-15',
      endDate: '2025-01-20',
      budget: '₹3.8 Crore',
      status: 'Delayed',
      progress: 40,
      description: 'A commercial building with 6 floors, rooftop cafeteria, and underground power backup system.',
      image: 'https://picsum.photos/400/250?random=2'
    },
    {
      id: 3,
      name: 'School Renovation Project',
      client: 'Shree Public School Trust',
      location: 'Manipal, Karnataka',
      startDate: '2024-04-10',
      endDate: '2024-11-30',
      budget: '₹75 Lakhs',
      status: 'Completed',
      progress: 100,
      description: 'Upgrading school infrastructure including classrooms, washrooms, and playground facilities.',
      image: 'https://picsum.photos/400/250?random=3'
    },
    {
      id: 4,
      name: 'Bridge Construction',
      client: 'Municipal Corporation',
      location: 'Surathkal, Karnataka',
      startDate: '2024-08-01',
      endDate: '2025-12-31',
      budget: '₹2.5 Crore',
      status: 'Planning',
      progress: 15,
      description: 'Construction of a concrete bridge over Netravati river with modern engineering standards.',
      image: 'https://picsum.photos/400/250?random=4'
    }
  ];

  const statusConfig = {
    ongoing: { bg: '#E0F2FE', text: '#0369A1', icon: 'play-circle-filled' },
    delayed: { bg: '#FEF2F2', text: '#DC2626', icon: 'warning' },
    completed: { bg: '#ECFDF5', text: '#059669', icon: 'check-circle' },
    planning: { bg: '#FEF3C7', text: '#D97706', icon: 'schedule' }
  };

  const filterOptions = ['all', 'ongoing', 'delayed', 'completed', 'planning'];

  const filteredContracts = useMemo(() => {
    return contracts.filter(contract => {
      const matchesSearch = contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contract.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contract.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contract.budget.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilter === 'all' || 
                           contract.status.toLowerCase() === selectedFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#059669';
    if (progress >= 50) return '#D97706';
    return '#DC2626';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-3xl font-bold text-white">
            Contract Manager
          </Text>
          {/* <TouchableOpacity className="relative">
            <Icon name="notifications" size={24} color="white" />
            <View className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">3</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <Text className="text-blue-100 text-base font-medium">
          Manage all your construction projects
        </Text>
      </View>
      
      {/* Search Bar */}
      <View className="px-6 -mt-6 mb-5">
        <View className="flex-row items-center bg-white rounded-2xl px-4 shadow-lg border border-gray-100">
          <Icon name="search" size={24} color="#9CA3AF" />
          <TextInput
            mode="flat"
            placeholder="Search contracts, clients, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 bg-transparent text-gray-700"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            placeholderTextColor="#9CA3AF"
            contentStyle={{ 
              paddingHorizontal: 12,
              paddingVertical: 14,
              fontSize: 16
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="clear" size={22} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips */}
      <View className="px-6 mb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filterOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedFilter(item)}
              className="mr-2"
            >
              <Chip
                mode={selectedFilter === item ? 'flat' : 'outlined'}
                selected={selectedFilter === item}
                onPress={() => setSelectedFilter(item)}
                style={{
                  backgroundColor: selectedFilter === item ? '#3B82F6' : 'transparent',
                  borderColor: '#3B82F6'
                }}
                textStyle={{
                  color: selectedFilter === item ? 'white' : '#3B82F6',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}
              >
                {item} {item !== 'all' && `(${contracts.filter(c => c.status.toLowerCase() === item).length})`}
              </Chip>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      {/* Contract List */}
      <FlatList
        data={filteredContracts}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const statusStyle = statusConfig[item.status.toLowerCase()];
          const progressColor = getProgressColor(item.progress);
          
          return (
            <View className="px-6 mb-4">
              <TouchableOpacity
                onPress={() => console.log(`Selected contract: ${item.name}`)}
                activeOpacity={0.95}
              >
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <Card.Cover 
                    source={{ uri: item.image }} 
                    style={{ height: 180 }}
                  />
                  
                  <Card.Content className="p-5">
                    {/* Header with Status */}
                    <View className="flex-row justify-between items-start mb-3">
                      <View className="flex-1 mr-3">
                        <Text className="text-xl font-bold text-gray-800 mb-1">
                          {item.name}
                        </Text>
                        <Text className="text-sm text-gray-600 font-medium">
                          {item.client}
                        </Text>
                      </View>
                      <Chip 
                        mode="flat"
                        compact
                        icon={() => <Icon name={statusStyle.icon} size={16} color={statusStyle.text} />}
                        textStyle={{ 
                          color: statusStyle.text, 
                          fonteight: '700',
                          fontSize: 12 
                        }}
                        style={{ 
                          backgroundColor: statusStyle.bg,
                          borderRadius: 20
                        }}
                      >
                        {item.status}
                      </Chip>
                    </View>

                    {/* Progress Bar */}
                    <View className="mb-2">
                      <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-sm text-gray-700 font-semibold">
                          Progress
                        </Text>
                        <Text className="text-sm font-bold" style={{ color: progressColor }}>
                          {item.progress}%
                        </Text>
                      </View>
                      <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <View 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${item.progress}%`, 
                            backgroundColor: progressColor
                          }} 
                        />
                      </View>
                    </View>

                    <Divider className="mb-2" />

                    {/* Location and Budget */}
                    <View className="bg-gray-50 p-4 rounded-xl mb-2">
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center flex-1">
                          <Icon name="location-on" size={20} color="#6B7280" />
                          <Text className="ml-2 text-gray-700 font-medium flex-1">
                            {item.location}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Icon name="account-balance-wallet" size={20} color="#059669" />
                          <Text className="ml-2 text-green-600 font-bold text-base">
                            {item.budget}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Timeline */}
                    <View className="flex-row justify-between mb-4">
                      <View className="flex-1 mr-3">
                        <Text className="text-xs text-gray-500 uppercase font-semibold mb-1">
                          Start Date
                        </Text>
                        <Text className="text-sm text-gray-700 font-semibold">
                          {formatDate(item.startDate)}
                        </Text>
                      </View>
                      <View className="flex-1 ml-3">
                        <Text className="text-xs text-gray-500 uppercase font-semibold mb-1">
                          End Date
                        </Text>
                        <Text className="text-sm text-gray-700 font-semibold">
                          {formatDate(item.endDate)}
                        </Text>
                      </View>
                    </View>

                    {/* Description */}
                    <Text className="text-gray-600 text-sm leading-5">
                      {item.description}
                    </Text>
                  </Card.Content>

                  {/* Action Buttons */}
                  <Card.Actions className="px-5 pb-4">
                    <Button 
                      mode="contained" 
                      buttonColor="#3B82F6"
                      textColor="white"
                      className="mr-2 rounded-xl flex-1"
                      contentStyle={{ paddingVertical: 4 }}
                      labelStyle={{ fontSize: 14, fontWeight: '600' }}
                      icon="eye"
                    >
                      View Details
                    </Button>
                    <Button 
                      mode="outlined" 
                      textColor="#EF4444"
                      className="rounded-xl flex-1"
                      style={{ borderColor: '#FCA5A5' }}
                      contentStyle={{ paddingVertical: 4 }}
                      labelStyle={{ fontSize: 14, fontWeight: '600' }}
                      icon="delete"
                    >
                      delete
                    </Button>
                  </Card.Actions>
                </Card>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-16">
            <Icon name="search-off" size={64} color="#D1D5DB" />
            <Text className="text-lg text-gray-500 font-semibold mt-4">
              No Contracts Found
            </Text>
            <Text className="text-sm text-gray-400 text-center mt-2 px-8">
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      />

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        onPress={() => navigation.navigate('AddContract')}
        className="absolute bottom-6 right-6 bg-primary shadow-lg"
        color="white"
        style={{
          borderRadius: 28,
          elevation: 12,
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 12
        }}
      />
    </View>
  );
}