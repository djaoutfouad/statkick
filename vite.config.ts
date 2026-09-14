import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
    // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  ssgOptions: {
    script: 'async',
    formatting: 'none',
    includedRoutes() {
      return [
        '/',
        '/blog',
        '/blog/what-is-xg-in-football',
        '/blog/how-football-player-ratings-work',
        '/blog/what-is-ppda-how-is-pressing-measured',
        '/blog/how-to-analyze-football-team-performance',
        '/blog/possession-vs-performance',
        '/blog/how-to-compare-football-players-using-statistics',
        '/blog/understanding-shot-conversion-rate',
        '/blog/how-to-analyze-football-form',
        '/blog/football-transfer-value',
        '/blog/fantasy-football-statistics',
        '/blog/how-to-read-a-football-league-table',
        '/blog/football-statistics-every-serious-fan-should-know',
        '/guides',
        '/guides/beginners-guide-to-football-analytics',
        '/guides/how-to-analyze-a-player',
        '/guides/how-to-compare-two-football-teams',
        '/guides/how-to-measure-pressing',
        '/guides/how-to-analyze-attacking-efficiency',
        '/guides/how-to-analyze-defensive-performance',
        '/guides/how-to-use-football-statistics-correctly',
        '/methodology',
        '/disclaimer',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/cookies',
        // 21 Tactical & Analytics Tools
        '/tools/player-performance-rater',
        '/tools/team-comparison',
        '/tools/pass-accuracy-calculator',
        '/tools/shot-conversion-rate',
        '/tools/possession-impact-analyzer',
        '/tools/player-form-index',
        '/tools/transfer-value-estimator',
        '/tools/wage-calculator',
        '/tools/squad-value-calculator',
        '/tools/contract-worth-analyzer',
        '/tools/fantasy-football-points',
        '/tools/best-xi-selector',
        '/tools/captain-pick-analyzer',
        '/tools/transfer-suggestion',
        '/tools/league-table-simulator',
        '/tools/points-needed-calculator',
        '/tools/head-to-head-stats',
        '/tools/season-goals-tracker',
        '/tools/formation-analyzer',
        '/tools/pressing-intensity-calculator',
        '/tools/set-piece-success-rate',
      ];
    },
  },
});
