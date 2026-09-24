import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [showRegionModal, setShowRegionModal] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState({ country: "Việt Nam", lang: "Tiếng Việt" });
    const [saveNotice, setSaveNotice] = useState(false);

    const regions = [
        { country: "Việt Nam", lang: "Tiếng Việt", code: "VN" },
        { country: "International", lang: "English", code: "INT" },
        { country: "France", lang: "Français", code: "FR" },
        { country: "United States", lang: "English", code: "US" },
        { country: "Japan (日本)", lang: "日本語", code: "JP" },
        { country: "Singapore", lang: "English", code: "SG" }
    ];

    const linkStyle = {
        color: "#333",
        textDecoration: "none",
        transition: "color 0.25s ease, transform 0.2s ease",
        display: "inline-block"
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.color = "#bfa15f";
        e.currentTarget.style.transform = "translateX(3px)";
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.color = "#333";
        e.currentTarget.style.transform = "translateX(0)";
    };

    const bottomLinkHover = (e, enter) => {
        e.currentTarget.style.color = enter ? "#111" : "#555";
        e.currentTarget.style.textDecoration = enter ? "underline" : "none";
    };

    const handleSelectRegion = (reg) => {
        setSelectedRegion(reg);
        setSaveNotice(true);
        setTimeout(() => {
            setSaveNotice(false);
            setShowRegionModal(false);
        }, 1200);
    };

    return (
        <footer style={{ 
            backgroundColor: "#ffffff", 
            borderTop: "1px solid #e6e6e6", 
            padding: "70px 60px 50px 60px",
            fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13.5px", lineHeight: "2.3" }}>
                            <li>
                                You can <Link to="/contact" style={{ color: "#111", textDecoration: "underline", fontWeight: "500" }}>call</Link> or <Link to="/contact-mail" style={{ color: "#111", textDecoration: "underline", fontWeight: "500" }}>email us</Link>
                            </li>
                            <li>
                                <Link to="/faq" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    FAQ's
                                </Link>
                            </li>
                            <li>
                                <Link to="/product-care" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Product Care
                                </Link>
                            </li>
                            <li>
                                <Link to="/stores" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Stores
                                </Link>
                            </li>
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
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13.5px", lineHeight: "2.3" }}>
                            <li>
                                <Link to="/services/repairs" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Repairs
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/personalization" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Personalization
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/gifting" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Art of Gifting
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/apps" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Download our Apps
                                </Link>
                            </li>
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
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13.5px", lineHeight: "2.3" }}>
                            <li>
                                <Link to="/about/fashion-shows" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Fashion Shows
                                </Link>
                            </li>
                            <li>
                                <Link to="/about/arts-culture" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Arts & Culture
                                </Link>
                            </li>
                            <li>
                                <Link to="/about/la-maison" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    La Maison
                                </Link>
                            </li>
                            <li>
                                <Link to="/about/sustainability" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Sustainability
                                </Link>
                            </li>
                            <li>
                                <Link to="/about/news" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Latest News
                                </Link>
                            </li>
                            <li>
                                <Link to="/about/ethics-compliance" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Ethics and Compliance
                                </Link>
                            </li>
                            <li>
                                <Link to="/about/careers" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/about/foundation" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    Foundation The Sea
                                </Link>
                            </li>
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
                        <p style={{ fontSize: "13.5px", lineHeight: "1.8", color: "#444", margin: "0 0 18px 0" }}>
                            <Link to="/newsletter" style={{ color: "#111", textDecoration: "underline", fontWeight: "600" }}>Sign up</Link> for The Sea emails and receive the latest news from the Maison, including exclusive online pre-launches and new collections.
                        </p>
                        <div style={{ marginTop: "22px" }}>
                            <span style={{ fontSize: "13px", color: "#222", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Follow Us</span>
                            <div style={{ display: "flex", gap: "16px", marginTop: "12px", alignItems: "center" }}>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "none", transition: "color 0.2s" }} title="Instagram" onMouseEnter={(e) => e.currentTarget.style.color="#bfa15f"} onMouseLeave={(e) => e.currentTarget.style.color="#111"}>
                                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "none", transition: "color 0.2s" }} title="Facebook" onMouseEnter={(e) => e.currentTarget.style.color="#bfa15f"} onMouseLeave={(e) => e.currentTarget.style.color="#111"}>
                                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "none", transition: "color 0.2s" }} title="YouTube" onMouseEnter={(e) => e.currentTarget.style.color="#bfa15f"} onMouseLeave={(e) => e.currentTarget.style.color="#111"}>
                                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
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
                    fontSize: "12.5px",
                    color: "#555"
                }}>
                    {/* Region Selector Button */}
                    <div 
                        onClick={() => setShowRegionModal(true)}
                        style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", transition: "color 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#111"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#555"}
                        title="Thay đổi quốc gia / ngôn ngữ"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span style={{ borderBottom: "1px dotted #888" }}>
                            {selectedRegion.country} ({selectedRegion.lang})
                        </span>
                    </div>

                    <div style={{ display: "flex", gap: "28px" }}>
                        <Link to="/sitemap" style={{ color: "#555", textDecoration: "none" }} onMouseEnter={(e) => bottomLinkHover(e, true)} onMouseLeave={(e) => bottomLinkHover(e, false)}>
                            Sitemap
                        </Link>
                        <Link to="/legal/privacy" style={{ color: "#555", textDecoration: "none" }} onMouseEnter={(e) => bottomLinkHover(e, true)} onMouseLeave={(e) => bottomLinkHover(e, false)}>
                            Legal & privacy
                        </Link>
                        <Link to="/legal/cookies" style={{ color: "#555", textDecoration: "none" }} onMouseEnter={(e) => bottomLinkHover(e, true)} onMouseLeave={(e) => bottomLinkHover(e, false)}>
                            Cookies
                        </Link>
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
                        display: "inline-block",
                        transition: "opacity 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >
                        THE SEA
                    </Link>
                </div>

            </div>

            {/* Region / Language Modal */}
            {showRegionModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.65)",
                    zIndex: 99999,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px"
                }}>
                    <div style={{
                        backgroundColor: "#fff",
                        maxWidth: "480px",
                        width: "100%",
                        padding: "35px",
                        borderRadius: "2px",
                        position: "relative",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}>
                        <button 
                            onClick={() => setShowRegionModal(false)}
                            style={{ position: "absolute", top: "18px", right: "18px", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                        >
                            ✕
                        </button>
                        <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#bfa15f", fontWeight: "600" }}>
                            Location & Language
                        </span>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", margin: "8px 0 20px 0" }}>
                            Chọn Quốc Gia & Ngôn Ngữ
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "320px", overflowY: "auto" }}>
                            {regions.map((reg, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleSelectRegion(reg)}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "14px 18px",
                                        border: selectedRegion.country === reg.country ? "1px solid #111" : "1px solid #eee",
                                        backgroundColor: selectedRegion.country === reg.country ? "#fcfcfb" : "#fff",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    <div>
                                        <strong style={{ fontSize: "14px", display: "block" }}>{reg.country}</strong>
                                        <span style={{ fontSize: "12px", color: "#777" }}>{reg.lang}</span>
                                    </div>
                                    {selectedRegion.country === reg.country && (
                                        <span style={{ color: "#bfa15f", fontWeight: "bold" }}>✓</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {saveNotice && (
                            <div style={{ marginTop: "15px", textAlign: "center", color: "#166534", fontSize: "13px", fontWeight: "500" }}>
                                ✓ Đã cập nhật khu vực và ngôn ngữ!
                            </div>
                        )}
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;