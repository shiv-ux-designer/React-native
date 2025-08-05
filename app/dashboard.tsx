import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen() {
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const scrollY = new Animated.Value(0);
  const insets = useSafeAreaInsets();
  
  // ========================================
  // SEARCH TERMS ROTATION
  // ========================================
  const searchTerms = [
    'Pui Saag',
    'Lemon',
    'Tomato',
    'Potato',
    'Masala',
    'Ghee',
    'Chicken',
    'Mutton',
    'Lauki',
    'Coriander'
  ];

  // ========================================
  // PLACEHOLDER ROTATION ANIMATION
  // ========================================
  // Rotate search terms every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSearchIndex((prevIndex) => 
        prevIndex === searchTerms.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ========================================
  // SEARCH HANDLER
  // ========================================
  const handleSearch = () => {
    // Handle search functionality here
    console.log('Searching for:', searchText);
    setSearchText('');
    setIsSearchFocused(false);
  };

  // ========================================
  // ANIMATED VALUES FOR STICKY HEADER
  // ========================================
  // Animated values for sticky header
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150, 200],
    outputRange: [1, 1, 0.5, 0], // Stay fully visible until 150px scroll
    extrapolate: 'clamp',
  });

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  const stickySearchBarOpacity = scrollY.interpolate({
    inputRange: [50, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickySearchBarTranslateY = scrollY.interpolate({
    inputRange: [50, 100],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  // ========================================
  // FOOTER NAVIGATION ANIMATION
  // ========================================
  const footerTranslateY = scrollY.interpolate({
    inputRange: [0, 10, 30],
    outputRange: [0, 0, 120], // Slide down completely with white container
    extrapolate: 'clamp',
  });

  const footerOpacity = scrollY.interpolate({
    inputRange: [0, 10, 30],
    outputRange: [1, 1, 0], // Fade out completely including white container
    extrapolate: 'clamp',
  });

  // ========================================
  // SCROLL DIRECTION HANDLER
  // ========================================
  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    
    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setIsScrollingUp(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      setIsScrollingUp(true);
      setHasScrolledUp(true); // Mark that user has scrolled up
    }
    
    setLastScrollY(currentScrollY);
  };

  return (
    <View style={[styles.container, { paddingBottom: isScrollingUp ? 20 : 120 }]}>
      {/* ========================================
          PROPER STATUS BAR
          ======================================== */}
      <StatusBar style="dark" />

      {/* ========================================
          HEADER SECTION
          ======================================== */}
      <Animated.View style={[styles.header, { 
        opacity: 1, // Always visible - removed scroll animation
        paddingTop: insets.top + 25, // Increased from 15 to 25
        paddingBottom: 2, // Increased from 15 to 25 for more space
        backgroundColor: '#ffffff', // Restored proper background
      }]}>
        <TouchableOpacity 
          style={styles.locationContainer}
          onPress={() => {
            console.log('Location pressed');
            // Add your location selection logic here
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="location" size={20} color="#000000" />
          <Text style={styles.locationText}>61 Hopper street..</Text>
          <Ionicons name="chevron-down" size={20} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person" size={20} color="#000000" />
        </TouchableOpacity>
      </Animated.View>

      {/* ========================================
          SEARCH BAR SECTION
          ======================================== */}
      <Animated.View style={[
        styles.searchContainer,
        { 
          transform: [{ translateY: 0 }], // Always fixed - removed scroll animation
          marginTop: 10, // Changed from paddingTop to marginTop
        }
      ]} pointerEvents="auto">
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#a2a2a2" />
          <TextInput
            style={styles.searchInput}
            placeholder={searchText.length > 0 ? "" : `Search "${searchTerms[currentSearchIndex]}"`}
            placeholderTextColor="#a2a2a2"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </Animated.View>

      {/* ========================================
          MAIN SCROLLABLE CONTENT
          ======================================== */}
      <Animated.ScrollView 
        style={[styles.scrollView, { paddingBottom: isScrollingUp ? 10 : 100 }]} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        onScrollBeginDrag={handleScroll}
        scrollEventThrottle={16}
      >
        {/* ========================================
            SLIDER SECTION
            ======================================== */}
        <View style={styles.sliderContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sliderScroll}>
            {/* ========================================
                SLIDER 1 - FRESH & HEALTHY
                ======================================== */}
            <View style={styles.sliderCard}>
              <View style={styles.sliderContent}>
                <View style={styles.sliderTextContainer}>
                  <Text style={styles.sliderTitle}>
                    Fresh & Healthy{' '}
                    <Text style={styles.highlightText}>Organic</Text>
                    {' '}Food
                  </Text>
                  <Text style={styles.sliderSubtitle}>
                    Free Delivery on Orders Over ₹100 PBEL City Only
                  </Text>
                  <TouchableOpacity style={styles.shopNowButton}>
                    <Text style={styles.shopNowText}>Shop Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* ========================================
                SLIDER 2 - DIRECT FROM FARMER
                ======================================== */}
            <View style={[styles.sliderCard, { backgroundColor: '#0ca201' }]}>
              <View style={styles.sliderContent}>
                <View style={styles.sliderTextContainer}>
                  <Text style={[styles.sliderTitle, { color: '#ffffff' }]}>
                    Direct From Farmer{'\n'}To Your Home
                  </Text>
                  <Text style={[styles.sliderSubtitle, { color: '#ffffff' }]}>
                    Special Product Deal Of The Month
                  </Text>
                  <TouchableOpacity style={[styles.shopNowButton, { backgroundColor: '#ffffff' }]}>
                    <Text style={[styles.shopNowText, { color: '#0a0b0a' }]}>Shop Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* ========================================
                SLIDER 3 - FREE SAME DAY DELIVERY
                ======================================== */}
            <View style={[styles.sliderCard, { backgroundColor: '#ffdb24' }]}>
              <View style={styles.sliderContent}>
                <View style={styles.sliderTextContainer}>
                  <Text style={[styles.sliderTitle, { color: '#0a0b0a' }]}>
                    Get Free Same Day Delivery
                  </Text>
                  <Text style={[styles.sliderSubtitle, { color: '#0a0b0a' }]}>
                    On orders above ₹300
                  </Text>
                  <TouchableOpacity style={[styles.shopNowButton, { backgroundColor: '#ffffff' }]}>
                    <Text style={[styles.shopNowText, { color: '#0a0b0a' }]}>Shop Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ========================================
            CATEGORIES SECTION
            ======================================== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryRow}>
            {['Bengali Special', 'Fresh Vegetables', 'Fresh Fruits'].map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Ionicons name="leaf" size={24} color="#0ca201" />
                </View>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.categoryRow}>
            {['Groceries', 'Egg Meat & Fish', 'Dairy'].map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Ionicons name="leaf" size={24} color="#0ca201" />
                </View>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ========================================
            FRUITS SECTION
            ======================================== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fruits</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {['Banana', 'Apple', 'Orange', 'Strawberry', 'Kiwi', 'Watermelon'].map((product, index) => (
            <TouchableOpacity key={index} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <View style={styles.productImage}>
                  <Ionicons name="leaf" size={40} color="#0ca201" />
                </View>
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>10% Off</Text>
                </View>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#ffd500" />
                  <Text style={styles.ratingText}>4.8 (287)</Text>
                </View>
                <Text style={styles.productPrice}>$3.99</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color="#000000" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ========================================
            VIEW ALL PRODUCTS SECTION
            ======================================== */}
        <TouchableOpacity style={styles.viewAllContainer}>
          <View style={styles.viewAllContent}>
            <View style={styles.productIcons}>
              {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={styles.productIcon}>
                  <Ionicons name="leaf" size={20} color="#0ca201" />
                </View>
              ))}
            </View>
            <View style={styles.viewAllTextContainer}>
              <Text style={styles.viewAllText}>View all products</Text>
              <Ionicons name="chevron-forward" size={16} color="#0a0b0a" />
            </View>
          </View>
        </TouchableOpacity>

        {/* ========================================
            VEGGIES SECTION
            ======================================== */}
        <View style={[styles.sectionHeader, { paddingVertical: 0, height: 30 }]}>
          <Text style={styles.sectionTitle}>Veggies</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {['Tomatoes', 'Dark Chilli', 'Capsicum', 'Cauliflower', 'Carrot', 'Cucumber', 'Lady Finger', 'Ginger'].map((product, index) => (
            <TouchableOpacity key={index} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <View style={styles.productImage}>
                  <Ionicons name="leaf" size={40} color="#0ca201" />
                </View>
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>10% Off</Text>
                </View>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#ffd500" />
                  <Text style={styles.ratingText}>4.8 (287)</Text>
                </View>
                <Text style={styles.productPrice}>$3.45</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color="#000000" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ========================================
            VIEW ALL PRODUCTS SECTION (FOR VEGGIES)
            ======================================== */}
        <TouchableOpacity style={styles.viewAllContainer}>
          <View style={styles.viewAllContent}>
            <View style={styles.productIcons}>
              {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={styles.productIcon}>
                  <Ionicons name="leaf" size={20} color="#0ca201" />
                </View>
              ))}
            </View>
            <View style={styles.viewAllTextContainer}>
              <Text style={styles.viewAllText}>View all products</Text>
              <Ionicons name="chevron-forward" size={16} color="#0a0b0a" />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.ScrollView>

      {/* ========================================
          BOTTOM NAVIGATION
          ======================================== */}
      <Animated.View style={[styles.bottomNavigation, { 
        paddingBottom: Math.max(insets.bottom, 20), // Increased minimum padding
        height: 70 + Math.max(insets.bottom, 20), // Reduced height to match margin line
        bottom: 5, // Move footer up slightly
        transform: [{ translateY: isScrollingUp ? 120 : 0 }],
        opacity: isScrollingUp ? 0 : 1,
      }]}>
        <TouchableOpacity style={[styles.navItem, { 
          backgroundColor: 'rgba(12, 162, 1, 0.1)',
        }]}>
          <Ionicons name="home" size={26} color="#0ca201" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={26} color="#000000" />
          <Text style={styles.navText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="refresh" size={26} color="#000000" />
          <Text style={styles.navText}>Reorders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="menu" size={26} color="#000000" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 0, // Remove top padding to fix spacing
    paddingBottom: 120, // Add bottom padding to account for footer
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 0, // Removed vertical padding to fix spacing
    height: 80, // Increased from 73
    zIndex: 20, // Increased from 5 to ensure it's above search bar
    backgroundColor: '#ffffff', // Added to ensure background
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1, // Added to ensure it takes available space
    height: 50, // Added explicit height
    zIndex: 10, // Added to ensure it's above search bar
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600', // Increased from 500
    color: '#000000',
  },
  profileButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0, // Removed bottom padding
    paddingTop: 5, // Reduced top padding
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 55,
    gap: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  stickySearchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10, // Reduced from 15
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  stickySearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    gap: 10,
    marginBottom: 10,
  },
  stickySearchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80, // Reduced to eliminate white space above footer
  },
  sliderContainer: {
    paddingVertical: 10, // Reduced from 20
  },
  sliderScroll: {
    paddingHorizontal: 15,
  },
  sliderCard: {
    width: 350,
    height: 200,
    backgroundColor: '#d7ffd4',
    borderRadius: 10,
    marginRight: 15,
    padding: 20,
    justifyContent: 'center',
  },
  sliderContent: {
    flex: 1,
  },
  sliderTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  highlightText: {
    color: '#0ca201',
  },
  sliderSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#0ca201',
    marginBottom: 15,
  },
  shopNowButton: {
    backgroundColor: '#0ca201',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10, // Reduced from 20
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
  },
  categoryIcon: {
    width: 71,
    height: 71,
    backgroundColor: '#f6f6f6',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0a0b0a',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Changed from space-between to flex-start
    alignItems: 'center',
    paddingHorizontal: 15, // Restored padding since it's now outside categoriesContainer
    paddingVertical: 5, // Reduced to eliminate spacing
    height: 40, // Reduced height to eliminate spacing
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20, // Increased from 16 to 20
    fontWeight: '600',
    color: '#0a0b0a',
  },
  productsScroll: {
    paddingHorizontal: 15,
  },
  productCard: {
    width: 170,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
    marginRight: 10,
    marginBottom: 5, // Added to ensure no bottom margin
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Fixed for web
    elevation: 3, // Keep for Android
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 147,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountTag: {
    position: 'absolute',
    top: -6,
    left: -5,
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
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    position: 'absolute',
    top: 11,
    right: 13,
    width: 38,
    height: 38,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Fixed for web
    elevation: 3, // Keep for Android
  },
  viewAllContainer: {
    marginHorizontal: 15,
    marginVertical: 10, // Removed spacing to match Figma design
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 12,
    height: 60,
  },
  viewAllContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  viewAllTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a0b0a',
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
    height: 60, // Reduced to stop at margin line
    paddingBottom: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center', // Changed back to center for proper spacing
    width: 75, // Increased from 55 to make background wider
    height: 65, // Decreased from 65
    borderRadius: 20,
    paddingVertical: 5, // Restored padding for proper spacing
  },
  navText: {
    fontSize: 12, // Increased font size
    fontWeight: '600',
    color: '#000000',
    marginTop: 3, // Restored to proper spacing
  },
}); 