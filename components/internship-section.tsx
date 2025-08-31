"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, Zap, ChevronRight, ExternalLink, Code, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Internship {
	id: string;
	company: string;
	role: string;
	duration: string;
	location: string;
	description: string;
	achievements: string[];
	technologies: string[];
	color: string;
	logo: string;
}

const internships: Internship[] = [
	{
		id: "driven-telematics",
		company: "Driven Telematics",
		role: "Project Intern",
		duration: "Aug 2025 - Present",
		location: "Katy, TX (Remote)",
		description: "Built comprehensive API infrastructure for driving data systems, implementing enterprise-level security and auditing across the entire AWS stack to streamline data upload and retrieval processes.",
		achievements: ["Architected full API endpoint with comprehensive auditing and security", "Implemented enterprise AWS stack including Gateway, Lambda, Aurora, S3", "Established CloudWatch monitoring and CloudTrail logging for system transparency", "Deployed IAM roles and Secrets Manager for secure credential management"],
		technologies: ["AWS API Gateway", "AWS Lambda", "Aurora", "S3", "CloudWatch", "Firehose", "IAM", "Secrets Manager", "CloudTrail", "JavaScript"],
		color: "#ff6b35",
		logo: "/driven.png",
	},
	{
		id: "driven-telematics-summer",
		company: "Driven Telematics",
		role: "Summer Intern",
		duration: "Apr 2025 - Jul 2025",
		location: "Katy, TX (Remote)",
		description: "Designed and planned MVP for driving data retrieval system from concept to implementation, creating comprehensive technical documentation and system architecture before building the foundational infrastructure.",
		achievements: ["Drafted complete MVP architecture for driving data retrieval system", "Created detailed UML diagrams and system design documentation", "Developed comprehensive sample tests and validation frameworks", "Built secure test API endpoint with AWS services integration"],
		technologies: ["AWS CloudFormation", "AWS Lambda", "JavaScript", "GitHub", "UML Design", "System Architecture"],
		color: "#ff6b35",
		logo: "/driven.png",
	},
	{
		id: "karatube",
		company: "Karatube",
		role: "Frontend Developer Intern",
		duration: "Mar 2024 - Aug 2024",
		location: "Katy, TX (Remote)",
		description: "Developed innovative karaoke extension integrating with YouTube, creating real-time lyric synchronization powered by AI analysis and cloud computing for seamless user experience.",
		achievements: ["Built complete front-end design for YouTube karaoke extension", "Developed AI-powered lyric synchronization algorithm", "Implemented real-time music and lyric alignment system", "Deployed serverless architecture using AWS Lambda for scalability"],
		technologies: ["Svelte", "AWS Lambda", "GitHub", "YouTube API", "AI Integration", "Real-time Synchronization"],
		color: "#ff0000",
		logo: "/karatube.png",
	},
];

function InternshipCard({ internship, index, isActive }: { internship: Internship; index: number; isActive: boolean; onClick: () => void }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<motion.div className={`relative cursor-pointer transition-all duration-500 ${isActive ? "scale-105 z-10" : "scale-100 hover:scale-102 active:scale-102"}`} initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} onClick={() => setIsModalOpen(true)}>
				<div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent transform -translate-x-1/2 z-0 hidden md:block" />

				<motion.div className="absolute left-1/2 top-8 w-6 h-6 rounded-full border-4 border-background z-20 transform -translate-x-1/2 hidden md:block" style={{ backgroundColor: internship.color }} animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }} transition={{ duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }} />

				<div className={`ml-8 ${index % 2 === 0 ? "mr-auto" : "ml-auto mr-8"} max-w-md `}>
					<motion.div
						className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 group"
						style={{
							background: `linear-gradient(135deg, ${internship.color}10, transparent)`,
							borderColor: isActive ? `${internship.color}50` : undefined,
						}}
						whileHover={{ y: -5 }}
						whileTap={{ y: -5 }}
						animate={isActive ? { boxShadow: `0 20px 40px ${internship.color}20` } : {}}>
						<div className="absolute top-[-20] right-[-20] w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 group-active:opacity-10transition-opacity" style={{ backgroundColor: internship.color }} />

						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<img className="w-16 h-16" src={internship.logo} />
								<div>
									<h3 className="text-xl font-bold text-foreground">{internship.company}</h3>
									<p className="font-semibold" style={{ color: internship.color }}>
										{internship.role}
									</p>
								</div>
							</div>
							<motion.div animate={isActive ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
								<ChevronRight className="w-5 h-5 text-muted-foreground" />
							</motion.div>
						</div>

						<div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								{internship.duration}
							</div>
							<div className="flex items-center gap-1">
								<MapPin className="w-4 h-4" />
								{internship.location}
							</div>
						</div>

						<p className="text-muted-foreground text-sm leading-relaxed mb-4">{internship.description}</p>

						<div className="flex flex-wrap gap-2">
							{internship.technologies.slice(0, 3).map((tech) => (
								<span
									key={tech}
									className="px-2 py-1 text-xs rounded-full border"
									style={{
										backgroundColor: `${internship.color}15`,
										borderColor: `${internship.color}30`,
										color: internship.color,
									}}>
									{tech}
								</span>
							))}
							{internship.technologies.length > 3 && <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">+{internship.technologies.length - 3} more</span>}
						</div>
					</motion.div>
				</div>
			</motion.div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-3xl font-bold flex items-center gap-3">
							<img className="w-16 h-16" src={internship.logo} />
							<div>
								<div style={{ color: internship.color }}>{internship.company}</div>
								<div className="text-lg text-muted-foreground font-normal">{internship.role}</div>
							</div>
						</DialogTitle>
					</DialogHeader>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
						<div className="space-y-4">
							<div className="flex items-center gap-3 mb-6">
								<Trophy className="w-6 h-6 " style={{ color: internship.color }} />
								<h4 className="text-2xl font-bold text-foreground">Key Achievements</h4>
							</div>

							{internship.achievements.map((achievement, index) => (
								<motion.div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 active:border-primary/30transition-colors" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 1.02, x: 5 }}>
									<div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: internship.color }} />
									<p className="text-muted-foreground leading-relaxed">{achievement}</p>
								</motion.div>
							))}
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-3 mb-6">
								<Code className="w-6 h-6" style={{ color: internship.color }} />
								<h4 className="text-2xl font-bold text-foreground">Technologies Used</h4>
							</div>

							<div className="grid grid-cols-2 gap-3">
								{internship.technologies.map((tech, index) => (
									<motion.div
										key={tech}
										className="p-3 rounded-xl border border-border/50 text-center hover:border-primary/30 active:border-primary/30 transition-colors"
										style={{
											background: `linear-gradient(135deg, ${internship.color}10, transparent)`,
										}}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										whileHover={{ scale: 1.05, y: -2 }}
										whileTap={{ scale: 1.05, y: -2 }}>
										<span className="font-medium text-foreground">{tech}</span>
									</motion.div>
								))}
							</div>

							<motion.div className="mt-8 p-6 rounded-xl border border-primary/20 bg-primary/5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
								<div className="flex items-center gap-3 mb-3">
									<Zap className="w-5 h-5" style={{ color: internship.color }} />
									<h5 className="font-semibold text-foreground">Impact & Learning</h5>
								</div>
								<p className="text-sm text-muted-foreground leading-relaxed">This internship was instrumental in developing my expertise in {internship.technologies.slice(0, 2).join(" and ")}, while also strengthening my ability to work in fast-paced, collaborative environments with global impact.</p>
							</motion.div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

export function InternshipSection() {
	const [activeInternship, setActiveInternship] = useState<string | null>(null);

	return (
		<section id="internship" className="min-h-screen py-20 bg-muted/5 relative overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-10 w-60 h-60 bg-orange-400/5 rounded-full blur-3xl" />
			</div>

			<div className="max-w-6xl mx-auto px-4 relative z-10">
				<motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
					<h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent mb-6">Professional Journey</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Explore my internship experiences at leading tech companies. Click on any experience to dive deeper into the impact, technologies, and achievements from each role.</p>
				</motion.div>

				<div className="relative">
					<div className="space-y-16">
						{internships.map((internship, index) => (
							<InternshipCard key={internship.id} internship={internship} index={index} isActive={activeInternship === internship.id} onClick={() => setActiveInternship(activeInternship === internship.id ? null : internship.id)} />
						))}
					</div>
				</div>

				<motion.div className="text-center mt-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
					<div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-orange-400/10 border border-primary/20">
						<div className="flex items-center gap-2">
							<Building2 className="w-6 h-6 text-primary" />
							<span className="text-lg font-semibold text-foreground">Still not impressed?</span>
						</div>
						<Button size="lg" className="bg-primary hover:bg-primary/90 active:bg-primary/90text-primary-foreground px-6 py-3 rounded-xl font-semibold">
							<ExternalLink className="w-4 h-4 mr-2" />
							<a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
								View Full Resume
							</a>
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
