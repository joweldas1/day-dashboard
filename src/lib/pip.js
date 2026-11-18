/**
 * Document Picture-in-Picture API helper with graceful in-window fallback.
 */

let pipWindowInstance = null;

export function isDocumentPipSupported() {
  return typeof window !== 'undefined' && 'documentPictureInPicture' in window;
}

export async function openDocumentPip(renderCallback, onClosed) {
  if (!isDocumentPipSupported()) return null;

  try {
    if (pipWindowInstance) {
      pipWindowInstance.close();
      pipWindowInstance = null;
    }

    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 400,
      height: 280
    });

    pipWindowInstance = pipWindow;

    // Copy CSS stylesheets and link tags from main window
    Array.from(document.styleSheets).forEach((sheet) => {
      try {
        if (sheet.href) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = sheet.href;
          pipWindow.document.head.appendChild(link);
        } else if (sheet.cssRules) {
          const style = document.createElement('style');
          Array.from(sheet.cssRules).forEach((rule) => {
            style.appendChild(document.createTextNode(rule.cssText));
          });
          pipWindow.document.head.appendChild(style);
        }
      } catch (e) {
        if (sheet.href) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = sheet.href;
          pipWindow.document.head.appendChild(link);
        }
      }
    });

    // Copy Google Fonts link tags
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const cloned = link.cloneNode(true);
      pipWindow.document.head.appendChild(cloned);
    });

    // Transfer theme class
    const isDark = document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('light');
    if (isDark) {
      pipWindow.document.documentElement.classList.add('dark');
    } else {
      pipWindow.document.documentElement.classList.add('light');
    }

    pipWindow.document.body.className = 'pip-mode';
    pipWindow.document.title = 'Day Dashboard • Mini';

    const container = pipWindow.document.createElement('div');
    container.id = 'pip-root';
    pipWindow.document.body.appendChild(container);

    if (typeof renderCallback === 'function') {
      renderCallback(container, pipWindow);
    }

    pipWindow.addEventListener('pagehide', () => {
      pipWindowInstance = null;
      if (typeof onClosed === 'function') onClosed();
    });

    return pipWindow;
  } catch (err) {
    console.warn('Document Picture-in-Picture failed:', err);
    return null;
  }
}

export function closeDocumentPip() {
  if (pipWindowInstance) {
    try {
      pipWindowInstance.close();
    } catch (e) {}
    pipWindowInstance = null;
  }
}

export function getPipWindow() {
  return pipWindowInstance;
}
