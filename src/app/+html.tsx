import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

const themeScript = `
(function() {
  try {
    var theme = document.cookie.match(/(?:^| )user-theme=([^;]+)/);
    theme = theme ? theme[1] : null;
    var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.style.backgroundColor = '#0a0a0a';
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.style.colorScheme = 'light';
      document.documentElement.style.backgroundColor = '#ffffff';
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

const criticalStyles = `
  html {
    background-color: #ffffff;
  }
  html.dark {
    background-color: #0a0a0a;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: inherit;
  }

  body {
    opacity: 0;
    transition: opacity 0.15s ease-in;
    background-color: inherit;
  }
  body.ready {
    opacity: 1;
  }
`;

const readyScript = `
(function() {
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      document.body.classList.add('ready');
    });
  });
})();
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Uniwind UI - shadcn/ui for React Native</title>
        <meta name="description" content="shadcn/ui compatible components for React Native. Built on Uniwind. Copy and paste into your apps." />

        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
        <ScrollViewStyleReset />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: readyScript }} />
      </body>
    </html>
  );
}
