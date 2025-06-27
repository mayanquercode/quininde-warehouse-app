import { Ref, useEffect } from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing
} from 'react-native-reanimated';

type Props = {
  label: string;
  ref?: Ref<TextInput>;
  value?: string;
  onChangeText?: (text: string) => void;
} & TextInputProps;

const HEIGHT_INPUT = 50;
const POSITION_LABEL_FOCUS = -25;
const POSITION_LABEL_BLUR = 0;
const ANIMATION_DURATION = 200;
const FONT_SIZE_LARGE = 16;
const FONT_SIZE_SMALL = 12;
const LABEL_COLOR_NORMAL = '#555';
const LABEL_COLOR_ACTIVE = '#0066cc';

function Input({ label, ref, value = '', onChangeText, ...props }: Props) {
  // Valores animados
  const positionLabel = useSharedValue(value ? POSITION_LABEL_FOCUS : POSITION_LABEL_BLUR);
  const fontSize = useSharedValue(value ? FONT_SIZE_SMALL : FONT_SIZE_LARGE);
  const labelColor = useSharedValue(value ? LABEL_COLOR_ACTIVE : LABEL_COLOR_NORMAL);

  // Animación sincronizada con el valor
  useEffect(() => {
    const hasText = value.length > 0;

    positionLabel.value = withTiming(
      hasText ? POSITION_LABEL_FOCUS : POSITION_LABEL_BLUR,
      { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) }
    );

    fontSize.value = withTiming(
      hasText ? FONT_SIZE_SMALL : FONT_SIZE_LARGE,
      { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) }
    );

    labelColor.value = withTiming(
      hasText ? LABEL_COLOR_ACTIVE : LABEL_COLOR_NORMAL,
      { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) }
    );
  }, [value]);

  const positionLabelAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: positionLabel.value }],
    fontSize: fontSize.value,
    color: labelColor.value,
  }));

  const handleFocus = () => {
    positionLabel.value = withTiming(POSITION_LABEL_FOCUS, {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.ease)
    });

    fontSize.value = withTiming(FONT_SIZE_SMALL, {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.ease)
    });

    labelColor.value = withTiming(LABEL_COLOR_ACTIVE, {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.ease)
    });
  };

  const handleBlur = () => {
    const hasText = value.length > 0;

    positionLabel.value = withTiming(
      hasText ? POSITION_LABEL_FOCUS : POSITION_LABEL_BLUR,
      { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) }
    );

    fontSize.value = withTiming(
      hasText ? FONT_SIZE_SMALL : FONT_SIZE_LARGE,
      { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) }
    );

    labelColor.value = withTiming(
      hasText ? LABEL_COLOR_ACTIVE : LABEL_COLOR_NORMAL,
      { duration: ANIMATION_DURATION, easing: Easing.out(Easing.ease) }
    );
  };

  return (
    <View style={styles.groupInput}>
      <Animated.Text style={[styles.label, positionLabelAnimatedStyles]}>
        {label}
      </Animated.Text>

      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="transparent"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  groupInput: {
    flexGrow: 1,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: HEIGHT_INPUT,
    justifyContent: 'center',
    paddingTop: 10,
  },
  label: {
    position: 'absolute',
    left: 15,
    paddingHorizontal: 5,
    backgroundColor: '#f0f0f0',
    zIndex: 10,
  },
  input: {
    height: HEIGHT_INPUT,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default Input;