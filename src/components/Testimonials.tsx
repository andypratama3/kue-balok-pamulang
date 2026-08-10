import React from 'react';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Andi Nugroho',
      role: 'Foodie Pamulang',
      rating: 5,
      comment: 'Kue Balok Pamulang ini beneran terfavorit! Cokelat lumernya banjir banget tapi gak bikin enek. Pas dimakan pas masih anget-angetnya di outlet Surya Kencana!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      tag: 'Verified Order'
    },
    {
      id: 2,
      name: 'Dr. Sarah Kartika',
      role: 'Dosen Universitas Pamulang',
      rating: 5,
      comment: 'Sering banget pesan buat rapat atau acara dikampus Unpam. Teman-teman dosen pada suka topping keju dan green tea-nya. Kemasannya rapi dan pengiriman super cepat.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      tag: 'Langganan UNPAM'
    },
    {
      id: 3,
      name: 'Bagus Pratama',
      role: 'Warga Pamulang Permai',
      rating: 5,
      comment: 'Gak perlu jauh-jauh cari kue balok enak. Di Pamulang udah ada yang rasa cokelatnya juara! Tekstur luarnya garing, dalamnya lumer kaya lava cake mewah.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      tag: 'Verified Review'
    }
  ];

  return (
    <section className="w-full py-20 bg-surface-container relative" id="reviews">
      <div className="max-w-container-max mx-auto px-gutter">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-tertiary-fixed-dim/20 text-on-tertiary-container px-4 py-1.5 rounded-full mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-label-bold text-xs uppercase tracking-wider"> Kata Pamulang Foodies</span>
          </div>
          <h2 className="font-display-lg text-4xl md:text-5xl text-primary mb-4">
            Dicintai Lebih dari 10.000+ Pelanggan
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-xl">
            Intip ulasan jujur para pecinta kuliner manis di Pamulang dan Tangerang Selatan tentang sensasi Kue Balok Pamulang.
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="bg-surface rounded-3xl p-8 mb-12 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="font-display-lg text-5xl text-primary font-bold">4.9</div>
            <div>
              <div className="flex text-amber-400 gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-body-md text-xs text-on-surface-variant">Berdasarkan 1.480+ Ulasan Google & WhatsApp</span>
            </div>
          </div>

          <div className="h-12 w-px bg-outline-variant/30 hidden md:block" />

          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="font-headline-md text-2xl text-primary font-bold block">100%</span>
              <span className="text-xs text-on-surface-variant font-medium">Bahan Premium</span>
            </div>
            <div className="text-center">
              <span className="font-headline-md text-2xl text-primary font-bold block">Daily</span>
              <span className="text-xs text-on-surface-variant font-medium">Fresh Baked</span>
            </div>
            <div className="text-center">
              <span className="font-headline-md text-2xl text-primary font-bold block">4.9/5</span>
              <span className="text-xs text-on-surface-variant font-medium">Kepuasan Rasa</span>
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-surface p-8 rounded-3xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-primary-fixed absolute top-6 right-6 opacity-40 group-hover:scale-110 transition-transform" />

              <div className="mb-6">
                <div className="flex text-amber-400 gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/20">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-fixed"
                />
                <div>
                  <h4 className="font-headline-md text-sm text-primary font-bold flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  </h4>
                  <span className="text-xs text-on-surface-variant block">{rev.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
