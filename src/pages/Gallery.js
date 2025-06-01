import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import images from history_photos
import img1 from '../assets/images/history_photos/Nurse Leadership/289A3263.jpg';
import img2 from '../assets/images/history_photos/Nurse Leadership/289A3256.jpg';
import img3 from '../assets/images/history_photos/Nurse Leadership/289A3265.jpg';
import img4 from '../assets/images/history_photos/Nurse Leadership/289A3259.jpg';
import img5 from '../assets/images/history_photos/Nurse Leadership/289A3267.jpg';
import img6 from '../assets/images/history_photos/Nurse Leadership/289A3277.jpg';
import img7 from '../assets/images/history_photos/Nurse Leadership/289A3269.jpg';
import img8 from '../assets/images/history_photos/Nurse Leadership/289A3274.jpg';
import img9 from '../assets/images/history_photos/Nurse Leadership/289A3298.jpg';
import img10 from '../assets/images/history_photos/Nurse Leadership/289A3284.jpg';
import img11 from '../assets/images/history_photos/Nurse Leadership/289A3287.jpg';
import img12 from '../assets/images/history_photos/Nurse Leadership/289A3300.jpg';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5ee 100%);
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #1a8f4c;
  text-align: center;
  margin-bottom: 15px;
  font-weight: 700;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 40px;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const Tab = styled.button`
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? '#1a8f4c' : 'white'};
  color: ${props => props.active ? 'white' : '#1a8f4c'};
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 2px solid #1a8f4c;
  min-width: 120px;

  &:hover {
    background: ${props => props.active ? '#156e3a' : '#f0f9f4'};
    transform: translateY(-2px);
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 35px;
  padding: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 25px;
    padding: 15px 0;
  }
`;

const ItemImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  aspect-ratio: 4/3;
  transition: transform 0.3s ease;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(26, 143, 76, 0.9);
  border: none;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 2;

  &::before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent white;
    margin-left: 5px;
  }

  &:hover {
    background: rgba(26, 143, 76, 1);
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  cursor: pointer;

  &::after {
    content: 'Video';
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(26, 143, 76, 0.9);
    color: white;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 2;
    backdrop-filter: blur(4px);
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 800px;
  max-width: 90vw;
  padding-bottom: 45%; /* Slightly smaller than 16:9 to fit better */
  height: 0;
  overflow: hidden;
  background: black;
  border-radius: 10px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 95vw;
    padding-bottom: 53.4375%; /* Maintain aspect ratio for mobile */
  }
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;
  z-index: 1001;

  &:hover {
    transform: scale(1.1);
    background: #f0f0f0;
  }
`;

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const galleryItems = {
    photos: [
      {
        id: 1,
        type: 'photo',
        src: img1
      },
      {
        id: 2,
        type: 'photo',
        src: img2
      },
      {
        id: 3,
        type: 'photo',
        src: img3
      },
      {
        id: 4,
        type: 'photo',
        src: img4
      },
      {
        id: 5,
        type: 'photo',
        src: img5
      },
      {
        id: 6,
        type: 'photo',
        src: img6
      },
      {
        id: 7,
        type: 'photo',
        src: img7
      },
      {
        id: 8,
        type: 'photo',
        src: img8
      },
      {
        id: 9,
        type: 'photo',
        src: img9
      },
      {
        id: 10,
        type: 'photo',
        src: img10
      },
      {
        id: 11,
        type: 'photo',
        src: img11
      },
      {
        id: 12,
        type: 'photo',
        src: img12
      }
    ],
    videos: [
      {
        id: 1,
        type: 'youtube',
        videoId: 'CihYgetuQiw',
        thumb: `https://img.youtube.com/vi/CihYgetuQiw/maxresdefault.jpg`
      }
    ]
  };

  const handlePhotoClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleVideoClick = (item) => {
    if (item.type === 'youtube') {
      setCurrentVideo(`https://www.youtube.com/embed/${item.videoId}?autoplay=1`);
      setVideoModalOpen(true);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <PageTitle>Event Gallery</PageTitle>
          <PageDescription>
            Relive the memorable moments from past NMCON events through our collection of photos and videos.
          </PageDescription>

          <TabContainer>
            <Tab 
              active={activeTab === 'photos'} 
              onClick={() => setActiveTab('photos')}
            >
              Photos
            </Tab>
            <Tab 
              active={activeTab === 'videos'} 
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </Tab>
          </TabContainer>

          <AnimatePresence mode="wait">
            <GalleryGrid
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {galleryItems[activeTab].map((item, index) => (
                item.type === 'youtube' ? (
                  <Tilt
                    key={item.id}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    scale={1.05}
                    transitionSpeed={2000}
                    perspective={1000}
                  >
                    <VideoContainer onClick={() => handleVideoClick(item)}>
                      <ItemImage
                        src={item.thumb}
                        alt="Video thumbnail"
                        variants={itemVariants}
                      />
                      <PlayButton />
                    </VideoContainer>
                  </Tilt>
                ) : (
                  <Tilt
                    key={item.id}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    scale={1.05}
                    transitionSpeed={2000}
                    perspective={1000}
                  >
                    <ItemImage
                      src={item.src}
                      alt="Gallery item"
                      onClick={() => handlePhotoClick(index)}
                      variants={itemVariants}
                    />
                  </Tilt>
                )
              ))}
            </GalleryGrid>
          </AnimatePresence>

          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={galleryItems.photos.map(photo => ({ src: photo.src }))}
            index={currentImageIndex}
          />

          {videoModalOpen && (
            <VideoModal>
              <VideoWrapper>
                <iframe
                  src={currentVideo}
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </VideoWrapper>
              <CloseButton onClick={() => {
                setVideoModalOpen(false);
                setCurrentVideo(null);
              }}>
                ✕
              </CloseButton>
            </VideoModal>
          )}
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default Gallery; 