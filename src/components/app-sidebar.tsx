// Import Lucide React icons for UI elements
import { ChevronUp } from "lucide-react";

// Import sidebar components from UI library
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";

// Import separator component for visual division
import { Separator } from "./ui/separator";

// Import FontAwesome icons and types for sidebar navigation items
import {
	faBoxOpen,
	faCompass,
	faCreditCardAlt,
	faGem,
	faHome,
	faLayerGroup,
	faUserGear,
	type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import dropdown menu components for user profile menu
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/auth-context";

// DASHBOARD TYPES - Interface for sidebar navigation items
interface DashboardItems {
	title: string;
	icon: IconDefinition; // FontAwesome icon type
	url: string; // Navigation URL
}

// DASHBOARD ITEMS - Array of navigation items for the sidebar
// TODO: Consider moving this to a separate constants file for better organization
const items: DashboardItems[] = [
	{
		title: "Home",
		icon: faHome,
		url: "", // TODO: Add actual URLs/paths for navigation
	},
	{
		title: "Discover",
		icon: faCompass,
		url: "",
	},
	{
		title: "Library",
		icon: faBoxOpen,
		url: "",
	},
	{
		title: "Tech Stack",
		icon: faLayerGroup,
		url: "",
	},
	{
		title: "Subscriptions",
		icon: faCreditCardAlt,
		url: "",
	},
	{
		title: "Rewards Hub",
		icon: faGem,
		url: "",
	},
	{
		title: "Settings",
		icon: faUserGear,
		url: "",
	},
];

// Main sidebar component for the application
export function AppSidebar() {
	const { user } = useAuth();

	const fullName =
		user?.user_metadata?.full_name ||
		user?.user_metadata?.name ||
		user?.email?.split("@")[0] ||
		"User";
	const email = user?.email ?? "";
	const avatarUrl = user?.user_metadata?.avatar_url;


	return (
		// Main sidebar container
		<Sidebar>
			{/* Sidebar header - currently empty but with white background */}
			<SidebarHeader className="bg-white" />

			{/* Main sidebar content area */}
			<SidebarContent className="bg-white">
				<SidebarGroup>
					{/* Logo section at the top of the sidebar */}
					<SidebarGroupLabel>
						{/* 
								TODO: Consider using an Image component from Next.js or similar
								for better performance and accessibility
							*/}
						<img
							className="h-auto w-35 mt-8 ml-3"
							src="./flowva-logo.png"
							alt="Flowva Logo"
						/>
					</SidebarGroupLabel>

					{/* Navigation items section */}
					<SidebarGroupContent>
						<SidebarMenu>
							{/* Separator line below the logo */}
							<Separator className="mt-10" />

							{/* Navigation items container with left margin */}
							<div className="ml-3">
								{/* Map through dashboard items to create navigation menu */}
								{items.map((item) => {
									// Determine if current item is active
									// Currently hardcoded to highlight "Rewards Hub"
									// TODO: Make this dynamic based on current route
									const isActive = item.title === "Rewards Hub";

									return (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												size="lg" // Large button size
												asChild // Renders as child element (anchor tag)
												// Conditional styling based on active state
												className={`
													transition-all duration-200
													${isActive ? "bg-secondary text-primary" : "hover:text-primary"}
												`}
											>
												{/* Navigation link */}
												<a href={item.url}>
													{/* Icon for the navigation item */}
													<FontAwesomeIcon icon={item.icon} />
													{/* Navigation item title */}
													<span>{item.title}</span>
												</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</div>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Sidebar footer with user profile and dropdown menu */}
			<SidebarFooter className="bg-white">
				{/* Separator line above footer */}
				<Separator />

				<SidebarMenu>
					<SidebarMenuItem>
						{/* Dropdown menu for user profile actions */}
						<DropdownMenu>
							{/* Dropdown trigger - user profile button */}
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="ml-0 h-15 w-full bg-secondary border text-wrap text-xs">
									{/* TODO: Add Dynamic user info using Auth */}
									{/* User profile content */}
									<div className="flex p-auto gap-1 items-center justify-center">
										{/* User avatar/icon with orange background */}
										{avatarUrl ? (
											<img
												src={avatarUrl}
												alt={fullName}
												className="h-8 w-8 rounded-full object-cover"
											/>
										) : (
											<div className="h-8 w-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold">
												{fullName
													.split(" ")
													.map((n: string) => n[0])
													.slice(0, 2)
													.join("")
													.toUpperCase()}
											</div>
										)}

										{/* User info section */}
										<div className="">
											{/* User name - truncated if too long */}
											<h2 className="font-semibold text-xs truncate max-w-[130px]">
												{fullName}
											</h2>
											<p className="text-xs max-w-[130px] truncate text-muted-foreground">
												{email}
											</p>
										</div>

										{/* Dropdown chevron icon */}
										<ChevronUp className="h-auto w-4" />
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>

							{/* Dropdown menu content */}
							<DropdownMenuContent side="top" className="w-52">
								{/* Feedback menu item */}
								{/* <DropdownMenuItem>
									<span>Feedback</span>
								</DropdownMenuItem> */}

								{/* Support menu item */}
								{/* <DropdownMenuItem>
									<span>Support</span>
								</DropdownMenuItem> */}

								{/* Log out menu item with destructive styling */}
								<DropdownMenuItem
									variant="destructive"
									onClick={() => supabase.auth.signOut()}
								>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
