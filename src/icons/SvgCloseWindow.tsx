/* eslint max-len: ["error", { "code": 2000 }] */
import styles from './svgClose.module.css';

const defaultProps = {
  width: 20,
  height: 20,
  className: '',
  onClick: () => {},
};

const SvgCloseWindow = ({
  width,
  height,
  className,
  onClick,
}: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 256 256"
      style={{cursor: 'pointer'}}
      fill="none"
      className={className}
      onClick={onClick}>
      <g
        style={{
          stroke: 'none',
          strokeWidth: 0,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'none',
          fillRule: 'nonzero',
          opacity: 1,
        }}>
        <path
          className={styles.fillColor}
          d="M6 90a5.999 5.999 0 0 1-4.243-10.242l78-78a5.999 5.999 0 0 1 8.484 0 5.998 5.998 0 0 1 0 8.485l-78 78A5.976 5.976 0 0 1 6 90z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
        />
        <path
          className={styles.fillColor}
          d="M84 90a5.979 5.979 0 0 1-4.242-1.758l-78-78a6 6 0 0 1 8.485-8.485l78 78a5.997 5.997 0 0 1 0 8.484A5.98 5.98 0 0 1 84 90z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
        />
      </g>
    </svg>
  );
};
SvgCloseWindow.defaultProps = defaultProps;

export default SvgCloseWindow;
