import { ReactLenis } from 'lenis/react';
import React, { useRef, forwardRef } from 'react';

// Define the interface for scrolling cards
export interface ScrollCardData {
  title: string;
  description: string;
  link?: string;
  color: string;
  rotation: string;
  imageSrc?: string;
  category?: string;
  date?: string;
  location?: string;
  localStorageKey?: string;
  defaultSrc?: string;
  placeholderLabel?: string;
  detailsLabel?: string;
}

const articleCardsData: ScrollCardData[] = [
  {
    title: 'Image MouseTrail',
    description:
      "An Mouse who is running with couple of images and the best part is you can hide all the images when you don't move your mouse. I hope you'll love it",
    link: 'https://ui-layout.com/components/image-mousetrail',
    color: 'bg-zinc-900', // Tailored for elegant dark mode
    rotation: 'rotate-3',
  },
  {
    title: 'Progressive Carousel',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius consequatur explicabo assumenda odit necessitatibus possimus ducimus aliquam. Ullam dignissimos animi officiis.',
    link: 'https://ui-layout.com/components/progressive-carousel',
    color: 'bg-zinc-900',
    rotation: 'rotate-0',
  },
  {
    title: 'Responsive Drawer',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius consequatur explicabo assumenda odit necessitatibus possimus ducimus aliquam. Ullam dignissimos animi officiis.',
    link: 'https://ui-layout.com/components/drawer',
    color: 'bg-zinc-900',
    rotation: '-rotate-3',
  },
  {
    title: 'Animated Globe',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius consequatur explicabo assumenda odit necessitatibus possimus ducimus aliquam. Ullam dignissimos animi officiis.',
    link: 'https://ui-layout.com/components/globe',
    color: 'bg-zinc-900',
    rotation: 'rotate-0',
  },
];

const ScrollCard = forwardRef<HTMLElement, { cards?: ScrollCardData[] }>((props, ref) => {
  const cardsToRender = props.cards || articleCardsData;

  return (
    <ReactLenis root>
      <main className='bg-black' ref={ref}>
        <div className='wrapper'>
          <section className='text-white h-[60vh] w-full bg-zinc-950 grid place-content-center sticky top-0 border-b border-white/5'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <h1 className='2xl:text-7xl text-5xl px-8 font-display font-semibold text-center tracking-tight leading-[120%]'>
              Koleksi Foto & <br /> <span className="text-gradient-gold italic font-normal">Arsip Dokumentasi</span> Stacking
            </h1>
            <p className="text-xs text-neutral-400 text-center mt-4 font-mono uppercase tracking-widest">Scroll kebawah untuk slide foto berikutnya 👇</p>
          </section>
        </div>

        <section className='text-white w-full bg-zinc-950 py-12'>
          <div className='flex flex-col lg:flex-row justify-between px-6 md:px-16 gap-12'>
            <div className='grid gap-8 w-full lg:max-w-xl'>
              {cardsToRender.map((card, i) => (
                <figure key={i} className='sticky top-20 h-[80vh] grid place-content-center'>
                  <article
                    className={`h-[50vh] min-h-[300px] w-full max-w-md rounded-2xl ${card.rotation} p-6 border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden group`}
                    style={{ backgroundColor: card.color.startsWith('#') ? card.color : undefined }}
                  >
                    {/* Background image if provided */}
                    {card.imageSrc && (
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={card.imageSrc} 
                          alt={card.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-zinc-950/70" />
                      </div>
                    )}

                    <div className="relative z-10">
                      {card.category && (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880] mb-2 inline-block bg-black/40 px-2.5 py-1 rounded border border-white/5">
                          {card.category === 'aktivitas' ? 'Organisasi' : card.category === 'perjalanan' ? 'Perjalanan' : 'Suka Foto / Selfie'}
                        </span>
                      )}
                      <h1 className='text-2xl font-display font-medium text-white mb-2 group-hover:text-amber-200 transition-colors'>{card.title}</h1>
                      <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed mb-4">{card.description}</p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-auto">
                      {card.date && (
                        <span className="text-[10px] font-mono text-neutral-500">{card.date}</span>
                      )}
                      
                      {card.link ? (
                        <a
                          href={card.link}
                          target='_blank'
                          rel="noreferrer"
                          className='inline-flex items-center gap-1 bg-white hover:bg-[#c5a880] text-zinc-950 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300'
                        >
                          Selengkapnya
                        </a>
                      ) : (
                        card.location && (
                          <span className="text-[10px] font-mono text-[#c5a880]">{card.location}</span>
                        )
                      )}
                    </div>
                  </article>
                </figure>
              ))}
            </div>
            
            <div className='sticky top-20 h-[80vh] lg:h-screen grid place-content-center lg:relative lg:top-0 lg:h-auto'>
              <div className="lg:sticky lg:top-40 max-w-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-2"># Interaktif Stacking</span>
                <h1 className='text-3.5xl md:text-5xl font-display font-semibold tracking-tight leading-[120%] text-white'>
                  Rapi, Modern, <br /> dan <span className="text-gradient-gold italic font-normal">Mengalir</span>
                </h1>
                <p className="text-xs text-neutral-400 font-sans font-light mt-4 leading-relaxed">
                  Konsep presentasi visual yang memadukan keindahan tata ruang kartu bertumpuk secara vertikal. Menggunakan perulangan momentum gulir mulus untuk dinamika pengalaman pengguna.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className='group bg-zinc-950 py-12 relative overflow-hidden border-t border-white/5'>
          <h1 className='text-[14vw] translate-y-4 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-zinc-700 via-neutral-500 to-zinc-800 bg-clip-text text-transparent opacity-30 select-none'>
            Portfolio
          </h1>
        </footer>
      </main>
    </ReactLenis>
  );
});

ScrollCard.displayName = 'ScrollCard';

export default ScrollCard;
