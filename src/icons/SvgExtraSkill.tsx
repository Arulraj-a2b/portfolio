/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
    width: 15,
    height: 15,
  };
  
  const SvgExtraSkill = ({ width, height }: typeof defaultProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 15 15"
        style={{ cursor: "pointer" }}
        fill="none"
      >
        <path stroke="#FFB400" d="M.5.5h9v9h-9z" />
    <path stroke="#FFB400" d="M5.5 5.5h9v9h-9z" />
    <path stroke="#FFB400" d="M.5.5h9v9h-9z" />
    <path stroke="#FFB400" d="M5.5 5.5h9v9h-9z" />
      </svg>
    );
  };
  SvgExtraSkill.defaultProps = defaultProps;
  
  export default SvgExtraSkill;
  