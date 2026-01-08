import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NewsCard, type NewsCardProps } from '@/components/NewsCard';

export interface FeaturedNewsSwiperProps {
  items: NewsCardProps[];
  className?: string;
}

export const FeaturedNewsSwiper: React.FC<FeaturedNewsSwiperProps> = ({
  items,
  className,
}) => {
  if (!items.length) return null;

  return (
    <div className={className}>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={1}
        spaceBetween={0}
        watchOverflow
        grabCursor
        loop={items.length > 1}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <NewsCard {...item} variant="featured" aspect="landscape" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


