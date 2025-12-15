import { useEffect, useRef } from "react";
import { Animated, DimensionValue, Easing, View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { useResolveClassNames } from "uniwind";

interface OrbConfig {
  id: string;
  cx: DimensionValue;
  cy: DimensionValue;
  r: number;
  duration: number;
  delay: number;
  translateX: number;
  translateY: number;
}

const orbs: OrbConfig[] = [
  { id: "orb1", cx: "20%", cy: "30%", r: 120, duration: 8000, delay: 0, translateX: 30, translateY: 20 },
  { id: "orb2", cx: "80%", cy: "20%", r: 80, duration: 10000, delay: 500, translateX: -25, translateY: 30 },
  { id: "orb3", cx: "60%", cy: "70%", r: 100, duration: 12000, delay: 1000, translateX: 20, translateY: -25 },
  { id: "orb4", cx: "30%", cy: "80%", r: 60, duration: 9000, delay: 300, translateX: -20, translateY: -20 },
  { id: "orb5", cx: "90%", cy: "60%", r: 70, duration: 11000, delay: 800, translateX: -30, translateY: 15 },
];

function FloatingOrb({ config, primaryColor }: { config: OrbConfig; primaryColor: string }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateOrb = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: config.translateX,
              duration: config.duration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
              delay: config.delay,
            }),
            Animated.timing(translateY, {
              toValue: config.translateY,
              duration: config.duration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1.1,
              duration: config.duration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: -config.translateX,
              duration: config.duration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: -config.translateY,
              duration: config.duration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 0.9,
              duration: config.duration / 2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    animateOrb();
  }, [config, translateX, translateY, scale]);

  return (
    <View
      style={{
        position: "absolute",
        left: config.cx,
        top: config.cy,
        marginLeft: -config.r,
        marginTop: -config.r,
      }}
    >
      <Animated.View style={{ transform: [{ translateX }, { translateY }, { scale }] }}>
        <Svg width={config.r * 2} height={config.r * 2}>
          <Defs>
            <RadialGradient id={`grad-${config.id}`} cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={primaryColor} stopOpacity={0.15} />
              <Stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={config.r} cy={config.r} r={config.r} fill={`url(#grad-${config.id})`} />
        </Svg>
      </Animated.View>
    </View>
  );
}

export function AnimatedHeroBg() {
  const { backgroundColor: primaryColor } = useResolveClassNames("bg-primary");

  return (
    <View className="absolute inset-0 overflow-hidden" style={{ pointerEvents: "none" }}>
      {orbs.map((orb) => (
        <FloatingOrb key={orb.id} config={orb} primaryColor={primaryColor as string} />
      ))}
    </View>
  );
}
