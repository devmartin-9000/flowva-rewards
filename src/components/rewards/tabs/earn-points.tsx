// Import icon libraries
// FontAwesome icons for award, calendar, and layer group icons
import {
	faAward,
	faCalendar,
	faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Lucide React icons for various UI elements
import { Check, Copy, Share2, Star, Users, Zap } from "lucide-react";

// Import React hooks
import { useState } from "react";

// Import custom components
import ToolSpotlight, { FEATURED_TOOLS } from "./featured-tools";

// Import UI dialog components
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

/* --------------------------- MOCK DATA --------------------------- */
// TODO: Move mock data to a separate file for better organization
const MOCK_REWARDS_STATE = {
	user: {
		id: "user_123",
		timezone: "UTC",
		referralCode: "marti6019",
		referralUrl: "https://app.flowvahub.com/signup/?ref=marti6019",
	},
	rewards: {
		points: 15,
		referralsCount: 0,
		referralPointsEarned: 0,
		nextRewardThreshold: 5000,
		dailyStreak: {
			currentStreak: 1,
			lastClaimedAt: "2025-01-14T09:30:00.000Z",
			rewardPerDay: 5,
		},
	},
	featuredTools: {
		toolName: "Reclaim",
		shortBio: "Automate and Optimize Your Schedule",
		briefBio:
			"Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!",
	},
};

// Interface for ShareStackModal props
interface ShareStackModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

// Modal component for sharing tech stacks
const ShareStackModal = ({ isOpen, onOpenChange }: ShareStackModalProps) => {
	return (
		// Dialog component from UI library
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			{/* 
				Dialog content with fixed dimensions
				TODO: Optimizing dimensions to be more responsive for mobile
			*/}
			<DialogContent className="w-[360px] h-[200px] rounded-lg px-4 py-6 flex flex-col items-center text-center gap-6">
				{/* Dialog header with title */}
				<DialogHeader>
					<DialogTitle className="text-xl font-bold text-gray-900">
						Share Your Stack
					</DialogTitle>
				</DialogHeader>

				{/* Central icon with purple background */}
				<div className="p-2 rounded-full bg-purple-100 flex items-center justify-center text-primary">
					<FontAwesomeIcon icon={faLayerGroup} className="text-xl" />
				</div>

				{/* Informational message */}
				<p className="text-gray-500 text-sm leading-relaxed max-w-[310px]">
					You have no stack created yet, go to Tech Stack to create one.
				</p>
			</DialogContent>
		</Dialog>
	);
};

// Constants for time calculations
const ONE_DAY_MS = 1000 * 60 * 60 * 24; // Milliseconds in one day

// Function to check if daily reward can be claimed
const canClaimDailyReward = (lastClaimedAt: string | null) => {
	if (!lastClaimedAt) return true; // If never claimed, can claim
	// Check if at least one day has passed since last claim
	return Date.now() - new Date(lastClaimedAt).getTime() >= ONE_DAY_MS;
};

// Function to get today's index in the week (Monday = 0)
const getTodayIndex = () => {
	const day = new Date().getDay(); // Sunday = 0
	return day === 0 ? 6 : day - 1; // Convert to Monday = 0
};

// Array of weekday abbreviations (starting with Monday)
const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/* --------------------------- COPY BUTTON COMPONENT --------------------------- */
const CopyButton = ({ url }: { url: string }) => {
	// State to track if URL has been copied
	const [copied, setCopied] = useState(false);

	// Function to copy URL to clipboard
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		setCopied(true);
		// Reset copied state after 2 seconds
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="relative">
			{/* Read-only input field showing the URL */}
			<input
				type="text"
				readOnly
				className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full pr-10"
				value={url}
			/>
			{/* 
				The Copy button is positioned absolutely inside the input
				TODO: Make it more accessible with ARIA labels
			*/}
			<button
				className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer z-10"
				onClick={handleCopy}
			>
				{/* Show checkmark if copied, copy icon otherwise */}
				{copied ? (
					<Check className="text-green-600" />
				) : (
					<Copy className="text-primary" />
				)}
			</button>
		</div>
	);
};

/* --------------------------- MAIN EARN POINTS COMPONENT --------------------------- */
const EarnPoints = () => {
	/* --------------------- STATE MANAGEMENT --------------------- */
	// State for rewards data
	const [rewardsState, setRewardsState] = useState(MOCK_REWARDS_STATE);
	// State for controlling share modal visibility
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	// Destructure data from rewards state for easier access
	const {
		points,
		referralsCount,
		referralPointsEarned,
		nextRewardThreshold,
		dailyStreak: { currentStreak, lastClaimedAt, rewardPerDay },
	} = rewardsState.rewards;

	const { referralUrl } = rewardsState.user;

	// Calculate if user can claim today's reward
	const canClaimToday = canClaimDailyReward(lastClaimedAt);
	// Get today's index in the week (0-6, Monday = 0)
	const todayIndex = getTodayIndex();

	// Calculate progress percentage for progress bar
	const progressPercentage = (points / nextRewardThreshold) * 100;

	// Function to claim daily reward
	const claimDailyReward = () => {
		if (!canClaimToday) return; // Prevent claiming if not allowed

		// Update rewards state with new points and streak
		setRewardsState((prev) => ({
			...prev,
			rewards: {
				...prev.rewards,
				points: prev.rewards.points + rewardPerDay, // Add daily reward points
				dailyStreak: {
					...prev.rewards.dailyStreak,
					currentStreak: prev.rewards.dailyStreak.currentStreak + 1, // Increment streak
					lastClaimedAt: new Date().toISOString(), // Update last claimed time
				},
			},
		}));
	};

	return (
		<div className="space-y-6">
			{/* REWARDS JOURNEY HEADER */}
			{/* 
				TODO: Turn this into reusable component
			*/}
			<div className="border-l-4 pl-2 border-primary my-4 mb-6">
				<h1 className="text-xl font-semibold text-gray-900">
					Your Rewards Journey
				</h1>
			</div>

			{/* MAIN CARDS GRID */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* POINTS BALANCE CARD */}
				<div className="bg-sidebar rounded-xl shadow-lg pb-0 lg:pb-15 hover:-translate-y-1 duration-500 cursor-pointer">
					{/* Card header with icon and title */}
					<div className="p-4 w-full rounded-t-xl flex gap-3 items-center text-md bg-accent">
						<FontAwesomeIcon icon={faAward} className="text-primary" />
						<h2 className="text-md font-semibold text-gray-800">
							Points Balance
						</h2>
					</div>

					{/* Main points display with star image */}
					<div className="px-4 py-1 flex items-center justify-between">
						<h1 className="text-4xl text-primary font-extrabold">{points}</h1>
						<img src="./goldstar.svg" alt="Gold Star" className="h-25 w-auto" />
					</div>

					{/* Progress section header */}
					<div className="px-4 mb-1 flex items-center justify-between">
						<h3 className="text-sm font-medium text-gray-700">
							Progress to $5 Gift Card
						</h3>
						<div className="flex text-sm mb-1">
							<span className="font-medium text-muted-foreground">
								{points}/{nextRewardThreshold}
							</span>
						</div>
					</div>

					{/* Progress bar */}
					<div className="px-4">
						<div className="w-full bg-gray-200 rounded-full h-2">
							{/* Dynamic progress fill with gradient */}
							<div
								className="bg-gradient-to-r from-primary to-pink-500 h-2 rounded-full"
								style={{ width: `${progressPercentage}%` }}
							></div>
						</div>
					</div>

					{/* Motivational message */}
					{/* TODO: Make this message dynamic based on progress percentage */}
					<p className="px-4 py-4 text-xs text-gray-600 pb-10">
						🚀 Just getting started — keep earning points!
					</p>
				</div>

				{/* DAILY STREAK CARD */}
				<div className="bg-sidebar rounded-xl shadow-lg hover:-translate-y-1 duration-500 cursor-pointer">
					{/* Card header */}
					<div className="p-4 w-full rounded-t-xl flex gap-3 items-center text-md bg-accent">
						<FontAwesomeIcon icon={faCalendar} className="text-[#70D6FF]" />
						<h2 className="text-md font-semibold text-gray-800">
							Daily Streak
						</h2>
					</div>

					<div className="text-start mb-6 px-4">
						{/* Streak count display */}
						<div className="py-9">
							<h1 className="text-4xl text-primary font-extrabold">
								{currentStreak} day{currentStreak > 1 ? "s" : ""}
							</h1>
						</div>

						{/* CALENDAR DAYS VISUALIZATION */}
						<div className="flex gap-2 items-center justify-center">
							{/* Map through week days to create calendar visualization */}
							{WEEK_DAYS.map((label, index) => {
								const isToday = index === todayIndex;
								const isActive = isToday && !canClaimToday; // Today and already claimed

								return (
									<div
										key={index}
										className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200
											${
												isActive
													? "bg-gray-300 text-gray-500 ring-2 ring-primary ring-offset-2"
													: "bg-gray-200 text-gray-500"
											}`}
									>
										{label}
									</div>
								);
							})}
						</div>

						{/* Info text */}
						<p className="text-sm text-gray-600 text-center mt-3">
							Check in daily to earn +{rewardPerDay} points
						</p>

						{/* Claim button - conditionally enabled based on canClaimToday */}
						<button
							onClick={claimDailyReward}
							disabled={!canClaimToday}
							className={`mt-3 w-full py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200
								${
									canClaimToday
										? "bg-primary text-white hover:scale-105"
										: "bg-gray-300 text-gray-500 cursor-not-allowed"
								}`}
						>
							<Zap />
							{canClaimToday ? "Claim Daily Reward" : "Claimed Today"}
						</button>
					</div>
				</div>

				{/* TOOL SPOTLIGHT CARDS */}
				{/* 
					This Renders featured tools from FEATURED_TOOLS array
					TODO: The data shows only one featured tool for now.
				*/}
				{FEATURED_TOOLS.map((tool) => (
					<ToolSpotlight
						key={tool.id}
						tool={tool}
						onClaim={(pts) => console.log(`Claimed ${pts} points!`)}
					/>
				))}
			</div>

			{/* EARN MORE POINTS HEADER */}
			<div className="border-l-4 pl-2 border-primary my-4 mb-6">
				<h1 className="text-xl font-semibold text-gray-900">
					Earn More Points
				</h1>
			</div>

			{/* EARN MORE POINTS CARDS */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* REFERRAL CONTEST CARD */}
				<div className="transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-lg ease-linear border border-border rounded-xl overflow-hidden">
					<div className="p-[1rem] border border-b border-t-0 border-r-0 border-l-0 bg-white flex items-center gap-[0.75rem]">
						<div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[rgba(228,144,230,0.1)] text-primary">
							<Star />
						</div>
						<div>
							<h3 className="font-semibold">Refer and win 10,000 points!</h3>
						</div>
					</div>
					<div className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-sm">
									Invite 3 friends by Nov 20 and earn a chance to be one of 5
									winners of <span className="text-primary">10,000 points</span>
									. Friends must complete onboarding to qualify.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* SHARE STACK CARD */}
				<div className="transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-lg ease-linear border border-border rounded-xl overflow-hidden">
					<div className="p-4 border border-b-border border-t-0 border-r-0 border-l-0 bg-white flex items-center gap-[0.75rem]">
						<div className="w-10 h-10 rounded-3xl flex items-center justify-center flex-shrink-0 bg-[rgba(144,_19,_254,_0.1)] text-primary">
							<Share2 />
						</div>
						<div>
							<h3 className="font-semibold">Share Your Stack</h3>
							<p className="text-xs text-gray-500">Earn +25 pts</p>
						</div>
					</div>
                    {/* 
                        TODO: Fix sharestack modal layout interference 
                    */}
                    <ShareStackModal
                        isOpen={isShareModalOpen}
                        onOpenChange={setIsShareModalOpen}
                    />
					<div className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-sm">Share your tool stack</p>
							</div>
							<div className="p-4">
								<div className="flex items-center justify-between">
									{/* Share button that triggers the modal */}
									<button
										onClick={() => setIsShareModalOpen(true)}
										className="cursor-pointer bg-border hover:text-white hover:bg-primary text-primary py-2 px-4 rounded-full font-semibold text-sm transition-all duration-200 inline-flex items-center gap-2 border-0"
									>
										<Share2 size={16} />
										Share
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* REFER & EARN HEADER */}
			<div className="border-l-4 pl-2 border-primary my-4 mb-6">
				<h1 className="text-xl font-semibold text-gray-900">Refer & Earn</h1>
			</div>

			{/* REFER & EARN CARD */}
			<div className="rounded-2xl shadow-sm  hover:-translate-y-1 duration-500 cursor-pointer border overflow-hidden transition-all">
				{/* Card header */}
				<div className="p-4 relative border border-b bg-accent border-t-0 border-r-0 border-l-0">
					<div className="flex items-center gap-3">
						<Users className="text-primary" />
						<div>
							<h3 className="text-xl font-semibold text-gray-700">
								Share Your Link
							</h3>
							<p className="text-gray-500 text-sm">
								Invite friends and earn 25 points when they join!
							</p>
						</div>
					</div>
				</div>

				{/* Card content */}
				<div className="p-4">
					<div className="space-y-6">
						{/* Stats display */}
						<div className="flex justify-between mb-[1rem]">
							<div className="text-center p-2 flex-1">
								<div className="text-2xl font-semibold text-primary">
									{referralsCount}
								</div>
								<div className="text-gray-600">Referrals</div>
							</div>
							<div className="text-center p-2 flex-1">
								<div className="text-2xl font-semibold text-primary">
									{referralPointsEarned}
								</div>
								<div className="text-gray-600">Points Earned</div>
							</div>
						</div>

						{/* Referral URL section */}
						<div className="bg-purple-50 p-4 rounded-lg">
							<p className="text-sm mb-2 text-gray-700">
								Your personal referral link:
							</p>
							<CopyButton url={referralUrl} />
						</div>

						{/* Social sharing buttons */}
						<div className="flex justify-center gap-[1rem] mt-[1rem]">
							{/* Facebook button */}
							<button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:translate-y-[-3px] bg-[rgb(24, 119, 242)]">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="facebook-f"
									className="svg-inline--fa fa-facebook-f "
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512"
								>
									<path
										fill="currentColor"
										d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
									></path>
								</svg>
							</button>

							{/* Twitter/X button */}
							<button className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:translate-y-[-3px] bg-black">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="x-twitter"
									className="svg-inline--fa fa-x-twitter "
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
									></path>
								</svg>
							</button>

							{/* LinkedIn button */}
							<button className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:translate-y-[-3px] bg-[rgb(0, 119, 181)]">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="linkedin-in"
									className="svg-inline--fa fa-linkedin-in "
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
								>
									<path
										fill="currentColor"
										d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
									></path>
								</svg>
							</button>

							{/* WhatsApp button */}
							<button className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-2 bg-[rgb(37, 211, 102)]">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="whatsapp"
									className="svg-inline--fa fa-whatsapp "
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
								>
									<path
										fill="currentColor"
										d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
									></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div className="mt-10 border-t border-gray-200">
				<p className="text-sm text-gray-500 text-center"></p>
			</div>
		</div>
	);
};

export default EarnPoints;
