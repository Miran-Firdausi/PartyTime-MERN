import Link from 'next/link';
import styles from '@/styles/hero.module.css'; // Import the CSS file

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <div>
          <h1>Craving delicious party snacks?</h1>
          <p>We've got the flavors you love at prices that make celebrating even sweeter</p>
        <Link href="/store"><button className={styles.btn}>Explore Now</button></Link>
        </div>
        <div className={styles.heroImage}>
          <img src="/images/hero-image.png" alt="Hero Image" width={400} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
