import * as React from "react";
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/nextjs";
import localFont from "next/font/local";
import nextIntl from "./next-intl";
import "../src/app/globals.css";

const inter = localFont({ src: "../fonts/inter.woff2" });

function HtmlFont(props: { children: React.ReactNode }) {
  // We need the Inter font variable on the HTML body
  // for portalled components like popover, dialog, etc.
  React.useLayoutEffect(() => {
    document.documentElement.classList.add(inter.className);
    return () => {
      document.documentElement.classList.remove(inter.className);
    };
  }, []);

  return <div className={inter.className}>{props.children}</div>;
}

const preview: Preview = {
  tags: ["autodocs"],
  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
      "fr-CA": "French Canadian",
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories />
        </>
      ),
    },
    options: {
      storySort: {
        order: [
          "Design System",
          "UI Components",
          "App Components",
          "App Shell",
          "Dashboard",
          "Leads",
          "Enquiries",
          "Customers",
          "My Account",
          "Quotes",
          "Reports",
        ],
      },
    },
    backgrounds: { disable: true },
    actions: { argTypesRegex: "^on.*" },
    nextIntl,
  },
  decorators: [
    (Story) => (
      <HtmlFont>
        <Story />
      </HtmlFont>
    ),
    withThemeByClassName<ReactRenderer>({
      themes: { light: "bg-white-secondary", dark: "dark bg-white-secondary" },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
