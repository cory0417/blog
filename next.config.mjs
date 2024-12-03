import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.jsx",
});

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default withNextra(nextConfig);
