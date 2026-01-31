export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  petType: string;
  rating: number;
  reviews: number;
  isEco: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  description: string;
  ecoFeatures?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Grain-Free Dog Food",
    price: 54.99,
    originalPrice: 64.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840089037_6de4f90e.jpg",
    category: "Food",
    petType: "Dog",
    rating: 4.8,
    reviews: 2847,
    isEco: true,
    isBestseller: true,
    description: "Premium organic dog food made with sustainably sourced ingredients",
    ecoFeatures: ["Organic Certified", "Recyclable Packaging", "Carbon Neutral"]
  },
  {
    id: 2,
    name: "Natural Salmon Recipe Dog Food",
    price: 49.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840089228_259f69f4.jpg",
    category: "Food",
    petType: "Dog",
    rating: 4.7,
    reviews: 1923,
    isEco: true,
    description: "Wild-caught salmon formula for healthy skin and coat",
    ecoFeatures: ["Sustainably Sourced", "Plastic-Free"]
  },
  {
    id: 3,
    name: "Puppy Growth Formula",
    price: 44.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840090921_a1bbd57e.jpg",
    category: "Food",
    petType: "Dog",
    rating: 4.9,
    reviews: 1456,
    isEco: true,
    isNew: true,
    description: "Complete nutrition for growing puppies with DHA for brain development",
    ecoFeatures: ["Organic", "Biodegradable Bag"]
  },
  {
    id: 4,
    name: "Interactive Feather Wand Cat Toy",
    price: 18.99,
    originalPrice: 24.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840104985_22c1f905.jpg",
    category: "Toys",
    petType: "Cat",
    rating: 4.6,
    reviews: 3421,
    isEco: true,
    isBestseller: true,
    description: "Natural feathers on sustainable bamboo wand for endless play",
    ecoFeatures: ["Natural Materials", "Bamboo Handle"]
  },
  {
    id: 5,
    name: "Catnip Mouse Toy Set",
    price: 12.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840114892_cea8655f.jpg",
    category: "Toys",
    petType: "Cat",
    rating: 4.5,
    reviews: 2156,
    isEco: true,
    description: "Organic catnip filled mice made from recycled materials",
    ecoFeatures: ["Recycled Materials", "Organic Catnip"]
  },
  {
    id: 6,
    name: "Puzzle Treat Dispenser",
    price: 24.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840115971_76a8d676.png",
    category: "Toys",
    petType: "Cat",
    rating: 4.7,
    reviews: 1834,
    isEco: true,
    isNew: true,
    description: "Mental stimulation toy made from plant-based materials",
    ecoFeatures: ["Plant-Based Plastic", "BPA Free"]
  },
  {
    id: 7,
    name: "Orthopedic Memory Foam Pet Bed",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840129721_dec2dcca.jpg",
    category: "Beds",
    petType: "Dog",
    rating: 4.9,
    reviews: 4521,
    isEco: true,
    isBestseller: true,
    description: "Premium orthopedic bed with organic cotton cover",
    ecoFeatures: ["Organic Cotton", "Recycled Foam", "Machine Washable"]
  },
  {
    id: 8,
    name: "Cozy Cave Cat Bed",
    price: 59.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840130576_a4de34a1.jpg",
    category: "Beds",
    petType: "Cat",
    rating: 4.8,
    reviews: 2987,
    isEco: true,
    description: "Enclosed cave bed made from sustainable wool blend",
    ecoFeatures: ["Sustainable Wool", "Natural Dyes"]
  },
  {
    id: 9,
    name: "Elevated Cooling Pet Bed",
    price: 74.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840133003_861085cb.jpg",
    category: "Beds",
    petType: "Dog",
    rating: 4.6,
    reviews: 1654,
    isEco: true,
    isNew: true,
    description: "Breathable mesh bed with recycled aluminum frame",
    ecoFeatures: ["Recycled Aluminum", "Breathable Mesh"]
  },
  {
    id: 10,
    name: "Bamboo Deshedding Brush",
    price: 22.99,
    originalPrice: 29.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840146252_573b7e6d.jpg",
    category: "Grooming",
    petType: "Dog",
    rating: 4.7,
    reviews: 3245,
    isEco: true,
    isBestseller: true,
    description: "Effective deshedding tool with sustainable bamboo handle",
    ecoFeatures: ["Bamboo Handle", "Recyclable Steel"]
  },
  {
    id: 11,
    name: "Natural Bristle Grooming Kit",
    price: 34.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840146653_e3415580.jpg",
    category: "Grooming",
    petType: "Cat",
    rating: 4.5,
    reviews: 1876,
    isEco: true,
    description: "Complete grooming set with natural boar bristles",
    ecoFeatures: ["Natural Bristles", "FSC Wood"]
  },
  {
    id: 12,
    name: "Organic Pet Shampoo Bar",
    price: 16.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840147882_d435e1e3.jpg",
    category: "Grooming",
    petType: "Dog",
    rating: 4.8,
    reviews: 2543,
    isEco: true,
    isNew: true,
    description: "Zero-waste shampoo bar with organic ingredients",
    ecoFeatures: ["Zero Waste", "Organic", "Vegan"]
  },
  {
    id: 13,
    name: "Smart Pet Water Fountain",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840239491_6e9c4f9c.jpg",
    category: "Tech",
    petType: "Dog",
    rating: 4.6,
    reviews: 2134,
    isEco: false,
    isBestseller: true,
    description: "Filtered water fountain with app connectivity and low energy mode"
  },
  {
    id: 14,
    name: "GPS Pet Tracker Collar",
    price: 79.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840246126_315627aa.png",
    category: "Tech",
    petType: "Dog",
    rating: 4.7,
    reviews: 1876,
    isEco: false,
    isNew: true,
    description: "Real-time GPS tracking with activity monitoring"
  },
  {
    id: 15,
    name: "Sustainable Leather Dog Collar",
    price: 38.99,
    originalPrice: 48.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840259410_ea7d9f23.jpg",
    category: "Accessories",
    petType: "Dog",
    rating: 4.9,
    reviews: 3654,
    isEco: true,
    isBestseller: true,
    description: "Handcrafted collar from vegetable-tanned leather",
    ecoFeatures: ["Vegetable Tanned", "Brass Hardware", "Handcrafted"]
  },
  {
    id: 16,
    name: "Hemp Dog Leash",
    price: 28.99,
    image: "https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840260320_ddd7ca4e.jpg",
    category: "Accessories",
    petType: "Dog",
    rating: 4.6,
    reviews: 2187,
    isEco: true,
    description: "Durable hemp leash with recycled brass clip",
    ecoFeatures: ["Organic Hemp", "Recycled Metal"]
  }
];

export const categories = [
  { id: 'dogs', name: 'Dogs', icon: 'dog', image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840075862_1bf6d2c0.jpg' },
  { id: 'cats', name: 'Cats', icon: 'cat', image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840168096_2f1f426f.jpg' },
  { id: 'birds', name: 'Birds', icon: 'bird', image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840180642_d12043f3.jpg' },
  { id: 'fish', name: 'Fish & Aquatics', icon: 'fish', image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840193190_7653038b.jpg' },
  { id: 'small-animals', name: 'Small Animals', icon: 'rabbit', image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840205929_fd815371.jpg' },
  { id: 'reptiles', name: 'Reptiles', icon: 'lizard', image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840219804_28082573.jpg' },
];

export const productCategories = ['All', 'Food', 'Toys', 'Beds', 'Grooming', 'Tech', 'Accessories'];
export const petTypes = ['All', 'Dog', 'Cat', 'Bird', 'Fish', 'Small Animal', 'Reptile'];
