import type { PropsWithChildren, ReactNode, Ref } from 'react';

interface ScrollSectionProps extends PropsWithChildren {
	id?: string;
	className?: string;
	contentClassName?: string;
	sectionRef?: Ref<HTMLElement>;
	eyebrow?: string;
	title?: ReactNode;
	body?: ReactNode;
	align?: 'left' | 'center';
}

export default function ScrollSection({
	id,
	className = '',
	contentClassName = '',
	sectionRef,
	eyebrow,
	title,
	body,
	align = 'left',
	children,
}: ScrollSectionProps) {
	const headerClassName =
		align === 'center'
			? 'mx-auto items-center text-center'
			: 'items-start text-left';

	return (
		<section
			id={id}
			ref={sectionRef}
			className={`relative isolate flex min-h-screen items-center overflow-clip ${className}`.trim()}
		>
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-10 lg:px-16 lg:py-32">
				{(eyebrow || title || body) && (
					<header className={`flex max-w-3xl flex-col gap-4 ${headerClassName}`.trim()}>
						{eyebrow && <p className="eyebrow">{eyebrow}</p>}
						{title && (
							<h2 className="text-balance font-display text-4xl leading-[0.95] tracking-[-0.05em] text-mist sm:text-5xl lg:text-6xl">
								{title}
							</h2>
						)}
						{body && <div className="max-w-2xl text-base text-mist/74 md:text-lg">{body}</div>}
					</header>
				)}
				<div className={contentClassName}>{children}</div>
			</div>
		</section>
	);
}