export default function Background() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden">
			{/* Animated Gradient Background */}
			<div className="absolute inset-0 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_50%,#f093fb_100%)]" />

			{/* Floating Abstract Shapes */}

			{/* Circle 1 - Top Left */}
			<div
				className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20"
				style={{
					background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
					animation: 'float 8s ease-in-out infinite'
				}}
			/>

			{/* Circle 2 - Top Right */}
			<div
				className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-15"
				style={{
					background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
					animation: 'float-slow 12s ease-in-out infinite'
				}}
			/>

			{/* Triangle - Bottom Left */}
			<svg
				className="absolute bottom-20 left-20 opacity-15"
				width="300"
				height="300"
				style={{ animation: 'float-reverse 10s ease-in-out infinite' }}
			>
				<defs>
					<linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style={{ stopColor: '#fa709a', stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: '#fee140', stopOpacity: 1 }} />
					</linearGradient>
				</defs>
				<polygon points="150,0 300,300 0,300" fill="url(#triangleGradient)" />
			</svg>

			{/* Square - Center Right */}
			<div
				className="absolute top-1/2 right-10 w-48 h-48 opacity-10"
				style={{
					background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
					borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
					animation: 'pulse-glow 6s ease-in-out infinite'
				}}
			/>

			{/* Circle 3 - Center */}
			<div
				className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full opacity-10"
				style={{
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					animation: 'float 15s ease-in-out infinite reverse'
				}}
			/>

			{/* Blob Shape - Bottom Right */}
			<div
				className="absolute bottom-10 right-1/4 w-72 h-72 opacity-15"
				style={{
					background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
					borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
					animation: 'float-slow 14s ease-in-out infinite'
				}}
			/>

			{/* Small accent circles */}
			<div
				className="absolute top-1/4 left-1/2 w-32 h-32 rounded-full opacity-20"
				style={{
					background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
					animation: 'float-reverse 7s ease-in-out infinite'
				}}
			/>
		</div>
	);
}
