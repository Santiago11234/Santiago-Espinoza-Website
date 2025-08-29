"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Coffee, Code, Music, Camera, Heart, Zap, Target, Database, Globe } from "lucide-react";

const quickFacts = [
	{
		icon: <MapPin className="w-5 h-5" />,
		label: "Location",
		value: "Austin, TX",
	},
	{
		icon: <GraduationCap className="w-5 h-5" />,
		label: "Education",
		value: "Computer Science, Seven Lakes High School",
	},
	{
		icon: <Code className="w-5 h-5" />,
		label: "Experience",
		value: "4+ years in Full-Stack Development",
	},
	{
		icon: <Coffee className="w-5 h-5" />,
		label: "Fuel",
		value: "Iced Coffee & Bubble Tea",
	},
	{
		icon: <Music className="w-5 h-5" />,
		label: "Hobbies",
		value: "Rock Climbing, Ultimate Frisbee, Music",
	},
	{
		icon: <Camera className="w-5 h-5" />,
		label: "Side Projects",
		value: "IOS app development",
	},
	{
		icon: <Target className="w-5 h-5" />,
		label: "Favorite Language",
		value: "TypeScript",
	},
	{
		icon: <Database className="w-5 h-5" />,
		label: "Preferred Stack",
		value: "Next.js + Tailwind + AWS",
	},
	{
		icon: <Globe className="w-5 h-5" />,
		label: "Time Zone",
		value: "Central Standard Time (CST)",
	},
];

export function AboutSection() {
	return (
		<section id="about" className="min-h-screen py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4">
				<motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
					<h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent mb-6">About Me</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Get to know the person behind the code - my journey, passions, and what drives me to create exceptional digital experiences.</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					<motion.div className="space-y-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
						<div className="mb-8">
							<h3 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
								<motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}>
									<Zap className="w-8 h-8 text-primary" />
								</motion.div>
								Quick Facts
							</h3>
							<div className="w-20 h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full" />
						</div>

						<div className="space-y-4">
							{quickFacts.map((fact, index) => (
								<motion.div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 active:border-primary/30 transition-all duration-300 group " initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 1.02, x:5 }}>
									<motion.div className="text-primary group-hover:scale-110 transition-transform" whileHover={{ rotate: 5 }}>
										{fact.icon}
									</motion.div>
									<div className="flex-1">
										<div className="text-sm text-muted-foreground font-medium">{fact.label}</div>
										<div className="text-foreground font-semibold">{fact.value}</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div className="lg:sticky lg:top-24" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
						<div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 rounded-2xl p-8 relative overflow-hidden group">
							<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500" />

							<div className="relative z-10">
								<motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
									<h3 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
										<motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
											<Heart className="w-8 h-8 text-primary" />
										</motion.div>
										My Story
									</h3>
									<div className="w-20 h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full" />
								</motion.div>

								<motion.div className="space-y-6 text-muted-foreground leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
									<p>Hey there! I&apos;m Santiago, a passionate full-stack developer who believes that great code is not just about the final product, but the entire design process. From crafting ideas, to drawing out designs, to manually typing lines of code: the final product is only as good as the steps taken to get there.</p>

									<p>I first began coding my freshman year of High School where I built an uneven, discolored HTML website and deployed it to my favorite hosting site localhost:3000. However, through practice and over 40 projects under my belt, I&apos;ve slowly developed my craft to build scalable web-apps and make ideas into reality.</p>

									<p>Beyond coding, I&apos;m deeply involved in the tech community. In High School I was president of two technology focused organizations and led over 100+ students to grow not only as coders, but as individuals. Now, I mentor students from my High School and assist them in their journey.</p>

									<p>My passion isn&apos;t coding. It&apos;s growing as a developer and help other&apos;s alongside myself to turn ideas into reality!</p>

									<motion.div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
										<div className="flex items-center gap-3 mb-3">
											<Zap className="w-6 h-6 text-primary" />
											<h4 className="text-lg font-semibold text-foreground">Current Focus</h4>
										</div>
										<p className="text-sm">I&apos;m currently exploring workings of AWS and developing IOS apps with swift. I&apos;ll come back to full stack development with react soon, but for now, I&apos;m expanding my skills to more areas that will allow me to grow as a developer!</p>
									</motion.div>
								</motion.div>

								<motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
									{["Creative Problem Solver", "Team Leader", "Continuous Learner"].map((trait) => (
										<motion.span
											key={trait}
											className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 cursor-pointer"
											whileHover={{
												scale: 1.05,
												backgroundColor: "var(--primary)",
												color: "var(--primary-foreground)",
											}}
											whileTap={{
												scale: 1.05,
												backgroundColor: "var(--primary)",
												color: "var(--primary-foreground)",
											}}
											transition={{
												type: "spring",
												stiffness: 400,
											}}
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}>
											{trait}
										</motion.span>
									))}
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>

				<motion.div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
					{[
						{ number: "40+", label: "Projects Completed", color: "#ff6b35" },
						{ number: "2", label: "Monitors Setup", color: "#ff8c42" },
						{ number: "24/7", label: "Learning Mode", color: "#f7931e" },
						{ number: "100%", label: "Passion for Innovation", color: "#ff8c42" },
					].map((stat, index) => (
						<motion.div key={index} className="text-center p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 active:border-primary/30 transition-all duration-300" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 1.05, y: -5 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
							<motion.div className="text-3xl font-bold mb-2" style={{ color: stat.color }} animate={{ scale: [1, 1.1, 1] }}>
								{stat.number}
							</motion.div>
							<div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
