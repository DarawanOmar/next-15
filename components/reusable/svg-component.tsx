import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  svg: React.ReactNode;
  color?: string;
  hoverColor?: string;
  height?: number;
  width?: number;
}

export const CustomSvgIcon: React.FC<SvgIconProps> = ({
  svg,
  color = "currentColor",
  hoverColor = color,
  viewBox = "0 0 23 24",
  width,
  height,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <svg
      {...props}
      width={width || "23"}
      height={height || "24"}
      viewBox={viewBox}
      fill={isHovered ? hoverColor : color}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {svg}
    </svg>
  );
};

export default CustomSvgIcon;
