"use client";

import CpuChipIcon from '@heroicons/react/24/solid/CpuChipIcon';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DevicePhoneMobileIcon from '@heroicons/react/24/solid/DevicePhoneMobileIcon';

export default function SimpleIconTest() {
  return (
    <div className="p-8 space-y-4">
      <h3 className="text-lg font-bold mb-4">Simple Icon Test</h3>
      
      <div className="flex gap-4 mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-lg">
          <CpuChipIcon />
        </div>
        <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-lg">
          <ComputerDesktopIcon />
        </div>
        <div className="flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-lg">
          <DevicePhoneMobileIcon />
        </div>
      </div>

      <div className="text-sm text-gray-600">
        If you can see the three colored boxes with icons above, then heroicons are working.
        If you only see empty boxes, then there's an import issue.
      </div>
    </div>
  );
}
