import React, { useState, useRef } from 'react';
import { AnimatedMask, useAnimatedMask, useElementPosition, useRefMap } from './AnimatedMask';

// Example 1: Basic animated mask usage
const BasicAnimatedMaskExample: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRefMap<HTMLButtonElement>();
  
  const items = ['Home', 'About', 'Services', 'Contact'];
  
  // Calculate positions for each button
  const [positions, setPositions] = useState<{[key: string]: {x: number, y: number, width: number, height: number}}>({});
  
  const updatePositions = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newPositions: {[key: string]: {x: number, y: number, width: number, height: number}} = {};
      
      items.forEach((_, index) => {
        const item = itemRefs.getRef(index.toString());
        if (item) {
          const itemRect = item.getBoundingClientRect();
          newPositions[index] = {
            x: itemRect.left - containerRect.left,
            y: itemRect.top - containerRect.top,
            width: itemRect.width,
            height: itemRect.height
          };
        }
      });
      
      setPositions(newPositions);
    }
  };
  
  // Get current positions
  const activePosition = positions[activeIndex] || null;
  const hoveredPosition = hoveredIndex !== null ? positions[hoveredIndex] || null : null;
  
  // Use the animated mask hook
  const { maskStyle } = useAnimatedMask(
    activePosition,
    hoveredPosition,
    400, // duration
    'easeOutQuart'
  );
  
  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Basic Animated Mask Example</h3>
      <div 
        ref={containerRef} 
        className="relative flex space-x-2 p-2 bg-white/50 rounded-lg"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Animated mask background */}
        <div
          className="absolute rounded-md bg-blue-500/20"
          style={maskStyle}
        />
        
        {/* Navigation items */}
        {items.map((item, index) => (
          <button
            key={item}
            ref={itemRefs.setRef(index.toString())}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`relative px-4 py-2 rounded-md transition-colors duration-300 ${
              activeIndex === index 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <button 
        onClick={updatePositions} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Recalculate Positions
      </button>
    </div>
  );
};

// Example 2: Using the AnimatedMask component
const AnimatedMaskComponentExample: React.FC = () => {
  const [activeItem, setActiveItem] = useState('tab1');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRefMap<HTMLButtonElement>();
  
  const tabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ];
  
  // Calculate positions
  const [positions, setPositions] = useState<{[key: string]: {x: number, y: number, width: number, height: number}}>({});
  
  const updatePositions = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newPositions: {[key: string]: {x: number, y: number, width: number, height: number}} = {};
      
      tabs.forEach(({ id }) => {
        const tab = tabRefs.getRef(id);
        if (tab) {
          const tabRect = tab.getBoundingClientRect();
          newPositions[id] = {
            x: tabRect.left - containerRect.left,
            y: tabRect.top - containerRect.top,
            width: tabRect.width,
            height: tabRect.height
          };
        }
      });
      
      setPositions(newPositions);
    }
  };
  
  const activePosition = positions[activeItem] || null;
  const hoveredPosition = hoveredItem ? positions[hoveredItem] || null : null;
  
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">AnimatedMask Component Example</h3>
      
      <AnimatedMask
        targetRect={activePosition}
        hoveredRect={hoveredPosition}
        duration={300}
        easing="easeInOutCubic"
        maskColor="rgba(59, 130, 246, 0.3)"
        className="w-full"
      >
        <div 
          ref={containerRef} 
          className="flex space-x-1 p-1"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              ref={tabRefs.setRef(id)}
              onClick={() => setActiveItem(id)}
              onMouseEnter={() => setHoveredItem(id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeItem === id 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </AnimatedMask>
      
      <button 
        onClick={updatePositions} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Update Positions
      </button>
    </div>
  );
};

// Example 3: Advanced usage with custom easing and styling
const AdvancedAnimatedMaskExample: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRefMap<HTMLDivElement>();
  
  const items = [
    { name: 'Feature 1', icon: '🚀' },
    { name: 'Feature 2', icon: '⚡' },
    { name: 'Feature 3', icon: '🎨' },
    { name: 'Feature 4', icon: '🔒' },
  ];
  
  // Use element position tracking
  const positions: {[key: number]: {x: number, y: number, width: number, height: number}} = {};
  const activePosition = positions[activeIndex] || null;
  const hoveredPosition = hoveredIndex !== null ? positions[hoveredIndex] || null : null;
  
  // Custom mask with different easing
  const { maskStyle } = useAnimatedMask(
    activePosition,
    hoveredPosition,
    500,
    'easeOutExpo'
  );
  
  return (
    <div className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
      <h3 className="text-white text-lg font-semibold mb-6">Advanced Example with Custom Easing</h3>
      
      <div className="grid grid-cols-2 gap-4" ref={containerRef}>
        {items.map((item, index) => (
          <div
            key={index}
            ref={itemRefs.setRef(index.toString())}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative p-6 bg-white/20 backdrop-blur-sm rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-white font-medium">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Complete demo component
const AnimatedMaskDemo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Animated Mask System Demo</h1>
        <p className="text-gray-600">
          Examples showing how to use the reusable animated mask system with non-linear easing.
        </p>
      </div>
      
      <BasicAnimatedMaskExample />
      <AnimatedMaskComponentExample />
      
      <AdvancedAnimatedMaskExample />
      
      <div className="bg-blue-50 p-6 rounded-lg mt-8">
        <h4 className="font-semibold text-blue-900 mb-2">Usage Notes:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use <code>useAnimatedMask</code> hook for custom implementations</li>
          <li>• Use <code>AnimatedMask</code> component for quick integration</li>
          <li>• Supports multiple easing functions: easeOutQuart, easeInOutCubic, easeOutExpo, etc.</li>
          <li>• Fully responsive with automatic position recalculation</li>
          <li>• Works with any container size and layout</li>
        </ul>
      </div>
    </div>
  );
};

export default AnimatedMaskDemo;