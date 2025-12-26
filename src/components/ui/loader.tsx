type FullscreenLoaderProps = {
	show: boolean;
};

export function ScreenLoader({ show }: FullscreenLoaderProps) {
	if (!show) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
			<img
				src="/flowva-logo.png"
				alt="Loading"
				className="w-38 h-auto animate-pulse"
			/>
		</div>
	);
}
