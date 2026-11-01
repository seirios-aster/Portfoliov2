import { profile } from "../data";

const Footer = () => (
  <footer className="border-t border-slate-200 py-8 text-sm dark:border-slate-700/60">
    <div className="container-page flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      <p className="text-slate-500">Built with React, Vite and Tailwind CSS</p>
    </div>
  </footer>
);

export default Footer;
