// Import React
import React from "react";

// Import FontAwesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faGift } from "@fortawesome/free-solid-svg-icons";

// Import Lucide React icons
import { Calendar } from "lucide-react";

// Import UI components
import { Separator } from "@/components/ui/separator";

/* --------------------------- MOCK DATA ARRAY --------------------------- */
// TODO: This array currently only has one tool but is named plural "FEATURED_TOOLS"
// Consider if this should have multiple tools or be renamed to FEATURED_TOOL
export const FEATURED_TOOLS: ToolFeature[] = [
	{
		id: "reclaim-001", // Unique identifier for the tool
		name: "Reclaim", // Tool name
		shortBio: "Automate and Optimize Your Schedule", // Short tagline
		// Full description of the tool
		description:
			"Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!",
		points: 50, // Points awarded for signing up
		signupUrl: "https://go.reclaim.ai/ur9i6g5eznps", // External signup URL
		imageUrl: "./reclaim.png", // Tool logo/image path
	},
];

/* --------------------------- INTERFACE --------------------------- */
// TypeScript interface defining the structure of a tool feature
export interface ToolFeature {
	id: string;
	name: string;
	shortBio: string;
	description: string;
	points: number;
	signupUrl: string;
	imageUrl: string;
}

// Props interface for the ToolSpotlight component
interface ToolSpotlightProps {
	tool: ToolFeature; // Tool data to display
	onClaim?: (points: number) => void; // Optional callback when points are claimed
}

/* --------------------------- COMPONENT --------------------------- */
const ToolSpotlight: React.FC<ToolSpotlightProps> = ({ tool, onClaim }) => {
	return (
		// Main container with responsive column spanning
		// TODO: The md:col-span-3 lg:col-span-1 classes suggest this is part of a grid
		// Ensure parent grid has appropriate column definitions
		<div className="bg-sidebar rounded-xl shadow-lg md:col-span-3 lg:col-span-1 overflow-hidden transition-all duration-300 hover:shadow-xl">
			{/* HEADER SECTION with gradient background */}
			<div className="flex justify-between items-center">
				<div className="pb-4 rounded-t-xl w-full bg-[linear-gradient(135deg,_#9013FE_0%,_#70D6FF_100%)] text-white relative overflow-hidden">
					{/* Featured badge */}
					<div className="p-4">
						<span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
							Featured
						</span>
					</div>

					{/* Header content with title and tool logo */}
					<div className="flex items-center justify-between px-4">
						{/* Section title */}
						<h3 className="text-xl font-bold relative z-2">
							Top Tool Spotlight
						</h3>

						{/* Tool logo/image container */}
						<div className="overflow-hidden relative rounded-full size-10 md:size-16 border-2 border-white/30 bg-white">
							{/* 
								Add loading state and error handling for images
							*/}
							<img
								src={tool.imageUrl}
								alt={tool.name}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>

					{/* Tool name */}
					<h3 className="px-4 font-bold text-lg mt-2">{tool.name}</h3>
				</div>
			</div>

			{/* CONTENT SECTION with tool description */}
			<div className="p-4 flex items-start min-h-[140px]">
				{/* Animated calendar icon container */}
				<div className="w-6 h-6 animate-pulse bg-[#eef2ff] rounded-[6px] flex items-center justify-center mr-4 flex-shrink-0 text-primary">
					<Calendar size={16} />
				</div>

				{/* Text content area */}
				<div className="flex-1">
					{/* Short bio/tagline */}
					<h4 className="font-semibold text-sm mb-1 text-gray-800">
						{tool.shortBio}
					</h4>

					{/* Full description */}
					<p className="text-sm text-gray-600 leading-relaxed">
						{tool.description}
					</p>
				</div>
			</div>

			{/* SEPARATOR */}
			<div className="px-4">
				<Separator className="bg-gray-100" />
			</div>

			{/* ACTION BUTTONS SECTION */}
			<div className="p-4">
				<div className="flex justify-between items-center gap-2">
					{/* SIGN UP BUTTON - Opens tool's signup page in new tab */}
					<a
						href={tool.signupUrl}
						target="_blank" // Opens in new tab
						rel="noopener noreferrer" // Security best practice for target="_blank"
						className="bg-primary hover:scale-105 transform transition duration-300 text-white gap-2 flex items-center py-2 px-4 rounded-full font-semibold text-sm whitespace-nowrap"
					>
						<FontAwesomeIcon icon={faUserPlus} />
						Sign up
					</a>

					{/* CLAIM POINTS BUTTON - Calls onClaim callback with tool points */}
					<button
						onClick={() => onClaim?.(tool.points)} // Optional chaining for safety
						className="bg-[linear-gradient(45deg,#9013FE,#FF8687)] hover:scale-105 transform transition duration-300 text-white gap-2 flex items-center py-2 px-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap"
					>
						<FontAwesomeIcon icon={faGift} />
						Claim {tool.points} pts
					</button>
				</div>
			</div>
		</div>
	);
};

export default ToolSpotlight;
