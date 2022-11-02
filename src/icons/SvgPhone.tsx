/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  width: 40,
  height: 40,
  className: "",
};

const SvgPhone = ({ width, height, className }: typeof defaultProps) => {
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
      <g clipPath="url(#Phone_svg__a)">
        <path
          d="M15.5 12.5h9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-13.5a.75.75 0 0 1 .75-.75ZM20 23.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
          fill="#2B2B2B"
        />
      </g>
      <defs>
        <clipPath id="Phone_svg__a">
          <path fill="#fff" transform="translate(11 11)" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgPhone.defaultProps = defaultProps;

export default SvgPhone;
