// Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h4 style={styles.heading}>About Us</h4>
          <p style={styles.text}>
            We provide premium office spaces for rent, tailored to meet your
            business needs.
          </p>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Us</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>Email: info@office-rentals.com</li>
            <li style={styles.listItem}>Phone: +1 123 456 789</li>
            <li style={styles.listItem}>
              Address: 123 Business St., City, Country
            </li>
          </ul>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              FB
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              TW
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              LN
            </a>
          </div>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p style={styles.bottomText}>
          &copy; {new Date().getFullYear()} Office Rentals. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: "#121c90",
    color: "#fff",
    padding: "40px 20px",
    fontSize: "14px",
    borderRadius: "20px 20px 0 0",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  section: {
    flex: "1",
    margin: "10px",
    minWidth: "250px",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "15px",
  },
  text: {
    lineHeight: "1.6",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "10px",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  icon: {
    color: "#fff",
    textDecoration: "none",
    border: "1px solid #fff",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    transition: "0.3s",
  },
  bottomBar: {
    marginTop: "20px",
    borderTop: "1px solid #fff",
    paddingTop: "10px",
    textAlign: "center",
  },
  bottomText: {
    margin: 0,
  },
};

export default Footer;
