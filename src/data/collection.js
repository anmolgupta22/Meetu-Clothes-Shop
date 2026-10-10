export const photo = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const categories = [
  { slug: 'suits', name: 'Women’s suits', shortName: 'Suits', eyebrow: 'A LITTLE COLOUR', description: 'Explore ready-made suits for everyday dressing and occasions. Discover the designs, colours and fits at our shop.', image: '/images/style-dress.jpg', thumbnail: '/images/style-dress-small.jpg', imageWidth: 1200, source: photo('photo-1585487000160-6ebcfceb0d03'), fallback: '/images/suits.svg' },
  { slug: 'girls-wear', name: 'Girls’ wear', shortName: 'Girls’ wear', eyebrow: 'LITTLE EVERYDAY JOYS', description: 'Discover clothing for girls, from easy everyday outfits to something a little special. Ask in store about current sizes and designs.', image: '/images/style-girls-dress.jpg', thumbnail: '/images/style-girls-dress-small.jpg', imageWidth: 1000, source: photo('photo-1519457431-44ccd64a579b'), fallback: '/images/girls.svg' },
  { slug: 'shirts', name: 'Shirts & casuals', shortName: 'Shirts', eyebrow: 'EFFORTLESS EVERYDAY', description: 'Casual shirts and everyday dressing, all in one place. Visit us to feel the fabrics and find your fit.', image: '/images/style-shirts.jpg', thumbnail: '/images/style-shirts-small.jpg', imageWidth: 1200, source: photo('photo-1596755094514-f87e34085b2c'), fallback: '/images/shirts.svg' },
  { slug: 'denim', name: 'Jeans & trousers', shortName: 'Jeans & trousers', eyebrow: 'YOUR GO-TO PAIR', description: 'Explore denim and trousers for your everyday wardrobe. See the available styles and sizes in person.', image: '/images/style-denim.jpg', thumbnail: '/images/style-denim-small.jpg', imageWidth: 1200, source: photo('photo-1542272604-787c3835535d'), fallback: '/images/denim.svg' },
  { slug: 'innerwear', name: 'Innerwear', shortName: 'Innerwear', eyebrow: 'THE DAILY ESSENTIALS', description: 'Find innerwear and everyday essentials at the shop. Call or visit us for current options, sizes and availability.', image: null, fallback: '/images/innerwear.svg' },
  { slug: 'basics', name: 'Everyday basics', shortName: 'Basics & more', eyebrow: 'SIMPLY YOUR STYLE', description: 'Easy wardrobe basics to bring your everyday outfits together. Discover more when you visit Meetu Clothes.', image: '/images/style-basics.jpg', thumbnail: '/images/style-basics-small.jpg', imageWidth: 1200, source: photo('photo-1521572163474-6864f9cf17ab'), fallback: '/images/basics.svg' },
];

// These are explicitly illustrative styles, not a live stock catalogue.
// Add only owner-verified details when replacing images with actual inventory.
export const styles = [
  { id: 'suit-edit', category: 'suits', title: 'The everyday suit edit', subtitle: 'Colour, comfort & your own style', tags: ['women', 'suit', 'ready-made', 'ethnic'], image: categories[0].image, thumbnail: categories[0].thumbnail, imageWidth: categories[0].imageWidth, source: categories[0].source, fallback: '/images/suits.svg', isInspiration: true },
  { id: 'shirt-edit', category: 'shirts', title: 'An easy shirt day', subtitle: 'A wardrobe classic', tags: ['men', 'shirt', 'casual', 'button'], image: categories[2].image, thumbnail: categories[2].thumbnail, imageWidth: categories[2].imageWidth, source: categories[2].source, fallback: '/images/shirts.svg', isInspiration: true },
  { id: 'denim-edit', category: 'denim', title: 'Denim, day after day', subtitle: 'Your favourite kind of everyday', tags: ['men', 'women', 'jeans', 'pants', 'denim'], image: categories[3].image, thumbnail: categories[3].thumbnail, imageWidth: categories[3].imageWidth, source: categories[3].source, fallback: '/images/denim.svg', isInspiration: true },
  { id: 'girls-edit', category: 'girls-wear', title: 'Little moments of style', subtitle: 'Clothes for growing personalities', tags: ['girls', 'kids', 'dress', 'children'], image: categories[1].image, thumbnail: categories[1].thumbnail, imageWidth: categories[1].imageWidth, source: categories[1].source, fallback: '/images/girls.svg', isInspiration: true },
  { id: 'essentials-edit', category: 'innerwear', title: 'Comfort comes first', subtitle: 'The essentials underneath it all', tags: ['underwear', 'innerwear', 'essentials'], image: null, fallback: '/images/innerwear.svg', isInspiration: true },
  { id: 'basics-edit', category: 'basics', title: 'Back to the good basics', subtitle: 'Simple pieces, endless possibilities', tags: ['tshirt', 't-shirt', 'tee', 'casual', 'basics'], image: categories[5].image, thumbnail: categories[5].thumbnail, imageWidth: categories[5].imageWidth, source: categories[5].source, fallback: '/images/basics.svg', isInspiration: true },
];

export function filterStyles(category = 'all', query = '') {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return styles.filter(item => {
    const categoryInfo = categories.find(c => c.slug === item.category);
    const text = [item.title, item.subtitle, categoryInfo.name, ...item.tags].join(' ').toLocaleLowerCase();
    return (category === 'all' || item.category === category) && words.every(word => text.includes(word));
  });
}
