// ============================================
// PWA Registration & Install Prompt
// ============================================

let deferredPrompt: any = null;
let installButton: HTMLElement | null = null;

const PWA_CACHE_PREFIX = 'assign-portal';

const isDevEnvironment = (): boolean => import.meta.env.DEV;

const clearAssignPortalDevState = async (): Promise<void> => {
    if (!('serviceWorker' in navigator)) return;

    try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
            registrations
                .filter((registration) => {
                    const scriptUrl = registration.active?.scriptURL
                        || registration.waiting?.scriptURL
                        || registration.installing?.scriptURL
                        || '';

                    return scriptUrl.includes('/service-worker.js');
                })
                .map((registration) => registration.unregister())
        );

        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName.startsWith(PWA_CACHE_PREFIX))
                    .map((cacheName) => caches.delete(cacheName))
            );
        }

        console.info('🧹 [PWA] Cleared local service workers and caches for development.');
    } catch (error) {
        console.warn('⚠️ [PWA] Failed to clear development service worker state:', error);
    }
};

/**
 * Register the service worker and set up PWA features.
 * Call this once from index.tsx on app load.
 */
export function registerPWA(): void {
    if (isDevEnvironment()) {
        window.addEventListener('load', () => {
            void clearAssignPortalDevState();
        });
        return;
    }

    // 1. Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            try {
                const registration = await navigator.serviceWorker.register('/service-worker.js');
                console.log('✅ [PWA] Service Worker registered:', registration.scope);

                // Check for updates periodically (every 60 minutes)
                setInterval(() => {
                    registration.update();
                }, 60 * 60 * 1000);

                // Listen for new service worker waiting
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdateNotification();
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('❌ [PWA] Service Worker registration failed:', error);
            }
        });
    }

    // 2. Handle Install Prompt
    window.addEventListener('beforeinstallprompt', (e: Event) => {
        e.preventDefault();

        // Check if user previously dismissed or installed the app
        if (localStorage.getItem('pwa_prompt_dismissed') === 'true') {
            return;
        }

        deferredPrompt = e;
        console.log('📱 [PWA] Install prompt captured');

        // Show install button after 5 seconds
        setTimeout(() => {
            if (deferredPrompt) {
                showInstallButton();
            }
        }, 5000);
    });

    // 3. Track successful installation
    window.addEventListener('appinstalled', () => {
        console.log('🎉 [PWA] App installed successfully!');
        deferredPrompt = null;
        hideInstallButton();
    });
}

/**
 * Create and show a floating install button
 */
function showInstallButton(): void {
    // Don't create duplicate buttons
    if (installButton) return;

    installButton = document.createElement('div'); // Changed to div to hold multiple buttons
    installButton.id = 'pwa-install-btn';
    installButton.innerHTML = `
      <button id="pwa-install-trigger" style="display: flex; align-items: center; background: none; border: none; color: white; font-family: inherit; font-size: inherit; font-weight: inherit; cursor: pointer; padding: 0;">
        <span style="margin-right: 8px; font-size: 20px;">📱</span>
        <span>Install App</span>
      </button>
      <button id="pwa-install-close" style="margin-left: 16px; background: rgba(0,0,0,0.2); border: none; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 10px; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.4)'" onmouseout="this.style.background='rgba(0,0,0,0.2)'">✕</button>
    `;

    // Styling
    Object.assign(installButton.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 14px 10px 20px',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderRadius: '50px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: "'Outfit', 'Inter', sans-serif",
        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
        transition: 'all 0.3s ease',
        animation: 'pwa-fade-in 0.5s ease-out',
    });

    // Hover effect (entire toast)
    installButton.addEventListener('mouseenter', () => {
        if (installButton) {
            installButton.style.transform = 'scale(1.05)';
            installButton.style.boxShadow = '0 6px 25px rgba(59, 130, 246, 0.6)';
        }
    });
    installButton.addEventListener('mouseleave', () => {
        if (installButton) {
            installButton.style.transform = 'scale(1)';
            installButton.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.4)';
        }
    });

    // Click → trigger install
    const triggerBtn = installButton.querySelector('#pwa-install-trigger');
    triggerBtn?.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`[PWA] User ${outcome === 'accepted' ? 'accepted' : 'dismissed'} install prompt`);
        if (outcome === 'dismissed' || outcome === 'accepted') {
            localStorage.setItem('pwa_prompt_dismissed', 'true');
        }
        deferredPrompt = null;
        hideInstallButton();
    });

    // Click → close button
    const closeBtn = installButton.querySelector('#pwa-install-close');
    closeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        localStorage.setItem('pwa_prompt_dismissed', 'true');
        hideInstallButton();
    });

    // Auto-hide after 10 seconds of visibility (optional, to keep screen clear)
    setTimeout(() => {
        if (installButton) {
            hideInstallButton();
        }
    }, 10000);

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
    @keyframes pwa-fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pwa-slide-down {
      from { opacity: 0; transform: translateY(-100%); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
    document.head.appendChild(style);

    document.body.appendChild(installButton);
}

/**
 * Hide and remove the install button
 */
function hideInstallButton(): void {
    if (installButton) {
        installButton.style.opacity = '0';
        installButton.style.transform = 'translateY(20px)';
        setTimeout(() => {
            installButton?.remove();
            installButton = null;
        }, 300);
    }
}

/**
 * Show update notification banner at the top of the page
 */
function showUpdateNotification(): void {
    const banner = document.createElement('div');
    banner.id = 'pwa-update-banner';
    banner.innerHTML = `
    <span>🔄 New version available!</span>
    <button id="pwa-update-btn" style="
      margin-left: 12px;
      padding: 6px 16px;
      background: #ffffff;
      color: #0a0e1a;
      border: none;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      font-family: 'Outfit', 'Inter', sans-serif;
    ">Reload</button>
    <button id="pwa-dismiss-btn" style="
      margin-left: 8px;
      padding: 6px 12px;
      background: transparent;
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 20px;
      font-size: 13px;
      cursor: pointer;
      font-family: 'Outfit', 'Inter', sans-serif;
    ">Later</button>
  `;

    Object.assign(banner.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '10001',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 20px',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: "'Outfit', 'Inter', sans-serif",
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        animation: 'pwa-slide-down 0.4s ease-out',
    });

    document.body.appendChild(banner);

    // Reload button
    document.getElementById('pwa-update-btn')?.addEventListener('click', () => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
    });

    // Dismiss button
    document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-100%)';
        setTimeout(() => banner.remove(), 400);
    });
}
