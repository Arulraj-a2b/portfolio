/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: "#2B2B2B",
  width: 30,
  height: 30,
  className:''
};

const SvgContrast = ({ width, height, fill ,className}: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      style={{ cursor: "pointer" }}
      fill="none"
      className={className}
    >
      <g clipPath="url(#Contrast_svg__a)">
        <path
          d="M15.5 27C8.596 27 3 21.404 3 14.5S8.596 2 15.5 2 28 7.596 28 14.5 22.404 27 15.5 27Zm-8.339-6.969A10 10 0 1 0 21.031 6.16a11.247 11.247 0 0 1-2.88 10.991 11.246 11.246 0 0 1-10.99 2.88Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="Contrast_svg__a">
          <path fill="#fff" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
SvgContrast.defaultProps = defaultProps;

export default SvgContrast;
