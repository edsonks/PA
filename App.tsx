import React, { useState, useEffect, useRef } from 'react';
import { LINKS, SOCIAL_LINKS } from './constants';
import { getDailyGospel } from './data/gospel';
import type { Gospel } from './types';
import LinkButton from './components/LinkButton';
import SocialIcon from './components/SocialIcon';
import Modal from './components/Modal';
import { BibleIcon, HeartIcon } from './components/Icons';

const App: React.FC = () => {
  // Modal states
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Subtitle states
  const [dailyGospel, setDailyGospel] = useState<Gospel | null>(null);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isSubtitleFading, setIsSubtitleFading] = useState(false);

  // Countdown and Redirect states
  const [countdown, setCountdown] = useState(5);
  const [redirectInfo, setRedirectInfo] = useState<{ url: string; title: string; } | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  // Ref for the interactive card
  const cardRef = useRef<HTMLElement>(null);
  
  // State for logo animation
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  
  // State for title animation
  const [isTitleAnimating, setIsTitleAnimating] = useState(false);
  
  useEffect(() => {
    setDailyGospel(getDailyGospel());
  }, []);

  // Effect for the interactive shine
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const subtitles = dailyGospel ? ["Estamos em clima de FPA!", `Evangelho do dia: ${dailyGospel.passage}`] : ["Estamos em clima de FPA!"];

  useEffect(() => {
    const subtitleTimer = setInterval(() => {
      setIsSubtitleFading(true);
      setTimeout(() => {
        setSubtitleIndex(prev => (prev + 1) % subtitles.length);
        setIsSubtitleFading(false);
      }, 500); // Duration of the fade-out transition
    }, 5000);
    return () => clearInterval(subtitleTimer);
  }, [subtitles.length]);

  // Effect for countdown redirect modals
  useEffect(() => {
    if (redirectInfo && isModalOpen) {
      setCountdown(5); // Reset countdown
      const redirectUrl = redirectInfo.url;
      // Redirect immediately
      window.location.href = redirectUrl;

      // Start countdown for the UI
      countdownIntervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if(countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if(countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [redirectInfo, isModalOpen]);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setRedirectInfo(null); // Clear redirect info
    if(countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    // Let animation finish before clearing content
    setTimeout(() => setModalContent(null), 300);
  };

  const handleLogoClick = () => {
    if (isLogoAnimating) return;
    setIsLogoAnimating(true);
    setTimeout(() => {
        setIsLogoAnimating(false);
    }, 1500); // Match animation duration
  };

  const handleTitleClick = () => {
      if (isTitleAnimating) return;
      setIsTitleAnimating(true);
      setTimeout(() => {
          setIsTitleAnimating(false);
      }, 2000); // Total duration of the animation sequence
  };

  // --- Modal Content Definitions ---
  
  const quemSomosText = (
    <div key="quem-somos" className="text-left space-y-4 max-h-[70vh] overflow-y-auto pr-2 sm:pr-4">
      <h2 className="text-2xl font-bold font-display mb-4 text-orange-300 text-shadow">Quem somos?</h2>
      <p>A Pastoral de Adolescentes da Diocese de Ponta Grossa é um farol de esperança e um pilar de apoio para a juventude da nossa comunidade. Somos um grupo vibrante e dedicado, comprometido em criar um ambiente onde os adolescentes possam crescer na fé, desenvolver seus talentos e construir laços de amizade duradouros.</p>
      <p>Nossa missão é clara: organizar retiros transformadores, encontros inspiradores e atividades dinâmicas que fortaleçam a espiritualidade, promovam o autoconhecimento e incentivem o serviço ao próximo. Acreditamos no potencial de cada jovem e trabalhamos incansavelmente para oferecer ferramentas e experiências que os ajudem a enfrentar os desafios da vida com fé, coragem e discernimento.</p>
    </div>
  );

  const escolinhaText = (
     <div key="escolinha" className="text-left space-y-4 max-h-[70vh] overflow-y-auto pr-2 sm:pr-4">
        <h2 className="text-2xl font-bold font-display mb-4 text-orange-300 text-shadow">Escolinha da PA</h2>
        <p>A Escolinha da PA te convida para uma jornada de fé e alegria! Junte-se a nós no <strong>quarto sábado de cada mês, às 15h, na Praça da Catedral de Ponta Grossa</strong>. Começamos com uma animação contagiante na praça e encerramos com um encontro especial na sala da Rádio Sant'Ana. Venha vivenciar momentos de união, aprendizado e espiritualidade!</p>
        <div className="w-full mt-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.475459312154!2d-50.16335368551469!3d-24.74495898410941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e8194723c72b81%3A0x7d27e2a9b2447990!2sPra%C3%A7a%20Mal.%20Floriano%20Peixoto!5e0!3m2!1sen!2sus" width="100%" height="300" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg shadow-md"></iframe>
            <a href="https://maps.app.goo.gl/2WrFLwD1zXTpBSVF9" target="_blank" rel="noopener noreferrer" className="block text-center mt-3 text-orange-300 font-semibold hover:underline">Abrir no Google Maps</a>
        </div>
    </div>
  );
  
  const redirectModalContent = redirectInfo ? (
      <div key="redirect" className="text-center">
          <h2 className="text-2xl font-bold font-display mb-2 text-orange-300 text-shadow">Abrindo {redirectInfo.title}...</h2>
          {countdown > 0 ? (
              <><p className="text-lg">Você será redirecionado em instantes.</p><p className="text-6xl font-bold my-4 text-white text-shadow">{countdown}</p></>
          ) : (
             <><p className="text-lg mb-4">Não foi redirecionado ainda?</p><a href={redirectInfo.url} target="_blank" rel="noopener noreferrer" className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300">Clique aqui!</a></>
          )}
      </div>
  ) : null;

  const nossosEventos = (
      <div key="eventos" className="text-left space-y-4 max-h-[70vh] overflow-y-auto pr-2 sm:pr-4">
          <h2 className="text-2xl font-bold font-display mb-4 text-orange-300 text-shadow">Nossos Eventos</h2>
          <div className="space-y-6">
              <div><h3 className="text-xl font-semibold text-white text-shadow">Retiro de Inverno da PA</h3><p className="text-sm text-white/80 mb-1">Ocorre anualmente em Julho</p><p>Um fim de semana de imersão espiritual, louvor e partilha, ideal para fortalecer a fé durante as férias.</p></div>
              <div><h3 className="text-xl font-semibold text-white text-shadow">Luau com Cristo</h3><p className="text-sm text-white/80 mb-1">Duas vezes ao ano (Abril e Outubro)</p><p>Uma noite de louvor e adoração à beira da fogueira, unindo música, oração e comunhão fraterna sob as estrelas.</p></div>
              <div><h3 className="text-xl font-semibold text-white text-shadow">Formação para Lideranças (FPA)</h3><p className="text-sm text-white/80 mb-1">Ocorre em anos alternados</p><p>Um evento focado no desenvolvimento de novas lideranças para a pastoral, com palestras, dinâmicas e workshops.</p></div>
          </div>
      </div>
  );
  
  const faleComCoordenador = (
    <div key="coordenador" className="text-left space-y-4 max-h-[70vh] overflow-y-auto pr-2 sm:pr-4">
        <h2 className="text-2xl font-bold font-display mb-4 text-orange-300 text-shadow">Fale com um Coordenador</h2>
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-white/10 p-3 rounded-lg">
                <div className="w-16 h-16 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div className="flex-grow flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-left">
                    <h3 className="font-semibold text-white text-shadow mb-2 sm:mb-0">João da Silva</h3>
                    <a href="https://wa.me/5542XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-semibold text-sm py-2 px-3 rounded-md hover:bg-green-600 transition-colors flex-shrink-0">Conversar</a>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-white/10 p-3 rounded-lg">
                <div className="w-16 h-16 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center">
                   <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div className="flex-grow flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-left">
                    <h3 className="font-semibold text-white text-shadow mb-2 sm:mb-0">Maria Oliveira</h3>
                    <a href="https://wa.me/5542YYYYYYYYY" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-semibold text-sm py-2 px-3 rounded-md hover:bg-green-600 transition-colors flex-shrink-0">Conversar</a>
                </div>
            </div>
        </div>
    </div>
);

    const gospelModalContent = dailyGospel ? (
        <div key="gospel" className="text-center space-y-4 max-h-[70vh] overflow-y-auto pr-2 sm:pr-4">
            <h2 className="text-2xl font-bold font-display text-orange-300 flex items-center justify-center text-shadow"><BibleIcon /> Evangelho do Dia</h2>
            <p className="text-lg font-semibold text-white">{dailyGospel.passage}</p>
            <p className="text-xl leading-relaxed text-left">"{dailyGospel.text}"</p>
        </div>
    ) : null;

  const handleLinkClick = (title: string) => {
    switch (title) {
        case 'Quem somos?': openModal(quemSomosText); break;
        case 'Escolinha da PA': openModal(escolinhaText); break;
        case 'Grupo no WhatsApp': 
            setRedirectInfo({ url: 'https://wa.me/554298049479?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20no%20grupo%20dos%20amigos%20da%20PA%20e%20ficar%20por%20dentro%20de%20tudo!', title: 'WhatsApp' });
            break;
        case 'Inscrição FPA':
            setRedirectInfo({ url: 'https://docs.google.com/forms/d/e/1FAIpQLSe_.../viewform', title: 'Inscrições' });
            break;
        case 'Nossos eventos': openModal(nossosEventos); break;
        case 'Fale com um coordenador': openModal(faleComCoordenador); break;
        default: break;
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center p-4 font-sans relative pb-20">
      <main
        ref={cardRef}
        className="interactive-shine-card relative w-full max-w-md mx-auto bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center border border-white/30"
      >
        <header className="flex flex-col items-center text-center mb-6">
          <div
            className={`logo-container relative cursor-pointer ${isLogoAnimating ? 'animating' : ''}`}
            onClick={handleLogoClick}
          >
            <img
              src="/assets/logo.png"
              alt="Logo da Pastoral de Adolescentes"
              className="logo-image w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-white/50 shadow-lg"
            />
          </div>
          <div 
            className="relative cursor-pointer mt-4" 
            onClick={handleTitleClick}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight text-shadow">
              Pastoral de Adolescentes
            </h1>
            <p className="text-white/90 mt-1 text-md sm:text-lg text-shadow">Diocese de Ponta Grossa</p>
          </div>
          <div className={`h-6 mt-3 text-white italic text-sm text-center transition-opacity duration-500 ease-in-out ${isSubtitleFading ? 'opacity-0' : 'opacity-100'}`}>
            {subtitleIndex === 0 ? (
                <span className="text-shadow">"{subtitles[0]}"</span>
            ) : (
                <button onClick={() => openModal(gospelModalContent)} className="hover:underline text-shadow">
                    "{subtitles[1]}"
                </button>
            )}
          </div>
        </header>

        {/* Links Section */}
        <section className="w-full flex flex-col items-center gap-4 mb-6 sm:mb-8">
          {LINKS.map((link) => (
             <LinkButton 
                key={link.title} 
                link={link} 
                onClick={link.url === '#' ? () => handleLinkClick(link.title) : undefined} 
             />
          ))}
        </section>

        {/* Social Media Section */}
        <footer className="flex items-center gap-6">
          {SOCIAL_LINKS.map((social) => (
            <SocialIcon key={social.name} social={social} />
          ))}
        </footer>
      </main>
      
      <footer className="absolute bottom-4 left-0 right-0 text-center w-full text-white text-xs sm:text-sm px-2">
        <p className="text-shadow">
          Site desenvolvido por: <a href="https://www.instagram.com/inteligenciarte.ia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">InteligencIArte.IA</a>
          <br />
          <a href="https://api.whatsapp.com/send?phone=554299753230&text=Ol%C3%A1!%20Vi%20o%20site%20que%20fez%20para%20a%20Pastoral%20de%20Adolescentes,%20gostaria%20de%20fazer%20um%20para%20mim!" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
            Quer um site igual a este? Clique aqui
          </a>
        </p>
      </footer>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {redirectInfo ? redirectModalContent : modalContent}
      </Modal>

      {/* Fullscreen Title Animation */}
      <div 
        className={`fullscreen-animation-overlay ${isTitleAnimating ? 'animating' : ''}`}
        onClick={() => setIsTitleAnimating(false)}
      >
        <HeartIcon className="fullscreen-heart" />
        <div className="fullscreen-pa">
          <span className="fullscreen-pa-p">P</span>
          <span className="fullscreen-pa-a">A</span>
        </div>
      </div>

    </div>
  );
};

export default App;