Here's an updated version of the README to reflect the changes made to the `BottomSheet` component:

---

# Bottom Sheet React Native

A customizable, animated bottom sheet component for React Native applications.

## Installation

```bash
npm install bottom-sheet-react-native
```

or if you're using yarn:

```bash
yarn add bottom-sheet-react-native
```

## Dependencies

This package requires the following peer dependencies:

- react
- react-native
- react-native-reanimated
- twrnc

Make sure these are installed in your project.

## Usage

Here's a basic example of how to use the BottomSheet component:

```jsx
import React, { useRef } from "react";
import { View, Button } from "react-native";
import { BottomSheet, BottomSheetMethods } from "bottom-sheet-react-native";

const App = () => {
  const bottomSheetRef = useRef < BottomSheetMethods > null;

  const openBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleOutsideClick = () => {
    // Custom logic when clicking outside the bottom sheet
    console.log("Outside area clicked!");
    bottomSheetRef.current?.close();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
      <BottomSheet ref={bottomSheetRef} onClickOutside={handleOutsideClick}>
        <View style={{ padding: 20 }}>
          {/* Your bottom sheet content goes here */}
          <Button
            title="Close"
            onPress={() => bottomSheetRef.current?.close()}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default App;
```

## Props

The BottomSheet component accepts the following props:

| Prop           | Type             | Required | Default | Description                                                                                                |
| -------------- | ---------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| children       | React.ReactNode  | Yes      | -       | The content to be displayed inside the bottom sheet.                                                       |
| minHeight      | number \| string | No       | "30%"   | The minimum height of the bottom sheet. Can be a number (interpreted as pixels) or a string (e.g., '50%'). |
| onClickOutside | () => void       | No       | -       | A callback function triggered when clicking outside the bottom sheet.                                      |

## Methods

The BottomSheet component exposes the following methods through a ref:

| Method  | Description              |
| ------- | ------------------------ |
| open()  | Opens the bottom sheet.  |
| close() | Closes the bottom sheet. |

To use these methods, create a ref and pass it to the BottomSheet component:

```jsx
const bottomSheetRef = useRef < BottomSheetMethods > null;

// Later in your code:
bottomSheetRef.current?.open();
// or
bottomSheetRef.current?.close();
```

## Styling

The BottomSheet uses [twrnc](https://github.com/jaredh159/tailwind-react-native-classnames) for styling. You can customize the appearance by modifying the Tailwind classes in the component.

## Animations

This component uses [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) for smooth animations. The bottom sheet slides up from the bottom of the screen when opened and slides down when closed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

This update reflects the new `onClickOutside` prop and how users can handle outside clicks with custom logic.
