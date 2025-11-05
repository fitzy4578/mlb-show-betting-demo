import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FinnDuelSportsbook = () => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [activeCategory, setActiveCategory] = useState('popular');
  const [videoContainerHeight, setVideoContainerHeight] = useState(null);

  // Timestamps - Configure these with your specific times
  // Format: { start: secondsStart, end: secondsEnd, status: 'suspended' or 'open' }
  const timeStamps = [
    { start: 10, end: 20, status: 'suspended' },
    // Add your timestamps here when ready
  ];

  // Measure video container height
  useEffect(() => {
    const updateHeight = () => {
      if (videoContainerRef.current) {
        setVideoContainerHeight(videoContainerRef.current.offsetHeight);
      }
    };

    // Initial measurement
    updateHeight();

    // Update on resize
    window.addEventListener('resize', updateHeight);

    // Update when video loads
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', updateHeight);
    }

    // Fallback: measure after a short delay to ensure video is rendered
    const timer = setTimeout(updateHeight, 100);

    return () => {
      window.removeEventListener('resize', updateHeight);
      if (video) {
        video.removeEventListener('loadedmetadata', updateHeight);
      }
      clearTimeout(timer);
    };
  }, []);

  // Track video time and update market status
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      const time = video.currentTime;
      setCurrentTime(time);

      // Check if current time falls within a suspended period
      const currentPeriod = timeStamps.find(period =>
        time >= period.start && time < period.end
      );

      setIsSuspended(currentPeriod?.status === 'suspended');
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, [timeStamps]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Styles - FinnDuel Sportsbook theme
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    maxWidth: {
      maxWidth: '1600px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#ffd700',
      marginBottom: '5px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      letterSpacing: '1px'
    },
    subtitle: {
      color: '#e0e0e0',
      fontSize: '1.2rem',
      marginTop: '10px'
    },
    mainGrid: {
      display: 'flex',
      gap: '30px',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    videoSection: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 900px',
      maxWidth: '1000px',
      minWidth: '600px',
      height: 'fit-content'
    },
    videoContainer: {
      backgroundColor: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '3px solid #ffd700',
      height: 'fit-content'
    },
    video: {
      width: '100%',
      height: 'auto',
      display: 'block'
    },
    videoInfo: {
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    statusDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      marginRight: '8px',
      display: 'inline-block'
    },
    marketsSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      flex: '0 0 400px',
      maxWidth: '450px',
      minWidth: '350px',
      alignSelf: 'flex-start'
    },
    marketCategoriesContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    categoryTabs: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    categoryTab: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '2px solid',
      backgroundColor: 'white'
    },
    categoryTabActive: {
      backgroundColor: '#ffd700',
      borderColor: '#ffd700',
      color: '#1a1a2e'
    },
    categoryTabInactive: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      color: '#e0e0e0'
    },
    marketsHeader: {
      backgroundColor: '#ffd700',
      color: '#1a1a2e',
      padding: '15px 20px',
      borderRadius: '12px',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '1.3rem',
      boxShadow: '0 10px 25px -5px rgba(255, 215, 0, 0.3)',
      letterSpacing: '2px'
    },
    market: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      border: '3px solid',
      transition: 'all 0.3s ease'
    },
    marketOpen: {
      borderColor: '#10b981',
      opacity: 1
    },
    marketSuspended: {
      borderColor: '#ef4444',
      opacity: 0.6,
      backgroundColor: '#f9fafb'
    },
    marketHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      paddingBottom: '6px',
      borderBottom: '2px solid #e5e7eb'
    },
    marketTitle: {
      fontWeight: 'bold',
      fontSize: '1.1rem',
      color: '#1a1a2e'
    },
    statusBadge: {
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    openBadge: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    suspendedBadge: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px'
    },
    option: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '12px 10px',
      borderRadius: '8px',
      border: '2px solid',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '500',
      textAlign: 'center'
    },
    optionOpen: {
      backgroundColor: '#eff6ff',
      borderColor: '#3b82f6',
      color: '#1e40af'
    },
    optionSuspended: {
      backgroundColor: '#f3f4f6',
      borderColor: '#d1d5db',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    odds: {
      fontWeight: 'bold',
      fontSize: '1.1rem',
      padding: '6px 14px',
      borderRadius: '6px',
      minWidth: '60px',
      textAlign: 'center'
    },
    oddsOpen: {
      backgroundColor: 'transparent',
      color: '#1a1a2e'
    },
    oddsSuspended: {
      backgroundColor: '#e5e7eb',
      color: '#9ca3af'
    },
    statusBar: {
      marginTop: '30px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '20px',
      border: '2px solid rgba(255, 215, 0, 0.3)'
    },
    statusGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '50px',
      flexWrap: 'wrap'
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px'
    },
    statLabel: {
      fontSize: '0.85rem',
      color: '#e0e0e0',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    statValue: {
      fontWeight: 'bold',
      fontSize: '1.3rem',
      color: '#ffd700'
    }
  };

  const BettingMarket = ({ title, options, suspended, line }) => (
    <motion.div
      style={{
        ...styles.market,
        ...(suspended ? styles.marketSuspended : styles.marketOpen)
      }}
      animate={{
        scale: suspended ? 0.98 : 1,
        opacity: suspended ? 0.6 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      <div style={styles.marketHeader}>
        <h3 style={styles.marketTitle}>{title}</h3>
        <div
          style={{
            ...styles.statusBadge,
            ...(suspended ? styles.suspendedBadge : styles.openBadge)
          }}
        >
          {suspended ? 'Suspended' : 'Open'}
        </div>
      </div>

      <div style={styles.optionsContainer}>
        <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1a1a2e', textAlign: 'center' }}>
            {options[0].name}
          </div>
          <motion.div
            style={{
              ...styles.option,
              ...(suspended ? styles.optionSuspended : styles.optionOpen),
              width: '100%',
              maxWidth: '120px'
            }}
            whileHover={suspended ? {} : { scale: 1.02, borderColor: '#ffd700' }}
            whileTap={suspended ? {} : { scale: 0.98 }}
          >
            <span
              style={{
                ...styles.odds,
                ...(suspended ? styles.oddsSuspended : styles.oddsOpen)
              }}
            >
              {options[0].odds}
            </span>
          </motion.div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 8px',
          alignSelf: 'flex-end',
          marginBottom: '12px',
          width: line ? 'auto' : '40px',
          minWidth: line ? 'auto' : '40px',
          flexShrink: 0
        }}>
          {line && (
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1a1a2e',
              backgroundColor: 'transparent',
              padding: '8px 12px',
              borderRadius: '8px'
            }}>
              {line}
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1a1a2e', textAlign: 'center' }}>
            {options[1].name}
          </div>
          <motion.div
            style={{
              ...styles.option,
              ...(suspended ? styles.optionSuspended : styles.optionOpen),
              width: '100%',
              maxWidth: '120px'
            }}
            whileHover={suspended ? {} : { scale: 1.02, borderColor: '#ffd700' }}
            whileTap={suspended ? {} : { scale: 0.98 }}
          >
            <span
              style={{
                ...styles.odds,
                ...(suspended ? styles.oddsSuspended : styles.oddsOpen)
              }}
            >
              {options[1].odds}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  // MLB The Show Markets - organized by category
  const marketsByCategory = {
    popular: [
      {
        title: "Moneyline (inc. OT)",
        options: [
          { name: "Home Team", odds: "-150" },
          { name: "Away Team", odds: "+130" }
        ]
      },
      {
        title: "Run Total (inc. OT)",
        line: "8.5",
        options: [
          { name: "Over", odds: "-110" },
          { name: "Under", odds: "-110" }
        ]
      },
      {
        title: "Run Spread (inc. OT)",
        line: "-0.5",
        options: [
          { name: "Home", odds: "+120" },
          { name: "Away", odds: "-145" }
        ]
      }
    ],
    innings: [
      {
        title: "1st Inning Winner",
        options: [
          { name: "Home", odds: "+110" },
          { name: "Away", odds: "+105" }
        ]
      },
      {
        title: "1st Inning Total",
        line: "0.5",
        options: [
          { name: "Over", odds: "+140" },
          { name: "Under", odds: "-175" }
        ]
      },
      {
        title: "5th Inning Winner",
        options: [
          { name: "Home", odds: "-135" },
          { name: "Away", odds: "+115" }
        ]
      }
    ],
    teamProps: [
      {
        title: "Home Team Total Runs",
        line: "4.5",
        options: [
          { name: "Over", odds: "+105" },
          { name: "Under", odds: "-130" }
        ]
      },
      {
        title: "Away Team Total Runs",
        line: "3.5",
        options: [
          { name: "Over", odds: "-115" },
          { name: "Under", odds: "-105" }
        ]
      },
      {
        title: "Home Team Total Hits",
        line: "8.5",
        options: [
          { name: "Over", odds: "-120" },
          { name: "Under", odds: "+100" }
        ]
      }
    ],
    atBat: [
      {
        title: "Next At-Bat Result",
        options: [
          { name: "Hit", odds: "+180" },
          { name: "Out", odds: "-220" }
        ]
      },
      {
        title: "Next Pitch",
        options: [
          { name: "Strike", odds: "-140" },
          { name: "Ball", odds: "+115" }
        ]
      },
      {
        title: "Home Run This At-Bat",
        options: [
          { name: "Yes", odds: "+650" },
          { name: "No", odds: "-1200" }
        ]
      }
    ]
  };

  const categories = [
    { id: 'popular', label: 'Popular' },
    { id: 'innings', label: 'Innings' },
    { id: 'teamProps', label: 'Team Props' },
    { id: 'atBat', label: 'At-Bat' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>FINNDUEL SPORTSBOOK</h1>
          <p style={styles.subtitle}>MLB The Show - Live In-Game Betting</p>
        </div>

        <div style={styles.mainGrid}>
          {/* Video Player Section */}
          <div style={styles.videoSection}>
            <div ref={videoContainerRef} style={styles.videoContainer}>
              <video
                ref={videoRef}
                style={styles.video}
                controls
              >
                <source src="/mlb-the-show-match.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Info Bar */}
              <div style={styles.videoInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      ...styles.statusDot,
                      backgroundColor: isPlaying ? '#10b981' : '#ef4444'
                    }}></div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                      {isPlaying ? 'LIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
                    {formatTime(currentTime)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    ...styles.statusDot,
                    backgroundColor: isSuspended ? '#ef4444' : '#10b981'
                  }}></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    Markets: {isSuspended ? 'SUSPENDED' : 'OPEN'}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Tabs Below Video */}
            <div style={{...styles.statusBar, marginTop: '20px'}}>
              <div style={styles.categoryTabs}>
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    style={{
                      ...styles.categoryTab,
                      ...(activeCategory === category.id ? styles.categoryTabActive : styles.categoryTabInactive)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Markets Section */}
          <div style={styles.marketsSection}>
            {/* Markets Container */}
            <div style={{
              ...styles.marketCategoriesContainer,
              height: videoContainerHeight ? `${videoContainerHeight}px` : 'auto'
            }}>
              {marketsByCategory[activeCategory].map((market, index) => (
                <BettingMarket
                  key={index}
                  title={market.title}
                  options={market.options}
                  line={market.line}
                  suspended={isSuspended}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinnDuelSportsbook;
