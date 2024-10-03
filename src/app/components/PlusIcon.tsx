import { FC, SVGProps } from 'react';

interface PlusIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
}

export const PlusIcon: FC<PlusIconProps> = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);
