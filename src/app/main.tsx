import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AvatarPage } from '../pages/avatar-page/ui/avatar-page';
import './styles/global.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AvatarPage />
  </StrictMode>,
);
