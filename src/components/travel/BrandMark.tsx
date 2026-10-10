export default function BrandMark({ className = 'jk-brand-mark', width = 34, height = 41 }: { className?: string; width?: number; height?: number }) {
 return <img className={className} src="/brand/jogjakarsa-mark.svg?v=3" width={width} height={height} alt="" aria-hidden="true" />;
}
