// Import React hooks
import { useState } from "react";

// Import main content components for each tab
import EarnPoints from "./tabs/earn-points";
import RedeemRewards from "./tabs/redeem-rewards";

// Main component that handles switching between Earn Points and Redeem Rewards tabs
const RewardsTab = () => {
	// State to track which tab is currently active
	// Can be either "earn" or "redeem"
	const [active, setActive] = useState<"earn" | "redeem">("earn");

	return (
		// Main container for the entire tab component
		// TODO: Consider if `ml-4` (margin-left) is necessary or could be handled by parent
		<div className="flex flex-col mx-auto w-full ml-4">
			{/* TAB BUTTONS - Navigation for switching between tabs */}
			<div className="flex gap-2">
				{/* EARN POINTS TAB BUTTON */}
				<button
					onClick={() => setActive("earn")}
					// Dynamic classes based on active state
					className={`px-4 py-2 rounded-t-md text-sm transition-all duration-100
						${
							active === "earn"
								? // Active state styling
								  "bg-purple-100 border-b-3 border-primary text-primary"
								: // Inactive state styling with hover effects
								  "text-muted-foreground border-b-3 border-transparent hover:bg-purple-100 hover:text-primary cursor-pointer"
						}
					`}
				>
					Earn Points
				</button>

				{/* REDEEM REWARDS TAB BUTTON */}
				<button
					onClick={() => setActive("redeem")}
					// Same dynamic styling pattern as first button
					className={`px-4 py-2 rounded-t-md text-sm transition-all duration-100
						${
							active === "redeem"
								? // Active state
								  "bg-purple-100 border-b-3 border-primary text-primary"
								: // Inactive state
								  "text-muted-foreground border-b-3 border-transparent hover:bg-purple-100 hover:text-primary cursor-pointer"
						}
					`}
				>
					Redeem Rewards
				</button>
			</div>

			{/* CONTENT AREA - Where the selected tab's content is displayed */}
			{/* 
				TODO: Consider if `pr-8` (padding-right) is consistent with overall layout
				Might need adjustment based on parent container padding
			*/}
			<div className="pr-8">
				{/* Conditional rendering based on active tab */}
				{active === "earn" ? <EarnPoints /> : <RedeemRewards />}
			</div>
		</div>
	);
};

// Export the component
export default RewardsTab;
