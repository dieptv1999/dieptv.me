import {
    Button,
    Card,
    Flex,
    Grid,
    Icon,
    Switch,
    Tooltip,
} from '@maximeheckel/design-system';
import { Drag } from '@visx/drag';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { AnimatePresence, motion } from 'framer-motion';
import { useInterval } from 'hooks';
import React, { useEffect } from 'react';
import styles from './CubicBezierVisualizer.module.css';

const x0 = 0;
const y0 = 1;

const x3 = 1;
const y3 = 0;

const easingControlPoints = {
    ease: {
        x1: 0.25,
        y1: 0.1,
        x2: 0.25,
        y2: 1,
    },
    easein: {
        x1: 0.42,
        y1: 0,
        x2: 1,
        y2: 1,
    },
    easeout: {
        x1: 0,
        y1: 0,
        x2: 0.58,
        y2: 1,
    },
    easeinout: {
        x1: 0.42,
        y1: 0,
        x2: 0.58,
        y2: 1,
    },
    easeinback: {
        x1: 0.36,
        y1: 0,
        x2: 0.66,
        y2: -0.56,
    },
    easeoutback: {
        x1: 0.34,
        y1: 1.56,
        x2: 0.64,
        y2: 1,
    },
    easeinoutback: {
        x1: 0.68,
        y1: -0.6,
        x2: 0.32,
        y2: 1.6,
    },
    easeincirc: {
        x1: 0.55,
        y1: 0,
        x2: 1,
        y2: 0.45,
    },
    easeoutcirc: {
        x1: 0,
        y1: 0.55,
        x2: 0.45,
        y2: 1,
    },
    easeinoutcirc: {
        x1: 0.85,
        y1: 0,
        x2: 0.15,
        y2: 1,
    },
};

const options = [
    {
        name: 'Ease',
        value: 'ease',
    },
    {
        name: 'Ease in',
        value: 'easein',
    },
    {
        name: 'Ease out',
        value: 'easeout',
    },
    {
        name: 'Ease in out',
        value: 'easeinout',
    },
    {
        name: 'Ease in back',
        value: 'easeinback',
    },
    {
        name: 'Ease out back',
        value: 'easeoutback',
    },
    {
        name: 'Ease in out back',
        value: 'easeinoutback',
    },
    {
        name: 'Ease in circ',
        value: 'easeincirc',
    },
    {
        name: 'Ease out circ',
        value: 'easeoutcirc',
    },
    {
        name: 'Ease in out circ',
        value: 'easeinoutcirc',
    },
];

const cubicDerivative = (P1, P2, layers = 60) => {
    const y = (t) =>
        3 * Math.pow(1 - t, 2) * (P1.y - y0) +
        6 * (1 - t) * t * (P2.y - P1.y) +
        3 * Math.pow(t, 2) * (y3 - P2.y);

    const x = (t) =>
        3 * Math.pow(1 - t, 2) * (P1.x - x0) +
        6 * (1 - t) * t * (P2.x - P1.x) +
        3 * Math.pow(t, 2) * (x3 - P2.x);

    const res = [];

    for (let t = 0; t <= 1; t = t + 1 / layers) {
        const valX = x(t);
        const valY = y(t);
        res.push({ x: valX, y: valY });
    }

    return res;
};

const cubic = (P1, P2, layers = 60) => {
    const y = (t) =>
        Math.pow(1 - t, 3) * y0 +
        3 * Math.pow(1 - t, 2) * t * P1.y +
        3 * (1 - t) * Math.pow(t, 2) * P2.y +
        Math.pow(t, 3) * y3;

    const x = (t) =>
        Math.pow(1 - t, 3) * x0 +
        3 * Math.pow(1 - t, 2) * t * P1.x +
        3 * (1 - t) * Math.pow(t, 2) * P2.x +
        Math.pow(t, 3) * x3;

    const res = [];

    for (let t = 0; t <= 1; t = t + 1 / layers) {
        const valX = x(t);
        const valY = y(t);
        res.push({ x: valX, y: valY });
    }
    res.push({ x: 1, y: 0 });

    return res;
};

let scrollable = true;

const listener = function (e) {
    if (!scrollable) {
        e.preventDefault();
    }
};

const DragHandle = (props) => {
    const {
        dimension,
        point,
        originPoint,
        scaleWidth,
        scaleHeight,
        onDragStart,
        onDragEnd,
        onDragMove,
    } = props;

    React.useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        document.addEventListener('touchmove', listener, {
            passive: false,
        });

        document.addEventListener('touchmove', listener, {
            passive: false,
        });
    }, []);

    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <Drag
            width={dimension.width || 400}
            height={dimension.height || 120}
            x={scaleWidth(point.x)}
            y={scaleHeight(point.y)}
            onDragStart={onDragStart}
            onDragMove={(dragData) => {
                const newX = Math.abs((dragData.x || 0) + dragData.dx);
                const newY = Math.abs((dragData.y || 0) + dragData.dy);

                onDragMove({ x: newX, y: newY });
            }}
            onDragEnd={onDragEnd}
        >
            {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
                <>
                    <line
                        x1={scaleWidth(originPoint.x)}
                        y1={scaleHeight(originPoint.y)}
                        x2={x}
                        y2={y}
                        fill="hsl(var(--palette-gray-50))"
                        stroke="hsl(var(--palette-gray-50))"
                        strokeWidth={3}
                        style={{
                            opacity: 0.5,
                        }}
                    />
                    <circle
                        cx={x}
                        cy={y}
                        r={10}
                        fill="hsl(var(--palette-gray-50))"
                        stroke={
                            isDragging
                                ? 'var(--maximeheckel-colors-brand)'
                                : 'var(--maximeheckel-colors-foreground)'
                        }
                        strokeWidth={2}
                        transform={`translate(${dx}, ${dy})`}
                        onMouseMove={dragMove}
                        onMouseUp={dragEnd}
                        onMouseDown={dragStart}
                        onTouchStart={(e) => {
                            scrollable = false;
                            dragStart(e);
                        }}
                        onTouchMove={dragMove}
                        onTouchEnd={(e) => {
                            scrollable = true;
                            dragEnd(e);
                        }}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab', opacity: 1 }}
                    />
                </>
            )}
        </Drag>
    );
};

const Chart = ({ width, height, editable, layers = 60, onChange = () => {} }) => {
    const [P1, setP1] = React.useState({ x: 0.19, y: 0.37 });
    const [P2, setP2] = React.useState({ x: 0.84, y: 0.57 });
    const [type, setType] = React.useState(options[0].value);

    const [activeStepIndex, setActiveStepIndex] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const [showHandles, setShowHandles] = React.useState(true);
    const [showTrace, setShowTrace] = React.useState(!editable);
    const [traceOnChart, setTraceOnChart] = React.useState(editable);
    const [paused, setPaused] = React.useState(false);
    const [showDerivative, setShowDerivative] = React.useState(false);

    const dimension = {
        width: editable ? width - 20 : width / 1.5,
        height: editable ? height - 20 : height / 1.5,
    };

    const data = React.useMemo(() => cubic(P1, P2, layers * 5), [P1, P2]);
    const speed = React.useMemo(() => cubicDerivative(P1, P2, layers * 5), [P1, P2]);

    useEffect(() => {
        onChange({
            data: cubic(P1, P2, layers),
            speed: cubicDerivative(P1, P2, layers),
        });
    }, [layers, P1, P2]);

    const getX = (d) => d.x;
    const getY = (d) => d.y;
    const repeat = () => setActiveStepIndex(0);

    const speedScale = scaleLinear({
        domain: [0, 2.5],
        range: [0, dimension.width],
        nice: true,
    });

    const speedScaleWidth = scaleLinear({
        domain: [0, 2.5],
        range: [0, dimension.width],
        nice: true,
    });

    const speedScaleHeight = scaleLinear({
        domain: [0, 2.5],
        range: [0, dimension.height],
        nice: true,
    });

    const scale = scaleLinear({
        domain: [0, 1],
        range: [0, dimension.width],
        nice: true,
    });

    const scaleWidth = scaleLinear({
        domain: [0, 1],
        range: [0, dimension.width],
        nice: true,
    });
    const scaleHeight = scaleLinear({
        domain: [0, 1],
        range: [0, dimension.height],
        nice: true,
    });

    React.useEffect(() => {
        if (!editable) {
            setP1({
                x: easingControlPoints[type].x1,
                y: easingControlPoints[type].y1,
            });
            setP2({
                x: easingControlPoints[type].x2,
                y: easingControlPoints[type].y2,
            });
        }
    }, [editable, type]);

    useInterval(() => {
        if (paused) {
            return;
        }

        if (activeStepIndex < layers * 5) {
            setActiveStepIndex((prev) => prev + 1);
        }
    }, 1000 / (layers * 5));

    if (width === 0) {
        return null;
    }

    return (
        <Grid gap={7}>
            {!editable ? (
                <select
                    id="ease-type"
                    value={type}
                    onChange={(event) => {
                        setType(event.target.value);
                        setActiveStepIndex(0);
                    }}
                    className={styles.select}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            ) : null}
            <svg
                width={dimension.width}
                height={dimension.height}
                style={{ overflow: 'visible', justifySelf: 'center' }}
            >
                <defs>
                    <linearGradient id="motion" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="20%"
                            stopColor="hsl(var(--palette-pink-30))"
                            stopOpacity={1}
                        />
                        <stop
                            offset="99%"
                            stopColor="hsl(var(--palette-indigo-30))"
                            stopOpacity={1}
                        />
                    </linearGradient>
                    <linearGradient id="speed" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="1%"
                            stopColor="hsl(var(--palette-green-50))"
                            stopOpacity={1}
                        />
                        <stop
                            offset="99%"
                            stopColor="hsl(var(--palette-orange-50))"
                            stopOpacity={1}
                        />
                    </linearGradient>
                </defs>
                <Group>
                    <line
                        x1={scaleWidth(0)}
                        y1={scaleHeight(1)}
                        x2={scaleWidth(1)}
                        y2={scaleHeight(0)}
                        fill="hsl(var(--palette-gray-50))"
                        stroke="hsl(var(--palette-gray-50))"
                        strokeWidth={6}
                        strokeLinecap="round"
                        style={{
                            opacity: 0.2,
                        }}
                    />
                    <LinePath
                        data={data}
                        x={(d) => scaleWidth(getX(d))}
                        y={(d) => scaleHeight(getY(d))}
                    >
                        {({ path }) => {
                            const d = path(data) || '';

                            return (
                                <motion.path
                                    d={d}
                                    strokeWidth={6}
                                    strokeOpacity={0.8}
                                    strokeLinecap="round"
                                    fill="none"
                                    stroke="url(#motion)"
                                    initial={{
                                        d,
                                    }}
                                    animate={{
                                        d,
                                    }}
                                />
                            );
                        }}
                    </LinePath>
                    <AnimatePresence>
                        {showDerivative ? (
                            <>
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <LinePath
                                        data={speed}
                                        x={(d) => speedScaleWidth(getX(d))}
                                        y={(d) => speedScaleHeight(getY(d))}
                                        strokeWidth={6}
                                        strokeOpacity={0.8}
                                        strokeLinecap="round"
                                        fill="none"
                                        stroke="url(#speed)"
                                    />
                                </motion.g>
                                <circle
                                    cx={0}
                                    cy={0}
                                    r={5}
                                    fill="var(--maximeheckel-colors-brand)"
                                    stroke="var(--maximeheckel-colors-brand)"
                                    transform={`translate(${speedScaleWidth(
                                        speed[activeStepIndex]?.x
                                    )}, ${speedScaleHeight(speed[activeStepIndex]?.y)})`}
                                />
                            </>
                        ) : null}
                    </AnimatePresence>
                    <circle
                        cx={0}
                        cy={0}
                        r={5}
                        fill="var(--maximeheckel-colors-brand)"
                        stroke="var(--maximeheckel-colors-brand)"
                        transform={`translate(${scaleWidth(data[activeStepIndex]?.x)}, ${scaleHeight(
                            data[activeStepIndex]?.y
                        )})`}
                    />
                    <AnimatePresence>
                        {showTrace ? (
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {data.map((step, index) =>
                                    index % 1 ? null : (
                                        <motion.circle
                                            cy={scaleHeight(step.y)}
                                            r={5}
                                            key={step.x}
                                            fill="var(--maximeheckel-colors-brand)"
                                            initial={{
                                                cx: scaleWidth(1.1), //traceOnChart ? scale(1.1) : scale(step.x),
                                                opacity: 0,
                                            }}
                                            animate={{
                                                cx: traceOnChart ? scaleWidth(step.x) : scaleWidth(1.1),
                                                opacity:
                                                    index === activeStepIndex
                                                        ? 1
                                                        : index > activeStepIndex
                                                            ? 0
                                                            : 0.4,
                                            }}
                                            transition={{
                                                opacity: { ease: 'linear', duration: 0 },
                                                cx: {
                                                    ease: 'easeInOut',
                                                    duration: isDragging ? 0 : 0.8,
                                                },
                                            }}
                                        />
                                    )
                                )}
                            </motion.g>
                        ) : null}
                    </AnimatePresence>
                    {showHandles && editable ? (
                        <>
                            <DragHandle
                                dimension={dimension.width}
                                scaleWidth={scaleWidth}
                                scaleHeight={scaleHeight}
                                point={P1}
                                originPoint={{ x: x0, y: y0 }}
                                onDragStart={() => {
                                    setShowTrace(false);
                                    setIsDragging(true);
                                }}
                                onDragMove={(point) => {
                                    setP1((prev) => {
                                        return {
                                            x: (prev.x * point.x) / scaleWidth(prev.x + 0.01),
                                            y: (prev.y * point.y) / scaleHeight(prev.y + 0.01),
                                        };
                                    });
                                }}
                                onDragEnd={() => {
                                    setShowTrace(true);
                                    setTimeout(() => setIsDragging(false), 100);
                                    setActiveStepIndex(0);
                                }}
                            />
                            <DragHandle
                                dimension={dimension.width}
                                scaleWidth={scaleWidth}
                                scaleHeight={scaleHeight}
                                point={P2}
                                originPoint={{ x: x3, y: y3 }}
                                onDragStart={() => {
                                    setShowTrace(false);
                                    setIsDragging(true);
                                }}
                                onDragMove={(point) => {
                                    setP2((prev) => {
                                        return {
                                            x: (prev.x * point.x) / scaleWidth(prev.x + 0.01),
                                            y: (prev.y * point.y) / scaleHeight(prev.y + 0.01),
                                        };
                                    });
                                }}
                                onDragEnd={() => {
                                    setShowTrace(true);
                                    setTimeout(() => setIsDragging(false), 100);
                                    setActiveStepIndex(0);
                                }}
                            />
                        </>
                    ) : null}
                </Group>
            </svg>
        </Grid>
    );
};

export const CubicBezierVisualizer = ({ editable, layers, onChange }) => {

    return (
        <div
            className={styles.cubicContainer}
        >
            <ParentSize>
                {({ width }) => <Chart width={width} height={80} editable={editable} layers={layers} onChange={onChange} />}
            </ParentSize>
        </div>
    );
};