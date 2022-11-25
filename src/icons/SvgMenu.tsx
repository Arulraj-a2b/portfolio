/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: "#000000",
  width: 24.75,
  height: 24.75,
};

const SvgMenu = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24.75 24.75"
      xmlSpace="preserve"
      style={{ cursor: "pointer" }}
    >
      <path
        fill={fill}
        d="M0 3.875a2 2 0 0 1 2-2h20.75a2 2 0 0 1 0 4H2a2 2 0 0 1-2-2zm22.75 6.5H2a2 2 0 0 0 0 4h20.75a2 2 0 0 0 0-4zm0 8.5H2a2 2 0 0 0 0 4h20.75a2 2 0 0 0 0-4z"
      />
    </svg>
  );
};
SvgMenu.defaultProps = defaultProps;

export default SvgMenu;
