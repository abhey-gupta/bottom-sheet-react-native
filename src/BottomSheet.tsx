import { Pressable, ViewStyle } from "react-native";
import React, { useImperativeHandle, forwardRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import tailwind from "twrnc";

interface BottomSheetProps {
  children: React.ReactNode;
  minHeight: number | string;
}

export interface BottomSheetMethods {
  open: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetMethods, BottomSheetProps>(
  (props, ref) => {
    const { children, minHeight } = props;
    const [isRendered, setIsRendered] = useState(false);
    const isVisible = useSharedValue(false);

    const overlayStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(isVisible.value ? 1 : 0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }),
      };
    });

    const sheetStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withTiming(isVisible.value ? 0 : 1000, {
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            }),
          },
        ],
      };
    });

    const hideSheet = () => {
      setIsRendered(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsRendered(true);
        isVisible.value = true;
      },
      close: () => {
        isVisible.value = false;
        setTimeout(hideSheet, 300);
      },
    }));

    if (!isRendered) return null;

    const dynamicSheetStyle: ViewStyle = {
      // @ts-ignore
      minHeight: minHeight,
      maxHeight: "80%",
    };

    return (
      <Animated.View
        style={[
          tailwind`absolute bottom-0 h-full w-full bg-[#00000070] z-10`,
          overlayStyle,
        ]}
      >
        <Pressable
          style={tailwind`flex-1`}
          onPress={() => {
            isVisible.value = false;
            setTimeout(hideSheet, 300);
          }}
        />
        <Animated.View
          style={[
            tailwind`absolute bottom-0 w-full bg-white items-center rounded-t-2xl`,
            dynamicSheetStyle,
            sheetStyle,
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    );
  }
);

export default BottomSheet;
