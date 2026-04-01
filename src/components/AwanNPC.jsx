import { useEffect, useRef, useState } from 'react';

import { gsap } from '../lib/gsap';
import { useProgressStore } from '../store/useProgressStore';

const IDLE_HINT = 'Jika ingin membaca Jogja lebih pelan, biarkan guliranmu berhenti sebentar. Aku akan menunggu di simpul berikutnya.';

export default function AwanNPC() {
	const awanVisible = useProgressStore((state) => state.awanVisible);
	const awanMessage = useProgressStore((state) => state.awanMessage);
	const awanPlacement = useProgressStore((state) => state.awanPlacement);
	const awanCtaLabel = useProgressStore((state) => state.awanCtaLabel);
	const interactionCompleted = useProgressStore((state) => state.interactionCompleted);
	const closeAwanDialog = useProgressStore((state) => state.closeAwanDialog);
	const completeNpcInteraction = useProgressStore((state) => state.completeNpcInteraction);
	const openAwanDialog = useProgressStore((state) => state.openAwanDialog);
	const avatarRef = useRef(null);
	const [typedMessage, setTypedMessage] = useState('');

	useEffect(() => {
		if (!avatarRef.current) {
			return undefined;
		}

		const tween = gsap.to(avatarRef.current, {
			yPercent: -6,
			repeat: -1,
			yoyo: true,
			duration: 3.8,
			ease: 'sine.inOut',
		});

		return () => {
			tween.kill();
		};
	}, []);

	useEffect(() => {
		if (!awanVisible || !awanMessage) {
			setTypedMessage('');
			return undefined;
		}

		let frame = 0;
		setTypedMessage('');

		const interval = window.setInterval(() => {
			frame += 1;
			setTypedMessage(awanMessage.slice(0, frame));

			if (frame >= awanMessage.length) {
				window.clearInterval(interval);
			}
		}, 24);

		return () => {
			window.clearInterval(interval);
		};
	}, [awanMessage, awanVisible]);

	useEffect(() => {
		if (interactionCompleted) {
			return undefined;
		}

		let idleTimer;

		const resetTimer = () => {
			window.clearTimeout(idleTimer);
			idleTimer = window.setTimeout(() => {
				openAwanDialog({
					message: IDLE_HINT,
					placement: 'left',
				});
			}, 60000);
		};

		const events = ['mousemove', 'pointerdown', 'keydown', 'scroll', 'touchstart'];
		resetTimer();

		events.forEach((eventName) => window.addEventListener(eventName, resetTimer, { passive: true }));

		return () => {
			window.clearTimeout(idleTimer);
			events.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
		};
	}, [interactionCompleted, openAwanDialog]);

	if (!awanVisible) {
		return null;
	}

	const placementClassName = awanPlacement === 'left' ? 'left-3 sm:left-6' : 'right-3 sm:right-6';
	const flowClassName = awanPlacement === 'left' ? 'sm:flex-row' : 'sm:flex-row-reverse';
	const containerStyle = {
		width: 'min(24rem, calc(100vw - 1.5rem))',
	};

	return (
		<div style={containerStyle} className={`pointer-events-none fixed bottom-4 z-[65] ${placementClassName}`.trim()}>
			<div className={`flex flex-col items-end gap-3 ${flowClassName}`.trim()}>
				<div ref={avatarRef} className="pointer-events-none shrink-0 self-end sm:self-auto">
					<img src="/awan-guide.svg" alt="Awan, pemandu Jogjakarsa" className="h-24 w-24 sm:h-28 sm:w-28" style={{ filter: 'drop-shadow(0 18px 30px rgba(4, 9, 19, 0.35))' }} />
				</div>

				<div className="glass-panel pointer-events-auto w-full rounded-[1.7rem] p-4 text-left shadow-glass sm:max-w-[18.5rem]">
					<div className="flex items-center justify-between gap-3">
						<div>
							<p className="font-accent text-xs font-semibold uppercase tracking-[0.26em] text-mist/46">Awan</p>
							<p className="mt-1 text-sm text-mist/62">Pemandu perjalananmu</p>
						</div>
						<button
							type="button"
							onClick={closeAwanDialog}
							className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist/60 transition-colors duration-300 hover:bg-white/10"
						>
							Tutup
						</button>
					</div>

					<p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-mist/78 sm:text-[0.96rem]">
						{typedMessage}
						{typedMessage.length < awanMessage.length && <span className="ml-1 inline-block h-4 w-px bg-mist/55 align-middle"></span>}
					</p>

					{Boolean(awanCtaLabel) && !interactionCompleted && (
						<button
							type="button"
							onClick={completeNpcInteraction}
							className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-mist px-4 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
						>
							{awanCtaLabel}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}