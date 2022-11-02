/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: "#767676",
  width: 40,
  height: 40,
  circleFill: "#F0F0F6",
};

const SvgPortfolio = ({
  width,
  height,
  fill,
  circleFill,
}: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      style={{ cursor: "pointer" }}
      fill="none"
    >
      <circle cx={20} cy={20} r={20} fill={circleFill} />
      <g clipPath="url(#Portfolio_svg__a)">
        <path
          d="M17.75 20.75V23h4.5v-2.25h5.25V26a.75.75 0 0 1-.75.75h-13.5a.75.75 0 0 1-.75-.75v-5.25h5.25Zm1.5-1.5h1.5v2.25h-1.5v-2.25Zm-3-4.5V12.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v2.25h3a.75.75 0 0 1 .75.75v3.75h-5.25v-1.5h-4.5v1.5H12.5V15.5a.75.75 0 0 1 .75-.75h3Zm1.5-1.5v1.5h4.5v-1.5h-4.5Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="Portfolio_svg__a">
          <path fill="#fff" transform="translate(11 11)" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgPortfolio.defaultProps = defaultProps;

export default SvgPortfolio;
