import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Berapa lama daya tahan Kue Balok Pamulang?',
      answer: 'Kue Balok Pamulang tahan hingga 2-3 hari di suhu ruangan dalam wadah tertutup, dan tahan hingga 7 hari jika disimpan di dalam kulkas. Untuk menikmati sensasi lumer kembali, cukup hangatkan di microwave selama 15-20 detik atau di atas teflon anti lengket berapi kecil.'
    },
    {
      question: 'Apakah Kue Balok Pamulang 100% Halal?',
      answer: 'Ya, 100% Halal. Kami menggunakan bahan-bahan bersertifikat halal seperti tepung pilihan, telur segar, cokelat berkualitas premium, dan mentega tanpa campuran bahan non-halal maupun pengawet buatan.'
    },
    {
      question: 'Apakah bisa dikirim untuk area luar Pamulang / Jabodetabek?',
      answer: 'Bisa banget! Kami melayani pengiriman area Jabodetabek melalui Instant/Sameday delivery (GoSend/GrabExpress) agar kue tiba dalam kondisi segar. Untuk pemesanan jumlah besar atau event kampus/kantor, silakan hubungi WhatsApp kami.'
    },
    {
      question: 'Bagaimana cara terbaik menghangatkan kembali kue balok di rumah?',
      answer: 'Kamu bisa menghangatkannya menggunakan: (1) Microwave: 15-20 detik, (2) Teflon/Varian Pan: 1-2 menit dengan api terkecil, atau (3) Oven/Air Fryer: 160°C selama 2-3 menit. Cokelat lumernya akan kembali meleleh sempurna!'
    },
    {
      question: 'Apakah tersedia opsi Takeaway dan Dine-in di outlet Pamulang?',
      answer: 'Tentu! Outlet utama kami di Jl. Surya Kencana No. 12 Pamulang menyediakan area duduk santai (dine-in) yang nyaman untuk menikmati kue balok hangat langsung dari oven bersama es kopi atau teh manis.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-surface relative" id="faq">
      <div className="max-w-4xl mx-auto px-gutter">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-on-tertiary-container/10 text-on-tertiary-container border border-on-tertiary-container/20 px-4 py-1.5 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-on-tertiary-container" />
            <span className="font-label-bold text-xs uppercase tracking-wider">Pertanyaan Populer</span>
          </div>
          <h2 className="font-display-lg text-4xl md:text-5xl text-primary mb-4">
            Pertanyaan Sering Diajukan (FAQ)
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-lg">
            Segala hal yang perlu kamu ketahui tentang cara pemesanan, daya tahan, dan penyajian Kue Balok Pamulang.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden transition-all shadow-sm hover:border-primary/40"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-headline-md text-base md:text-lg text-primary font-bold">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary text-on-primary' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-on-surface-variant font-body-md text-sm md:text-base leading-relaxed border-t border-outline-variant/20">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
