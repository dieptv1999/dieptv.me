import styles from './Glassmorphism.module.css';

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

export const GlassmorphismComponent = ({
                                         height = 0,
                                         width = 0,
                                         transparency = 0,
                                         blur = 0,
                                         outline = 0,
                                         color = 'rgb(255,255,255)',
                                         x = 0,
                                         y = 0,
                                         deg = 0,
                                         className = '',
                                       }) => {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        background: `rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, ${transparency})`,
        borderRadius: 16,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: `blur(${blur}px)`,
        '-webkit-backdrop-filter': `blur(${blur}px)`,
        height: height,
        width: width,
        top: y,
        left: x,
        transform: `rotate(${deg}deg)`,
        border: `1px solid rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, ${outline})`,
      }}
    >
    </div>
  );
};