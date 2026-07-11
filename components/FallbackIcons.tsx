"use client";

export default function FallbackIcons() {
  return (
    <div className="p-8 space-y-4">
      <h3 className="text-lg font-bold mb-4">Fallback Icon Test</h3>
      
      <div className="flex gap-4 mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-lg text-2xl font-bold">
          💻
        </div>
        <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-lg text-2xl font-bold">
          🖥️
        </div>
        <div className="flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-lg text-2xl font-bold">
          🎧
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Using emoji icons as fallback. If you can see these emoji icons, we can use this approach.
      </div>
    </div>
  );
}
