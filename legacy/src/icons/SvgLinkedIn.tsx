/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  width: 24,
  height: 24,
};

const SvgLinkedIn = ({ width, height }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ cursor: "pointer" }}
      fill="none"
    >
      <circle cx={12} cy={12} r={12} fill="#3B82F6" />
      <g clipPath="url(#Linkeding_svg__a)">
        <path
          d="M9.048 7.917a1.167 1.167 0 1 1-2.333-.001 1.167 1.167 0 0 1 2.333 0Zm.035 2.03H6.75v7.303h2.333V9.947Zm3.687 0h-2.322v7.303h2.298v-3.832c0-2.135 2.783-2.334 2.783 0v3.832h2.304v-4.626c0-3.599-4.118-3.465-5.086-1.697l.023-.98Z"
          fill="#2B2B2B"
        />
      </g>
      <defs>
        <clipPath id="Linkeding_svg__a">
          <path fill="#fff" transform="translate(5 5)" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgLinkedIn.defaultProps = defaultProps;

export default SvgLinkedIn;
