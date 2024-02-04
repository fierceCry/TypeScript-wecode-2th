import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// User Schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  address: String,
  point: { type: Number, default: 0 },
  profile_image: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyccrl9eKhoTdKX8jO9sa2Sx-yvz45vFdA0FPBlmEZOw&s"},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Brand Schema
const brandSchema = new Schema({
  name: { type: String, required: true }
});

// ProductCategory Schema
const productCategorySchema = new Schema({
  name: { type: String, required: true }
});

// OrderStatus Schema
const orderStatusSchema = new Schema({
  name: { type: String, required: true }
});

// Product Schema
const productSchema = new Schema({
  productCategory: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ProductImage Schema
const productImageSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  imageUrl: { type: String, required: true }
});

// Post Schema
const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Order Schema
const orderSchema = new Schema({
  orderNumber: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: Schema.Types.ObjectId, ref: 'OrderStatus', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// OrderProduct Schema
const orderProductSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true }
});

// Comment Schema
const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Cart Schema
const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  count: { type: Number, required: true }
});

// Scrap Schema
const scrapSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

// Refund Schema
const refundSchema = new Schema({
  orderProduct: { type: Schema.Types.ObjectId, ref: 'OrderProduct', required: true },
  reason: { type: String, required: true },
  image: String
});

// Review Schema
const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 모델 생성
const User = model('User', userSchema);
const Brand = model('Brand', brandSchema);
const ProductCategory = model('ProductCategory', productCategorySchema);
const OrderStatus = model('OrderStatus', orderStatusSchema);
const Product = model('Product', productSchema);
const ProductImage = model('ProductImage', productImageSchema);
const Post = model('Post', postSchema);
const Order = model('Order', orderSchema);
const OrderProduct = model('OrderProduct', orderProductSchema);
const Comment = model('Comment', commentSchema);
const Cart = model('Cart', cartSchema);
const Scrap = model('Scrap', scrapSchema);
const Refund = model('Refund', refundSchema);
const Review = model('Review', reviewSchema);

// 모델 export
export {
  User,
  Brand,
  ProductCategory,
  OrderStatus,
  Product,
  ProductImage,
  Post,
  Order,
  OrderProduct,
  Comment,
  Cart,
  Scrap,
  Refund,
  Review
};
