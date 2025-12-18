import React from "react";
import Logo from "../ui/Logo/Logo"; // adjust path if needed
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        {/* Example left content — change as needed */}
        <span className={styles.brand}>My Site</span>
      </div>

      <div className={styles.right}>
        {/* Button with the logo on the left */}
        <button className={styles.ctaButton} type="button" aria-label="Open app">
          <span className={styles.logoWrap} aria-hidden="true">
            {/* Pass width/height to the Logo to control sizing */}
            <Logo width={24} height={24} />
          </span>
          <span className={styles.buttonText}>Open App</span>
        </button>
      </div>
    </footer>
  );
}
