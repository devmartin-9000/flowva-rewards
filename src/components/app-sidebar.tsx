import { ChevronUp, User2 } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { faBoxOpen, faCompass, faCreditCardAlt, faGem, faHome, faLayerGroup, faUserGear, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

// DASHBOARD TYPES
interface DashboardItems {
	title: string;
	icon: IconDefinition;
	url: string;
}
// DASHBOARD ITEMS
const items: DashboardItems[] = [
	{
		title: "Home",
		icon: faHome,
		url: "",
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

export function AppSidebar() {
    return (
			<Sidebar>
				<SidebarHeader className="bg-white" />
				<SidebarContent className="bg-white">
					<SidebarGroup>
						<SidebarGroupLabel>
							<img
								className="h-auto w-35 mt-8 ml-3"
								src="./flowva-logo.png"
								alt="Flowva Logo"
							/>
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<Separator className="mt-10" />
								<div className="ml-3">
									{items.map((item) => {
										const isActive = item.title === "Rewards Hub";

										return (
											<SidebarMenuItem key={item.title}>
												<SidebarMenuButton
													size="lg"
													asChild
													className={`
													transition-all duration-200
													${isActive ? "bg-secondary text-primary" : "hover:text-primary"}
												`}
												>
													<a href={item.url}>
														<FontAwesomeIcon icon={item.icon} />
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
				<SidebarFooter className="bg-white">
					<Separator />
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton className="ml-0 h-15 w-full bg-secondary border text-wrap text-xs">
										<div className="flex p-auto gap-1 items-center justify-center">
											<User2 className="border rounded-full w-auto h-8 bg-orange-400 p-1 text-white" />
											<div className="">
												<h2 className="font-semibold text-xs truncate max-w-[130px]">
													Martin Jack
												</h2>
												<p className="text-xs max-w-[130px] truncate text-muted-foreground">
													martinmagonagona@gmail.com
												</p>
											</div>
											<ChevronUp className="h-auto w-4" />
										</div>
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent side="top" className="w-52">
									<DropdownMenuItem>
										<span>Feedback</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<span>Support</span>
									</DropdownMenuItem>
									<DropdownMenuItem variant="destructive">
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
		);
}