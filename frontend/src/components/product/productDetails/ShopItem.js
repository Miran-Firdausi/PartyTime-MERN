import ReactStars from 'react-stars';
import styles from '@/styles/product/productInfo/ShopItem.module.css';

export default function ShopItem({ name, location, rating, opensAt, closesAt, imageUrl, distance }) {
  const isOpenNow = () => {
    const currentTime = new Date();
    const openingTime = parseTime(opensAt);
    const closingTime = parseTime(closesAt);

    return currentTime >= openingTime && currentTime < closingTime;
  };

  const parseTime = (time) => {
    const parts = time.split(/[:\s]/);
    let hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const period = parts[2];

    if (period === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }

    return new Date().setHours(hours, minutes);
  };

  const isOpen = isOpenNow();

  return (
    <div className={styles.OuterContainer}>
      <div className={styles.ShopDetails}>
        <h3>{name}</h3>
        <p>{location}</p>
        <div className={styles.Rating}>
          <p>{rating}</p>
          <ReactStars
            edit={false}
            value={rating}
            count={5}
            size={20}
            color2={'#f0cc00'}
          />
        </div>
        <div className={styles.ShopInfo}>
          <p className={isOpen ? styles.Open : styles.Closed}>{isOpen ? 'Open' : 'Closed'}</p>
          {isOpen && <p className={styles.Closes}>Closes at {closesAt}</p>}
          {!isOpen && <p className={styles.Opens}>Opens at {opensAt}</p>}
        </div>
      </div>
      <div className={styles.ShopImage}>
        <div>
          <img src={imageUrl} alt="Shop Image" />
        </div>
        <p className={styles.Distance}>{distance}</p>
      </div>
    </div>
  );
}
