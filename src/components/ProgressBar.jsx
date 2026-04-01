import { useProgressStore } from '../store/useProgressStore';

export default function ProgressBar() {
	const progress = useProgressStore((state) => state.progress);
	const visitedSections = useProgressStore((state) => state.visitedSections);

	return (
		<div className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex justify-center px-4 py-4 sm:px-6">
			<div className="glass-panel pointer-events-auto w-full max-w-3xl rounded-full px-4 py-3 sm:px-5">
				<div className="flex items-center justify-between gap-4 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-mist/56">
					<span>Jejak Awan</span>
					<span>{Math.round(progress)}% terbuka</span>
				</div>
				<div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
					<div
						className="h-full rounded-full bg-[linear-gradient(90deg,#f4c17a_0%,#7dc5ad_50%,#92b9ff_100%)] transition-[width] duration-500 ease-out"
						style={{ width: `${progress}%` }}
					></div>
				</div>
				<div className="mt-3 flex items-center justify-between text-xs text-mist/54">
					<span>{visitedSections.length} simpul aktif</span>
					<span>Intro - Sejarah - Interaksi</span>
				</div>
			</div>
		</div>
	);
}