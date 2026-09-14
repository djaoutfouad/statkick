import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

// Initialize the app with SSG using the centralized routes
export const createRoot = ViteReactSSG({ routes });
