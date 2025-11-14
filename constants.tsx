import React from 'react';
import type { Link, SocialLink } from './types';
import { 
  InfoIcon, 
  BookIcon, 
  WhatsAppIcon, 
  ClipboardIcon, 
  CalendarIcon, 
  ChatIcon,
  InstagramIcon,
  FacebookIcon
} from './components/Icons';


export const LINKS: Link[] = [
  {
    title: 'Quem somos?',
    url: '#', // Triggers modal
    icon: <InfoIcon />,
  },
  {
    title: 'Escolinha da PA',
    url: '#', // Triggers modal
    icon: <BookIcon />,
  },
  {
    title: 'Grupo no WhatsApp',
    url: '#', // Triggers modal
    icon: <WhatsAppIcon />,
  },
  {
    title: 'Inscrição FPA',
    url: '#', // Triggers modal
    icon: <ClipboardIcon />,
  },
  {
    title: 'Nossos eventos',
    url: '#', // Triggers modal
    icon: <CalendarIcon />,
  },
  {
    title: 'Fale com um coordenador',
    url: '#', // Triggers modal
    icon: <ChatIcon />,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/papontagrossa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    icon: <InstagramIcon />,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/pastoraldeadolescentespg',
    icon: <FacebookIcon />,
  },
];