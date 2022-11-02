/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  width: 40,
  height: 40,
  className: "",
};

const SvgCounty = ({ width, height, className }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      style={{ cursor: "pointer" }}
      fill="none"
      className={className}
    >
      <circle cx={20} cy={20} r={20} fill="#FFB400" />
      <g clipPath="url(#County_svg__a)">
        <path
          d="m12.5 14.75 5.25-2.25 4.5 2.25 4.727-2.026a.375.375 0 0 1 .523.345V25.25l-5.25 2.25-4.5-2.25-4.727 2.026a.376.376 0 0 1-.523-.345V14.75Zm9.75 11.073v-9.441l-.049.021-4.451-2.226v9.441l.049-.021 4.451 2.226Z"
          fill="#2B2B2B"
        />
      </g>
      <defs>
        <clipPath id="County_svg__a">
          <path fill="#fff" transform="translate(11 11)" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgCounty.defaultProps = defaultProps;

export default SvgCounty;
