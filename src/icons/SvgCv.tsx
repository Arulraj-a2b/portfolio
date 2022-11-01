/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: "#767676",
  width: 40,
  height: 40,
};

const SvgCv = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      style={{ cursor: "pointer" }}
      fill="none"
    >
      <circle cx={20} cy={20} r={20} fill="#F0F0F6" />
      <g clipPath="url(#Cv_svg__a)">
        <path
          d="m23.764 22.272-3.514 3.354-3.514-3.354C14.103 22.381 12 24.438 12 26.976v.337c0 .932.792 1.688 1.768 1.688h12.964c.976 0 1.768-.756 1.768-1.688v-.337c0-2.538-2.103-4.595-4.736-4.704ZM12.5 13.806l.236.053v2.053c-.258.148-.442.405-.442.714 0 .295.17.541.409.692l-.575 2.19c-.063.243.077.493.28.493h1.54c.202 0 .342-.25.28-.492l-.575-2.19c.24-.152.409-.398.409-.693 0-.31-.185-.566-.443-.714v-1.849l2.431.559a4.304 4.304 0 0 0-.515 2.004c0 2.485 2.11 4.5 4.714 4.5 2.604 0 4.714-2.015 4.714-4.5 0-.724-.195-1.4-.515-2.004l3.546-.816c.67-.154.67-.952 0-1.107l-7.012-1.617a3.313 3.313 0 0 0-1.462 0l-7.02 1.613c-.667.155-.667.957 0 1.111Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="Cv_svg__a">
          <path fill="#fff" transform="translate(11 11)" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgCv.defaultProps = defaultProps;

export default SvgCv;
