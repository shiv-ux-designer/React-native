import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen() {
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const insets = useSafeAreaInsets();
  
  // Move animated values outside of render cycle
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const popupAnimation = React.useRef(new Animated.Value(0)).current;
  const floatingButtonAnimation = React.useRef(new Animated.Value(0)).current;
  const basketAnimation = React.useRef(new Animated.Value(0)).current;

  // ========================================
  // PAN RESPONDER FOR DRAG TO CLOSE
  // ========================================
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 10;
      },
      onPanResponderGrant: () => {
        // Start tracking the gesture
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          basketAnimation.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          // Close the basket
          Animated.spring(basketAnimation, {
            toValue: height,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start(() => {
            setIsBasketVisible(false);
          });
        } else {
          // Snap back to open position
          Animated.spring(basketAnimation, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;
  
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
  // CLEANUP ANIMATIONS ON UNMOUNT
  // ========================================
  useEffect(() => {
    return () => {
      // Cleanup animations to prevent memory leaks
      scrollY.stopAnimation();
      popupAnimation.stopAnimation();
      floatingButtonAnimation.stopAnimation();
      basketAnimation.stopAnimation();
    };
  }, [scrollY, popupAnimation, floatingButtonAnimation, basketAnimation]);

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
  // POPUP HANDLERS
  // ========================================
  const openPopup = (product: string) => {
    setSelectedProduct(product);
    setIsPopupVisible(true);
    Animated.timing(popupAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closePopup = () => {
    Animated.timing(popupAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsPopupVisible(false);
      setSelectedProduct(null);
    });
  };

  // ========================================
  // CART MANAGEMENT FUNCTIONS
  // ========================================
  const addToCart = (productName: string) => {
    setCartItems(prev => ({
      ...prev,
      [productName]: (prev[productName] || 0) + 1
    }));
    closePopup();
  };

  const removeFromCart = (productName: string) => {
    setCartItems(prev => {
      const newItems = { ...prev };
      if (newItems[productName] > 1) {
        newItems[productName] -= 1;
      } else {
        delete newItems[productName];
      }
      return newItems;
    });
  };

  const getQuantity = (productName: string) => {
    return cartItems[productName] || 0;
  };

  // ========================================
  // CART ITEMS COUNT
  // ========================================
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  // ========================================
  // FLOATING BUTTON ANIMATION EFFECT
  // ========================================
  // Animate floating button when cart items change
  useEffect(() => {
    const totalItems = getTotalCartItems();
    if (totalItems > 0) {
      Animated.spring(floatingButtonAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(floatingButtonAnimation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [cartItems, floatingButtonAnimation]);

  // ========================================
  // FLOATING BUTTON HANDLER
  // ========================================
  const handleViewBasket = () => {
    setIsBasketVisible(true);
    Animated.spring(basketAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const closeBasket = () => {
    Animated.spring(basketAnimation, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      setIsBasketVisible(false);
    });
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
            router.push('/location');
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
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => router.push('/search')}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={20} color="#a2a2a2" />
          <Text style={styles.searchPlaceholder}>{searchTerms[currentSearchIndex]}</Text>
        </TouchableOpacity>
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
              <TouchableOpacity 
                key={index} 
                style={styles.categoryItem}
                onPress={() => router.push('/category')}
              >
                <View style={styles.categoryIcon}>
                  <Ionicons name="leaf" size={24} color="#0ca201" />
                </View>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.categoryRow}>
            {['Groceries', 'Egg Meat & Fish', 'Dairy'].map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryItem}
                onPress={() => router.push('/category')}
              >
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
            <TouchableOpacity 
              key={index} 
              style={styles.productCard}
              onPress={() => router.push({
                pathname: '/product-details',
                params: { productName: product, productImage: 'leaf' }
              })}
            >
              <View style={styles.productImageContainer}>
                <View style={styles.productImage}>
                  <Ionicons name="leaf" size={40} color="#0ca201" />
                </View>
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>10%</Text>
                  <Text style={styles.discountOffText}>Off</Text>
                </View>
              </View>
              
              {/* Quantity Controls or Add Button */}
              {getQuantity(product) > 0 ? (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      removeFromCart(product);
                    }}
                  >
                    <Ionicons 
                      name={getQuantity(product) === 1 ? "trash" : "remove"} 
                      size={18} 
                      color="#000000" 
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{getQuantity(product)}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Ionicons name="add" size={18} color="#000000" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.addButtonNew}
                  onPress={(e) => {
                    e.stopPropagation();
                    openPopup(product);
                  }}
                >
                  <View style={styles.addButtonContent}>
                    <Text style={styles.addButtonText}>ADD</Text>
                    <Text style={styles.addButtonSubtext}>2 Options</Text>
                  </View>
                </TouchableOpacity>
              )}
              
              <View style={styles.productInfo}>
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>₹10</Text>
                  <Text style={styles.originalPrice}>₹15</Text>
                  <Text style={styles.saveText}>Save ₹5</Text>
                </View>
                <Text style={styles.productQuantity}>1 pcs</Text>
                <Text style={styles.productName}>{product}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#ffd500" />
                  <Text style={styles.ratingText}>4.8 (1.k)</Text>
                </View>
              </View>
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
            <TouchableOpacity 
              key={index} 
              style={styles.productCard}
              onPress={() => router.push({
                pathname: '/product-details',
                params: { productName: product, productImage: 'leaf' }
              })}
            >
              <View style={styles.productImageContainer}>
                <View style={styles.productImage}>
                  <Ionicons name="leaf" size={40} color="#0ca201" />
                </View>
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>10%</Text>
                  <Text style={styles.discountOffText}>Off</Text>
                </View>
              </View>
              
              {/* Quantity Controls or Add Button */}
              {getQuantity(product) > 0 ? (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      removeFromCart(product);
                    }}
                  >
                    <Ionicons 
                      name={getQuantity(product) === 1 ? "trash" : "remove"} 
                      size={18} 
                      color="#000000" 
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{getQuantity(product)}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Ionicons name="add" size={18} color="#000000" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.addButtonNew}
                  onPress={(e) => {
                    e.stopPropagation();
                    openPopup(product);
                  }}
                >
                  <View style={styles.addButtonContent}>
                    <Text style={styles.addButtonText}>ADD</Text>
                    <Text style={styles.addButtonSubtext}>2 Options</Text>
                  </View>
                </TouchableOpacity>
              )}
              
              <View style={styles.productInfo}>
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>₹10</Text>
                  <Text style={styles.originalPrice}>₹15</Text>
                  <Text style={styles.saveText}>Save ₹5</Text>
                </View>
                <Text style={styles.productQuantity}>1 pcs</Text>
                <Text style={styles.productName}>{product}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#ffd500" />
                  <Text style={styles.ratingText}>4.8 (1.k)</Text>
                </View>
              </View>
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
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/favourites')}
        >
          <Ionicons name="heart" size={26} color="#000000" />
          <Text style={styles.navText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/reorder')}
        >
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
      </Animated.View>

      {/* ========================================
          PRODUCT POPUP MODAL
          ======================================== */}
      {isPopupVisible && (
        <Animated.View 
          style={[
            styles.popupOverlay,
            {
              opacity: popupAnimation,
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.popupBackdrop}
            onPress={closePopup}
            activeOpacity={1}
          />
          <Animated.View 
            style={[
              styles.popupContainer,
              {
                transform: [{
                  translateY: popupAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, 0],
                  })
                }]
              }
            ]}
          >
            {/* Popup Header */}
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>{selectedProduct}</Text>
              <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Select Unit Section */}
            <View style={styles.selectUnitSection}>
              <Text style={styles.selectUnitText}>Select Unit</Text>
            </View>

            {/* Product Options */}
            <View style={styles.productOptionsContainer}>
              {/* Option 1 */}
              <View style={styles.productOption}>
                <View style={styles.optionImageContainer}>
                  <View style={styles.optionImage}>
                    <Ionicons name="leaf" size={30} color="#0ca201" />
                  </View>
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>bunch of banana</Text>
                  <Text style={styles.optionQuantity}>Qty: 250g</Text>
                  <Text style={styles.optionPrice}>₹3.45</Text>
                </View>
                <TouchableOpacity 
                  style={styles.optionAddButton}
                  onPress={() => addToCart(selectedProduct || '')}
                >
                  <Text style={styles.optionAddText}>ADD</Text>
                </TouchableOpacity>
              </View>

              {/* Option 2 */}
              <View style={styles.productOption}>
                <View style={styles.optionImageContainer}>
                  <View style={styles.optionImage}>
                    <Ionicons name="leaf" size={30} color="#0ca201" />
                  </View>
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>bunch of banana</Text>
                  <Text style={styles.optionQuantity}>Qty: 500g</Text>
                  <Text style={styles.optionPrice}>₹6.90</Text>
                </View>
                <TouchableOpacity 
                  style={styles.optionAddButton}
                  onPress={() => addToCart(selectedProduct || '')}
                >
                  <Text style={styles.optionAddText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Done Button */}
            <TouchableOpacity style={styles.doneButton} onPress={closePopup}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}

      {/* ========================================
          BASKET MODAL
          ======================================== */}
      {isBasketVisible && (
        <Animated.View 
          style={[
            styles.basketOverlay,
            {
              opacity: basketAnimation,
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.basketBackdrop}
            onPress={closeBasket}
            activeOpacity={1}
          />
          <Animated.View 
            style={[
              styles.basketContainer,
              {
                transform: [{
                  translateY: basketAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  })
                }]
              }
            ]}
            {...panResponder.panHandlers}
          >
            {/* Basket Header */}
            <View style={styles.basketHeader}>
              <View style={styles.dragIndicator} />
              <View style={styles.basketHeaderContent}>
                <Text style={styles.basketTitle}>Your Basket</Text>
                <Text style={styles.basketSubtitle}>{getTotalCartItems()} items</Text>
              </View>
              <TouchableOpacity onPress={closeBasket} style={styles.basketCloseButton}>
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Basket Items */}
            <ScrollView style={styles.basketItemsContainer} showsVerticalScrollIndicator={false}>
              {Object.entries(cartItems).length > 0 ? (
                Object.entries(cartItems).map(([productName, quantity]) => (
                  <View key={productName} style={styles.basketItem}>
                    <View style={styles.basketItemImage}>
                      <Ionicons name="leaf" size={30} color="#0ca201" />
                    </View>
                    <View style={styles.basketItemInfo}>
                      <Text style={styles.basketItemName}>{productName}</Text>
                      <Text style={styles.basketItemPrice}>₹{(quantity * 10).toFixed(2)}</Text>
                    </View>
                    <View style={styles.basketItemControls}>
                      <TouchableOpacity 
                        style={styles.basketItemButton}
                        onPress={() => removeFromCart(productName)}
                      >
                        <Ionicons 
                          name={quantity === 1 ? "trash" : "remove"} 
                          size={18} 
                          color="#000000" 
                        />
                      </TouchableOpacity>
                      <Text style={styles.basketItemQuantity}>{quantity}</Text>
                      <TouchableOpacity 
                        style={styles.basketItemButton}
                        onPress={() => addToCart(productName)}
                      >
                        <Ionicons name="add" size={18} color="#000000" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyBasket}>
                  <Ionicons name="basket-outline" size={60} color="#cccccc" />
                  <Text style={styles.emptyBasketText}>Your basket is empty</Text>
                </View>
              )}
            </ScrollView>

            {/* Basket Footer */}
            {Object.entries(cartItems).length > 0 && (
              <View style={styles.basketFooter}>
                <View style={styles.basketTotal}>
                  <Text style={styles.basketTotalLabel}>Total:</Text>
                  <Text style={styles.basketTotalAmount}>
                    ₹{(Object.entries(cartItems).reduce((total, [_, quantity]) => total + (quantity * 10), 0)).toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.proceedButton}
                  onPress={() => {
                    closeBasket();
                    router.push({
                      pathname: '/cart',
                      params: { cartItems: JSON.stringify(cartItems) }
                    });
                  }}
                >
                  <Text style={styles.proceedButtonText}>Go to Cart</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      )}

      {/* ========================================
          FLOATING VIEW BASKET BUTTON
          ======================================== */}
      {!isBasketVisible && (
        <Animated.View
          style={[
            styles.floatingButtonContainer,
            {
              opacity: floatingButtonAnimation,
              transform: [
                {
                  translateY: floatingButtonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
                {
                  scale: floatingButtonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
          pointerEvents={getTotalCartItems() > 0 ? 'auto' : 'none'}
        >
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleViewBasket}
          activeOpacity={0.8}
        >
          {/* Product Icons */}
          <View style={styles.floatingButtonIcons}>
            {Object.entries(cartItems).slice(0, 3).map(([productName, quantity], index) => (
              <View
                key={productName}
                style={[
                  styles.floatingButtonIcon,
                  {
                    marginRight: index === 2 ? 0 : -8,
                    zIndex: 3 - index,
                  },
                ]}
              >
                <Ionicons name="leaf" size={16} color="#0ca201" />
              </View>
            ))}
          </View>

          {/* Button Content */}
          <View style={styles.floatingButtonContent}>
            <Text style={styles.floatingButtonText}>View Basket</Text>
            <Ionicons name="chevron-forward" size={20} color="#ffffff" />
          </View>

          {/* Item Count Badge */}
          {getTotalCartItems() > 0 && (
            <View style={styles.floatingButtonBadge}>
              <Text style={styles.floatingButtonBadgeText}>{getTotalCartItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
      )}
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
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#a2a2a2',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
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
  // New styles for updated card design
  discountOffText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '400',
  },
  addButtonNew: {
    position: 'absolute',
    top: '50%',
    right: 11,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    transform: [{ translateY: -19 }], // Half of height to center
    boxShadow: '0px 7px 40px rgba(0, 0, 0, 0.05)',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#3cb433',
  },
  addButtonContent: {
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.26,
  },
  addButtonSubtext: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: 0.2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  originalPrice: {
    fontSize: 11,
    fontWeight: '500',
    color: '#808080',
    textDecorationLine: 'line-through',
  },
  saveText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#ff0000',
  },
  productQuantity: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 2,
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
  // Popup styles
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    justifyContent: 'flex-end',
  },
  popupBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popupContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    minHeight: 400,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f1b2a',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectUnitSection: {
    marginBottom: 20,
  },
  selectUnitText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#232f3e',
  },
  productOptionsContainer: {
    marginBottom: 30,
  },
  productOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f6f6f6',
  },
  optionImageContainer: {
    width: 114,
    height: 111,
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionImage: {
    width: 73,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionInfo: {
    flex: 1,
    justifyContent: 'space-between',
    height: 71,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  optionQuantity: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0a0b0a',
    lineHeight: 20,
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0a0b0a',
    lineHeight: 20,
  },
  optionAddButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#3cb433',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 5,
  },
  optionAddText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.26,
  },
  doneButton: {
    backgroundColor: '#0ca201',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  // Quantity control styles
  quantityContainer: {
    position: 'absolute',
    top: '50%',
    right: 11,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    transform: [{ translateY: -19 }],
    boxShadow: '0px 7px 40px rgba(0, 0, 0, 0.05)',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#4fb846',
  },
  quantityButton: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  // Floating button styles
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 120, // Positioned above the bottom navigation
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0ca201',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: 180,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  floatingButtonIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    marginRight: -8,
  },
  floatingButtonIconInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  floatingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  floatingButtonBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff0019',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  floatingButtonBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  // Basket modal styles
  basketOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    justifyContent: 'flex-end',
  },
  basketBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  basketContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    minHeight: 400,
  },
  basketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  basketHeaderContent: {
    flex: 1,
  },
  basketTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f1b2a',
    marginBottom: 5,
  },
  basketSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0a0b0a',
  },
  basketCloseButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basketItemsContainer: {
    maxHeight: height * 0.6, // Limit height to 60% of screen
    marginBottom: 20,
  },
  basketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  basketItemImage: {
    width: 50,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  basketItemInfo: {
    flex: 1,
    justifyContent: 'space-between',
    height: 50,
  },
  basketItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  basketItemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0ca201',
  },
  basketItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  basketItemButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ececec',
    borderRadius: 14,
  },
  basketItemQuantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  emptyBasket: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyBasketText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#808080',
    marginTop: 20,
  },
  basketFooter: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
  },
  basketTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  basketTotalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f1b2a',
  },
  basketTotalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0ca201',
  },
  proceedButton: {
    backgroundColor: '#0ca201',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#cccccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,
  },
}); 




















