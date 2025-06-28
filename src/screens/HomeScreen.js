import * as React from 'react';
import { 
  Image, 
  View, 
  Animated, 
  Dimensions, 
  ScrollView 
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Carousel data
const slides = [
  {
    image: require('../assets/track.png'),
    title: 'Track Contracts',
    description: 'Easily view and manage all your ongoing contracts.',
  },
  {
    image: require('../assets/assign.png'),
    title: 'Assign Jobs',
    description: 'Assign tasks to subcontractors in just a few taps.',
  },
  {
    image: require('../assets/updated.png'),
    title: 'Stay Updated',
    description: 'Receive real-time updates and stay in control.',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);
  const scaleAnim = new Animated.Value(0.9);

  // Initialize animations on component mount
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  return (
    <View className="flex-1 bg-primary relative">
      {/* Background Decorative Elements */}
      <View className="absolute inset-0">
        <View className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full" />
        <View className="absolute top-40 right-8 w-24 h-24 bg-white/10 rounded-full" />
        <View className="absolute bottom-32 left-16 w-20 h-20 bg-white/5 rounded-full" />
        <View className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full" />
      </View>

      {/* Main Content */}
      <Animated.View
        className="flex-1 px-6 pt-16 pb-8"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Header Section */}
        <View className="items-center mb-6">
          <Text className="text-white/90 text-lg font-light">
            Welcome to
          </Text>
          <Text className="text-white text-4xl font-bold mb-2 text-center">
            SiteLink
          </Text>
          <Text className="text-white/80 text-base text-center px-4">
            Simplify your contract management with ease
          </Text>
        </View>

        {/* Feature Carousel */}
        <View className="flex-1 justify-center mb-6">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width }}
          >
            {slides.map((slide, index) => (
              <View key={index} className="items-center justify-center pr-12" style={{ width }}>
                <Image
                  source={slide.image}
                  resizeMode="contain"
                  style={{
                    width: 170,
                    height: 180,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                  }}
                />
                <Text className="text-xl font-bold text-center text-white mt-4">
                  {slide.title}
                </Text>
                <Text className="text-sm text-center text-white/70 px-6 mt-2">
                  {slide.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Action Button */}
        <Animated.View
          className="px-4"
          style={{ transform: [{ scale: scaleAnim }] }}
        >
          <Button
            icon="arrow-right"
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            className="bg-orange-500 rounded-full shadow-lg"
            contentStyle={{ paddingVertical: 12 }}
            labelStyle={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: 'white',
              letterSpacing: 0.5
            }}
          >
            Get Started
          </Button>
        </Animated.View>
      </Animated.View>

      {/* Bottom Gradient Overlay */}
      <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </View>
  );
};

export default HomeScreen;