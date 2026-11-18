import React from 'react';
import {
  Sun,
  Briefcase,
  FileSpreadsheet,
  Languages,
  Store,
  Coffee,
  Users,
  Hourglass,
  Moon,
  Clock
} from 'lucide-react';

const ICON_MAP = {
  Sun,
  Briefcase,
  FileSpreadsheet,
  Languages,
  Store,
  Coffee,
  Users,
  Hourglass,
  Moon,
  Clock
};

export default function CategoryIcon({ name, size = 18, className = '' }) {
  const IconComponent = ICON_MAP[name] || Clock;
  return <IconComponent size={size} className={className} />;
}
