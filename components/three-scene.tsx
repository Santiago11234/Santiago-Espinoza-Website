/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Text, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type * as THREE from "three";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const projectsData = [
	{
		slug: "solar-system-sim",
		name: "Solar System Simulation",
		description: "Solar System simulation site built with HTML, Bootstrap, and Three.js",
		image: "/images/universe.png",
		technologies: ["ThreeJS", "HTML", "CSS", "Node.js", "Bootstrap"],
		github: "https://github.com/Santiago11234/UniverseSimulation",
		demo: "https://santiago11234.github.io/UniverseSimulation/",
		category: "3D Visualization",
		featured: true,
		longDescription: "An interactive universe simulation that brings cosmic exploration to life through 3D rendering and physics-based animations. Users can navigate star systems, observe planetary motion, and experience the scale of the cosmos with immersive Three.js visuals, all presented in a smooth and engaging web experience.",
	},
	{
		slug: "econest",
		name: "EcoNest",
		description: "Environment awareness site built with Next.js, Tailwind, Firebase, and Three.js",
		image: "/images/econest.png",
		technologies: ["Next.js", "Tailwind CSS", "Firebase", "Three.js", "React"],
		github: "https://github.com/EthanL06/econest",
		demo: "https://eco-nest.vercel.app/",
		category: "Full-Stack",
		featured: true,
		longDescription: "An immersive environmental awareness platform featuring interactive 3D visualizations of climate data. Users can explore environmental statistics through engaging Three.js animations and contribute to conservation efforts through integrated Firebase-powered community features.",
	},
	{
		slug: "sparrow",
		name: "Sparrow",
		description: "Interactive learn-to-code website for elementary and middle school students",
		image: "/images/sparrow.png",
		technologies: ["HTML", "Firebase", "JavaScript", "CSS Animations", "Node.js"],
		github: "https://github.com/Santiago11234/Sparrow",
		demo: "https://santiago11234.github.io/Sparrow/index.html",
		category: "Education",
		featured: false,
		longDescription: "An engaging educational platform designed specifically for young learners to discover programming concepts through gamified lessons, interactive coding challenges, and visual programming blocks that make coding accessible and fun.",
	},
	{
		slug: "bright-bites",
		name: "Bright Bites",
		description: "Online vegan restaurant aimed towards providing customizable, natural food at a cheap price.",
		image: "/images/bright-bites.png",
		technologies: ["Google Maps API", "Google Firebase", "React", "TypeScript", "Tailwind"],
		github: "https://github.com/Santiago11234/Bright-Bites",
		demo: "https://bright-bites.vercel.app/",
		category: "Full Stack",
		featured: false,
		longDescription: "A vibrant food platform designed for health-conscious eaters to create customizable vegan bowls through fresh ingredients, bold flavors, and nourishing combinations, delivered straight to your door for a convenient and delicious plant-based experience.",
	},
	{
		slug: "facial-recognition-hall-pass",
		name: "Facial Recognition Hall Pass",
		description: "Full-stack electric hall pass system with facial recognition",
		image: "/images/safe.png",
		technologies: ["Python", "PostgreSQL", "React", "Tailwind", "TensorFlow"],
		github: "https://github.com/santiago/facial-recognition-hall-pass",
		demo: "https://hall-pass-demo.vercel.app",
		category: "Security/IoT",
		featured: false,
		longDescription: "A modern school safety solution that digitizes the traditional hall pass system. Features facial recognition for student identification, real-time location tracking, automated check-in/check-out processes, and comprehensive administrative dashboard for monitoring student movement.",
	},
	{
		slug: "custom-company-site",
		name: "Custom Company Site",
		description: "Wix alternative with drag-and-drop functionality and real-time code editing WORK IN PROGRESS",
		image: "/images/ccs.png",
		technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io"],
		github: "https://github.com/santiago/custom-company-site",
		demo: "https://custom-company-site.vercel.app",
		category: "Full-Stack",
		featured: true,
		longDescription: "A comprehensive website builder platform that rivals Wix with intuitive drag-and-drop functionality. Features real-time collaborative editing, custom component library, responsive design templates, and integrated hosting solutions for small businesses.",
	},
];

function FallbackPenguin() {
	const penguinRef = useRef<THREE.Group>(null);

	return (
		<group ref={penguinRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
			<mesh position={[0, 0.5, 0]}>
				<sphereGeometry args={[0.8, 16, 16]} />
				<meshStandardMaterial color="#2c2c2c" />
			</mesh>
			<mesh position={[0, -0.3, 0]}>
				<sphereGeometry args={[1, 16, 16]} />
				<meshStandardMaterial color="#1a1a1a" />
			</mesh>
			<mesh position={[-0.3, 0.6, 0.6]}>
				<coneGeometry args={[0.15, 0.4, 8]} />
				<meshStandardMaterial color="#ff6b35" />
			</mesh>
			<mesh position={[-0.3, 0.7, 0.5]}>
				<sphereGeometry args={[0.1, 8, 8]} />
				<meshStandardMaterial color="white" />
			</mesh>
			<mesh position={[0.3, 0.7, 0.5]}>
				<sphereGeometry args={[0.1, 8, 8]} />
				<meshStandardMaterial color="white" />
			</mesh>
		</group>
	);
}

function TuxPenguin() {
	const penguinRef = useRef<THREE.Group>(null);
	const [penguinModel, setPenguinModel] = useState<THREE.Group | null>(null);
	const [loadingState, setLoadingState] = useState<"loading" | "loaded" | "error">("loading");
	const loaderRef = useRef<GLTFLoader | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!loaderRef.current) {
			loaderRef.current = new GLTFLoader();
		}

		const loader = loaderRef.current;

		timeoutRef.current = setTimeout(() => {
			if (loadingState === "loading") {
				console.log("[v0] GLB loading timeout, using fallback");
				setLoadingState("error");
			}
		}, 10000);

		loader.load(
			"/models/linux.glb",
			(gltf) => {
				console.log("[v0] GLB model loaded successfully");
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}

				const model = gltf.scene.clone();
				model.traverse((child) => {
					if ((child as THREE.Mesh).isMesh) {
						const mesh = child as THREE.Mesh;
						mesh.castShadow = true;
						mesh.receiveShadow = true;
					}
				});

				setPenguinModel(model);
				setLoadingState("loaded");
			},
			(progress) => {
				const percentage = progress.total > 0 ? (progress.loaded / progress.total) * 100 : 0;
				console.log("[v0] GLB loading progress:", Math.round(percentage) + "%");
			},
			(error) => {
				console.log("[v0] GLB loading failed, using fallback:", (error as Error).message);
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}
				setLoadingState("error");
			}
		);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, []);

	return (
		<group ref={penguinRef} position={[0, 0, 10]} scale={[5, 5, 5]}>
			{loadingState === "loaded" && penguinModel ? <primitive object={penguinModel} /> : <FallbackPenguin />}
		</group>
	);
}

function WebGLContextHandler() {
	const { gl } = useThree();
	const handlersAttachedRef = useRef(false);

	useEffect(() => {
		if (handlersAttachedRef.current) return;

		const canvas = gl.domElement;

		const handleContextLost = (event: Event) => {
			console.log("[v0] WebGL context lost, preventing default");
			event.preventDefault();
		};

		const handleContextRestored = () => {
			console.log("[v0] WebGL context restored");
		};

		canvas.addEventListener("webglcontextlost", handleContextLost, false);
		canvas.addEventListener("webglcontextrestored", handleContextRestored, false);
		handlersAttachedRef.current = true;

		return () => {
			if (handlersAttachedRef.current) {
				canvas.removeEventListener("webglcontextlost", handleContextLost);
				canvas.removeEventListener("webglcontextrestored", handleContextRestored);
				handlersAttachedRef.current = false;
			}
		};
	}, [gl]);

	return null;
}

function ProjectRectangle({ project, position, onHover, onLeave, onClick, isHovered }: { project: (typeof projectsData)[0]; position: [number, number, number]; onHover: () => void; onLeave: () => void; onClick: () => void; isHovered: boolean }) {
	const meshRef = useRef<THREE.Group>(null);
	const texture = useLoader(TextureLoader, project.image);
	const { camera } = useThree();
	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.lookAt(camera.position);
		}
	});

	return (
		<group ref={meshRef} position={position}>
			<mesh onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick}>
				<boxGeometry args={[1.2, 0.8, 0.1]} />
				<meshStandardMaterial map={texture} color={isHovered ? "#999999" : "#ffffff"} transparent opacity={isHovered ? 0.7 : 1} />
			</mesh>
			{isHovered && (
				<Text position={[0, -0.6, 0.1]} fontSize={0.2} color="#ff6b35" anchorX="center" anchorY="middle">
					Tap for more info
				</Text>
			)}
			<Text position={[0, -1, 0]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
				{project.name}
			</Text>
		</group>
	);
}

function OrbitingProjects({ onProjectClick }: { onProjectClick: (project: (typeof projectsData)[0]) => void }) {
	const groupRef = useRef<THREE.Group>(null);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [currentRotation, setCurrentRotation] = useState(0);

	useFrame((state) => {
		if (groupRef.current) {
			const rotation = state.clock.elapsedTime * 0.15;
			groupRef.current.rotation.y = rotation;
			setCurrentRotation(rotation);
		}
	});

	return (
		<group ref={groupRef}>
			{projectsData.map((project, index) => {
				const angle = (index / projectsData.length) * Math.PI * 2;
				const radius = 5;
				const x = Math.cos(angle) * radius;
				const y = 1;
				const z = Math.sin(angle) * radius;

				return <ProjectRectangle key={project.name} project={project} position={[x, y, z]} onHover={() => setHoveredIndex(index)} onLeave={() => setHoveredIndex(null)} onClick={() => onProjectClick(project)} isHovered={hoveredIndex === index} />;
			})}
		</group>
	);
}

function Scene({ onProjectClick }: { onProjectClick: (project: (typeof projectsData)[0]) => void }) {
	return (
		<>
			<WebGLContextHandler />
			<PerspectiveCamera makeDefault position={[0, 1.5, 10]} />
			<OrbitControls enableZoom={false} enableRotate={true} />

			<ambientLight intensity={0.6} />
			<pointLight position={[10, 10, 10]} intensity={1} />
			<pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff6b35" />

			<Environment preset="city" />

			<TuxPenguin />
			<OrbitingProjects onProjectClick={onProjectClick} />
		</>
	);
}

export function ThreeScene() {
	const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextCreatedRef = useRef(false);

	const handleCanvasCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
		if (contextCreatedRef.current) {
			console.log("[v0] Preventing duplicate WebGL context creation");
			return;
		}

		contextCreatedRef.current = true;
		console.log("[v0] WebGL context created successfully");
		gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		gl.setClearColor(0x000000, 0);
	}, []);

	return (
		<>
			<div className="w-full h-full relative">
				<h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent ml-15 mt-10">Move Around My Environment!</h2>
				<Canvas
					ref={canvasRef}
					performance={{ min: 0.5 }}
					dpr={[1, 2]}
					gl={{
						antialias: true,
						alpha: true,
						powerPreference: "high-performance",
						preserveDrawingBuffer: false,
					}}
					onCreated={handleCanvasCreated}
					style={{
						width: "100%",
						height: "100%",
						display: "block",
						background: "transparent",
					}}>
					<Scene onProjectClick={setSelectedProject} />
				</Canvas>
			</div>

			<Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-orange-500">{selectedProject?.name}</DialogTitle>
					</DialogHeader>
					{selectedProject && (
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<img src={selectedProject.image || "/placeholder.svg"} alt={selectedProject.name} className="w-full h-48 object-cover rounded-lg" />
							</div>
							<div className="space-y-4">
								<p className="text-muted-foreground">{selectedProject.description}</p>
								<div>
									<h4 className="font-semibold mb-2">Technologies Used:</h4>
									<div className="flex flex-wrap gap-2">
										{selectedProject.technologies.map((tech) => (
											<span key={tech} className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded-md text-sm">
												{tech}
											</span>
										))}
									</div>
								</div>
								<div className="flex gap-4">
									{selectedProject.slug !== "bright-bites" && selectedProject.slug !== "facial-recognition-hall-pass" && selectedProject.slug !== "custom-company-site" ? (
										<a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
											View Code
										</a>
									) : (
										<button disabled className="px-4 py-2 bg-gray-400 text-gray-600 rounded-md cursor-not-allowed opacity-50">
											Code Private
										</button>
									)}
									<a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
										Live Demo
									</a>
								</div>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
