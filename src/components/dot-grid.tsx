import { View } from "react-native";
import Svg, { Circle, Defs, Pattern, Rect } from "react-native-svg";
import { useResolveClassNames } from "uniwind";

interface DotGridProps {
  spacing?: number;
  dotSize?: number;
  opacity?: number;
}

export function DotGrid({ spacing = 24, dotSize = 1, opacity = 0.08 }: DotGridProps) {
  // Use useResolveClassNames with text-foreground to get the foreground color
  const { color: foregroundColor } = useResolveClassNames("text-foreground");

  return (
    <View className="absolute inset-0" style={{ pointerEvents: "none" }}>
      <Svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Defs>
          <Pattern
            id="dotPattern"
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <Circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={dotSize}
              fill={foregroundColor as string}
              opacity={opacity}
            />
          </Pattern>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" />
      </Svg>
    </View>
  );
}
