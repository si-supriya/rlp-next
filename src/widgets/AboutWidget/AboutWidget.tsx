import React, { useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';

type GsapTween = { kill?: () => void };
type GsapStatic = {
  registerPlugin: (...plugins: unknown[]) => void;
  to: (target: Element, vars: Record<string, unknown>) => GsapTween;
};
type ScrollTriggerInstance = { kill?: () => void };
type ScrollTriggerStatic = {
  create: (vars: Record<string, unknown>) => ScrollTriggerInstance;
  refresh?: () => void;
};

export interface AboutWidgetProps {
  /**
   * Raw HTML to render (useful when you want to paste “custom HTML code”).
   * Note: This is not a security sanitizer. Only use trusted HTML.
   */
  html?: string;
  /**
   * When true, loads GSAP + ScrollTrigger (matching the scripts in your snippet).
   * Keep your animation init code in your custom JS (or add it later in this widget).
   */
  loadGsap?: boolean;
  /**
   * Show GSAP ScrollTrigger markers (useful for debugging).
   */
  showMarkers?: boolean;
  className?: string;
}

const DEFAULT_ABOUT_HTML = `
<div class="waf-component waf-parallax-section">
  <div class="layout-wrapper">
    <div class="waf-slide waf-slide-one img-1by1 mobile">
      <div class="parallax-thumbnail">
        <figure class="img-box">
          <img class="mobile lazy" src="../images/parallax/1.png" srcset=""
            data-src="../images/parallax/1.png" data-srcset="" alt="Be next stage"
            importance="low" />
        </figure>
      </div>
      <h2 class="parallax-title sr-only">Be next stage</h2>
    </div>
    <div class="waf-slide waf-slide-one img-16by9 desktop">
      <div class="parallax-thumbnail">
        <figure class="img-box">
          <img class="desktop lazy" src="../images/parallax/1-web.png" srcset=""
            data-src="../images/parallax/1-web.png" data-srcset="" alt="Be next stage"
            importance="low" />
        </figure>
      </div>
      <h2 class="parallax-title sr-only">Be next stage</h2>
    </div>
    <div class="waf-slide waf-slide-two img-3by4">
      <div class="parallax-thumbnail">
        <figure class="img-box">
          <img class=" lazy" src="../images/parallax/2.png" srcset=""
            data-src="../images/parallax/2.png" data-srcset="" alt="" importance="low" />
        </figure>
        <span class="caption">
          Giro d’Italia Ride Like A Pro
        </span>
      </div>
      <span class="slide-title">GIRO D’ITALIA RIDE LIKE A PRO IS A UNIQUE AND EXCITING CYCLING EXPERIENCE </span>
    </div>
    <div class="waf-slide waf-slide-three img-16by9">
      <div class="parallax-thumbnail">
        <figure class="img-box">
          <img class=" lazy" src="../images/parallax/3.png" srcset=""
            data-src="../images/parallax/3.png" data-srcset="" alt="" importance="low" />
        </figure>
        <span class="caption">
          Giro d’Italia Ride Like A Pro
        </span>
      </div>
      <span class="slide-title">HIGH-STANDARD ORGANISATION </span>
    </div>
    <div class="waf-slide waf-slide-four img-21by9">
      <div class="parallax-thumbnail">
        <figure class="img-box">
          <img class=" lazy" src="../images/parallax/4.png" srcset=""
            data-src="../images/parallax/4.png" data-srcset="" alt="" importance="low" />
        </figure>
      </div>
      <span class="slide-title">MUCH MORE THAN OUR TALENT, MUCH MORE THAN OUR VICTORIES, OUR VALUES AND OUR DNA
        PROVE WHO WE REALLY ARE.</span>
      <span class="slide-description">
        Molto Più Del Nostro Talento Molto Più Delle Nostre Vittorie Sono I Nostri Valori, Il Nostro
        Dna, Che Dimostrano Veramente Chisiamo12
      </span>
    </div>
    <div class="waf-slide waf-slide-five img-3by4">
      <div class="parallax-thumbnail">
        <figure class="img-box">
          <img class=" lazy" src="../images/parallax/5.png" srcset=""
            data-src="../images/parallax/5.png" data-srcset="" alt="" importance="low" />
        </figure>
        <span class="caption">
          Giro d’Italia Ride Like A Pro
        </span>
      </div>
      <div class="content-wrap">
        <span class="slide-title">MASCOTTE</span>
        <span class="slide-description">A great fan of teamwork and a passionate cyclist, Lupo Wolfie is the
          Giro d’Italia mascot. Lupo Wolfie has been conceived as part of a Social Responsibility project
          promoted by the Giro d’Italia with the WWF European Alps Programme.</span>
      </div>
    </div>
    <div class="waf-slide waf-slide-six img-3by4">
      <div class="parallax-thumbnail">
        <figure class="img-box">
          <img class=" lazy" src="../images/parallax/6.png" srcset=""
            data-src="../images/parallax/6.png" data-srcset="" alt="" importance="low" />
        </figure>
        <span class="caption">
          Giro d’Italia Ride Like A Pro
        </span>
      </div>
      <div class="content-wrap">
        <span class="slide-title">TROFEO SENZA FINE</span>
        <span class="slide-description">The Trofeo Senza Fine represents the history of the Giro d’Italia, the
          toughest race in the world in the most beautiful country in the world.</span>
      </div>
    </div>
  </div>
</div>
`;

function stripScriptTags(input: string) {
  // Convenience so you can paste HTML that contains <script> tags;
  // those are better handled via next/script.
  return input.replace(/<script\b[\s\S]*?<\/script>/gi, '').trim();
}

export const AboutWidget: React.FC<AboutWidgetProps> = ({
  html = DEFAULT_ABOUT_HTML,
  loadGsap = true,
  showMarkers = false,
  className,
}) => {
  const safeHtml = useMemo(() => stripScriptTags(html), [html]);
  const [gsapReady, setGsapReady] = useState(!loadGsap);
  const [scrollTriggerReady, setScrollTriggerReady] = useState(!loadGsap);
  const cleanupRef = useRef<null | (() => void)>(null);

  const scriptsReady = !loadGsap || (gsapReady && scrollTriggerReady);

  useEffect(() => {
    // Cleanup any previous triggers/tweens before re-initializing (or on unmount).
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (!scriptsReady) return;

    const w = window as unknown as {
      gsap?: GsapStatic;
      ScrollTrigger?: ScrollTriggerStatic;
    };
    const gsap = w.gsap;
    const ScrollTrigger = w.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    // ---- User-provided parallax init (adapted for Next.js lifecycle) ----
    const parseCssLengthToPx = (value: string): number | null => {
      const v = (value || '').trim();
      if (!v) return null;
      if (v.endsWith('px')) return Number.parseFloat(v);
      if (v.endsWith('rem')) {
        const rem = Number.parseFloat(v);
        const rootPx = Number.parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
        return rem * (Number.isFinite(rootPx) ? rootPx : 16);
      }
      const n = Number.parseFloat(v);
      return Number.isFinite(n) ? n : null;
    };

    const getHeaderOffsetPx = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;
      const varName = isDesktop ? '--header-desktop-height' : '--header-mobile-height';
      const cssVal = rootStyles.getPropertyValue(varName);
      const px = parseCssLengthToPx(cssVal);
      // Fallback approximations (6.25rem ≈ 100px, 3.5rem ≈ 56px)
      return px ?? (isDesktop ? 100 : 56);
    };

    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.waf-parallax-section');
    const createdTriggers: ScrollTriggerInstance[] = [];
    const createdTweens: GsapTween[] = [];

    sections.forEach((section) => {
      const wrapper = section.querySelector('.layout-wrapper') as HTMLElement | null;
      if (!wrapper) return;

      const getScrollAmount = () => {
        const wrapperWidth = wrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth);
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: 'none',
      });
      createdTweens.push(tween);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: () => `top top+=${getHeaderOffsetPx()}`,
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        pinSpacing: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: showMarkers,
      });
      createdTriggers.push(trigger);
    });

    cleanupRef.current = () => {
      // Kill only what we created.
      createdTriggers.forEach((t) => t.kill?.());
      createdTweens.forEach((t) => t.kill?.());
      // Remove any pin spacers created by ScrollTrigger (best-effort).
      ScrollTrigger.refresh?.();
    };

    // Ensure correct measurements after initial render.
    requestAnimationFrame(() => ScrollTrigger.refresh?.());

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [scriptsReady, safeHtml, showMarkers, loadGsap]);

  return (
    <section className={className}>
      {loadGsap && (
        <>
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
            strategy="afterInteractive"
            onLoad={() => setGsapReady(true)}
          />
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
            strategy="afterInteractive"
            onLoad={() => setScrollTriggerReady(true)}
          />
        </>
      )}

      <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
    </section>
  );
};


