import type { Meta, StoryObj } from '@storybook/react-vite';
import tailwindConfig from '../../tailwind.config.mjs';

const BACKGROUND_COLOR = '#2d3036';
const AA_NORMAL_TEXT = 4.5;
const AA_LARGE_TEXT = 3;

const getChannelLuminance = (channel: number) => {
  const value = channel / 255;

  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const getLuminance = (hexColor: string) => {
  const [red, green, blue] = [1, 3, 5].map((start) => getChannelLuminance(Number.parseInt(hexColor.slice(start, start + 2), 16)));

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const getContrast = (firstColor: string, secondColor: string) => {
  const [lighter, darker] = [getLuminance(firstColor), getLuminance(secondColor)].sort((first, second) => second - first);

  return (lighter + 0.05) / (darker + 0.05);
};

const getGrade = (contrast: number) => {
  if (contrast >= AA_NORMAL_TEXT) {
    return 'AA';
  }

  if (contrast >= AA_LARGE_TEXT) {
    return 'AA large text';
  }

  return 'Decoration only';
};

const palette = Object.entries(tailwindConfig.theme.extend.colors).flatMap(([family, shades]) =>
  Object.entries(shades).map(([shade, color]) => ({
    name: shade === 'DEFAULT' ? family : `${family}-${shade}`,
    color,
    contrast: getContrast(color, BACKGROUND_COLOR),
  })),
);

const Palette = () => (
  <div>
    <h1 className="text-2xl font-bold">Color palette</h1>
    <p className="mt-2 text-sm">
      Read from <code>tailwind.config.mjs</code>. Contrast against the page background, <code>{BACKGROUND_COLOR}</code>.
    </p>

    <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {palette.map(({ name, color, contrast }) => (
        <li key={name} className="rounded-xl overflow-hidden bg-dark-charcoal shadow-xl">
          <div className="h-20" style={{ backgroundColor: color }} />
          <div className="p-3 text-sm">
            <p className="font-bold">{name}</p>
            <p>{color}</p>
            <p>
              {contrast.toFixed(2)}:1 · {getGrade(contrast)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const meta: Meta<typeof Palette> = { title: 'Foundations/Colors', component: Palette };

export default meta;

export const AllColors: StoryObj<typeof Palette> = {};
