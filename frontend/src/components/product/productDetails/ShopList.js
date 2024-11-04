import styles from '@/styles/product/productInfo/ShopList.module.css'
import ShopItem from './ShopItem'

const shops = [
    {
      name: "Samrat Super Market",
      location: "Symbiosis Campus",
      rating: 4.5,
      opensAt: "8:00",
      closesAt: "21:00",
      imageUrl: "https://content.jdmagicbox.com/comp/vaishali/k5/9999p6225.6225.180913071927.d7k5/catalogue/samrat-general-store-and-garments-vaishali-v8ncacxwab.jpg",
      distance: "400m"
    },
    {
      name: "Greenland Groceries",
      location: "Near City Park",
      rating: 4.2,
      opensAt: "8:00",
      closesAt: "21:00",
      imageUrl: "https://content.jdmagicbox.com/comp/pune/m8/020pxx20.xx20.151208082303.q8m8/catalogue/d-mart-royal-heritage-mall--mohamadwadi-pune-supermarkets-31r2v.jpg",
      distance: "1.5km"
    },
    {
      name: "Fresh Mart",
      location: "Downtown Plaza",
      rating: 4,
      opensAt: "7:30",
      closesAt: "23:00",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC88vW6zN-Pd3VeZ_Jr_7MUW5F2rB3J0O8KiZ5Lo2ZvQ&s",
      distance: "800m"
    },
    {
      name: "Sunshine Supermarket",
      location: "Sunrise Avenue",
      rating: 3.5,
      opensAt: "10:00",
      closesAt: "20:00",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhhbbmjnfu1YQtbSwUg-OvQ0Wi-RaWvbG7bqmLSlikA&s",
      distance: "2.3km"
    },
    {
      name: "Organic Oasis",
      location: "Greenway Street",
      rating: 3,
      opensAt: "9:00",
      closesAt: "12:00",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDlmeeuXxjiMO6k5ZFjBNgQ6FlOu54UhojKxM-h74R7g&s",
      distance: "1.2km"
    }
    // Add more shops here if needed
  ];
  

export default function ShopList(){
    return (
        <div className={styles.OuterContainer}>
            <h2 className={styles.title}>Sellers near you</h2>
            <div className={styles.List}>
                {shops.map((shop, index) => (
                    <ShopItem
                    key={index}
                    name={shop.name}
                    location={shop.location}
                    rating={shop.rating}
                    opensAt={shop.opensAt}
                    closesAt={shop.closesAt}
                    imageUrl={shop.imageUrl}
                    distance={shop.distance}
                    />
                ))}
            </div>
        </div>
    )
}