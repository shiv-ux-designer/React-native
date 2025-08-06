import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function FavouritesScreen() {
  const insets = useSafeAreaInsets();

  // Sample favorite products data
  const favoriteProducts = [
    {
      id: 1,
      name: 'Dark Chilli',
      price: '$7.05',
      rating: '4.0 (200)',
      discount: '10% Off',
      image: 'https://via.placeholder.com/100x80/FF6B6B/FFFFFF?text=Chilli',
    },
    {
      id: 2,
      name: 'Tomatoes',
      price: '$7.05',
      rating: '4.0 (200)',
      discount: '10% Off',
      image: 'https://via.placeholder.com/100x80/FF8E53/FFFFFF?text=Tomato',
    },
    {
      id: 3,
      name: 'Kiwi',
      price: '$7.05',
      rating: '4.0 (200)',
      discount: '10% Off',
      image: 'https://via.placeholder.com/100x80/4ECDC4/FFFFFF?text=Kiwi',
    },
    {
      id: 4,
      name: 'Purex',
      price: '$7.05',
      rating: '4.0 (200)',
      discount: '10% Off',
      image: 'https://via.placeholder.com/100x80/45B7D1/FFFFFF?text=Purex',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* ========================================
          HEADER SECTION
          ======================================== */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.locationContainer}
          onPress={() => {
            console.log('Location pressed');
            router.push('/location');
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="location" size={24} color="#000000" />
          <Text style={styles.locationText}>61 Hopper street..</Text>
          <Ionicons name="chevron-down" size={20} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* ========================================
          SEARCH BAR
          ======================================== */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#a2a2a2" />
          <Text style={styles.searchPlaceholder}>Search "Pui Saag"</Text>
        </TouchableOpacity>
      </View>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ========================================
            FAVOURITES HEADER
            ======================================== */}
        <View style={styles.favouritesHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.favouritesTitle}>Favourite</Text>
          <View style={styles.placeholder} />
        </View>

        {/* ========================================
            FAVOURITE PRODUCTS LIST
            ======================================== */}
        <View style={styles.productsContainer}>
          {favoriteProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
              </View>
              
              {/* Discount Tag */}
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>
              
              {/* Product Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
              </View>
              
              {/* Action Buttons */}
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart" size={20} color="#000000" />
              </TouchableOpacity>
              
              <View style={styles.addButton}>
                <Ionicons name="remove" size={18} color="#000000" />
                <Text style={styles.quantityText}>1</Text>
                <Ionicons name="add" size={18} color="#000000" />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ========================================
          BOTTOM NAVIGATION
          ======================================== */}
      <View style={[styles.bottomNavigation, { 
        paddingBottom: Math.max(insets.bottom, 20),
        height: 70 + Math.max(insets.bottom, 20),
        bottom: 5,
      }]}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="home" size={26} color="#000000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { 
          backgroundColor: 'rgba(12, 162, 1, 0.1)',
        }]}>
          <Ionicons name="heart" size={26} color="#0ca201" />
          <Text style={styles.navText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="refresh" size={26} color="#000000" />
          <Text style={styles.navText}>Reorders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="menu" size={26} color="#000000" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  profileButton: {
    padding: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 55,
    gap: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#a2a2a2',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  favouritesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  favouritesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  placeholder: {
    width: 24,
  },
  productsContainer: {
    gap: 10,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  productImageContainer: {
    width: 114,
    height: 121,
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  productImage: {
    width: 100,
    height: 80,
    borderRadius: 5,
  },
  discountTag: {
    position: 'absolute',
    top: -1,
    left: -1,
    backgroundColor: '#0ca201',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  productInfo: {
    flex: 1,
    gap: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#000000',
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 38,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    zIndex: 100,
    height: 60,
    paddingBottom: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 65,
    borderRadius: 20,
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginTop: 3,
  },
}); 