import { create } from 'zustand';
import { Coin, KPILink, BlogLink } from '../types';

interface Store {
  portfolio: Coin[];
  kpiLinks: KPILink[];
  blogLinks: BlogLink[];
  addCoin: (coin: Coin) => void;
  removeCoin: (coinId: string) => void;
  addKPILink: (link: KPILink) => void;
  removeKPILink: (linkId: string) => void;
  addBlogLink: (link: BlogLink) => void;
  removeBlogLink: (linkId: string) => void;
}

export const useStore = create<Store>((set) => ({
  portfolio: [],
  kpiLinks: [],
  blogLinks: [],
  
  addCoin: (coin) =>
    set((state) => ({
      portfolio: [...state.portfolio, coin],
    })),
    
  removeCoin: (coinId) =>
    set((state) => ({
      portfolio: state.portfolio.filter((coin) => coin.id !== coinId),
    })),
    
  addKPILink: (link) =>
    set((state) => ({
      kpiLinks: [...state.kpiLinks, link],
    })),
    
  removeKPILink: (linkId) =>
    set((state) => ({
      kpiLinks: state.kpiLinks.filter((link) => link.id !== linkId),
    })),
    
  addBlogLink: (link) =>
    set((state) => ({
      blogLinks: [...state.blogLinks, link],
    })),
    
  removeBlogLink: (linkId) =>
    set((state) => ({
      blogLinks: state.blogLinks.filter((link) => link.id !== linkId),
    })),
}));
