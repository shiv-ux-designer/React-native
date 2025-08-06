import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CategoryScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('Buy Fresh Fruits');

  // Sample category data
  const categories = [
    { id: 1, name: 'All', image: 'https://via.placeholder.com/55x55/0ca201/FFFFFF?text=A' },
    { id: 2, name: 'Exotic Fruits', image: 'https://via.placeholder.com/55x55/FF6B6B/FFFFFF?text=EF' },
    { id: 3, name: 'Daily fruits', image: 'https://via.placeholder.com/55x55/4ECDC4/FFFFFF?text=DF' },
    { id: 4, name: 'Seasonal Fruits', image: 'https://via.placeholder.com/55x55/FF8E53/FFFFFF?text=SF' },
  ];

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Banana',
      price: '₹10',
      originalPrice: '₹15',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FFD700/FFFFFF?text=B',
      quantity: '1 pcs',
      saveAmount: 'Save ₹5',
      options: '2 Options'
    },
    {
      id: 2,
      name: 'Apple',
      price: '₹12',
      originalPrice: '₹18',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FF0000/FFFFFF?text=A',
      quantity: '1 pcs',
      saveAmount: 'Save ₹6',
      options: '2 Options'
    },
    {
      id: 3,
      name: 'Orange',
      price: '₹8',
      originalPrice: '₹12',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FFA500/FFFFFF?text=O',
      quantity: '1 pcs',
      saveAmount: 'Save ₹4',
      options: '2 Options'
    },
    {
      id: 4,
      name: 'Mango',
      price: '₹15',
      originalPrice: '₹20',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FFD700/FFFFFF?text=M',
      quantity: '1 pcs',
      saveAmount: 'Save ₹5',
      options: '2 Options'
    },
    {
      id: 5,
      name: 'Strawberry',
      price: '₹20',
      originalPrice: '₹25',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FF69B4/FFFFFF?text=S',
      quantity: '1 pcs',
      saveAmount: 'Save ₹5',
      options: '2 Options'
    },
    {
      id: 6,
      name: 'Kiwi',
      price: '₹18',
      originalPrice: '₹22',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/4ECDC4/FFFFFF?text=K',
      quantity: '1 pcs',
      saveAmount: 'Save ₹4',
      options: '2 Options'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* ========================================
          SEARCH HEADER
          ======================================== */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#a2a2a2" />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search for area, street name...."
            placeholderTextColor="#a2a2a2"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <View style={styles.mainContent}>
        {/* ========================================
            SIDEBAR - CATEGORY FILTERS
            ======================================== */}
        <View style={styles.sidebar}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sidebarContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.name && styles.categoryItemActive
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                {selectedCategory === category.name && (
                  <View style={styles.activeIndicator} />
                )}
                <View style={styles.categoryContent}>
                  <View style={styles.categoryImageContainer}>
                    <Image source={{ uri: category.image }} style={styles.categoryImage} />
                  </View>
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.name && styles.categoryTextActive
                  ]}>
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ========================================
            PRODUCTS GRID
            ======================================== */}
        <View style={styles.productsContainer}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsContent}
          >
            <View style={styles.productsGrid}>
              {products.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  {/* Product Image Container */}
                  <View style={styles.productImageContainer}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.discountTag}>
                      <Text style={styles.discountText}>{product.discount}</Text>
                    </View>
                  </View>

                  {/* Add Button */}
                  <View style={styles.addButton}>
                    <Text style={styles.addButtonText}>ADD</Text>
                    <View style={styles.optionsLine} />
                    <Text style={styles.optionsText}>{product.options}</Text>
                  </View>

                  {/* Favorite Button */}
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={20} color="#000000" />
                  </TouchableOpacity>

                  {/* Product Info */}
                  <View style={styles.productInfo}>
                    {/* Price Section */}
                    <View style={styles.priceSection}>
                      <Text style={styles.currentPrice}>{product.price}</Text>
                      <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                      <Text style={styles.saveAmount}>{product.saveAmount}</Text>
                    </View>

                    {/* Quantity */}
                    <Text style={styles.quantityText}>{product.quantity}</Text>

                    {/* Product Name */}
                    <Text style={styles.productName}>{product.name}</Text>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={11} color="#FFD700" />
                      <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#cccbcb',
    marginRight: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
  },
  filterButton: {
    padding: 5,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
  },
  sidebar: {
    width: 75,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#c4c4c4',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: 3,
  },
  sidebarContent: {
    paddingVertical: 10,
  },
  categoryItem: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  categoryItemActive: {
    backgroundColor: '#f6f6f6',
    borderRadius: 6,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3.5,
    backgroundColor: '#0ca201',
  },
  categoryContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  categoryImageContainer: {
    width: 52,
    height: 52,
    backgroundColor: '#ffffff',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryImage: {
    width: 29,
    height: 27,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(28, 28, 28, 0.8)',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#0a0b0a',
    fontWeight: '600',
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  productsContent: {
    paddingBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  productImageContainer: {
    backgroundColor: '#f6f6f6',
    borderRadius: 15,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: 138,
    height: 112,
    borderRadius: 15,
  },
  discountTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#0ca201',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 83,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3cb433',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 40,
    elevation: 2,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  optionsLine: {
    width: 55,
    height: 1,
    backgroundColor: '#ffffff',
    marginVertical: 2,
  },
  optionsText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000000',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ececec',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 40,
    elevation: 2,
  },
  productInfo: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 5,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  currentPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  originalPrice: {
    fontSize: 11,
    fontWeight: '500',
    color: '#808080',
    textDecorationLine: 'line-through',
  },
  saveAmount: {
    fontSize: 9,
    fontWeight: '500',
    color: '#ff0000',
  },
  quantityText: {
    fontSize: 12,
    color: '#000000',
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 3,
  },
  ratingText: {
    fontSize: 11,
    color: '#000000',
  },
}); 