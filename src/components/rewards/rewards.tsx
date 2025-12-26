import { useState } from "react";
import EarnPoints from "./earn-points";
import RedeemRewards from "./redeem-rewards";

const RewardsTab = () => {
	const [active, setActive] = useState<"earn" | "redeem">("earn");
	return (
		<div className="flex flex-col">
			{/* Tab buttons */}
			<div className="flex gap-2">
				<button
					onClick={() => setActive("earn")}
					className={`px-4 py-2 rounded-t-md text-sm transition-all duration-100
						${
							active === "earn"
								? "bg-purple-100 border-b-3 border-primary text-primary"
								: "text-muted-foreground border-b-3 border-transparent hover:text-primary"
						}
					`}
				>
					Earn Points
				</button>

				<button
					onClick={() => setActive("redeem")}
					className={`px-4 py-2 rounded-t-md text-sm transition-all duration-100
						${
							active === "redeem"
								? "bg-purple-100 border-b-3 border-primary text-primary"
								: "text-muted-foreground border-b-3 border-transparent hover:text-primary"
						}
					`}
				>
					Redeem Rewards
				</button>
			</div>

			{/* Content area */}
			<div className="p-0">
				{active === "earn" ? <EarnPoints /> : <RedeemRewards />}
			</div>
		</div>
	);
};

export default RewardsTab;
