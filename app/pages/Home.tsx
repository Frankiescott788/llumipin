import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Notification01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
    <path d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Home02Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
    <path d="M12.0002 18L12.0002 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

type RestaurantCardProps = {
  name: string;
  image: string;
  category: string;
  rating?: number;
  location: string;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, image, category, rating = 4, location }) => (
  <View style={styles.restaurantCard}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{name}</Text>
      {location && (
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#4A90E2" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      )}
      {rating && (
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < rating ? 'star' : 'star-outline'}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
      )}
    </View>
  </View>
);

type CategoryChipProps = {
  label: string;
  selected?: boolean;
};

const CategoryChip: React.FC<CategoryChipProps> = ({ label, selected = false }) => (
  <TouchableOpacity
    style={[styles.categoryChip, selected && styles.selectedCategoryChip]}
  >
    <Text
      style={[styles.categoryChipText, selected && styles.selectedCategoryChipText]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

type RecommendationCardProps = {
  name: string;
  image: string;
  category: string;
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ name, image, category }) => (
  <View style={styles.recommendationCard}>
    <Image source={{ uri: image }} style={styles.recommendationImage} />
    <View style={styles.recommendationContent}>
      <Text style={styles.recommendationTitle}>{name}</Text>
      <Text style={styles.recommendationCategory}>{category}</Text>
    </View>
  </View>
);

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
     
        <View style={styles.header}>
          <Text style={styles.locationTitle}>Polokwane</Text>
          <TouchableOpacity>
            <Notification01Icon width={24} height={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurant"
            placeholderTextColor="#666"
          />
        </View>

  
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          <CategoryChip label="Cafe" selected={true} />
          <CategoryChip label="Steakhouse" />
          <CategoryChip label="Pizza" />
          <CategoryChip label="Steakhouse" />
        </ScrollView>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <RecommendationCard
              name="The Blarney Stone"
              image="https://images.pexels.com/photos/2102948/pexels-photo-2102948.jpeg?auto=compress&cs=tinysrgb&w=600"
              category="Diner Restaurant"
            />
            <RecommendationCard
              name="The Cloud Store"
              image="https://images.pexels.com/photos/2102948/pexels-photo-2102948.jpeg?auto=compress&cs=tinysrgb&w=600"
              category="FastFood Restaurant"
            />
          </ScrollView>
        </View>

     
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best For You</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>

          <RestaurantCard
            name="Golden Pillow"
            image="https://images.pexels.com/photos/2102948/pexels-photo-2102948.jpeg?auto=compress&cs=tinysrgb&w=600"
            category="Hotel"
            location="Polokwane Central"
            rating={4}
          />
          <RestaurantCard
            name="LibertyBite Bistro"
            image="https://images.pexels.com/photos/2102948/pexels-photo-2102948.jpeg?auto=compress&cs=tinysrgb&w=600"
            category="Bistro"
            location="Mokopane"
            rating={4}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Home02Icon width={24} height={24} color="#4A90E2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="compass-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bookmark-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  selectedCategoryChip: {
    backgroundColor: '#4A90E2',
  },
  categoryChipText: {
    color: '#666',
  },
  selectedCategoryChipText: {
    color: '#fff',
  },
  sectionContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMoreText: {
    color: '#666',
  },
  recommendationCard: {
    width: 250,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: 150,
  },
  recommendationContent: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  recommendationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendationCategory: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  restaurantCard: {
    marginBottom: 16,
    flexDirection: 'row',  
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: 120,  
    height: 120, 
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#4A90E2',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
});

export default HomeScreen;
