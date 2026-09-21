import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ 
            backgroundColor: "#ffffff", 
            borderTop: "1px solid #e6e6e6", 
            padding: "70px 60px 50px 60px",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            color: "#1a1a1a"
        }}>
            <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
                
                {/* 4 COLUMNS GRID */}
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
                    gap: "40px",
                    marginBottom: "70px"
                }}>
                    
                    {/* CỘT 1: HELP */}
                    <div>
                        <h4 style={{ 
                            fontSize: "11px", 
                            fontWeight: "700", 
                            letterSpacing: "1.5px", 
                            textTransform: "uppercase", 
                            marginBottom: "22px",
                            color: "#111"
                        }}>
                            HELP
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px", lineHeight: "2.2", color: "#333" }}>
                            <li>
                                You can <Link to="/contact" style={{ color: "#111", textDecoration: "underline" }}>call</Link> or <Link to="/contact" style={{ color: "#111", textDecoration: "underline" }}>email us</Link>
                            </li>
                            <li><Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>FAQ's</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Product Care</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Stores</Link></li>
                        </ul>
                    </div>

                    {/* CỘT 2: SERVICES */}
                    <div>
                        <h4 style={{ 
                            fontSize: "11px", 
                            fontWeight: "700", 
                            letterSpacing: "1.5px", 
                            textTransform: "uppercase", 
                            marginBottom: "22px",
                            color: "#111"
                        }}>
                            SERVICES
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px", lineHeight: "2.2", color: "#333" }}>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Repairs</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Personalization</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Art of Gifting</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Download our Apps</Link></li>
                        </ul>
                    </div>

                    {/* CỘT 3: ABOUT THE SEA */}
                    <div>
                        <h4 style={{ 
                            fontSize: "11px", 
                            fontWeight: "700", 
                            letterSpacing: "1.5px", 
                            textTransform: "uppercase", 
                            marginBottom: "22px",
                            color: "#111"
                        }}>
                            ABOUT THE SEA
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px", lineHeight: "2.2", color: "#333" }}>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Fashion Shows</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Arts & Culture</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>La Maison</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Sustainability</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Latest News</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Ethics and Compliance</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Careers</Link></li>
                            <li><Link to="/homepage" style={{ color: "inherit", textDecoration: "none" }}>Foundation The Sea</Link></li>
                        </ul>
                    </div>

                    {/* CỘT 4: EMAIL SIGN-UP */}
                    <div>
                        <h4 style={{ 
                            fontSize: "11px", 
                            fontWeight: "700", 
                            letterSpacing: "1.5px", 
                            textTransform: "uppercase", 
                            marginBottom: "22px",
                            color: "#111"
                        }}>
                            EMAIL SIGN-UP
                        </h4>
                        <p style={{ fontSize: "13px", lineHeight: "1.7", color: "#444", margin: "0 0 16px 0" }}>
                            <Link to="/contact" style={{ color: "#111", textDecoration: "underline" }}>Sign up</Link> for The Sea emails and receive the latest news from the Maison, including exclusive online pre-launches and new collections.
                        </p>
                        <div style={{ marginTop: "20px" }}>
                            <span style={{ fontSize: "13px", color: "#222", fontWeight: "500" }}>Follow Us</span>
                            <div style={{ display: "flex", gap: "16px", marginTop: "12px", alignItems: "center" }}>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "none" }} title="Instagram">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "none" }} title="Facebook">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "none" }} title="YouTube">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* BOTTOM ROW: COUNTRY & LINKS */}
                <div style={{ 
                    borderTop: "1px solid #f0f0f0", 
                    paddingTop: "24px",
                    display: "flex", 
                    flexWrap: "wrap", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    gap: "20px",
                    fontSize: "12px",
                    color: "#555"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span>International (English)</span>
                    </div>

                    <div style={{ display: "flex", gap: "28px" }}>
                        <Link to="/homepage" style={{ color: "#555", textDecoration: "none" }}>Sitemap</Link>
                        <Link to="/homepage" style={{ color: "#555", textDecoration: "none" }}>Legal & privacy</Link>
                        <Link to="/homepage" style={{ color: "#555", textDecoration: "none" }}>Cookies</Link>
                    </div>
                </div>

                {/* CENTERED BIG BRAND LOGO */}
                <div style={{ textAlign: "center", marginTop: "55px", marginBottom: "15px" }}>
                    <Link to="/homepage" style={{ 
                        textDecoration: "none", 
                        color: "#111111", 
                        fontSize: "28px", 
                        fontFamily: "'Playfair Display', serif", 
                        letterSpacing: "4px", 
                        textTransform: "uppercase",
                        fontWeight: "500",
                        display: "inline-block"
                    }}>
                        THE SEA
                    </Link>
                </div>

            </div>
        </footer>
    );
};

export default Footer;