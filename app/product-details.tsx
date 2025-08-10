import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProductUnit {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  isOutOfStock: boolean;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
}

export default function ProductDetailsScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ productName?: string; productImage?: string }>();
  const productName = params.productName || 'Product';
  const productImage = params.productImage || 'leaf';
  
  const [selectedUnit, setSelectedUnit] = useState<string>('500g');
  const [quantity, setQuantity] = useState(1);
  const [showDetailedView, setShowDetailedView] = useState(false);

  const productUnits: ProductUnit[] = [
    {
      id: '1',
      name: '250g',
      price: 3.05,
      originalPrice: 6.10,
      discount: 50,
      isOutOfStock: true,
    },
    {
      id: '2',
      name: '500g',
      price: 3.05,
      originalPrice: 6.10,
      discount: 50,
      isOutOfStock: false,
    },
    {
      id: '3',
      name: '1kg',
      price: 4.57,
      originalPrice: 9.14,
      discount: 50,
      isOutOfStock: false,
    },
  ];

  const relatedProducts: RelatedProduct[] = [
    {
      id: '1',
      name: 'Laal Saag',
      price: 3.45,
      rating: 4.8,
      reviewCount: 287,
      image: 'leaf',
    },
    {
      id: '2',
      name: 'Ol Gobi',
      price: 1.99,
      rating: 4.8,
      reviewCount: 287,
      image: 'leaf',
    },
    {
      id: '3',
      name: 'Gondhoraj Nimbu',
      price: 2.99,
      rating: 4.8,
      reviewCount: 287,
      image: 'leaf',
    },
    {
      id: '4',
      name: 'Yam',
      price: 3.99,
      rating: 4.8,
      reviewCount: 287,
      image: 'leaf',
    },
    {
      id: '5',
      name: 'Snake Gourd',
      price: 4.99,
      rating: 4.8,
      reviewCount: 287,
      image: 'leaf',
    },
    {
      id: '6',
      name: 'Kumro',
      price: 1.99,
      rating: 4.8,
      reviewCount: 287,
      image: 'leaf',
    },
  ];

  const handleAddToCart = () => {
    // Add to cart functionality
    console.log('Added to cart:', productName, selectedUnit, quantity);
    // Navigate back to dashboard after adding to cart
    router.back();
  };

  const handleViewProductDetails = () => {
    setShowDetailedView(true);
  };

  const handleBackToProduct = () => {
    setShowDetailedView(false);
  };

  if (showDetailedView) {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToProduct}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="heart-outline" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="share-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Product Image Background */}
          <View style={styles.imageBackground}>
            <View style={styles.pageIndicator}>
              <View style={[styles.pageDot, styles.pageDotActive]} />
              <View style={styles.pageDot} />
              <View style={styles.pageDot} />
            </View>
          </View>

          {/* Product Information Card */}
          <View style={styles.productCard}>
            <View style={styles.productHeader}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{productName} (Bengali Veggies)</Text>
                <Text style={styles.productQuantity}>Qty: 250 g</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>₹100</Text>
                  <Text style={styles.discount}>50% Off</Text>
                </View>
                <View style={styles.mrpContainer}>
                  <Text style={styles.mrpLabel}>MRP</Text>
                  <Text style={styles.mrpPrice}>₹150</Text>
                  <Text style={styles.taxInfo}>(Inclusive of all taxes)</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            </View>

            {/* Unit Selection */}
            <View style={styles.unitSection}>
              <Text style={styles.sectionTitle}>Select Units</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.unitScroll}>
                {productUnits.map((unit) => (
                  <TouchableOpacity
                    key={unit.id}
                    style={[
                      styles.unitCard,
                      selectedUnit === unit.name && styles.selectedUnitCard,
                      unit.isOutOfStock && styles.outOfStockCard
                    ]}
                    onPress={() => !unit.isOutOfStock && setSelectedUnit(unit.name)}
                    disabled={unit.isOutOfStock}
                  >
                    {unit.discount && !unit.isOutOfStock && (
                      <View style={styles.discountTag}>
                        <Text style={styles.discountTagText}>{unit.discount}% Off</Text>
                      </View>
                    )}
                    <Text style={styles.unitName}>{unit.name}</Text>
                    {unit.isOutOfStock ? (
                      <Text style={styles.outOfStockText}>Out of Stock</Text>
                    ) : (
                      <View style={styles.unitPriceContainer}>
                        <Text style={styles.unitPrice}>₹{unit.price}</Text>
                        <Text style={styles.unitOriginalPrice}>₹{unit.originalPrice}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* View Products Details Button */}
            <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewProductDetails}>
              <Text style={styles.viewDetailsText}>View Products Details</Text>
              <Ionicons name="chevron-forward" size={20} color="#0ca201" />
            </TouchableOpacity>

            {/* Features Section */}
            <View style={styles.featuresSection}>
              <View style={styles.featureCard}>
                <Ionicons name="leaf" size={26} color="#000" />
                <Text style={styles.featureText}>Sourced{'\n'}Daily Fresh</Text>
              </View>
              <View style={styles.featureCard}>
                <Ionicons name="checkmark-circle" size={26} color="#000" />
                <Text style={styles.featureText}>Quality{'\n'}Assured</Text>
              </View>
              <View style={styles.featureCard}>
                <Ionicons name="bag-check" size={26} color="#000" />
                <Text style={styles.featureText}>Secure{'\n'}Payment</Text>
              </View>
              <View style={styles.featureCard}>
                <Ionicons name="car" size={26} color="#000" />
                <Text style={styles.featureText}>Free{'\n'}Shipping</Text>
              </View>
            </View>

            {/* Product Details */}
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Units:</Text>
                <Text style={styles.detailValue}>250 g</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={styles.detailValue}>
                  Laal Saag is a popular Indian dish made with red spinach. It's a flavorful and nutritious dish, often served with Makki ki Roti (cornbread) or Jeera Rice.
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Health Benefits:</Text>
                <Text style={styles.detailValue}>Good For Health</Text>
              </View>
            </View>
          </View>

          {/* Related Products */}
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>Bengali Fresh Veggies</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
              {relatedProducts.map((product) => (
                <View key={product.id} style={styles.relatedCard}>
                  <View style={styles.relatedImageContainer}>
                    <Ionicons name={product.image as any} size={60} color="#ccc" />
                  </View>
                  <Text style={styles.relatedProductName}>{product.name}</Text>
                  <View style={styles.relatedRating}>
                    <Ionicons name="star" size={18} color="#FFD700" />
                    <Text style={styles.relatedRatingText}>{product.rating} ({product.reviewCount})</Text>
                  </View>
                  <Text style={styles.relatedPrice}>₹{product.price}</Text>
                  <View style={styles.relatedQuantityContainer}>
                    <TouchableOpacity style={styles.relatedQuantityButton}>
                      <Ionicons name="remove" size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.relatedQuantity}>1</Text>
                    <TouchableOpacity style={styles.relatedQuantityButton}>
                      <Ionicons name="add" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* View All Products */}
          <View style={styles.viewAllContainer}>
            <View style={styles.viewAllContent}>
              <View style={styles.viewAllIcons}>
                {relatedProducts.slice(0, 4).map((product, index) => (
                  <View key={index} style={styles.viewAllIcon}>
                    <Ionicons name={product.image as any} size={33} color="#ccc" />
                  </View>
                ))}
              </View>
              <View style={styles.viewAllTextContainer}>
                <Text style={styles.viewAllText}>View all products</Text>
                <Ionicons name="chevron-down" size={24} color="#000" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{productName}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="share-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image Background */}
        <View style={styles.imageBackground}>
          <View style={styles.pageIndicator}>
            <View style={[styles.pageDot, styles.pageDotActive]} />
            <View style={styles.pageDot} />
            <View style={styles.pageDot} />
          </View>
        </View>

        {/* Product Information Card */}
        <View style={styles.productCard}>
          <View style={styles.productHeader}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{productName} (Bengali Veggies)</Text>
              <Text style={styles.productQuantity}>Qty: 250 g</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹100</Text>
                <Text style={styles.discount}>50% Off</Text>
              </View>
              <View style={styles.mrpContainer}>
                <Text style={styles.mrpLabel}>MRP</Text>
                <Text style={styles.mrpPrice}>₹150</Text>
                <Text style={styles.taxInfo}>(Inclusive of all taxes)</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>

          {/* Unit Selection */}
          <View style={styles.unitSection}>
            <Text style={styles.sectionTitle}>Select Units</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.unitScroll}>
              {productUnits.map((unit) => (
                <TouchableOpacity
                  key={unit.id}
                  style={[
                    styles.unitCard,
                    selectedUnit === unit.name && styles.selectedUnitCard,
                    unit.isOutOfStock && styles.outOfStockCard
                  ]}
                  onPress={() => !unit.isOutOfStock && setSelectedUnit(unit.name)}
                  disabled={unit.isOutOfStock}
                >
                  {unit.discount && !unit.isOutOfStock && (
                    <View style={styles.discountTag}>
                      <Text style={styles.discountTagText}>{unit.discount}% Off</Text>
                    </View>
                  )}
                  <Text style={styles.unitName}>{unit.name}</Text>
                  {unit.isOutOfStock ? (
                    <Text style={styles.outOfStockText}>Out of Stock</Text>
                  ) : (
                    <View style={styles.unitPriceContainer}>
                      <Text style={styles.unitPrice}>₹{unit.price}</Text>
                      <Text style={styles.unitOriginalPrice}>₹{unit.originalPrice}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* View Products Details Button */}
          <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewProductDetails}>
            <Text style={styles.viewDetailsText}>View Products Details</Text>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <View style={styles.featureCard}>
              <Ionicons name="leaf" size={26} color="#000" />
              <Text style={styles.featureText}>Sourced{'\n'}Daily Fresh</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="checkmark-circle" size={26} color="#000" />
              <Text style={styles.featureText}>Quality{'\n'}Assured</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="bag-check" size={26} color="#000" />
              <Text style={styles.featureText}>Secure{'\n'}Payment</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="car" size={26} color="#000" />
              <Text style={styles.featureText}>Free{'\n'}Shipping</Text>
            </View>
          </View>
        </View>

        {/* Related Products */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Bengali Fresh Veggies</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
            {relatedProducts.map((product) => (
              <View key={product.id} style={styles.relatedCard}>
                <View style={styles.relatedImageContainer}>
                  <Ionicons name={product.image as any} size={60} color="#ccc" />
                </View>
                <Text style={styles.relatedProductName}>{product.name}</Text>
                <View style={styles.relatedRating}>
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text style={styles.relatedRatingText}>{product.rating} ({product.reviewCount})</Text>
                </View>
                <Text style={styles.relatedPrice}>₹{product.price}</Text>
                <View style={styles.relatedQuantityContainer}>
                  <TouchableOpacity style={styles.relatedQuantityButton}>
                    <Ionicons name="remove" size={20} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.relatedQuantity}>1</Text>
                  <TouchableOpacity style={styles.relatedQuantityButton}>
                    <Ionicons name="add" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* View All Products */}
        <View style={styles.viewAllContainer}>
          <View style={styles.viewAllContent}>
            <View style={styles.viewAllIcons}>
              {relatedProducts.slice(0, 4).map((product, index) => (
                <View key={index} style={styles.viewAllIcon}>
                  <Ionicons name={product.image as any} size={33} color="#ccc" />
                </View>
              ))}
            </View>
            <View style={styles.viewAllTextContainer}>
              <Text style={styles.viewAllText}>View all products</Text>
              <Ionicons name="chevron-down" size={24} color="#000" />
            </View>
          </View>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  imageBackground: {
    height: 375,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pageIndicator: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: 20,
    zIndex: 10,
  },
  pageDot: {
    width: 40,
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    opacity: 0.5,
  },
  pageDotActive: {
    opacity: 1,
  },
  productCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  productInfo: {
    flex: 1,
    marginRight: 20,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  productQuantity: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  discount: {
    fontSize: 13,
    color: '#ff0000',
    fontWeight: '500',
  },
  mrpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  mrpLabel: {
    fontSize: 13,
    color: '#000',
  },
  mrpPrice: {
    fontSize: 13,
    color: '#000',
    textDecorationLine: 'line-through',
  },
  taxInfo: {
    fontSize: 13,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#3cb433',
    borderRadius: 10,
    paddingHorizontal: 26,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 83,
    height: 38,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  unitSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 15,
  },
  unitScroll: {
    flexDirection: 'row',
  },
  unitCard: {
    width: 117,
    height: 66,
    borderWidth: 1,
    borderColor: '#cccbcb',
    borderRadius: 5.5,
    padding: 10,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedUnitCard: {
    borderColor: '#0ca201',
  },
  outOfStockCard: {
    borderColor: '#cccbcb',
    opacity: 0.6,
  },
  discountTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#0ca201',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderTopLeftRadius: 5.5,
    borderBottomRightRadius: 15,
  },
  discountTagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '500',
  },
  unitName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  outOfStockText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  unitPriceContainer: {
    alignItems: 'center',
  },
  unitPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  unitOriginalPrice: {
    fontSize: 14,
    color: '#000',
    textDecorationLine: 'line-through',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 20,
  },
  viewDetailsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0ca201',
    marginRight: 5,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#ececec',
    borderRadius: 5.5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 9,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    minWidth: 100,
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    textAlign: 'left',
  },
  relatedSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  relatedScroll: {
    flexDirection: 'row',
  },
  relatedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16.5,
    padding: 15,
    marginRight: 15,
    width: 181,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  relatedImageContainer: {
    backgroundColor: '#f6f6f6',
    borderRadius: 11,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  relatedProductName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  relatedRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 8,
  },
  relatedRatingText: {
    fontSize: 14,
    color: '#000',
  },
  relatedPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  relatedQuantityContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'center',
  },
  relatedQuantityButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  relatedQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    minWidth: 20,
    textAlign: 'center',
  },
  viewAllContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  viewAllContent: {
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  viewAllIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  viewAllTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewAllText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
}); 