import styles from './Glassmorphism.module.css'

export const GlassmorphismComponent = ({
    height = 0,
    width = 0,
    transparentcy = 0,
    blur = 0,
    outline = 0,
    color = 'rgb(255,255,255)',
    x = 0,
    y = 0,
    deg = 0,
}) => {
    return (
        <div
            className={styles.container}
            style={{
                background: 'rgba(255, 255, 255, 0.44)',
                borderRadius: 16,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(0.9px)',
                '-webkit-backdrop-filter': 'blur(0.9px)',
                height: height,
                width: width,
                top: y,
                left: x,
                transform: `rotate(${deg}deg)`,
            }}
        >
        </div>
    )
}