// Import UI components from the project's UI library
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Import FontAwesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// 1. Dummy Data (Will be replaced with API data later)
// TODO: Consider moving this to a separate constants file for better organization
const REWARDS_DATA = [
	{
		id: 1,
		title: "$5 Bank Transfer",
		description: "The $5 equivalent will be transferred to your bank account.",
		points: 5000,
		icon: "💸", // Money emoji
		iconBg: "bg-blue-50", // Background color class
		iconColor: "text-blue-500", // Text color class
		status: "Locked", // Reward status
	},
	{
		id: 2,
		title: "$5 PayPal International",
		description:
			"Receive a $5 PayPal balance transfer directly to your PayPal account email.",
		points: 5000,
		icon: "💸",
		iconBg: "bg-green-50",
		iconColor: "text-green-500",
		status: "Locked",
	},
	{
		id: 3,
		title: "$5 Virtual Visa Card",
		description:
			"Use your $5 prepaid card to shop anywhere Visa is accepted online.",
		points: 5000,
		icon: "🎁", // Gift emoji
		iconBg: "bg-amber-50",
		iconColor: "text-purple-500",
		status: "Locked",
	},
	{
		id: 4,
		title: "$5 Apple Gift Card",
		description:
			"Redeem this $5 Apple Gift Card for apps, games, music, movies, and more.",
		points: 5000,
		icon: "🎁",
		iconBg: "bg-amber-50",
		iconColor: "text-orange-500",
		status: "Locked",
	},
	{
		id: 5,
		title: "$5 Google Play Card",
		description:
			"Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.",
		points: 5000,
		icon: "🎁",
		iconBg: "bg-amber-50",
		iconColor: "text-emerald-500",
		status: "Locked",
	},
	{
		id: 6,
		title: "$5 Amazon Gift Card",
		description:
			"Get a $5 digital gift card to spend on your favorite tools or platforms.",
		points: 5000,
		icon: "🎁",
		iconBg: "bg-amber-50",
		iconColor: "text-amber-500",
		status: "Locked",
	},
	{
		id: 7,
		title: "$10 Amazon Gift Card",
		description:
			"Get a $10 digital gift card to spend on your favorite tools or platforms.",
		points: 10000,
		icon: "🎁",
		iconBg: "bg-amber-50",
		iconColor: "text-amber-600",
		status: "Locked",
	},
	{
		id: 8,
		title: "Free Udemy Course",
		description: "Coming Soon!",
		points: 0,
		icon: "📚", // Book emoji
		iconBg: "bg-indigo-50",
		iconColor: "text-indigo-500",
		status: "Coming Soon",
	},
];

// Main component for redeeming rewards
const RedeemRewards = () => {
	// Derived data (DB-ready)
	// TODO: In a real app, this would come from an API or database
	const allRewards = REWARDS_DATA;

	// Filter rewards by status for different tabs
	const lockedRewards = allRewards.filter(
		(reward) => reward.status === "Locked"
	);

	const unlockedRewards = allRewards.filter(
		(reward) => reward.status === "Unlocked"
	);

	const comingSoonRewards = allRewards.filter(
		(reward) => reward.status === "Coming Soon"
	);

	// Counts for tab badges
	const counts = {
		all: allRewards.length,
		locked: lockedRewards.length,
		unlocked: unlockedRewards.length,
		coming: comingSoonRewards.length,
	};

	return (
		<div className="p-4 pb-10">
			{/* Header section with decorative left border */}
			<div className="flex items-center gap-2 mb-6">
				{/* TODO: Consider extracting this border-left-header pattern into a reusable component */}
				<div className="border-l-4 pl-2 border-primary my-4 mb-6">
					<h1 className="text-xl font-semibold text-gray-900">
						Redeem Your Points
					</h1>
				</div>
			</div>

			{/* Main tabs component for filtering rewards */}
			<Tabs defaultValue="all" className="w-full">
				{/* Custom styled tab list */}
				<TabsList className="bg-transparent h-auto p-0 gap-8 mb-8 flex-wrap justify-start border-none">
					{/* Individual tab triggers with count badges */}
					<TabTrigger value="all" label="All Rewards" count={counts.all} />
					<TabTrigger
						value="unlocked"
						label="Unlocked"
						count={counts.unlocked}
					/>
					<TabTrigger value="locked" label="Locked" count={counts.locked} />
					<TabTrigger
						value="coming"
						label="Coming Soon"
						count={counts.coming}
					/>
				</TabsList>

				{/* ALL REWARDS TAB CONTENT */}
				{/* 
					TODO: The responsive grid CSS pattern is repeated multiple times.
					Consider extracting into a constant or utility class.
				*/}
				<TabsContent
					value="all"
					className="grid gap-[1.5rem] grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] mt-6"
				>
					{/* Map through all rewards and render card for each */}
					{allRewards.map((reward) => (
						<RewardCard key={reward.id} {...reward} />
					))}
				</TabsContent>

				{/* LOCKED REWARDS TAB CONTENT */}
				<TabsContent
					value="locked"
					className="grid gap-[1.5rem] grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] mt-6"
				>
					{lockedRewards.map((reward) => (
						<RewardCard key={reward.id} {...reward} />
					))}
				</TabsContent>

				{/* COMING SOON REWARDS TAB CONTENT */}
				<TabsContent
					value="coming"
					className="grid gap-[1.5rem] grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] mt-6"
				>
					{comingSoonRewards.map((reward) => (
						<RewardCard key={reward.id} {...reward} />
					))}
				</TabsContent>

				{/* UNLOCKED REWARDS TAB CONTENT */}
				{/* 
					TODO: This tab has different styling than others (centered text vs grid).
					Make it consistent or handle empty state differently.
				*/}
				<TabsContent
					value="unlocked"
					className="text-slate-400 text-center py-10"
				>
					{/* Conditional rendering based on whether there are unlocked rewards */}
					{unlockedRewards.length === 0
						? "No rewards unlocked yet." // Empty state message
						: unlockedRewards.map((reward) => (
								<RewardCard key={reward.id} {...reward} />
						  ))}
				</TabsContent>
			</Tabs>
		</div>
	);
};

// Custom TabTrigger component with count badge
// TODO: Add TypeScript interface for props
const TabTrigger = ({
	value,
	label,
	count,
}: {
	value: string;
	label: string;
	count: number;
}) => (
	<TabsTrigger
		value={value}
		// Custom styling for tab triggers with active states
		// Note: `group-data-[state=active]` targets parent when active
		className="data-[state=active]:shadow-none data-[state=active]:bg-purple-100 border-b-3 border-transparent data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:text-primary rounded-none px-4 py-2 rounded-t-lg text-slate-500 font-normal transition-all flex gap-2 items-center hover:bg-purple-100 cursor-pointer"
	>
		{/* Tab label */}
		{label}
		{/* Count badge with conditional styling */}
		<span className="bg-slate-100 text-slate-500 text-sm px-2 py-0.5 rounded-full group-data-[state=active]:bg-purple-100 group-data-[state=active]:text-primary">
			{count}
		</span>
	</TabsTrigger>
);

// Reward Card Component for displaying individual rewards
// TODO: Add proper TypeScript interface for props instead of using `any`
const RewardCard = ({
	title,
	description,
	points,
	icon,
	iconBg,
	iconColor,
	status,
}: any) => {
	// Determine card state for conditional styling
	const isLocked = status === "Locked";
	const isComingSoon = status === "Coming Soon";

	return (
		// Card container with conditional opacity based on status
		<div
			className={`rounded-xl shadow-lg hover:-translate-y-1 duration-500 cursor-pointer bg-white border border-border p-8 hover:shadow-xl transition-all flex flex-col items-center text-center
				${isLocked ? "opacity-60" : ""}
				${isComingSoon ? "opacity-50" : ""}
			`}
		>
			{/* Icon container with dynamic background */}
			<div
				className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center mb-6`}
			>
				{/* Icon with dynamic color */}
				<div className={`${iconColor} text-xl`}>{icon}</div>
			</div>

			{/* Reward title */}
			<h3 className="font-semibold text-slate-800 text-lg mb-2">{title}</h3>

			{/* Reward description */}
			<p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
				{description}
			</p>

			{/* Points display with star icon */}
			<div className="flex items-center gap-1.5 mb-6">
				<FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
				<span className="text-purple-600 font-bold text-sm">{points} pts</span>
			</div>

			{/* 
				Action button - currently always disabled
				TODO: Connect to actual redemption logic when points are sufficient
			*/}
			<Button
				disabled
				className="w-full rounded-xl bg-slate-100 text-slate-400 border-none hover:bg-slate-100 py-6 text-base font-semibold"
			>
				{/* Button text shows reward status */}
				{status}
			</Button>
		</div>
	);
};

// Export the main component
export default RedeemRewards;
