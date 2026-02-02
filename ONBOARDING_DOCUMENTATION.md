# Onboarding Screens Documentation

This document describes the three onboarding screens and reusable components created for the Destined dating app.

## 📱 Screens

### 1. Basic Identity Screen
**File**: [app/onboarding/basic-identity.tsx](app/onboarding/basic-identity.tsx)

Collects essential user information:
- First Name
- Last Name
- Date of Birth (with age validation - must be 18+)
- Gender (dropdown selection)
- Looking For (dating preference)

**Features**:
- Form validation with error messages
- Progress indicator (Step 1/3)
- Keyboard-aware scrolling
- Decorative stripes matching app theme

**Navigation**: Proceeds to Bio & Interests screen on successful validation

---

### 2. Bio & Interests Screen
**File**: [app/onboarding/bio-interests.tsx](app/onboarding/bio-interests.tsx)

Captures user personality and preferences:
- About Me bio (20-500 characters, multiline input)
- Interest selection (choose 3-10 from 20 options)
- Character counter for bio
- Selected interest counter

**Features**:
- Multi-select interest chips with haptic feedback
- Form validation ensuring minimum requirements
- Progress indicator (Step 2/3)
- Back navigation to previous screen
- Visual feedback on selected interests

**Available Interests**:
Travel, Photography, Music, Cooking, Fitness, Reading, Movies, Gaming, Art, Dancing, Hiking, Yoga, Coffee, Wine, Sports, Technology, Fashion, Food, Pets, Nature

**Navigation**: 
- Continue to Profile Builder screen
- Back to Basic Identity screen

---

### 3. Profile Builder Screen
**File**: [app/onboarding/profile-builder.tsx](app/onboarding/profile-builder.tsx)

Handles photo uploads for user profile:
- 1 main photo (larger display)
- 5 additional photos
- Minimum 2 photos required
- Maximum 6 photos supported

**Features**:
- Image picker with camera roll permissions
- Grid layout for photos
- Photo upload counter (X/6 photos uploaded)
- Helpful photo tips section
- Progress indicator (Step 3/3)
- Completion alert dialog

**Photo Tips Provided**:
- Show your face clearly
- Include variety (close-ups, full body)
- Use recent photos
- Show your hobbies and interests
- Smile naturally!

**Navigation**: 
- Complete profile and return to main app
- Back to Bio & Interests screen

---

## 🧩 Reusable Components

### TextInput
**File**: [components/ui/TextInput.tsx](components/ui/TextInput.tsx)

Custom text input with label and error handling.

**Props**:
- `label?: string` - Optional label above input
- `error?: string` - Error message to display
- `containerStyle?: object` - Custom container styling
- All standard React Native `TextInputProps`

**Usage**:
```tsx
<TextInput
  label="First Name"
  placeholder="Enter your first name"
  value={firstName}
  onChangeText={setFirstName}
  error={errors.firstName}
/>
```

---

### DatePicker
**File**: [components/ui/DatePicker.tsx](components/ui/DatePicker.tsx)

Cross-platform date picker with iOS modal and Android native picker.

**Props**:
- `label?: string` - Optional label
- `value: Date` - Current date value
- `onChange: (date: Date) => void` - Callback when date changes
- `error?: string` - Error message
- `containerStyle?: object` - Custom styling

**Features**:
- Platform-specific UI (iOS modal, Android native)
- Maximum date set to today
- Formatted date display

**Usage**:
```tsx
<DatePicker
  label="Date of Birth"
  value={dateOfBirth}
  onChange={setDateOfBirth}
  error={errors.dateOfBirth}
/>
```

---

### Dropdown
**File**: [components/ui/Dropdown.tsx](components/ui/Dropdown.tsx)

Custom dropdown selector with modal picker.

**Props**:
- `label?: string` - Optional label
- `value: string` - Selected value
- `options: string[]` - Array of options
- `onChange: (value: string) => void` - Selection callback
- `placeholder?: string` - Placeholder text
- `error?: string` - Error message
- `containerStyle?: object` - Custom styling

**Usage**:
```tsx
<Dropdown
  label="Gender"
  value={gender}
  options={["Man", "Woman", "Non-binary"]}
  onChange={setGender}
  placeholder="Select your gender"
  error={errors.gender}
/>
```

---

### InterestChip
**File**: [components/ui/InterestChip.tsx](components/ui/InterestChip.tsx)

Selectable chip/tag for interests with haptic feedback.

**Props**:
- `label: string` - Interest label text
- `selected?: boolean` - Selected state
- `onPress?: () => void` - Press callback

**Features**:
- Haptic feedback on tap
- Visual state changes (color, border)
- Smooth transitions

**Usage**:
```tsx
<InterestChip
  label="Travel"
  selected={selectedInterests.includes("Travel")}
  onPress={() => toggleInterest("Travel")}
/>
```

---

### ProgressBar
**File**: [components/ui/ProgressBar.tsx](components/ui/ProgressBar.tsx)

Visual progress indicator for multi-step flows.

**Props**:
- `totalSteps: number` - Total number of steps
- `currentStep: number` - Current active step (1-indexed)

**Usage**:
```tsx
<ProgressBar totalSteps={3} currentStep={1} />
```

---

### ImageUpload
**File**: [components/ui/ImageUpload.tsx](components/ui/ImageUpload.tsx)

Image picker with preview and permissions handling.

**Props**:
- `imageUri?: string` - Current image URI
- `onImageSelect: (uri: string) => void` - Callback with selected image
- `size?: number` - Square size (default: 120)
- `label?: string` - Optional label

**Features**:
- Camera roll permissions request
- Image cropping (1:1 aspect ratio)
- 0.8 quality optimization
- Placeholder with "+" icon

**Usage**:
```tsx
<ImageUpload
  imageUri={profileImage}
  onImageSelect={setProfileImage}
  size={160}
  label="Main Photo"
/>
```

---

## 🎨 Theme Consistency

All components use global styles from [constants/globalStyles.ts](constants/globalStyles.ts):

- **Colors**: Primary (tomato), Secondary (navy), Background (beige)
- **Fonts**: ZonaPro-Bold
- **Spacing**: Consistent padding/margins
- **Border Radius**: Uniform rounded corners
- **Font Sizes**: Standardized text sizes

---

## 📦 Required Dependencies

The following packages are used:
- `expo-image-picker` - For photo uploads
- `@react-native-community/datetimepicker` - For date selection
- `expo-haptics` - For tactile feedback
- `expo-router` - For navigation

All dependencies are included in the project's package.json.

---

## 🚀 Navigation Flow

```
Login Screen
    ↓
Basic Identity (Step 1/3)
    ↓
Bio & Interests (Step 2/3)
    ↓
Profile Builder (Step 3/3)
    ↓
Main App
```

Users can navigate backward through the flow but cannot skip steps.

---

## ✅ Validation Rules

### Basic Identity
- First Name: Required
- Last Name: Required
- Date of Birth: Must be 18+ years old
- Gender: Required selection
- Looking For: Required selection

### Bio & Interests
- Bio: Minimum 20 characters, maximum 500
- Interests: Minimum 3, maximum 10 selections

### Profile Builder
- Photos: Minimum 2, maximum 6 uploads
- At least 1 main photo recommended

---

## 🔄 Future Enhancements

Potential improvements:
- Add location/city selection
- Height, education, occupation fields
- More interest categories
- Photo verification
- Profile preview before completion
- Save draft functionality
- Skip and complete later option
