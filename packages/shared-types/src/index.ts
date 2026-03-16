// ─── ENUMS ───────────────────────────────────────────────────────────────────

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'
export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'SPAM'

export type SectionType =
  | 'HERO_BANNER'
  | 'FEATURED_PRODUCTS'
  | 'CATEGORY_GRID'
  | 'COLLECTION_SHOWCASE'
  | 'IMAGE_TEXT_SPLIT'
  | 'FULL_WIDTH_IMAGE'
  | 'TEXT_CONTENT'
  | 'STATS_COUNTER'
  | 'TESTIMONIALS_CAROUSEL'
  | 'TEAM_GRID'
  | 'GALLERY_GRID'
  | 'VIDEO_EMBED'
  | 'NEWSLETTER_SIGNUP'
  | 'CONTACT_FORM'
  | 'FAQ_ACCORDION'
  | 'CUSTOM_HTML'

// ─── API RESPONSE SHAPE ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data: T
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  error?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  name: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  user: User
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export interface ProductImage {
  url: string
  alt: string
  isPrimary: boolean
}

export interface ProductDimensions {
  width: number
  height: number
  depth: number
  unit: 'cm' | 'in'
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string | null
  price: string
  salePrice: string | null
  sku: string
  inStock: boolean
  featured: boolean
  newArrival: boolean
  images: ProductImage[]
  dimensions: ProductDimensions | null
  weight: string | null
  materials: string[]
  colors: string[]
  finishes: string[]
  tags: string[]
  metaTitle: string | null
  metaDesc: string | null
  sortOrder: number
  publishedAt: string | null
  categoryId: string
  category: Category
  createdAt: string
  updatedAt: string
}

export interface ProductInput {
  name: string
  slug?: string
  description: string
  shortDesc?: string
  price: number
  salePrice?: number
  sku: string
  inStock?: boolean
  featured?: boolean
  newArrival?: boolean
  images?: ProductImage[]
  dimensions?: ProductDimensions
  weight?: number
  materials?: string[]
  colors?: string[]
  finishes?: string[]
  tags?: string[]
  metaTitle?: string
  metaDesc?: string
  sortOrder?: number
  publishedAt?: string
  categoryId: string
}

export type ProductSortField = 'name' | 'price' | 'createdAt' | 'sortOrder'

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  parentId: string | null
  children?: Category[]
  sortOrder: number
  visible: boolean
  createdAt: string
  updatedAt: string
}

export type CategoryTree = Category & { children: CategoryTree[] }

// ─── COLLECTIONS ──────────────────────────────────────────────────────────────

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  bannerImage: string | null
  featured: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
  _count?: { items: number }
}

export interface CollectionWithProducts extends Collection {
  items: Array<{
    sortOrder: number
    product: Product
  }>
}

// ─── SECTION CONTENT TYPES ────────────────────────────────────────────────────

export type ButtonStyle = 'filled' | 'outline' | 'ghost' | 'text'
export type TextPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface CTAButton {
  label: string
  url: string
  style: ButtonStyle
}

export interface HeroBannerContent {
  headline: string
  subheadline?: string
  cta1?: CTAButton
  cta2?: CTAButton
  backgroundType: 'color' | 'image' | 'video'
  backgroundColor?: string
  backgroundImage?: string
  backgroundImagePosition?: string
  backgroundVideoUrl?: string
  overlayColor?: string
  overlayOpacity?: number
  textPosition?: TextPosition
  minHeight?: string
  textColor?: string
}

export interface FeaturedProductsContent {
  sectionTitle?: string
  sectionSubtitle?: string
  productIds?: string[]
  autoSelectBy?: 'featured' | 'newArrival' | 'category' | 'collection' | null
  autoSelectValue?: string
  layout: '2-col' | '3-col' | '4-col' | 'scroll' | 'carousel'
  showPrice: boolean
  showInquiryButton: boolean
  maxItems: number
}

export interface CategoryGridContent {
  sectionTitle?: string
  categoryIds?: string[]
  columns: 2 | 3 | 4
  showDescription: boolean
}

export interface CollectionShowcaseContent {
  sectionTitle?: string
  collectionIds?: string[]
  layout: 'grid' | 'featured' | 'horizontal'
}

export interface ImageTextSplitContent {
  image: string
  imageAlt?: string
  imagePosition: 'left' | 'right'
  imageAspectRatio: 'square' | '4:3' | '16:9' | 'portrait'
  heading: string
  body: string
  cta?: CTAButton
  verticalAlign: 'top' | 'center' | 'bottom'
}

export interface FullWidthImageContent {
  image: string
  imageAlt?: string
  parallax: boolean
  height: string
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  caption?: string
}

export interface TextContent {
  richText: string
  maxWidth: '640px' | '768px' | '1024px' | 'full'
  textAlign: 'left' | 'center' | 'right'
}

export interface StatItem {
  prefix?: string
  number: string
  suffix?: string
  label: string
}

export interface StatsCounterContent {
  sectionTitle?: string
  items: StatItem[]
  animatedCountUp: boolean
  columns: 2 | 3 | 4
}

export interface TestimonialsCarouselContent {
  testimonialIds?: string[]
  showAllFeatured: boolean
  layout: 'carousel' | 'grid'
  showAvatar: boolean
  showRating: boolean
  showCompany: boolean
  autoplay: boolean
  autoplayInterval: number
}

export interface TeamGridContent {
  sectionTitle?: string
  teamMemberIds?: string[]
  showAllVisible: boolean
  columns: 2 | 3 | 4
  showRole: boolean
  showBio: boolean
  showSocials: boolean
}

export interface GalleryImage {
  url: string
  alt?: string
}

export interface GalleryGridContent {
  images: GalleryImage[]
  gridStyle: 'uniform' | 'masonry' | '2-col' | '3-col' | '4-col'
  lightboxOnClick: boolean
  showCaptions: boolean
  aspectRatio: 'square' | '4:3' | '16:9' | 'auto'
}

export interface VideoEmbedContent {
  videoUrl: string
  aspectRatio: '16:9' | '4:3' | '1:1'
  autoplay: boolean
  showControls: boolean
  posterImage?: string
  maxWidth: '640px' | '768px' | '1024px' | 'full'
}

export interface NewsletterSignupContent {
  headline: string
  subtext?: string
  placeholder?: string
  buttonLabel?: string
  backgroundImage?: string
}

export interface ContactFormContent {
  headline?: string
  subtext?: string
  showPhone: boolean
  showSubject: boolean
  showProductInquiry: boolean
  submitLabel?: string
  successMessage?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqAccordionContent {
  sectionTitle?: string
  items: FaqItem[]
  layout: 'single' | 'two-column'
  defaultOpen: 'first' | 'none' | 'all'
}

export interface CustomHtmlContent {
  html: string
}

export type SectionContent =
  | HeroBannerContent
  | FeaturedProductsContent
  | CategoryGridContent
  | CollectionShowcaseContent
  | ImageTextSplitContent
  | FullWidthImageContent
  | TextContent
  | StatsCounterContent
  | TestimonialsCarouselContent
  | TeamGridContent
  | GalleryGridContent
  | VideoEmbedContent
  | NewsletterSignupContent
  | ContactFormContent
  | FaqAccordionContent
  | CustomHtmlContent

// ─── SHARED SECTION STYLES ────────────────────────────────────────────────────

export interface SectionStyles {
  backgroundColor?: string
  backgroundImage?: string
  backgroundOpacity?: number
  backgroundGradient?: string
  textColor?: string
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
  borderRadius?: number
  borderWidth?: number
  borderColor?: string
  borderStyle?: string
  customClass?: string
  headingFontOverride?: string
  bodyFontOverride?: string
  hideOnMobile?: boolean
  hideOnTablet?: boolean
  hideOnDesktop?: boolean
}

// ─── CMS MODELS ───────────────────────────────────────────────────────────────

export interface Section {
  id: string
  pageId: string
  type: SectionType
  label: string | null
  sortOrder: number
  visible: boolean
  content: SectionContent
  styles: SectionStyles
  createdAt: string
  updatedAt: string
}

export interface Page {
  id: string
  title: string
  slug: string
  metaTitle: string | null
  metaDesc: string | null
  ogImage: string | null
  published: boolean
  publishedAt: string | null
  sections?: Section[]
  createdAt: string
  updatedAt: string
}

export interface PageWithSections extends Page {
  sections: Section[]
  theme: Theme
}

// ─── THEME ────────────────────────────────────────────────────────────────────

export interface Theme {
  id: string
  name: string
  colorPrimary: string
  colorSecondary: string
  colorAccent: string
  colorBackground: string
  colorText: string
  colorMuted: string
  colorBorder: string
  colorError: string
  fontHeading: string
  fontBody: string
  fontSizeBase: number
  lineHeight: string
  letterSpacing: string
  borderRadius: string
  buttonStyle: 'sharp' | 'rounded' | 'pill'
  cardShadow: 'none' | 'sm' | 'md' | 'lg'
  navStyle: 'fixed' | 'sticky' | 'static'
  navBgColor: string
  navTextColor: string
  navHeight: number
  logoUrl: string | null
  logoMaxHeight: number
  faviconUrl: string | null
  customCSS: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  name: string
  title: string | null
  company: string | null
  avatar: string | null
  content: string
  rating: number
  featured: boolean
  sortOrder: number
  visible: boolean
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  image: string | null
  linkedin: string | null
  instagram: string | null
  sortOrder: number
  visible: boolean
  createdAt: string
  updatedAt: string
}

export interface MediaAsset {
  id: string
  filename: string
  url: string
  publicId: string
  mimeType: string
  size: number
  width: number | null
  height: number | null
  alt: string | null
  folder: string | null
  tags: string[]
  createdAt: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  productId: string | null
  status: InquiryStatus
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface InquiryInput {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  productId?: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  active: boolean
  token: string
  subscribedAt: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  label: string | null
  group: string | null
  updatedAt: string
}

// ─── AGGREGATED FRONTEND TYPES ────────────────────────────────────────────────

export interface PaginatedProducts {
  products: Product[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ProductFilterParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  collection?: string
  featured?: boolean
  newArrival?: boolean
  sort?: ProductSortField
  order?: 'asc' | 'desc'
  inStock?: boolean
}
