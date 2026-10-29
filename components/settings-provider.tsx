"use client";
import {createContext,useContext} from 'react';
import type {SiteSettings} from '@/lib/content';
const SettingsContext=createContext<SiteSettings>({resume_url:'/resume',booking_url:null,photography_intro:''});
export const useSiteSettings=()=>useContext(SettingsContext);
export default function SettingsProvider({value,children}:{value:SiteSettings;children:React.ReactNode}){return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;}
