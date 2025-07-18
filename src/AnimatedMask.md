# Animated Mask System

A reusable, animated transparent mask system for React applications with non-linear easing animations.

## Features

- **Smooth non-linear animations** using easing functions
- **Reusable hooks and components** for different use cases
- **Responsive design** with automatic position recalculation
- **Customizable** colors, duration, and easing functions
- **TypeScript support** with full type definitions
- **Performance optimized** with requestAnimationFrame

## Installation

Simply import the components and hooks from the `AnimatedMask.tsx` file:

```typescript
import { 
  AnimatedMask, 
  useAnimatedMask, 
  useElementPosition, 
  useRefMap 
} from './AnimatedMask';
```

## Usage

### 1. Basic Hook Usage

```typescript
import { useAnimatedMask } from './AnimatedMask';

const MyComponent = () => {
  const [activePosition, setActivePosition] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState(null);
  
  const { currentRect, maskStyle } = useAnimatedMask(
    activePosition,    // Target position (active state)
    hoveredPosition,   // Hovered position (hover state)
    400,              // Duration in ms
    'easeOutQuart'    // Easing function
  );
  
  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-blue-500/20 rounded-lg"
        style={maskStyle} 
      />
      {/* Your content here */}
    </div>
  );
};
```

### 2. Component Usage

```typescript
import { AnimatedMask } from './AnimatedMask';

const MyNavigation = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Calculate positions for your items
  const activePosition = getPositionForItem(activeItem);
  const hoveredPosition = getPositionForItem(hoveredItem);
  
  return (
    <AnimatedMask
      targetRect={activePosition}
      hoveredRect={hoveredPosition}
      duration={300}
      easing="easeInOutCubic"
      maskColor="rgba(59, 130, 246, 0.3)"
      className="flex space-x-4 p-2 bg-white/50 rounded-lg"
    >
      <button onClick={() => setActiveItem('home')}>Home</button>
      <button onClick={() => setActiveItem('about')}>About</button>
      <button onClick={() => setActiveItem('contact')}>Contact</button>
    </AnimatedMask>
  );
};
```

### 3. Using Utility Hooks

#### useRefMap

Manages multiple refs easily:

```typescript
import { useRefMap } from './AnimatedMask';

const MyComponent = () => {
  const itemRefs = useRefMap<HTMLButtonElement>();
  
  return (
    <>
      {items.map((item, index) => (
        <button 
          key={index} 
          ref={itemRefs.setRef(index.toString())}
        >
          {item}
        </button>
      ))}
    </>
  );
};
```

#### useElementPosition

Tracks element positions relative to a container:

```typescript
import { useElementPosition } from './AnimatedMask';

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const { position } = useElementPosition(containerRef, elementRef);
  
  return (
    <div ref={containerRef}>
      <div ref={elementRef}>My Element</div>
    </div>
  );
};
```

## API Reference

### useAnimatedMask

```typescript
const { currentRect, isAnimating, maskStyle } = useAnimatedMask(
  targetRect: MaskPosition | null,
  hoveredRect: MaskPosition | null,
  duration?: number = 300,
  easing?: 'easeInOutCubic' | 'easeOutQuart' | 'easeInOutQuart' | 'easeOutExpo' = 'easeOutQuart'
);
```

**Parameters:**
- `targetRect`: Position for active state
- `hoveredRect`: Position for hover state
- `duration`: Animation duration in milliseconds
- `easing`: Easing function name

**Returns:**
- `currentRect`: Current animated position
- `isAnimating`: Whether animation is in progress
- `maskStyle`: CSS styles for the mask

### AnimatedMask Component

```typescript
<AnimatedMask
  targetRect={MaskPosition | null}
  hoveredRect={MaskPosition | null}
  duration={number}
  easing={string}
  maskColor={string}
  maskOpacity={number}
  className={string}
/>
```

**Props:**
- `targetRect`: Active item position
- `hoveredRect`: Hovered item position
- `duration`: Animation duration (default: 300ms)
- `easing`: Easing function (default: 'easeOutQuart')
- `maskColor`: Mask color (default: 'rgba(255,255,255,0.3)')
- `maskOpacity`: Mask opacity (default: 0.3)
- `className`: Additional CSS classes

## Easing Functions

Available easing functions:

- **easeInOutCubic**: Smooth cubic easing
- **easeOutQuart**: Fast start, slow end
- **easeInOutQuart**: Smooth quartic easing
- **easeOutExpo**: Exponential easing with fast start

## Complete Example

See `AnimatedMaskExample.tsx` for comprehensive usage examples including:

- Basic navigation with animated masks
- Tab components with smooth transitions
- Advanced styling with custom colors
- Responsive layout support

## Integration with FirstLab

The system is already integrated into the FirstLab landing page for:

- **Navigation menu**: Smooth mask transitions between active and hovered items
- **Language selector**: Animated hover effects in dropdown
- **Custom easing**: Quartic easing for natural movement

## Performance Tips

1. **Position calculation**: Use `updatePositions()` on resize/scroll
2. **Memoization**: Cache calculated positions when possible
3. **Debouncing**: Debounce resize events for better performance
4. **Cleanup**: Always clean up event listeners in useEffect

## Browser Support

- **Modern browsers**: Full support
- **Safari**: WebKit prefixes handled automatically
- **Legacy browsers**: Graceful degradation (no animations)

## Customization

### Custom Easing Functions

Add your own easing functions to the `easingFunctions` object:

```typescript
// In AnimatedMask.tsx
easingFunctions: {
  myCustomEasing: (t: number) => t * t * (3 - 2 * t), // Smoothstep
}
```

### Custom Mask Styles

Modify the mask generation in `getAnimatedMaskStyle`:

```typescript
const getAnimatedMaskStyle = (
  rect: MaskPosition | null,
  maskColor = 'rgba(255, 255, 255, 0.3)',
  maskOpacity = 0.3,
  // Add custom parameters here
) => {
  // Custom mask implementation
};
```