"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown, Sparkles } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { ThreeSceneLoader } from "@/components/three-scene-loader";
import { LeadershipSection } from "@/components/flip-card";
import { AboutSection } from "@/components/about-section";
import { InternshipSection } from "@/components/internship-section";
import { Github, Linkedin, Mail } from "lucide-react";

export default function HomePage() {
	const [isHovered, setIsHovered] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isClicked, setIsClicked] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [mounted, setMounted] = useState(false);
	const [isMouseNearGradient, setIsMouseNearGradient] = useState(false);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { stiffness: 100, damping: 10 });
	const springY = useSpring(mouseY, { stiffness: 100, damping: 10 });

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			setMousePosition({ x: clientX, y: clientY });
			mouseX.set(clientX);
			mouseY.set(clientY);

			const gradientCenterX = window.innerWidth * 0.5;
			const gradientCenterY = window.innerHeight * 0.5;
			const distance = Math.sqrt(Math.pow(clientX - gradientCenterX, 2) + Math.pow(clientY - gradientCenterY, 2));
			setIsMouseNearGradient(distance < 300);
		};

		const handleScroll = () => {
			const sections = ["home", "projects", "internship", "leadership", "about"];
			const scrollPosition = window.scrollY + 100;

			for (const sectionId of sections) {
				const element = document.getElementById(sectionId);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(sectionId);
						break;
					}
				}
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [mouseX, mouseY]);

	const handleNameClick = () => {
		setIsClicked(true);
		setTimeout(() => setIsClicked(false), 1000);
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="min-h-screen bg-background relative overflow-hidden">
			<Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

			<motion.div
				className="hidden md:block fixed w-6 h-6 bg-primary/30 rounded-full pointer-events-none z-40 mix-blend-difference"
				style={{
					x: springX,
					y: springY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					scale: isHovered ? 2 : 1,
				}}
				transition={{ type: "spring", stiffness: 500, damping: 28 }}
			/>

			<motion.div
				className="fixed pointer-events-none z-30 mix-blend-screen"
				style={{
					x: springX,
					y: springY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					scale: isMouseNearGradient ? 2.5 : isHovered ? 1.8 : 1.2,
					opacity: isMouseNearGradient ? 1 : isHovered ? 0.7 : 0.5,
				}}
				transition={{ type: "spring", stiffness: 200, damping: 25 }}>
				<div className="w-64 h-64 bg-gradient-radial from-primary/30 via-primary/15 to-transparent rounded-full" />
			</motion.div>

			<motion.div
				className="fixed pointer-events-none z-25"
				style={{
					x: springX,
					y: springY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					scale: isMouseNearGradient ? 3.5 : 2,
					opacity: isMouseNearGradient ? 0.4 : 0.2,
				}}
				transition={{ type: "spring", stiffness: 150, damping: 30 }}>
				<div className="w-96 h-96 bg-gradient-radial from-orange-400/20 via-primary/10 to-transparent rounded-full" />
			</motion.div>

			<section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
				<>
					<div className="absolute inset-0 bg-gradient-to-br from-background to-primary/10" />
					<div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-orange-400/10" />
				</>

				<motion.div
					className="absolute md:top-40 md:right-40 z-50 md:w-32 md:h-32 w-16 h-16 top-20 right-12"
					initial={{ opacity: 0, scale: 0, rotate: -90 }}
					animate={{ opacity: 1, scale: 1, rotate: 0 }}
					transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 200 }}
					whileHover={{
						scale: 1.1,
						rotate: [0, -5, 5, 0],
						transition: { duration: 0.5 },
					}}>
					<img
						src="/longhorn.png"
						alt="Longhorn"
						className="w-full h-full object-contain filter drop-shadow-lg rotate-45"
						style={{
							filter: "drop-shadow(0 4px 8px rgba(249, 115, 22, 0.3))",
						}}
					/>
				</motion.div>

				<motion.div
					className="absolute top-20 left-20 w-20 h-20 border-2 border-primary/20 rounded-full"
					animate={{
						rotate: 360,
						scale: [1, 1.2, 1],
					}}
					transition={{
						rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
						scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
					}}
				/>
				<motion.div
					className="absolute bottom-32 right-32 w-16 h-16 bg-primary/10 rotate-45"
					animate={{
						rotate: [45, 225, 45],
						y: [0, -20, 0],
					}}
					transition={{
						duration: 6,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>

				<div className="relative z-10 text-center space-y-8 px-4">
					<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
						<motion.h1
							className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent cursor-pointer select-none relative"
							onHoverStart={() => setIsHovered(true)}
							onHoverEnd={() => setIsHovered(false)}
							onClick={handleNameClick}
							whileHover={{
								scale: 1.05,
								textShadow: "0 0 30px var(--primary)",
							}}
							whileTap={{ scale: 0.95 }}
							animate={
								isHovered
									? {
											backgroundPosition: ["0%", "100%", "0%"],
									  }
									: isClicked
									? {
											rotate: [0, 5, -5, 0],
											scale: [1, 1.1, 1],
									  }
									: {}
							}
							transition={{
								backgroundPosition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
								scale: { duration: 0.3 },
								rotate: { duration: 0.5 },
							}}
							style={{
								backgroundSize: "200% 100%",
							}}>
							SANTIAGO
							{isClicked && (
								<motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
									<Sparkles className="text-primary w-12 h-12" />
								</motion.div>
							)}
						</motion.h1>
						<motion.h2
							className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							whileHover={{
								scale: 1.02,
								filter: "brightness(1.2)",
							}}>
							ESPINOZA
						</motion.h2>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="space-y-4">
						<motion.p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
							Creative developer crafting interactive experiences through code, leadership, and innovation
						</motion.p>
						<motion.div className="flex items-center justify-center gap-2 text-primary" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.5 }}>
							<motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}>
								<Sparkles className="w-5 h-5" />
							</motion.div>
							<span className="text-sm font-medium">Freshman CS @ UT Austin</span>
							<motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}>
								<Sparkles className="w-5 h-5" />
							</motion.div>
						</motion.div>
					</motion.div>

					<motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button size="lg" onClick={() => scrollToSection("projects")} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 relative overflow-hidden group">
								<motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }} />
								<span className="relative z-10">Explore My Work</span>
							</Button>
						</motion.div>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								variant="outline"
								size="lg"
								className="!border-primary !bg-transparent !text-primary hover:!bg-primary hover:!text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group"
								onClick={() => {
									const link = document.createElement("a");
									link.href = "/Resume.pdf";
									link.download = "Santiago_Espinoza_Resume.pdf";
									link.click();
								}}>
								<motion.div className="absolute inset-0 bg-primary" initial={{ scale: 0 }} whileHover={{ scale: 1 }} transition={{ duration: 0.3 }} style={{ originX: 0.5, originY: 0.5 }} />
								<span className="relative z-10 flex items-center">
									<Download className="mr-2 h-5 w-5" />
									Download Resume
								</span>
							</Button>
						</motion.div>
					</motion.div>
				</div>

				<motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
					<motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }} className="flex flex-col items-center text-muted-foreground cursor-pointer group" onClick={() => scrollToSection("about")}>
						<motion.span className="text-sm mb-2 group-hover:text-primary transition-colors" whileHover={{ scale: 1.1 }}>
							Scroll to explore
						</motion.span>
						<motion.div
							animate={{
								y: [0, 10, 0],
								opacity: [0.5, 1, 0.5],
							}}
							transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
							<ChevronDown className="h-6 w-6 group-hover:text-primary transition-colors" />
						</motion.div>
					</motion.div>
				</motion.div>
			</section>

			<AboutSection />

			<InternshipSection />

			<section id="projects" className="min-h-screen bg-muted/10 relative">
				<div className="max-w-7xl mx-auto px-4 py-20">
					<motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
						<h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent mb-6">Interactive Project Universe</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Explore my projects in an interactive 3D space. Each orbiting node represents a unique project - hover to learn more!</p>
					</motion.div>

					<div className="h-[600px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted/20 border border-border/50">
						<ThreeSceneLoader />
					</div>
				</div>
			</section>

			<LeadershipSection />

			<footer className="w-full border-t border-border/50 bg-background/80 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
					<p className="text-sm text-muted-foreground">{new Date().getFullYear()} Santiago Espinoza.</p>

					<div className="flex gap-6">
						<a href="https://github.com/Santiago11234" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
							<Github className="w-6 h-6" />
						</a>
						<a href="https://www.linkedin.com/in/santiago-espinoza-blunda/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
							<Linkedin className="w-6 h-6" />
						</a>
						<a href="mailto:santiagogeb@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
							<Mail className="w-6 h-6" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
