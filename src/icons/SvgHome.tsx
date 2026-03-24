/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: "#2B2B2B",
  width: 40,
  height: 40,
  circleFill: "#3B82F6",
};

const SvgHome = ({ width, height, fill, circleFill }: typeof defaultProps) => {
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
      <g clipPath="url(#Home_svg__a)">
        <path
          d="M26 26a.75.75 0 0 1-.75.75h-10.5A.75.75 0 0 1 14 26v-6.75h-2.25l7.745-7.041a.75.75 0 0 1 1.01 0l7.745 7.04H26V26Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="Home_svg__a">
          <path fill="#fff" transform="translate(11 11)" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgHome.defaultProps = defaultProps;

export default SvgHome;
