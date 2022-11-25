/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  width: 40,
  height: 40,
  className: "",
};

const SvgEmail = ({ width, height, className }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <circle cx={20} cy={20} r={20} fill="#FFB400" />
      <g clipPath="url(#Email_svg__a)">
        <path
          d="M13.25 13.25h13.5a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75h-13.5a.75.75 0 0 1-.75-.75V14a.75.75 0 0 1 .75-.75Zm6.795 6.512-4.809-4.084-.971 1.143 5.79 4.917 5.686-4.92-.982-1.135-4.713 4.08h-.001Z"
          fill="#2B2B2B"
        />
      </g>
      <defs>
        <clipPath id="Email_svg__a">
          <path fill="#fff" transform="translate(11 11)" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgEmail.defaultProps = defaultProps;

export default SvgEmail;
