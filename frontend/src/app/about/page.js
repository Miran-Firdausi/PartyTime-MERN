// AboutPage.js
import React from 'react';
import styles from '@/styles/about.module.css';

const AboutPage = () => {
  return (
    <div className={styles.outerAboutPage}>
      <div className={styles.aboutPage}>
      <h1>About PartyTime</h1>
      <p>In the contemporary retail landscape, a pressing challenge emerges from the imminent expiration of perishable goods, resulting in economic losses for shopkeepers and missed opportunities for consumers seeking discounted products. Simultaneously, the event planning sector encounters obstacles in efficiently procuring large quantities of supplies. Addressing this dual challenge, our proposed solution introduces an innovative e-commerce platform that seamlessly connects surplus perishable items nearing expiration with the demand for bulk orders for parties and events. This platform not only mitigates economic losses for shopkeepers but also offers event planners and hosts a dedicated space to conveniently purchase a wide array of supplies, including discounted perishable goods, party-related items, and non-perishable snacks. By providing a comprehensive solution for both challenges, our platform aims to reduce food waste, optimize party planning processes, and create a mutually beneficial ecosystem for shopkeepers and consumers alike.</p>
    </div>
    </div>
  );
};

export default AboutPage;
