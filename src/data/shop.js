export const shop = {
  name: 'Meetu Clothes',
  phone: '+91 81760 91991',
  phoneHref: 'tel:+918176091991',
  address: ['Maharshi Balmiki Nagar', 'Subedar Nagar, Uttar Pradesh 209217'],
  locality: 'Bithoor, Kanpur',
  instagram: 'https://www.instagram.com/meetu_clothes/',
  instagramHandle: '@meetu_clothes',
  map: 'https://www.google.com/maps/search/?api=1&query=26.601928%2C80.272251',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=26.601928%2C80.272251',
  coordinates: { latitude: 26.601928, longitude: 80.272251 },
};

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: shop.name,
  telephone: '+918176091991',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Maharshi Balmiki Nagar, Subedar Nagar',
    addressLocality: 'Bithoor, Kanpur',
    addressRegion: 'Uttar Pradesh',
    postalCode: '209217',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', ...shop.coordinates },
  hasMap: shop.map,
  sameAs: [shop.instagram],
};
