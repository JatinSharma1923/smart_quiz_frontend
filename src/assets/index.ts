import { PlusCircle, Trash2, Trophy, ClipboardList, ChartLine, Shapes, Bot, RefreshCw, Users, Clock } from 'lucide-react';

// Export all assets
export * from './constants';
export * from './utils';
export * from './icons';

// Re-export commonly used items for convenience
export { ICONS, ICON_CATEGORIES, getIconByName, getIconByCategory, ICON_SIZES, ICON_COLORS } from './icons';
export { APP_CONFIG, COLORS, QUIZ_CONFIG, NAVIGATION_ITEMS, FEATURES_DATA, STATS_DATA, ERROR_MESSAGES, SUCCESS_MESSAGES, STORAGE_KEYS, API_ENDPOINTS } from './constants';
export { formatDate, formatTime, formatNumber, isValidEmail, isValidPassword, debounce, throttle } from './utils';

// Export default assets
export { default as reactLogo } from './react.svg';