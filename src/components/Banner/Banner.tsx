import React from 'react';
import Image from 'next/image';
import { bannerVariants } from './Banner.variants';
import { Breadcrumb, BreadcrumbItem } from '@/components/Breadcrumb';

export type BannerBreadcrumbItem = BreadcrumbItem;

export interface BannerProps {
  title: string;
  label?: string;
  topImageSrc?: string;
  topImageAlt?: string;
  topImageWidth?: number;
  topImageHeight?: number;
  backgroundImage: string;
  backgroundAlt?: string;
  height?: 'sm' | 'md' | 'lg';
  breadcrumb?: BreadcrumbItem[];
  className?: string;
  priorityImage?: boolean;
}

export const Banner: React.FC<BannerProps> = ({
  title,
  label,
  topImageSrc,
  topImageAlt = '',
  topImageWidth = 240,
  topImageHeight = 48,
  backgroundImage,
  backgroundAlt = '',
  height = 'lg',
  breadcrumb = [],
  className,
  priorityImage = true,
}) => {
  const styles = bannerVariants({ height });

  return (
    <section className={styles.root({ className })} aria-label={title}>
      <div className={styles.media()}>
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority={priorityImage}
          className={styles.image()}
          sizes="100vw"
        />
        <div className={styles.overlay()} />
      </div>

      <div className={styles.inner()}>
        <div className={styles.container()}>
          <Breadcrumb
            items={breadcrumb}
            className={styles.breadcrumb()}
            linkClassName={styles.breadcrumbLink()}
            separatorClassName={styles.breadcrumbSep()}
          />

          <div className={styles.content()}>
            <div className={styles.contentInner()}>
              {topImageSrc && (
                <div className={styles.topImageWrap()}>
                  <Image
                    src={topImageSrc}
                    alt={topImageAlt}
                    width={topImageWidth}
                    height={topImageHeight}
                    className={styles.topImage()}
                    priority={priorityImage}
                  />
                </div>
              )}
              {label && <div className={styles.label()}>{label}</div>}
              <h1 className={styles.title()}>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


