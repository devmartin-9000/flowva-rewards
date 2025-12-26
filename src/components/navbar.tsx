import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SidebarTrigger } from "./ui/sidebar";
import { NotificationPopover } from "./notification-popover";

const Navbar = () => {
	return (
		<header className="sticky top-0 z-20 w-full bg-sidebar">
			<div className="flex items-center justify-between px-3 py-3">
				{/* Left: Menu + Title */}
				<div className="flex items-center gap-2">
					<SidebarTrigger className="text-3xl lg:hidden">
						<FontAwesomeIcon icon={faBars} />
					</SidebarTrigger>
					<h1 className="text-2xl font">Rewards Hub</h1>
				</div>
				{/* Right: Notifications */}
				<NotificationPopover />
			</div>

			{/* Subtitle */}
			<p className=" px-4 pb-3 text-md text-muted-foreground">
				Earn points, unlock rewards, and celebrate your progress!
			</p>
		</header>
	);
};

export default Navbar;
