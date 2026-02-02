# 🎯 Quick Start Guide - Dating App Onboarding

## 🚀 Getting Started

### Run the app:
```bash
npm start
# or
expo start
```

### Test the onboarding flow:
1. Open the app on your device/simulator
2. On the login screen, tap "Continue with Google"
3. You'll be navigated through:
   - Basic Identity (Step 1/3)
   - Bio & Interests (Step 2/3)
   - Profile Builder (Step 3/3)

## 📂 File Structure

```
app/
├── login.tsx                           # Login screen (entry point)
└── onboarding/
    ├── basic-identity.tsx              # Step 1: Name, DOB, Gender
    ├── bio-interests.tsx               # Step 2: Bio & Interests
    └── profile-builder.tsx             # Step 3: Photo uploads

components/ui/
├── Cta_btn.tsx                         # Call-to-action button
├── TextInput.tsx                       # Text input with label/error
├── DatePicker.tsx                      # Cross-platform date picker
├── Dropdown.tsx                        # Modal dropdown selector
├── InterestChip.tsx                    # Selectable interest tag
├── ProgressBar.tsx                     # Step progress indicator
├── ImageUpload.tsx                     # Photo picker component
├── LogoBranding.tsx                    # App logo component
└── DecorativeStripes.tsx               # Background decoration

constants/
└── globalStyles.ts                     # All colors, fonts, spacing

examples/
└── components-example.tsx              # Usage examples
```

## 🎨 Component Usage Quick Reference

### TextInput
```tsx
<TextInput
  label="First Name"
  placeholder="Enter your name"
  value={name}
  onChangeText={setName}
  error={error}
/>
```

### DatePicker
```tsx
<DatePicker
  label="Date of Birth"
  value={date}
  onChange={setDate}
/>
```

### Dropdown
```tsx
<Dropdown
  label="Gender"
  value={gender}
  options={["Male", "Female", "Other"]}
  onChange={setGender}
/>
```

### InterestChip
```tsx
<InterestChip
  label="Travel"
  selected={isSelected}
  onPress={handlePress}
/>
```

### ImageUpload
```tsx
<ImageUpload
  imageUri={image}
  onImageSelect={setImage}
  size={150}
/>
```

### ProgressBar
```tsx
<ProgressBar
  totalSteps={3}
  currentStep={1}
/>
```

### CTA Button
```tsx
<CTA_BTN
  text="Continue"
  onPress={handlePress}
  btnColor={colors.primary}
/>
```

## 🎨 Using Global Styles

```tsx
import {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  fontFamilies,
} from "@/constants/globalStyles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
  },
  text: {
    color: colors.secondary,
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
  },
});
```

## ✅ Validation Examples

### Basic Identity Screen
```tsx
const validateAge = () => {
  const age = calculateAge(dateOfBirth);
  if (age < 18) {
    setError("Must be 18+ years old");
    return false;
  }
  return true;
};
```

### Bio & Interests Screen
```tsx
const validateBio = () => {
  if (bio.length < 20) {
    setError("Bio must be at least 20 characters");
    return false;
  }
  if (interests.length < 3) {
    setError("Select at least 3 interests");
    return false;
  }
  return true;
};
```

### Profile Builder Screen
```tsx
const validatePhotos = () => {
  const count = images.filter(img => img).length;
  if (count < 2) {
    setError("Upload at least 2 photos");
    return false;
  }
  return true;
};
```

## 🔄 Navigation Flow

```tsx
// From login to onboarding
router.push("/onboarding/basic-identity");

// Between onboarding screens
router.push("/onboarding/bio-interests");
router.push("/onboarding/profile-builder");

// Complete onboarding
router.replace("/"); // Back to main app

// Go back
router.back();
```

## 📱 Screen Previews

### Step 1: Basic Identity
- First Name input
- Last Name input
- Date of Birth picker
- Gender dropdown
- Looking for dropdown
- ✓ Age validation (18+)

### Step 2: Bio & Interests
- Multi-line bio text area
- 20 selectable interest chips
- Character counter (20-500)
- Selection counter (3-10)
- ✓ Bio length validation
- ✓ Interest count validation

### Step 3: Profile Builder
- 1 main photo (larger)
- 5 additional photos
- Photo tips section
- Upload counter
- ✓ Minimum 2 photos required

## 🎯 Key Features

✨ **Form Validation** - Real-time error messages
✨ **Progress Tracking** - Visual step indicator
✨ **Haptic Feedback** - Touch interactions feel responsive
✨ **Cross-Platform** - Works on iOS & Android
✨ **Keyboard Aware** - Automatic scrolling
✨ **Image Optimization** - Cropping & quality control
✨ **Type Safe** - Full TypeScript support
✨ **Theme Consistent** - Uses global styles throughout

## 🔧 Customization

### Change Colors
Edit `constants/globalStyles.ts`:
```tsx
export const colors = {
  primary: "#FF6347",      // Your brand color
  secondary: "#1E3A5F",    // Dark text
  background: "#F5EFE6",   // Page background
  // ...
};
```

### Add More Interests
Edit `app/onboarding/bio-interests.tsx`:
```tsx
const availableInterests = [
  "Travel", "Music", "Sports",
  // Add your interests here
];
```

### Modify Validation Rules
Edit validation functions in each screen:
```tsx
const validateForm = () => {
  // Your custom validation logic
};
```

## 📚 Documentation

- **ONBOARDING_DOCUMENTATION.md** - Detailed component docs
- **IMPLEMENTATION_SUMMARY.md** - Overview of what was built
- **STYLES_DOCUMENTATION.md** - Global styles guide
- **components-example.tsx** - Usage examples

## 🐛 Troubleshooting

### ESLint module resolution errors
These are usually false positives. Try:
```bash
# Reload VS Code window
Cmd/Ctrl + Shift + P → "Developer: Reload Window"
```

### TypeScript errors
```bash
npm run lint
npx tsc --noEmit
```

### Missing dependencies
```bash
npx expo install expo-image-picker @react-native-community/datetimepicker
```

## 🎉 You're All Set!

Everything is ready to use. Just run `npm start` and test the flow!

For questions or issues, check the documentation files or the inline code comments.
