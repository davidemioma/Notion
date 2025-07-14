import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Gradient Spinner */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-indigo-500 border-r-fuchsia-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-8 border-transparent border-b-emerald-500 border-l-amber-500 animate-spin animation-reverse animation-delay-100"></div>
        </div>

        {/* Optional Text with Fade Animation */}
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-gray-800 animate-pulse">
            Loading
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Preparing something amazing for you
          </p>
        </div>

        {/* Modern Dot Loader */}
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
