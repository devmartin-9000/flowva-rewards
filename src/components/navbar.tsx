// Import FontAwesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import specific hamburger menu icon
import { faBars } from "@fortawesome/free-solid-svg-icons";

// Import custom UI components
import { SidebarTrigger } from "./ui/sidebar"; // Component to trigger sidebar toggling
import { NotificationPopover } from "./notification-popover"; // Notification bell component

// Main Navbar component
const Navbar = () => {
	return (
		// Sticky header that stays at top of viewport
		// Uses high z-index to ensure it's above other content
		<header className="sticky top-0 z-50 w-full bg-sidebar">
			{/* Main navigation bar container with padding */}
			<div className="flex items-center justify-between px-3 py-3">
				{/* LEFT SECTION: Menu button and title */}
				<div className="flex items-center gap-2">
					{/* 
						Sidebar trigger button - only visible on mobile (lg:hidden)
					*/}
					<SidebarTrigger
						className="text-3xl lg:hidden"
						aria-label="Toggle sidebar menu"
					>
						<FontAwesomeIcon icon={faBars} />
					</SidebarTrigger>

					{/* 
						Application title
					*/}
					<h1 className="text-2xl font-semibold">Rewards Hub</h1>
				</div>

				{/* RIGHT SECTION: Notification bell with popover */}
				<NotificationPopover />
			</div>

			{/* SUBTITLE SECTION: Informational text below the main navbar */}
			{/* 
				TODO: Consider making this subtitle responsive or conditionally visible
				on different screen sizes if needed
			*/}
			<p className="px-4 pb-3 text-md text-muted-foreground">
				Earn points, unlock rewards, and celebrate your progress!
			</p>
		</header>
	);
};

// Export the Navbar component as default export
export default Navbar;
