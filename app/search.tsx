import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  // Sample search suggestions data
  const searchSuggestions = [
    { id: 1, name: 'Banana', image: 'https://via.placeholder.com/35x35/FFD700/FFFFFF?text=B' },
    { id: 2, name: 'Banana Stem', image: 'https://via.placeholder.com/35x35/4ECDC4/FFFFFF?text=BS' },
    { id: 3, name: 'Raw Banana', image: 'https://via.placeholder.com/35x35/FF6B6B/FFFFFF?text=RB' },
  ];

  // Sample search results data
  const searchResults = [
    { 
      id: 1, 
      name: 'Banana (6Pcs)', 
      price: '$7.05', 
      rating: '4.0 (200)', 
      image: 'https://via.placeholder.com/100x80/FFD700/FFFFFF?text=B',
      discount: '10% Off'
    },
    { 
      id: 2, 
      name: 'Banana Stem (1Pcs)', 
      price: '$7.05', 
      rating: '4.0 (200)', 
      image: 'https://via.placeholder.com/100x80/4ECDC4/FFFFFF?text=BS',
      discount: '10% Off'
    },
    { 
      id: 3, 
      name: 'Raw Banana', 
      price: '$7.05', 
      rating: '4.0 (200)', 
      image: 'https://via.placeholder.com/100x80/FF6B6B/FFFFFF?text=RB',
      discount: '10% Off'
    },
  ];

  // Sample recent searches data
  const recentSearches = [
    { id: 1, name: 'Banana', image: 'https://via.placeholder.com/35x35/FFD700/FFFFFF?text=B' },
    { id: 2, name: 'Kiwi', image: 'https://via.placeholder.com/35x35/4ECDC4/FFFFFF?text=K' },
    { id: 3, name: 'Dark Chilli', image: 'https://via.placeholder.com/35x35/FF6B6B/FFFFFF?text=C' },
    { id: 4, name: 'Tomatoes', image: 'https://via.placeholder.com/35x35/FF8E53/FFFFFF?text=T' },
    { id: 5, name: 'Capsicum', image: 'https://via.placeholder.com/35x35/4CAF50/FFFFFF?text=C' },
  ];

  // Sample discover products data
  const discoverProducts = [
    { id: 1, name: 'kolkata Magic', price: '$3.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF6B6B/FFFFFF?text=KM' },
    { id: 2, name: 'Kalojeera 100Gm', price: '$2.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/8B4513/FFFFFF?text=KJ' },
    { id: 3, name: 'Mango Kasundi', price: '$3.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FFD700/FFFFFF?text=MK' },
    { id: 4, name: 'Mususr Bari', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/DEB887/FFFFFF?text=MB' },
    { id: 5, name: 'Mukhorachok Jhal', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF4500/FFFFFF?text=MJ' },
    { id: 6, name: 'Mukhorachok', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF6347/FFFFFF?text=MC' },
    { id: 7, name: 'Tok Jhal Misty..', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/32CD32/FFFFFF?text=TJ' },
    { id: 8, name: 'Hangla Chao 6pcs', price: '$4.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF69B4/FFFFFF?text=HC' },
    { id: 9, name: 'Patali Gund 250g', price: '$3.45', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FFA500/FFFFFF?text=PG' },
    { id: 10, name: 'Amloki Gota 100g', price: '$2.89', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/228B22/FFFFFF?text=AG' },
  ];

  // Sample Bengali groceries data
  const bengaliGroceries = [
    { id: 1, name: 'Khukumuni Sindur', price: '$3.45', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF0000/FFFFFF?text=KS' },
    { id: 2, name: 'Khukumuni Alta', price: '$4.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF1493/FFFFFF?text=KA' },
    { id: 3, name: 'Apple', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF0000/FFFFFF?text=A' },
    { id: 4, name: 'Banana', price: '$3.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FFD700/FFFFFF?text=B' },
    { id: 5, name: 'Strawberry', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF69B4/FFFFFF?text=S' },
    { id: 6, name: 'Water lemon', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FFFF00/FFFFFF?text=WL' },
    { id: 7, name: 'Kiwi', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/4ECDC4/FFFFFF?text=K' },
    { id: 8, name: 'Red Apple', price: '$2.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF0000/FFFFFF?text=RA' },
    { id: 9, name: 'Orange', price: '$3.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FFA500/FFFFFF?text=O' },
    { id: 10, name: 'Papaya', price: '$2.89', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF6347/FFFFFF?text=P' },
  ];

  // Sample Bengali special data
  const bengaliSpecial = [
    { id: 1, name: 'Laal Saag', price: '$3.45', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FF0000/FFFFFF?text=LS' },
    { id: 2, name: 'Ol Gobi', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FFFFFF/000000?text=OG' },
    { id: 3, name: 'Gondhoraj Nimbu', price: '$2.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FFFF00/000000?text=GN' },
    { id: 4, name: 'Yam', price: '$3.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/8B4513/FFFFFF?text=Y' },
    { id: 5, name: 'Snake Gourd', price: '$4.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/228B22/FFFFFF?text=SG' },
    { id: 6, name: 'Kumro', price: '$1.99', rating: '4.8 (287)', image: 'https://via.placeholder.com/100x130/FFA500/FFFFFF?text=K' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* ========================================
          HEADER SECTION
          ======================================== */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={24} color="#000000" />
          <Text style={styles.locationText}>61 Hopper street..</Text>
          <Ionicons name="chevron-down" size={20} color="#000000" />
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* ========================================
          SEARCH BAR
          ======================================== */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#a2a2a2" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchText('')}
          >
            <Ionicons name="close" size={20} color="#a2a2a2" />
          </TouchableOpacity>
        </View>
        
        {/* ========================================
            SEARCH SUGGESTIONS
            ======================================== */}
        {searchText.length > 0 && (
          <View style={styles.searchSuggestionsContainer}>
            {searchSuggestions.map((suggestion) => (
              <TouchableOpacity 
                key={suggestion.id} 
                style={styles.searchSuggestionItem}
                onPress={() => setSearchText(suggestion.name)}
              >
                <View style={styles.suggestionImageContainer}>
                  <Image source={{ uri: suggestion.image }} style={styles.suggestionImage} />
                </View>
                <Text style={styles.suggestionText}>{suggestion.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {searchText.length > 0 ? (
          // ========================================
          // SEARCH RESULTS SECTION
          // ========================================
          <>
            <View style={styles.searchResultsHeader}>
              <Text style={styles.searchResultsTitle}>Showing Result For "{searchText}"</Text>
            </View>
            
            <View style={styles.searchResultsContainer}>
              {searchResults.map((result) => (
                <View key={result.id} style={styles.searchResultCard}>
                  <View style={styles.resultImageContainer}>
                    <Image source={{ uri: result.image }} style={styles.resultImage} />
                    <View style={styles.discountTag}>
                      <Text style={styles.discountText}>{result.discount}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName}>{result.name}</Text>
                    <Text style={styles.resultPrice}>{result.price}</Text>
                    <View style={styles.resultRating}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.ratingText}>{result.rating}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={24} color="#000000" />
                  </TouchableOpacity>
                  
                  <View style={styles.addButton}>
                    <Ionicons name="remove" size={18} color="#000000" />
                    <Text style={styles.quantityText}>1</Text>
                    <Ionicons name="add" size={18} color="#000000" />
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          // ========================================
          // RECENT SEARCHES SECTION
          // ========================================
          <>
            <View style={styles.sectionHeader}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>

        <View style={styles.recentSearchesContainer}>
          <View style={styles.searchRow}>
            {recentSearches.slice(0, 3).map((item) => (
              <TouchableOpacity key={item.id} style={styles.searchItem}>
                <View style={styles.searchItemImage}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                </View>
                <Text style={styles.searchItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.searchRow}>
            {recentSearches.slice(3, 5).map((item) => (
              <TouchableOpacity key={item.id} style={styles.searchItem}>
                <View style={styles.searchItemImage}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                </View>
                <Text style={styles.searchItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ========================================
            DISCOVER NEW FINDS SECTION
            ======================================== */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Discover New Finds</Text>
          <View style={styles.categoryCards}>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryImage}>
                <Text style={styles.categoryImageText}>BN</Text>
              </View>
              <Text style={styles.categoryCardText}>Bengali home needs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryImage}>
                <Text style={styles.categoryImageText}>BV</Text>
              </View>
              <Text style={styles.categoryCardText}>Bengali Veggies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryImage}>
                <Text style={styles.categoryImageText}>MM</Text>
              </View>
              <Text style={styles.categoryCardText}>Masala & More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========================================
            BENGALI GROCERIES SECTION
            ======================================== */}
        <View style={styles.productSection}>
          <Text style={styles.sectionTitle}>Bengali Groceries</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {bengaliGroceries.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
                <View style={styles.addButton}>
                  <Ionicons name="remove" size={18} color="#000000" />
                  <Text style={styles.quantityText}>1</Text>
                  <Ionicons name="add" size={18} color="#000000" />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ========================================
            BENGALI SPECIAL SECTION
            ======================================== */}
        <View style={styles.productSection}>
          <Text style={styles.sectionTitle}>Bengali Special</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {bengaliSpecial.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
                <View style={styles.addButton}>
                  <Ionicons name="remove" size={18} color="#000000" />
                  <Text style={styles.quantityText}>1</Text>
                  <Ionicons name="add" size={18} color="#000000" />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

                 {/* ========================================
             VIEW ALL PRODUCTS SECTIONS
             ======================================== */}
         <View style={styles.viewAllContainer}>
           <View style={styles.productIcons}>
             <View style={styles.productIcon}>
               <Text style={styles.iconText}>P</Text>
             </View>
             <View style={styles.productIcon}>
               <Text style={styles.iconText}>O</Text>
             </View>
             <View style={styles.productIcon}>
               <Text style={styles.iconText}>G</Text>
             </View>
             <View style={styles.productIcon}>
               <Text style={styles.iconText}>S</Text>
             </View>
           </View>
           <View style={styles.viewAllContent}>
             <Text style={styles.viewAllText}>View all products</Text>
             <Ionicons name="chevron-forward" size={20} color="#0a0b0a" />
           </View>
         </View>
         </>
       )}
       </ScrollView>
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  clearButton: {
    padding: 5,
  },
  searchSuggestionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.83)',
    borderRadius: 8,
    marginTop: 5,
  },
  searchSuggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    gap: 10,
    marginBottom: 2,
  },
  suggestionImageContainer: {
    width: 35,
    height: 35,
    backgroundColor: '#f6f6f6',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionImage: {
    width: 30,
    height: 25,
    borderRadius: 5,
  },
  suggestionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000716',
  },
  searchResultsHeader: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  searchResultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  searchResultsContainer: {
    paddingHorizontal: 15,
    gap: 10,
  },
  searchResultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#f6f6f6',
  },
  resultImageContainer: {
    width: 114,
    height: 121,
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  resultImage: {
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
  resultInfo: {
    flex: 1,
    gap: 5,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ca201',
  },
  recentSearchesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.83)',
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 11,
    marginBottom: 10,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    gap: 10,
  },
  searchItemImage: {
    width: 35,
    height: 35,
    backgroundColor: '#f6f6f6',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 30,
    height: 25,
    borderRadius: 5,
  },
  searchItemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000716',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  categoryCards: {
    flexDirection: 'row',
    gap: 15,
  },
  categoryCard: {
    alignItems: 'center',
    width: 123,
  },
  categoryImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryImageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  categoryCardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0a0b0a',
    textAlign: 'center',
  },
  productSection: {
    marginBottom: 20,
  },
  productsScroll: {
    paddingHorizontal: 0,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
    marginRight: 10,
    width: 170,
    height: 245,
    position: 'relative',
  },
  productImageContainer: {
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    height: 147,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 130,
    borderRadius: 8,
  },
  productInfo: {
    paddingHorizontal: 8,
    gap: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
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
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
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
  viewAllContainer: {
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  productIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#f6f6f6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  iconText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  viewAllContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a0b0a',
  },
}); 