import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding GreatHouses database...')

  // ─── ADMIN USERS ────────────────────────────────────────────────────────────
  const superAdminHash = await bcrypt.hash('Admin@123', 12)
  const editorHash = await bcrypt.hash('Editor@123', 12)

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@greathouses.in' },
    update: {},
    create: {
      email: 'admin@greathouses.in',
      passwordHash: superAdminHash,
      name: 'Arjun Mehta',
      role: 'SUPER_ADMIN',
    },
  })

  const editor = await prisma.user.upsert({
    where: { email: 'editor@greathouses.in' },
    update: {},
    create: {
      email: 'editor@greathouses.in',
      passwordHash: editorHash,
      name: 'Priya Sharma',
      role: 'EDITOR',
    },
  })

  console.log('✓ Users created:', superAdmin.email, editor.email)

  // ─── THEME ──────────────────────────────────────────────────────────────────
  const theme = await prisma.theme.upsert({
    where: { id: 'default-theme' },
    update: {},
    create: {
      id: 'default-theme',
      name: 'GreatHouses Default',
      colorPrimary: '#1a1a1a',
      colorSecondary: '#c9a96e',
      colorAccent: '#f5f0e8',
      colorBackground: '#ffffff',
      colorText: '#1a1a1a',
      colorMuted: '#6b7280',
      colorBorder: '#e5e7eb',
      colorError: '#ef4444',
      fontHeading: 'Playfair Display',
      fontBody: 'Jost',
      fontSizeBase: 16,
      lineHeight: '1.6',
      letterSpacing: '0em',
      borderRadius: '3px',
      buttonStyle: 'sharp',
      cardShadow: 'sm',
      navStyle: 'fixed',
      navBgColor: '#ffffff',
      navTextColor: '#1a1a1a',
      navHeight: 72,
      logoMaxHeight: 48,
      isActive: true,
    },
  })
  console.log('✓ Theme created')

  // ─── SITE SETTINGS ──────────────────────────────────────────────────────────
  const settingsData = [
    { key: 'site_name', value: 'Great Houses India', label: 'Site Name', group: 'general' },
    { key: 'tagline', value: 'Crafted for the Extraordinary', label: 'Tagline', group: 'general' },
    { key: 'phone', value: '+91 98765 43210', label: 'Phone', group: 'contact' },
    { key: 'email', value: 'hello@greathouses.in', label: 'Email', group: 'contact' },
    { key: 'whatsapp', value: '+919876543210', label: 'WhatsApp', group: 'contact' },
    { key: 'address', value: '12, Jubilee Hills, Hyderabad, Telangana 500033', label: 'Address', group: 'contact' },
    { key: 'instagram', value: 'https://instagram.com/greathousesindia', label: 'Instagram', group: 'social' },
    { key: 'pinterest', value: 'https://pinterest.com/greathousesindia', label: 'Pinterest', group: 'social' },
    { key: 'currency', value: 'INR', label: 'Currency', group: 'general' },
    { key: 'currency_symbol', value: '₹', label: 'Currency Symbol', group: 'general' },
    { key: 'meta_title', value: 'Great Houses India | Luxury Indian Furniture', label: 'Default Meta Title', group: 'seo' },
    { key: 'meta_desc', value: 'Handcrafted luxury furniture inspired by Indian heritage. Discover timeless pieces for the extraordinary home.', label: 'Default Meta Description', group: 'seo' },
  ]

  for (const setting of settingsData) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }
  console.log('✓ Site settings created')

  // ─── CATEGORIES ─────────────────────────────────────────────────────────────
  const categories = [
    { slug: 'living-room', name: 'Living Room', description: 'Statement sofas, coffee tables, and lounge pieces for aristocratic spaces', sortOrder: 1 },
    { slug: 'bedroom', name: 'Bedroom', description: 'Handcrafted beds, nightstands, and wardrobes for a regal sanctuary', sortOrder: 2 },
    { slug: 'dining', name: 'Dining', description: 'Grand dining tables, chairs, and sideboards for memorable gatherings', sortOrder: 3 },
    { slug: 'home-office', name: 'Home Office', description: 'Executive desks and bespoke storage for the distinguished professional', sortOrder: 4 },
    { slug: 'outdoor-garden', name: 'Outdoor & Garden', description: 'Weather-resistant luxury pieces for verandas and garden retreats', sortOrder: 5 },
    { slug: 'accessories', name: 'Accessories', description: 'Finishing touches — lamps, mirrors, and décor accents', sortOrder: 6 },
  ]

  const categoryMap: Record<string, string> = {}

  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        ...cat,
        visible: true,
      },
    })
    categoryMap[cat.slug] = created.id
  }
  console.log('✓ Categories created')

  // ─── COLLECTIONS ────────────────────────────────────────────────────────────
  const collections = [
    {
      slug: 'heritage-collection',
      name: 'Heritage Collection',
      description: 'Timeless craftsmanship rooted in Indian artisan tradition. Each piece tells a story passed down through generations of master craftsmen from Rajasthan, Kerala, and Chettinad.',
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'modern-luxe',
      name: 'Modern Luxe',
      description: 'Clean lines, premium materials, contemporary elegance. Where Indian sensibility meets international minimalism — built for the discerning modern home.',
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'royal-artisan',
      name: 'Royal Artisan',
      description: 'Hand-carved masterpieces by master craftsmen. Inspired by the grand palaces and havelis of India\'s royal era, each piece is a museum-quality work of functional art.',
      featured: true,
      sortOrder: 3,
    },
  ]

  const collectionMap: Record<string, string> = {}

  for (const col of collections) {
    const created = await prisma.collection.upsert({
      where: { slug: col.slug },
      update: {},
      create: col,
    })
    collectionMap[col.slug] = created.id
  }
  console.log('✓ Collections created')

  // ─── PRODUCTS (20) ──────────────────────────────────────────────────────────
  const productsData = [
    {
      name: 'Maharaja Carved Teak Sofa',
      slug: 'maharaja-carved-teak-sofa',
      description: 'A regal three-seater sofa carved from premium teak wood, upholstered in hand-block-printed linen. The intricate floral motifs on the frame are hand-chiselled by Jodhpur artisans, each taking over 40 hours to complete. The cushions are removable with high-density foam fill.',
      shortDesc: 'Hand-carved teak sofa with block-printed linen upholstery. A throne for the modern home.',
      price: 285000,
      sku: 'GH-LR-001',
      inStock: true,
      featured: true,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/sofa-1', alt: 'Maharaja Carved Teak Sofa - Front View', isPrimary: true },
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/sofa-2', alt: 'Maharaja Carved Teak Sofa - Side Detail', isPrimary: false },
      ],
      materials: ['Premium Teak Wood', 'Hand-Block-Printed Linen', 'High-Density Foam'],
      colors: ['Ivory', 'Antique Gold'],
      finishes: ['Hand-Rubbed Oil Finish'],
      tags: ['sofa', 'teak', 'carved', 'living-room', 'heritage'],
      categorySlug: 'living-room',
      collectionSlugs: ['heritage-collection', 'royal-artisan'],
      sortOrder: 1,
    },
    {
      name: 'Rajwada Dining Table',
      slug: 'rajwada-dining-table',
      description: 'An eight-seater dining table inspired by the grand dining halls of Rajasthani forts. The solid sheesham wood top features hand-inlaid brass geometric patterns. The robust turned legs echo architectural columns. Seats eight comfortably with space for two more.',
      shortDesc: 'Eight-seater sheesham dining table with brass inlay. Heritage craftsmanship for grand gatherings.',
      price: 450000,
      sku: 'GH-DI-001',
      inStock: true,
      featured: true,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/dining-1', alt: 'Rajwada Dining Table', isPrimary: true },
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/dining-2', alt: 'Rajwada Dining Table - Brass Detail', isPrimary: false },
      ],
      materials: ['Solid Sheesham Wood', 'Hand-Inlaid Brass'],
      colors: ['Warm Brown', 'Antique Brass'],
      finishes: ['Natural Wax Polish'],
      tags: ['dining table', 'sheesham', 'brass inlay', 'dining'],
      categorySlug: 'dining',
      collectionSlugs: ['heritage-collection'],
      sortOrder: 1,
    },
    {
      name: 'Aranya King Bed Frame',
      slug: 'aranya-king-bed-frame',
      description: 'Inspired by the forest canopies of Kerala, the Aranya bed features a dramatic carved headboard with naturalistic leaf and vine motifs in solid teak. The platform base provides low, grounded proportions beloved in Indian architecture. Includes slat support for any mattress type.',
      shortDesc: 'King-sized carved teak bed with nature-inspired headboard. Sleep beneath the forest canopy.',
      price: 185000,
      sku: 'GH-BE-001',
      inStock: true,
      featured: true,
      newArrival: true,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/bed-1', alt: 'Aranya King Bed Frame', isPrimary: true },
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/bed-2', alt: 'Aranya Bed - Headboard Detail', isPrimary: false },
      ],
      materials: ['Solid Teak Wood', 'Steel Slat System'],
      colors: ['Honey Teak', 'Dark Walnut'],
      finishes: ['Hand-Rubbed Oil'],
      tags: ['bed', 'king', 'teak', 'carved', 'bedroom'],
      categorySlug: 'bedroom',
      collectionSlugs: ['heritage-collection', 'royal-artisan'],
      sortOrder: 1,
    },
    {
      name: 'Haveli Console Table',
      slug: 'haveli-console-table',
      description: 'A statement console table drawing from the ornate architecture of Rajasthani havelis. Crafted from mango wood with hand-painted floral panels in the Pichwai tradition. The jharokha-inspired carved apron and tapered legs make this an instant focal point in any entryway or drawing room.',
      shortDesc: 'Mango wood console with hand-painted Pichwai panels. The soul of a haveli in one piece.',
      price: 95000,
      sku: 'GH-LR-002',
      inStock: true,
      featured: false,
      newArrival: true,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/console-1', alt: 'Haveli Console Table', isPrimary: true },
      ],
      materials: ['Mango Wood', 'Hand-Painted Canvas Inset', 'Brass Hardware'],
      colors: ['Distressed White', 'Peacock Blue Accents'],
      finishes: ['Chalk Paint', 'Hand-Painted'],
      tags: ['console', 'hallway', 'painted', 'mango wood'],
      categorySlug: 'living-room',
      collectionSlugs: ['heritage-collection'],
      sortOrder: 2,
    },
    {
      name: 'Zenith Executive Desk',
      slug: 'zenith-executive-desk',
      description: 'The Zenith desk is crafted for the modern Indian professional who refuses to compromise on heritage. A broad walnut surface with hand-rubbed finish sits atop a framework of solid sheesham legs. Built-in cable management, two lockable drawers, and a leather-topped centre strip complete this functional masterpiece.',
      shortDesc: 'Walnut executive desk with leather inlay and solid sheesham legs. Command with authority.',
      price: 145000,
      sku: 'GH-HO-001',
      inStock: true,
      featured: false,
      newArrival: true,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/desk-1', alt: 'Zenith Executive Desk', isPrimary: true },
      ],
      materials: ['American Black Walnut', 'Solid Sheesham', 'Full-Grain Leather'],
      colors: ['Dark Walnut', 'Cognac Leather'],
      finishes: ['Natural Oil'],
      tags: ['desk', 'home office', 'walnut', 'executive'],
      categorySlug: 'home-office',
      collectionSlugs: ['modern-luxe'],
      sortOrder: 1,
    },
    {
      name: 'Chettinad Courtyard Bench',
      slug: 'chettinad-courtyard-bench',
      description: 'Inspired by the inner courtyards of Chettinad mansions, this backless bench in solid Burma teak features geometric tile-like carvings on the apron and legs. Solid and substantial, it works beautifully at the foot of a bed or as a garden statement piece.',
      shortDesc: 'Solid Burma teak bench with Chettinad geometric carvings. Architecture you can sit on.',
      price: 55000,
      sku: 'GH-BE-003',
      inStock: true,
      featured: false,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/bench-1', alt: 'Chettinad Courtyard Bench', isPrimary: true },
      ],
      materials: ['Burma Teak'],
      colors: ['Natural Teak'],
      finishes: ['Teak Oil'],
      tags: ['bench', 'teak', 'chettinad', 'outdoor', 'bedroom'],
      categorySlug: 'bedroom',
      collectionSlugs: ['heritage-collection'],
      sortOrder: 3,
    },
    {
      name: 'Orbit Coffee Table',
      slug: 'orbit-coffee-table',
      description: 'The Orbit is a bold contemporary statement: a solid marble top in Italian Carrara white resting on a sculptural brass base of interlocking rings. Designed in collaboration with Pune-based architect Rohan Agarwal, it bridges Indian materiality with international modernism. Marble slabs are individually selected.',
      shortDesc: 'Carrara marble top on sculpted brass ring base. The collision of ancient and avant-garde.',
      price: 165000,
      sku: 'GH-LR-003',
      inStock: true,
      featured: true,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/coffee-table-1', alt: 'Orbit Coffee Table', isPrimary: true },
      ],
      materials: ['Carrara Marble', 'Solid Brass'],
      colors: ['White Marble', 'Antique Brass'],
      finishes: ['Polished Brass', 'Honed Marble'],
      tags: ['coffee table', 'marble', 'brass', 'contemporary'],
      categorySlug: 'living-room',
      collectionSlugs: ['modern-luxe'],
      sortOrder: 3,
    },
    {
      name: 'Padmini Four-Poster Bed',
      slug: 'padmini-four-poster-bed',
      description: 'Named after the legendary queen of Mewar, the Padmini is our most opulent bedroom centrepiece. Four towering posts rise to silk-draped crown canopy. Hand-carved floral motifs cover every surface. The frame is solid rosewood aged 80+ years, sourced from certified forests. This is a family heirloom from day one.',
      shortDesc: 'Rosewood four-poster bed with carved canopy. An heirloom for the extraordinary home.',
      price: 550000,
      sku: 'GH-BE-002',
      inStock: false,
      featured: true,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/fourposter-1', alt: 'Padmini Four-Poster Bed', isPrimary: true },
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/fourposter-2', alt: 'Padmini Bed - Canopy Detail', isPrimary: false },
      ],
      materials: ['Certified Rosewood', 'Silk Canopy Fabric', 'Brass Finials'],
      colors: ['Dark Rosewood', 'Ivory Silk'],
      finishes: ['French Polish'],
      tags: ['bed', 'four poster', 'canopy', 'rosewood', 'luxury'],
      categorySlug: 'bedroom',
      collectionSlugs: ['royal-artisan', 'heritage-collection'],
      sortOrder: 2,
    },
    {
      name: 'Prana Lounge Chair',
      slug: 'prana-lounge-chair',
      description: 'The Prana chair invites you to breathe. Its high winged back, tight button-tufted velvet upholstery, and show-wood teak arms create a cocoon of luxury. Inspired by the reading chairs of Raj-era clubs, updated with contemporary proportions. Each chair is individually hand-sewn with over 80 individual buttons.',
      shortDesc: 'Winged velvet lounge chair with teak show-wood arms. Club-chair luxury, Indian soul.',
      price: 75000,
      sku: 'GH-LR-004',
      inStock: true,
      featured: false,
      newArrival: true,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/armchair-1', alt: 'Prana Lounge Chair', isPrimary: true },
      ],
      materials: ['Velvet Upholstery', 'Solid Teak Arms', 'Solid Beech Frame'],
      colors: ['Bottle Green', 'Midnight Navy', 'Burgundy', 'Blush Pink'],
      finishes: ['Button Tufted', 'Hand-Sewn'],
      tags: ['chair', 'lounge', 'velvet', 'wingback', 'living room'],
      categorySlug: 'living-room',
      collectionSlugs: ['royal-artisan'],
      sortOrder: 4,
    },
    {
      name: 'Aangan Jali Wardrobe',
      slug: 'aangan-jali-wardrobe',
      description: 'This three-door wardrobe is a masterwork of the jali tradition — delicate lattice patterns hand-carved into solid teak panels that allow air through while concealing contents within. The interior is fully fitted with hanging space, a velvet-lined drawer, and ajustable shelving. Brushed antique brass hardware throughout.',
      shortDesc: 'Three-door teak wardrobe with hand-carved jali panels and brass hardware.',
      price: 320000,
      sku: 'GH-BE-004',
      inStock: true,
      featured: false,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/wardrobe-1', alt: 'Aangan Jali Wardrobe', isPrimary: true },
      ],
      materials: ['Solid Teak', 'Antique Brass Hardware', 'Cedar Lining'],
      colors: ['Natural Teak', 'Antique Brass'],
      finishes: ['Wax Polish'],
      tags: ['wardrobe', 'jali', 'teak', 'storage', 'bedroom'],
      categorySlug: 'bedroom',
      collectionSlugs: ['heritage-collection'],
      sortOrder: 4,
    },
    {
      name: 'Kerala Spice Arch Bookcase',
      slug: 'kerala-spice-arch-bookcase',
      description: 'Inspired by the arched doorways of Kerala tharavadu homes, this bookcase features three graceful arched compartments in solid Burma teak. Each arch is hand-chiselled with lotus and paddy motifs. The generous shelving accommodates both books and decorative objects. A statement piece for the library or study.',
      shortDesc: 'Arched Burma teak bookcase with Kerala lotus carvings. Your library deserves a palace.',
      price: 215000,
      sku: 'GH-HO-002',
      inStock: true,
      featured: false,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/bookcase-1', alt: 'Kerala Spice Arch Bookcase', isPrimary: true },
      ],
      materials: ['Burma Teak'],
      colors: ['Natural Teak'],
      finishes: ['Teak Oil'],
      tags: ['bookcase', 'shelving', 'study', 'kerala', 'arched'],
      categorySlug: 'home-office',
      collectionSlugs: ['heritage-collection'],
      sortOrder: 2,
    },
    {
      name: 'Shaadi Sideboard',
      slug: 'shaadi-sideboard',
      description: 'Named for the celebrations it will witness, the Shaadi sideboard features hand-painted bridal procession panels on a solid mango wood frame. The interior houses velvet-lined drawers for silverware and adjustable shelving behind carved door panels. Solid brass drop-ring handles complete the festive aesthetic.',
      shortDesc: 'Mango wood sideboard with hand-painted wedding procession panels. Celebration furniture.',
      price: 185000,
      sku: 'GH-DI-002',
      inStock: true,
      featured: false,
      newArrival: true,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/sideboard-1', alt: 'Shaadi Sideboard', isPrimary: true },
      ],
      materials: ['Mango Wood', 'Brass Hardware', 'Hand-Painted Panels'],
      colors: ['Ivory', 'Gold Accents'],
      finishes: ['Chalk Paint', 'Hand-Painted'],
      tags: ['sideboard', 'dining', 'painted', 'storage'],
      categorySlug: 'dining',
      collectionSlugs: ['heritage-collection'],
      sortOrder: 2,
    },
    {
      name: 'Mughal Garden Sectional',
      slug: 'mughal-garden-sectional',
      description: 'Our largest sofa offering: a five-piece L-shaped sectional with frames of solid teak, upholstered in premium outdoor-grade linen treated for UV and moisture resistance. Inspired by the symmetrical gardens of Mughal palaces. Equally at home on a large veranda, poolside retreat, or grand drawing room.',
      shortDesc: 'Five-piece teak sectional for grand outdoor and indoor living. Inspired by Mughal gardens.',
      price: 520000,
      sku: 'GH-OG-001',
      inStock: true,
      featured: false,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/sectional-1', alt: 'Mughal Garden Sectional', isPrimary: true },
      ],
      materials: ['Solid Teak', 'UV-Resistant Outdoor Linen', 'Stainless Steel Hardware'],
      colors: ['Stone Grey', 'Terracotta', 'Forest Green'],
      finishes: ['Teak Oil'],
      tags: ['sectional', 'outdoor', 'sofa', 'teak', 'veranda'],
      categorySlug: 'outdoor-garden',
      collectionSlugs: ['royal-artisan'],
      sortOrder: 1,
    },
    {
      name: 'Neem Carved Mirror',
      slug: 'neem-carved-mirror',
      description: 'An heirloom-quality mirror in a hand-carved neem wood frame. The frame features continuous intertwining floral and geometric patterns carved over four weeks by a single artisan from Saharanpur. The warm honey-yellow of neem wood with its subtle grain variation makes each piece unique. Anti-fog silver mirror glass.',
      shortDesc: 'Hand-carved neem wood mirror with four-week artisan carving. A frame worthy of the view.',
      price: 45000,
      sku: 'GH-AC-001',
      inStock: true,
      featured: false,
      newArrival: true,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/mirror-1', alt: 'Neem Carved Mirror', isPrimary: true },
      ],
      materials: ['Neem Wood', 'Anti-fog Silver Glass'],
      colors: ['Natural Neem'],
      finishes: ['Natural Oil Finish'],
      tags: ['mirror', 'wall decor', 'neem', 'carved', 'accessories'],
      categorySlug: 'accessories',
      collectionSlugs: ['heritage-collection'],
      sortOrder: 1,
    },
    {
      name: 'Jhoomar Brass Pendant Light',
      slug: 'jhoomar-brass-pendant-light',
      description: 'Inspired by the elaborate chandeliers of Indian palaces, the Jhoomar pendant is hand-fabricated from solid brass with 48 individually shaped petals that cast intricate shadow patterns. Compatible with E27 LED bulbs up to 40W. Includes 1.5m braided copper cable with ceiling rose. Handmade in Moradabad, Uttar Pradesh.',
      shortDesc: 'Hand-fabricated 48-petal brass pendant light. Heritage lighting for extraordinary rooms.',
      price: 38000,
      sku: 'GH-AC-002',
      inStock: true,
      featured: true,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/lamp-1', alt: 'Jhoomar Brass Pendant Light', isPrimary: true },
      ],
      materials: ['Solid Brass', 'Braided Copper Cable'],
      colors: ['Antique Brass', 'Polished Gold'],
      finishes: ['Lacquered Brass'],
      tags: ['lighting', 'pendant', 'brass', 'jhoomar', 'accessories'],
      categorySlug: 'accessories',
      collectionSlugs: ['royal-artisan'],
      sortOrder: 2,
    },
    {
      name: 'Dharohar Dining Chairs (Set of 6)',
      slug: 'dharohar-dining-chairs-set-6',
      description: 'A set of six dining chairs with solid sheesham frames, hand-carved back splats featuring peacock motifs, and seats upholstered in naturally-dyed khadi fabric. The "Dharohar" (heritage) chairs pair perfectly with the Rajwada Dining Table but are equally striking around any dining table. Individually assembled and inspected.',
      shortDesc: 'Set of 6 sheesham dining chairs with peacock carvings and khadi upholstery.',
      price: 220000,
      sku: 'GH-DI-003',
      inStock: true,
      featured: false,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/chairs-1', alt: 'Dharohar Dining Chairs', isPrimary: true },
      ],
      materials: ['Solid Sheesham', 'Naturally-Dyed Khadi Fabric'],
      colors: ['Dark Sheesham', 'Saffron Khadi', 'Ivory Khadi'],
      finishes: ['Wax Polish'],
      tags: ['dining chairs', 'sheesham', 'carved', 'set of 6'],
      categorySlug: 'dining',
      collectionSlugs: ['heritage-collection'],
      sortOrder: 3,
    },
    {
      name: 'Kalandar Study Table',
      slug: 'kalandar-study-table',
      description: 'The Kalandar is a compact yet commanding study table for those working in smaller spaces without compromising on character. A solid mango wood top with hand-painted mandala inset sits above two deep drawers. The hairpin-style brass legs add a modern counterpoint. Complete with matching stool.',
      shortDesc: 'Mango wood study table with mandala inset and brass hairpin legs. Small space, grand character.',
      price: 68000,
      sku: 'GH-HO-003',
      inStock: true,
      featured: false,
      newArrival: true,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/study-table-1', alt: 'Kalandar Study Table', isPrimary: true },
      ],
      materials: ['Mango Wood', 'Solid Brass Legs', 'Hand-Painted Inset'],
      colors: ['Natural Mango', 'Antique Brass'],
      finishes: ['Oil Finish'],
      tags: ['study table', 'home office', 'mango wood', 'compact'],
      categorySlug: 'home-office',
      collectionSlugs: ['modern-luxe'],
      sortOrder: 3,
    },
    {
      name: 'Baagh Outdoor Dining Set',
      slug: 'baagh-outdoor-dining-set',
      description: 'An outdoor dining set designed for the Indian climate. The Baagh (forest) collection features a six-seat dining table and six chairs in FSC-certified teak with stainless steel joinery. The tabletop has a natural teak-oil finish that develops a silver-grey patina over time if left unprotected — or maintain honey teak with our oil kit. Chairs stack for storage.',
      shortDesc: 'FSC-certified teak outdoor dining set for 6. Built for Indian weather, designed for beauty.',
      price: 375000,
      sku: 'GH-OG-002',
      inStock: true,
      featured: false,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/outdoor-set-1', alt: 'Baagh Outdoor Dining Set', isPrimary: true },
      ],
      materials: ['FSC-Certified Teak', 'Marine Grade Stainless Steel'],
      colors: ['Honey Teak', 'Silver Teak'],
      finishes: ['Teak Oil'],
      tags: ['outdoor dining', 'teak', 'garden', 'patio', 'set'],
      categorySlug: 'outdoor-garden',
      collectionSlugs: [],
      sortOrder: 2,
    },
    {
      name: 'Sindhi Ikat Daybed',
      slug: 'sindhi-ikat-daybed',
      description: 'A flowing daybed with solid rosewood frame and a generously padded mattress covered in genuine hand-woven Sindhi ikat fabric with geometric patterns. The slightly reclined back and rolled armrests invite hours of reading. Ideal for bay windows, balconies, or as a dramatic salon centrepiece.',
      shortDesc: 'Rosewood daybed with hand-woven Sindhi ikat upholstery. Afternoon luxury, redefined.',
      price: 145000,
      sku: 'GH-LR-005',
      inStock: true,
      featured: true,
      newArrival: false,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/daybed-1', alt: 'Sindhi Ikat Daybed', isPrimary: true },
      ],
      materials: ['Solid Rosewood', 'Hand-Woven Sindhi Ikat', 'High-Density Foam'],
      colors: ['Indigo Blue', 'Saffron Gold'],
      finishes: ['Natural Oil'],
      tags: ['daybed', 'rosewood', 'ikat', 'lounge', 'living room'],
      categorySlug: 'living-room',
      collectionSlugs: ['royal-artisan'],
      sortOrder: 5,
    },
    {
      name: 'Tara Vanity Table',
      slug: 'tara-vanity-table',
      description: 'An exquisite dressing table inspired by the ornate suites of Raj-era hotels. The Tara vanity features a triptych mirror with hand-carved rosewood frame, a spacious solid walnut tabletop with leather-lined jewelry drawers, and a matching stool upholstered in pale gold silk velvet. This is a morning ritual elevated to an art form.',
      shortDesc: 'Triptych-mirror vanity with rosewood frame and silk velvet stool. Your finest morning ritual.',
      price: 195000,
      sku: 'GH-BE-005',
      inStock: true,
      featured: false,
      newArrival: true,
      images: [
        { url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/furniture/vanity-1', alt: 'Tara Vanity Table', isPrimary: true },
      ],
      materials: ['Solid Rosewood', 'American Walnut', 'Silk Velvet', 'Leather Lining'],
      colors: ['Dark Rosewood', 'Pale Gold Velvet'],
      finishes: ['French Polish'],
      tags: ['vanity', 'dressing table', 'bedroom', 'mirror', 'luxury'],
      categorySlug: 'bedroom',
      collectionSlugs: ['royal-artisan'],
      sortOrder: 5,
    },
  ]

  const productIdMap: Record<string, string> = {}

  for (const pd of productsData) {
    const { categorySlug, collectionSlugs, ...productData } = pd
    const categoryId = categoryMap[categorySlug]

    if (!categoryId) {
      console.warn(`⚠ Category not found: ${categorySlug}`)
      continue
    }

    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        categoryId,
        images: productData.images as object[],
        publishedAt: new Date(),
      },
    })
    productIdMap[product.slug] = product.id

    // Connect to collections
    for (const colSlug of collectionSlugs) {
      const collectionId = collectionMap[colSlug]
      if (collectionId) {
        await prisma.collectionProduct.upsert({
          where: {
            collectionId_productId: {
              collectionId,
              productId: product.id,
            },
          },
          update: {},
          create: {
            collectionId,
            productId: product.id,
          },
        })
      }
    }
  }

  console.log(`✓ ${productsData.length} Products created`)

  // ─── TESTIMONIALS ───────────────────────────────────────────────────────────
  const testimonials = [
    {
      name: 'Ananya Krishnamurti',
      title: 'Interior Designer',
      company: 'Atelier NK, Mumbai',
      content: 'I have sourced furniture from around the world, but Great Houses consistently delivers a quality and depth of craft that international makers simply cannot replicate. The Maharaja Sofa I ordered for a client became the centrepiece of their home — and me a repeat customer.',
      rating: 5,
      featured: true,
      sortOrder: 1,
    },
    {
      name: 'Vikram Singh Rathore',
      title: 'CEO',
      company: 'Heritage Hotels India',
      content: 'We refurbished three of our heritage hotels with Great Houses pieces. The quality is extraordinary — pieces that look even better after two years of heavy use than when they arrived. The craftsmanship honours India\'s traditions while meeting international hospitality standards.',
      rating: 5,
      featured: true,
      sortOrder: 2,
    },
    {
      name: 'Preethi Sundaram',
      title: null,
      company: null,
      content: 'The Padmini four-poster bed was a wedding gift to ourselves. Setting it up was a ceremony in itself. It transforms our bedroom into something out of a Merchant Ivory film. Worth every single rupee, and we would do it again without hesitation.',
      rating: 5,
      featured: true,
      sortOrder: 3,
    },
    {
      name: 'Rohan Malhotra',
      title: 'Architect',
      company: 'Studio Malhotra, Delhi',
      content: 'Great Houses understands that furniture is architecture at a smaller scale. Their pieces have structural integrity, thoughtful proportions, and an honesty of materials that I rarely find in Indian furniture. My clients have come to expect Great Houses recommendations in my design projects.',
      rating: 5,
      featured: false,
      sortOrder: 4,
    },
    {
      name: 'Kavitha Nair',
      title: null,
      company: null,
      content: 'Ordered the Kerala Spice Arch Bookcase for our new home. Communication throughout was excellent, delivery was on schedule, and the bookcase arrived perfectly packed. It is even more beautiful in person than the photographs. Our only regret: not buying more pieces at once.',
      rating: 5,
      featured: false,
      sortOrder: 5,
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }
  console.log('✓ Testimonials created')

  // ─── TEAM MEMBERS ───────────────────────────────────────────────────────────
  const teamMembers = [
    {
      name: 'Rajiv Mehta',
      role: 'Founder & Creative Director',
      bio: 'Rajiv spent fifteen years studying furniture traditions across Rajasthan, Kerala, Karnataka, and Bengal before founding Great Houses India. His vision: to create a contemporary luxury brand that gives Indian craft its rightful place on the world stage.',
      sortOrder: 1,
      visible: true,
    },
    {
      name: 'Sunita Balakrishnan',
      role: 'Head of Craftsmanship',
      bio: 'A graduate of NID Ahmedabad, Sunita oversees relationships with our network of 50+ master craftsmen. She travels quarterly to every workshop to maintain quality standards and ensure each artisan is compensated fairly and supported in developing their craft.',
      sortOrder: 2,
      visible: true,
    },
    {
      name: 'Arjun Sehgal',
      role: 'Head of Design',
      bio: 'Trained at the Royal College of Art, London, Arjun brings an international design perspective to Great Houses. His process begins with ethnographic research in Indian homes, extracting living traditions to inform contemporary furniture that genuinely fits Indian life.',
      sortOrder: 3,
      visible: true,
    },
    {
      name: 'Dr. Meera Patel',
      role: 'Sustainability Director',
      bio: 'A materials scientist by training, Meera ensures every Great Houses piece meets our sustainability commitments: FSC-certified timber, zero-VOC finishes, and fair trade partnerships. Under her leadership, Great Houses achieved B-Corp certification in 2023.',
      sortOrder: 4,
      visible: true,
    },
  ]

  for (const tm of teamMembers) {
    await prisma.teamMember.create({ data: tm })
  }
  console.log('✓ Team members created')

  // ─── PAGES WITH SECTIONS ────────────────────────────────────────────────────

  // HOME PAGE
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      title: 'Home',
      slug: 'home',
      metaTitle: 'Great Houses India | Luxury Handcrafted Indian Furniture',
      metaDesc: 'Discover handcrafted luxury furniture inspired by India\'s extraordinary heritage. Great Houses India — Crafted for the Extraordinary.',
      published: true,
      publishedAt: new Date(),
      sections: {
        create: [
          {
            type: 'HERO_BANNER',
            label: 'Homepage Hero',
            sortOrder: 1,
            visible: true,
            content: {
              headline: 'Crafted for the Extraordinary',
              subheadline: 'Luxury Indian furniture by master craftsmen — where heritage meets the contemporary home',
              cta1: { label: 'Explore the Collection', url: '/shop', style: 'filled' },
              cta2: { label: 'Our Story', url: '/our-story', style: 'outline' },
              backgroundType: 'image',
              backgroundImage: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/landscapes/nature-mountains',
              overlayColor: '#1a1a1a',
              overlayOpacity: 50,
              textPosition: 'middle-center',
              minHeight: '100vh',
              textColor: '#ffffff',
            },
            styles: { paddingTop: 0, paddingBottom: 0 },
          },
          {
            type: 'STATS_COUNTER',
            label: 'Brand Stats',
            sortOrder: 2,
            visible: true,
            content: {
              items: [
                { prefix: '', number: '25', suffix: '+', label: 'Years of Craft' },
                { prefix: '', number: '5000', suffix: '+', label: 'Homes Furnished' },
                { prefix: '', number: '50', suffix: '+', label: 'Master Craftsmen' },
                { prefix: '', number: '15', suffix: '+', label: 'Design Awards' },
              ],
              animatedCountUp: true,
              columns: 4,
            },
            styles: { backgroundColor: '#f5f0e8', paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'FEATURED_PRODUCTS',
            label: 'Featured Products',
            sortOrder: 3,
            visible: true,
            content: {
              sectionTitle: 'Our Signature Pieces',
              sectionSubtitle: 'Each piece a collaboration between heritage and the extraordinary',
              autoSelectBy: 'featured',
              layout: '4-col',
              showPrice: true,
              showInquiryButton: true,
              maxItems: 8,
            },
            styles: { paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'IMAGE_TEXT_SPLIT',
            label: 'Brand Story',
            sortOrder: 4,
            visible: true,
            content: {
              image: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/people/kitchen-bar.jpg',
              imageAlt: 'Master craftsman at work',
              imagePosition: 'left',
              imageAspectRatio: '4:3',
              heading: 'Where Every Piece Has a Story',
              body: '<p>Great Houses India was founded on a simple belief: that the extraordinary craftsmanship of Indian artisans deserves a home in the world\'s finest interiors.</p><p>Each piece in our collection is a collaboration — between the designer\'s vision, the craftsman\'s hands, and centuries of living tradition. We work exclusively with master artisans from Rajasthan, Kerala, Karnataka, and Bengal, paying living wages and investing in passing knowledge to the next generation.</p>',
              cta: { label: 'Read Our Story', url: '/our-story', style: 'outline' },
              verticalAlign: 'center',
            },
            styles: { paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'COLLECTION_SHOWCASE',
            label: 'Collections',
            sortOrder: 5,
            visible: true,
            content: {
              sectionTitle: 'Our Collections',
              layout: 'featured',
            },
            styles: { backgroundColor: '#f5f0e8', paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'TESTIMONIALS_CAROUSEL',
            label: 'Customer Stories',
            sortOrder: 6,
            visible: true,
            content: {
              showAllFeatured: true,
              layout: 'carousel',
              showAvatar: true,
              showRating: true,
              showCompany: true,
              autoplay: true,
              autoplayInterval: 6,
            },
            styles: { paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'NEWSLETTER_SIGNUP',
            label: 'Newsletter',
            sortOrder: 7,
            visible: true,
            content: {
              headline: 'Join the Great Houses Circle',
              subtext: 'Exclusive access to new collections, artisan stories, and invitations to private events',
              placeholder: 'Your email address',
              buttonLabel: 'Join the Circle',
            },
            styles: { backgroundColor: '#1a1a1a', textColor: '#ffffff', paddingTop: 80, paddingBottom: 80 },
          },
        ],
      },
    },
  })

  // ABOUT PAGE
  const aboutPage = await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      title: 'Our Story',
      slug: 'about',
      metaTitle: 'Our Story | Great Houses India',
      metaDesc: 'The story behind Great Houses India — 25 years of championing Indian craft, supporting master artisans, and furnishing the homes of the extraordinary.',
      published: true,
      publishedAt: new Date(),
      sections: {
        create: [
          {
            type: 'HERO_BANNER',
            label: 'About Hero',
            sortOrder: 1,
            visible: true,
            content: {
              headline: 'Our Story',
              subheadline: 'Twenty-five years of championing India\'s extraordinary craft heritage',
              backgroundType: 'image',
              backgroundImage: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/landscapes/architecture-signs.jpg',
              overlayColor: '#1a1a1a',
              overlayOpacity: 55,
              textPosition: 'middle-center',
              minHeight: '60vh',
              textColor: '#ffffff',
            },
            styles: { paddingTop: 0, paddingBottom: 0 },
          },
          {
            type: 'TEXT_CONTENT',
            label: 'Founding Story',
            sortOrder: 2,
            visible: true,
            content: {
              richText: '<h2>Born from Belief</h2><p>In 1999, Rajiv Mehta walked into a furniture store in London and saw a hand-carved cabinet being sold as "Indian craft". It was machine-made in a factory. The real thing — the heirloom-quality work of master craftsmen in Rajasthan and Kerala — was nowhere to be seen.</p><p>He came home to Hyderabad and started Great Houses: a small workshop, three master craftsmen, and a conviction that India\'s finest furniture belonged in India\'s finest homes.</p><p>Twenty-five years later, we work with over 50 artisan families, have furnished more than 5,000 homes across India, and have been recognized internationally for our commitment to craft, sustainability, and design excellence.</p>',
              maxWidth: '768px',
              textAlign: 'left',
            },
            styles: { paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'STATS_COUNTER',
            label: 'About Stats',
            sortOrder: 3,
            visible: true,
            content: {
              items: [
                { number: '1999', suffix: '', label: 'Founded' },
                { number: '50', suffix: '+', label: 'Artisan Families' },
                { number: '5000', suffix: '+', label: 'Homes Furnished' },
                { number: '2023', suffix: '', label: 'B-Corp Certified' },
              ],
              animatedCountUp: true,
              columns: 4,
            },
            styles: { backgroundColor: '#f5f0e8', paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'TEAM_GRID',
            label: 'Our Team',
            sortOrder: 4,
            visible: true,
            content: {
              sectionTitle: 'The People Behind the Craft',
              showAllVisible: true,
              columns: 4,
              showRole: true,
              showBio: true,
              showSocials: false,
            },
            styles: { paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'IMAGE_TEXT_SPLIT',
            label: 'Craftsmanship Story',
            sortOrder: 5,
            visible: true,
            content: {
              image: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/people/bicycle.jpg',
              imageAlt: 'Artisan hands at work',
              imagePosition: 'right',
              imageAspectRatio: '4:3',
              heading: 'The Hands Behind Each Piece',
              body: '<p>Every Great Houses piece is made by hand, by name. We know every craftsman in our network — their story, their specialty, their family. When you buy from us, you are not just acquiring furniture. You are becoming part of a tradition.</p><p>We insist on living wages, safe working conditions, and apprenticeship programmes that pass craft knowledge to the next generation. Because extraordinary furniture can only come from extraordinary people who have the space and support to do their finest work.</p>',
              cta: { label: 'Meet Our Artisans', url: '/our-story', style: 'outline' },
              verticalAlign: 'center',
            },
            styles: { paddingTop: 80, paddingBottom: 80 },
          },
        ],
      },
    },
  })

  // COLLECTIONS PAGE
  const collectionsPage = await prisma.page.upsert({
    where: { slug: 'collections' },
    update: {},
    create: {
      title: 'Collections',
      slug: 'collections',
      metaTitle: 'Our Collections | Great Houses India',
      metaDesc: 'Explore our curated furniture collections — Heritage, Modern Luxe, and Royal Artisan — each a world of Indian luxury.',
      published: true,
      publishedAt: new Date(),
      sections: {
        create: [
          {
            type: 'HERO_BANNER',
            label: 'Collections Hero',
            sortOrder: 1,
            visible: true,
            content: {
              headline: 'Our Collections',
              subheadline: 'Three worlds of Indian luxury — each a complete vision for the extraordinary home',
              backgroundType: 'color',
              backgroundColor: '#f5f0e8',
              textPosition: 'middle-center',
              minHeight: '50vh',
              textColor: '#1a1a1a',
            },
            styles: { paddingTop: 0, paddingBottom: 0 },
          },
          {
            type: 'COLLECTION_SHOWCASE',
            label: 'All Collections',
            sortOrder: 2,
            visible: true,
            content: {
              layout: 'grid',
            },
            styles: { paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'NEWSLETTER_SIGNUP',
            label: 'Collections Newsletter',
            sortOrder: 3,
            visible: true,
            content: {
              headline: 'Be the First to Know',
              subtext: 'New collections, exclusive pieces, and artisan stories delivered to your inbox',
              placeholder: 'Your email address',
              buttonLabel: 'Subscribe',
            },
            styles: { backgroundColor: '#1a1a1a', textColor: '#ffffff', paddingTop: 80, paddingBottom: 80 },
          },
        ],
      },
    },
  })

  // CONTACT PAGE
  const contactPage = await prisma.page.upsert({
    where: { slug: 'contact' },
    update: {},
    create: {
      title: 'Contact',
      slug: 'contact',
      metaTitle: 'Contact Us | Great Houses India',
      metaDesc: 'Get in touch with Great Houses India. Visit our showroom in Hyderabad or speak to our furniture consultants.',
      published: true,
      publishedAt: new Date(),
      sections: {
        create: [
          {
            type: 'HERO_BANNER',
            label: 'Contact Hero',
            sortOrder: 1,
            visible: true,
            content: {
              headline: 'Let\'s Create Something Beautiful',
              subheadline: 'Speak to our design consultants about your vision for the perfect home',
              backgroundType: 'color',
              backgroundColor: '#1a1a1a',
              textPosition: 'middle-center',
              minHeight: '50vh',
              textColor: '#ffffff',
            },
            styles: { paddingTop: 0, paddingBottom: 0 },
          },
          {
            type: 'CONTACT_FORM',
            label: 'Contact Form',
            sortOrder: 2,
            visible: true,
            content: {
              headline: 'Send Us a Message',
              subtext: 'We respond to all enquiries within one business day',
              showPhone: true,
              showSubject: true,
              showProductInquiry: true,
              submitLabel: 'Send Message',
              successMessage: 'Thank you for reaching out. A Great Houses consultant will be in touch within 24 hours.',
            },
            styles: { paddingTop: 80, paddingBottom: 80 },
          },
          {
            type: 'IMAGE_TEXT_SPLIT',
            label: 'Showroom Info',
            sortOrder: 3,
            visible: true,
            content: {
              image: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/samples/landscapes/city-montage.jpg',
              imageAlt: 'Great Houses Showroom',
              imagePosition: 'right',
              imageAspectRatio: '4:3',
              heading: 'Visit Our Showroom',
              body: '<p><strong>Great Houses India Flagship</strong><br>12, Jubilee Hills<br>Hyderabad, Telangana 500033</p><p><strong>Open:</strong> Monday – Saturday, 10am – 7pm<br><strong>Sunday:</strong> 11am – 5pm (by appointment)</p><p><strong>Phone:</strong> +91 98765 43210<br><strong>Email:</strong> hello@greathouses.in</p>',
              verticalAlign: 'center',
            },
            styles: { backgroundColor: '#f5f0e8', paddingTop: 80, paddingBottom: 80 },
          },
        ],
      },
    },
  })

  console.log('✓ Pages and sections created:', homePage.slug, aboutPage.slug, collectionsPage.slug, contactPage.slug)
  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📧 Admin login: admin@greathouses.in / Admin@123')
  console.log('📧 Editor login: editor@greathouses.in / Editor@123')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
