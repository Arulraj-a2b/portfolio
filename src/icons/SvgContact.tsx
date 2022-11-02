/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: "#767676",
  width: 40,
  height: 40,
  circleFill: "#F0F0F6",
};

const SvgContact = ({
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
      <g clipPath="url(#Contact_svg__a)">
        <path
          d="M15.841 25.25 12.5 27.875V14a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H15.841Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="Contact_svg__a">
          <path fill="#fff" transform="translate(11 11)" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgContact.defaultProps = defaultProps;

export default SvgContact;
